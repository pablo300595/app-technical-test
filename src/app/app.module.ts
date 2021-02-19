import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FriendsSidebarComponent } from './components/common-components/friends-sidebar/friends-sidebar.component';
import { HomeCreateComponent } from './components/home/home-create/home-create.component';
import { HomeEditComponent } from './components/home/home-edit/home-edit.component';
import { HomeEditDialogComponent } from './components/home/home-edit/home-edit-dialog/home-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FriendsSidebarComponent,
    HomeCreateComponent,
    HomeEditComponent,
    HomeEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HomeEditDialogComponent]
})
export class AppModule { }
