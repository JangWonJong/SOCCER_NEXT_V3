import { createAction, handleActions } from 'redux-actions';
import { call, delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}

const initialState = {
    loginUser: null,
    loginError: null,
    isLoggined: false
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED'
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST'
const SAVE_TOKEN = 'auth/SAVE_TOKEN'
const DELETE_TOKEN = 'auth/DELETE_TOKEN'

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const logincancelled =createAction(LOGIN_CANCELLED, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, data => data)

export function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, login)
    yield takeLatest(LOGIN_CANCELLED, canceled)
    yield takeLatest(LOGOUT_REQUEST, logout)
}
const loginApi = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)
function* login(action){
    try {
        console.log('핵심' + JSON.stringify(action))
        const response = yield call(loginApi, action.payload)
        console.log('서버 다녀옴 ' + JSON.stringify(response.data))
        yield put({type: LOGIN_SUCCESS, payload: response.data})
        yield put(window.location.href = '/')
    } catch (error) {
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
    console.log('Recent Value')
}

function* canceled(){
    try {
        console.log('로그인 취소')
    } catch (error) {
    }
}

const logoutApi = payload => axios.post(
    `${SERVER}/user/logout`,
    payload,
    {headers}
)
function* logout(){
    try {
        const response = yield call(logoutApi, action.payload)
        yield put({type: LOGOUT_REQUEST, payload: response.data})
        yield put(window.location.href = '/')
    } catch (error) {
    }
}

const userLogin = handleActions({
    [HYDRATE]: (state, action)=>({
        ...state,
        ...action.payload
    })
}, initialState)

export default userLogin