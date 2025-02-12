import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DalService {

  constructor(private http: HttpClient) { }

  getPosts(url: string) {
    return this.http.get(url);
  }

  genericPost(url: string, body: string){
    return this.http.post(url, body,{
      headers:{
        'Authorization': '123'
      }
    })
  }
}
