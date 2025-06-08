import { SortOption } from "./types";

export const SORT_OPTIONS: SortOption[] = [
  {
    sortableField: "title",
    label: "Title",
  },
  {
    sortableField: "isFavorite",
    label: "Favorite",
  },
];

export const DEFAULT_SORT_OPTION = SORT_OPTIONS[0];
