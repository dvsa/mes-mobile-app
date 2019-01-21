import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform, LoadingController, ToastController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, LoadingControllerMock, ToastControllerMock } from 'ionic-mocks-jest';
import { By } from '@angular/platform-browser';

import { AppModule } from '../../../app/app.module';
import { JournalPage } from '../journal';
import { DebugElement } from '@angular/core';
import { JournalProvider } from '../../../providers/journal/journal';
import { JournalProviderMock } from '../../../providers/journal/__mocks__/journal.mock';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../journal.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { JournalEffects } from '../journal.effects';
import { Subscription } from 'rxjs/Subscription';
import { SlotSelectorProvider } from '../../../providers/slot-selector/slot-selector';
import { MockedJournalModule } from '../__mocks__/journal.module.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../components/test-slot/__mocks__/screen-orientation.mock';
import { UnloadJournal, LoadJournal } from '../journal.actions';
import { BasePageComponent } from '../../../classes/base-page';
import { StoreModel } from '../../../common/store.model';

describe('JournalPage', () => {
  let fixture: ComponentFixture<JournalPage>;
  let component: JournalPage;
  let store$: Store<StoreModel>;
  let loadingControllerMock: LoadingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalPage],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          journal: journalReducer
        }),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([JournalEffects]),
        MockedJournalModule
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: JournalProvider, useClass: JournalProviderMock },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SlotSelectorProvider, useClass: SlotSelectorProvider},
        { provide: ScreenOrientation, useClass: ScreenOrientationMock},
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalPage);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
      });

      store$ = TestBed.get(Store);
      jest.spyOn(store$, 'dispatch');

      loadingControllerMock = TestBed.get(LoadingController);
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('logout', () => {
      it('should dispatch an UnloadJournal action and call base page logout', () => {
        jest.spyOn(BasePageComponent.prototype, 'logout');
        component.logout();
        expect(store$.dispatch).toHaveBeenCalledWith(new UnloadJournal());
        expect(BasePageComponent.prototype.logout).toHaveBeenCalled();
      });
    });

    describe('loadJournal', () => {
      it('should dispatch a LoadJournal action and create the loading spinner', () => {
        component.loadJournal();
        expect(store$.dispatch).toHaveBeenCalledWith(new LoadJournal());
        expect(loadingControllerMock.create).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    it('there should be one slot for every journal entry', () => {
      const slotsList = componentEl.query(By.css('ion-list'));
      expect(slotsList.children.length).toBe(0);
      fixture.detectChanges();
      let noOfSlotsReturned: number;
      component.pageState.slots$.subscribe(slots => noOfSlotsReturned = slots.length);
      expect(slotsList.children.length).toBe(noOfSlotsReturned);
      expect(slotsList.children.every((child) => child.name === 'test-slot')).toBeTruthy();
    });
  });
});
