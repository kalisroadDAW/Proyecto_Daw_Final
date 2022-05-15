import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { Follow } from 'src/app/models/follow';
import { FollowService } from 'src/app/services/follow.service';
import { User } from 'src/app/models/user';
import { UploadService } from 'src/app/services/upload.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public status: string;
  public identity: any;
  public token: string;
  public stats: any;
  public url: string;
  public follow: Follow;
  public followed:any;
  public following:any;

  ngOnInit() {
    console.log('profile.component cargado correctamente!!');
    this.loadPage();
  }


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _followService: FollowService,
    private _uploadService: UploadService
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.user = this.loadPage();
    this.follow = new Follow('', this.identity._id, '');
    this.followed = false;
    this.following = false;
  }



  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    });
  }
  getUser(id: any) {
    this._userService.getUser(id).subscribe(
      response => {
        if (response.user) {
          console.log(response);
          this.user = response.user;
          if(response.following &&response.following._id){
            this.following = true;
          }else{
            this.following = false;
          }
          if(response.followed && response.followed._id){
            this.followed = true;
          }else{
            this.followed = false;
          }
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this._router.navigate(['/user', this.identity._id]);
      }
    );
  }

  getCounters(id: any) {
    this._userService.getCounters(id).subscribe(
      response => {
        console.log(response);
        this.stats = response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  followUser(followed: any) {
    var follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        this.following = true;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  unfollowUser(followed: any) {
    this._followService.deleteFolow(this.token, followed).subscribe(
      response => {
        this.following = false;
      }, error => {
        console.log(<any>error);
      }
    );
  }


}

