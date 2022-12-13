# [ANGULAR ARCHETECTURE](#)

## [ANGULAR UNIVERSAL WITH NODE EXPRESS](#)

### It Required Only 2 Steps
1. ng add @nguniversal/express-engine
2. npm run dev:ssr
3. will create following 
> server.ts, tsconfig.server.json, main.server.ts
4. will update following files
> angular.json, package.json, main.ts, app-routing.module.ts, app.module.ts
5. Note: Any Code that target window, document, API will be caused error on backend

```java
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/app/core/class/base.form';
import { URLz } from 'src/app/core/enums/url.enum';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css'],
  host: { class: 'col-lg-6 col-sm-12 p-0' },
})
export class TransactionDialogComponent {
  systemSubscription: any;
  btnDisable = false;
  url = window?.location?.href;
  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector
  ) {
    super();
    dialogRef.disableClose = true;
  }
  _close(): void {
    const hierarchy = this._fs._form.get('hierarchy').value;
    if (isPlatformBrowser(this.platformId) && url?.indexOf('add') == -1) {
      this.dialogRef.close();
    } else {
      // any other logic goes here
    }
  }
}

```