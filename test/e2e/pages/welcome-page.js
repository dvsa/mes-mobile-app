// welcome-page.js
var Page = require('./page.js');

var WelcomePage = Object.create(Page, {
  /**
   * define elements
   */
  pageTitle: {
    get: function() {
      return element
        .all(by.css('ion-navbar:first-child'))
        .first()
        .getText();
    }
  },
  okButton: {
    get: function() {
      return element(by.xpath('//button[ion-row[ion-col[span[text()="Try the app"]]]]'));
    }
  },

  /**
   * define or overwrite page methods
   */
  clickOk: {
    value: function() {
      return Page.clickButton(this.okButton);
    }
  }
});

module.exports = WelcomePage;
