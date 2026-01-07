export interface IBatch {
  batchId: number;
  batchName: string;
  description: string;
  startDate: string;       // ISO date-time string
  endDate: string;
  isActive: boolean;
  createdAt: Date;       // ISO date-time string
  updatedAt?: Date;
}
