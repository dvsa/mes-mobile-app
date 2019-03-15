import { Injectable } from '@angular/core';
import { SecureStorageObject } from '@ionic-native/secure-storage';

@Injectable()
export class DataStoreProvider {

  // todo - only temporary
  defaultStoreName: string = 'MES';

  secureContainer: SecureStorageObject = null;

  constructor( ) {
  }

  setSecureContainer(container: SecureStorageObject): void {
    this.secureContainer = container;
  }

  getSecureContainer(): SecureStorageObject {
    return this.secureContainer;
  }

  getKeys(): any {
    return this.secureContainer.keys().then((response: string[]) => {
      return response;
    });
  }

  getItem(key: string) {
    return this.secureContainer.get(key).then((response) => {
      return response;
    });
  }

  setItem(key: string, value: any) {
    return this.secureContainer.set(key, value).then((response) => {
      return response;
    });
  }

  removeItem(key: string) {
    return this.secureContainer.remove(key);
  }

}
