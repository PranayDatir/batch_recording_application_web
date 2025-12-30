import { inject, Injectable } from '@angular/core';
import { Http } from './http';
import { ApiRoutes } from '../../shared/constant';
import { IBatchLoginRequestModel } from '../models/BatchLoginRequestModel';
import { ICandidate } from '../models/Candidate';
import { IApiResponse } from '../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(Http);
  login(email: string, password: string) {
    const body = {
      email,
      password,
    };
    return this.http.post<IApiResponse<ICandidate>>(ApiRoutes.BATCH_USER_LOGIN, body);
  }
}
