import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface Response {
  status: boolean,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class httpService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  genericGet(url: string, user: string) {
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}
    let reqParams = new HttpParams()
    reqParams = reqParams.set("userID", user)

    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", "Bearer " + token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.get<Response>(url, { headers: reqHeaders })
    return response;
  }

  genericPost(url: string, body: string){
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}

    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.post<Response>(url, body, { headers: reqHeaders })
    return response;
  }

  loginPost(url: string, body: JSON, user: string, pass: string){
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    reqHeaders = reqHeaders.append("Authorization", "Basic " + btoa(user + ":" + pass));
    let response = this.http.post<Response>(url, body, { headers: reqHeaders })
    return response;
  }
}
