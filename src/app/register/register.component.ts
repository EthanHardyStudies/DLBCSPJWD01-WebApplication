import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
import { environment } from '../../environments/environment';

class registerResponseMessage {
  user: JSON[] = [];
  token: string = '';
}

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
    age: number = 0;
    
      constructor(
        private http: httpService,
        private auth: AuthService,
        private router: Router
      ) { }
  
    onSubmit(user: string, pass: string, firstName: string, lastName: string, email: string, age: number) {
      if (user && pass) {
        let body = '{ "username": "' + user + '", "password": "' + pass + '", "firstName": "' + firstName + '", "lastName": "' + lastName + '", "email": "' + email + '", "age": ' + age + '}';
        var url = environment.baseUrl + "signup"         
        
        this.http.loginPost(url, JSON.parse(body), user, pass).subscribe(
          data => {
            if (data.status === true){
              var body = new registerResponseMessage();
              body = Object.assign(data.data)
              this.auth.setToken(body.token);
              console.log('Registration successful');
              this.router.navigate(['/booklist'])
            }
            else('Registration Unsuccessful, please try again.')
          }
        )
      } else {
        console.log('Please enter valid credentials');
      }
    }
  }
