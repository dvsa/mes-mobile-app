import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ModalControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { DelegatedRekeySearchPage } from '../delegated-rekey-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { StoreModule, Store } from '@ngrx/store';
import { DelegatedRekeySearchModel, delegatedSearchReducer } from '../delegated-rekey-search.reducer';
import { DelegatedRekeySearchViewDidEnter, SearchBookedDelegatedTest } from '../delegated-rekey-search.actions';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { bookedTestSlotMock } from '../../../shared/mocks/test-slot-data.mock';
import { configureTestSuite } from 'ng-bullet';

fdescribe('DelegatedRekeySearchPage', () => {
  let fixture: ComponentFixture<DelegatedRekeySearchPage>;
  let component: DelegatedRekeySearchPage;
  let store$: Store<DelegatedRekeySearchModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DelegatedRekeySearchPage,
      ],
      imports: [
        IonicModule,
        AppModule,
        ComponentsModule,
        TestSlotComponentsModule,
        StoreModule.forRoot({
          delegatedRekeySearch: delegatedSearchReducer,
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

  beforeEach(async(async () => {
    fixture = TestBed.createComponent(DelegatedRekeySearchPage);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    await component.ngOnInit();
  }));

  describe('Class', () => {

    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('applicationReferenceInvalid', () => {
      it('should return true if the applicationReference is less than 11 characters', () => {
        component.applicationReference = '123456789';
        const value: boolean = component.applicationReferenceInvalid;
        expect(value).toEqual(true);
      });
      it('should return false if the applicationReference is 11 characters', () => {
        component.applicationReference = '12345678910';
        const value: boolean = component.applicationReferenceInvalid;
        expect(value).toEqual(false);
      });
    });

    it('should dispatch RekeySearchViewDidEnter action', () => {
      spyOn(store$, 'dispatch');
      spyOn(component, 'setUpSubscription').and.callFake(() => {});

      component.ionViewDidEnter();

      expect(store$.dispatch).toHaveBeenCalledWith(new DelegatedRekeySearchViewDidEnter());
      expect(component.setUpSubscription).toHaveBeenCalled();
    });

    it('should set applicationReference property', () => {
      const applicationReference = 'application-reference';
      component.applicationReferenceChanged(applicationReference);
      expect(component.applicationReference).toBe(applicationReference);
    });

    it('should dispatch SearchBookedTest with the right params', () => {
      const applicationReference = 'application-reference';

      component.applicationReferenceChanged(applicationReference);

      spyOn(store$, 'dispatch');

      component.searchTests();

      expect(store$.dispatch).toHaveBeenCalledWith(new SearchBookedDelegatedTest(applicationReference));
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
