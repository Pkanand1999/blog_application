import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Dashboard() {
    const data=useSelector((e)=>{
        return e.reducer.posts
      })


  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-gray-500 via-blue-500 to-pink-500 ... flex justify-center ">
        <div className='w-[80%] text-center mt-8 mb-10 flex flex-col gap-10'>
            <div><Link to='/create'><button className='bg-green-500 text-md font-bold p-2 rounded-sm'>Create Post</button></Link></div>
            {
                data.map((post,i)=>{
                   return <div className='bg-white rounded-md flex flex-col ' key={i}>
                    <div className='flex mt-4 items-center'>
                        <div className='w-[5%] rounded-full ml-6'><img className='rounded-full' src={post.avatar} alt="Avatar" /></div>
                        <div className='ml-6 font-bold text-2xl'><h1>{post.name}</h1></div>
                    </div>
                    <div className='mb-6 mt-2 text-left mr-6 ml-6'>
                        <h1 className='text-4xl font-bold text-left ml-4'>{post.title}</h1>
                        <p>{post.content.substring(0,500)}......<Link to={`/post/${post.id}`}><button className='bg-green-500 text-xl font-sm p-1 rounded-sm'>read more</button></Link></p>
                    </div>
                    </div>
                })

            }
        </div>
    </div>
  )
}

export default Dashboard