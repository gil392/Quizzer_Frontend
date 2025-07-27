import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { Achievement } from "../../../../api/achievements/types";
import { useState, useEffect } from "react";
import {
  getAvailableAchievements,
  getAchievementImage,
} from "../../../../api/achievements/api";
import { toastError } from "../../../../utils/utils";

interface AchievementIconPickerProps {
  open: boolean;
  onClose: () => void;
  profileImageUrl: string | undefined;
  onChooseIcon: (iconUrl: string, file: File) => void;
}

const AchievementIconPicker: React.FC<AchievementIconPickerProps> = ({
  open,
  onClose,
  profileImageUrl,
  onChooseIcon,
}) => {
  const [completedAchievements, setCompletedAchievements] = useState<
    Achievement[]
  >([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchAchievementsWithImages = async () => {
      try {
        const { data } = await getAvailableAchievements(
          undefined,
          abortController
        );
        const completed = data.filter((achievement) => achievement.isCompleted);

        const achievementsWithImages: Achievement[] = (
          await Promise.all(
            completed.map(async (achievement) => {
              try {
                const response = await getAchievementImage(achievement._id);
                const relativeUrl = URL.createObjectURL(response);
                return {
                  ...achievement,
                  reward: {
                    ...achievement.reward,
                    icon: relativeUrl,
                  },
                };
              } catch {
                return undefined;
              }
            })
          )
        ).filter((a) => a !== undefined);

        setCompletedAchievements(achievementsWithImages);
      } catch (error) {
        toastError("Failed to fetch achievements. Please try again later.");
      }
    };
    fetchAchievementsWithImages();
    return () => abortController.abort();
  }, []);

  const handleSetProfileImage = async (achievement: Achievement) => {
    try {
      const response = await fetch(achievement.reward.icon);
      const blob = await response.blob();
      const file = new File([blob], `${achievement.title}.png`, {
        type: "image/png",
      });

      onChooseIcon(achievement.reward.icon, file);
    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Achievement Icon</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {completedAchievements.map((ach) => (
            <Grid key={ach._id} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => handleSetProfileImage(ach)}
                size="large"
                title={ach.title}
              >
                <img
                  src={ach.reward.icon}
                  alt={ach.title}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    border:
                      profileImageUrl === ach.reward.icon
                        ? "2px solid #1976d2"
                        : "2px solid transparent",
                  }}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementIconPicker;
