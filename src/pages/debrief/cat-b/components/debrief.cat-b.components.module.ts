import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from 'ng2-translate';
import { VehicleChecksCardCatBComponent } from './vehicle-checks-card-cat-b/vehicle-checks-card.cat-b';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    VehicleChecksCardCatBComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    VehicleChecksCardCatBComponent,
  ],
})
export class DebriefCatBComponentsModule { }
