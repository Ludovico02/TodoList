import './App.css'
import { Route, Routes } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import Home from "./pages/Home"

function App() {
  return (
    <div className='main'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo' element={<TodoPage />} />
      </Routes>
    </div>
  )
}

export default App
