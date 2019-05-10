import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleChecksCardComponent } from '../vehicle-checks-card';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { StartTest } from '../../../../journal/journal.actions';

describe('VehicleChecksCardComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCardComponent>;
  let component: VehicleChecksCardComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCardComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksCardComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105));
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
  });

});
