import { NgModule } from '@angular/core';
import { HealthDeclarationCatBPageModule } from './cat-b/health-declaration.cat-b.page.module';
import { HealthDeclarationCatBEPageModule } from './cat-be/health-declaration.cat-be.page.module';

@NgModule({
  imports: [
    HealthDeclarationCatBPageModule,
    HealthDeclarationCatBEPageModule,
  ],
})
export class HealthDeclarationPageModule { }
