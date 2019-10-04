import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpPage } from './help';
import { ComponentsModule } from '../../components/common/common-components.module';
import { StoreModule } from '@ngrx/store';
import { helpReducer } from './help.reducer';

@NgModule({
  declarations: [
    HelpPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpPage),
    StoreModule.forFeature('help', helpReducer),
    ComponentsModule,
  ],
})
export class HelpPageModule { }
