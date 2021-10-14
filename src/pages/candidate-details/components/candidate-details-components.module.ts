import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InappropriateUseBannerComponent } from './inappropriate-use-banner/inappropriate-use-banner';

@NgModule({
  declarations: [
    InappropriateUseBannerComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    InappropriateUseBannerComponent,
  ],
})
export class CandidateDetailsComponentsModule { }
