import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  URL = 'http://localhost:3000/contacts';
  constructor(private http: HttpClient) { }

  createContact(contact) {
    return this.http.post(this.URL, contact)
  }
}
