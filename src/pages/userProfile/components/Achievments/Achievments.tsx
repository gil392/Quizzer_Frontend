import { Divider, Typography } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { getAvailableAchievements } from "../../../../api/achievements/api";
import { Achievement } from "../../../../api/achievements/types";
import SkeletonList from "../../../../components/SkeletonList/SkeletonList";
import AchievementItem from "./AchievementItem/AchievementItem";
import { useStyles } from "./styles";
import { moveCompletedAchievementsToEnd } from "./utils";

interface AchievmentsProps {
  className?: string;
  isEditing: boolean;
  setImageFile: (file: File | undefined) => void;
  setProfileImageUrl: (url: string | undefined) => void; 
}

const Achievments: FunctionComponent<AchievmentsProps> = (props) => {
  const { className, isEditing, setImageFile, setProfileImageUrl } = props; 
  const classes = useStyles();
  const [achievments, setAchievments] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAchievements = useCallback(
    async (abortController?: AbortController) => {
      setIsLoading(true);
      const { data } = await getAvailableAchievements(abortController);
      const achivements = moveCompletedAchievementsToEnd(data);
      setAchievments(achivements);
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchAchievements(abortController);

    return () => abortController.abort();
  }, []);

  const achievementsList = isLoading ? (
    <SkeletonList itemClassName={classes.skeletonItem} numberOfItems={6} />
  ) : (
    achievments.map((achievement, index) => (
      <>
        <AchievementItem 
          achievement={achievement}
          isEditing={isEditing} 
          setImageFile={setImageFile}
          setProfileImageUrl={setProfileImageUrl}
          /> 
        {index !== achievments.length - 1 && <Divider />}
      </>
    ))
  );

  return (
    <div className={clsx(classes.root, className)}>
      <section>
        <Typography gutterBottom variant="h5">
          Achievements
        </Typography>
      </section>
      <div className={clsx(classes.achievementsList, classes.scroller)}>
        {achievementsList}
      </div>
    </div>
  );
};

export default Achievments;
