import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ RouterModule ]
})
export class AppComponent {
  title = 'hello-world-app';
}
