import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ModalControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { RekeySearchPage } from '../rekey-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { StoreModule, Store } from '@ngrx/store';
import { rekeySearchReducer, RekeySearchModel } from '../rekey-search.reducer';
import { RekeySearchViewDidEnter, SearchBookedTest } from '../rekey-search.actions';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { bookedTestSlotMock } from '../../../shared/mocks/test-slot-data.mock';
import { configureTestSuite } from 'ng-bullet';

describe('RekeySearchPage', () => {
  let fixture: ComponentFixture<RekeySearchPage>;
  let component: RekeySearchPage;
  let store$: Store<RekeySearchModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeySearchPage,
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        TestSlotComponentsModule,
        StoreModule.forRoot({
          rekeySearch: rekeySearchReducer,
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: App, useClass: MockAppComponent },
        Store,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RekeySearchPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should dispatch RekeySearchViewDidEnter action', () => {
      spyOn(store$, 'dispatch');

      component.ionViewDidEnter();

      expect(store$.dispatch).toHaveBeenCalledWith(new RekeySearchViewDidEnter());
    });

    it('should set staffNumber property', () => {
      const staffNumber = 'staff-number';
      component.staffNumberChanged(staffNumber);
      expect(component.staffNumber).toBe(staffNumber);
    });

    it('should set applicationReference property', () => {
      const applicationReference = 'application-reference';
      component.applicationReferenceChanged(applicationReference);
      expect(component.applicationReference).toBe(applicationReference);
    });

    it('should dispatch SearchBookedTest with the right params', () => {
      const staffNumber = 'staff-number';
      const applicationReference = 'application-reference';

      component.staffNumberChanged(staffNumber);
      component.applicationReferenceChanged(applicationReference);

      spyOn(store$, 'dispatch');

      component.searchTests();

      expect(store$.dispatch).toHaveBeenCalledWith(new SearchBookedTest(applicationReference, staffNumber));
    });

    describe('isBookedTestSlotEmpty', () => {
      it('should return true if booked test slot variable is empty', () => {
        const bookedTestSlot = {};
        const result = component.isBookedTestSlotEmpty(bookedTestSlot);
        expect(result).toBe(true);
      });

      it('should return false if booked test slot variable is not empty', () => {
        const bookedTestSlot = bookedTestSlotMock;
        const result = component.isBookedTestSlotEmpty(bookedTestSlot);
        expect(result).toBe(false);
      });
    });
  });
});
