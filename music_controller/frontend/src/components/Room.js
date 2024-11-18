import React, { useState, useEffect } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import { Typography, Button, Grid } from "@mui/material";

const Room = () => {
    const { roomCode } = useParams();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const navigate = useNavigate();



    const leaveButtonPressed = () => {
        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
    
        fetch("/api/leave-room", requestOption)
            .then((response) => {
                if (response.ok) {
                    navigate("/"); // Redirect only on successful request
                } else {
                    console.error("Failed to leave the room:", response.statusText);
                    alert("Failed to leave the room. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Network error:", error);
                alert("Network error occurred. Please check your connection and try again.");
            });
    };
    
    const updateShowSettings(value) {
      this.setState({
        showSettings: value,
      });
    }

    useEffect(() => {
        const getRoomDetails = () => {
            fetch("/api/get-room?code=" + roomCode)
                .then((response) => response.json())
                .then((data) => {
                    setVotesToSkip(data.votes_to_skip);
                    setGuestCanPause(data.guest_can_pause);
                    setIsHost(data.is_host);
                })
                .catch((error) => console.log("Error fetching room details:", error));
        };

        getRoomDetails();
    }, [roomCode]);



    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code : {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes : {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause : {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host : {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default Room;
