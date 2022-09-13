import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACTION } from 'src/app/enums/action.enum';

import { NotFoundComponent } from './not-found/not-found.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';

const routes: Routes = [
  {
    path: "404",
    component: NotFoundComponent,

    data: {
      title: "Not Found",
      permission: [
        ACTION.EVERY
      ],
      urls: [
        { title: "Error" },
        { title: "Not Found" },
      ]
    }
  },
  {
    path: "unauthorized",
    component: UnAuthorizedComponent,

    data: {
      title: "Un Authorized",
      permission: [
        ACTION.EVERY
      ],
      urls: [
        { title: "Error" },
        { title: "UnAuthorized" },
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorXRoutingModule { }
