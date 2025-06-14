import { Box, Avatar } from "@mui/material";
import { formatDuration } from "../../../utils/utils";
import useStyles from "./LessonImage.styles";

type LessonImageVideo = {
  title: string;
  duration?: string;
  url: string;
};
type LessonImageProps = {
  video: LessonImageVideo;
  onClick?: () => void;
};
export function LessonImage(props: LessonImageProps) {
  const classes = useStyles();
  return (
    <Box className={classes.thumbnailBox} onClick={props.onClick}>
      <Avatar
        variant="rounded"
        src={props.video.url}
        className={classes.thumbnail}
        alt={props.video.title}
      />
      {props.video.duration && (
        <Box className={classes.durationOverlay}>
          {formatDuration(props.video.duration)}
        </Box>
      )}
    </Box>
  );
}
