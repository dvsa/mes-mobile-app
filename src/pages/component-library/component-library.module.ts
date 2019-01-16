import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentLibraryPage } from './component-library';
import { TypographyComponent } from './components/typography/typography';
import { ButtonsComponent } from './components/buttons/buttons';
import { DataRowsComponent } from './components/data-rows/data-rows';
import { ColorPaletteComponent } from './components/color-palette/color-palette';

@NgModule({
  declarations: [
    ComponentLibraryPage,
    TypographyComponent,
    ButtonsComponent,
    DataRowsComponent,
    ColorPaletteComponent,
  ],
  imports: [
    IonicPageModule.forChild(ComponentLibraryPage),
  ],
})
export class ComponentLibraryPageModule {}
