import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JournalPage } from '../journal/journal';
import { LdtmModePage } from '../ldtm-mode/ldtm-mode';
import { PolicyDataPage } from '../policy-data/policy-data';
import { ManageDeviceDebriefStoragePage } from '../manage-device-debrief-storage/manage-device-debrief-storage';
import { TrainerModePage } from '../trainer-mode/trainer-mode';

import { Page } from 'ionic-angular/navigation/nav-util';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  title: string = 'Dashboard';
  journalPage: Page = JournalPage;
  ldtmPage: Page = LdtmModePage;
  policyDataPage: Page = PolicyDataPage;
  manageDeviceDebriefStoragePage: Page = ManageDeviceDebriefStoragePage;
  trainerModePage: Page = TrainerModePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    navCtrl.remove(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
}
