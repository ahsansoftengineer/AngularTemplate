import { Component, OnInit } from '@angular/core';
import { BaseControlDDComponent } from '../../control/base-control-dd.component';

@Component({
  selector: 'di-tbl-dd',
  templateUrl: './tbl-dd.component.html',
  styleUrls: ['./tbl-dd.component.css'],
})
export class TblDDComponent extends BaseControlDDComponent implements OnInit {}
