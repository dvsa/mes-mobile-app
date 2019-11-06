import { NgModule } from '@angular/core';
import { PassFinalisationCatBPageModule } from './cat-b/pass-finalisation.cat-b.page.module';
import { PassFinalisationCatBEPageModule } from './cat-be/pass-finalisation.cat-be.page.module';

@NgModule({
  imports: [
    PassFinalisationCatBPageModule,
    PassFinalisationCatBEPageModule,
  ],
})

export class PassFinalisationPageModule { }
