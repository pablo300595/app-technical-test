import { Component, OnInit } from '@angular/core';
import { HomeDetailService } from './../../home/home-detail/services/home-detail.service';

@Component({
  selector: 'app-friends-sidebar',
  templateUrl: './friends-sidebar.component.html',
  styleUrls: ['./friends-sidebar.component.sass']
})
export class FriendsSidebarComponent implements OnInit {
  action: string
  constructor(private homeDetailService: HomeDetailService) { }

  ngOnInit(): void {
    this.homeDetailService.actionObs.subscribe(res => this.action = res)
  }

  goToCreateView() {
    this.homeDetailService.changeActionBS('create')
  }

  goToEditView() {
    this.homeDetailService.changeActionBS('edit')
  }

}
