import { Component, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BaseDialog } from 'src/app/core/class/base-dialog';

@Component({
  selector: 'di-component-name-here',
  templateUrl: './table-purpose.component.html',
  styleUrls: ['./table-purpose.component.css'],
})
export class TablePurposeComponent extends BaseDialog {
  _dataSource = new MatTableDataSource([]);
  constructor(
    public dialogRef: MatDialogRef<TablePurposeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { source; title }
  ) {
    super();
    this._dataSource.data = data.source;
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  _columns = ['id', 'donation_category', 'donation_type', 'fund_category'];
}
