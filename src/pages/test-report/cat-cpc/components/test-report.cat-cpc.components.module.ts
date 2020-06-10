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

@NgModule({
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
  ],
})
export class TestReportCatCPCComponentsModule { }
