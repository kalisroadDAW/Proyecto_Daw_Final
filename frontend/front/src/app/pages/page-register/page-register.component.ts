import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  public user: User;
  public status: string | undefined;

  constructor(
    private _userService: UserService
    
  ) { 
    this.user = new User('','','','','','','ROLE_USER','');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          console.log(response.user);
          this.status = 'success';

        }else{
          this.status = 'error';
        }

      },
      error => {
        console.log("h");
        var errorMessage= <any>error;
        if(errorMessage != null){
          this.status = 'error'
        }
        console.log("h");

      }
    );
  }

}
