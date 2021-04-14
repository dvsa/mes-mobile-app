var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ModuleAssessmentComponent } from './module-assessment/module-assessment';
import { QuestionCardComponent } from './question-card/question-card';
import { QuestionFooterComponent } from './question-footer/question-footer';
import { AdditionalItemsComponent } from './additional-items/additional-items';
import { QuestionTitleComponent } from './question-title/question-title';
import { QuestionSubtitleComponent } from './question-subtitle/question-subtitle';
import { QuestionAnswerComponent } from './question-answer/question-answer';
import { QuestionFiveCardComponent } from './question-five-card/question-five-card';
import { QuestionScoreComponent } from './question-score/question-score';
import { QuestionDelExRadioCardComponent } from './question-del-ex-radio-card/question-del-ex-radio-card';
var TestReportCatCPCComponentsModule = /** @class */ (function () {
    function TestReportCatCPCComponentsModule() {
    }
    TestReportCatCPCComponentsModule = __decorate([
        NgModule({
            declarations: [
                ModuleAssessmentComponent,
                QuestionCardComponent,
                QuestionFiveCardComponent,
                QuestionFooterComponent,
                AdditionalItemsComponent,
                QuestionTitleComponent,
                QuestionSubtitleComponent,
                QuestionAnswerComponent,
                QuestionScoreComponent,
                QuestionDelExRadioCardComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                TestReportComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                ModuleAssessmentComponent,
                QuestionCardComponent,
                QuestionFiveCardComponent,
                QuestionFooterComponent,
                AdditionalItemsComponent,
                QuestionTitleComponent,
                QuestionSubtitleComponent,
                QuestionAnswerComponent,
                QuestionScoreComponent,
                QuestionDelExRadioCardComponent,
            ],
        })
    ], TestReportCatCPCComponentsModule);
    return TestReportCatCPCComponentsModule;
}());
export { TestReportCatCPCComponentsModule };
//# sourceMappingURL=test-report.cat-cpc.components.module.js.map