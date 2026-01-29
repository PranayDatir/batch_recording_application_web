import { inject, Injectable, signal } from '@angular/core';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { ICandidate } from '../models/Candidate';
import { Http } from './http';
import { IBatchSession, IBatchSessionResponse } from '../models/BatchSession';

@Injectable({
  providedIn: 'root',
})
export class Sessionservice {
  http = inject(Http);

  sessionsList = signal<IBatchSessionResponse[]>([]);
  sessionsListByBatch = signal<IBatchSession[]>([]);

  getSessions() {
    const http = this.http.get<IApiResponse<IBatchSessionResponse[]>>(ApiRoutes.GET_ALL_SESSIONS_RECORDINGS).subscribe({
      next: (res: IApiResponse<IBatchSessionResponse[]>) => {
        if (res.result) {
          this.sessionsList.set(res.data!);
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

  getSessionById(sessionId: number, cb: (data: IBatchSession) => void) {
    this.http.get<IApiResponse<IBatchSession>>(ApiRoutes.GET_SESSION_BY_ID, sessionId).subscribe({
      next: (res: IApiResponse<IBatchSession>) => {
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

  getSessionsByBatch(batchId: number) {
    console.log('complete batchId ---> ', batchId);
    this.http.get<IApiResponse<IBatchSession[]>>(ApiRoutes.GET_ALL_SESSIONS_RECORDINGS_BY_BATCH, batchId).subscribe({
      next: (res: IApiResponse<IBatchSession[]>) => {
        if (res.result) {
          this.sessionsListByBatch.set(res.data!);
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

  addEditSession(session: IBatchSession, callback: () => void) {
    if (session.sessionId === 0) {
      this.http.post<IApiResponse<IBatchSession>>(ApiRoutes.BATCHSESSIONS, session).subscribe({
        next: (res: IApiResponse<IBatchSession>) => {
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
      this.http.put<IApiResponse<IBatchSession>>(ApiRoutes.BATCHSESSIONS, session, session.sessionId).subscribe({
        next: (res: IApiResponse<IBatchSession>) => {
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

  deleteSessionByID(sessionId: number, callback?: () => void) {
    this.http.delete<IApiResponse<IBatchSession>>(ApiRoutes.BATCHSESSIONS, sessionId).subscribe({
      next: (res: IApiResponse<IBatchSession>) => {
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
