import { Component, computed, inject, signal } from '@angular/core';
import { BatchService } from '../../core/services/batches';
import { RouterLink } from '@angular/router';
import { Authuser } from '../../core/services/authuser';
import { BatchEnrollmentService } from '../../core/services/batch-enrollment-service';
import { PaginationComponent } from "../../shared/components/pagination/pagination";
import { Sessionservice } from '../../core/services/sessionservice';

@Component({
  selector: 'app-batchlist',
  imports: [RouterLink, PaginationComponent],
  templateUrl: './batchlist.html',
  styleUrl: './batchlist.css',
})
export class Batchlist {
  batchService = inject(BatchService);
  sessionService = inject(Sessionservice);
  authUser = inject(Authuser);
  batchEnrollmentService = inject(BatchEnrollmentService);

  ngOnInit() {
    if (this.authUser.user.role === 'Super Admin') {
      this.batchService.getBatches();
      this.sessionService.searchTerm$
        .subscribe(term => {
          const allBatches = this.batchService.allBatchData();
          console.log(term);
          if (!term.trim()) {
            this.batchService.batchData.set(allBatches);
            return;
          }
          const filtered = allBatches.filter(batch =>
            batch.batchName.toLowerCase().includes(term.toLowerCase())
          );

          this.batchService.batchData.set(filtered);
          this.currentPage.set(1);
        });
    } else if (this.authUser.user.role === 'Candidate') {
      this.batchEnrollmentService.getEnrollmentByCandidateId(this.authUser.user.candidateId);
      this.sessionService.searchTerm$
        .subscribe(term => {
          const allBatches = this.batchEnrollmentService.allEnrollmentListByCandidateID();
          console.log(term);
          if (!term.trim()) {
            this.batchEnrollmentService.enrollmentListByCandidateID.set(allBatches);
            return;
          }
          const filtered = allBatches.filter(batch =>
            batch.batchName.toLowerCase().includes(term.toLowerCase())
          );

          this.batchEnrollmentService.enrollmentListByCandidateID.set(filtered);
          this.currentPage.set(1);
        });
    }

  }

  currentPage = signal(1);
  pageSize = signal(8);

  paginatedBatches = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.batchService.batchData().slice(startIndex, endIndex);
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  currentCandidatePage = signal(1);
  candidatePageSize = signal(8);

  paginatedCandidateBatches = computed(() => {
    const startIndex = (this.currentCandidatePage() - 1) * this.candidatePageSize();
    const endIndex = startIndex + this.candidatePageSize();
    return this.batchEnrollmentService.enrollmentListByCandidateID().slice(startIndex, endIndex);
  });

  onCandidatePageChange(page: number) {
    this.currentCandidatePage.set(page);
  }
}
