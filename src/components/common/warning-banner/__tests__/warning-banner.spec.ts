import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { WarningBannerComponent } from '../warning-banner';

describe('WarningBanner', () => {
  let fixture: ComponentFixture<WarningBannerComponent>;
  let component: WarningBannerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarningBannerComponent],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(WarningBannerComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('DOM', () => {
    it('should display the warning message', () => {
      const warningText = 'This is the warning text';
      component.warningText = warningText;

      fixture.detectChanges();
      const rendered = fixture.debugElement.query(By.css('span')).nativeElement.innerHTML;
      expect(rendered).toBe(warningText);
    });
  });
});
