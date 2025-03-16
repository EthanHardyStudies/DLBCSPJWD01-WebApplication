import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
import { UserService } from '../_services/user-storage.service';
import { environment } from '../../environments/environment';

class registerResponseMessage {
  user: string = '';
  token: string = '';
}

class userObject{
  _id: string = '';
  username: string = '';
  email: string = '';
  age: number = 0;
  firstName: string = '';
  lastName: string = '';
  role: string = '';
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
        private user: UserService,
        private router: Router
      ) { }
  
    onSubmit(user: string, pass: string, firstName: string, lastName: string, email: string, age: number) {
      if (user && pass) {
        //create url and body
        let body = '{ "username": "' + user + '", "password": "' + pass + '", "firstName": "' + firstName + '", "lastName": "' + lastName + '", "email": "' + email + '", "age": ' + age + '}';
        var url = environment.baseUrl + "signup"         
        
        //send to method in http service
        this.http.loginPost(url, JSON.parse(body), user, pass).subscribe(
          data => {
            if (data.status === true){
              //process response data
              var body = new registerResponseMessage();
              body = Object.assign(data.data)

              var user = new userObject();
              user = Object.assign(JSON.parse(body.user.replace('[', '').replace(']', '')));

              //save authToken, userID and userdata for use by other components and services
              this.auth.setToken(body.token);
              this.user.setUser(user._id);
              this.user.userData = user;
              console.log('Registration successful');
              //route to landing page after registration
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
