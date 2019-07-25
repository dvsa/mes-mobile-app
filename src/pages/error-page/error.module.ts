import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorPage } from './error';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ErrorPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ErrorPage),
  ],
  exports: [
    ErrorPage,
  ],
})
export class ErrorPageModule { }
