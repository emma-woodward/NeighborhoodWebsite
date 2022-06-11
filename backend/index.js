const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { traceDeprecation } = require("process");
const app = express();

// NOTE: Port may change
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());

// TODO: Create a db routine for this
async function isValidUser(sessionId) {
	await pool.query(
		"UPDATE users SET sessionId = null, expires = null WHERE expires::date < current_date::date"
	);
	const user = await pool.query("SELECT * FROM users WHERE sessionId = $1", [
		sessionId,
	]);

	if (user) {
		return true;
	}

	return false;
}

// TODO: Create a db routine for this
async function isValidAdmin(sessionId) {
	await pool.query(
		"UPDATE users SET sessionId = null, expires = null WHERE expires::date < current_date::date"
	);

	const user = await pool.query(
		"SELECT * FROM users WHERE sessionId = $1 AND role = '0'",
		[sessionId]
	);

	if (user) {
		return true;
	}

	return false;
}

app.post("/valid_invite", async (req, res) => {
	const inviteStr = req.body.invite;
	var existed = false;

	await pool
		.query("SELECT * FROM invites WHERE hash = $1", [inviteStr])
		.then((invite) => {
			if (invite.rowCount === 1) {
				existed = true;
			}
		});

	await pool.query(
		"DELETE FROM invites WHERE expires::date < current_date::date"
	);

	await pool
		.query("SELECT * FROM invites WHERE hash = $1", [inviteStr])
		.then((invite) => {
			if (invite.rowCount === 1) {
				res.status(200).send("");
			} else if (invite.rowCount > 1) {
				res.status(404).send("Invalid invitation code.");
			} else {
				existed
					? res
							.status(400)
							.send(
								"Invitation code has expired, ask for a new one from the site maintainer"
							)
					: res.status(404).send("Invalid invitation code.");
			}
		});
});

/*
  Difference between /create_user and /create_account is that create_user is initiated by an admin user,
  and only requires them to be a valid admin user, while /create_account requires them to "prove" that 
  they can create an account with an invitation that an admin user generated and gave to them. 
*/
app.post("/create_account", async (req, res) => {
	const inviteStr = req.body.invite;
	const email = req.body.email;
	const chosenPassword = req.body.password;
	var existed = false;

	await pool
		.query("SELECT * FROM invites WHERE hash = $1", [inviteStr])
		.then((invite) => {
			if (invite.rowCount === 1) {
				existed = true;
			}
		});

	await pool.query(
		"DELETE FROM invites WHERE expires::date < current_date::date"
	);

	await pool
		.query("SELECT * FROM invites WHERE hash = $1", [inviteStr])
		.then((invite) => {
			if (invite.rowCount === 1) {
				bcrypt.hash(chosenPassword, 10, (hashErr, hash) => {
					if (hashErr) {
						throw hashErr;
					}

					pool
						.query("INSERT INTO users(email, hash, role) VALUES ($1, $2, $3)", [
							email,
							hash,
							1,
						])
						.then((result) => {
							pool.query("DELETE FROM invites WHERE hash = $1", [inviteStr]);
							res.status(200).send("").end();
						});
				});
			} else if (existed) {
				res
					.status(400)
					.send(
						"Invitation code has expired, ask for a new one from the site maintainer"
					);
			} else {
				res.status(400).send("Invalid invitation code");
			}
		});
});

app.post("/create_invite", async (req, res) => {
	const sessionId = req.body.sessionId;
	const validSessionId = await isValidAdmin(sessionId);

	if (validSessionId) {
		try {
			const inviteId = crypto.randomBytes(50).toString("hex");

			pool.query(
				"INSERT INTO invites(hash, expires) VALUES ($1, (current_date + 1))",
				[inviteId]
			);

			res.send({
				invite: inviteId,
			});
		} catch (e) {
			console.log(e);
		}
	} else {
		res.send("Error: Could not create invite");
	}
});

//Routes
//Create a new user
// TODO: Finish this, and clean it up
app.post("/create_user", async (req, res) => {
	// const user = await pool.query("SELECT * FROM users WHERE sessionId = $1", [req.body.sessionId]);

	if (isValidAdmin(req.body.sessionId)) {
		try {
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				10,
				(err, hash) => {
					if (err) {
						throw err;
					}

					const result = pool.query(
						"INSERT INTO users(email, hash, role) VALUES($1, $2, $3)",
						[req.body.email, hash, req.body.role]
					);
				}
			);

			res.send({ success: "user created" });
		} catch (e) {
			res.send({ error: "User was not created" });
		}
	} else {
		res.send({ error: "Could not create user..." });
	}
});

app.post("/remove_invite", async (req, res) => {
	const inviteStr = req.body.invite;

	await pool
		.query("DELETE FROM invites WHERE hash = $1", [inviteStr])
		.then((r) => {
			res.status(200).send("");
		});
});

//Login
app.post("/login", async (req, res) => {
	try {
		const selectedUser = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[req.body.email]
		);

		await bcrypt.compare(
			req.body.password,
			selectedUser.rows[0].hash,
			(err, result) => {
				if (err) {
					throw err;
				}

				if (result) {
					const id = crypto.randomBytes(50).toString("hex");
					pool.query(
						"UPDATE users SET sessionId = $1, expires = (current_date + 1) WHERE email = $2",
						[id, req.body.email]
					);
					res.json({
						sessionId: id,
					});
				} else {
					res.send({ error: "Email or password is invalid" });
				}
			}
		);
	} catch (e) {
		res.send({ error: "Email or password is invalid" });
	}
});

//Log out
app.post("/logout", async (req, res) => {
	try {
		if (isValidUser(req.body.sessionId)) {
			await pool.query(
				"UPDATE users SET expires = null, sessionId = null WHERE sessionId = $1",
				[req.body.sessionId]
			);
			res.send({ success: "Logged Out" });
		} else {
			res.send({ error: "Could not log out..." });
		}
	} catch (e) {
		res.send({ error: "Could not log out..." });
		console.log(e);
	}
});

//Delete a user
app.post("/delete_user", async (req, res) => {
	try {
		if (isValidAdmin(req.sessionId)) {
			// TODO
		}
	} catch (e) {
		console.log(e);
	}
});

//Modify a users password
// TODO: Clean this up
app.post("/reset_password", async (req, res) => {
	try {
		if (isValidUser(req.body.sessionId)) {
			const selectedUser = await pool.query(
				"SELECT * FROM users WHERE sessionId = $1",
				[req.body.sessionId]
			);

			await bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
				if (err) {
					throw err;
				}

				if (selectedUser.rowCount === 1) {
					await bcrypt.compare(
						req.body.oldPassword,
						selectedUser.rows[0].hash,
						(err, result) => {
							if (err) {
								res.send({ error: "Old password is invalid" });
							}

							if (result) {
								// Reset password
								pool.query("UPDATE users SET hash = $1 WHERE email = $2", [
									hash,
									selectedUser.rows[0].email,
								]);

								// Reset sessionId
								const id = crypto.randomBytes(50).toString("hex");

								pool.query(
									"UPDATE users SET sessionId = $1, expires = (current_date + 1) WHERE email = $2",
									[id, selectedUser.rows[0].email]
								);
								res.json({
									sessionId: id,
								});
							} else {
								console.log("op");
								res.send({ error: "Old password is invalid" });
							}
						}
					);
				} else {
					console.log("No user with given sessionId");
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
});

//Get the most recent announcement
app.post("/most_recent_announcement", async (req, res) => {
	try {
		if (isValidUser(req.sessionId)) {
			const mostRecent = await pool.query(
				"select * from announcements where aid = (select max(aid) from announcements)"
			);
			res.json(mostRecent.rows[0]);
		}
	} catch (e) {
		console.log(e);
	}
});

//Get all announcements
app.post("/announcements", async (req, res) => {
	try {
		if (isValidUser(req.sessionId)) {
			const allAnnouncements = await pool.query("SELECT * FROM announcements");
			res.json(allAnnouncements.rows);
		}
	} catch (e) {
		console.log(e);
	}
});

//Create an announcement
app.post("/create_announcement", async (req, res) => {
	try {
		if (isValidAdmin(req.sessionId)) {
			// TODO
		}
	} catch (e) {
		console.log(e);
	}
});

app.listen(PORT, () => {
	console.log("Server has started on port " + PORT);
});
