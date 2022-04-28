//import { createAction, handleActions } from 'redux-actions';
import { call, delay, put, takeLatest, select, throttle } from 'redux-saga/effects';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}

const initialState = {
    user: {
        isLoggingIn: false,
        data: null
    
    }
}

const USER_REGISTER_REQUEST = 'auth/USER_REGISTER_REQUEST'
const USER_REGISTER_SUCCESS = 'auth/USER_REGISTER_SUCCESS'
const USER_REGISTER_FAILURE = 'auth/USER_REGISTER_FAIL'

export const userRegister = user => (
    {type: USER_REGISTER_REQUEST, payload: user}
)

function* watchUserRegister(){
    yield takeLatest(USER_REGISTER_REQUEST, userRegisterSaga)
}

function* userRegisterSaga(){
    try{
        const response = yield call(userRegisterApi) 
        yield put({type: USER_REGISTER_SUCCESS, payload: response.data})
    }catch(error){
        yield put({type: USER_REGISTER_FAILURE, payload: error.message})
    }
    console.log('Recent Value')
}

const userRegisterApi = payload => axios.post(
    `${SERVER}/user/join`,
            payload,
            {headers}
)



const auth = (state = initialState, action) => {
    switch(action.type){
        case HYDRATE:
            console.log('HTDRATE Issue 발생')
            return {...state, ...action.payload}
           
        case USER_REGISTER_SUCCESS:
            console.log(' 회원가입 성공 ' + action.payload)
            return {...state, user: action.payload}
            
        case USER_REGISTER_FAILURE:
                console.log(' 회원가입 실패 ' + action.payload)
                return {...state, user: action.payload}
            
        default:  
            return state
    }
}

export default auth