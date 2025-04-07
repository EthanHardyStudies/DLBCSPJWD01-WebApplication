import { Component, Inject, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
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
import { editBookDialog } from '../edit-book-dialog/edit-book-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';


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
  imports: [MatToolbarModule, MatTableModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatProgressSpinnerModule, 
            MatMenuModule, MatButtonModule, MatTooltipModule, MatPaginatorModule, MatCardModule, NgIf, NgFor],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent implements OnInit, AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public book: BooksService,
    private router: Router
  ) {}

  Books: any = [];
  displayedColumns: string[] = ['name', 'description', 'author', 'price', 'delete'];  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  
  public booksStatus = "0";
  public booksDeleteStatus = "0";
  public booksData: any;
  public mobile = false;

  // Add host listener for responsive design
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView();
  }

  //This initialisation method: 
  //1. Subscribes to behaviour subjects in the books service
  //2. Retrieves objects linked to the logged in user
  //3. saves those objects for use in the table data source
  ngOnInit(){
    this.book.booksStatus.subscribe(code => this.booksResponse(code));
    this.book.booksDeleteStatus.subscribe(code => this.booksDeleteResponse(code));
    this.book.getBooks();
    if (window.screen.width < 1000000) { // 768px portrait
      this.mobile = true;
    }
    this.checkMobileView();
  }

  // Method to determine mobile view
  checkMobileView() {
    this.mobile = window.innerWidth <= 768;
   
  }

  //This method add a paginator to the table after the components view has been initialised.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //When the booksStatus behaviour subject updates this method updates the data source for the table with the latest objet set
  booksResponse(code: string){

    switch(code){
      case "0": //default value means the objects are loading
        break;
      case "200": //success. Add objects to data source.
        this.booksData = this.book.booksData;
        //build data source
        this.dataSource.data = [...this.booksData];
        break;
      default: //Every other value means an error
        console.log("Retrieval request failed, try again.")
        break;
    }
    this.booksStatus = code;
  }

  //when the book delete behaviour subject is updated this will trigger error handling if it failed or it will refresh the book list.
  booksDeleteResponse(code: string){

    switch(code){
      case "0": //default value means the books are loading
        break;
      case "200": //success. Retrieve latest object list
        this.book.getBooks()
        break;
      default: //Every other value means an error
        console.log("Deletion request failed, try again.")
      break;
    }
    this.booksStatus = code;
  }

  //This method opens a dialog component for adding a new object
  OpenAddBookDialog(): void {
    const dialogRef = this.dialog.open(addBookDialog, {
      
    })
  }

  //This method opens a dialog component for editing a object
  OpenEditBookDialog(row: any): void {
    this.book.booksRow = row;
    const dialogRef = this.dialog.open(editBookDialog, {
      
    })
  }

    //This method opens a dialog component for editing the logged in user
  OpenEditUserDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      
    })
  }

  //This method calls on the book service to delete the object
  DeleteBook(row: any): void {
    var id = row._id
    this.book.deleteBook(id)
  }

  //This method clears local storage values and logs the user out
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

    //Closes the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Send a request to generic post method to insert a new object
  submitNewBook(name: string, description: string, author: string, price: number){
    if(name && description && author && price > -1){
      //retrieve userid for api request
      const userID = this.user.getUser();
      //create url and body
      let body = '{ "name": "' + name + '", "description": "' + description + '", "author": "' + author + '", "price": ' + price + ', "priceUnit": "rand", "userID": "' + userID + '"}';
      var url = environment.baseUrl + "book/addBook";
      //send to method in http service
      this.http.genericPost(url, body).subscribe(
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
            console.log('Add book unsuccessful, please try again.');
          }
        }
      )
    }
  }
}