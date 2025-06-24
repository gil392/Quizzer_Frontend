import { Card, CardContent, Skeleton, Box } from "@mui/material";
import useStyles from "./NotificationSkeleton.styles";

const NotificationSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Box className={classes.iconBox}>
        <Skeleton variant="circular" width={60} height={60} />
      </Box>
      <CardContent className={classes.content}>
        <Skeleton variant="text" width="90%" height={30} />
        <Skeleton variant="text" width="40%" height={20} />
      </CardContent>
      <Box className={classes.buttonBox}>
        <Skeleton variant="rounded" width={150} height={36} />
        <Skeleton variant="rounded" width={150} height={36} />
      </Box>
    </Card>
  );
};

export default NotificationSkeleton;
