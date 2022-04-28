import { Register } from "@/components/auth/Register"
import { userRegister } from "@/modules/auth/user"
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
        dispatch(userRegister(user))
        window.location.href = './login'
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

export default connect(
    state => ({
        user: state.user
        
    }),
    {
        userRegister
    }
)(RegisterPage)