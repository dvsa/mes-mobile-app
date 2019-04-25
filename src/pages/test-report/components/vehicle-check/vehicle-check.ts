import { Component, OnInit } from '@angular/core';

// import { StoreModel } from '../../../../shared/models/store.model';
// import { Store } from '@ngrx/store';

interface VehicleCheckComponentState {
}

@Component({
  selector: 'vehicle-check',
  templateUrl: 'vehicle-check.html',
})
export class VehicleCheckComponent implements OnInit {

  componentState: VehicleCheckComponentState;

  selectedShowMeQuestion: boolean = false;

  constructor(
    // private store$: Store<StoreModel>
    ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onTap = () => {
    console.log('competency tapped');
  }

  onPress = () => {
    console.log('competency pressed');
  }

  canButtonRipple = () => {
    return true;
  }

  hasDrivingFault = () => {
    return false;
  }

  hasSeriousFault = () => {
    return false;
  }

  hasDangerousFault = () => {
    return false;
  }
}
