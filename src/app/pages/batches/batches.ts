import { Component, inject, OnInit } from '@angular/core';
import { BatchService } from '../../core/services/batches';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt, faPlus, faEye, faHashtag, faAlignLeft, faCalendar, faCog, faTag, faToggleOn, faCalendarAlt, faLayerGroup, faSearch, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePipe, NgClass } from '@angular/common';
import { IBatch } from '../../core/models/Batch';
import { StatusPipe } from "../../shared/pipe/status-pipe";
import { MatDialog } from '@angular/material/dialog';
import { Addeditbatch } from '../addeditbatch/addeditbatch';
import { Deletebatchconfirmation } from '../deletebatchconfirmation/deletebatchconfirmation';

@Component({
  selector: 'app-batches',
  imports: [FontAwesomeModule, DatePipe, StatusPipe, NgClass],
  templateUrl: './batches.html',
  styleUrl: './batches.css',
})
export class Batches implements OnInit {
  faEdit = faEdit;
  faTrash = faTrashAlt;
  faPlus = faPlus;
  faEye = faEye;
  faHashtag = faHashtag;
  faTag = faTag;
  faAlignLeft = faAlignLeft;
  faCalendar = faCalendar;
  faToggleOn = faToggleOn;
  faCog = faCog;
  faCalendarAlt = faCalendarAlt;
  faLayerGroup = faLayerGroup;
  faSearch = faSearch;
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;

  batcheService = inject(BatchService);

  ngOnInit() {
    this.batcheService.getBatches()
  }

  constructor(private dialog: MatDialog) {

  }

  batch: IBatch = {
    batchId: 0,
    batchName: '',
    startDate: '',
    endDate: '',
    isActive: false,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  addEditBatch(batch: IBatch | undefined) {
    const dialogRef = this.dialog.open(Addeditbatch, {
      data: batch ? batch : undefined,
      width: '80%',
      minHeight: '80%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.batcheService.getBatches();
    });
  }

  deleteBatch(batch: IBatch) {
    const dialogRef = this.dialog.open(Deletebatchconfirmation, {
      data: batch,
      width: '80%',
      minHeight: '80%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.batcheService.getBatches();
    });
  }
}
