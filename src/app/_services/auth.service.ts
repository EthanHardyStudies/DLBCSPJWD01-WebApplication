import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // STORE the token in localstore:
setToken(token:string){

  // First, serialize it (but just if token is not string type).
  const tokenString:string = JSON.stringify( token );

  localStorage.setItem('token', tokenString);
}

// READ the token from localstorage and Deserialize
getToken(): string | null{

  let token = localStorage.getItem( 'token' );

  if( token !=null){

      // You just need to parse if you serialized it inside setToken() method
      token = JSON.parse(token);
 }

 return token;

}
}
