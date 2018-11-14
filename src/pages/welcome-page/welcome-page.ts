import { Page } from 'ionic-angular/navigation/nav-util';
import { Component } from '@angular/core';
import { NavController, ViewController, Modal, ModalController } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { YoutubeDemoModalPage } from '../youtube-demo-modal/youtube-demo-modal';
import { HelpSectionPage } from '../../help/pages/help-section/help-section';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome-page.html'
})
export class WelcomePage {
  title: string = 'Welcome';
  journalPage: Page = JournalPage;
  helpPage: Page = HelpSectionPage;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private modalController: ModalController
  ) {}

  navToJournal() {
    this.navCtrl.push(JournalPage);
  }

  openHelpModal() {
    const helpModalOptions = {};

    const helpModalData = {};

    const helpModal: Modal = this.modalController.create(
      YoutubeDemoModalPage,
      { data: { helpModalData } },
      helpModalOptions
    );
    helpModal.present();
  }
}
