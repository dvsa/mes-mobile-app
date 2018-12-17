import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock } from 'ionic-mocks-jest';
import { By } from '@angular/platform-browser';

import { AppModule } from '../../../app/app.module';
import { JournalPage } from '../journal';
import { DebugElement } from '@angular/core';
import { JournalProvider } from '../../../providers/journal/journal';
import { JournalServiceMock } from '../../../providers/journal/__mocks__/journal.mock';

describe('JournalPage', () => {
  let fixture: ComponentFixture<JournalPage>;
  let component: JournalPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalPage],
      imports: [IonicModule, AppModule],
      providers: [
        {
          provide: NavController,
          useFactory: () => NavControllerMock.instance()
        },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: JournalProvider, useClass: JournalServiceMock }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalPage);
        component = fixture.componentInstance;
      });
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
    });

    it('there should be one card for every journal entry', () => {
      const slotsList = componentEl.query(By.css('ion-list'));
      expect(slotsList.children.length).toBe(0);
      fixture.detectChanges();
      const noOfSlotsReturned = component.journalSlot.length;
      expect(slotsList.children.length).toBe(noOfSlotsReturned);
      expect(slotsList.children.every((child) => child.name === 'ion-card')).toBeTruthy();
    }); 
  });
});
