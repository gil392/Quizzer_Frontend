import { Box, Button, Card, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createLessonAsync } from "../../../store/lessonReducer";
import { AppDispatch } from "../../../store/store";
import { toastWarning } from "../../../utils/utils";
import RelatedVideos from "../RelatedVideo/RelatedVideos";
import useStyles from "./LessonOverviewPage.styles.ts";
import { LessonData } from "../../../api/lesson/types";
import { getRelatedLessons } from "../../../api/lesson/api";
import { RelatedVideo } from "../../../api/lesson/types";
import LessonOverviewSkeleton from "./LessonOverviewSkeleton.tsx";
import { Summary } from "../../summary/Summary.tsx";
import { PAGES_ROUTES } from "../../../routes/routes.const.ts";

const LessonOverviewPage: React.FC = () => {
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;
  const quizSettings = location.state?.quizSettings;
  const relatedLessonGroupId = location.state?.relatedLessonGroupId;

  const classes = useStyles();

  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleQuizNavigation = async () => {
    if (!lessonData) {
      toastWarning("Lesson data is not available.");
      return;
    }

    try {
      navigate(PAGES_ROUTES.QUIZ, {
        state: {
          lessonData,
          quizSettings,
        },
      });
    } catch (error) {
      toastWarning("Failed to generate quiz. Please try again.");
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const data = await dispatch(
          createLessonAsync({ videoUrl, relatedLessonGroupId })
        ).unwrap();
        setLessonData(data);

        const { data: related } = await getRelatedLessons(data._id);
        setRelatedVideos(related);
        setLoading(false);
      } catch (error) {
        toastWarning("Failed to generate Lesson. Please try again.");
        console.error("Error generating lesson:", error);
        setLessonData(null);
        setRelatedVideos([]);
        setLoading(false);
      }
    })();
  }, [videoUrl]);

  if (loading) {
    return <LessonOverviewSkeleton />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.summaryBox}>
        {lessonData && (
          <Card className={classes.summaryCard}>
            <Typography variant="h5" className={classes.header}>
              Summary
            </Typography>
            <Typography variant="body1" className={classes.title}>
              {lessonData.title}
            </Typography>
            <Summary summary={lessonData.summary} />
            <Box className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleQuizNavigation}
              >
                Go to Quiz
              </Button>
            </Box>
          </Card>
        )}
      </Box>
      <Box className={classes.relatedBox}>
        <RelatedVideos
          videos={relatedVideos}
          relatedLessonGroupId={lessonData?.relatedLessonGroupId}
        />
      </Box>
    </Box>
  );
};

export default LessonOverviewPage;
