import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule],
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
