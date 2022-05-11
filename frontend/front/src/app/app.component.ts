import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'front';
  public identity: any;
  public url:string;
  public userLogged:boolean ;
  
  constructor(private _userService: UserService) { 
    this.url = GLOBAL.url;
    this._userService.userLogged.subscribe(value=>{
      this.userLogged = value;
    })
 
    

  }
  ngOnInit() {
    this.identity = this._userService.getidentity();
    this.checkUserLogged();

    

  }

  ngDoCheck() {
    this.identity = this._userService.getidentity();
    
  }

  logout(){
    this._userService.logout();
    this._userService.userLogged.next(false);

 
  }

  checkUserLogged(){
    if(localStorage.getItem('token')!=undefined){
      this._userService.userLogged.next(true);
    }
  }

  
  
}
