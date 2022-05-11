import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/models';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.css']
})
export class PageUserEditComponent implements OnInit {
  public title: string;
  public user: User;
  public identity: any;
  public token: string;
  public status: string;
  public url: string;
  


  constructor(private _userService: UserService, private _upload: UploadService) { 
    this.title = 'Editar usuario';
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.user = this.identity;
    this.url = GLOBAL.url;


    
  }

  ngOnInit(): void {
    console.log('user-edit.component.ts cargado');

  }

  onSubmit(){
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          //SUBIDA DEL AVATAR
          this._upload.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
          .then((result: any) => {
            this.user.image = result.user.image;
            localStorage.setItem('identity', JSON.stringify(this.user));
            

          });
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    
  }



}
