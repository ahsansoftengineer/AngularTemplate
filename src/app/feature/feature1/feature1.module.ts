import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature1RoutingModule } from './feature1-routing.module';
import { FeatureAddComponent } from './feature-add/feature-add.component';
import { FeatureDetailComponent } from './feature-detail/feature-detail.component';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { FeatureEditComponent } from './feature-edit/feature-edit.component';

@NgModule({
  declarations: [
    FeatureAddComponent,
    FeatureDetailComponent,
    FeatureListComponent,
    FeatureEditComponent,
  ],
  imports: [CommonModule, Feature1RoutingModule],
})
export class Feature1Module {}
