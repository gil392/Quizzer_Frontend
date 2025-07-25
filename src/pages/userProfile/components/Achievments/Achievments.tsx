import { Divider, Typography } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { getAvailableAchievements } from "../../../../api/achievements/api";
import { Achievement } from "../../../../api/achievements/types";
import SkeletonList from "../../../../components/SkeletonList/SkeletonList";
import AchievementItem from "./AchievementItem/AchievementItem";
import { useStyles } from "./styles";
import { moveCompletedAchievementsToEnd } from "./utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { toastError } from "../../../../utils/utils";

interface AchievmentsProps {
  className?: string;
  isEditing: boolean;
  setImageFile: (file: File | undefined) => void;
  setProfileImageUrl: (url: string | undefined) => void;
  friendUserId?: string;
}

const Achievments: FunctionComponent<AchievmentsProps> = (props) => {
  const {
    className,
    isEditing,
    setImageFile,
    setProfileImageUrl,
    friendUserId: friendUserId,
  } = props;
  const classes = useStyles();
  const [achievments, setAchievments] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAchievements = useCallback(
    async (abortController?: AbortController) => {
      setIsLoading(true);
      try {
        const { data } = await getAvailableAchievements(
          friendUserId,
          abortController
        );
        const sortedAchievements = moveCompletedAchievementsToEnd(data);
        setAchievments(sortedAchievements);
      } catch (error) {
        toastError("Failed to fetch achievements. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    },
    [friendUserId]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchAchievements(abortController);

    return () => abortController.abort();
  }, [fetchAchievements]);

  const { loggedUser } = useSelector((state: RootState) => state.user);

  const achievementsList = isLoading ? (
    <SkeletonList itemClassName={classes.skeletonItem} numberOfItems={6} />
  ) : (
    achievments.map(
      (achievement, index) =>
        loggedUser && (
          <div
            key={achievement._id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AchievementItem
              achievement={achievement}
              isEditing={isEditing}
              setImageFile={setImageFile}
              setProfileImageUrl={setProfileImageUrl}
              showShare={friendUserId ? false : true}
              user={loggedUser}
              setFriendsWithSharedAchievement={(friends) =>
                setAchievments((prev) =>
                  prev.map((achievementToCheck) =>
                    achievementToCheck._id === achievement._id
                      ? { ...achievementToCheck, sharedUsers: friends }
                      : achievementToCheck
                  )
                )
              }
            />
            {index !== achievments.length - 1 && (
              <Divider style={{ width: "100%" }} />
            )}
          </div>
        )
    )
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
