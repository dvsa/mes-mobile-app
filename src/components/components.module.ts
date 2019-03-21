import { NgModule } from '@angular/core';
import { SignatureAreaComponent } from './signature-area/signature-area';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SignatureAreaComponent,
  ],
  imports: [
    SignaturePadModule,
    CommonModule,
  ],
  exports:[
    SignatureAreaComponent,
  ],
})
export class ComponentsModule {}
