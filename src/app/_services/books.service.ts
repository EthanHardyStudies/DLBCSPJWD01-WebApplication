import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { httpService } from '../_services/http.service';
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
        private auth: AuthService
      ) { }

      getBooks(user: string){
        const url = environment.baseUrl + "book/all"
        const body = '{ "userID": "' + user + '" }'
      }
}
