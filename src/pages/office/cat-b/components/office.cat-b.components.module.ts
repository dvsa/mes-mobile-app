import { NgModule } from '@angular/core';
import { IndependentDrivingComponent } from './independent-driving/independent-driving';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

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

export class OfficeCatBComponentsModule { }
