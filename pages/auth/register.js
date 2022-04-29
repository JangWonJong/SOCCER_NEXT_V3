import { Register } from "@/components/auth/Register"
import { registerRequest, unregisterRequest } from "@/modules/auth/register"
import { connect } from "react-redux"
import React,{useState} from 'react'
import { useDispatch } from "react-redux"

const RegisterPage =()=> {
    const [user, setUser] =useState({
        userid:'', password:'', email:'', name:'', phone:'', birth:'', address:''
    })
    const dispatch = useDispatch()
    const onSubmit = e => {
        e.preventDefault()
        alert('userinfo' +JSON.stringify(user))
        dispatch(registerRequest(user))
    }
    const onChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setUser({...user,[name]: value})
    }
    return(
        <Register onChange={onChange} onSubmit={onSubmit}/>
    )
}

const mapStateToProps = state => ({isRegistered: state.register.isRegistered})
const registerActions = {registerRequest, unregisterRequest}
export default connect(mapStateToProps, registerActions)(RegisterPage)