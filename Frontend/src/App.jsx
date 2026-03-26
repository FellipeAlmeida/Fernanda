import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./privateRoutes/privateRoute.jsx"
import ChatLayout from "./layouts/ChatLayout.jsx"

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute> <ChatLayout /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>

    <ToastContainer />
    </>
  )
}

export default App