import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { RekeySearchCardComponent } from '../rekey-search-card';
import { NavControllerMock } from 'ionic-mocks';
import { REKEY_SEARCH_PAGE } from '../../../../page-names.constants';

describe('RekeySearchCard ', () => {
  let component: RekeySearchCardComponent;
  let fixture: ComponentFixture<RekeySearchCardComponent>;
  let navContoller: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RekeySearchCardComponent],
      imports: [IonicModule.forRoot(RekeySearchCardComponent)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(RekeySearchCardComponent);
      component = fixture.componentInstance;
      navContoller = TestBed.get(NavController);
    });
  }));

  describe('Class', () => {
    describe('navigateToRekey', () => {
      it('should trigger navigation to rekey', () => {
        component.navigateToRekeySearch();

        expect(navContoller.push).toHaveBeenCalledWith(REKEY_SEARCH_PAGE);
      });
    });
  });

  describe('DOM', () => {

  });
});
