import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-booklist',
  imports: [MatToolbarModule, MatTable],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent {
  Books: JSON[] = [];
  
}
