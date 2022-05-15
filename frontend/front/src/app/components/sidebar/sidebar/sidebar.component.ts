import { Component, OnInit, EventEmitter, Input ,Output} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Form } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

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
    private _userService: UserService,
     private _publicationService: PublicationService,
      private _route: ActivatedRoute,
      private _router: Router,
      private _uploadService: UploadService
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
          console.log(response.publication._id);
          

          //subir imagen
          this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id,[],this.filesToUpload,this.token,'file')
          .then((result:any)=>{
            this.publication.file = result.image;
            console.log(result.image);
            this.status = 'success';
          this.publication = response.publication;
          console.log(response.publication);
          this._router.navigate(['/timeline']);
          }
          )
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }


  ngDoCheck(){
    this.stats = JSON.parse(this._userService.getStats());
}

@Output() sended = new EventEmitter();
  sendPublication(event:any){
    this.sended.emit({sent:'true'});

  }

}
