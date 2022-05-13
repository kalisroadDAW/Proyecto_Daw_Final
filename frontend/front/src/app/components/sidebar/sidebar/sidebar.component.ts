import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Form } from '@angular/forms';

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
  public form: Form

  constructor(
    private _userService: UserService, private _publicationService: PublicationService
  ) { 
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = GLOBAL.url;
    this.stats = JSON.parse(this._userService.getStats());
    this.publication = new Publication('','','','','this.identity._id',);
    
    
  
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if(response.publication){
          this.status = 'success';
          this.publication = response.publication;
          console.log(response.publication);
          
      }
      else{
        this.status = 'error';

      }
      (error: any) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';

        }
      }
    });

  }


  ngDoCheck(){
    this.stats = JSON.parse(this._userService.getStats());
}

}
