import { Component, OnInit } from '@angular/core';

interface VehicleCheckComponentState {
}

@Component({
  selector: 'vehicle-check',
  templateUrl: 'vehicle-check.html',
})
export class VehicleCheckComponent implements OnInit {

  componentState: VehicleCheckComponentState;

  selectedShowMeQuestion: boolean = false;

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
