import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

import CreateRoom from "./CreateRoom"; // Default import
import RoomJoin from "./RoomJoin"; // Default import

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Routes>
                <Route path='/join' element={<RoomJoin />}/>
              <Route path='/create' element={<CreateRoom />}/>
              <Route path='/' element={<p> This is the Home Page </p>}/>
                </Routes>
            </Router>
        );
    }
}
