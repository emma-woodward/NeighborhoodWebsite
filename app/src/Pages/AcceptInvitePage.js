import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function AcceptInvitePage() {
	const { currentUser, login } = useAuth();
	const [successfulInvite, setSuccessfulInvite] = useState(false);
	const [inviteId, setInviteId] = useState("");
	const [chosenEmail, setChosenEmail] = useState("");
	const [chosenPassword, setChosenPassword] = useState("");

	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState(""); // TODO
	const [passwordError, setPasswordError] = useState("");

	function verifyPassword(pass) {
		setPasswordError("");
		setChosenPassword(pass);

		if (pass.trim() !== "") {
			/* Following the basic password rules:
			 * At least 8 characters long
			 * At least one uppercase letter
			 * At least one special character (!, $, etc)
			 */
			const tPass = pass.trim();
			var isEightCharsLong = tPass.length >= 8;
			var hasOneUppercaseLetter = false;
			var hasOneSpecialChar = false;

			for (var i = 0; i < tPass.length; i++) {
				const c = tPass.charCodeAt(i);

				if (c >= 33 && c <= 47) {
					hasOneSpecialChar = true;
				} else if (c >= 65 && c <= 90) {
					hasOneUppercaseLetter = true;
				}
			}

			var errMsg = "";

			if (!isEightCharsLong) {
				errMsg += "Password must be at least eight characters long. ";
			}

			if (!hasOneUppercaseLetter) {
				errMsg += "Password must contain at least one uppercase letter. ";
			}

			if (!hasOneSpecialChar) {
				errMsg +=
					"Password must contain at least one special character (!, #, $, %, etc). ";
			}

			setPasswordError(errMsg);
		}
	}

	function handleLogin(email, pass) {
		login(email, pass).catch((e) => {
			console.log("Email or password is incorrect, try again!");
			console.log(e);
		});
	}

	function isValidInvite(inviteId) {
		if (inviteId.trim() !== "") {
			try {
				fetch("/valid_invite", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						invite: inviteId,
					}),
				})
					.then((res) => {
						if (res.status !== 200) {
							res.text().then((serverErr) => {
								setError(serverErr);
							});
						} else {
							setError("");
							setInviteId(inviteId);
							setSuccessfulInvite(true);
						}
					})
					.catch((e) => {
						throw e;
					});
			} catch (e) {
				throw e;
			}
		} else {
			setError("");
		}
	}

	function createAccount() {
		if (passwordError.length === 0) {
			try {
				fetch("/create_account", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						invite: inviteId,
						email: chosenEmail,
						password: chosenPassword,
					}),
				})
					.then((res) => {
						if (res.status !== 200) {
						} else {
							handleLogin(chosenEmail, chosenPassword);
						}
					})
					.catch((e) => {
						throw e;
					});
			} catch (e) {
				throw e;
			}
		}
	}

	return (
		<div>
			{currentUser && <Navigate to="/" />}
			{successfulInvite ? (
				<div
					style={{
						textAlign: "center",
						margin: "5%",
					}}
				>
					<h1>Setup Your Account</h1>
					<p style={{ color: "red" }}>{error}</p>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							gap: "1em",
						}}
					>
						<TextField
							type="email"
							label="Email"
							defaultValue=""
							required
							error={emailError}
							onChange={(e) => {
								setChosenEmail(e.target.value);
							}}
							style={{ width: "20%" }}
						></TextField>
						<TextField
							type="password"
							label="Password"
							required
							error={passwordError}
							helperText={passwordError}
							onChange={(e) => {
								verifyPassword(e.target.value);
							}}
							style={{ width: "20%" }}
						></TextField>
						<Button
							size="large"
							variant="contained"
							style={{ width: "20%" }}
							onClick={createAccount}
						>
							Create Account
						</Button>
					</div>
				</div>
			) : (
				<div
					style={{
						textAlign: "center",
						margin: "5%",
					}}
				>
					<h1>Accept Invite</h1>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							gap: "1em",
							paddingTop: "1%",
						}}
					>
						<TextField
							required
							type="password"
							label="Enter Invitation Code"
							helperText={error}
							error={error.length !== 0}
							style={{ width: "40%" }}
							onChange={(e) => {
								isValidInvite(e.target.value);
							}}
						></TextField>
					</div>
				</div>
			)}
		</div>
	);
}

export default AcceptInvitePage;
