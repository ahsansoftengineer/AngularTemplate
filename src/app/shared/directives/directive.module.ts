import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasDirective } from './has.directive';
import { RouterLinkCustomDirective } from './routerlinkcustom.directive';
import { PermissionDirective } from './permission.directive';

const CommonComponents = [
  HasDirective,
  RouterLinkCustomDirective,
  PermissionDirective,
];
@NgModule({
  declarations: [...CommonComponents],
  imports: [CommonModule],
  exports: [CommonComponents],
})
export class DirectiveModule {}
