import { Injectable } from '@angular/core';
import { SecureStorageObject, SecureStorage } from '@ionic-native/secure-storage';
import { NetworkStateProvider } from '../network-state/network-state';
import { Platform } from 'ionic-angular';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { LogHelper } from '../logs/logsHelper';

@Injectable()
export class DataStoreProvider {

  defaultStoreName: string = 'MES';
  secureContainer: SecureStorageObject = null;

  constructor(
    public platform: Platform,
    public secureStorage: SecureStorage,
    public networkState: NetworkStateProvider,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
  ) {
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
    }).catch((error) => {
      console.log(`unable to find ${key} error is ${error}`);
      return null;
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
    }).catch((error) => {
      this.store$.dispatch(new SaveLog(this.logHelper.createLog(LogType.ERROR, 'Setting local storage item', error)));
      return error;
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
    return this.secureContainer.remove(key).catch(() => {
      return Promise.resolve('');
    });
  }

}
