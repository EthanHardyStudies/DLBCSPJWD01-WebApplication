// app.js
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-login',
  imports: [MatToolbarModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    if (this.username && this.password) {
      console.log('Login successful');
      // Add logic for actual authentication
    } else {
      console.log('Please enter valid credentials');
    }
  }
}
