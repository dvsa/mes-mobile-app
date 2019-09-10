import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { CandidateDetailsPage } from './candidate-details';
import { CandidateDetailsAnalyticsEffects } from './candidate-details.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    CandidateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateDetailsPage),
    EffectsModule.forFeature([
      CandidateDetailsAnalyticsEffects,
    ]),
    ComponentsModule,
  ],
})
export class CandidateDetailsPageModule { }
