import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions, Request, RequestMethod } from '@angular/http';

@Injectable()
export class UserService {
users= [];
  constructor(private http: Http) {}

  getUser() {
    return this.http.get('http://localhost:8081/rest/users/all').map((res) => {
        return res.json();
    });
}
deleteUser(id: number) {
  return this.http.delete('http://localhost:8081/rest/users/user/' + id).map((res) => {
      return res.json();
  });
}
}
