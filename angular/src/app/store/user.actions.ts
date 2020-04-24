import { Action } from '@ngrx/store';
import { USER } from 'src/app/definitions';

export const UserActions = {
    USER_LOGIN: 'USER_LOGIN'
}

export class UserLogin implements Action {
    readonly type = UserActions.USER_LOGIN;
    constructor(public payload: USER) {}
}