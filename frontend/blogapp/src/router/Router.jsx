
import AuthPage from '../pages/AuthPage'
import Dashboard from '../pages/Dashboard'
import Postpage from '../pages/Postpage'
import Createpost from '../pages/Createpost'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

function Router() {

  return (
    <>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/post/:id" element={<PrivateRoute><Postpage/></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><Createpost/></PrivateRoute>} />
        </Routes>
    </>
  )
}

export default Router