import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';

export interface Response {
  status: number,
  message: string
}

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
    let response = this.http.post<Response>(url, { headers: reqHeaders })
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

  loginPost(url: string, body: JSON){
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.post<Response>(url, body)
    return response;
  }
}
