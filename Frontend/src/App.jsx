import Login from './pages/Login/Login.jsx'
import ConfirmEmail from './pages/Confirm-email/Confirm-email.jsx'
import Register from './pages/Register/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./privateRoutes/privateRoute.jsx"
import ChatLayout from "./layouts/ChatLayout.jsx"
import ForgotPassword from './pages/Forgot-password/Forgot-password.jsx'
import ResetPassword from './pages/Reset-password/Reset-password.jsx'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verifyemail" element={<ConfirmEmail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ResetPassword />} />
        <Route path="/home" element={<PrivateRoute> <ChatLayout /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>

    <ToastContainer />
    </>
  )
}

export default App