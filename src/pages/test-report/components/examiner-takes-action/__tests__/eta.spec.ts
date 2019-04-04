import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EtaComponent } from '../eta';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { ToggleVerbalEta, TogglePhysicalEta } from '../../../../../modules/tests/test_data/test-data.actions';

describe('Examiner Takes Action Component', () => {
  let fixture: ComponentFixture<EtaComponent>;
  let component: EtaComponent;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EtaComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EtaComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        storeDispatchSpy = spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should dispatch a TOGGLE_ETA_VERBAL action', () => {
      component.toggleVerbal();
      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleVerbalEta());
    });

    it('should dispatch a TOGGLE_ETA_PHYSICAL action', () => {
      component.togglePhysical();
      expect(storeDispatchSpy).toHaveBeenCalledWith(new TogglePhysicalEta());
    });
  });
});
