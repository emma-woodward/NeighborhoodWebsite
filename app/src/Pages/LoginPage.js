import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [error, setError] = useState("");
	const { currentUser, login } = useAuth();

	function handleLoginSubmit() {
		setError("");
		login(email, pass).catch((e) => {
			setError("Email or password is incorrect, try again!");
			setPass("");
		});
	}

	return (
		<div
			style={{
				textAlign: "center",
				margin: "5%",
			}}
		>
			{currentUser && <Navigate to="/" />}
			<h1>Login</h1>
			<p style={{ color: "red" }}>{error}</p>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: "1em",
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleLoginSubmit();
					}
				}}
			>
				<TextField
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					label="Email"
					style={{ width: "20%" }}
				></TextField>
				<TextField
					type="password"
					onChange={(e) => {
						setPass(e.target.value);
					}}
					label="Password"
					style={{ width: "20%" }}
				></TextField>
				<Button
					size="large"
					variant="contained"
					onClick={handleLoginSubmit}
					style={{ width: "20%" }}
				>
					Log in
				</Button>
			</div>
		</div>
	);
}

export default LoginPage;
