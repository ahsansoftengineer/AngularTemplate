import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature1RoutingModule } from './feature1-routing.module';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureEditComponent } from './feature-edit/feature-edit.component';

@NgModule({
  declarations: [
    FeatureDetailComponent,
    FeatureListComponent,
    FeatureEditComponent,
  ],
  imports: [CommonModule, Feature1RoutingModule],
})
export class Feature1Module {}
