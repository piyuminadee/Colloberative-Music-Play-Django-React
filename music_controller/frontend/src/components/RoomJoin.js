import { Button, TextField, Typography, Grid } from "@mui/material";
import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

class RoomJoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    }

    handleTextFieldChange = (e) => {
        this.setState({
            roomCode: e.target.value,
        });


    };

    render() {
        return (
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        error={Boolean(this.state.error)}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary"  onClick={this.roomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" component={Link} to="/">
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    roomButtonPressed() {
        // console.log(this.state.roomCode)
        const requestOptions = {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                code:this.state.roomCode
            })
        };
        fetch('/api/join-room', requestOptions)
          .then((response)=>{
            if(response.ok){
                this.props.navigate(`/room/${this.state.roomCode}`);
            } else {
                this.setState({error: "Room not found"});
            }
          })
          .catch((error)=>{
            console.log(error);
            
          })
    }

    
    
    
}


function RoomJoinWrapper(props) {
    const navigate = useNavigate();
    return <RoomJoin {...props} navigate={navigate} />;
}

export { RoomJoin };
export default RoomJoinWrapper;