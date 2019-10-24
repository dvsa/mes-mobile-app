import { NgModule } from '@angular/core';
import { CommunicationCatBPageModule } from './cat-b/communication.cat-b.page.module';
import { CommunicationCatBEPageModule } from './cat-be/communication.cat-be.page.module';

@NgModule({
  imports: [
    CommunicationCatBPageModule,
    CommunicationCatBEPageModule,
  ],
})
export class CommunicationPageModule { }
