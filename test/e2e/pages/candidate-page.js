// candidate-page.js
var Page = require('./page.js');

var CandidatePage = Object.create(Page, {
  /**
   * define elements
   */
  pageTitle: {
    get: function() {
      return element(
        by.xpath('//h3[@class="heading-medium"][ancestor::page-candidate-info]')
      ).getText();
    }
  }

  /**
   * define or overwrite page methods
   */
});

module.exports = CandidatePage;
