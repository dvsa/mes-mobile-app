import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { PrivacyNoticeComponent } from '../privacy-notice';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '../../../../../shared/__mocks__/translate';
import { ConfigMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet';

describe('PrivacyNoticeComponent', () => {
  let fixture: ComponentFixture<PrivacyNoticeComponent>;
  let component: PrivacyNoticeComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PrivacyNoticeComponent,
      ],
      imports: [
        IonicModule,
        TranslateModule,
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrivacyNoticeComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });

});
