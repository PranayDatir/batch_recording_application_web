export interface IBatchEnrollment {
  enrollmentId: number;
  batchId: number;
  candidateId: number;
  enrollmentDate: string;     // ISO date-time format
  accessEndDate?: string | null;
  isActive: boolean;
}
