import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TaskCardComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
