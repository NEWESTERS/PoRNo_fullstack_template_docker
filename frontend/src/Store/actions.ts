import { Action } from 'redux';

export interface IAction<T = any> extends Action<string> {
    payload: T
}

export const createAction = <T>(type: string) => (payload: T): IAction<T> => ({ type, payload })