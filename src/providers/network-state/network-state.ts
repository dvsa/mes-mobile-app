import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionStatus {
  ONLINE = 0,
  OFFLINE,
}

@Injectable()
export class NetworkStateProvider {

  private networkStatus$: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.OFFLINE);

  constructor(private network: Network, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initialiseNetworkEvents();
      const status = this.network.type !== 'none' ? ConnectionStatus.ONLINE : ConnectionStatus.OFFLINE;
      this.networkStatus$.next(status);
    });
  }

  private initialiseNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      console.log('network type', this.network.type);
      this.updateNetworkStatus(ConnectionStatus.OFFLINE);
    });

    this.network.onConnect().subscribe(() => {
      console.log('network type', this.network.type);
      this.updateNetworkStatus(ConnectionStatus.ONLINE);
    });
  }

  private updateNetworkStatus(status: ConnectionStatus) {
    this.networkStatus$.next(status);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.networkStatus$.asObservable();
  }

  public getNetworkState(): ConnectionStatus {
    return this.networkStatus$.getValue();
  }

}
