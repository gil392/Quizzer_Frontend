import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  Button,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import { getRelatedLessons } from "../../../api/lesson/api";
import { RelatedVideo } from "../../../api/lesson/types";
import {
  formatPublishTime,
  formatViews,
  formatDuration,
} from "../../../utils/utils";

interface RelatedVideosProps {
  lessonId: string;
}
const RelatedVideos: React.FC<RelatedVideosProps> = ({ lessonId }) => {
  const [videos, setVideos] = useState<RelatedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        setError(false);
        const { data } = await getRelatedLessons(lessonId);
        setVideos(data);
      } catch (error) {
        setError(true);
        setVideos([]);
        console.error("Error fetching related videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedVideos();
  }, [lessonId]);

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
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Related Videos
      </Typography>
      {loading ? (
        <List sx={{ width: "100%" }}>
          {[...Array(4)].map((_, idx) => (
            <ListItem
              key={idx}
              alignItems="flex-start"
              sx={{
                borderRadius: 1,
                mb: 1,
                minHeight: 100,
                px: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  width: "100%",
                  gap: 1.5,
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={68}
                  sx={{ flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Skeleton variant="text" width="90%" height={22} />
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="text" width="50%" height={14} />
                  <Skeleton
                    variant="rectangular"
                    width={110}
                    height={36}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : error || videos.length === 0 ? (
        <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
          No related videos found.
        </Box>
      ) : (
        <List sx={{ width: "100%" }}>
          {videos.slice(0, 5).map((video) => (
            <ListItem
              key={video.videoId}
              alignItems="flex-start"
              sx={{
                borderRadius: 1,
                mb: 1,
                minHeight: 100,
                px: 1,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
              disableGutters
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  width: "100%",
                  gap: 1,
                }}
              >
                {/* Thumbnail */}
                <Box
                  sx={{
                    position: "relative",
                    minWidth: video.snippet.thumbnail.width,
                    width: video.snippet.thumbnail.width,
                    height: video.snippet.thumbnail.height,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  onClick={() => handleOpenYoutube(video)}
                >
                  <Avatar
                    variant="rounded"
                    src={video.snippet.thumbnail.url}
                    sx={{
                      width: video.snippet.thumbnail.width,
                      height: video.snippet.thumbnail.height,
                    }}
                    alt={video.snippet.title}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.8)",
                      color: "#fff",
                      px: 0.5,
                      py: 0,
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      pointerEvents: "none",
                    }}
                  >
                    {formatDuration(video.duration)}
                  </Box>
                </Box>
                {/* Data and Button */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 600,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.2,
                      maxHeight: "2.4em",
                      mb: 0.2,
                    }}
                    onClick={() => handleOpenYoutube(video)}
                  >
                    {video.snippet.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      fontSize: "0.85em",
                      lineHeight: 1.2,
                    }}
                    noWrap
                  >
                    {video.snippet.channelTitle}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      fontSize: "0.78em",
                      lineHeight: 1.2,
                      mt: 0.2,
                    }}
                  >
                    {formatPublishTime(video.snippet.publishTime)} •{" "}
                    {formatViews(video.views)}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 1.2,
                      alignSelf: "flex-start",
                      whiteSpace: "nowrap",
                      minWidth: 110,
                    }}
                    onClick={() => handleGenerateLesson(video)}
                  >
                    Generate Lesson
                  </Button>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default RelatedVideos;
