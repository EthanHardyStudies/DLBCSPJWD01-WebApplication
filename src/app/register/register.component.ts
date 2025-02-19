import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';

@Component({
  selector: 'app-register',
  imports: [MatToolbarModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    age: string = '';
    
      constructor(
        private http: httpService,
        private auth: AuthService,
        private router: Router
      ) { }
  
    onSubmit(user: string, pass: string) {
      if (user && pass) {
        let body = '{ "username": "' + user +'", "password": "' + pass + '"}';
        var url = "http://localhost:3000/login"
        
        this.http.loginPost(url, JSON.parse(body)).subscribe(
          data => {
            if (data.status === 200){
              this.auth.setToken(data.message);
              this.router.navigate(['/book-list'])
              console.log('Login successful');
            }
            else('Login Unsuccessful, please try again.')
          }
        )
      } else {
        console.log('Please enter valid credentials');
      }
    }
  }
