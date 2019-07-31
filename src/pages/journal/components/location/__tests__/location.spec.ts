import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from '../location';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      imports: [IonicModule.forRoot(LocationComponent)],
      providers: [],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LocationComponent);
      component = fixture.componentInstance;
      component.location = 'Example Test Centre';
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    describe('location icon', () => {
      it('should display test centre name', () => {
        const locationEl: HTMLElement = fixture.debugElement.query(
          By.css('h3'),
        ).nativeElement;
        fixture.detectChanges();
        expect(locationEl.textContent).toBe('Example Test Centre');
      });
      it('should display a location icon', () => {
        const iconElement = fixture.debugElement.queryAll(
          By.css('ion-icon[name="pin"]'),
        );
        fixture.detectChanges();
        expect(iconElement.length).toBe(1);
      });
    });
  });
});
