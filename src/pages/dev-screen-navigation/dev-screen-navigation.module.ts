import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DevScreenNavigationPage } from './dev-screen-navigation';
import { StorePreparation } from './store-preparation';

@NgModule({
  declarations: [
    DevScreenNavigationPage,
  ],
  providers: [
    StorePreparation,
  ],
  imports: [
    IonicPageModule.forChild(DevScreenNavigationPage),
    ComponentsModule,
  ],
})
export class DevScreenNavigationPageModule { }
