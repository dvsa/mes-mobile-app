import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { CandidateDetailsPage } from './candidate-details';

@NgModule({
  declarations: [
    CandidateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateDetailsPage),
    ComponentsModule,
  ],
})
export class CandidateDetailsPageModule {}
