import { Component, inject, Inject, Optional } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ICandidate } from '../../core/models/Candidate';
import { IBatch } from '../../core/models/Batch';
import { CandidateService } from '../../core/services/candidate-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletecandidate',
  imports: [FontAwesomeModule],
  templateUrl: './deletecandidate.html',
  styleUrl: './deletecandidate.css',
})
export class Deletecandidate {
  object: ICandidate;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

  candidateService = inject(CandidateService);

  constructor(@Optional() public dialogRef: MatDialogRef<Deletecandidate>, @Inject(MAT_DIALOG_DATA) data: ICandidate) {
    this.object = data;
  }

  deleteCandidate(id: number) {
    this.candidateService.deleteCandidateByID(id, () => {
      this.dialogRef.close(true);
    });
  }
}
