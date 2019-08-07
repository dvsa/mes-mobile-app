import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';

import { StoreModel } from '../shared/models/store.model';
import { LoadAppInfo } from '../modules/app-info/app-info.actions';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LOGIN_PAGE } from '../pages/page-names.constants';

declare let window: any;
declare let cordova: any;

@Component({
  templateUrl: 'app.html',
})
export class App {
  rootPage: any = LOGIN_PAGE;
  textZoom: number = 100;
  increasedContrast: Boolean = false;

  constructor(
    private store$: Store<StoreModel>,
    private statusBar: StatusBar,
    private platform: Platform,
    private translate: TranslateService,
  ) {
    platform.ready()
      .then(() => {
        this.configureLocale();
        this.configureStatusBar();
        this.configureAccessibility();
        this.loadAppInfo();

        if (cordova && cordova.plugins && cordova.plugins.DisableShakeToEdit) {
          cordova.plugins.DisableShakeToEdit.pluginInitialize();
        }
      });
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

  configureAccessibility() {
    if (this.platform.is('ios') && window && window.MobileAccessibility) {
      window.MobileAccessibility.updateTextZoom();
      window.MobileAccessibility.getTextZoom(this.getTextZoomCallback);
      window.MobileAccessibility.isDarkerSystemColorsEnabled(
        (increasedContrast: boolean) => this.increasedContrast = increasedContrast);
    }
    if (typeof this.platform.resume.subscribe === 'function') {
      this.platform.resume.subscribe(() => {
        window.MobileAccessibility.usePreferredTextZoom(true);
        window.MobileAccessibility.getTextZoom(this.getTextZoomCallback);
      });
    }
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
