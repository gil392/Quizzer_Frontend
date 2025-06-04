export type LessonData = {
  _id: string;
  title: string;
  summary: string;
  videoUrl: string;
  relatedLessonId?: string;
};

export type RelatedVideo = {
  videoId: string | undefined;
  duration: string;
  views: string;
  snippet: {
    title: string;
    description: string;
    publishTime: string;
    channelTitle: string;
    channelId: string;
    thumbnail: {
      url: string;
      width: number;
      height: number;
    };
  };
};