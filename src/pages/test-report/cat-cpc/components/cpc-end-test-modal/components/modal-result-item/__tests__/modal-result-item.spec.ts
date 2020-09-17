import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';

import { ModalResultItemComponent } from '../modal-result-item';
import { AppModule } from '../../../../../../../../app/app.module';

describe('ModalResultItemComponent', () => {
  let fixture: ComponentFixture<ModalResultItemComponent>;
  let component: ModalResultItemComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalResultItemComponent,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalResultItemComponent);
    component = fixture.componentInstance;
  }));

  describe('getOutcomeIcon', () => {
    it('should return pass image when isPass is true', () => {
      component.isPass = true;
      expect(component.getOutcomeIcon()).toEqual('assets/imgs/greenCorrectAnswer.png');
    });

    it('should return fail image when isPass is false', () => {
      component.isPass = false;
      expect(component.getOutcomeIcon()).toEqual('assets/imgs/redWrongAnswer.png');
    });
  });

  describe('displayScore', () => {
    it('should return a zero if score is null', () => {
      expect(component.displayScore(null)).toEqual(0);
    });

    it('should return score if score is a number', () => {
      expect(component.displayScore(1)).toEqual(1);
    });
  });
});
