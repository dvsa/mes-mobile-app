import { Injectable } from '@angular/core';
import { SecureStorageObject } from '@ionic-native/secure-storage';
import { NetworkStateProvider } from '../network-state/network-state';

@Injectable()
export class DataStoreProvider {

  defaultStoreName: string = 'MES';

  secureContainer: SecureStorageObject = null;

  constructor(public networkState: NetworkStateProvider) {
  }

  setSecureContainer(container: SecureStorageObject): void {
    this.secureContainer = container;
  }

  getSecureContainer(): SecureStorageObject {
    return this.secureContainer;
  }

  getKeys(): any {
    if (!this.secureContainer) {
      return Promise.resolve('getKeys');
    }
    return this.secureContainer.keys().then((response: string[]) => {
      return response;
    });
  }

  getItem(key: string) {
    if (!this.secureContainer) {
      return Promise.resolve('getItem');
    }
    return this.secureContainer.get(key).then((response) => {
      return response;
    });
  }

  setItem(key: string, value: any) {
    if (!this.secureContainer) {
      return Promise.resolve('setItem');
    }
    return this.secureContainer.set(key, value).then((response) => {
      return response;
    });
  }

  removeItem(key: string) {
    if (!this.secureContainer) {
      return Promise.resolve('removeItem');
    }
    return this.secureContainer.remove(key);
  }

}
