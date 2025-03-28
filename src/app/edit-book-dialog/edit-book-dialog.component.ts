import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../_services/user-storage.service';
import { httpService } from '../_services/http.service';
import { BooksService } from '../_services/books.service';
import { BooklistComponent } from '../booklist/booklist.component'

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
export class editBookDialog implements OnInit {
  bookName: string = "";
  description: string = "";
  author: string = "";
  price: number = 0;
  row: any;

  constructor(
    public dialogRef: MatDialogRef<editBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private user: UserService,
    private http: httpService,
    public book: BooksService) {};

  // Sets values of the object to be edited 
  ngOnInit(): void {
    var selectedBook = this.book.booksRow;
    this.bookName = selectedBook.name;
    this.description = selectedBook.description;
    this.author = selectedBook.author;
    this.price = selectedBook.price;
  }

      //Closes the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //create and send request to API for object field updates
  submitBookUpdate(name: string, description: string, author: string, price: number){
    if(name && description && author && price > -1){

      var row = this.book.booksRow;
      const userID = this.user.getUser();

      //create url and body
      let bookBody = {
        "name": name,
        "description": description,
        "author": author,
        "price": price,
        "priceUnit": row.priceUnit,
        "userID": userID
      }
      var url = environment.baseUrl + "book/updateBook";
      //send to method in http service
      this.http.genericPatch(url, bookBody, row._id).subscribe(
        data => {//process response data
          if (data.status === true){
            var body = new bookAddResponse();
            body = Object.assign(data.data)

            //retrieve latest books for data source             
            this.book.getBooks();
            console.log('Book added successfully');
            this.dialogRef.close();
          }
          else
          {
            console.log('Edit book unsuccessful, please try again.')
          }
        }
      )
    }
  }
}