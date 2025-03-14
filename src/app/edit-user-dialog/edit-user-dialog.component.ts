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
class userEditResponse {
  user: string = '';
  token: string = '';
}
@Component({
  selector: 'app-edit-user-dialog',
  imports: [MatFormFieldModule, FormsModule, MatDialogModule, MatToolbarModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  username: string = "";
  email: string = "";
  _id: string = "";
  age: number = 0;
  userData: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private user: UserService,
    private http: httpService,
    public book: BooksService) {};
  
  ngOnInit(): void {
    this.userData = this.user.userData;
    this.firstName = this.userData.firstName;
    this.lastName = this.userData.lastName;
    this.username = this.userData.username;
    this._id = this.userData._id;
    this.email = this.userData.email;
    this.age = this.userData.age;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitUserUpdate(firstName: string, lastName: string, email: string, age: number): void {
    const userID = this.user.getUser();

    let userBody = {
      "firstName": firstName,
      "lastName": lastName,
      "age": age,
      "email": email
    }

    var url = environment.baseUrl + "user/updateUser";

    this.http.genericPatch(url, userBody, this._id).subscribe(
      data => {
        if (data.status === true){
          var body = new userEditResponse();
          body = Object.assign(data.data)

          //Add the returned book to the tables array.
          
          this.book.getBooks();
          console.log('User edited successfully');
          this.dialogRef.close();
          location.reload()
        }
        else
        {
          'Edit user unsuccessful, please try again.'
        }
      }
    )
  }
}
