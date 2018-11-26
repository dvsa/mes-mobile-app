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
import { WelcomePage } from '../pages/welcome-page/welcome-page';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

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
  rootPage: any = WelcomePage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translate: TranslateService,
    screenOrientation: ScreenOrientation,
    insomnia: Insomnia,
    globalization: Globalization,
    private device: Device,
    private ga: GoogleAnalytics
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByName('black');
      splashScreen.hide();

      translate.setDefaultLang(DEFAULT_LANG);

      if (platform.is('cordova')) {
        screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
        insomnia.keepAwake();
        globalization.getPreferredLanguage().then((res) => {
          this.setDefaultLanguage(res.value);
        });
        console.log('device uuid is ', this.device.uuid);
        this.ga
          .startTrackerWithId('UA-129814222-1')
          .then(() => {
            console.log('Google analytics is ready now');
            this.ga.setUserId(this.device.uuid).then((resp) => {
              console.log('Response from setUserId', resp);
            });
            this.ga.trackView('app load').then((resp) => {
              console.log('initial trackview response', resp);
            });
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
