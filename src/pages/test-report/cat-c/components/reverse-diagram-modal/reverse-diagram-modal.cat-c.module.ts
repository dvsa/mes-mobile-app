import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReverseDiagramCatCPage } from './reverse-diagram-modal.cat-c';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';

@NgModule({
  declarations: [
    ReverseDiagramCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(ReverseDiagramCatCPage),
  ],
  providers: [
    ReversingDistancesProvider,
  ],
})
export class ReverseDiagramCatCPageModule { }
