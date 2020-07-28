import { Component, Input } from '@angular/core';
import { Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getCommunicationPreference }
  from '../../../../../modules/tests/communication-preferences/communication-preferences.reducer';
import { getConductedLanguage }
  from '../../../../../modules/tests/communication-preferences/communication-preferences.selector';
import { configureI18N } from '../../../../../shared/helpers/translation.helpers';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../../../modules/tests/communication-preferences/communication-preferences.model';

@Component({
  selector: 'speed-check-debrief-card',
  templateUrl: 'speed-check-debrief-card.html',
})
export class SpeedCheckDebriefCardComponent implements OnInit {

  constructor(
    public store$: Store<StoreModel>,
    private translate: TranslateService,
    ) {}

  @Input()
  public emergencyStop: EmergencyStop;

  @Input()
  public avoidance: Avoidance;

  @Input()
  public avoidanceAttempted: boolean;

  @Input()
  public isTranslatable: boolean;

  ngOnInit(): void {
    if (!this.isTranslatable) {
      const currentTest$ = this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
      );
      const conductedLanguage$ = currentTest$.pipe(
        select(getCommunicationPreference),
        select(getConductedLanguage),
      );
      conductedLanguage$.pipe(tap(value => configureI18N(Language.ENGLISH, this.translate)));
    }
  }

}
