import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DevScreenNavigationPage } from './dev-screen-navigation';

@NgModule({
  declarations: [
    DevScreenNavigationPage,
  ],
  imports: [
    IonicPageModule.forChild(DevScreenNavigationPage),
    ComponentsModule,
  ],
})
export class DevScreenNavigationPageModule { }
