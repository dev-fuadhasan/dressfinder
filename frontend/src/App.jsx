import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BraForm from './pages/BraForm'
import PantyForm from './pages/PantyForm'
import Results from './pages/Results'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bra" element={<BraForm />} />
        <Route path="/panty" element={<PantyForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App

