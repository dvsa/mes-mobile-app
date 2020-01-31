import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ReverseDiagramCatCPage } from './reverse-diagram-modal.cat-c';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import {
  ReverseDiagramModalAnalyticsEffects,
} from '../../../components/reverse-diagram-modal/reverse-diagram-modal.analytics.effects';

@NgModule({
  declarations: [
    ReverseDiagramCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(ReverseDiagramCatCPage),
    EffectsModule.forFeature([ReverseDiagramModalAnalyticsEffects]),
  ],
  providers: [
    ReversingDistancesProvider,
  ],
})
export class ReverseDiagramCatCPageModule { }
