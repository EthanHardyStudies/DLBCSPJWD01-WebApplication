import { Component, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatTable } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-booklist',
  imports: [MatToolbarModule, MatTable, MatIcon, MatFormFieldModule, MatDialogModule],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {
  Books: JSON[] = [];
  name: string = "";
  description: string = "";
  image: string = "";
  price: number = 0;

  constructor(public dialog: MatDialog) {}
  OpenAddBookDialog(): void {
    const dialogRef = this.dialog.open(addBookDialog, {
      width: '25%',
      data: { name: this.name, description: this.description, image: this.image, price: this.price }
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

  constructor(
    public dialogRef: MatDialogRef<addBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}