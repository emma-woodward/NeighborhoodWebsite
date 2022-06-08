import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

/*
    Notes:
        - Need to create a table in db for invites with expiration date
        - Finish admin side of things
*/

function AcceptInvitePage() {
	const { currentUser, login } = useAuth();
	const [successfulInvite, setSuccessfulInvite] = useState(false);
	const [error, setError] = useState("");

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
						></TextField>
						<Button size="large" variant="contained" style={{ width: "20%" }}>
							Continue
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AcceptInvitePage;
