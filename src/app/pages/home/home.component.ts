import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
})
export class HomeComponent {
  firstName = '';

  constructor(private authService: AuthService) {
    this.firstName = this.authService.UserData?.firstName || 'User';
  }
}
