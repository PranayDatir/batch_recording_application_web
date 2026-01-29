import { Component, inject } from '@angular/core';
import { BatchService } from '../../core/services/batches';
import { RouterLink } from '@angular/router';
import { Authuser } from '../../core/services/authuser';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';

@Component({
  selector: 'app-batchlist',
  imports: [RouterLink],
  templateUrl: './batchlist.html',
  styleUrl: './batchlist.css',
})
export class Batchlist {
  batchService = inject(BatchService);
  authUser = inject(Authuser);
  batchEnrollmentService = inject(BatchEnrollmentService);

  ngOnInit() {
    this.batchService.getBatches();
    this.batchEnrollmentService.getEnrollmentByCandidateId(this.authUser.user.candidateId);
    // this.batchId ? this.sessionService.getSessionsByBatch(this.batchId) : this.sessionService.getSessions();
  }


}
