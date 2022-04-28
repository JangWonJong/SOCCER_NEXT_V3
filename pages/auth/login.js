import { Login } from "@/components/auth/Login"
import { login } from "@/modules/auth/user"
import { connect } from "react-redux"
import React,{useState} from 'react'
import { useDispatch } from "react-redux"

const LoginPage =()=>{
    const [user, setUser] =useState({
        userid:'', password:''
    })
    const dispatch = useDispatch()
    const onChange = e =>{
        e.preventDefault()
        const{name, value} = e.target;
        setUser({...user,[name]: value})
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('userlogin'+JSON.stringify(user))
        window.location.href = '/'
    }
    
    return(
        <Login onSubmit={onSubmit} onChange={onChange}/>
    )
}

export default connect(
    state => ({
        user: state.user
        
    }),
    {
        login
    }
)(LoginPage)