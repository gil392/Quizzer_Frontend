import Box from "@mui/material/Box";
import { LessonData } from "../../services/backend/types";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./LessonItem.module.css";

type LessonItemProps = {
  lesson: LessonData;
};

const LessonItem = (props: LessonItemProps) => {
  return (
    <Box className={classes.lessonItem}>
      <Typography
        variant="body1"
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {props.lesson.title}
      </Typography>
      <IconButton onClick={() => console.log("Delete lesson")}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
  return <Box>{props.lesson.title}</Box>;
};

export default LessonItem;
