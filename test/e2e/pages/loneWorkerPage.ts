import Page from './page';

class LoneWorker extends Page {

  raiseAlert(incident: string) {
    this.longPressElementByClassName(`${incident}`);
  }

}

export default new LoneWorker();
