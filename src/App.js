import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Auth from './components/Auth/Auth'
import FeedDetail from './components/FeedDetail/FeedDetail'

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/post/search" element={<Home />} />
          <Route path="/post/:id" element={<FeedDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
