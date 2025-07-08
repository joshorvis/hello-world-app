import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Welcome {{ firstName }}</h1>`
})
export class HomeComponent {
  firstName = '';

  constructor(private authService: AuthService) {
    this.firstName = this.authService.UserData?.firstName || 'User';
  }
}
