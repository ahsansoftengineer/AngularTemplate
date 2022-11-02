import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureAddComponent } from './feature-add/feature-add.component';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureEditComponent } from './feature-edit/feature-edit.component';
import { FeatureListComponent } from './feature-list/feature-list.component';

const routes: Routes = [
  {
    path: 'feature1',
    children: [
      { path: '', redirectTo: 'feature-list', pathMatch: 'full' },
      {
        path: 'voucher',
        children: [
          {
            path: 'feature-list',
            component: FeatureListComponent,
            data: { },
          },
          {
            path: 'feature-add',
            component: FeatureAddComponent,
            data: { },
          },
          {
            path: 'feature-edit',
            component: FeatureEditComponent,
            data: { },
          },
          {
            path: 'feature-detail',
            component: FeatureDetailComponent,
            data: { },
          },
        ]
      },
      { path: '**', redirectTo: 'feature-list', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature1RoutingModule { }
