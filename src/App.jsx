
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './containers/Home/Home'
import Login from './containers/User/Login/Login'
import Profile from './containers/User/Profile/Profile'
import Account from './containers/Account/Account'

function App() {
 
  return (
    <div className="App">
    <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
