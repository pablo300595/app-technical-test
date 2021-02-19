import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { HomeCreateService } from './services/home-create.service';
import { FriendsSidebarService } from './../../common-components/friends-sidebar/services/friends-sidebar.service';
import { ContactService } from '../../common-services/contact/contact.service';
import { NotificationService } from './../../common-services/notifications/notification.service';

@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.sass']
})
export class HomeCreateComponent implements OnInit {
  phoneNumberList = [{type: 'mobile', value: ''}]
  isFavorite: boolean
  politeSectionForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl('male'),
    martial: new FormControl('unmarried'),
    favorite: new FormControl(false)
  })

  constructor(private fb: FormBuilder, private homeCreateService: HomeCreateService,
    private contactService: ContactService, private friendsSidebarService: FriendsSidebarService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.addFormControl(0)
    this.isFavorite = false
  }

  addPhoneNumber(phoneNumber: any) {
    this.phoneNumberList.push(phoneNumber)
  }

  addFormControl(index: number) {
    this.politeSectionForm.addControl(`phoneType${index}`, this.fb.control('mobile'))
    this.politeSectionForm.addControl(`phoneNumber${index}`, this.fb.control(''))
  }

  removePhoneNumber() {
    this.phoneNumberList.pop()
  }

  removeFormControl(index: number) {
    this.politeSectionForm.removeControl(`phoneType${index}`)
    this.politeSectionForm.removeControl(`phoneNumber${index}`)
  }

  showFormValues() {
    console.log(this.politeSectionForm)
  }

  saveContact() {
    let contact = {
      first_name: this.politeSectionForm.controls['firstName'].value,
      last_name: this.politeSectionForm.controls['lastName'].value,
      gender: this.politeSectionForm.controls['gender'].value,
      martial: this.politeSectionForm.controls['martial'].value,
      favorite: this.isFavorite,
      contact: this.getPhoneArray()
    }
    this.contactService.createContact(contact).subscribe(res => {
      console.log(res)
      this.contactService.getContacts().subscribe(contacts => {
        this.friendsSidebarService.changeCurrentContactList(contacts)
        this.notificationService.success('Concact has been successfully created!')
      })
    }, err => {
      this.notificationService.warn('An error ocurred with the data!!')
    })
  }

  getPhoneArray() {
    let currentObjectPhoneList = []
    const currentPhoneList = Object.entries(this.politeSectionForm.controls)

    const firstFilteredPhoneList = currentPhoneList.filter((control) => {
     return (control[0].includes('phoneNumber'))
    })

    const firstFilteredPhonetypeList = currentPhoneList.filter((control) => {
      return (control[0].includes('phoneType'))
     })

    const secondFilteredPhoneList = firstFilteredPhoneList.map((item: any) => {
      return item[1].value
    })

    const secondFilteredPhoneTypeList = firstFilteredPhonetypeList.map((item: any) => {
      return item[1].value
    })

    for (let i = 0; i < secondFilteredPhoneList.length; i++) {
      currentObjectPhoneList.push({_type: secondFilteredPhoneTypeList[i], no: secondFilteredPhoneList[i]})
    }

    return (currentObjectPhoneList)
  }

  changeFavoriteStatus() {
    this.isFavorite = !this.isFavorite
  }

}
