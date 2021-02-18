import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url: string
  constructor(private http: HttpClient) { 
    this.url = environment.APIEndpoint + 'contacts'
    console.log(this.url)
  }

  createContact(contact) {
    return this.http.post(this.url, contact)
  }

  getContacts() {
    return this.http.get(this.url)
  }
}
