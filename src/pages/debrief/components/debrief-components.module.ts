import { ComponentsModule } from '../../../components/common/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksCardComponent } from '../cat-b/components/vehicle-checks-card/vehicle-checks-card';
import { TranslateModule } from 'ng2-translate';
import { EtaDebriefCardComponent } from './eta-debrief-card/eta-debrief-card';
import { DangerousFaultsDebriefCardComponent } from './dangerous-faults-debrief-card/dangerous-faults-debrief-card';
import { SeriousFaultsDebriefCardComponent } from './serious-faults-debrief-card/serious-faults-debrief-card';
import { DrivingFaultsDebriefCardComponent } from './driving-faults-debrief-card/driving-faults-debrief-card';
import { EcoDebriefCardComponent } from './eco-debrief-card/eco-debrief-card';
import { TestOutcomeDebriefCardComponent } from './test-outcome-debrief-card/test-outcome-debrief-card';
import { SpeedReqDebriefCardComponent } from './speed-requirements-debrief-card/speed-requirements-debrief-card';

@NgModule({
  declarations: [
    VehicleChecksCardComponent,
    EtaDebriefCardComponent,
    DangerousFaultsDebriefCardComponent,
    SeriousFaultsDebriefCardComponent,
    DrivingFaultsDebriefCardComponent,
    EcoDebriefCardComponent,
    TestOutcomeDebriefCardComponent,
    SpeedReqDebriefCardComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    VehicleChecksCardComponent,
    EtaDebriefCardComponent,
    DangerousFaultsDebriefCardComponent,
    SeriousFaultsDebriefCardComponent,
    DrivingFaultsDebriefCardComponent,
    EcoDebriefCardComponent,
    TestOutcomeDebriefCardComponent,
    SpeedReqDebriefCardComponent,
  ],
})
export class DebriefComponentsModule { }
