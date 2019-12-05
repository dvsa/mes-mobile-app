import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DataRowComponent } from './data-row/data-row';
import { DataRowCustomComponent } from './data-row-custom/data-row-custom';
import { DataRowWithListComponent } from './data-row-with-list/data-list-with-row';
import { ComponentsModule } from '../../../components/common/common-components.module';

@NgModule({
  declarations: [
    DataRowComponent,
    DataRowCustomComponent,
    DataRowWithListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    DataRowComponent,
    DataRowCustomComponent,
    DataRowWithListComponent,
  ],
})
export class ViewTestResultComponentsModule {}
