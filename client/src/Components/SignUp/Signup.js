import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import Navbar from '../Home/Navbar'

function Signup() {
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { username, email, password } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  // const [email, setEmail] = useState('')
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    // const URL = 'http://localhost:3000/api/register'
    const URL = '/api/register'
    await axios
      .post(URL, {
        email: email,
        password: password,
        username: username,
      })
      .then((response) => {
        console.log('ohoo', response.data)
        if (response.data.error) setError(true)
        else navigate('/login')
      })
  }
  return (
    <>
      <Navbar />
      <section
        style={{
          boxSizing: 'border-box',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FAF9F6',
        }}
      >
        <form onSubmit={onSubmit}>
          <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            backgroundColor='white'
            sx={{
              width: {
                xs: 350,
                sm: 400,
              },
              height: {
                xs: 500,
                sm: 500,
              },
              boxShadow: 1,
            }}
          >
            <h1>Register</h1>
            <Grid container direction='column' alignItems='center'>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-end', p: 0.5, m: 1 }}
              >
                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  id='username'
                  type='text'
                  label='Username'
                  variant='standard'
                  name='username'
                  value={username}
                  onChange={onChange}
                  sx={{
                    width: {
                      xs: 220,
                      sm: 280,
                    },
                  }}
                />
              </Box>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-end', p: 0.5, m: 1 }}
              >
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  aria-label='Enter email'
                  id='email'
                  type='email'
                  label='Email'
                  variant='standard'
                  name='email'
                  value={email}
                  onChange={onChange}
                  sx={{
                    width: {
                      xs: 220,
                      sm: 280,
                    },
                  }}
                />
              </Box>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-end', p: 0.5, m: 1 }}
              >
                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  aria-label='Enter password'
                  id='password'
                  autoComplete='off'
                  type='password'
                  label='Password'
                  variant='standard'
                  name='password'
                  value={password}
                  onChange={onChange}
                  sx={{
                    width: {
                      xs: 220,
                      sm: 280,
                    },
                  }}
                />
              </Box>

              <Button
                type='submit'
                size='medium'
                variant='contained'
                endIcon={<LoginIcon />}
                sx={{ width: 120, mt: 2 }}
                disabled={!email || !password}
              >
                Sign Up
              </Button>
              <div style={{ marginTop: '0.5rem' }}>
                Already have an account?
                <span
                  style={{
                    paddingLeft: '5px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    navigate('/login')
                  }}
                >
                  SIGN IN
                </span>
              </div>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  )
}

export default Signup
