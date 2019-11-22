import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TellMeQuestionCardComponent } from './tell-me-question-card/tell-me-question-card';
import { TellMeQuestionComponent } from './tell-me-question/tell-me-question';
import { TellMeQuestionOutcomeComponent } from './tell-me-question-outcome/tell-me-question-outcome';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { InstructorRegistrationComponent } from './instructor-registration/instructor-registration';

@NgModule({
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
export class WaitingRoomToCarCatBComponentsModule { }
