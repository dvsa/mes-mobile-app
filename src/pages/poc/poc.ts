import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
} from 'ionic-angular';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../shared/classes/base-page';
import { EmailComposer } from '@ionic-native/email-composer';
import * as pdfTemplate from './poc.template';
import * as _ from 'lodash';
declare var cordova:any;    // global;

@IonicPage()
@Component({
  selector: 'page-poc',
  templateUrl: 'poc.html',
})
export class Poc extends BasePageComponent {

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private emailComposer : EmailComposer,
  ) {
    super(platform, navCtrl, authenticationProvider, false);
  }

  sendEmailWithBase64(base64 : string) {
    // Please change these values accordingly, also you can change the attachment PDF name
    // For future requirements, base64 parameter can be a list of base64s, attach multiple PDFs to email
    const email = {
      to: 'emailToSendTo@example.com',
      subject: 'This is the subject header',
      body: 'This is the body of the email',
      attachments: [
        `base64:testResults.pdf//${base64}`,
      ],
      isHtml: true,
    };

    this.emailComposer.open(email);
  }

  generatePdfAndSendEmail() {
    // Used to configure the type of PDF, document size can be one of A4, A3, A2
    const options = {
      documentSize: 'A4',
      type: 'base64',
    };

    // This object will be populated into the placeholders within the HTML template, add more values or
    // or use an existing object to populate the HTML template
    const objectToBePopulatedIntoTemplate = {
      placeHolderExample: 'thisIsAnExampleOfPlaceholderValue',
    };
    cordova.plugins.pdf.fromData(_.template(pdfTemplate.template)(objectToBePopulatedIntoTemplate) , options)
      .then((base64) => {
        this.sendEmailWithBase64(base64);
      })
      .catch(err => console.log(err));
  }

}
