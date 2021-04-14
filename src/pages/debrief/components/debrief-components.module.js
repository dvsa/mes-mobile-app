var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var DebriefComponentsModule = /** @class */ (function () {
    function DebriefComponentsModule() {
    }
    DebriefComponentsModule = __decorate([
        NgModule({
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
    ], DebriefComponentsModule);
    return DebriefComponentsModule;
}());
export { DebriefComponentsModule };
//# sourceMappingURL=debrief-components.module.js.map