import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ReverseDiagramCatBEPage } from './reverse-diagram-modal';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import {
  ReverseDiagramModalAnalyticsEffects,
} from '../../../components/reverse-diagram-modal/reverse-diagram-modal.analytics.effects';

@NgModule({
  declarations: [
    ReverseDiagramCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(ReverseDiagramCatBEPage),
    EffectsModule.forFeature([ReverseDiagramModalAnalyticsEffects]),
  ],
  providers: [
    ReversingDistancesProvider,
  ],
})
export class ReverseDiagramPageModule { }
