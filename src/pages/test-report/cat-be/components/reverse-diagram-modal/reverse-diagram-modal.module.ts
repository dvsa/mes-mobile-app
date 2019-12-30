import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReverseDiagramCatBEPage } from './reverse-diagram-modal';
import { ReversingDistancesProvider } from '../../../../../providers/reversing-distances/reversing-distances';

@NgModule({
  declarations: [
    ReverseDiagramCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(ReverseDiagramCatBEPage),
  ],
  providers: [
    ReversingDistancesProvider,
  ],
})
export class ReverseDiagramPageModule { }
