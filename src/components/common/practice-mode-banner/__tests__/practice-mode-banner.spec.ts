import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PracticeModeBanner } from '../practice-mode-banner';
import { NavController, IonicModule, Config } from 'ionic-angular';
import { NavControllerMock, ConfigMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet'

describe('PracticeModeBanner', () => {
  let fixture: ComponentFixture<PracticeModeBanner>;
  let component: PracticeModeBanner;
  let navController: NavController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeModeBanner],
      imports: [IonicModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
  });

  beforeEach(async(() => {
        fixture = TestBed.createComponent(PracticeModeBanner);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
  }));

  describe('Class', () => {
    describe('exitPracticeMode', () => {
      it('should take the user back to the root page', () => {
        component.exitPracticeMode();
        expect(navController.popTo).toHaveBeenCalled();
      });
    });
  });
});
