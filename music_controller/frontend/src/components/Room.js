import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Grid2 } from "@mui/material";
import CreateRoom from "./CreateRoom";

const Room = () => {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [song, setSong] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const navigate = useNavigate();

  const getCurrentSong = () => {
    fetch('/spotify/current-song')
      .then((response) => {
        if (response.status === 204) {
          // Handle the no-content scenario
          return {}; // Return an empty object
        }
        if (!response.ok) {
          console.error("Error fetching current song:", response.statusText);
          return {}; // Return an empty object on error
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        if (Object.keys(data).length === 0) {
          console.log("No song currently playing.");
          setSong(null); // Set song to null if no data
        } else {
          setSong(data); // Update the `song` state with the fetched data
        }
      })
      .catch((error) => {
        console.error("Network error fetching current song:", error);
      });
  };
  

  const leaveButtonPressed = () => {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": window.csrfToken || "",
      },
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
        alert(
          "Network error occurred. Please check your connection and try again."
        );
      });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoom
            update={true}
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const getRoomDetails = () => {
    fetch("/api/get-room?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        if (data.is_host) {
          authenticatedSpotify();
        }
      })

      .catch((error) => console.log("Error fetching room details:", error));
  };

  useEffect(() => {
    if (roomCode) {
      getRoomDetails();
      const interval = setInterval(getCurrentSong, 1000); // Fetch the current song every 1 second
      return () => clearInterval(interval); // Cleanup interval on component unmount
    } else {
      console.error("Room code is not available");
    }
  }, [roomCode]);

  const authenticatedSpotify = () => {
    fetch("/spotify/is_authenticated")
      .then((response) => response.json())
      .then(data => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then(data => {
              window.location.replace(data.url);
            })
            .catch((error) => console.error("Error getting auth URL:", error));
        }
      })
      .catch((error) => console.error("Error authenticating Spotify:", error));
  };
  

  return showSettings ? (
    renderSettings()
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code : {roomCode}
        </Typography>
      </Grid>
      {/* <Grid item xs={12} align="center">
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
      </Grid> */}
      {song}
      {isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
