import { Component, Inject, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faCheckCircle, faEnvelope, faPhone, faPlus, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICandidate } from '../../core/models/Candidate';
import { CandidateService } from '../../core/services/candidate-service';

@Component({
  selector: 'app-addeditcandidate',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './addeditcandidate.html',
  styleUrl: './addeditcandidate.css',
})
export class Addeditcandidate {

  candidateForm: FormGroup;
  formBuilder = inject(FormBuilder);
  candidateService = inject(CandidateService);

  faPlus = faPlus;
  faTimes = faTimes;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCheckCircle = faCheckCircle;

  isEdit: boolean = false;

  constructor(@Optional() public dialogRef: MatDialogRef<Addeditcandidate>, @Inject(MAT_DIALOG_DATA) public dialogData: ICandidate) {
    this.candidateForm = this.formBuilder.group({
      candidateId: [0],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      password: ['',],
      role: ['',[Validators.required]],
      isActive: [true, [Validators.required]],
      createdAt: [new Date()],
      updatedAt: [new Date()]
    });
    if (this.dialogData && this.dialogData.candidateId !== 0) {
      this.isEdit = true;

      this.candidateService.getCandidateById(this.dialogData.candidateId, (data: ICandidate) => {
        this.candidateForm.patchValue({
          ...data
        });
      });
    }
  }

  addeditcandidate() {
    this.candidateService.addEditCandidate(this.candidateForm.value, () => {
      this.dialogRef.close(true);
    });
  }

}
