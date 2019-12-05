import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DataRowComponent } from './data-row/data-row';
import { DataRowCustomComponent } from './data-row-custom/data-row-custom';
import { DataRowWithListComponent } from './data-row-with-list/data-list-with-row';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultsDataRowComponent } from './faults-data-row/faults-data-row';

@NgModule({
  declarations: [
    DataRowComponent,
    DataRowCustomComponent,
    DataRowWithListComponent,
    FaultsDataRowComponent,
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
    FaultsDataRowComponent,
  ],
})
export class ViewTestResultComponentsModule {}
