import { LessonData } from "../../../api/lesson/types";
import { getVideoLink } from "../LessonInfo/LessonInfo";
import { FilterOptions } from "./types";

const includesText = (
  lessonText: string | undefined,
  seatchText: string
): boolean =>
  lessonText
    ? lessonText.toLowerCase().includes(seatchText.toLowerCase())
    : false;

export const getFilteredLessons = (
  lessons: LessonData[],
  filterOptions: FilterOptions
) =>
  lessons.filter(
    (lesson) =>
      includesText(lesson.title, filterOptions.searchText) ||
      includesText(getVideoLink(lesson), filterOptions.searchText)
  );
