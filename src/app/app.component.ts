import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { Content } from 'ionic-angular/navigation/nav-interfaces';
import { DEFAULT_LANG, SYS_OPTIONS, AVAILABLE_LANG } from './constants';
import { TranslateService } from 'ng2-translate';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Globalization } from '@ionic-native/globalization';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppConfigProvider } from '../providers/app-config/app-config';
import { AnalyticsEventCategories, AnalyticsEvents } from '../providers/analytics/analytics.model';
import { AllOnOneV2Page } from '../pages/all-on-one-v2/all-on-one-v2';

@Component({
  templateUrl: 'app.html'
})
export class App {
  @ViewChild('content')
  nav: NavController;
  @ViewChild('ionContent')
  ionContent: Content;
  @ViewChild('ionContent')
  header: Content;
  rootPage: any = AllOnOneV2Page;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translate: TranslateService,
    screenOrientation: ScreenOrientation,
    insomnia: Insomnia,
    globalization: Globalization,
    private device: Device,
    private ga: GoogleAnalytics,
    private appConfig: AppConfigProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByName('black');
      splashScreen.hide();

      translate.setDefaultLang(DEFAULT_LANG);

      if (platform.is('cordova')) {
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT_SECONDARY);
        insomnia.keepAwake();
        globalization.getPreferredLanguage().then((res) => {
          this.setDefaultLanguage(res.value);
        });

        this.ga
          .startTrackerWithId(this.appConfig.getGoogleAnalyticsKey())
          .then(() => {
            this.ga.setUserId(this.device.uuid);
            this.ga
              .addCustomDimension(
                this.appConfig.getGoogleAnalyticsUserIdDimension(),
                this.device.uuid
              )
              .then();
            this.ga.trackEvent(AnalyticsEventCategories.LIFECYCLE, AnalyticsEvents.APP_LOAD).then();
          })
          .catch((e) => console.log('Error starting GA', e));
      } else {
        const browserLanguage = translate.getBrowserLang() || DEFAULT_LANG;
        this.setDefaultLanguage(browserLanguage);
      }
    });
  }

  setDefaultLanguage(language: string) {
    const langCode = this.getAvailableLangCode(language);
    this.translate.use(langCode);
    SYS_OPTIONS.systemLanguage = langCode;
  }

  getAvailableLangCode(lang) {
    const langCode = lang.substring(0, 2).toLowerCase();
    return AVAILABLE_LANG.some((x) => x.code === langCode) ? lang : DEFAULT_LANG;
  }

  ngOnInit() {
    this.nav.viewWillEnter.subscribe((viewController: ViewController) => {
      this.ionContent.resize();
      this.header.resize();
    });
  }
}
