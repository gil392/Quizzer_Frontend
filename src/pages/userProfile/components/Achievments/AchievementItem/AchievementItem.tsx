import { LinearProgress, Typography } from "@mui/material";
import { min } from "ramda";
import { FunctionComponent, useEffect, useState } from "react";
import { Achievement } from "../../../../../api/achievements/types";
import { useStyles } from "./styles";
import { formatNumberWithPostfix } from "./utils";
import { getAchievementImage } from "../../../../../api/achievements/api";

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: FunctionComponent<AchievementItemProps> = (props) => {
  const { achievement } = props;
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


  const progresses = achievement.requirements.map(({ value, count }) => (
    <div className={classes.progress}>
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
    <div className={classes.root}>
      <section className={classes.rewardSection}>
        <img
          className={classes.rewardIcon}
          src={imageSrc || "//images/achievement1.png"}
          alt={achievement.title}
        />
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

      {achievement.isCompleted && <div className={classes.completedPlate} />}
    </div>
  );
};

export default AchievementItem;
