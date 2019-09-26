import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatBWaitingRoomPage } from './cat-b-waiting-room';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    CatBWaitingRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(CatBWaitingRoomPage),
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class CatBWaitingRoomPageModule { }
