import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorXRoutingModule } from './error-x-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';

@NgModule({
  declarations: [NotFoundComponent, UnAuthorizedComponent],
  imports: [CommonModule, ErrorXRoutingModule],
})
export class ErrorXModule {}
