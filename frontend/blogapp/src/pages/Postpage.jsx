import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState, UseEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { commentonpost, getcomment } from '../redux/auth/Action';


function Postpage() {
    const [post, setPost] = useState({})
    const [comment, setComment] = useState([])
    const [content, setContent] = useState([])
    const { id } = useParams();
    const data=useSelector((e)=>{
        return e.reducer
    })
    const dispatch=useDispatch();
    let base=process.env.REACT_APP_AUTH_URL
    useEffect(() => {
        if (id) {
            fetching(id);
            fetchComment(id);
        }
    }, [id])
    //  fetch post function 
    async function fetching(id) {
        try {
            let res = await fetch(`${base}/post/individual/${id}`)
            let json = await res.json();
            console.log(json[0])
            setPost({ ...json[0] })
        } catch (e) {
            console.log(e)
        }

    }

    // fetch comment by id 
     function fetchComment(id){
        getcomment(id,dispatch)
    }
// post comment 
function postComment(event){
    event.preventDefault();
    let detail={name:data.name,userid:data.id,postid:id,avatar:data.avatar,content:content}
    commentonpost(detail)
    fetchComment(id)
}

    return (
        <div className="min-h-screen w-screen bg-gradient-to-r from-gray-500 via-blue-500 to-pink-500 ... flex justify-center">
            <div className='w-[80%]  text-center mt-8 mb-10 flex flex-col'>
                {/* post div  */}
                <div className='bg-white rounded-md flex flex-col '>
                    <div className='flex mt-4 items-center'>
                        <div className='w-[5%] rounded-full ml-6'><img className='rounded-full' src={post.avatar} alt="Avatar" /></div>
                        <div className='ml-6 font-bold text-2xl'><h1>{post.name}</h1></div>
                    </div>
                    <div className='mb-6 mt-2 text-left mr-12 ml-12'>
                        <h1 className='text-4xl font-bold text-left '>{post.title}</h1>
                        <p className='mt-4'>{post.content}</p>
                    </div>
                    {/* post div end  */}
                    <div className='text-left text-xl font-bold ml-10 mb-6'>
                        {/* comment logo  */}
                        <h1 className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex">
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                            </svg> &nbsp;Comments</h1>
                        {/* input comment  */}
                        <div className='flex'>
                            <input className='w-[90%] border-2 border-green-500 ' type="text" name="comment" onChange={(e)=>setContent(e.target.value)}/>
                            <button onClick={postComment} className='bg-green-500 p-2 font-bold rounded-sm'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            </button>
                        </div>
                        {/* comment input end  */}
                        <div className='mr-24 ml-24 mt-4 mb-2'>
                            {
                                data.comments.map((cmt,i)=>{
                                    return <div className='flex flex-col p-2' key={i}>
                                        <div className='flex items-center'>
                                            <img className='w-[3%] rounded-full' src={cmt.avatar} alt="avatar" />
                                            <h1 className='ml-2 text-sm'>{cmt.name}</h1>
                                        </div>
                                        <div>
                                            <p className='text-sm font-sm ml-8'>{cmt.content}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Postpage