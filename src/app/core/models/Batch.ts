export interface IBatch {
  batchId: number;
  batchName: string;
  description?: string | null;
  startDate: string;       // ISO date-time string
  endDate?: string | null;
  isActive: boolean;
  createdAt: string;       // ISO date-time string
  updatedAt?: string | null;
}
