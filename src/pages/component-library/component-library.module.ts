import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentLibraryPage } from './component-library';
import { HeadingsComponent } from './components/headings/headings';

@NgModule({
  declarations: [
    ComponentLibraryPage,
    HeadingsComponent
  ],
  imports: [
    IonicPageModule.forChild(ComponentLibraryPage),
  ],
})
export class ComponentLibraryPageModule {}
