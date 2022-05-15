import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models';
import { ActivatedRoute, Router, Params, } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-page-users',
  templateUrl: './page-users.component.html',
  styleUrls: ['./page-users.component.css']
})
export class PageUsersComponent implements OnInit {
  public users: User[];
  public identity:any;
  public token:string;
  public page: number;
  public next_page: any;
  public prev_page: any;
  public pages: any;
  public total:any;
  public status: string;
  public url: string;
  public follows: any;
  
  
  constructor(
    private _userService: UserService, 
    private _route: ActivatedRoute,
     private _router: Router, 
     private _followService: FollowService
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if(!params['page']){
        page = 1;
      }

      if(!page){
        page = 1;

      }else{  
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page <= 0){
          this.prev_page = 1;
        }


      }

      // devolver listado de usuarios
      this.getUsers(page);


    });
  }

  getUsers(page: any){
    this._userService.getUsers(page).subscribe(
      response => {
        if(!response.users){
          this.status = 'error';
        }else{
          this.status = 'success';
          console.log(response);
          this.users = response.users;
          this.total = response.total;
          this.pages = response.pages;
          this.follows= response.followed;
          console.log(this.follows);
          if(page>this.pages){
            this._router.navigate(['/users/', this.pages]);
          }


        }
      }, 
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        
        }
      }
    );
     


  }

  public followUserOver: any;
    mouseEnter(user_id: any){
      this.followUserOver = user_id;
    }

    mouseLeave(user_id: any){
      this.followUserOver = 0;

    }

    followUser(followed: any){
      let follow = new Follow('', this.identity._id, followed);
      this._followService.addFollow(this.token, follow).subscribe(
        response => {
          if(!response.follow){
            this.status = 'error';
          }else{
            this.status = 'success';
            this.follows.push(followed);

          }
        },error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage != null){
            this.status = 'error';
  
          }
       
         
      
      }
      );
    }

    unfollowUser(followed: any){
      this._followService.deleteFolow(this.token, followed).subscribe(
        response => {
          let search = this.follows.indexOf(followed);
          if(search != -1){
            this.follows.splice(search, 1);

          }
        },error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage != null){
            this.status = 'error';
            
          }
        }
      )
    }
 

}
