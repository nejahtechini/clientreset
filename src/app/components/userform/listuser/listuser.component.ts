import { Component, OnInit, Output, EventEmitter , Input} from '@angular/core';
import { User } from '../../../model/user';
import { UserAddress } from '../../../model/userAddress';
import { ListuserService } from './listuser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Response } from '@angular/http/src/static_response';
import { SharedService } from '../../../service/shared.service' ;
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
@Output() notify: EventEmitter<User> = new EventEmitter();
@Input()  welcamMessage: string ;
  private titleAlert = 'You need to specify at least 3 characters';
  form: FormGroup;
  name: string;
  // sub: any;
  addrVaraible: UserAddress;
  constructor(private listuserservice: ListuserService, private router: Router,
    private route: ActivatedRoute, private sharedService: SharedService) {
  }
  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.name = params['name'];
    // console.log(this.name);
    // });

    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      salary: new FormControl(),
      teamName: new FormControl(),
      countryName: new FormControl()
    });
  }

  // onProcess() {
  //   this.listuserservice.createUser(this.user).subscribe(
  //     user => { this.router.navigate(['/']); }
  //   );
  // }
  onSubmit(value) {
    if (this.form.valid) {
      const useradd: UserAddress = new UserAddress(value.countryName);
      const user: User = new User(value.name, value.teamName, value.salary, useradd);
      this.listuserservice.createUser(user).subscribe(response => {
        this.router.navigate(['/']);
       // this.sharedService.addNewLine(response);
       this.notify.emit(response);
      });
      this.form.reset();
    }

  }
}



