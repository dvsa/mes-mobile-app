import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IncidentCore } from '@dvsa/lw-incident-model';
import {
  LoneWorkerConfigProvider,
} from '../../../external-modules/lw-ionic-module/providers/lone-worker-config.provider';
import { MesLoneWorkerConfigProvider } from '../lone-worker-integration.provider';

@Injectable()
export class LoneWorkerIntegrationProviderMock {

  constructor(
    ) {

  }

  getIncidentPropertiesFromStore(): Observable<Partial<IncidentCore>> {
    return of({ timestamp: new Date() } as Partial<IncidentCore>);
  }

  getTestCentreIdFromStore(): Observable<string> {
    return of('54321');
  }

  createLoneWorkerConfigProvider(): LoneWorkerConfigProvider {
    return new MesLoneWorkerConfigProvider(() => { return ''; }, 100);
  }
}
