import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Store, select } from '@ngrx/store';

import { StoreModel } from '../shared/models/store.model';
import { LoadAppInfo, AppSuspended, AppResumed } from '../modules/app-info/app-info.actions';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LOGIN_PAGE } from '../pages/page-names.constants';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { getTests } from '../modules/tests/tests.reducer';

declare let window: any;

@Component({
  templateUrl: 'app.html',
})
export class App {
  rootPage: any = LOGIN_PAGE;
  textZoom: number = 100;
  increasedContrast: Boolean = false;

  private platformSubscription: Subscription;
  private subscription: Subscription;

  constructor(
    private store$: Store<StoreModel>,
    private statusBar: StatusBar,
    private platform: Platform,
    private translate: TranslateService,
  ) {
    this.platform.ready()
      .then(() => {
        this.configureLocale();
        this.configureStatusBar();
        this.loadAppInfo();
        if (this.platform.is('ios')) {
          this.configureAccessibility();
          this.configurePlatformSubscriptions();
          store$
          .pipe(select(getTests))
          .subscribe(res => window.store = res);
        }
      });
  }

  ionViewWillUnload() {
    if (this.platformSubscription) {
      this.platformSubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  configureLocale() {
    this.translate.setDefaultLang('en');
  }

  configureStatusBar() {
    this.statusBar.styleLightContent();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#000000');
  }

  loadAppInfo() {
    this.store$.dispatch(new LoadAppInfo());
  }

  configurePlatformSubscriptions() {
    const merged$ = merge(
      this.platform.resume.pipe(map(this.onAppResumed)),
      this.platform.pause.pipe(map(this.onAppSuspended)),
    );
    this.platformSubscription = merged$.subscribe();
  }

  onAppResumed = () => {
    this.store$.dispatch(new AppResumed());
    window.MobileAccessibility.usePreferredTextZoom(true);
    window.MobileAccessibility.getTextZoom(this.getTextZoomCallback);
  }

  onAppSuspended = () => {
    this.store$.dispatch(new AppSuspended());
  }

  configureAccessibility = () => {
    window.MobileAccessibility.updateTextZoom();
    window.MobileAccessibility.getTextZoom(this.getTextZoomCallback);
    window.MobileAccessibility.isDarkerSystemColorsEnabled(
      (increasedContrast: boolean) => this.increasedContrast = increasedContrast);
  }

  getTextZoomCallback = (zoomLevel: number) => {
    // Default iOS zoom levels are: 88%, 94%, 100%, 106%, 119%, 131%, 144%
    this.textZoom = zoomLevel;
    window.MobileAccessibility.usePreferredTextZoom(false);
  }

  public getTextZoom(zoom: number): string {
    if (!zoom) return 'regular';
    if (zoom >= 131) return 'x-large';
    if (zoom >= 106) return 'large';
    return 'regular';
  }

  public getTextZoomClass(): string {
    return `text-zoom-${this.getTextZoom(this.textZoom)}`;
  }

  public getIncreasedContrastClass(): string {
    return this.increasedContrast ? 'increased-contrast' : '';
  }
}
