import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet';
import { SpeedCardComponent } from '../speed-card';

describe('SpeedCardComponent', () => {

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpeedCardComponent,
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
  }));

  describe('DOM', () => {

  });

});
