import { Observable } from 'rxjs/Observable';
import { ConnectionStatus } from '../network-state';
import { of } from 'rxjs/observable/of';


export class NetworkStateProviderMock {

  public onNetworkChange(): Observable<ConnectionStatus> {
    return of(ConnectionStatus.OFFLINE)
  }

  public getNetworkState(): ConnectionStatus {
    return ConnectionStatus.OFFLINE;
  }

}
