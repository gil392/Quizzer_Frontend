import React, { useEffect } from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import { RelatedVideo } from "../../../api/lesson/types";
import { formatPublishTime, formatViews } from "../../../utils/utils";
import useStyles from "./RelatedVideos.styles";
import { LessonImage } from "./LessonImage";

interface RelatedVideosProps {
  videos: RelatedVideo[];
  relatedLessonGroupId?: string;
}
const RelatedVideos: React.FC<RelatedVideosProps> = ({
  videos,
  relatedLessonGroupId,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleGenerateLesson = (video: RelatedVideo) => {
    navigate(PAGES_ROUTES.GENERATE_LESSON, {
      state: {
        videoUrl: `https://youtube.com/watch?v=${video.videoId}`,
        relatedLessonGroupId,
      },
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
              <LessonImage
                video={{
                  duration: video.duration,
                  url: video.snippet.thumbnail.url,
                  title: video.snippet.title,
                }}
                onClick={() => handleOpenYoutube(video)}
                imageSizeClassname={classes.imageSize}
              />
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
