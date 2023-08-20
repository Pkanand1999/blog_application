const initialState = {
  token: localStorage.getItem('blogtoken'),
  isAuth: false,
  id:"",
  name:"",
  email:"",
  image:"",
  isSignup:false,
  posts:[],
  comments:[],
  };
  
  const reducer = (state = initialState,action) => {
    switch(action.type){
        case "SIGNUP_SUCCESS":{
          return{
            ...state,
            isSignup:true,
          }
      
        }
        case "LOGIN_SUCCESS":{
          return{
            ...state,
            token:action.payload.token,
            isAuth:true,
            name:action.payload.name,
            email:action.payload.email,
            image:action.payload.avatar,
            id:action.payload.id
          }
      
        }
        case "LOGGEDIN_USER":{
          return{
            ...state,
            isAuth:true,
            name:action.payload.name,
            email:action.payload.email,
            image:action.payload.avatar,
            id:action.payload.id
          }
      
        }
        case "ALL_POST":{
          return{
            ...state,
            posts:[...action.payload]
          }
        }
        case "COMMENT":{
          return{...state,
          comments:[...action.payload]}
        }
        case "LOGOUT":{
          return{
            ...state,
            isAuth:true,
            name:"",
            email:"",
            image:"",
            id:"",
            token:""
          }
        }
        default:
        return state;
      }
  };
  
  export { reducer };