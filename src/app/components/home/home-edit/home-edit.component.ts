import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsSidebarService } from './../../common-components/friends-sidebar/services/friends-sidebar.service';

@Component({
  selector: 'app-home-edit',
  templateUrl: './home-edit.component.html',
  styleUrls: ['./home-edit.component.sass']
})
export class HomeEditComponent implements OnInit {
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
  constructor(private fb: FormBuilder, private friendsSidebarService: FriendsSidebarService, private router: Router) { }

  ngOnInit(): void {
    this.friendsSidebarService.userToEditObs.subscribe(res => {
      this.userToEdit = res
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
    })
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

  updateContact() {}

  changeFavoriteStatus() {
    this.isFavorite = !this.isFavorite
  }

}
