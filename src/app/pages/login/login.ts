import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBatchLoginRequestModel } from '../../core/models/BatchLoginRequestModel';
import { Auth } from '../../core/services/auth';
import { IApiResponse } from '../../core/Interfaces/ApiResponse';
import { ICandidate } from '../../core/models/Candidate';
import { Router } from '@angular/router';
import { Loadingbutton } from '../../shared/components/loadingbutton/loadingbutton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, Loadingbutton],
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

  isSubmitting: boolean = false;
  login() {
    this.isSubmitting = true;
    this.auth.login(this.loginObj).subscribe({
      next: (res: IApiResponse<ICandidate>) => {
        if (res.result) {
          localStorage.setItem('candidate', JSON.stringify(res.data));
          this.router.navigate(['/layout']);
        } else {
          this.isSubmitting = false;
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Login failed', err);
      },
      complete: () => {
        // this.isSubmitting = false;
      }
    })
  }
}
