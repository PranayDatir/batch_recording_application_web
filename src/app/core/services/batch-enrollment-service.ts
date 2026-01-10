import { inject, Injectable, signal } from '@angular/core';
import { Http } from './http';
import { IBatchEnrollment, IBatchEnrollmentResponse } from '../models/BatchEnrollment';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { ICandidate } from '../models/Candidate';

@Injectable({
  providedIn: 'root',
})
export class BatchEnrollmentService {

  http = inject(Http);

  addEditEnrollForm(enrollform: IBatchEnrollment, callback: () => void) {
      if(enrollform.enrollmentId === 0){
        this.http.post<IApiResponse<IBatchEnrollment>>(ApiRoutes.BATCH_ENROLLMENTS, enrollform).subscribe({
        next: (res: IApiResponse<IBatchEnrollment>) => {
          if (res.result) {
            callback();
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    } else {
        this.http.put<IApiResponse<IBatchEnrollment>>(ApiRoutes.BATCH_ENROLLMENTS, enrollform, enrollform.enrollmentId).subscribe({
        next: (res: IApiResponse<IBatchEnrollment>) => {
          if (res.result) {
            callback();
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    }
  }
  
  
  enrollmentList = signal<IBatchEnrollmentResponse[]>([]);

  getEnrollments() {
    const http = this.http.get<IApiResponse<IBatchEnrollmentResponse[]>>(ApiRoutes.ALL_ENROLLMENTS).subscribe({
      next: (res: IApiResponse<IBatchEnrollmentResponse[]>) => {
        if (res.result) {
          this.enrollmentList.set(res.data!);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  getEnrollmentById(enrollmentId: number, cb: (data: IBatchEnrollment) => void) {
      this.http.get<IApiResponse<IBatchEnrollment>>(`${ApiRoutes.GET_ENROLLMENT_BY_ID}?enrollmentid=${enrollmentId}`).subscribe({
        next: (res: IApiResponse<IBatchEnrollment>) => {
          if (res.result) {
            cb(res.data!);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      })
    }

    deleteBatchByID(enrollmentId: number, callback: () => void) {
      this.http.delete<IApiResponse<null>>(ApiRoutes.BATCH_ENROLLMENTS, enrollmentId).subscribe({
        next: (res: IApiResponse<null>) => {
          if (res.result) {
            callback();
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    }
}
