import { LessonData } from "../../../api/lesson/types";
import { FilterOptions } from "./types";

const includesText = (lessonText: string, seatchText: string): boolean =>
  lessonText.toLowerCase().includes(seatchText.toLowerCase());

export const getFilteredLessons = (
  lessons: LessonData[],
  filterOptions: FilterOptions
) =>
  lessons.filter(
    (lesson) =>
      includesText(lesson.title, filterOptions.searchText) ||
      includesText(lesson.videoUrl, filterOptions.searchText)
  );
