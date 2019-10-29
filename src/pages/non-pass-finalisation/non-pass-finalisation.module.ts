import { NgModule } from '@angular/core';
import { NonPassFinalisationCatBPageModule } from './cat-b/non-pass-finalisation.cat-b.page.module';
import { NonPassFinalisationCatBEPageModule } from './cat-be/non-pass-finalisation.cat-be.page.module';

@NgModule({
  imports: [
    NonPassFinalisationCatBPageModule,
    NonPassFinalisationCatBEPageModule,
  ],
})
export class NonPassFinalisationPageModule { }
