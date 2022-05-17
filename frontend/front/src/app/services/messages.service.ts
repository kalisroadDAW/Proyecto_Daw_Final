import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/messageModel';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  public url: string;

  constructor(
    private _http: HttpClient

  ) {
    this.url = GLOBAL.url;
  }

  addMessage(token: any, message: any): Observable<any> {
    let params = JSON.stringify(message);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.post(this.url + 'message', params, { headers: headers });
  }

  getMessages(token: any, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.get(this.url + 'my-messages/' + page, { headers: headers });
  }

  getEmmitMessages(token: any, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    return this._http.get(this.url + 'messages/' + page, { headers: headers });


  }

  
}
