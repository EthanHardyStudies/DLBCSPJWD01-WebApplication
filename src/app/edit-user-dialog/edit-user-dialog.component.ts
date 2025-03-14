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
  
    //sets the values for the logged in user that will be edited
  ngOnInit(): void {
    this.userData = this.user.userData;
    this.firstName = this.userData.firstName;
    this.lastName = this.userData.lastName;
    this.username = this.userData.username;
    this._id = this.userData._id;
    this.email = this.userData.email;
    this.age = this.userData.age;
  }

  //Closes the dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  //build and send user update to http service for API
  submitUserUpdate(firstName: string, lastName: string, email: string, age: number): void {
    const userID = this.user.getUser();

    //create url and body
    let userBody = {
      "firstName": firstName,
      "lastName": lastName,
      "age": age,
      "email": email
    }
    var url = environment.baseUrl + "user/updateUser";
    //send to method in http service
    this.http.genericPatch(url, userBody, this._id).subscribe(
      data => {//process response data
        if (data.status === true){
          //Update user data in the user service
          var body = new userEditResponse();
          body = Object.assign(data.data[0])
          this.user.userData = body;
          console.log('User edited successfully');
          this.dialogRef.close();
        }
        else
        {
          console.log('Edit user unsuccessful, please try again.');
        }
      }
    )
  }
}
