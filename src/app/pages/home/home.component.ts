import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>Welcome {{ firstName }}</h1>
    <button (click)="logout()">Log Out</button>
  `
})
export class HomeComponent {
  firstName = '';

  constructor(private authService: AuthService) {
    this.firstName = this.authService.UserData?.firstName || 'User';
  }

  logout() {
    this.authService.logout();
  }
}
