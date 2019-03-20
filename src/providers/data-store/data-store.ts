import { Injectable } from '@angular/core';
import { SecureStorageObject, SecureStorage } from '@ionic-native/secure-storage';
import { NetworkStateProvider } from '../network-state/network-state';
import { Platform } from 'ionic-angular';

@Injectable()
export class DataStoreProvider {

  defaultStoreName: string = 'MES';
  secureContainer: SecureStorageObject = null;

  constructor(
    public platform: Platform,
    public secureStorage: SecureStorage,
    public networkState: NetworkStateProvider) {
  }

  setSecureContainer(container: SecureStorageObject): void {
    this.secureContainer = container;
  }

  getSecureContainer(): SecureStorageObject {
    return this.secureContainer;
  }
  /**
   * Get all stored keys
   * NOTE: secureContainer guard clause allows app to run in browser
   * @returns Promise
   */
  getKeys(): Promise<string[]> {
    if (!this.secureContainer) {
      return Promise.resolve(['']);
    }
    return this.secureContainer.keys().then((response: string[]) => {
      return response;
    });
  }
  /**
   * Gets the specified item for the given key
   * NOTE: secureContainer guard clause allows app to run in browser

   * @param  {string} key
   * @returns Promise
   */
  getItem(key: string): Promise<string> {
    if (!this.secureContainer) {
      return Promise.resolve('');
    }
    return this.secureContainer.get(key).then((response: string) => {
      return response;
    });
  }
  /**
   * sets the value for specified key
   * NOTE: secureContainer guard clause allows app to run in browser
   * @param  {string} key
   * @param  {any} value
   * @returns Promise
   */
  setItem(key: string, value: any): Promise<string> {
    if (!this.secureContainer) {
      return Promise.resolve('');
    }
    return this.secureContainer.set(key, value).then((response: string) => {
      return response;
    });
  }
  /**
   * removes the item for a given key
   * NOTE: secureContainer guard clause allows app to run in browser
   * @param  {string} key
   * @returns Promise
   */
  removeItem(key: string): Promise<string> {
    if (!this.secureContainer) {
      return Promise.resolve('');
    }
    return this.secureContainer.remove(key);
  }

}
