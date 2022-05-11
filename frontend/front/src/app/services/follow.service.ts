import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Follow } from '../models/follow';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public url:string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

  addFollow(token:string , follow:any):Observable<any>{
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' ).set( 'Authorization', token );
    return this._http.post(this.url+'follow', params, {headers: headers});

  }
  deleteFolow(token:string , id:number):Observable<any>{
    
    let headers = new HttpHeaders().set( 'Content-Type', 'application/json' ).set( 'Authorization', token );
    return this._http.delete(this.url+'unfollow/'+id, {headers: headers});

  }
}
