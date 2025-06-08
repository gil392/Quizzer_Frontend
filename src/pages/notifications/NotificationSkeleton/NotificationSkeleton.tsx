import { Card, CardContent, Skeleton, Box } from "@mui/material";
import useStyles from "./NotificationSkeleton.styles";

const NotificationSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Box className={classes.iconBox}>
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
      <CardContent className={classes.content}>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="40%" height={16} />
      </CardContent>
      <Box className={classes.buttonBox}>
        <Skeleton variant="rectangular" width={80} height={36} />
      </Box>
    </Card>
  );
};

export default NotificationSkeleton;
