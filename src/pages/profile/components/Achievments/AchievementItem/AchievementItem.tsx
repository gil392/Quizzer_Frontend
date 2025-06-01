import { LinearProgress, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Achievement } from "../../../../../api/achievements/types";
import { useStyles } from "./styles";
import { formatNumberWithPostfix } from "./utils";

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: FunctionComponent<AchievementItemProps> = (props) => {
  const { achievement } = props;
  const classes = useStyles();

  const progresses = achievement.requirements.map(({ value, count }) => (
    <div className={classes.progress}>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        className={classes.progressLabel}
      >
        {value}/{count}
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
          src="/images/achievement1.png"
          alt="tome"
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
        <div>{progresses}</div>
      </section>

      {achievement.isCompleted ? (
        <div className={classes.completedPlate} />
      ) : null}
    </div>
  );
};

export default AchievementItem;
