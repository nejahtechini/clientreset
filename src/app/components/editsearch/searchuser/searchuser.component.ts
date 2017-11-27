import { UserAddress } from './../../../model/userAddress';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ListuserService } from '../../listuser/listuser.service';
import { User } from '../../../model/user';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {
  editName: string;
  formEdit: FormGroup;
  idUserEdit: Number;
  addressUserEdit: UserAddress ;
  constructor(private listuserService: ListuserService, private router: Router) { }

  ngOnInit() {
    console.log(this.editName);
    this.formEdit = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      salary: new FormControl(),
      teamName: new FormControl(),
      countryName: new FormControl()
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
    this.router.navigate(['/']); }
}
