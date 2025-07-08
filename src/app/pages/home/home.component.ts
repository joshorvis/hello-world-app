import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  firstName = '';

  constructor(private authService: AuthService) {
    this.firstName = this.authService.UserData?.firstName || 'User';
  }
}
