import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Announcement from "../Components/Announcement";
import { Button } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
import InviteUserWindow from "../Components/InviteUserWindow";

function AdminDashboardPage() {
	const { currentUser } = useAuth();
	const [openUserCreationWindow, setOpenUserCreationWindow] = useState(false);

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
							}}
						>
							Invite User
						</Button>
					</div>
				</CardContent>
			</Card>
			<InviteUserWindow
				open={openUserCreationWindow}
				onClose={() => {
					setOpenUserCreationWindow(false);
				}}
				sessionId={currentUser.sessionId}
			/>
		</div>
	);
}

export default AdminDashboardPage;
