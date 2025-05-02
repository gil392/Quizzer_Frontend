import { LessonData } from "../../../services/backend/types";
import { FilterOptions } from "./types";

export const getFilteredLessons = (lessons: LessonData[], filterOptions: FilterOptions) => 
    lessons.filter((lesson) => lesson.title.toLowerCase().includes(filterOptions.searchText.toLowerCase()))
    