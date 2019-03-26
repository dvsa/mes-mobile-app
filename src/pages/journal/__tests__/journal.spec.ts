import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import {
  Config, Platform,
  LoadingController, ToastController, IonicModule, NavController, NavParams,
} from 'ionic-angular';
import {
  NavControllerMock, NavParamsMock, ConfigMock,
  PlatformMock, LoadingControllerMock, ToastControllerMock,
} from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { JournalPage } from '../journal';
import { DebugElement } from '@angular/core';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../journal.reducer';
import { Subscription } from 'rxjs/Subscription';
import { SlotSelectorProvider } from '../../../providers/slot-selector/slot-selector';
import { MockedJournalModule } from '../__mocks__/journal.module.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { UnloadJournal, LoadJournal, LoadJournalSuccess } from '../journal.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { StoreModel } from '../../../shared/models/store.model';

import journalSlotsDataMock from '../__mocks__/journal-slots-data.mock';
import { JournalNavigationComponent } from '../components/journal-navigation/journal-navigation';
import { By } from '@angular/platform-browser';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { ConnectionStatus } from '../../../providers/network-state/network-state';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';

describe('JournalPage', () => {
  let fixture: ComponentFixture<JournalPage>;
  let component: JournalPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalPage, JournalNavigationComponent],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          journal: journalReducer,
        }),
        MockedJournalModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SlotSelectorProvider, useClass: SlotSelectorProvider },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalPage);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
      });

    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('logout', () => {
      it('should dispatch an UnloadJournal action and call base page logout', () => {
        spyOn(BasePageComponent.prototype, 'logout');
        component.logout();
        expect(store$.dispatch).toHaveBeenCalledWith(new UnloadJournal());
        expect(BasePageComponent.prototype.logout).toHaveBeenCalled();
      });
    });

    describe('loadJournalManually', () => {
      it('should dispatch a LoadJournal action', () => {
        component.loadJournalManually();
        expect(store$.dispatch).toHaveBeenCalledWith(new LoadJournal());
      });
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;

      // Manually dispatching an action which loads slots to the store
      store$.dispatch(new LoadJournalSuccess(journalSlotsDataMock,
                                             ConnectionStatus.ONLINE,
                                             false,
                                             new Date()));
    });

    // TODO - Come back and look at this test
    xit('there should be one slot for every journal entry', () => {
      const slotsList = componentEl.query(By.css('ion-list'));
      expect(slotsList.children.length).toBe(0);

      fixture.detectChanges();

      let noOfSlotsReturned: number;
      component.pageState.slots$.subscribe(slots => noOfSlotsReturned = slots.length);

      expect(slotsList.children.length).toBe(noOfSlotsReturned);
      expect(slotsList.children.every(child => child.name === 'test-slot')).toBeTruthy();
    });
  });
});
