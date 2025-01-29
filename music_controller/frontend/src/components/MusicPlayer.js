import React from "react";
import { Typography, IconButton, Card, Grid, LinearProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MusicPlayer = ({ song, onPlayPause }) => {
  if (!song) {
    return <Typography variant="h6">No song currently playing.</Typography>;
  }

  const songProgress = song.duration > 0 ? (song.time / song.duration) * 100 : 0;

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item xs={4} align="center">
          <img src={song.image_url} alt={song.title} style={{ width: '100px', height: '100px' }} />
        </Grid>
        <Grid item xs={4} align="center">
          <Typography variant="h6" component="h6">{song.title || "Unknown Title"}</Typography>
          <Typography variant="subtitle1" component="h6">{song.artist || "Unknown Artist"}</Typography>
          <div>
            <IconButton onClick={onPlayPause}>
              {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress variant="determinate" value={Math.min(Math.max(songProgress, 0), 100)} />
        </Grid>
      </Grid>
      <Typography variant="body2" component="p">Duration: {song.duration} ms</Typography>
      <Typography variant="body2" component="p">Is Playing: {song.is_playing ? "Yes" : "No"}</Typography>
    </Card>
  );
};

export default MusicPlayer;