import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css'],
  
})
export class PageLoginComponent implements OnInit {

  public user: User
  public status: string;
  public identity: any 
  public token: string;
  public userLogged:boolean;


  constructor(
    private _userService: UserService,
    private _router: Router,
    
  ) { 
    this.user =new User('','','','','','','ROLE_USER','');
    
    
  }
  

  ngOnInit(): void {
  }

  onSubmit() {
    //LOGUEAR AL USUARIO Y CONSEGUIR SUS DATOS
    this._userService.login(this.user, null).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity);
        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          console.log('id-> '+this.identity._id);
          
          // PERSISTIR DATOS
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //CONSEGUIR EL TOKEN
          this.getToken();
            //CONSEGUIR LOS STATS
          this.getCounters();

          //userLogged
          
          
        
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
 
  }
 
  getToken() {
    this._userService.login(this.user, 'true').subscribe(
      response => {
        this.token = response.token;
        console.log(this.token);
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          
          // PERSISTIR DATOS
          localStorage.setItem('token', JSON.stringify(this.token));
          
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  getCounters(){
    this._userService.getCounters().subscribe(
      response => {
        console.log(response);
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

 
  

}