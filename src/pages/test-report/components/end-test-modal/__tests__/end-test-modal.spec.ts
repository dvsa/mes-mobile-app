import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EndTestModal } from '../end-test-modal';

describe('EndTestModal', () => {
  let fixture: ComponentFixture<EndTestModal>;
  let component: EndTestModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EndTestModal,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EndTestModal);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
