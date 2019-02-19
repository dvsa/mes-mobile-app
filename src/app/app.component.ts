import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';

import { StoreModel } from '../common/store.model';
import { LoadAppInfo } from '../modules/app-info/app-info.actions';

declare let window: any;

@Component({
  templateUrl: 'app.html',
})
export class App {
  rootPage: any = 'LoginPage';
  textZoom: number = 100;
  increasedContrast: Boolean = false;

  constructor(
    private store$: Store<StoreModel>,
    private statusBar: StatusBar,
    private platform: Platform,
  ) {
    platform.ready()
      .then(() => {
        this.configureStatusBar();
        this.configureAccessibility();
        this.loadAppInfo();
      });
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
      window.MobileAccessibility.getTextZoom((textZoom: number) => this.textZoom = textZoom);
      window.MobileAccessibility.isDarkerSystemColorsEnabled(
        (increasedContrast: boolean) => this.increasedContrast = increasedContrast);
    }
  }

  public getTextZoom(zoom: number): number {
    if (!zoom) return 100;
    if (zoom >= 144) return 144;
    if (zoom >= 131) return 131;
    if (zoom >= 119) return 119;
    if (zoom >= 106) return 106;
    if (zoom >= 100) return 100;
    if (zoom >= 94) return 94;
    return 88;
  }

  public getTextZoomClass(): string {
    return `text-zoom-${this.getTextZoom(this.textZoom)}`;
  }

  public getIncreasedContrastClass(): string {
    return this.increasedContrast ? 'increased-contrast' : '';
  }
}
