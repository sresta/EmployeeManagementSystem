import { Component, OnInit } from '@angular/core';
import { UserService, AuthorizedUser } from 'src/app/users/user.service';
import { Globals } from 'src/app/global/global';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;
  authorizedUser: AuthorizedUser = { Email: '' };

  constructor(public userService: UserService,
    public global: Globals) { }

  ngOnInit() {
    this.userService.authorizedUser$.subscribe((authorizedUser: AuthorizedUser) => {
      this.authorizedUser = authorizedUser;
    });
    if (localStorage.getItem('token')) {
      this.authorizedUser = {
        Email: this.userService.getAuthorizedUserEmail()
      };
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
