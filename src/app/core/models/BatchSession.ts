export interface IBatchSession {
  sessionId: number;
  batchId: number;
  topicName: string;
  topicDescription: string | null;
  youtubeVideoId: string;
  durationInMinutes: number | null;
  sessionDate: string;       // ISO date-time format
  displayOrder: number;
  createdAt: string;         // ISO date-time format
  updatedAt?: string | null;
}

export interface IBatchSessionResponse {
  sessionId: number;
  durationInMinutes?: number | null;
  displayOrder: number;
  batchName: string;
  sessionDate: Date | string;       // ISO date-time format
  batchId: number;
  topicName: string;
}