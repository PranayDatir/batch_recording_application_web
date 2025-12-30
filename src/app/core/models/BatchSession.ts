export interface IBatchSession {
  sessionId: number;
  batchId: number;
  topicName: string;
  topicDescription?: string | null;
  youtubeVideoId: string;
  durationInMinutes?: number | null;
  sessionDate: string;       // ISO date-time format
  displayOrder: number;
  createdAt: string;         // ISO date-time format
  updatedAt?: string | null;
}
