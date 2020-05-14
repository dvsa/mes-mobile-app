import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IncidentCore } from '@dvsa/lw-incident-model';

@Injectable()
export class LoneWorkerIntegrationProviderMock {

  constructor(
    ) {

  }

  getIncidentPropertiesFromStore(): Observable<Partial<IncidentCore>> {
    return of({ timestamp: new Date() } as Partial<IncidentCore>);
  }
}
