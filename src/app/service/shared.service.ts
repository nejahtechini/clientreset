import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../model/user';
import { Observable } from 'rxjs/Rx';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Http, Headers, Response } from '@angular/http';
@Injectable()
export class SharedService {
  private user: User;
  public newuserSubject = new Subject<User>();
  constructor(private http: Http) { }
  addNewLine(user) {
    this.newuserSubject.next(user);
  }


  setter(user: User) {
    this.user = user;
  }
  getter() {
    return this.user;
  }


  createUser( user: User): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(user);
    return this.http.post('http://localhost:8081/rest/users/load', user, options).map((res: Response) => res.json())
    .catch((error: any) => Observable.throw('Error'));
}
}
