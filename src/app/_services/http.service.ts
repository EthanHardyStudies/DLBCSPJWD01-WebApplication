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

  //This method functions as a get call to be used by any service or component to reach out to the backend API
  genericGet(url: string, user: any) {
    //assign tokens for use in headers
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}
    //create parameters for use in headers
    let reqParams = new HttpParams()
    reqParams = reqParams.set("userID", user)

    //attach headers and send request
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", "Bearer " + token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.get<Response>(url, { headers: reqHeaders, params: reqParams })
    return response;
  }

 //This method functions as a post call to be used by any service or component to reach out to the backend API
  genericPost(url: string, body: string){
    //assign tokens for use in headers
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}

    //attach headers and send request
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", 'Bearer ' + token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.post<Response>(url, body, { headers: reqHeaders })
    return response;
  }

  //This method functions as a patch call to be used by any service or component to reach out to the backend API
  genericPatch(url: string, body: any, id: string){
    //assign tokens for use in headers
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}
    //create parameters for use in headers
    let reqParams = new HttpParams()
    reqParams = reqParams.set("id", id)

    //attach headers and send request
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", 'Bearer ' + token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.patch<Response>(url, body, { headers: reqHeaders, params: reqParams })
    return response;
  }

  //This method functions as a delete call to be used by any service or component to reach out to the backend API
  genericDelete(url: string, id: string){
    //assign tokens for use in headers
    const authToken = this.authService.getToken();
    var token = ""
    if (authToken){ token = authToken}
    //create parameters for use in headers
    let reqParams = new HttpParams()
    reqParams = reqParams.set("id", id)

    //attach headers and send request
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Authorization", "Bearer " + token);
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    let response = this.http.delete<Response>(url, { headers: reqHeaders, params: reqParams })
    return response;
  }

  //This method functions as a post call to be used when logging in. 
  //This is different to the genericPost as different headers are sent down.
  loginPost(url: string, body: JSON, user: string, pass: string){
    //attach headers and send request
    let reqHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    reqHeaders = reqHeaders.append("Authorization", "Basic " + btoa(user + ":" + pass));
    let response = this.http.post<Response>(url, body, { headers: reqHeaders })
    return response;
  }
}
