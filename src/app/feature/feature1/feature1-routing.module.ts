import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureEditComponent } from './feature-edit/feature-edit.component';
import { FeatureListComponent } from './feature-list/feature-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: FeatureListComponent,
    data: {},
  },
  {
    path: 'edit',
    component: FeatureEditComponent,
    data: {},
  },
  {
    path: 'detail',
    component: FeatureDetailComponent,
    data: {},
  },
  // { path: '', redirectTo: 'list', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Feature1RoutingModule { }
