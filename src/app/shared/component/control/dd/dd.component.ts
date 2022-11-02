import { Component, OnInit } from '@angular/core';
import { BaseControlDDComponent } from '../base-control-dd.component';
import { CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
//Dropdown
export class DdComponent extends BaseControlDDComponent implements OnInit {}
