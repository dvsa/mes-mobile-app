var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TellMeQuestionCardComponent } from './tell-me-question-card/tell-me-question-card';
import { TellMeQuestionComponent } from './tell-me-question/tell-me-question';
import { TellMeQuestionOutcomeComponent } from './tell-me-question-outcome/tell-me-question-outcome';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { InstructorRegistrationComponent } from './instructor-registration/instructor-registration';
var WaitingRoomToCarCatBComponentsModule = /** @class */ (function () {
    function WaitingRoomToCarCatBComponentsModule() {
    }
    WaitingRoomToCarCatBComponentsModule = __decorate([
        NgModule({
            declarations: [
                TellMeQuestionCardComponent,
                TellMeQuestionComponent,
                TellMeQuestionOutcomeComponent,
                InstructorRegistrationComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                TellMeQuestionCardComponent,
                TellMeQuestionComponent,
                TellMeQuestionOutcomeComponent,
                InstructorRegistrationComponent,
            ],
        })
    ], WaitingRoomToCarCatBComponentsModule);
    return WaitingRoomToCarCatBComponentsModule;
}());
export { WaitingRoomToCarCatBComponentsModule };
//# sourceMappingURL=waiting-room-to-car.cat-b.components.module.js.map