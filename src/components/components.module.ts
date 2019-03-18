import { NgModule } from '@angular/core';
import { MesSignaturePadComponent } from './mes-signature-pad/mes-signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    MesSignaturePadComponent,
  ],
  imports: [
    SignaturePadModule,
  ],
  exports:[
    MesSignaturePadComponent,
  ],
})
export class ComponentsModule {}
