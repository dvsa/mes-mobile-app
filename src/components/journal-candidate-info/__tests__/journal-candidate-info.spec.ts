import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalCandidateInfoComponent } from '../journal-candidate-info';
import { IonicModule } from 'ionic-angular';
import { getFormattedCandidateName } from '../../../shared/utils/formatters';

jest.mock('../../../shared/utils/formatters');
const mockGetFormattedCandidateName = <jest.Mock>getFormattedCandidateName;

describe('JournalCandidateInfoComponent', () => {
  let component: JournalCandidateInfoComponent;
  let fixture: ComponentFixture<JournalCandidateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalCandidateInfoComponent],
      imports: [IonicModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalCandidateInfoComponent);
    component = fixture.componentInstance;
    component.candidateName = { title: 'Mr', firstName: 'Joe', lastName: 'Bloggs' };
    component.testCategory = 'B57mins';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('getName', () => {
    it('should return the result of passing the candidate name to the name formatter', () => {
      mockGetFormattedCandidateName.mockReturnValue('Joe Bloggs');
      expect(component.name).toBe('Joe Bloggs');
      expect(mockGetFormattedCandidateName).toHaveBeenCalled();
    });
  });

  describe('extractCategoryCode', () => {
    it('should return N/A for a null test category', () => {
      component.testCategory = null;
      expect(component.categoryCode).toBe('N/A');
    });
    it('should extract the textual part of test category', () => {
      component.testCategory = 'B57mins';
      expect(component.categoryCode).toBe('B');
    });
  });
});
