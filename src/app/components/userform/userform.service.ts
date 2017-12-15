import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { User } from '../../model/user';

@Injectable()
export class UserService {
    users = [];
    constructor(private http: Http) { }
    getUser(): Observable<User[]> {
        return this.http.get('http://localhost:8081/rest/users/allUser').map((res) => {
            return res.json();
        });
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete('http://localhost:8081/rest/users/user/' + id).map((res) => {
            return res.json();
        });
    }

    public getdata(page: Number, size: Number): any {
        return this.http.get('http://localhost:8081/rest/users/allPage?page=' + page + '&size=' + size)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error) || 'Server Error');
    }
}
