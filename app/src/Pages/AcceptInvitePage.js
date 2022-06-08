import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function AcceptInvitePage() {
	const { currentUser, login } = useAuth();
	const [successfulInvite, setSuccessfulInvite] = useState(false);
	const [error, setError] = useState("");
	const [inviteId, setInviteId] = useState("");

	function isValidInvite() {
		console.log("this happened");
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
				.then((res) => res.json())
				.then((json) => {
					if (json.error) {
						throw json.error;
					} else {
						setSuccessfulInvite(true);
					}
				})
				.catch((e) => {
					throw e;
				});
		} catch (e) {
			throw e;
		}
	}

	function redeemInvite(inviteId, email, pass) {
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
					}
				})
				.catch((e) => {
					throw e;
				});
		} catch (e) {
			throw e;
		}
	}

	/*
        Clean up the stuff below; don't need to check if the user is logged in already twice
    */

	return (
		<div>
			{successfulInvite ? (
				<div
					style={{
						textAlign: "center",
						margin: "5%",
					}}
				>
					{currentUser && <Navigate to="/" />}
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
							style={{ width: "20%" }}
						></TextField>
						<TextField
							type="password"
							label="password"
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
					{currentUser && <Navigate to="/" />}
					<h1>Accept Invite</h1>
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
							type="password"
							label="Enter One Time Password"
							style={{ width: "20%" }}
							onChange={(e) => {
								setInviteId(e.target.value);
							}}
						></TextField>
						<Button
							size="large"
							variant="contained"
							style={{ width: "20%" }}
							onClick={isValidInvite()}
						>
							Continue
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AcceptInvitePage;
