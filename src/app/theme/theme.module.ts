import { NgModule } from '@angular/core';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { RightSideNavComponent } from './right-side-nav/right-side-nav.component';
import { HeadersComponent } from './headers/headers.component';
import { FootersComponent } from './footers/footers.component';
import { FullTemplateComponent } from './full-template/full-template.component';
import { MatzModule } from '../shared/modules/matz.module';
import { AngularzModule } from '../shared/modules/angularz.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    LeftSideNavComponent,
    RightSideNavComponent,
    HeadersComponent,
    FootersComponent,
    FullTemplateComponent,
  ],
  imports: [AngularzModule, MatzModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule],
})
export class ThemeModule {}
