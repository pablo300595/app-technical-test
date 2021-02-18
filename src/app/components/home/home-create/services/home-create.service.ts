import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeCreateService {
  actionBS: BehaviorSubject<any>
  actionObs: Observable<any>

  firstNameBS: BehaviorSubject<any>
  firstNameObs: Observable<any>

  constructor() { 
    this.init()
  }

  init() {
    this.actionBS = new BehaviorSubject(localStorage.getItem('action'))
    this.actionObs = this.actionBS.asObservable()

    this.firstNameBS = new BehaviorSubject('')
    this.firstNameObs = this.firstNameBS.asObservable()
  }

  changeActionBS(data) {
    localStorage.setItem('action', data)
    this.actionBS.next(data)
  }

  changeContactBs(data) {
    this.firstNameBS.next(data)
  }
}
