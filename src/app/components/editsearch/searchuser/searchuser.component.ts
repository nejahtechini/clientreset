import { UserAddress } from './../../../model/userAddress';
import { Router , ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../service/shared.service';
import { User } from '../../../model/user';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListuserService } from '../../userform/listuser/listuser.service';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {
  model: User;
  editName: string;
  formEdit: FormGroup;
  idUserEdit: Number;
  addressUserEdit: UserAddress;
  sub: any ;
  constructor(private listuserService: ListuserService, private router: Router, private sharedService: SharedService ,
    private route: ActivatedRoute) {
  }
  ngOnInit() {

    this.formEdit = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      salary: new FormControl(),
      teamName: new FormControl(),
      countryName: new FormControl()
    });
     this.route.url.subscribe( url => {
     if ( url[0].path === 'edit') {
      this.init(this.formEdit);
    }
     });

  }
  init(form: FormGroup) {
    this.model = this.sharedService.getter();
    this.idUserEdit =  this.model.id;
    if ( this.model.userAddress) {
      this.addressUserEdit =  this.model.userAddress;
    }
      form.patchValue({
        name:  this.model.name,
        teamName:  this.model.teamName,
        salary:  this.model.salary,
        countryName :  this.model.userAddress.countryName
      });
  }
  onKey(event: any) {

    this.editName = event.target.value;
    this.formEdit.reset();
    this.listuserService.findByName(this.editName).subscribe(userEdit => {
      this.idUserEdit = userEdit.id;
      if (userEdit.userAddress) {
        this.addressUserEdit = userEdit.userAddress;
      }
      this.formEdit.patchValue({
        name: userEdit.name,
        teamName: userEdit.teamName,
        salary: userEdit.salary,
        countryName: this.addressUserEdit.countryName,
      });
    });
  }
  onSubmit(value) {
    if (this.formEdit.valid) {
      this.addressUserEdit.countryName = value.countryName;
      const user: User = new User(value.name, value.teamName, value.salary, this.addressUserEdit, this.idUserEdit);
      this.listuserService.createUser(user).subscribe(response => { this.router.navigate(['/']); });
    }
  }
  redirectHome() {
    this.router.navigate(['/']);
  }
}
