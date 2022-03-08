import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Signup from './Components/SignUp/Signup'
import Dashboard from './Components/Dashboard/Dashboard'
import theme from './Context/theme'
import { ThemeProvider } from '@mui/material/styles'
import Modal from './Components/Dashboard/Modal'
import userNotesContext from './Context/userNotesContext'
import { useState } from 'react'

function App() {
  const location = useLocation()
  const state = location.state && location.state.background
  const [CheckIfNoteUpdated, setCheckIfNoteUpdated] = useState(false)
  return (
    <userNotesContext.Provider
      value={{ CheckIfNoteUpdated, setCheckIfNoteUpdated }}
    >
      <ThemeProvider theme={theme}>
        <div className='App'>
          <Routes location={state?.background || location}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard/:id' element={<Modal />} />
            </Route>
            {/* <Route
          path='/dashboard'
          element={
            <ProtectedRoutes>
            <Dashboard />
            </ProtectedRoutes>
          }
        ></Route> */}
          </Routes>
          {state?.background && (
            <Routes>
              {/* <Route path='/api/dashboard/:id' element={<Modal />} /> */}
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </userNotesContext.Provider>
  )
}

export default App
