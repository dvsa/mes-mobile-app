import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DataRowComponent } from './data-row/data-row';
import { DataRowCustomComponent } from './data-row-custom/data-row-custom';

@NgModule({
  declarations: [
    DataRowComponent,
    DataRowCustomComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    DataRowComponent,
    DataRowCustomComponent,
  ],
})
export class ViewTestResultComponentsModule {}
