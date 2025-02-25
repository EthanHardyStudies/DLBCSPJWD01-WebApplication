import { Component, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatTable } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../_services/user-storage.service';
import { httpService } from '../_services/http.service';

export interface DialogData {
  name: string;
  description: string;
  image: string;
  price: number;
}

class bookAddResponse {
  user: string = '';
  token: string = '';
}

@Component({
  selector: 'app-booklist',
  imports: [MatToolbarModule, MatTable, MatIcon, MatFormFieldModule, MatDialogModule],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {
  Books: JSON[] = [];

  constructor(public dialog: MatDialog) {}
  OpenAddBookDialog(): void {
    const dialogRef = this.dialog.open(addBookDialog, {
      width: '25%'
    })
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
  image: string = "";
  price: number = 0;

  constructor(
    public dialogRef: MatDialogRef<addBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private user: UserService,
    private http: httpService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitNewBook(name: string, description: string, image: string, price: number){
    if(name && description && image && price){
      const userID = this.user.getUser();
      let body = '{ "name": "' + name + '", "description": "' + description + '", "image": "' + image + '", "price": ' + price + '", "userID": "' + userID + '}';
      var url = environment.baseUrl + "book/addBook";
      
      this.http.genericPost(url, body).subscribe(
        data => {
          if (data.status === true){
            var body = new bookAddResponse();
            body = Object.assign(data.data)

            //Add the returned book to the tables array.
            

            console.log('Book added successfully');
            this.dialogRef.close();
          }
          else{
            'Login Unsuccessful, please try again.'
          }
        }
      )
    }
  }
}