import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListuserComponent } from './components/userform/listuser/listuser.component';
import { UserService } from './components/userform/userform.service';
import { UserformComponent } from './components/userform/userform.component';
import {HttpModule} from '@angular/http';
import {FormsModule , ReactiveFormsModule , FormControl} from '@angular/forms' ;
import { ListuserService} from './components/userform/listuser/listuser.service';
import {SharedService} from './service/shared.service';
import { SearchuserComponent } from './components/editsearch/searchuser/searchuser.component';
import { HeaderComponent } from './components/header/header.component';


const appRoutes: Routes = [
  // {path: 'op', component: ListuserComponent},
  {path: '' , component: UserformComponent},
  {path: 'create', component: ListuserComponent},
  {path: 'edit', component: SearchuserComponent} ,
  {path: 'recherche', component: SearchuserComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ListuserComponent,
    UserformComponent,
    SearchuserComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService , ListuserService , SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
