import { LinearProgress, Typography } from "@mui/material";
import { min } from "ramda";
import { FunctionComponent, useEffect, useState } from "react";
import { Achievement } from "../../../../../api/achievements/types";
import { formatNumberWithPostfix } from "./utils";
import { getAchievementImage } from "../../../../../api/achievements/api";
import { useStyles } from "./styles";

interface AchievementItemProps {
  achievement: Achievement;
  isEditing: boolean;
  setImageFile: (file: File | undefined) => void;
  setProfileImageUrl: (url: string | undefined) => void;
}

const AchievementItem: FunctionComponent<AchievementItemProps> = (props) => {
  const { achievement, isEditing, setImageFile, setProfileImageUrl} = props;
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievementImage = async () => {
      try {
        const response = await getAchievementImage(achievement._id);
        const blobUrl = URL.createObjectURL(response);
        setImageSrc(blobUrl);
      } catch (error) {
        console.error(`Error fetching image for achievement ${achievement._id}:`, error);
      }
    };

    fetchAchievementImage();
  }, [achievement._id]);

  const handleSetProfileImage = async () => {
    try {
      const response = await fetch(imageSrc || "//images/achievement1.png");
      const blob = await response.blob();
      const file = new File([blob], `${achievement.title}.png`, { type: "image/png" });

      setImageFile(file);
      setProfileImageUrl(URL.createObjectURL(blob));

    } catch (error) {

      console.error("Failed to update profile image:", error);

    }
  };

  const progresses = achievement.requirements.map(({ value, count }) => (
    <div className={classes.progress} key={value}>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        className={classes.progressLabel}
      >
        {min(value, count)}/{count}
      </Typography>
      <LinearProgress
        variant="determinate"
        classes={{ bar: classes.progressBar }}
        className={classes.progressBarRoot}
        value={(value / count) * 100}
      />
    </div>
  ));

  return (
    <div
      className={classes.root}
      style={{
        backgroundColor: achievement.isCompleted ? "rgba(0, 255, 0, 0.2)" : "transparent",
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
        <Typography
          variant="caption"
          fontFamily="monospace"
          color="textSecondary"
        >
          {formatNumberWithPostfix(achievement.reward.xp)}
          <span className={classes.rewardXp}>xp</span>
        </Typography>
      </section>

      <section className={classes.detailsSection}>
        <Typography variant="subtitle1" fontWeight="bold">
          {achievement.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {achievement.description}
        </Typography>
        {progresses}
      </section>
    </div>
  );
};

export default AchievementItem;
