import React from 'react'
import Navbar from './Navbar'
import './parallax.css'
import './home.css'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
function Home() {
  const navigate = useNavigate()
  return (
    <section>
      <Navbar />
      <div>
        <article className='parallax-container'>
          <div id='stars'></div>
          <div id='star2'></div>
          <div id='star3'></div>
          <div id='title'>
            <span>Save your thoughts,</span>
            <br></br>
            <span>wherever you are</span>
          </div>
        </article>
        <article className='split-wrapper'>
          <div className='parallax-img-container'>
            <img src='/images/parallax.png' alt='app screenshot' />
          </div>
          <div className='split-container'>
            <div className='left-split'>
              <span className='left-heading'>Capture your infinite mind</span>
              <p>
                Typing is an easy-to-use <em> encrypted </em> note-taking app
                for digitalists and professionals. Capture your notes,
                documents, and life’s work all in one place.
              </p>
              <Box
                sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}
                onClick={() => navigate('/signup')}
              >
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  className='signup-button'
                  sx={{
                    fontFamily: 'Soleil_bold,Helvetica,Arial,sans-serif',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '1.5px',
                    lineHeight: '38px',
                  }}
                  hover={{ border: '1px solid  red' }}
                >
                  Sign Up
                </Typography>
              </Box>
            </div>
            <div className='right-split'>
              <img src='/images/fullPageSS.png' alt='screeenshot' />
            </div>
          </div>
          <div className='split-container'>
            <div className='right-split'>
              <img
                src='/images/searchbarr.png'
                alt='search bar'
                id='searchbar-img'
              />
            </div>
            <div className='left-split'>
              <span className='left-heading'>Searching made easy</span>
              <p>
                Find notes by searching for titles, dates, content types, and
                keywords Find what you're looking for even faster, and let{' '}
                <em> Typing </em> do the remembering for you.
              </p>
            </div>
          </div>
          <div className='split-container'>
            <div className='left-split'>
              <span className='left-heading'>Take notes and take action</span>
              {/* <p>
              Typing is an easy-to-use <em> encrypted </em> note-taking app for
              digitalists and professionals. Capture your notes, documents, and
              life’s work all in one place.
            </p> */}
            </div>
            <div className='right-split'>
              <img
                src='/images/editor.png'
                alt='screeenshot'
                id='searchbar-img'
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Home
