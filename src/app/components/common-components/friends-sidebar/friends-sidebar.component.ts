import { Component, OnInit } from '@angular/core';
import { HomeCreateService } from './../../home/home-create/services/home-create.service';
import { ContactService } from './../../common-services/contact/contact.service';
import { FriendsSidebarService } from './services/friends-sidebar.service';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrls: ['./friends-sidebar.component.sass']
})
export class FriendsSidebarComponent implements OnInit {
  action: string
  contactList: any
  constructor(private contactService: ContactService, private friendsSidebarService: FriendsSidebarService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(res => {
      this.contactList = res
      console.log(this.contactList)
    })
  }

  goToCreateView() {
    
  }

  goToEditView(contact) {
    this.friendsSidebarService.changeUserToEditBS(contact)
  }

}
