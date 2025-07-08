import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.form);
  }
}
