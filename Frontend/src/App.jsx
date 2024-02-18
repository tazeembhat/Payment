import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Dashboard } from './Pages/Dashboard'
import { SendMoney } from './Pages/SendMoney'
import { MessageFailure, MessageSuccess } from './Pages/Message'
import { UpdateUser } from './Pages/Update'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/messagesuccess" element={<MessageSuccess />} />
        <Route path="/messagefailure" element={<MessageFailure />} />
        <Route path="/updateuser" element={<UpdateUser />} />
      </Routes>      
    </BrowserRouter>
  )
}

export default App
