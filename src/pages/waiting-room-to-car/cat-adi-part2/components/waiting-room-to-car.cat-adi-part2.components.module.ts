import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksCatADIPart2Component } from './vehicle-checks/vehicle-checks.cat-adi-part2';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { InstructorRegistrationComponent } from './instructor-registration/instructor-registration';
import { AccompanimentCardCatADIPart2Component }
  from '../components/accompaniment-card/accompaniment-card.cat-adi-part2';
import { WaitingRoomToCarComponentsModule } from '../../components/waiting-room-to-car.components.module';

@NgModule({
  declarations: [
    VehicleChecksCatADIPart2Component,
    InstructorRegistrationComponent,
    AccompanimentCardCatADIPart2Component,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    DirectivesModule,
    WaitingRoomToCarComponentsModule,
  ],
  exports: [
    VehicleChecksCatADIPart2Component,
    InstructorRegistrationComponent,
    AccompanimentCardCatADIPart2Component,
  ],
})
export class WaitingRoomToCarCatADIPart2ComponentsModule { }
