import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../_services/user-storage.service';
import { httpService } from '../_services/http.service';
import { BooksService } from '../_services/books.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { editBookDialog } from '../edit-book-dialog/edit-book-dialog.component'

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
  selector: 'app-booklist',
  imports: [MatToolbarModule, MatTableModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public book: BooksService,
    private router: Router
  ) {}

  Books: any = [];
  displayedColumns: string[] = ['name', 'description', 'author', 'price', 'delete'];  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  public booksStatus = "0";
  public booksDeleteStatus = "0";
  public booksData: any;

  ngOnInit(){
    this.book.booksStatus.subscribe(code => this.booksResponse(code));
    this.book.booksDeleteStatus.subscribe(code => this.booksDeleteResponse(code));
    this.book.getBooks();
  }

  booksResponse(code: string){

    switch(code){
      case "0":
        break;
      case "200":
        this.booksData = this.book.booksData;
        //build data source
        this.dataSource.data = [...this.booksData];
        break;
      default:
      //error handling
        break;
    }
    this.booksStatus = code;
  }

  booksDeleteResponse(code: string){

    switch(code){
      case "0":
        break;
      case "200":
        this.book.getBooks()
        break;
      default:
        break;
    }
    this.booksStatus = code;
  }

  OpenAddBookDialog(): void {
    const dialogRef = this.dialog.open(addBookDialog, {
      width: '25%'
    })
  }

  OpenEditBookDialog(): void {
    const dialogRef = this.dialog.open(editBookDialog, {
      width: '25%'
    })
  }

  DeleteBook(row: any): void {
    var id = row._id
    this.book.deleteBook(id)
  }

  logUserOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

@Component({
  selector: 'addBookDialog',
  templateUrl: 'add-Book-Dialog.component.html',
  styleUrl: './booklist.component.css',
  imports: [MatFormFieldModule, FormsModule, MatDialogModule, MatToolbarModule]
})
export class addBookDialog {
  name: string = "";
  description: string = "";
  author: string = "";
  price: number = 0;

  constructor(
    public dialogRef: MatDialogRef<addBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private user: UserService,
    private http: httpService,
    public book: BooksService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitNewBook(name: string, description: string, author: string, price: number){
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