import React from 'react'
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {login} from "../redux/auth/Action"
import { userIsLoggedIn } from '../redux/auth/Action';

function Login({changetosignup}) {
const navigate=useNavigate();
    const [user,setUser]=useState({});
    const dispatch=useDispatch();
    function getList(e){
      let {name,value}=e;
      setUser({...user,[name]:value});
    }
    const data = useSelector((e) => {
      return e.reducer
    })
     function loginUser(e){
        e.preventDefault()
     login(user,dispatch)
    // nevigate('/')
    }

    useEffect(() => {
      if (data.token) {
        navigate('/')
      }
      if (!data.token) {
        navigate("/auth")
      }
    }, [data.token])

  return (
    <>
    <div className=" w-2/5">
    <div>
      <h1 className="font-bold text-3xl ">Sign In</h1>
    </div>
    <div>
      <p className="text-sm mt-1 font-medium">
        Sign in to your account.
      </p>
    </div>
    <div className="flex justify-between mb-4 mt-4 ">
    </div>
    <div className="bg-white flex-column justify-center items-center text-sm rounded-xl w-full">
    <form className="p-5 flex-column font-medium w-full ">
      <p className="mb-1">Email address</p>
      <input type="email" placeholder="Enter your email" className="border-none bg-gray-200 p-1 rounded-xl mb-3 w-full " 
      autoComplete="off" name="email" onChange={(e)=>getList(e.target)}/>
      <p className="mb-1">Password</p>
      <input type="password" placeholder="Enter your password" className="border-none bg-gray-200 p-1 rounded-xl mb-5 w-full " 
      autoComplete="off" name="password" onChange={(e)=>getList(e.target)}/>
      <p className="text-sky-700 font-bold cursor-pointer">Forgot password ?</p>
      <button className="bg-black text-white p-1.5 w-full rounded-xl font-bold mt-4 cursor-pointer" onClick={loginUser}>Sign In</button>
    </form>
    </div>
      <p className="mt-4">Don't have an account ? <span className="text-sky-700 font-medium cursor-pointer" onClick={()=>changetosignup()} >Regiter here</span> .</p>
    </div>
    </>
  )
}

export default Login