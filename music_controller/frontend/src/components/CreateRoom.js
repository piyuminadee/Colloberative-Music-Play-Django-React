import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  TextField,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Button,
  Collapse,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CreateRoom = ({
  votesToSkip = 2,
  guestCanPause = true,
  update = false,
  roomCode = null,
  updateCallback = () => {},
}) => {
  const navigate = useNavigate();
  const title = update ? "Update Room" : "Create Room";

  const [guestCanPauseState, setGuestCanPauseState] = useState(guestCanPause);
  const [votesToSkipState, setVotesToSkipState] = useState(votesToSkip);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleVotesChangeState = (e) => setVotesToSkipState(e.target.value);
  const handleGuestCanPauseChange = (e) =>
    setGuestCanPauseState(e.target.value === "true");

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to create room.");
      })
      .then((data) => navigate("/room/" + data.code))
      .catch((error) => setErrorMsg(error.message));
  };

  const handleUpdateRoomButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkipState,
        guest_can_pause: guestCanPauseState,
        code: roomCode,
      }),
    };

    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMsg("Room updated successfully!");
          setErrorMsg("");
        } else {
          setSuccessMsg("");
          setErrorMsg("Error updating room...");
        }
      })
      .catch((error) => setErrorMsg(error.message));
  };

  const renderCreateButtons = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );

  const renderUpdateButton = () => (
    <Grid item xs={12} align="center">
      <Button
        color="primary"
        variant="contained"
        onClick={handleUpdateRoomButtonPressed}
      >
        Update A Room
      </Button>
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg || successMsg}>
          {successMsg && <Typography color="primary">{successMsg}</Typography>}
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
        </Collapse>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPauseState.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required
            type="number"
            onChange={handleVotesChangeState}
            defaultValue={votesToSkipState}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {update ? renderUpdateButton() : renderCreateButtons()}
    </Grid>
  );
};

export default CreateRoom;
