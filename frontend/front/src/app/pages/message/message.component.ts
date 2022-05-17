
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
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public title: string; 
  public message: Message;
  public identity:any;
  public token:any;
  public url: string;
  public status: any;
  public follows:Follow[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessagesService,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.message = new Message('', '', '', '', 'identity._id', '');
  }


  ngOnInit(): void {
    this.getMyFollows();
  }

  onSubmit(){

  }

  getMyFollows(){
    this._followService.getMyFollows(this.token).subscribe(
         response =>{
             this.follows=response.follows;
              console.log(this.follows);
         },
         error =>{
             console.log(<any>error);
         }
    );
        }


}
