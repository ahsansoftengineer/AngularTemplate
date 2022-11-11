import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagePipe } from './error-message.pipe';
import { TarjumaPipe } from './tarjuma.pipe';

@NgModule({
  declarations: [ErrorMessagePipe, TarjumaPipe],
  imports: [CommonModule],
  exports: [ErrorMessagePipe, TarjumaPipe],
})
export class PipesModule {}
