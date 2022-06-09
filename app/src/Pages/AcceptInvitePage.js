import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function AcceptInvitePage() {
	const { currentUser, login } = useAuth();
	const [successfulInvite, setSuccessfulInvite] = useState(false);
	const [chosenEmail, setChosenEmail] = useState("");
	const [chosenPassword, setChosenPassword] = useState("");

	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	function handleLogin(email, pass) {
		login(email, pass).catch((e) => {
			console.log("Email or password is incorrect, try again!");
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
							setError("Invalid invitation code.");
						} else {
							setError("");
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

	function createAccount(inviteId, email, pass) {
		try {
			fetch("/create_account", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					invite: inviteId,
					email: email,
					password: pass,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.error) {
						throw json.error;
					} else {
						// TODO
						handleLogin(email, pass);
					}
				})
				.catch((e) => {
					throw e;
				});
		} catch (e) {
			throw e;
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
							onChange={(e) => {
								setChosenPassword(e.target.value);
							}}
							style={{ width: "20%" }}
						></TextField>
						<Button size="large" variant="contained" style={{ width: "20%" }}>
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
