import { inject, Injectable } from '@angular/core';
import { Http } from './http';
import { IBatchLoginRequestModel } from '../models/BatchLoginRequestModel';
import { ICandidate } from '../models/Candidate';
import { IApiResponse } from '../Interfaces/ApiResponse';
import { ApiRoutes } from '../constants/ApiRoutes';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(Http);
  login(body: IBatchLoginRequestModel) {
    return this.http.post<IApiResponse<ICandidate>>(ApiRoutes.BATCH_USER_LOGIN, body);
  }
}
