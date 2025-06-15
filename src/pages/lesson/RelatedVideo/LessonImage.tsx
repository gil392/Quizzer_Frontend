import { Box, Avatar } from "@mui/material";
import { formatDuration } from "../../../utils/utils";
import useStyles from "./LessonImage.styles";
import clsx from "clsx";

type LessonImageVideo = {
  title: string;
  duration?: string;
  url: string;
};
type LessonImageProps = {
  video: LessonImageVideo;
  onClick?: () => void;
  imageSizeClassname?: string;
};
export function LessonImage(props: LessonImageProps) {
  const classes = useStyles();
  return (
    <Box className={classes.thumbnailBox} onClick={props.onClick}>
      <Avatar
        variant="rounded"
        src={props.video.url}
        className={clsx(classes.thumbnail, props.imageSizeClassname)}
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
