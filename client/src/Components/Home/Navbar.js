import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import { useNavigate } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const navigate = useNavigate()
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={(e) => {
          navigate('/login')
        }}
      >
        <img
          src='https://img.icons8.com/external-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto/32/26e07f/external-log-in-arrow-yogi-aprelliyanto-detailed-outline-yogi-aprelliyanto.png'
          width={'32px'}
          height={'32px'}
          alt='login'
        />
        <Typography
          variant='inherit'
          sx={{
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            fontWeight: '500',
          }}
        >
          Log In
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => navigate('/signup')}>
        <img
          src='https://img.icons8.com/external-itim2101-lineal-itim2101/32/26e07f/external-typewriter-copywriting-itim2101-lineal-itim2101.png'
          width={'32px'}
          height={'32px'}
          alt='register'
        />
        <Typography
          variant='inherit'
          sx={{
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            fontWeight: '500',
          }}
        >
          Try Typing
        </Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <nav
      style={{
        backgroundColor: '#323132',
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        zIndex: '1',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          className='navbar-appbar'
          sx={{
            backgroundColor: '#323132',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Typography
                sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1 }}
              >
                <img
                  src='/images/logoo.jpg'
                  width={'160px'}
                  alt='logo'
                  style={{ display: 'block', cursor: 'pointer' }}
                />
              </Typography>
              {/* <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ display: { xs: 'block', sm: 'block' }, flexGrow: 1 }}
              >
                TYPING
              </Typography> */}
            </span>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}
              onClick={() => navigate('/login')}
            >
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  // paddingRight: '1rem',
                  // fontSize: '0.95rem',
                  // fontFamily: 'Soleil_bold,Helvetica,Arial,sans-serif',
                  // minWidth: '120px',
                  // color: '#00a82d',
                  fontFamily: 'Soleil_bold,Helvetica,Arial,sans-serif',
                  display: 'inline-block',
                  textAlign: 'center',
                  fontSize: '14px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  minWidth: '120px',
                  minHeight: '40px',
                  lineHeight: '38px',
                  borderRadius: '3px',
                  border: '1px solid  #fff',
                  marginRight: '1rem',
                }}
              >
                Log In
              </Typography>
            </Box>
            <Box
              sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}
              onClick={() => navigate('/signup')}
            >
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  // paddingRight: '1rem',
                  // fontSize: '0.95rem',
                  // fontFamily: 'Soleil_bold,Helvetica,Arial,sans-serif',
                  // minWidth: '120px',
                  color: '#00a82d',
                  fontFamily: 'Soleil_bold,Helvetica,Arial,sans-serif',
                  display: 'inline-block',
                  textAlign: 'center',
                  fontSize: '14px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  minWidth: '120px',
                  minHeight: '40px',
                  lineHeight: '38px',
                  borderRadius: '3px',
                  border: '1px solid  #00a82d',
                  marginRight: '1rem',
                }}
              >
                Try Typing
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    </nav>
  )
}

export default Navbar
