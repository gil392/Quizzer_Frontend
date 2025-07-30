import { Box, Paper, Skeleton, Typography } from "@mui/material";
import useStyles from "./LessonOverviewPage.styles";

const LessonOverviewSkeleton = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Paper
        className={classes.summaryBox}
        elevation={1}
        sx={{
          borderRadius: 1.5,
          p: 3,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "16px",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Summary
        </Typography>
        <Skeleton
          variant="text"
          width="60%"
          height={38}
          sx={{ mb: 2, borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={500}
          sx={{ mb: 2, borderRadius: 2 }}
        />
      </Paper>
      <Paper
        className={classes.relatedBox}
        elevation={1}
        sx={{
          borderRadius: 1.5,
          p: 3,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Related Videos
        </Typography>
        {[...Array(5)].map((_, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Skeleton
              variant="rounded"
              width={120}
              height={90}
              sx={{ mr: 2, borderRadius: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="95%" height={26} />
              <Skeleton variant="text" width="70%" height={18} />
              <Skeleton
                variant="rectangular"
                width="50%"
                height={32}
                sx={{ mt: 1, borderRadius: 2 }}
              />
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default LessonOverviewSkeleton;
