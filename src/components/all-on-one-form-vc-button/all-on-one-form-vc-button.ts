import { VehicleCheckProvider, vCheckType } from './../../providers/vehicle-check/vehicle-check';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HazardRecorderProvider } from '../../providers/hazard-recorder/hazard-recorder';
import { CustomHammerConfigProvider } from '../../providers/custom-hammer-config/custom-hammer-config';

export interface IVehicleCheck {
  complete?: boolean;
  faultType?: string;
}

declare const Hammer: any;
@Component({
  selector: 'all-on-one-form-vc-button',
  templateUrl: 'all-on-one-form-vc-button.html'
})
export class AllOnOneFormVcButtonComponent {
  tellMe: IVehicleCheck = {};
  showMe: IVehicleCheck = {};
  mc: any;
  @ViewChild('vCheckButton') vCheckButton;

  constructor(
    private hazardRecorderProvider: HazardRecorderProvider,
    private vcProvider: VehicleCheckProvider,
    public customHammerConfig: CustomHammerConfigProvider,
    public el: ElementRef
  ) {
    this.tellMe = this.vcProvider.getTellMe();
    this.vcProvider.showMeSub.subscribe((data) => (this.showMe = data));
    customHammerConfig.change.subscribe((newDuration) => {
      this.resetHammer(newDuration);
    });
  }

  ngAfterViewInit() {
    const button = this.el.nativeElement;
    this.mc = new Hammer.Manager(button);
    const hammerPress = new Hammer.Press({
      event: 'press',
      time: this.customHammerConfig.pressDuration
    });
    this.mc.add(hammerPress);

    this.mc.on('press', (e) => {
      this.addDrivingFault();
    });

    // Add a fault badge counter if there is a tell me fault
    if (this.isFaultType('tellMe', 'fault')) this.vCheckButton.faultCount = 1;
    if (this.isFaultType('tellMe', 'serious')) this.vCheckButton.serious = true;
    if (this.isFaultType('tellMe', 'dangerous')) this.vCheckButton.dangerous = true;
  }

  // check that object has given faultType set
  isFaultType(type, fault) {
    return this[type].faultType === fault;
  }

  resetHammer(newDuration: number) {
    this.mc.remove('press');
    const hammerPress = new Hammer.Press({
      event: 'press',
      time: newDuration
    });
    this.mc.add(hammerPress);
  }

  // check both vehicle check elements have been completed
  isCheckComplete() {
    return this.tellMe.complete && this.showMe.complete;
  }

  addDrivingFault() {
    // prevent fault marking
    if (
      this.hazardRecorderProvider.isRecordingOrRemoving() ||
      this.showMe.faultType === 'dangerous' ||
      this.showMe.faultType === 'serious'
    ) {
      return;
    }

    this.vcProvider.addFault(vCheckType.SHOWME, 'fault');
  }

  recordHazard() {
    // in case DE first tap on S or D button and then on remove DF
    if (this.hazardRecorderProvider.isRemovingFaultsEnabled) {
      if (
        this.hazardRecorderProvider.isDangerousRemovingEnabled ||
        this.hazardRecorderProvider.isDangerousRecordingEnabled
      ) {
        this.removeDangerousFault();
      } else if (
        this.hazardRecorderProvider.isSeriousRemovingEnabled ||
        this.hazardRecorderProvider.isSeriousRecordingEnabled
      ) {
        this.removeSeriousFault();
      } else if (this.showMe.faultType === 'fault') {
        this.vcProvider.removeFault(vCheckType.SHOWME);
      }
    } else if (this.hazardRecorderProvider.isDangerousRecordingEnabled) {
      this.addDangerousFault();
    } else if (this.hazardRecorderProvider.isSeriousRecordingEnabled) {
      this.addSeriousFault();
    } else {
      this.toggleComplete();
    }

    this.hazardRecorderProvider.disableRecording();
  }

  toggleComplete() {
    this.vcProvider.markAsComplete({}, vCheckType.SHOWME);
  }

  addSeriousFault() {
    if (this.showMe.faultType === 'serious' || this.showMe.faultType === 'dangerous') return;
    this.vcProvider.addFault(vCheckType.SHOWME, 'serious');
  }

  removeSeriousFault() {
    if (this.showMe.faultType !== 'serious') return;
    this.vcProvider.removeFault(vCheckType.SHOWME);
  }

  addDangerousFault() {
    if (this.showMe.faultType === 'dangerous') return;
    this.vcProvider.addFault(vCheckType.SHOWME, 'dangerous');
  }

  removeDangerousFault() {
    if (this.showMe.faultType !== 'dangerous') return;
    this.vcProvider.removeFault(vCheckType.SHOWME);
  }
}
