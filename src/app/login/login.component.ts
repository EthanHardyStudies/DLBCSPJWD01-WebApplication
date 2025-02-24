// app.js
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
import { environment } from '../../environments/environment';

class loginResponseMessage {
  user: JSON[] = [];
  token: string = '';
}

@Component({
  selector: 'app-login',
  imports: [MatToolbarModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

    constructor(
      private http: httpService,
      private auth: AuthService,
      private router: Router
    ) { }

  onSubmit(user: string, pass: string) {
    try {
      if (user && pass) {
        let body = '{ "username": "' + user +'", "password": "' + pass + '"}';
        var url = environment.baseUrl + "login"
        
        this.http.loginPost(url, JSON.parse(body), user, pass).subscribe(
          data => {
            if (data.status === true){
              var body = new loginResponseMessage();
              body = Object.assign(data.data)
              this.auth.setToken(body.token);
              console.log('Login successful');
              this.router.navigate(['/booklist'])
            }
            else('Login Unsuccessful, please try again.')
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
