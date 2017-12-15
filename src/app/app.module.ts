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
import {Ng2PaginationModule} from 'ng2-pagination';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer , INITIAL_STATE} from './store';
import { ProductListComponent } from './components/product-list/product-list.component';
const appRoutes: Routes = [
  // {path: 'op', component: ListuserComponent},
  {path: '' , component: UserformComponent},
  {path: 'create', component: ListuserComponent},
  {path: 'edit', component: SearchuserComponent},
  {path: 'recherche', component: SearchuserComponent},
  {path: 'product', component: ProductListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ListuserComponent,
    UserformComponent,
    SearchuserComponent,
    HeaderComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes), Ng2PaginationModule , NgReduxModule
  ],
  providers: [UserService , ListuserService , SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { constructor(ngRedux: NgRedux<IAppState>) {
  ngRedux.configureStore(rootReducer, INITIAL_STATE);
}}
