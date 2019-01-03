import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalIndicatorsComponent } from '../journal-indicators';
import { IonicModule } from 'ionic-angular';
import { DebugElement } from '@angular/core';


describe('JournalIndicatorsComponent', () => {
  let component: JournalIndicatorsComponent;
  let fixture: ComponentFixture<JournalIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalIndicatorsComponent],
      imports: [IonicModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(JournalIndicatorsComponent);
      component = fixture.componentInstance;
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
  });
});