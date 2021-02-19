import { Component, OnInit } from '@angular/core';
import { ContactService } from './../../../common-services/contact/contact.service';

@Component({
  selector: 'app-home-edit-dialog',
  templateUrl: './home-edit-dialog.component.html',
  styleUrls: ['./home-edit-dialog.component.sass']
})
export class HomeEditDialogComponent implements OnInit {
  userToDelete: any
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.userToDelete = localStorage.getItem('userToDelete')
  }

  deleteContact() {
    this.contactService.deleteContactById(this.userToDelete).subscribe(res => {
      console.log('deleted')
    })
  }

}
