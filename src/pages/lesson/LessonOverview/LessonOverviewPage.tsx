import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Summary from "../../Summary";
import { useEffect, useState } from "react";
import RelatedVideos from "../RelatedVideo/RelatedVideos";
import useStyles from "./LessonOverviewPage.styles.ts";
import { LessonData } from "../../../api/lesson/types";
import { generateLesson, getRelatedLessons } from "../../../api/lesson/api";
import { RelatedVideo } from "../../../api/lesson/types";
import LessonOverviewSkeleton from "./LessonOverviewSkeleton.tsx";

const LessonOverviewPage: React.FC = () => {
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;
  const quizSettings = location.state?.quizSettings;
  const classes = useStyles();

  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    generateLesson(videoUrl)
      .then(({ data: lesson }) => {
        setLessonData(lesson);
        return getRelatedLessons(lesson._id).then(({ data }) => {
          setRelatedVideos(data);
          setLoading(false);
        });
      })
      .catch(() => {
        setLessonData(null);
        setRelatedVideos([]);
        setLoading(false);
      });
  }, [videoUrl]);

  if (loading) {
    return <LessonOverviewSkeleton />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.summaryBox}>
        {lessonData && (
          <Summary lessonData={lessonData} quizSettings={quizSettings} />
        )}
      </Box>
      <Box className={classes.relatedBox}>
        <RelatedVideos videos={relatedVideos} />
      </Box>
    </Box>
  );
};

export default LessonOverviewPage;
