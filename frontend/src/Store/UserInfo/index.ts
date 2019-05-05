import { Reducer } from 'redux';

import { createAction, IAction } from '../actions';

export enum USER_ACTIONS {
    SET_USER_INFO = "USER_STORE_SET_USER_INFO",
    LOGIN = "USER_STORE_LOGIN",
    LOGOUT = "USER_STORE_LOGOUT"
}

export const setUserInfoAction = createAction<IUserStore>(USER_ACTIONS.SET_USER_INFO);
export const loginAction = createAction<IAuthData>(USER_ACTIONS.LOGIN);
export const logoutAction = createAction(USER_ACTIONS.LOGOUT);

export interface IAuthData {
    login: string,
    password: string
}

export interface IUserStore {
    token?: string,
    login?: string
}

export const userReducer: Reducer<IUserStore, IAction> = (state = {}, { type, payload }): IUserStore => {
    switch(type) {
        case USER_ACTIONS.SET_USER_INFO:
            return {
                ...state,
                ...payload
            }

        case USER_ACTIONS.LOGOUT:
            localStorage.removeItem("porno-fullstack-user");
            return {}

        default:
            return state
    }
}