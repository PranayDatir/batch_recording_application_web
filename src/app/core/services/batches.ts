import { inject, Injectable, signal } from '@angular/core';
import { ApiRoutes } from '../constants/ApiRoutes';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { IBatch } from '../models/Batch';
import { Http } from './http';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  http = inject(Http);
  batchData = signal<IBatch[]>([]);
  getBatches() {
    this.http.get<IApiResponse<IBatch[]>>(ApiRoutes.BATCHES).subscribe({
      next: (res: IApiResponse<IBatch[]>) => {
        if (res.result) {
          this.batchData.set(res.data!);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  filterBatches(event: any) {
    const filter = event.target.value;
    console.log(filter);
    if (filter === null || (filter as any) === '') {
      this.getBatches();
    } else {
      this.batchData.set(this.batchData().filter((batch: IBatch) => batch.isActive === filter));
    }
  }

  addEditBatch(batch: IBatch, callback: () => void) {
    if (batch.batchId === 0) {
      this.http.post<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batch).subscribe({
        next: (res: IApiResponse<IBatch>) => {
          callback();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    } else {
      this.http.put<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batch, batch.batchId).subscribe({
        next: (res: IApiResponse<IBatch>) => {
          callback();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
    }
  }


  getBatchById(batchId: number, cb: (data: IBatch) => void) {
    this.http.get<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batchId).subscribe({
      next: (res: IApiResponse<IBatch>) => {
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

  deleteBatchByID(batchId: number, callback?: () => void) {
    this.http.delete<IApiResponse<IBatch>>(ApiRoutes.BATCHES, batchId).subscribe({
      next: (res: IApiResponse<IBatch>) => {
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
