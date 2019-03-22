import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentLibraryPage } from './component-library';
import { TypographyComponent } from './components/typography/typography';
import { ButtonsComponent } from './components/buttons/buttons';
import { DataRowsComponent } from './components/data-rows/data-rows';
import { ColorPaletteComponent } from './components/color-palette/color-palette';
import { FormItemsComponent } from './components/form-items/form-items';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ComponentLibraryPage,
    TypographyComponent,
    ButtonsComponent,
    DataRowsComponent,
    ColorPaletteComponent,
    FormItemsComponent,
  ],
  imports: [
    IonicPageModule.forChild(ComponentLibraryPage),
    ComponentsModule,
  ],
})
export class ComponentLibraryPageModule {}
