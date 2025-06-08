import { LessonData } from "../../../../api/lesson/types";
import { SortableField } from "./types";

const sortByFavorite = (
  lesson: LessonData,
  compareLesson: LessonData
): number => {
  if (lesson.isFavorite !== compareLesson.isFavorite) {
    return lesson.isFavorite ? -1 : 1;
  }
  return lesson.title.localeCompare(compareLesson.title);
};

const sortByTitle = (lesson: LessonData, compareLesson: LessonData): number => {
  const titleComparison = lesson.title.localeCompare(compareLesson.title);
  if (titleComparison !== 0) {
    return titleComparison;
  }
  return lesson.isFavorite ? -1 : 1;
};

export const sortLessons = (
  lessons: LessonData[],
  sortByField: SortableField
) =>
  sortByField === "isFavorite"
    ? lessons.sort(sortByFavorite)
    : lessons.sort(sortByTitle);
