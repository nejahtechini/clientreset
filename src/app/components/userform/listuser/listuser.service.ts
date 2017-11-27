import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { User } from '../../../model/user';

@Injectable()
export class ListuserService {
private user: User ;
private apiUrl: 'http://localhost:8081/rest/users';

  constructor(private http: Http) { }


  // setter(user: User ) {
  //   this.user = user;
  //   }
  //   getter() {
  //   return this.user ;
  //   }
  createUser( user: User): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(user);
    return this.http.post('http://localhost:8081/rest/users/load', user, options).map((res: Response) => res.json())
    .catch((error: any) => Observable.throw('Error'));
}


updateUser( user: User) {
  return this.http.put('http://localhost:8081/rest/users/load', JSON.stringify(user)).map((res) => {
      return res.json();
  });
}
findById(id: Number): Observable<User> {
  return this.http.get('http://localhost:8081/rest/users/id/' + id)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw( 'Error'));
}
findByName(name: string): Observable<User> {
  return this.http.get('http://localhost:8081/rest/users/name/' + name)
  .map((res: Response) => res.json()) ;
}
}
