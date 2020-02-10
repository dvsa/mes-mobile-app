import { ReverseDiagramPage } from './reverse-diagram-modal';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ReverseDiagramModalAnalyticsEffects }
  from '../../../pages/test-report/components/reverse-diagram-modal/reverse-diagram-modal.analytics.effects';
import { ReversingDistancesProvider } from '../../../providers/reversing-distances/reversing-distances';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ReverseDiagramPage,
  ],
  imports: [
    IonicPageModule.forChild(ReverseDiagramPage),
    EffectsModule.forFeature([ReverseDiagramModalAnalyticsEffects]),
  ],
  providers: [
    ReversingDistancesProvider,
  ],
})
export class ReverseDiagramPageModule { }
