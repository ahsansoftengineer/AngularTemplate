import { NgModule } from '@angular/core';
import { Feature1RoutingModule } from './feature1-routing.module';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureEditComponent } from './feature-edit/feature-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FeatureDetailComponent,
    FeatureListComponent,
    FeatureEditComponent,
  ],
  imports: [SharedModule, Feature1RoutingModule],
})
export class Feature1Module {}
