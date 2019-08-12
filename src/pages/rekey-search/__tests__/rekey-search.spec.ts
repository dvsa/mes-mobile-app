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

describe('RekeySearchPage', () => {
  let fixture: ComponentFixture<RekeySearchPage>;
  let component: RekeySearchPage;
  let store$: Store<RekeySearchModel>;

  beforeEach(async(() => {
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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RekeySearchPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
      });
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
        const bookedTestSlot = {
          booking: {
            application: {
              applicationId: 1234567,
              bookingSequence: 3,
              checkDigit: 1,
              entitlementCheck: false,
              extendedTest: false,
              progressiveAccess: false,
              specialNeeds: 'Candidate has dyslexia',
              specialNeedsExtendedTest: false,
              testCategory: 'A1',
              welshTest: false,
            },
            candidate: {
              candidateAddress: {
                addressLine1: '1 Station Street',
                addressLine2: 'Someplace',
                addressLine3: 'Sometown',
                postcode: 'AB12 3CD',
              },
              candidateId: 101,
              candidateName: {
                firstName: 'Florences',
                lastName: 'Pearson',
                title: 'Miss',
              },
              driverNumber: 'PEARS015220A99HC',
              mobileTelephone: '07654 123456',
              primaryTelephone: '01234 567890',
              secondaryTelephone: '04321 098765',
              dateOfBirth: '1998-01-31',
              ethnicityCode: 'A',
            },
          },
          slotDetail: {
            duration: 57,
            slotId: 9191911223,
            start: '2019-08-08T08:10:00',
          },
          testCentre: {
            centreId: 54321,
            centreName: 'Example Test Centre',
            costCode: 'EXTC1',
          },
          vehicleTypeCode: 'C',
          vehicleSlotTypeCode: 7,
          examinerVisiting: false,
        };
        const result = component.isBookedTestSlotEmpty(bookedTestSlot);
        expect(result).toBe(false);
      });
    });
  });
});
