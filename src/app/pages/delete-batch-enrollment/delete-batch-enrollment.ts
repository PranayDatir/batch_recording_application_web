import { Component, inject, Inject, Optional } from '@angular/core';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IBatch } from '../../core/models/Batch';
import { Deletebatchconfirmation } from '../deletebatchconfirmation/deletebatchconfirmation';
import { IBatchEnrollment, IBatchEnrollmentResponse } from '../../core/models/BatchEnrollment';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-delete-batch-enrollment',
  imports: [FontAwesomeModule],
  templateUrl: './delete-batch-enrollment.html',
  styleUrl: './delete-batch-enrollment.css',
})
export class DeleteBatchEnrollment {
batchEnrollService = inject(BatchEnrollmentService);
  object: IBatchEnrollmentResponse;

  constructor(@Optional() public dialogRef: MatDialogRef<DeleteBatchEnrollment>, @Inject(MAT_DIALOG_DATA) data: IBatchEnrollmentResponse) {
    this.object = data;
  }

  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

  deleteBatch(batchId: number) {
    this.batchEnrollService.deleteBatchByID(batchId, () => this.dialogRef.close(true));
  }
}
