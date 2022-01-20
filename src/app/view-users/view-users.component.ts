import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  public users: any;
  public searchText = "";
  constructor(public userService: UserService, public route: ActivatedRoute, router: Router) { }

  ngOnInit(): void {
    this.myServices();
  }

  myServices() {
    this.userService.getUsers().subscribe
      ((data) =>
        this.users = data)
  }
  Submit() {

  }
}
