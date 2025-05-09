import { LessonData } from "../../../api/lesson/types";
import { FilterOptions } from "./types";

export const getFilteredLessons = (
  lessons: LessonData[],
  filterOptions: FilterOptions
) =>
  lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(filterOptions.searchText.toLowerCase())
  );
