import React from "react"
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";


const MusicPlayer = ({ image_url, title, artist, isPlaying, time, duration }) => {
    const songProgress = duration > 0 ? (time / duration) * 100 : 0; // Prevent divide-by-zero errors.


    return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align="center" xs={4}>
                   <img src={image_url} height="100%" width="100%"  />
                </Grid>

                <Grid item align="center" xs={4}>
                    <Typography component="h5" variant="h5">
                        {title || "Unknown Title"}
                    </Typography>
                    <Typography color="textSecondary" variant="subtitle1">
                          {artist || "Unknown Artist"}
                    </Typography>
                    <div>
                        <IconButton>
                            {isPlaying ? <PauseIcon/> : <PlayArrowIcon/>}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={Math.min(Math.max(songProgress, 0), 100)} />
        </Card>
    )
}

export default MusicPlayer;