import { NgModule } from '@angular/core';
import { MesSignaturePadComponent } from './mes-signature-pad/mes-signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MesSignaturePadComponent,
  ],
  imports: [
    SignaturePadModule,
    CommonModule,
  ],
  exports:[
    MesSignaturePadComponent,
  ],
})
export class ComponentsModule {}
