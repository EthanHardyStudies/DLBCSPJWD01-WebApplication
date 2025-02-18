import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class httpService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  genericGet(url: string) {
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}

    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", "Bearer " + token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");

    return this.http.get(url, { headers: reqHeaders });
  }

  genericPost(url: string, body: string){
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}

    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");

    return this.http.post(url, body, { headers: reqHeaders })
  }

  loginPost(url: string, body: string, username: string, password: string){
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    return this.http.post(url, body)
  }
}
