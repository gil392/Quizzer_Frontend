export type LessonData = {
  _id: string;
  title: string;
  isFavorite: boolean;
  successRate?: number;
  summary: string;
  videoDetails?: {
    videoId: string;
  };
  relatedLessonGroupId?: string;
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
