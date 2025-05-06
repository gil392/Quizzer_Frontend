import { QuizSettings } from "../../../api/quiz/types";

export const getOppositeDisplayMode = (
  displayMode: QuizSettings["displayMode"]
): QuizSettings["displayMode"] => {
  switch (displayMode) {
    case "Light":
      return "Dark";
    case "Dark":
      return "Light";
  }
};
