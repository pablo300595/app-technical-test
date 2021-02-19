import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { HomeCreateService } from './../../home/home-create/services/home-create.service';
import { ContactService } from './../../common-services/contact/contact.service';
import { FriendsSidebarService } from './services/friends-sidebar.service';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrls: ['./friends-sidebar.component.sass']
})
export class FriendsSidebarComponent implements OnInit {
  currentContactList: any
  contactList: any
  userToEdit: any
  constructor(private contactService: ContactService, private friendsSidebarService: FriendsSidebarService,
    private router: Router) { }

  ngOnInit(): void {
    this.friendsSidebarService.userToEditObs.subscribe(res => {
      this.userToEdit = res
    })

    this.friendsSidebarService.currentContactListObs.subscribe(res => {
      this.currentContactList = res
    })

    this.contactService.getContacts().subscribe(contacts => {
      this.contactList = contacts
      this.currentContactList = this.contactList
    })
  }

  goToCreateView() {
    
  }

  goToEditView(contact) {
    this.friendsSidebarService.changeUserToEditBS(contact)
    const route = this.router.url
    //if(route == '/' || route == 'home') {
    if(route == '/edit') {
      this.router.navigateByUrl('/')
      setTimeout(() => {
        this.router.navigateByUrl('/edit')
      }, 0)
    } else {
      this.router.navigateByUrl('/edit')
    }
    
    //}
  }

}
