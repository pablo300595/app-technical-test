import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { HomeDetailService } from './services/home-detail.service';
import { ContactService } from './../../common-services/contact/contact.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.sass']
})
export class HomeDetailComponent implements OnInit {
  phoneNumberList = [{type: 'mobile', value: ''}]
  action: string
  isFavorite: boolean
  politeSectionForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl('male'),
    martial: new FormControl('unmarried'),
    favorite: new FormControl(false)
  })
  constructor(private fb: FormBuilder, private homeDetailService: HomeDetailService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.addFormControl(0)
    this.isFavorite = false
    this.homeDetailService.actionObs.subscribe(res => {
      if(res !== null) this.action = res
      else {
        this.action = 'create'
        this.homeDetailService.changeActionBS('create')
      }
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

  saveContact() {
    let contact = {
      first_name: this.politeSectionForm.controls['firstName'].value,
      last_name: this.politeSectionForm.controls['lastName'].value,
      gender: this.politeSectionForm.controls['gender'].value,
      martial: this.politeSectionForm.controls['martial'].value,
      favorite: this.isFavorite,
      contact: this.getPhoneArray()
    }
    console.log(this.action)
    console.log(contact)
    this.contactService.createContact(contact).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
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

    const secondFilteredPhoneList = firstFilteredPhoneList.map((item) => {
      return item[1].value
    })

    const secondFilteredPhoneTypeList = firstFilteredPhonetypeList.map((item) => {
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
