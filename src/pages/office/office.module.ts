import { NgModule } from '@angular/core';
import { OfficeCatBEPageModule } from './cat-be/office.cat-be.page.module';
import { OfficeCatBPageModule } from './cat-b/office.cat-b.page.module';

@NgModule({
  imports: [
    OfficeCatBEPageModule,
    OfficeCatBPageModule,
  ],
})
export class OfficePageModule { }
