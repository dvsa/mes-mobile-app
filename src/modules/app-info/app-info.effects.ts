import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import * as appInfoActions from './app-info.actions';
import { AppInfoProvider } from '../../providers/app-info/app-info';
import { HttpErrorResponse } from '@angular/common/http';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { getAppInfoState } from './app-info.reducer';
import { getDateConfigLoaded } from './app-info.selector';
import { LOGIN_PAGE } from '../../pages/page-names.constants';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Injectable()
export class AppInfoEffects {
  constructor(
    private actions$: Actions,
    private appInfoProvider: AppInfoProvider,
    private dateTimeProvider: DateTimeProvider,
    private store$: Store<StoreModel>,
    private navigationProvider: NavigationProvider,
    private authenticationProvider: AuthenticationProvider,
  ) {}

  @Effect()
  loadAppInfo$ = this.actions$.pipe(
    ofType(appInfoActions.LOAD_APP_INFO),
    switchMap(() => {
      return this.appInfoProvider
        .getVersionNumber()
        .pipe(
          map((versionNumber: string) => new appInfoActions.LoadAppInfoSuccess(versionNumber)),
          catchError((err: HttpErrorResponse) => of(new appInfoActions.LoadAppInfoFailure(err))),
        );
    }),
  );

  @Effect()
  loadConfigSuccessEffect$ = this.actions$.pipe(
    ofType(appInfoActions.LOAD_CONFIG_SUCCESS),
    switchMap(() => {
      console.log('Config loaded successfully');
      return of(new appInfoActions.SetDateConfigLoaded(this.dateTimeProvider.now().format('YYYY-MM-DD')));
    }),
  );

  @Effect()
  appResumedEffect$ = this.actions$.pipe(
    ofType(appInfoActions.APP_RESUMED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getAppInfoState),
          select(getDateConfigLoaded),
        ),
      ),
    )),
    filter(([action, dateConfigLoaded]) => dateConfigLoaded !== this.dateTimeProvider.now().format('YYYY-MM-DD')),
    switchMap(([action, dateConfigLoaded]) => {
      console.log('App resumed after being suspended. Config was not loaded today... app will refresh');
      this.navigationProvider.getNav().setRoot(LOGIN_PAGE);
      return of(new appInfoActions.RestartApp());
    }),
  );

  @Effect()
  loadEmployeeName$ = this.actions$.pipe(
    ofType(appInfoActions.LOAD_EMPLOYEE_NAME),
    switchMap(async () => {
      const result = await this.authenticationProvider.loadEmployeeName();
      return new appInfoActions.LoadEmployeeNameSuccess(result);
    }),
  );
}
