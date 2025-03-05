import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
import { UserService } from '../_services/user-storage.service';
import { environment } from '../../environments/environment';

class bookResponse{
  data: JSON[] = [];
}
@Injectable({
  providedIn: 'root'
})
export class BooksService {

      constructor(
        private http: httpService,
        private user: UserService,
        private auth: AuthService
      ) { }

      async getBooks(): Promise<any> {
        const url = environment.baseUrl + "book/all"
        var user = this.user.getUser();

        this.http.genericGet(url, user).subscribe(
          async data => {
            if (data.status === true){
              var body = new bookResponse();
              body = Object.assign(data.data)
  
              console.log('Retrieved all books');
              localStorage.setItem("Books", JSON.stringify(body))
            }
          }
        )
      }
}
