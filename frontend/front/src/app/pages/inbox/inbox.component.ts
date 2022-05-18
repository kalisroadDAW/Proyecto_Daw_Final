import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from 'src/app/models/messageModel';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public title: string;
  public message: Message;
  public identity: any;
  public token: any;
  public url: string;
  public status: any;
  public follows: any;
  public seguidores: any;
  public messages: any;
  public next_page: any;
  public prev_page: any;
  public pages: any;
  public page: any;
  public total: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessagesService,
    private _userService: UserService,
    private _followService: FollowService,


  ) {

    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.message = new Message('', '', '', '', 'identity._id', '');
  }


  ngOnInit(): void {
    this.getMyFollows();
    this.actualPage();
  }

  onSubmit() {
    this._messageService.addMessage(this.token, this.message).subscribe(
      response => {
        if (response.message) {
          this.status = 'success';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
        console.log(this.message);
      }
    );
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;

      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }


      }

      // devolver listado de usuarios
      this.getMyMessages(this.token, this.page);


    });
  }



  getMyFollows() {
    this._followService.getMyFollows(this.token).subscribe(
      response => {
        this.follows = response.follows;


      },
      error => {
        console.log(<any>error);
      }
    );
  }

  

  getMyMessages(page: any, token: any){
    this._messageService.getMyMessages(this.token, this.page).subscribe(
      response => {
        if (response.messages) {
          this.messages = response.messages;
          console.log(this.messages);
          this.total = response.total;
          this.pages = response.pages;


        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  }








