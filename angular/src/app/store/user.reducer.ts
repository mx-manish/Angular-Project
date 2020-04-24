// import { Action } from '@ngrx/store';
import { UserActions, UserLogin } from './user.actions';
// User Interface.
// export interface UserStore {

// }
const initialState = {
    user: (localStorage.getItem('user') && localStorage.getItem('user').length > 10) ? JSON.parse(localStorage.getItem('user')) : {}
};

// User store reducer.
export function userLoginReducer(state = initialState, action: UserLogin) {
    switch (action.type) {
        case UserActions.USER_LOGIN:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}