import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../../actions';
import { Product } from '../../model/product';
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
  x: IntUser ;
    model: Product = {
      id: 0,
      name : '',
      description: '',
      quantity: 0 ,
      image: ''
    };
    constructor(private ngRedux: NgRedux<IAppState> , private sharedService: SharedService) {
    }
    ngOnInit() {

      console.log('AfichageComponent' + this.Intusers[0]);
    }
    onSubmit() {
      console.log('hiiii' + this.x);
      // this.sharedService.createUser(this.x).subscribe(response => {
   this.ngRedux.dispatch({type: ADD_TODO, todo: this.model});
      // });
    }
    toggleTodo(todo) {
      this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
    }
    removeTodo(todo) {
      this.ngRedux.dispatch({type: REMOVE_TODO, id: todo.id });
    } 



}
