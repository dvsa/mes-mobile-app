// Generic page functions
function Page() {
  this.pageTitle = 'My Page';
}

Page.prototype.open = function() {
  browser.get('');
};

Page.prototype.getPageTitle = function() {
  return this.pageTitle;
};

Page.prototype.contains = function(stringValue) {
  return element.all(by.xpath('//*[contains(text(),"' + stringValue + '")]')).isPresent();
};

Page.prototype.clickButton = function(buttonElement) {
  // Wait for page to be active
  browser.wait(ExpectedConditions.stalenessOf(element(by.className('click-block-active'))));
  // Check button is present to be clicked - Uncomment to help DEBUG as protractor will stop dead if button not present
  //buttonElement.isPresent().then(function (isPresentOnPage) {
  //  if (isPresentOnPage) {
  return buttonElement.click();
  //  }
  //});
};

module.exports = new Page();
