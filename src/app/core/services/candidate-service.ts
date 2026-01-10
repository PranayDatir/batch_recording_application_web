import { inject, Injectable, signal } from '@angular/core';
import { Http } from './http';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { ICandidate } from '../models/Candidate';
import { ApiRoutes } from '../constants/ApiRoutes';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  http = inject(Http);

  candidatesList = signal<ICandidate[]>([]);

  getCandidates() {
    const http = this.http.get<IApiResponse<ICandidate[]>>(ApiRoutes.CANDIDATES).subscribe({
      next: (res: IApiResponse<ICandidate[]>) => {
        if (res.result) {
          this.candidatesList.set(res.data!);
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

  getCandidateById(candidateId: number, cb: (data: ICandidate) => void) {
      this.http.get<IApiResponse<ICandidate>>(ApiRoutes.CANDIDATES, candidateId).subscribe({
        next: (res: IApiResponse<ICandidate>) => {
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

  addEditCandidate(candidate: ICandidate, callback: () => void) {
    if(candidate.candidateId === 0){
      this.http.post<IApiResponse<ICandidate>>(ApiRoutes.CANDIDATES, candidate).subscribe({
      next: (res: IApiResponse<ICandidate>) => {
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
      this.http.put<IApiResponse<ICandidate>>(ApiRoutes.CANDIDATES, candidate, candidate.candidateId).subscribe({
      next: (res: IApiResponse<ICandidate>) => {
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

  deleteCandidateByID(candidateId: number, callback?: () => void) {
      this.http.delete<IApiResponse<ICandidate>>(ApiRoutes.CANDIDATES, candidateId).subscribe({
        next: (res: IApiResponse<ICandidate>) => {
          if (res.result == true) { callback?.(); }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      })
    }

}