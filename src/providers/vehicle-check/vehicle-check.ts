import { Subject } from 'rxjs/Subject';
import { FaultStoreProvider } from './../fault-store/fault-store';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
export interface IVehicleCheck {
  complete?: boolean;
  faultType?: string;
}

export enum vCheckType {
  SHOWME = 'showMe',
  TELLME = 'tellMe'
}

@Injectable()
export class VehicleCheckProvider {
  private tellMe: IVehicleCheck = {};
  private showMe: IVehicleCheck = {};
  showMeSub: Subject<IVehicleCheck>;

  constructor(private faultStore: FaultStoreProvider) {
    this.showMeSub = new Subject();
    this.showMeSub.next({ ...this.showMe });
  }

  /**
   * Logic to determine which sub-fault should be used to write to the main vehiclecheck fault in state
   */
  overwriteFaultWith() {
    const { faultType: tellMeFault } = this.tellMe;
    const { faultType: showMeFault } = this.showMe;
    if (showMeFault === 'dangerous') {
      return 'dangerous';
    }

    if (tellMeFault === 'fault' && showMeFault === 'serious') {
      return 'serious';
    }

    if (tellMeFault === undefined || tellMeFault === showMeFault) {
      return this.showMe.faultType;
    }

    return this.tellMe.faultType;
  }

  getTellMe(): IVehicleCheck {
    return this.tellMe;
  }

  reset(type: string) {
    this[type] = {};
  }

  markAsComplete({ id = '', keyWords = '' }, type: string) {
    this[type] = {
      ...this[type],
      id,
      keyWords,
      complete: type === vCheckType.SHOWME ? true : !!id
    };

    this.showMeSub.next(this[type]);

    if (this.showMe.faultType === undefined) {
      this.addFaultToStore(this.tellMe.faultType);
    }
  }

  addFaultToStore(faultType: string) {
    this.faultStore.resetFault('vehicleCheck');
    if (faultType) {
      this.faultStore.addFault('vehicleCheck', faultType);
    }
  }

  addFault(type: string, faultType: string): void {
    this[type].faultType = faultType;

    const updatedFaultType = this.overwriteFaultWith();

    this.addFaultToStore(updatedFaultType);

    if (type === 'showMe') {
      this.markAsComplete({}, type);
    }
  }

  /**
   * reset faultype in sub-fault
   * @param type - sub fault type
   */
  resetFault(type: string): void {
    const { faultType: removedFaults, ...remaining } = this[type];

    if (type === 'showMe') {
      this.showMeSub.next({ ...remaining });
    }

    return { ...remaining };
  }

  /**
   *
   * @param type - sub fault type
   */
  removeFault(type: string) {
    this[type] = this.resetFault(type);

    this.faultStore.resetFault('vehicleCheck');
    if (type === 'showMe' && this.tellMe.faultType) {
      this.addFaultToStore(this.tellMe.faultType); // reset vehicleCheck fault to tellMe state
    }
  }
}
