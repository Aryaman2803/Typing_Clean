import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import EmailIcon from '@mui/icons-material/Email'
import Navbar from '../Home/Navbar'

function Login({ setToken }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const { email, password } = formData
  const onChange = (e) => {
    setError('')
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const loginUser = async (email, password) => {
    try {
      const URL = '/api/login'
      // const URL = 'http://localhost:3000/api/login'
      const data = await axios.post(URL, {
        email,
        password,
      })
      return data
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      setError('Please enter all fields')
      return
    }
    const response = await loginUser(email, password)
    if (response?.data?.token) {
      // localStorage.setItem('user', JSON.stringify(response.data))
      setFormData({ email: '', password: '' })
      navigate('/dashboard')
    }
  }

  return (
    <>
      <Navbar />
      <section
        style={{
          boxSizing: 'border-box',
          minHeight: '90vh',
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
            <h1>Login</h1>
            <Grid container direction='column' alignItems='center'>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-end', p: 0.5, m: 1 }}
              >
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  id='input-with-sx1'
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
                  id='input-with-sx'
                  type='password'
                  label='Password'
                  autoComplete='input-with-sx'
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
                Login{' '}
              </Button>

              <div
                style={{ height: '20px', marginTop: '0.5rem', color: 'red' }}
              >
                {error}
              </div>
              <div
                style={{
                  width: '100%',
                  textAlign: 'right',
                  marginTop: '1.5rem',
                  fontSize: '0.8rem',
                }}
              >
                <span style={{ paddingRight: '1rem' }}> Forgot Password?</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                Need an account?
                <span
                  style={{
                    paddingLeft: '5px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    navigate('/signup')
                  }}
                >
                  SIGN UP
                </span>
                <div
                  style={{
                    fontSize: '14px',
                    marginTop: '1rem',
                    letterSpacing: '1px',
                  }}
                >
                  <p style={{ fontWeight: 'bold' }}>Use demo credentials </p>
                  <div style={{ fontSize: '12px', margin: '5px 0' }}>
                    Email: tom3@gmail.com
                  </div>
                  <div style={{ fontSize: '12px' }}>Password: tom</div>
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  )
}

export default Login
