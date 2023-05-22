# [ANGULAR ARCHETECTURE](#)

## [ANGULAR UNIVERSAL WITH NODE EXPRESS](#)

### It Required Only 2 Steps
0. npm config set fetch-retry-maxtimeout 120000
1. ng add @nguniversal/express-engine
2. npm install ngx-cookie-service-ssr@14 --save
3. [ngx cookie service](https://www.npmjs.com/package/ngx-cookie-service)
4. npm run dev:ssr
5. will create following 
> server.ts, tsconfig.server.json, main.server.ts
6. will update following files
> angular.json, package.json, main.ts, app-routing.module.ts, app.module.ts
7. Note: Any Code that target window, document, API will be caused error on backend
8. Deploye on Server ???

```java
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-dialog',
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
