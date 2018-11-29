import { JournalPage } from '../journal';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { HelpModule } from '../../../help/help.module';
import { JournalProvider, mockGetData } from '../../../providers/journal/journal';
import { FaultStoreProvider } from '../../../providers/fault-store/fault-store';
import { TestSummaryMetadataProvider } from '../../../providers/test-summary-metadata/test-summary-metadata';
import { VehicleCheckProvider } from '../../../providers/vehicle-check/vehicle-check';
import { DebugElement } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../../../components/mes-header/mes-header';
import { JournalHeaderComponent } from '../../../components/journal-header/journal-header';
import { JournalCandidateInfoComponent } from '../../../components/journal-candidate-info/journal-candidate-info';
import { JournalTestDetailsComponent } from '../../../components/journal-test-details/journal-test-details';

jest.mock('../../../providers/journal/journal');

const navCtrl = { push: jest.fn() };
const navParams = new NavParams();
const faultStoreStub = { reset: jest.fn() };
const summaryMetadataStub = { reset: jest.fn() };
const vehicleCheckStub = { markAsComplete: jest.fn() };

describe('Journal Page', () => {
  let fixture: ComponentFixture<JournalPage>;
  let component: JournalPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JournalPage,
        MockComponent(HeaderComponent),
        MockComponent(JournalCandidateInfoComponent),
        MockComponent(JournalHeaderComponent),
        MockComponent(JournalTestDetailsComponent)
      ],
      imports: [HelpModule, IonicModule],
      providers: [
        { provide: NavController, useValue: navCtrl },
        { provide: NavParams, useValue: navParams },
        JournalProvider,
        { provide: FaultStoreProvider, useValue: faultStoreStub },
        { provide: TestSummaryMetadataProvider, useValue: summaryMetadataStub },
        { provide: VehicleCheckProvider, useValue: vehicleCheckStub }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalPage);
        component = fixture.componentInstance;
        component.ionViewDidLoad();
        component.ionViewDidEnter();
      });
  }));

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
      expect(mockGetData).toHaveBeenCalled();
    });

    it('should input the candidate info + completion status to the candidate info component', () => {
      fixture.detectChanges();
      const firstCandidateInfo = componentEl.query(By.css('journal-candidate-info'))
        .componentInstance as JournalCandidateInfoComponent;
      const { title, firstName, lastName } = firstCandidateInfo.candidateName;
      expect(title).toBe('Mr');
      expect(firstName).toBe('Joe');
      expect(lastName).toBe('Bloggs');
    });

    it('should input the test information into the test details component', () => {
      fixture.detectChanges();
      const firstTestDetails = componentEl.query(
        By.directive(MockComponent(JournalTestDetailsComponent))
      ).componentInstance;
      expect(firstTestDetails.testCentreName).toBe('Colwick');
    });
  });
});
