import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MesHeaderComponent } from './mes-header/mes-header';
import { MesCardComponent } from './mes-card/mes-card';
@NgModule({
	declarations: [MesHeaderComponent,
    MesCardComponent],
	imports: [ IonicModule ],
	exports: [MesHeaderComponent,
    MesCardComponent]
})
export class ComponentsModule {}
