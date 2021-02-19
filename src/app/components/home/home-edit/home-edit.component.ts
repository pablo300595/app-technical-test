import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsSidebarService } from './../../common-components/friends-sidebar/services/friends-sidebar.service';
import { ContactService } from '../../common-services/contact/contact.service';
import { NotificationService } from './../../common-services/notifications/notification.service';
import { HomeEditDialogComponent } from './home-edit-dialog/home-edit-dialog.component';


@Component({
  selector: 'app-home-edit',
  templateUrl: './home-edit.component.html',
  styleUrls: ['./home-edit.component.sass']
})
export class HomeEditComponent implements OnInit {
  @ViewChild('homeEditDialog', {static: true}) modal: ElementRef;
  politeSectionForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl('male'),
    martial: new FormControl('unmarried'),
    favorite: new FormControl(false)
  })
  userToEdit: any
  isFavorite: boolean
  phoneNumberList = []

  constructor(private fb: FormBuilder, private friendsSidebarService: FriendsSidebarService, private router: Router,
    private contactService: ContactService, private notificationService: NotificationService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.friendsSidebarService.userToEditObs.subscribe(res => {
      this.userToEdit = res
    })

    if(Object.entries(this.userToEdit).length == 0) {
      this.router.navigateByUrl('/home')
    }

    this.politeSectionForm.controls['firstName'].setValue(this.userToEdit.first_name)
    this.politeSectionForm.controls['lastName'].setValue(this.userToEdit.last_name)
    this.politeSectionForm.controls['gender'].setValue(this.userToEdit.gender)
    this.isFavorite = this.userToEdit.favorite
    this.cleanInitPhoneList()
    this.generateInitPhoneList()
    this.loadContactInfo()
    
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

  generateInitPhoneList() {
    for (let i = 0; i < this.userToEdit.contact.length; i++) {
      this.phoneNumberList.push({type: 'mobile', value: ''})
      this.addFormControl(i)
    }
  }

  cleanInitPhoneList() {
    this.phoneNumberList = []
    
    const currentPhoneList = Object.entries(this.politeSectionForm.controls)
    const firstFilteredPhoneList = currentPhoneList.filter((control) => {
      return (control[0].includes('phoneNumber'))
    })

    if(firstFilteredPhoneList.length != 0) {
      for (let i = 0; i < firstFilteredPhoneList.length; i++) {
        this.removeFormControl(i)
      }
    }
    
  }

  loadContactInfo() {
    if(this.userToEdit.contact.length != 0) {
      for (let i = 0; i < this.userToEdit.contact.length; i++) {
        this.politeSectionForm.controls[`phoneType${i}`].setValue(this.userToEdit.contact[i]._type)
        this.politeSectionForm.controls[`phoneNumber${i}`].setValue(this.userToEdit.contact[i].no)
      }
    }
    
  }

  updateContact() {
    let contact = {
      first_name: this.politeSectionForm.controls['firstName'].value,
      last_name: this.politeSectionForm.controls['lastName'].value,
      gender: this.politeSectionForm.controls['gender'].value,
      //martial: this.politeSectionForm.controls['martial'].value,
      favorite: this.isFavorite,
      contact: this.getPhoneArray()
    }
    this.contactService.updateContactById(this.userToEdit._id, contact).subscribe(res => {
      this.contactService.getContacts().subscribe(contacts => {
        this.friendsSidebarService.changeCurrentContactList(contacts)
        this.notificationService.success('Contact has been updated successfully!')
      })
    }, err => {
      this.notificationService.warn('An error ocurred with the data!')
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

  deleteContact() {
    localStorage.setItem('userToDelete', this.userToEdit._id);
    const dialogRef = this.dialog.open(HomeEditDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notificationService.success('Contact has been deleted successfully!')
      setTimeout(() => {
        this.contactService.getContacts().subscribe(contacts => {
          this.friendsSidebarService.changeCurrentContactList(contacts)
          this.router.navigateByUrl('/home')
        })
      }, 500)
    });
  }

}
