import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FriendsSidebarComponent } from './components/common-components/friends-sidebar/friends-sidebar.component';
import { HomeDetailComponent } from './components/home/home-detail/home-detail.component';
import { HomeEditComponent } from './components/common-components/home-edit/home-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FriendsSidebarComponent,
    HomeDetailComponent,
    HomeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
