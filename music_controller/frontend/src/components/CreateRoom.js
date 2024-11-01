import React, { Component } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";

class CreateRoom extends Component {
    defaultVotes = 2;
  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      VotesToSkip: this.defaultVotes,
      votes: 2, // Setting default value in state
    };
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);

  }

  handleVotesChange(e) {
    this.setState({
      VotesToSkip: e.target.value
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  //inside this function send the all information about creating room into endpoint
  handleRoomButtonPressed() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': window.csrfToken,
        },
        body : JSON.stringify({     //js object convert to json obj
            votes_to_skip: this.state.VotesToSkip,
            guest_can_pause: this.state.guestCanPause
        }),
    };
   
    fetch("/api/create-room", requestOptions)
    .then((response) =>response.json()   //after get response convert it to json obj
    .then((data)=>console.log(data))
);
  }

  

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
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
              onChange={this.handleVotesChange}
              defaultValue={this.state.votes} // Accessing state
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
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
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
  }
}

export default CreateRoom;
