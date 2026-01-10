export interface ICandidate {
  candidateId: number;
  fullName: string;
  email: string;
  mobileNumber?: string | null;
  password?: string | null;
  role?: string | null;
  isActive: boolean;
  createdAt: string;      // ISO date-time format
  updatedAt?: string;
}
