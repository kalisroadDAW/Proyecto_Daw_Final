import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { Follow } from 'src/app/models/follow';
import { FollowService } from 'src/app/services/follow.service';
import { PublicationService } from 'src/app/services/publication.service';



@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  public identity: any;
  public token: string;
  public page: any;
  public next_page: any;
  public prev_page: any;
  public pages: any;
  public total: any;
  public status: string;
  public url: string;
  public follows: any;
  public publications: any;
  public items_per_page: number;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _publicationService: PublicationService
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.page=1;
  }

  ngOnInit(): void {
   
    this.getPublications(this.page);
    
  }

  



  public followUserOver: any;
  mouseEnter(user_id: any) {
    this.followUserOver = user_id;
  }

  mouseLeave(user_id: any) {
    this.followUserOver = 0;

  }

  followUser(followed: any) {
    let follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if (!response.follow) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followed);

        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';

        }



      }
    );
  }

  unfollowUser(followed: any) {
    this._followService.deleteFolow(this.token, followed).subscribe(
      response => {
        let search = this.follows.indexOf(followed);
        if (search != -1) {
          this.follows.splice(search, 1);

        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';

        }
      }
    )
  }

  getPublications(page: any, adding=false) {
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        
        if (response.publications) {
          this.publications = response.publications;
          this.total = response.total_items;
          this.pages = response.pages;
          this.status = 'success';
          this.items_per_page = response.items_per_page;

          if (!adding) {
            this.publications = response.publications;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);
            

         



          }
          console.log(response);
          if (page > this.pages) {
            this._router.navigate(['/home']);

          }
        } else {
          this.status = 'error';
       
        }
      }, error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';

        }
      }
    )

  }

  public noMore = false;

  viewMore(){
   if(this.publications.length == this.total){
     
     this.noMore=true;
     
   }else{
    this.page+=1;

   }
   this.getPublications(this.page,true);
  }

  


}
