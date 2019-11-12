import { Component, Input } from '@angular/core';

@Component({
  selector: 'license-issued-banner',
  templateUrl: 'license-issued-banner.html',
})

export class LicenseIssuedBannerComponent{
  @Input()
  licenseIssuedBannerText: string;

  constructor() {

  }
}
