import { inject, Injectable, signal } from '@angular/core';
import { Http } from './http';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IAdminDashboard, IApiResponse, IBatchCandidateStats, ICandidateDashboard } from '../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class Dashboardservice {

  http = inject(Http);

  candidateDashboard = signal<ICandidateDashboard | null>(null);
  adminDashboard = signal<IAdminDashboard | null>(null);
  batchCandidateStats = signal<IBatchCandidateStats[] | null>(null);

  getCandidateDashboardData(candidateId: number) {
    this.http.get<IApiResponse<ICandidateDashboard>>(ApiRoutes.CANDIDATE_DASHBOARD + candidateId).subscribe({
      next: (response: IApiResponse<ICandidateDashboard>) => {
        this.candidateDashboard.set(response.data!);
      },
      error: (error) => {
        console.error('Error fetching candidate dashboard data:', error);
      }
    });
  }

  getAdminDashboardData() {
    this.http.get<IApiResponse<IAdminDashboard>>(ApiRoutes.ADMIN_DASHBOARD).subscribe({
      next: (response: IApiResponse<IAdminDashboard>) => {
        this.adminDashboard.set(response.data!);
      },
      error: (error) => {
        console.error('Error fetching admin dashboard data:', error);
      }
    });
  }

  getAllBatchCandidateStats() {
    this.http.get<IApiResponse<IBatchCandidateStats[]>>(ApiRoutes.ALL_BATCH_CANDIDATE_STATS).subscribe({
      next: (response: IApiResponse<IBatchCandidateStats[]>) => {
        this.batchCandidateStats.set(response.data!);
      },
      error: (error) => {
        console.error('Error fetching all batch candidate stats:', error);
      }
    });
  }

}
