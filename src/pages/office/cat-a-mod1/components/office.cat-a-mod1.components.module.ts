import { NgModule } from '@angular/core';
import { IndependentDrivingComponent } from './independent-driving/independent-driving';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    IndependentDrivingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    IndependentDrivingComponent,
  ],
})

export class OfficeCatAMod1ComponentsModule { }
