import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks-jest';
import { StoreModule, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { CandidateDetailsPage } from '../candidate-details';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { journalReducer } from '../../journal/journal.reducer';
import { LoadJournalSuccess } from '../../journal/journal.actions';
import journalSlotsDataMock from '../../journal/__mocks__/journal-slots-data.mock';
import { StoreModel } from '../../../common/store.model';
import { Subscription } from 'rxjs/Subscription';

describe('CandidateDetailsPage', () => {
  let fixture: ComponentFixture<CandidateDetailsPage>;
  let component: CandidateDetailsPage;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateDetailsPage],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          journal: journalReducer
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CandidateDetailsPage);
        component = fixture.componentInstance;
        component.subscription = new Subscription();

        // this slot id comes from the local-journal.json file
        component.slotId = 8165;
      });

      store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;

      // Manually dispatching an action which loads slots to the store
      store$.dispatch(new LoadJournalSuccess(journalSlotsDataMock));
    });

    // describe('heading with name and time', () => {
      it('should display candidate name', () => {
        const name: HTMLElement = fixture.debugElement.query(By.css('#test-candidate-details-name')).nativeElement;
        fixture.detectChanges();
        expect(name.textContent).toContain('Capitan Sims Montgomery');
      });

      // it('should diplay test activity start time', () => {
      //   const name: HTMLElement = fixture.debugElement.query(By.css('#test-candidate-details-time')).nativeElement;
      //   fixture.detectChanges();
      //   expect(name.textContent).toContain('time');
      // });
      
    // });

    // describe('candidate details', () => {

    // });

    // describe('candidate contacts', () => {

    // });
  });
});
