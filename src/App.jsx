import './App.css'
import { Route, Routes } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import HabitTrackerPage from './pages/HabitTrackerPage'

function App() {
  return (
    <div className='main'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo' element={<TodoPage />} />
        <Route path='/habitTracker' element={<HabitTrackerPage />} />
      </Routes>
    </div>
  )
}

export default App
