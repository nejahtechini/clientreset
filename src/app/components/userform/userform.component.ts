import { Component, OnInit } from '@angular/core';
import { UserService } from './userform.service';
import { ListuserService } from './listuser/listuser.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  message: string;
  users: Array<User>;
  user: User;
  private timerSubscription: AnonymousSubscription;
  private usersSubscription: AnonymousSubscription;

  constructor(private userService: UserService, private router: Router, private listUserService: ListuserService
    , private sharedService: SharedService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      }
    );
    // this.sharedService.newuserSubject.subscribe(data => this.users = [data, ...this.users]);
    // this.sharedService.newuserSubject.subscribe(data => {this.users.push(data); });
    //this.subscribeToData(); //to call subscribe every time.

  }
  deleteUser(user) {
    console.log(user.id + user.name);
    this.userService.deleteUser(user.id).subscribe(
      data => {
        this.users.splice(this.users.indexOf(user), 1);
      }
    );
    console.log('Delete User');
  }

  // <premier version update and save on utilisant les getters et les setters getter() et setter user>
  // debut
  //   updateUser(user) {
  //     this.listUserService.setter(user);
  //     this.router.navigate(['/op']);
  //   }
  // newUser() {
  //  this.user = new User();
  //  this.listUserService.setter(this.user);
  //     this.router.navigate(['/op']);
  //   }
  // fin
  redirectNewUserPage() {
    this.router.navigate(['create']);
  }
  editUserPage(user: User) {
    if (user) {
      this.sharedService.addNewLine(user);
      this.router.navigate(['edit']);
    }
  }

  pushUser(user: User) {
    this.users.push(user);
    this.sendNameUser(user);
  }
  sendNameUser(user: User) {
    this.message = 'Welcame' + '   ' + user.name + '   !!!!';
  }
}

