import { UserAddress } from './../../../model/userAddress';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../service/shared.service';
import { User } from '../../../model/user';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListuserService } from '../../userform/listuser/listuser.service';
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
  constructor(private listuserService: ListuserService, private router: Router, private sharedService: SharedService) {
  }
  ngOnInit() {
    this.formEdit = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      salary: new FormControl(),
      teamName: new FormControl(),
      countryName: new FormControl()
    });
    this.init(this.formEdit);
  }
  init(form: FormGroup) {
    this.sharedService.newuserSubject.subscribe(data => {
      form.patchValue({
        name: data.name,
        teamName: data.teamName,
        salary: data.salary,
        countryName : data.userAddress.countryName
      });
    console.log('----------' + data.name);
    this.model = data;
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
