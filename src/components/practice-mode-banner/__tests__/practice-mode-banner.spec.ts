import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PracticeModeBanner } from '../practice-mode-banner';
import { NavController, IonicModule, Config } from 'ionic-angular';
import { NavControllerMock, ConfigMock } from 'ionic-mocks';

describe('PracticeModeBanner', () => {
  let fixture: ComponentFixture<PracticeModeBanner>;
  let component: PracticeModeBanner;
  let navController: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeModeBanner],
      imports: [IonicModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PracticeModeBanner);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
      });
  }));
  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
    describe('exitPracticeMode', () => {
      it('should take the user back to the root page', () => {
        component.exitPracticeMode();
        expect(navController.popToRoot).toHaveBeenCalled();
      });
    });
  });
});
