import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalNavigationComponent } from '../journal-navigation';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks-jest';
import { StoreModule } from '@ngrx/store';
import { journalReducer } from '../../../journal.reducer';

describe('JournalNavigationComponent', () => {
  let component: JournalNavigationComponent;
  let fixture: ComponentFixture<JournalNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalNavigationComponent ],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          journal: journalReducer
        }),
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(JournalNavigationComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    // TODO: set up the store and implement unit tests for the UI logic
  });
});
