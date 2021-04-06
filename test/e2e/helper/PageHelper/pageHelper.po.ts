import { Page } from '../../utilities/page';

export class PageHelperObject extends Page {

  passCodeField =
    this.getElementByXPath('//XCUIElementTypeSecureTextField[@label="Passcode field"]');
}
