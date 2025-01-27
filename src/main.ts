import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
