import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatBPage } from './office.cat-b.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultListProvider } from '../../../providers/fault-list/fault-list';

@NgModule({
  declarations: [
    OfficeCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatBPage),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
  ],
  providers: [
    FaultListProvider,
  ],
})
export class OfficeCatBPageModule { }
