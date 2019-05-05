import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { IAction } from '../actions';
import { USER_ACTIONS } from '.';
import { AUTH_URLS } from '../../configs/urls';

export default {
    *dispatchAsync() {
        yield takeEvery(USER_ACTIONS.LOGIN, login);
    }
}

function* login({ type, payload }: IAction) {
    try {
        const response = yield call(() => axios.post(AUTH_URLS.LOGIN, payload));

        yield put({ type: USER_ACTIONS.SET_USER_INFO, payload: response.data });
        localStorage.setItem("porno-fullstack-user", JSON.stringify(response.data));
    } catch(error) {
        console.error(error.message);
    }
}