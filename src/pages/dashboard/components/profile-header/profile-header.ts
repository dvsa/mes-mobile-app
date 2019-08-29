import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-header',
  templateUrl: 'profile-header.html',
})

export class ProfileHeaderComponent {

  @Input()
  employeeId: string;

}
