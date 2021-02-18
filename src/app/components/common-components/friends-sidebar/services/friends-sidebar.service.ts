import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsSidebarService {
  userToEditBS: BehaviorSubject<any>;
  userToEditObs: Observable<any>;
  constructor() {
    this.init()
  }

  init() {
    this.userToEditBS = new BehaviorSubject({})

    this.userToEditObs = this.userToEditBS.asObservable()
  }

  changeUserToEditBS(data) {
    this.userToEditBS.next(data)
  }
}
