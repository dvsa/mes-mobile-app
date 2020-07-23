import { ComponentsModule } from '../../../components/common/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { EtaDebriefCardComponent } from './eta-debrief-card/eta-debrief-card';
import { DangerousFaultsDebriefCardComponent } from './dangerous-faults-debrief-card/dangerous-faults-debrief-card';
import { SeriousFaultsDebriefCardComponent } from './serious-faults-debrief-card/serious-faults-debrief-card';
import { DrivingFaultsDebriefCardComponent } from './driving-faults-debrief-card/driving-faults-debrief-card';
import { EcoDebriefCardComponent } from './eco-debrief-card/eco-debrief-card';
import { TestOutcomeDebriefCardComponent } from './test-outcome-debrief-card/test-outcome-debrief-card';
import { VehicleChecksCardComponent } from './vehicle-checks-card/vehicle-checks-card';
import { PipesModule } from '../../../shared/pipes/pipes.module';

@NgModule({
  declarations: [
    VehicleChecksCardComponent,
    EtaDebriefCardComponent,
    DangerousFaultsDebriefCardComponent,
    SeriousFaultsDebriefCardComponent,
    DrivingFaultsDebriefCardComponent,
    EcoDebriefCardComponent,
    TestOutcomeDebriefCardComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    TranslateModule,
    PipesModule,
  ],
  exports: [
    VehicleChecksCardComponent,
    EtaDebriefCardComponent,
    DangerousFaultsDebriefCardComponent,
    SeriousFaultsDebriefCardComponent,
    DrivingFaultsDebriefCardComponent,
    EcoDebriefCardComponent,
    TestOutcomeDebriefCardComponent,
  ],
})
export class DebriefComponentsModule { }
