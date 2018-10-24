import { Component } from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'alpha-header',
  templateUrl: 'alpha-header.html'
})
export class AlphaHeaderComponent {
  constructor(private app: App) {}

  goHome() {
    this.app.getActiveNavs()[0].popToRoot();
  }
}
