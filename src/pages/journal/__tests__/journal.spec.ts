import { JournalPage } from '../journal';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { HelpModule } from '../../../help/help.module';
import { JournalProvider } from '../../../providers/journal/journal';
import { FaultStoreProvider } from '../../../providers/fault-store/fault-store';
import { TestSummaryMetadataProvider } from '../../../providers/test-summary-metadata/test-summary-metadata';
import { VehicleCheckProvider } from '../../../providers/vehicle-check/vehicle-check';
import { Observable } from 'rxjs';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

const navCtrl = { push: jest.fn() };
const navParams = new NavParams();
const faultStoreStub = { reset: jest.fn() };
const summaryMetadataStub = { reset: jest.fn() };
const vehicleCheckStub = { markAsComplete: jest.fn() };
const journalProviderStub = {
  getData: jest.fn().mockReturnValue(Observable.of([{ key: 'hey' }, { key: 'there' }]))
};

describe('Journal Page', () => {
  let fixture: ComponentFixture<JournalPage>;
  let component: JournalPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalPage],
      imports: [HelpModule, IonicModule],
      providers: [
        { provide: NavController, useValue: navCtrl },
        { provide: NavParams, useValue: navParams },
        { provide: JournalProvider, useValue: journalProviderStub },
        { provide: FaultStoreProvider, useValue: faultStoreStub },
        { provide: TestSummaryMetadataProvider, useValue: summaryMetadataStub },
        { provide: VehicleCheckProvider, useValue: vehicleCheckStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPage);
    component = fixture.componentInstance;
    component.ionViewDidLoad();
    component.ionViewDidEnter();
  });

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;
    });

    it('the list should contain an item for every journal entry', () => {
      const slotList = componentEl.query(By.css('ion-list'));
      expect(slotList.children.length).toBe(0);
      fixture.detectChanges();
      expect(slotList.children.length).toBe(2);
      expect(slotList.children.every((child) => child.name === 'ion-item')).toBeTruthy();
    });
  });
});
