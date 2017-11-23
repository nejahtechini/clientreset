import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserAddress } from '../../model/userAddress';
import { ListuserService } from './listuser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  private titleAlert = 'You need to specify at least 3 characters';
  form: FormGroup;
  id: Number;
  name: string;
  sub: any;
  addrVaraible: UserAddress;
  constructor(private listuserservice: ListuserService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      salary: new FormControl(),
      teamName: new FormControl(),
      countryName: new FormControl()
    });
    if (this.name) {
      this.listuserservice.findByName(this.name).subscribe(
        user => {
          this.id = user.id;
          if (user.userAddress) {
            this.addrVaraible = user.userAddress;
          }
          this.form.patchValue({
            name: user.name,
            teamName: user.teamName,
            salary: user.salary,
            countryName: this.addrVaraible.countryName,
          });
        }, error => {
          console.log(error);
        }
      );
    }

  }

  // onProcess() {
  //   this.listuserservice.createUser(this.user).subscribe(
  //     user => { this.router.navigate(['/']); }
  //   );
  // }
  onSubmit(value) {
    if (this.form.valid) {
      if (this.name) {
        this.addrVaraible.countryName = value.countryName;
        const user: User = new User(value.name, value.teamName, value.salary, this.addrVaraible, this.id);
        this.listuserservice.createUser(user).subscribe(response => { this.router.navigate(['/']); });
      } else {
        const useradd: UserAddress = new UserAddress(value.countryName);
        const user: User = new User(value.name, value.teamName, value.salary, useradd);
        this.listuserservice.createUser(user).subscribe(response => { this.router.navigate(['/']); });
      }
    }
    this.form.reset();
  }
}



