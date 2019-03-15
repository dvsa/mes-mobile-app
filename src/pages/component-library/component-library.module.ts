import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentLibraryPage } from './component-library';
import { TypographyComponent } from './components/typography/typography';
import { ButtonsComponent } from './components/buttons/buttons';
import { DataRowsComponent } from './components/data-rows/data-rows';
import { ColorPaletteComponent } from './components/color-palette/color-palette';
import { MesSignaturePadComponent } from './components/mes-signature-pad/mes-signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    ComponentLibraryPage,
    TypographyComponent,
    ButtonsComponent,
    DataRowsComponent,
    ColorPaletteComponent,
    MesSignaturePadComponent,
  ],
  imports: [
    IonicPageModule.forChild(ComponentLibraryPage),
    SignaturePadModule,
  ],
})
export class ComponentLibraryPageModule {}
