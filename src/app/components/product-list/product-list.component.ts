import { IAppState } from './../../store';
import { Product } from './../../model/product';
import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';

import { ADD_PRODUCT,GET_USER_PRODUCT, REMOVE_TODO, TOGGLE_TODO } from '../../actions';

import { Observable } from 'rxjs/Observable';
import { User } from '../../model/User';
import { IntUser } from '../../model/intuser';
import { SharedService } from '../../service/shared.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @select() todos;
  @select( )  Intusers ;
x: User ;
  file : File; 
    model: Product = {
      id: 0,
      name : '',
      description: '',
      quantity: 0 ,
      image: null
    };
    constructor(private ngRedux: NgRedux<IAppState> , private sharedService: SharedService) {
    }
    ngOnInit() {

    
      
    }
    onSubmit() {
      
      this.ngRedux.dispatch({type: ADD_PRODUCT, payload: {
        productCourant:this.model 
       }});

       
       this.x.productList.push(this.model);
       this.sharedService.createUser(this.x).subscribe(response => {  
      console.log(this.x.productList.length);
      });
   
      
    }
    // toggleTodo(todo) {
    //   this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
    // }
    // removeTodo(todo) {
    //   this.ngRedux.dispatch({type: REMOVE_TODO, id: todo.id });
    // } 
    getFiles(event){ 
  console.log(    this.file = event.target.files[0]); 
  } 
    setListProduct(): void {
      if(!this.x.productList){
        this.x.productList=[] ;}
      this.ngRedux.dispatch({ type: GET_USER_PRODUCT, products: this.x.productList });
         console.log(this.todos[0]);
          } 
}
