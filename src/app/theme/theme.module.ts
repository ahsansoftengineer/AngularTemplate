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
import { AccountComponent } from './account/account.component';
import { NotificationComponent } from './notification/notification.component';
import { SideBarMatListItemComponent } from './side-bar-mat-list-item/side-bar-mat-list-item.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { ThemeContentComponent } from './theme-content/theme-content.component';

@NgModule({
  declarations: [
    LeftSideNavComponent,
    RightSideNavComponent,
    HeadersComponent,
    FootersComponent,
    FullTemplateComponent,
    AccountComponent,
    NotificationComponent,
    SideBarMatListItemComponent,
    SubHeaderComponent,
    ThemeContentComponent,
  ],
  imports: [AngularzModule, MatzModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule],
})
export class ThemeModule {}
