import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  logoSvg = `
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#4CAF50" />
      <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="18" font-family="Arial" dy=".3em">LOGO</text>
    </svg>
  `;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }
}
