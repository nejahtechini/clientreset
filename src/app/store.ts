import { Product } from './model/product';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, REMOVE_ALL_TODOS , SET_ALL_TODO , GET_ALL_TODO} from './actions';
import { User } from './model/user';
import { IntUser } from './model/intuser';



export interface IAppState {
    todos: Product[];
    Intusers: IntUser[];
    lastUpdate: Date;
}
export const INITIAL_STATE: IAppState = {
    todos: [],
    Intusers: [],
    lastUpdate: null
}
export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_TODO:
        console.log(action.todo + 'add');
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                lastUpdate: new Date()
            });
            case SET_ALL_TODO:
            console.log(action.payload.data[0].name + 'set');
            return Object.assign({}, state, { Intusers : action.payload.data });
            case GET_ALL_TODO:
            console.log(state.Intusers[0].name + 'get');
    }
    return state;
}
