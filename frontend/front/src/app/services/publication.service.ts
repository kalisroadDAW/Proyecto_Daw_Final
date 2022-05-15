import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  public url: string;
  public page:number;

  constructor(
    private _http: HttpClient,

  ) {
    this.url = GLOBAL.url;
   }

  addPublication(token:string, publication: Publication): Observable<any> {
    let params = JSON.stringify(publication);
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    return this._http.post(this.url + '/save-publication', params, { headers:headers });
  }

  getPublications(token:string, page=null): Observable<any> {

  

    let headers = new HttpHeaders().set('Content-Type', 'application/json') .set('Authorization', token);


    return this._http.get(this.url + '/publications/' + page, { headers:headers });
  }

  deletePublication(token:string, id:number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json') .set('Authorization', token);

    return this._http.delete(this.url + '/delete-publication/' + id, { headers:headers });

  }

  getPublicationsUser(token:string, user_id:any, page=null): Observable<any> {

  

    let headers = new HttpHeaders().set('Content-Type', 'application/json') .set('Authorization', token);


    return this._http.get(this.url + '/publications-user/'+user_id +'/'+ page, { headers:headers });
  }


 
}
