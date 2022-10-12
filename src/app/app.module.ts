import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AngularzModule } from './shared/modules/angularz.module';
import { RootzModule } from './shared/modules/rootz.module';
import { AppInjector } from './core/static/AppInjector';

@NgModule({
  declarations: [
    AppComponent,
    // FullComponent,
    // VerticalNavigationComponent,
    // BreadcrumbComponent,
    // VerticalSidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularzModule,
    RootzModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}
