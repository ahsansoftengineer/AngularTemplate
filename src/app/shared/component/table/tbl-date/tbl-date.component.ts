import { Component, OnInit } from '@angular/core';
import { DateComponent } from '../../control/date/date.component';

@Component({
  selector: 'di-tbl-date',
  templateUrl: './tbl-date.component.html',
  styleUrls: ['./tbl-date.component.css'],
})
export class TblDateComponent extends DateComponent implements OnInit {
  constructor() {
    super();
  }
}
