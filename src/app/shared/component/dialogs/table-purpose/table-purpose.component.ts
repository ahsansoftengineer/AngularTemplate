import { Component, Inject, Injector, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseDialog } from 'src/app/class/base-dialog';

@Component({
  selector: 'di-component-name-here',
  templateUrl: './table-purpose.component.html',
  styleUrls: ['./table-purpose.component.css'],
})
export class TablePurposeComponent extends BaseDialog {
  _dataSource = new MatTableDataSource([]);
  constructor(
    injector: Injector,
    public dialogRef: MatDialogRef<TablePurposeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { source; title }
  ) {
    super(injector)
    this._dataSource.data = data.source;
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  _columns = [
    'id',
    'donation_category',
    'donation_type',
    'fund_category'
  ];
}
