import { Injectable } from '@angular/core';
import { ICandidate } from '../models/Candidate';

@Injectable({
  providedIn: 'root',
})
export class Authuser {

  user: ICandidate ;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('candidate') || '{}') as ICandidate;
  }
  
}
