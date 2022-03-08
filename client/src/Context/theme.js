import React from 'react'
import { ReactDOM } from 'react'
import { red } from '@mui/material/colors'
import {  createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    light: {
      primaryText: '#121212', // black
      secondaryText: '#FAFAFA', // white
    },
    dark: {
      primaryText: '#FAFAFA', // white
      secondaryText: '#FAFAFA', // white
    },
  },
})

export default theme
