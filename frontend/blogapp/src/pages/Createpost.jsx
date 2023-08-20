import React from 'react'
import { useState } from 'react';
import { useSelector , useDispatch} from 'react-redux'
import { newpost } from '../redux/auth/Action';

function Createpost() {

const [title,setTitle]=useState('');
const [content,setContent]=useState('');
const data=useSelector((e)=>{
    return e.reducer
  })
  const dispatch=useDispatch()

function createpost(){
   let usercontent={title:title,content:content,name:data.name,avatar:data.avatar,userid:data.id}
   newpost(usercontent,dispatch);
}

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-gray-500 via-blue-500 to-pink-500 ... flex justify-center">
        <div className='w-[80%] text-center mt-8 mb-10 flex flex-col gap-10'>
            <h1 className='text-4xl font-bold '>Create Your Post</h1>
            <div>
                <h1 className='text-2xl font-bold text-left'>Title:</h1>
                <textarea name="title" className='w-full text-xl' rows="2" onChange={(e)=>setTitle(e.target.value)}/>
                <h1 className='text-2xl font-bold text-left'>Content:</h1>
                <textarea name="content" className='w-full text-xl' rows="8" onChange={(e)=>setContent(e.target.value)}/>
                <button className='w-full bg-green-500 text-xl font-bold p-2' onClick={createpost}>Create</button>
            </div>
        </div>
    </div>
  )
}

export default Createpost