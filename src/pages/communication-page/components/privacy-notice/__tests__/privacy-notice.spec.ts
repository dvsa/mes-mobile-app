import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { PrivacyNoticeComponent } from '../privacy-notice';
import { TranslateService, TranslateModule } from 'ng2-translate';
import { translateServiceMock } from '../../../../../shared/__mocks__/translate';
import { ConfigMock } from 'ionic-mocks';

describe('PrivacyNoticeComponent', () => {
  let fixture: ComponentFixture<PrivacyNoticeComponent>;
  let component: PrivacyNoticeComponent;

  beforeEach(async(() => {
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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PrivacyNoticeComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });

});
