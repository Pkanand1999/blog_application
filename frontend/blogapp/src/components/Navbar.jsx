import React from 'react'
import { useNavigate } from "react-router";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userIsLoggedIn } from '../redux/auth/Action';
import { useDispatch } from 'react-redux';
import { allpost } from '../redux/auth/Action';
import { Link } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((e) => {
    return e.reducer
  })

  function signoff(){
    localStorage.removeItem('blogtoken')
    dispatch({
      type:"LOGOUT",
      payload:false
    })
    navigate("/auth");
  }

  useEffect(() => {
    if (data.token) {
      userIsLoggedIn(data.token, dispatch);
    }
    if (data.token) {
      allpost(dispatch)
    }
    if (!data.token) {
      navigate("/auth")
    }
  }, [data.token])

  return (
    <>
      {/* navbar ////// */}
      <div className='w-full h-16 flex justify-around items-center'>
        <div className='flex w-7/12 '>
          <h1 className='text-4xl font-bold'><Link to='/'>BlogX</Link></h1>
        </div>
        <div className='flex w-4/12 justify-around items-center'>
          {/* search  */}
          <div className='flex w-6/12 bg-white text-gray-600 p-1 rounded-xl justify-around items-center'>
            <input type="search" className='p-0 pl-2 w-10/12 border-none ' placeholder='Search' />
            <i className="fa-solid fa-magnifying-glass w-1/12"></i>
          </div>
          {/* bell  */}
          <div className='flex w-2/12 justify-center items-center' onClick={signoff}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>

          </div>
          {/* img  */}
          <div className='flex w-10 justify-center item-center rounded-2xl'>
            <img src={data.image} alt="" className='rounded-full' />
          </div>
        </div>
      </div>
      {/* navbar /////// */}
    </>
  )
}

export default Navbar