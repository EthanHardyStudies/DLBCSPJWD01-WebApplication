import { Component, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-wishlist';
}

@Injectable({
  providedIn: 'root'
})
export class routerActions{
  constructor(location: Location, router: Router) {
    
  }
}
