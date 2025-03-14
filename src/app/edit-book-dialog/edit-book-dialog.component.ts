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


  ngOnInit(): void {
    var selectedBook = this.book.booksRow;
    this.bookName = selectedBook.name;
    this.description = selectedBook.description;
    this.author = selectedBook.author;
    this.price = selectedBook.price;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitBookUpdate(name: string, description: string, author: string, price: number){
    if(name && description && author && price > -1){

      var row = this.book.booksRow;
      const userID = this.user.getUser();

      let bookBody = {
        "name": name,
        "description": description,
        "author": author,
        "price": price,
        "priceUnit": row.priceUnit,
        "userID": userID
      }
      var url = environment.baseUrl + "book/updateBook";
      
      this.http.genericPatch(url, bookBody, row._id).subscribe(
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