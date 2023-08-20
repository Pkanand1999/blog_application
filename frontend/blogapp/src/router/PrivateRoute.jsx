import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux/es/hooks/useSelector"

const PrivateRoute= ({ children }) => {
  let authToken=localStorage.getItem('blogtoken');
let isAuth=useSelector((data)=>{
return data.reducer.isAuth
})
  if ( !authToken) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default PrivateRoute;