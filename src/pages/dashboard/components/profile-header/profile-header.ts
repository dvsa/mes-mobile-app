import { Component } from '@angular/core';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';

@Component({
  selector: 'profile-header',
  templateUrl: 'profile-header.html',
})

export class ProfileHeaderComponent {

  employeeId: string;

  constructor(
    public authenticationPovider: AuthenticationProvider,
  ) {
    this.employeeId = this.authenticationPovider.getEmployeeId();
  }
}
