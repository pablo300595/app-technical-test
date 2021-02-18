import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FriendsSidebarComponent } from './components/common-components/friends-sidebar/friends-sidebar.component';
import { HomeCreateComponent } from './components/home/home-create/home-create.component';
import { HomeEditComponent } from './components/home/home-edit/home-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FriendsSidebarComponent,
    HomeCreateComponent,
    HomeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
