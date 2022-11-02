import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/app/core/class/base.form';

@Component({
  selector: 'di-component-name-here',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
})
export class TransactionDetailComponent extends BaseForm implements OnInit {
  trans: any;
  constructor(
    public dialogRef: MatDialogRef<TransactionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public override injector: Injector
  ) {
    super(injector);
    this.trans = data;
    this.trans.receipt_details = data?.receipt_details;
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  _close(isConfirmed = false): void {
    this.dialogRef.close({ isConfirmed });
  }
  getReceiptType(receipt_type: string): string | void {
    if (receipt_type == '1') return 'Cash';
    else if (receipt_type == '2') return 'Cheque';
    else if (receipt_type == '3') return 'Deposit';
    else if (receipt_type == '4') return 'Material';
  }
  callMethod(event) {}
}
