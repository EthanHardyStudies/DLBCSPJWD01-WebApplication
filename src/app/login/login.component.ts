// app.js
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
import { environment } from '../../environments/environment';
import { UserService } from '../_services/user-storage.service';
import { BooksService } from '../_services/books.service';

class userObject{
  _id: string = '';
  username: string = '';
  email: string = '';
  age: number = 0;
  firstName: string = '';
  lastName: string = '';
  role: string = '';
}

class loginResponseMessage {
  user: string = '';
  token: string = '';
}

@Component({
  selector: 'app-login',
  imports: [MatToolbarModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  subjectData!: boolean;
  
  username: string = '';
  password: string = '';

    constructor(
      private http: httpService,
      private auth: AuthService,
      private user: UserService,
      private router: Router,
      private book: BooksService
    ) { }

  //When login is clicked send the request to the http service for authentication on the API
  onSubmit(user: string, pass: string) {
    
    try {
      if (user && pass) {
        //create url and body
        let body = '{ "username": "' + user +'", "password": "' + pass + '"}';
        var url = environment.baseUrl + "login"
        
        //send to method in http service
        this.http.loginPost(url, JSON.parse(body), user, pass).subscribe(
          data => {
            if (data.status === true){
              //process response data
              var body = new loginResponseMessage();
              body = Object.assign(data.data);

              var user = new userObject();
              user = Object.assign(JSON.parse(body.user.replace('[', '').replace(']', '')));

              //save authToken, userID and userdata for use by other components and services
              this.auth.setToken(body.token);
              this.user.setUser(user._id);
              this.user.userData = user;
              console.log('Login successful');
              //route to landing page after login
              this.router.navigate(['/booklist']);
            }
          }
        )
      } else {
        console.log('Please enter valid credentials');
      }
    }catch (err: any){
      console.log('Error in login process: ' + JSON.stringify(err.message));
    }

  }
}
