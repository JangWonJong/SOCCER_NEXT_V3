import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from 'next-redux-wrapper';
import axios from 'axios';

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}

const initialState = {
    isRegistered: false
}

const REGISTER_REQUEST = 'auth/REGISTER_REQUEST'
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'
const UNREGISTER_REQUEST = 'auth/UNREGISTER_REQUEST'
const UNREGISTER_SUCCESS = 'auth/UNREGISTER_SUCCESS'
const UNREGISTER_FAILURE = 'auth/UNREGISTER_FAILURE'

export const registerRequest = createAction(REGISTER_REQUEST, data => data)
export const unregisterRequest = createAction(UNREGISTER_REQUEST, data => data)

export function* registerSaga() {
    yield takeLatest(REGISTER_REQUEST, signup)
    yield takeLatest(UNREGISTER_REQUEST, membershipWithdrawal)
}

function* signup(action) {
    try {
        console.log('핵심' + JSON.stringify(action))
        const response = yield call(registerApi, action.payload)
        console.log('서버 다녀옴 ' + JSON.stringify(response.data))
        yield put({type: REGISTER_SUCCESS, payload: response.data})
        yield put(window.location.href = './login')
    } catch (error) {
        yield put({type: REGISTER_FAILURE, payload: error.message})
    }
    console.log('Recent Value')
}
const registerApi = payload => axios.post(
    `${SERVER}/user/join`,
    payload,
    {headers}
)

function* membershipWithdrawal() {
    try {
        console.log('회원 탈퇴')

    } catch (error) {}

}
const register = handleActions({
    [HYDRATE]: (state, action) => {
        ({
            ...state,
            ...action.payload
        })
    }
}, initialState)

export default register
/** handleActins를 사용하기 전 학습용 백업
const auth = (state = initialState, action) => {
    switch(action.type){
        case HYDRATE:
            console.log('HTDRATE Issue 발생')
            return {...state, ...action.payload}

        case REGISTER_SUCCESS:
            console.log(' 회원가입 성공 ' + action.payload)
            return {...state, user: action.payload}

        case REGISTER_FAILURE:
                console.log(' 회원가입 실패 ' + action.payload)
                return {...state, user: action.payload}

        default:
            return state
    }
}
 */
