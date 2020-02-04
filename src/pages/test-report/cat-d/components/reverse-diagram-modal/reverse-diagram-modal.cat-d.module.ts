import { IonicPageModule } from 'ionic-angular';
import { ReverseDiagramModalAnalyticsEffects }
  from '../../../components/reverse-diagram-modal/reverse-diagram-modal.analytics.effects';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { ReverseDiagramCatDPage } from './reverse-diagram-modal.cat-d';

@NgModule({
  declarations: [
    ReverseDiagramCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(ReverseDiagramCatDPage),
    EffectsModule.forFeature([ReverseDiagramModalAnalyticsEffects]),
  ],
  providers: [
    ReversingDistancesProvider,
  ],
})
export class ReverseDiagramCatDPageModule { }
