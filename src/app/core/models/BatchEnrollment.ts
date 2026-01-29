export interface IBatchEnrollment {
  enrollmentId: number;
  batchId: number;
  candidateId: number;
  enrollmentDate: string;
  isActive: boolean;
}

export interface IBatchEnrollmentResponse {
  enrollmentId: number;
  enrollmentDate: Date | string;
  isActive: boolean;
  fullName: string;
  mobileNumber: string;
  batchName: string;
  batchId: number;
}