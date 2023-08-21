import axios from 'axios';

// let base=process.env.REACT_APP_AUTH_URL

export function signupUser(data,dispatch){
  axios.post(`http://54.209.133.101:3001/api/user/register`,data )
  .then((res)=>{
    console.log(res);
      dispatch({
          type:"SIGNUP_SUCCESS",
          payload:true
      })
      alert('Signup successful Login Now')
  }).catch((e)=>{
    console.log(e)
      dispatch({
          type:"SIGNUP_FAILURE",
          payload:false,
      })
      alert('signup failed')
  })
}


export function login(data,dispatch){
  axios.post(`http://54.209.133.101:3001/api/user/login`,data )
      .then((res)=>{
          console.log(res.data)
          localStorage.setItem('blogtoken',res.data.token)
          dispatch({
              type:"LOGIN_SUCCESS",
              payload:res.data
          })
          // alert('login successful')
      }).catch((e)=>{
        console.log(e)
          dispatch({
              type:"LOGIN_FAILURE",
              payload:true,

          })
          alert('login failed')
      })
}


export function userIsLoggedIn(authToken,dispatch){
  console.log("user is logged in")
    fetch(`http://54.209.133.101:3001/api/user/islogin`, {
        headers: {
          'authorization': `Bearer ${authToken}`
        }
      })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const user = result.data;
dispatch({
  type:"LOGGEDIN_USER",
  payload:user
})
      })
}


export function allpost(dispatch){
  axios.get(`http://54.209.133.101:3001/api/post/posts`)
  .then(res=>{
    console.log(res.data)
    dispatch({
      type:"ALL_POST",
      payload:res.data
    })
  })
}

export function newpost(data,dispatch) {
  axios.post(`http://54.209.133.101:3001/api/post/create`,data)
  .then(res=>{
    alert('post created successfully')
  })
  .catch(err=>{
    alert(err)
  })
}


export function commentonpost(data){
  axios.post(`http://54.209.133.101:3001/api/comment/create`,data)
  .then(res=>{
    console.log(res)
    alert('comment added successfully')
  })
  .catch(err=>{
    console.log(err)
  })
}


export function getcomment(id,dispatch){
    axios.get(`http://54.209.133.101:3001/api/comment/allcomment/${id}`)
    .then(res=>{
console.log(res.data)
dispatch({
  type:'COMMENT',
  payload: res.data
})
    })
.catch(err=>{
  console.log(err)
})
}




