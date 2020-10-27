import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';

@Component({
  selector: 'vehicle-details-cat-adi-pt2',
  templateUrl: 'vehicle-details.html',
})
export class VehicleDetailsCatADIPt2Component {

  @Input()
  data: CatADI2UniqueTypes.VehicleDetails;

  @Input()
  trainerData: CatADI2UniqueTypes.TrainerDetails;

  constructor() {}

  public getTransmission(): string {
    return get(this.data, 'gearboxCategory');
  }

  public getRegistrationNumber(): string {
    return get(this.data, 'registrationNumber');
  }

  public getTrainerPRN(): number {
    return get(this.trainerData, 'trainerRegistrationNumber', null);
  }

  public getOrdit(): string {
    return get(this.trainerData, 'orditTrainedCandidate', false) ? 'Yes' : 'No';
  }

  public getTrainingRecords(): string {
    return get(this.trainerData, 'trainingRecords', false) ? 'Yes' : 'No';
  }

  public displayVehicleDetails(): boolean {
    return get(this.data, 'schoolCar', false) || get(this.data, 'dualControls', false);
  }

  public getVehicleDetails(): string {
    return get(this.data, 'schoolCar') ? 'School Car' : 'Dual Controls';
  }

}
