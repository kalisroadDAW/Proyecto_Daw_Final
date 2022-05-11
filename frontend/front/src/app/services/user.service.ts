import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string ;
  public identity: any;
  public token: any;
  public stats: any;
  


  constructor(
    private _http: HttpClient, 
    private _httpModule: HttpClientModule,
    private router: Router
  ) { 
    this.url = GLOBAL.url;
  }

  

  //create a register method for the

  register(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'register', params, {headers: headers});
  }

  //create a login method for the


  login(user:any,gettoken: string | null | undefined): Observable<any>{
    if(gettoken!='null'){
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'login',params, {headers:headers});
  }

  getidentity(){
    let storageIdentity = localStorage.getItem('identity');
    let identity = JSON.parse(storageIdentity || '{}');
    if(identity != undefined){
    this.identity = identity;
    }else{
    this.identity = null;
    }
    return this.identity;
    }

    gettoken(){
      let token = localStorage.getItem('token');
      if(token != undefined){
      this.token = token;
      }
      else{
      this.token = null;
      }
      return this.token;
    }

    logout(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity = null;
      this.token = null;
      
    }

    getStats(){
      let stats = localStorage.getItem('stats');
      if(stats != undefined){
      this.stats = stats;
      }
      else{
      this.stats = null;
      }
      return this.stats;
      
    }

    //dashboard
    getCounters(userId=null): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.gettoken());
      if(userId!=null){
        return this._http.get(this.url+'counters/'+userId, {headers: headers});
      }else{
        return this._http.get(this.url+'counters', {headers: headers});
      }

    }

    //update user
    updateUser(user: User): Observable<any>{
      let params = JSON.stringify(user);
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.gettoken());
      return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
    }

    getUsers(page=null):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.gettoken());
      return this._http.get(this.url+'users/'+page, {headers: headers});
    }




}
