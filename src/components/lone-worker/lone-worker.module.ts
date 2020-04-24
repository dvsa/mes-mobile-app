import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { LWSosButtonComponent } from './lw-sos-button/lw-sos-button';

@NgModule({
  declarations: [
    LWSosButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    LWSosButtonComponent,
  ],
})
export class LoneWorkerModule { }
