import { Product } from './model/product';
import { GET_USER_PRODUCT ,TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS, SET_ALL_TODO, GET_ALL_TODO, ADD_PRODUCT } from './actions';
import { User } from './model/user';
import { IntUser } from './model/intuser';



export interface IAppState {
    todos: Product[];
    Intusers: User[];
    lastUpdate: Date;
    x: User;
}
export const INITIAL_STATE: IAppState = {
    todos: [],
    Intusers: [],
    lastUpdate: null,
    x:null
}
export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_PRODUCT:
       
        action.payload.productCourant.id=state.todos.length+1;
        console.log(action.payload.productCourant.id + 'add'); 
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.payload.productCourant)),
                lastUpdate: new Date(),
            });
            case SET_ALL_TODO:
            console.log(action.payload.data[0].name + 'set');
            return Object.assign({}, state, { Intusers : action.payload.data });
           case GET_USER_PRODUCT:
           return Object.assign({}, state, { todos : action.products});
            case GET_ALL_TODO:
            console.log(state.Intusers[0].name + 'get');
    }
    if(action.type==ADD_PRODUCT){
    console.log('lengueur'+state.todos.length );}
    return state;
}
