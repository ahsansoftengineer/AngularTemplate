import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisregardGuard } from './shared/guards/disregard.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import { SideBarMenusGuard } from './shared/guards/side-bar-menus.guard';
import { StatesGuard } from './shared/guards/states.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth', loadChildren: () =>
      import('./auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: '',
    // component: FullComponent,
    canActivateChild: [
      StatesGuard,
      SideBarMenusGuard,
      DisregardGuard, // USE UNTIL ANGULAR DOESN'T PROVIDE CanDeActivateChild GUARD
      PermissionGuard,
    ],
    children: [
      // {
      //   path: 'dm_dashboard',
      //   loadChildren: () =>
      //     import('./dm-dashboard/dm-dashboard.module')
      //       .then((m) => m.DmDashboardModule),
      // },
      {
        path: '',
        loadChildren: () =>
          import('./feature/feature.module')
            .then((m) => m.FeatureModule),
      },

    ],
  },
  {
    path: '**',
    redirectTo: '/error/404',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
