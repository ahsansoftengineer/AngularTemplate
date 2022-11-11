import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.css'],
})
export class ImgViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ImgViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { source; title }
  ) {}
  ngOnInit(): void {
    return;
  }
}
