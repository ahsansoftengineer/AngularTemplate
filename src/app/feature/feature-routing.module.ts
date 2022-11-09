import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'feature1',
        loadChildren: () =>
          import('./feature1/feature1.module').then((m) => m.Feature1Module),
      },
      {
        path: 'feature2',
        loadChildren: () =>
          import('./feature1/feature1.module').then((m) => m.Feature1Module),
      },
      {
        path: 'feature3',
        loadChildren: () =>
          import('./feature1/feature1.module').then((m) => m.Feature1Module),
      },
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureRoutingModule { }
