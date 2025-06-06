export type LessonData = {
  _id: string;
  title: string;
  isFavorite: boolean;
  summary: string;
  videoUrl: string;
  relatedLessonId?: string;
};
