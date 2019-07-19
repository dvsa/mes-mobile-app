import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PrivacyNoticeComponent } from '../privacy-notice';
import { TranslateService } from 'ng2-translate';
import { translateServiceMock } from '../../../../../shared/__mocks__/translate';

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
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
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
