import { NgModule } from '@angular/core';
import { BackToOfficeCatBPageModule } from './cat-b/back-to-office.cat-b.page.module';
import { BackToOfficeCatBEPageModule } from './cat-be/back-to-office.cat-be.page.module';

@NgModule({
  imports: [
    BackToOfficeCatBPageModule,
    BackToOfficeCatBEPageModule,
  ],
})
export class BackToOfficePageModule {}
