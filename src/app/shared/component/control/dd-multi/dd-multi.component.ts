import { Component, OnInit } from '@angular/core';
import { BaseControlDDComponent } from '../base-control-dd.component';
import { CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-dd-multi',
  templateUrl: './dd-multi.component.html',
  styleUrls: ['./dd-multi.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
export class DdMultiComponent extends BaseControlDDComponent implements OnInit {


}
