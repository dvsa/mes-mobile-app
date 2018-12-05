import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { HealthDeclarationPage } from './health-declaration';

@NgModule({
  declarations: [
    HealthDeclarationPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDeclarationPage),
    ComponentsModule,
  ],
})
export class HealthDeclarationPageModule {}
