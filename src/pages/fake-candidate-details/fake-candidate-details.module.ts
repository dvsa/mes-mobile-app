import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { FakeCandidateDetailsPage } from './fake-candidate-details';

@NgModule({
  declarations: [
    FakeCandidateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FakeCandidateDetailsPage),
    ComponentsModule,
  ],
  providers: [
  ],
})
export class FakeCandidateDetailsPageModule {}
