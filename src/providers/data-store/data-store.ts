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
    console.log('setting secureContainer');
    this.secureContainer = container;
  }

  getSecureContainer(): SecureStorageObject {
    console.log('getting secureContainer');
    return this.secureContainer;
  }

  getKeys(): any {
    return this.secureContainer.keys().then((response: string[]) => {
      console.log('response from getKeys', response);
      return response;
    });
  }

  getItem(key: string) {
    return this.secureContainer.get(key).then((response) => {
      console.log('response from get', response);
      return response;
    });
  }

  setItem(key: string, value: any) {
    return this.secureContainer.set(key, value).then((response) => {
      console.log('response from set item', response);
      return response;
    });
  }

  removeItem(key: string) {
    return this.secureContainer.remove(key);
  }

}
