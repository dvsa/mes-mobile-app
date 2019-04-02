import { NgModule } from '@angular/core';
import { SignatureAreaComponent } from './signature-area/signature-area';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CommonModule } from '@angular/common';
import { LockScreenIndicator } from './screen-lock-indicator/lock-screen-indicator';

@NgModule({
  declarations: [
    SignatureAreaComponent,
    LockScreenIndicator,
  ],
  imports: [
    SignaturePadModule,
    CommonModule,
  ],
  exports:[
    SignatureAreaComponent,
    LockScreenIndicator,
  ],
})
export class ComponentsModule {}
