import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ListuserService } from './listuser.service';
import { Router , ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import {AbstractControl} from '@angular/forms' ;
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

 private  titleAlert = 'You need to specify at least 3 characters' ;
  Form;
  nameExiste:string;
  id: Number;
  name:string;
  sub:any;
  constructor(private listuserservice: ListuserService, private router: Router , private route: ActivatedRoute ) {
    
  }
    ngOnInit() {
      this.nameExiste='';
      this.sub = this.route.params.subscribe(params => {
        this.name = params['name'];
      });
   
//     this.Form.get('validate').valueChanges.subscribe(
//       (validate) => {
//  if (validate === 1 ) {
// this.Form.get('name').setValidators([Validators.required, Validators.minLength(3)]);
//                    this.titleAlert = 'You need to specify at least 3 characters';
//                }
//                this.Form.updateValueAndValidity();
//            });
this.Form = new FormGroup ({
  name: new FormControl('' , Validators.compose([Validators.required ])),
  salary: new FormControl(),
  teamName: new FormControl(),
  validate: new FormControl()
});  


if (this.name) { //edit form
  this.listuserservice.findByName(this.name).subscribe(
    user => {
        this.id = user.id;
        this.Form.patchValue({
        name: user.name,
       
        teamName: user.teamName,
         salary: user.salary,
      });
     },error => {
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

  ValidateName(control: AbstractControl) {
    if(!this.listuserservice.findByName(control.value))
    { 
       return { validName: true };
    }
    return null;
  }

  onSubmit() {
    if (this.Form.valid) {
      
      if (this.name)
      {
        if(!this.listuserservice.findByName(this.Form.controls['name'])||this.Form.controls['name']==this.name)
        {
        let user: User = new User(this.id,
          this.Form.controls['name'].value,
          this.Form.controls['salary'].value,
          this.Form.controls['teamName'].value);
          this.listuserservice.createUser(user).subscribe(user => { this.router.navigate(['/']); });
        }
        else {
        this.nameExiste="Name already exist !"
       }
      }
       else{
        if(!this.listuserservice.findByName( this.Form.controls['name']))
        {
        let user: User = new User(null,
          this.Form.controls['name'].value,
          this.Form.controls['salary'].value,
          this.Form.controls['teamName'].value);
        this.listuserservice.createUser(user).subscribe(user => { this.router.navigate(['/']); });
       }
       else {
        this.nameExiste="Name already exist !"
       }
      }
      
      }
      
      this.Form.reset();
}}
