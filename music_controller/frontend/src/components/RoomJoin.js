// RoomJoin.js
import { Grid2, TextField, Typography } from "@mui/material";
import React, { Component } from "react";

export default class RoomJoin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomCode:"",
            error:""
        }
    }
    render() {
        return (
            <Grid2 container spacing={1} alignItems="center">
                <Grid2 item xs={12}>
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid2>

                <Grid2 item xs={12}>
                    <TextField
                    error="error"
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={this.state.roomCode}
                    helperText={this.state.error}
                    variant="outlined"></TextField>
                </Grid2>
            </Grid2>
        );
    }
}
