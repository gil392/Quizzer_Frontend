import { IconButton, LinearProgress, Typography, Box } from "@mui/material";
import { min } from "ramda";
import { FunctionComponent, useEffect, useState } from "react";
import { Achievement } from "../../../../../api/achievements/types";
import { formatNumberWithPostfix } from "./utils";
import { getAchievementImage } from "../../../../../api/achievements/api";
import { useStyles } from "./styles";
import { Share, Twitter } from "@mui/icons-material";
import ShareDialog from "../../../../../components/Share/ShareDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";

import { shareAchievementAsync } from "../../../../../store/notificationReducer";
import { fetchFriends } from "../../../../../store/userReducer";
import { UserWithId } from "../../../../../api/user/types";
import { useTheme } from "@mui/material/styles";
import { toastSuccess } from "../../../../../utils/utils";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import WhatsAppShareButton from "../../WhatsappShareButton";
import TwitterShareButton from "../../TwitterShareButton";

// Use a public image for testing
const SHARE_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg";

interface AchievementItemProps {
  achievement: Achievement;
  isEditing: boolean;
  setImageFile: (file: File | undefined) => void;
  setProfileImageUrl: (url: string | undefined) => void;
  showShare: boolean;
  user: UserWithId;
  setFriendsWithSharedAchievement: (friends: string[]) => void;
}

const AchievementItem: FunctionComponent<AchievementItemProps> = (props) => {
  const {
    achievement,
    isEditing,
    setImageFile,
    setProfileImageUrl,
    showShare,
    setFriendsWithSharedAchievement,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) => state.user.friends);
  const friendsWithSharedAchievement = friends.map((friend) => ({
    ...friend,
    wasSentTo: achievement.sharedUsers.includes(friend._id),
  }));
  const shareMessage = `🎉 I just unlocked "${achievement.title}" on Quizzer!\nDescription: ${achievement.description}\nXP: ${achievement.reward.xp}`;

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
        relatedEntityId: achievement._id,
      })
    );
    setFriendsWithSharedAchievement(friendIds);
    toastSuccess("Shared the achievement with selected friends");
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
          {achievement.isCompleted && (
            <div>
              {showShare && (
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
              <WhatsAppShareButton message={shareMessage} />
              <TwitterShareButton message={shareMessage} />
            </div>
          )}
          {shareDialogOpen && (
            <ShareDialog
              open={shareDialogOpen}
              dialogType="Achievement"
              onClose={handleCloseShareDialog}
              friends={friendsWithSharedAchievement}
              onShare={handleShareAchievement}
            />
          )}
        </div>
        {progresses}
      </section>
    </div>
  );
};

export default AchievementItem;
