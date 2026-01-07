import { Component, Inject, inject, Optional } from '@angular/core';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BatchService } from '../../core/services/batches';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IBatch } from '../../core/models/Batch';

@Component({
  selector: 'app-deletebatchconfirmation',
  imports: [FontAwesomeModule],
  templateUrl: './deletebatchconfirmation.html',
  styleUrl: './deletebatchconfirmation.css',
})
export class Deletebatchconfirmation {

  batchService = inject(BatchService);
  object: IBatch;

  constructor(@Optional() public dialogRef: DialogRef<Deletebatchconfirmation>, @Inject(DIALOG_DATA) data: IBatch) {
    this.object = data;
  }

  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

  deleteBatch(batchId: number) {
    this.batchService.deleteBatchByID(batchId, () => this.dialogRef.close());
  }


}
