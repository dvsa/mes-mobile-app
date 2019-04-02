
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../../competency/competency';
import { ManoeuvresPopoverComponent } from '../manoeuvres-popover';
import { AppModule } from '../../../../../app/app.module';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test_data/test-data.actions';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { FaultCounterComponent } from '../../fault-counter/fault-counter';

describe('ManoeuvresPopoverComponent', () => {
  let fixture: ComponentFixture<ManoeuvresPopoverComponent>;
  let component: ManoeuvresPopoverComponent;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManoeuvresPopoverComponent,
        MockComponent(CompetencyComponent),
        MockComponent(FaultCounterComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ManoeuvresPopoverComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        storeDispatchSpy = spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    describe('recordManoeuvreSelection ', () => {
      it('should dispatch a RECORD_MANOEUVRES_SELECTION action', () => {
        component.recordManoeuvreSelection('Manoeuver Name');
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordManoeuvresSelection('Manoeuver Name'));
      });
    });
  });
});
