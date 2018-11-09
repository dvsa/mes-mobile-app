// journal-page.js
var Page = require('./page.js');

var JournalPage = Object.create(Page, {
  /**
   * define elements
   */
  pageTitle: {
    get: function() {
      return element(by.xpath('//h3[@class="heading-medium"][ancestor::page-journal]')).getText();
    }
  },

  /**
   * define or overwrite page methods
   */
  viewCandidate: {
    value: function(candidateName) {
      var candidateElement = element(
        by.xpath(
          '//journal-candidate-info[div[ion-row[ion-col[span[text()="' + candidateName + '"]]]]]'
        )
      );
      Page.clickButton(candidateElement);
    }
  },

  slotExists: {
    value: function(slotTime, candidateName) {
      return element
        .all(
          by.xpath(
            '//ion-row[ion-col[div[contains(@class,"slot__time") and text()[normalize-space()="' +
              slotTime +
              '"]]] and ion-col[journal-candidate-info[div[ion-row[ion-col[span[text()="' +
              candidateName +
              '"]]]]]]]'
          )
        )
        .isPresent();
    }
  }
});

module.exports = JournalPage;
