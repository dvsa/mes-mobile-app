import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { ComponentHolderComponent } from './component-holder/component-holder';
@NgModule({
	declarations: [HeaderComponent,
    ComponentHolderComponent],
	imports: [],
	exports: [HeaderComponent,
    ComponentHolderComponent]
})
export class ComponentsModule {}
