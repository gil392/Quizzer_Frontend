import { IconButton, LinearProgress, Typography, Box } from "@mui/material";
import { min } from "ramda";
import { FunctionComponent, useEffect, useState } from "react";
import { Achievement } from "../../../../../api/achievements/types";
import { formatNumberWithPostfix } from "./utils";
import { getAchievementImage } from "../../../../../api/achievements/api";
import { useStyles } from "./styles";
import { Share } from "@mui/icons-material";
import ShareDialog from "../../../../../components/Share/ShareDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { shareAchievementAsync } from "../../../../../store/notificationReducer";
import { fetchFriends } from "../../../../../store/userReducer";
import { UserWithId } from "../../../../../api/user/types";
import { useTheme } from "@mui/material/styles";

interface AchievementItemProps {
  achievement: Achievement;
  isEditing: boolean;
  setImageFile: (file: File | undefined) => void;
  setProfileImageUrl: (url: string | undefined) => void;
  showShare: boolean;
  user: UserWithId;
}

const AchievementItem: FunctionComponent<AchievementItemProps> = (props) => {
  const {
    achievement,
    isEditing,
    setImageFile,
    setProfileImageUrl,
    showShare,
    user,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.user.friends);
  const friendsWithSharedAchievement = friends.map((friend) => ({
    ...friend,
    wasSentTo: false,
  }));

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  useEffect(() => {
    const fetchAchievementImage = async () => {
      try {
        const response = await getAchievementImage(achievement._id);
        const blobUrl = URL.createObjectURL(response);
        setImageSrc(blobUrl);
      } catch (error) {
        console.error(
          `Error fetching image for achievement ${achievement._id}:`,
          error
        );
      }
    };

    fetchAchievementImage();
  }, [achievement._id]);

  const handleSetProfileImage = async () => {
    try {
      const response = await fetch(imageSrc || "//images/achievement1.png");
      const blob = await response.blob();
      const file = new File([blob], `${achievement.title}.png`, {
        type: "image/png",
      });

      setImageFile(file);
      setProfileImageUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  };

  const handleOpenShareDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShareDialogOpen(true);
  };

  const handleCloseShareDialog = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    setShareDialogOpen(false);
  };

  const handleShareAchievement = async (friendIds: string[]) => {
    await dispatch(
      shareAchievementAsync({
        toUserIds: friendIds,
        relatedEntityId: user._id,
      })
    );
    setShareDialogOpen(false);
  };

  const progresses = achievement.requirements.map(({ value, count }) => (
    <div className={classes.progress} key={value}>
      <Typography variant="subtitle2" className={classes.progressLabel}>
        {min(value, count)}/{count}
      </Typography>
      <LinearProgress
        variant="determinate"
        className={classes.progressBarRoot}
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
        value={(value / count) * 100}
      />
    </div>
  ));

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: achievement.isCompleted
          ? theme.palette.secondary.main
          : "transparent",
        position: "relative",
      }}
    >
      <section className={classes.rewardSection}>
        <div className={classes.iconWrapper}>
          <img
            className={classes.rewardIcon}
            src={imageSrc || "//images/achievement1.png"}
            alt={achievement.title}
            style={{
              filter: achievement.isCompleted ? "none" : "grayscale(100%)",
            }}
          />
          {achievement.isCompleted && isEditing && (
            <div
              className={classes.iconOverlay}
              onClick={handleSetProfileImage}
            >
              <Typography variant="caption" className={classes.overlayText}>
                Change Profile Icon
              </Typography>
            </div>
          )}
        </div>
        <Box className={classes.rewardInfo}>
          <Typography variant="caption" fontFamily="monospace">
            {formatNumberWithPostfix(achievement.reward.xp)}
            <span className={classes.rewardXp}>xp</span>
          </Typography>
        </Box>
      </section>

      <section className={classes.detailsSection}>
        <div className={classes.detailsHeader}>
          <div>
            <Typography variant="subtitle1" fontWeight="bold">
              {achievement.title}
            </Typography>
            <Typography variant="body2">{achievement.description}</Typography>
          </div>
          {showShare && achievement.isCompleted && (
            <IconButton
              color="primary"
              size="small"
              onClick={handleOpenShareDialog}
              sx={{ alignSelf: "flex-start", marginLeft: 1 }}
              title="Share this achievement"
            >
              <Share />
            </IconButton>
          )}
          <ShareDialog
            open={shareDialogOpen}
            dialogType="Achievement"
            onClose={handleCloseShareDialog}
            friends={friendsWithSharedAchievement}
            onShare={handleShareAchievement}
          />
        </div>
        {progresses}
      </section>
    </div>
  );
};

export default AchievementItem;
