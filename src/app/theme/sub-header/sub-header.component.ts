import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aam-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  host: { class: 'pl-2 pr-2' }
})
export class SubHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
