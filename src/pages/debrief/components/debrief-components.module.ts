import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksCardComponent } from './vehicle-checks-card/vehicle-checks-card';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    VehicleChecksCardComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    VehicleChecksCardComponent,
  ],
})
export class DebriefComponentsModule { }
