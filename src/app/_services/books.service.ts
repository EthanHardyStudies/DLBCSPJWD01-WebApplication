import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
import { UserService } from '../_services/user-storage.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

class bookResponse{
  data: JSON[] = [];
}
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public booksStatus = new BehaviorSubject<string>("0");
  public booksDeleteStatus = new BehaviorSubject<string>("0");
  public booksData = {};
  public booksRow: any;
  
  constructor(
    private http: httpService,
    private user: UserService,
    private auth: AuthService
  ) { }

  //This method calls an endpoint on the APi that returns all books linked to the user that is logged in.
  getBooks(): any {
  //create url and userdata
  const url = environment.baseUrl + "book/all";
  var user = this.user.getUser();
  //send to method in http service
  this.http.genericGet(url, user).subscribe(
    data => {
      //if response is successful store the books in the service for use by other components
      if (data.status === true){
        var body = new bookResponse();
        body = Object.assign(data.data);

        this.booksData = body;
        this.booksStatus.next("200");
      } else {
        this.booksStatus.next("100");
      }      
    }
  )
  }

  //This method calls an endpoint on the API that deletes a specific book.
  deleteBook(id: string): any {
    //create url
    const url = environment.baseUrl + "book/removeBook";
    
    //send to method in http service
    this.http.genericDelete(url, id).subscribe(
      data => {
        if (data.status === true){
          var body = new bookResponse();
          body = Object.assign(data.data);
  
          this.booksData = body;
          this.booksDeleteStatus.next("200");
        } else {
          this.booksDeleteStatus.next("100");
        }      
      }
    )
    }
  
}
