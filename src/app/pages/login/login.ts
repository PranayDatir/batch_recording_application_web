import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBatchLoginRequestModel } from '../../core/models/BatchLoginRequestModel';
import { Auth } from '../../core/services/auth';
import { IApiResponse } from '../../core/Interfaces/ApiResponse';
import { ICandidate } from '../../core/models/Candidate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(Auth);
  router = inject(Router);

  loginObj: IBatchLoginRequestModel = {
    email: '',
    password: ''
  };

  login(){
    this.auth.login(this.loginObj.email, this.loginObj.password).subscribe({
      next: (res: IApiResponse<ICandidate>) => {
        if(res.result){
          localStorage.setItem('candidate', JSON.stringify(res.data));
          this.router.navigate(['/layout']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    })
  }
}
