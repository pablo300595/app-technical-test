import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeDetailService {
  actionBS: BehaviorSubject<any>;
  actionObs: Observable<any>;
  constructor() { 
    this.init()
  }

  init() {
    this.actionBS = new BehaviorSubject(localStorage.getItem('action'))

    this.actionObs = this.actionBS.asObservable()
  }

  changeActionBS(data) {
    localStorage.setItem('action', data)
    this.actionBS.next(data)
  }
}
