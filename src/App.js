import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
