import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../_services/user-storage.service';
import { httpService } from '../_services/http.service';
import { BooksService } from '../_services/books.service';

export interface DialogData {
  name: string;
  description: string;
  author: string;
  price: number;
}

class bookAddResponse {
  user: string = '';
  token: string = '';
}

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrl: './edit-book-dialog.component.css',
  imports: [MatFormFieldModule, FormsModule, MatDialogModule, MatToolbarModule]
})
export class editBookDialog {
  name: string = "";
  description: string = "";
  author: string = "";
  price: number = 0;

  constructor(
    public dialogRef: MatDialogRef<editBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private user: UserService,
    private http: httpService,
    public book: BooksService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitBookUpdate(name: string, description: string, author: string, price: number){
    if(name && description && author && price > -1){
      const userID = this.user.getUser();
      let body = '{ "name": "' + name + '", "description": "' + description + '", "author": "' + author + '", "price": ' + price + ', "priceUnit": "rand", "userID": "' + userID + '"}';
      var url = environment.baseUrl + "book/addBook";
      
      this.http.genericPost(url, body).subscribe(
        data => {
          if (data.status === true){
            var body = new bookAddResponse();
            body = Object.assign(data.data)

            //Add the returned book to the tables array.
            
            this.book.getBooks();
            console.log('Book added successfully');
            this.dialogRef.close();
            location.reload()
          }
          else
          {
            'Add book unsuccessful, please try again.'
          }
        }
      )
    }
  }
}