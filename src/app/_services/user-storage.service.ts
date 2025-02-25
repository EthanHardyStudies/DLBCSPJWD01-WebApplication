import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setUser(userID:string){

    // First, serialize it (but just if token is not string type).
    const tokenString:string = JSON.stringify( userID );
  
    localStorage.setItem('userID', tokenString);
  }
  
  // READ the token from localstorage and Deserialize
  getUser(): string | null{
  
    let userID = localStorage.getItem( 'userID' );
  
    if( userID !=null){
  
        // You just need to parse if you serialized it inside setToken() method
        userID = JSON.parse(userID);
   }
  
   return userID;
  
  }
}
