import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from '../redux/auth/Action';

function Signup({changetologin}) {

    const [user,setUser]=useState({});
    const dispatch=useDispatch();
    function getList(e){
    let {name,value}=e;
    setUser({...user,[name]:value});
    }
    
    function submitform(e){
        e.preventDefault()
    signupUser(user,dispatch)
    }

  return (
    <>
    <div className=" w-2/5">
    <div>
      <h1 className="font-bold text-3xl ">Sign Up</h1>
    </div>
    <div>
      <p className="text-sm mt-1 font-medium">
        Create an account.
      </p>
    </div>
    <div className="flex justify-between mb-4 mt-4 ">
    </div>
    <div className="bg-white flex-column justify-center items-center text-sm rounded-xl w-full">
    <form className="p-5 flex-column font-medium w-full ">
      <p className="mb-1">Name</p>
      <input type="text" placeholder="Enter your name"  className="border-none bg-gray-200 p-1 rounded-xl mb-3 w-full " 
      autoComplete="off" name="name"  onChange={(e)=>getList(e.target)} />
      <p className="mb-1">Email address</p>
      <input type="email" placeholder="Enter your email" className="border-none bg-gray-200 p-1 rounded-xl mb-3 w-full " 
      autoComplete="off" name="email"  onChange={(e)=>getList(e.target)} />
      <p className="mb-1">Password</p>
      <input type="password" placeholder="Enter your password" className="border-none bg-gray-200 p-1 rounded-xl mb-5 w-full " 
      autoComplete="off" name="password"  onChange={(e)=>getList(e.target)} />
      <button className="bg-black text-white p-1.5 w-full rounded-xl font-bold cursor-pointer" onClick={submitform}>Sign Up</button>
    </form>
    </div>
      <p className="mt-4">Already have an account ? <span className="text-sky-700 font-bold cursor-pointer" onClick={()=>changetologin()}>Log In</span> .</p>
    </div>
    </>
  )
}

export default Signup