import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models';
import { Publication } from 'src/app/models/publication';

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
  public followers:number;
  public publication:Publication;

  constructor(
    private _userService: UserService
  ) { 
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.stats = JSON.parse(this._userService.getStats());
    this.publication = new Publication('','','','','this.identity._id',);
    
  
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.publication);

  }


  ngDoCheck(){
    this.stats = JSON.parse(this._userService.getStats());
}

}
