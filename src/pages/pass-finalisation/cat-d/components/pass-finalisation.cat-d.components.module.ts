import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { Code78Component } from './code-78/code-78';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    Code78Component,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
  ],
  exports:[
    Code78Component,
  ],
})
export class PassFinalisationCatDComponentsModule {}
