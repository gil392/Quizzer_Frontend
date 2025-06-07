import { LessonData } from "../../../../api/lesson/types";

export type SortableField = keyof LessonData;

export interface SortOption {
  sortableField: SortableField;
  label: string;
}
