import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";

/**
 * InviteUserWindow Component
 *
 * @param {*} props
 * open- boolean to indicate when to open the window
 * sessionId- sessionId of the admin to authenticate
 */
function InviteUserWindow(props) {
	const [inviteMsg, setInviteMsg] = useState(
		"Hi!\n\nHere is your invitation code to our site https://www.google.com\nMention whatever else\n\n"
	);
	const [inviteCode, setInviteCode] = useState("");
	const [copiedToClipBoard, setCopiedToClipboard] = useState(false);

	const handleUserCreationWindowCloseWithoutCopy = () => {
		props.onClose();
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

	function getNewInvite() {
		try {
			fetch("/create_invite", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sessionId: props.sessionId,
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
		getNewInvite();
	}, []);

	return (
		<div>
			<Dialog
				open={props.open}
				onClose={() => {
					props.onClose();
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
							props.onClose();
							navigator.clipboard.writeText(inviteCode);
							setCopiedToClipboard(true);
						}}
					>
						Copy Only Code
					</Button>
					<Button
						onClick={() => {
							props.onClose();
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
			{/* TODO Put snackbar stuff on the admin page and return what kind of message it is along with the message */}
			{/* <Snackbar
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
			</Snackbar> */}
		</div>
	);
}

export default InviteUserWindow;
