import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../model/user';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SharedService {
  public newuserSubject = new Subject<User>();
  constructor() { }
  addNewLine(user) {
    this.newuserSubject.next(user);
  }
}
