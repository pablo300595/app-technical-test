import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsSidebarService {
  userToEditBS: BehaviorSubject<any>;
  userToEditObs: Observable<any>;

  currentContactListBs: BehaviorSubject<any>;
  currentContactListObs: Observable<any>;
  constructor() {
    this.init()
  }

  init() {
    this.userToEditBS = new BehaviorSubject({})
    this.userToEditObs = this.userToEditBS.asObservable()

    this.currentContactListBs = new BehaviorSubject([])
    this.currentContactListObs = this.currentContactListBs.asObservable()
  }

  changeUserToEditBS(data) {
    this.userToEditBS.next(data)
  }

  changeCurrentContactList(data) {
    this.currentContactListBs.next(data)
  }
}
