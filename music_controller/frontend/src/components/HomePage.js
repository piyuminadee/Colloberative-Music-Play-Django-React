import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";

import CreateRoom from "./CreateRoom"; // Default import
import RoomJoin from "./RoomJoin"; // Default import
import Room from "./Room";
import { Navigate } from "react-router-dom";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount(){
        fetch("/api/user-in-room")
          .then((response)=> response.json())
          .then((data) => {
            this.setState({
                roomCode: data.code,
            });
          });
    }

    renderHomePage() {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography variant="h3" compact="h3">
                House Party
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="primary" to="/join" component={Link}>
                  Join a Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create a Room
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        );
      }

    clearRoomCode() {
        this.setState({
          roomCode: null,
        });
      }
    

    render() {
        return (
            <Router>
                <Routes>
                <Route
                        path="/"
                        element={
                            this.state.roomCode ? (
                                <Navigate to={`/room/${this.state.roomCode}`} />
                            ) : (
                                this.renderHomePage()
                            )
                        }
                    />
                <Route path='/join' element={<RoomJoin />}/>
              <Route path='/create' element={<CreateRoom />}/>
              {/* <Route path="/room/:roomCode" element={<Room />} /> */}
              <Route
    path="/room/:roomCode"
    element={
      <Room leaveRoomCallback={this.clearRoomCode} />
    }
/>
              {/* <Route path='/' element={<p> This is the Home Page </p>}/> */}
                </Routes>
            </Router>
        );
    }
}
