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
    // decide what to do when this event is triggered.
    router.events.subscribe(val => {
      if (location.pathname === "/booklist") {
          // do something
      }
    });
  }
}
