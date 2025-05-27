import React from "react";
import { Box, Typography, List, ListItem, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import { RelatedVideo } from "../../../api/lesson/types";
import {
  formatPublishTime,
  formatViews,
  formatDuration,
} from "../../../utils/utils";
import useStyles from "./RelatedVideos.styles";

interface RelatedVideosProps {
  videos: RelatedVideo[];
}
const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleGenerateLesson = (video: RelatedVideo) => {
    navigate(PAGES_ROUTES.GENERATE_LESSON, {
      state: { videoUrl: `https://youtube.com/watch?v=${video.videoId}` },
    });
  };

  const handleOpenYoutube = (video: RelatedVideo) => {
    window.open(
      `https://youtube.com/watch?v=${video.videoId}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Related Videos
      </Typography>
      <List className={classes.list}>
        {videos.slice(0, 5).map((video) => (
          <ListItem
            key={video.videoId}
            className={classes.listItem}
            disableGutters
          >
            <Box className={classes.itemBox}>
              <Box
                className={classes.thumbnailBox}
                onClick={() => handleOpenYoutube(video)}
              >
                <Avatar
                  variant="rounded"
                  src={video.snippet.thumbnail.url}
                  className={classes.thumbnail}
                  alt={video.snippet.title}
                />
                <Box className={classes.durationOverlay}>
                  {formatDuration(video.duration)}
                </Box>
              </Box>
              <Box className={classes.dataBox}>
                <Typography
                  variant="subtitle2"
                  className={classes.title}
                  onClick={() => handleOpenYoutube(video)}
                >
                  {video.snippet.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className={classes.channel}
                  noWrap
                >
                  {video.snippet.channelTitle}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className={classes.meta}
                >
                  {formatPublishTime(video.snippet.publishTime)} •{" "}
                  {formatViews(video.views)}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={() => handleGenerateLesson(video)}
                >
                  Generate Lesson
                </Button>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RelatedVideos;
