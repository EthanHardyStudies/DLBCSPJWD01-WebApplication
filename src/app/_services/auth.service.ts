import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  // Save the token in localstorage:
setToken(token:string){

  // First, serialize it (but just if token is not string type).
  const tokenString:string = JSON.stringify( token );

  localStorage.setItem('token', tokenString);
}

// Read the token from localstorage and Deserialize
getToken(): string | null{

let token = localStorage.getItem( 'token' );
 //Parse token if it was serialised when storing it in local storage
if( token !=null){
    token = JSON.parse(token);
}

 return token;

}
}
