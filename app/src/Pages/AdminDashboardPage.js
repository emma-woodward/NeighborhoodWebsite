import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcement from "../Components/Announcement";
import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Alert,
	Snackbar,
} from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";

function AdminDashboardPage() {
	const { currentUser } = useAuth();
	const [openUserCreationWindow, setOpenUserCreationWindow] = useState(false);
	const [inviteMsg, setInviteMsg] = useState(
		"Hi!\n\nHere is your invitation code to our site https://www.google.com\nMention whatever else\n\n"
	);
	const [inviteCode, setInviteCode] = useState("");
	const [copiedToClipBoard, setCopiedToClipboard] = useState(false);

	const handleUserCreationWindowCloseWithoutCopy = () => {
		setOpenUserCreationWindow(false);
		fetch("/remove_invite", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				invite: inviteCode,
			}),
		});

		setInviteCode("");
	};

	const [announcement, setAnnouncement] = useState({
		timeStamp: "",
		title: "",
		message: "",
	});

	function convertTimeStamp(ts) {
		return new Date(ts).toLocaleString();
	}

	function getMostRecentAnnouncement() {
		try {
			// FIX:
			fetch("/most_recent_announcement", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((json) => {
					setAnnouncement({
						title: json.title,
						timeStamp: json.ts,
						message: json.message,
					});
				});
		} catch (e) {
			console.log(e);
		}
	}

	function getNewInvite() {
		try {
			fetch("/create_invite", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sessionId: currentUser.sessionId,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					setInviteCode(json.invite);
				});
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getMostRecentAnnouncement();
	}, []);

	/*
    Have a list of current users and have a way to remove them.
  	*/
	return (
		<div>
			<Card variant="outlined" className="dashboard-card">
				<CardContent>
					<h1>Most Recent Announcement</h1>
					<Announcement
						title={announcement.title}
						message={announcement.message}
						timestamp={convertTimeStamp(announcement.timeStamp)}
					/>
					<p
						style={{
							float: "right",
							fontWeight: "bold",
							color: "blue",
						}}
					>
						<Link to="/more_announcements">View More Announcements</Link>
					</p>
				</CardContent>
			</Card>
			<Card variant="outlined" className="dashboard-card">
				<CardContent>
					<h1>User Management</h1>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							gap: "1em",
						}}
					>
						<Button
							size="large"
							variant="contained"
							style={{ width: "20%" }}
							onClick={() => {
								setOpenUserCreationWindow(true);
								getNewInvite();
							}}
						>
							Invite User
						</Button>
					</div>
				</CardContent>
			</Card>
			<Dialog
				open={openUserCreationWindow}
				onClose={() => {
					setOpenUserCreationWindow(false);
				}}
			>
				<DialogTitle>Inviting a new user</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Modify the following message to your liking then copy message and
						email it off to whomever you would like to invite.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Message"
						type="email"
						fullWidth
						multiline
						minRows={4}
						variant="filled"
						defaultValue={inviteMsg}
						onChange={(e) => {
							setInviteMsg(e.target.value);
						}}
					/>
					<DialogContentText>Invite Code: {inviteCode}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleUserCreationWindowCloseWithoutCopy}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							setOpenUserCreationWindow(false);
							const copyThis = inviteMsg
								.concat("\nInvitation Code: ")
								.concat(inviteCode);
							navigator.clipboard.writeText(copyThis);
							setCopiedToClipboard(true);
						}}
					>
						Copy Message
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={copiedToClipBoard}
				autoHideDuration={6000}
				onClose={() => {
					setCopiedToClipboard(false);
				}}
			>
				<Alert
					variant="filled"
					severity="success"
					onClose={() => {
						setCopiedToClipboard(false);
					}}
				>
					Message Copied to clipboard
				</Alert>
			</Snackbar>
		</div>
	);
}

export default AdminDashboardPage;
