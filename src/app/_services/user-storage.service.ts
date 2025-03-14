import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  constructor() { }

    //save the userid to local storage
  setUser(userID:string){

    // Serialise the string
    const tokenString:string = JSON.stringify( userID );
  
    localStorage.setItem('userID', tokenString);
  }
  
  // Retrieve the userid from local storage
  getUser(): string | null{
  
    let userID = localStorage.getItem( 'userID' );
  
    if( userID !=null){
  
        userID = JSON.parse(userID);
   }
  
   return userID;
  
  }
}
