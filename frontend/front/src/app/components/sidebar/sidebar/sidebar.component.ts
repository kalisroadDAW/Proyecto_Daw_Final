import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user: User
  public status: string;
  public identity: any 
  public token: string;
  public stats:any;
  public url: string;

  constructor(
    private _userService: UserService
  ) { 
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.stats = this._userService.getStats();
  }

  ngOnInit(): void {
  }

}
