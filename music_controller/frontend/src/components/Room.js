import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
    const { roomCode } = useParams(); // Get roomCode from the URL
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        // Fetch room details when component mounts
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
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
};

export default Room;
