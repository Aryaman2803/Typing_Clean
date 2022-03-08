import './Dashboard.css'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import Note from './Note'
import userNotesContext from '../../Context/userNotesContext'
import AddNote from './AddNote'

function Dashboard() {
  const navigate = useNavigate()
  const [Notes, setNotes] = useState()
  const [CheckIfNewNoteAdded, setCheckIfNewNoteAdded] = useState(false)
  const [SearchNote, setSearchNote] = useState('')

  const { CheckIfNoteUpdated, setCheckIfNoteUpdated } =
    useContext(userNotesContext)
  const verifyUser = async () => {
    try {
      const response = await axios.get('/api/dashboard/', {
        withCredentials: true,
      })
      if (response?.status === 200) {
        setNotes(response?.data?.notes)
      }
    } catch (err) {
      console.log('error from dashboard js file', err)
      navigate('/login')
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  useEffect(() => {
    if (CheckIfNewNoteAdded || CheckIfNoteUpdated) {
      verifyUser()
      setCheckIfNoteUpdated(false)
      
      setCheckIfNewNoteAdded(false)
    }
  }, [CheckIfNewNoteAdded, CheckIfNoteUpdated])

  return (
    <div className='notes-wrapper'>
      <Navbar setSearchNote={setSearchNote} />
      {!SearchNote && (
        <AddNote setCheckIfNewNoteAdded={setCheckIfNewNoteAdded} />
      )}
      <Outlet />
      <div className='notes-container'>
        {Notes?.filter(
          (note) =>
            note.title.toLowerCase().includes(SearchNote) ||
            note.body.toLowerCase().includes(SearchNote)
        )?.map((note) => {
          return (
            <Note
              key={note._id}
              note={note}
              setCheckIfNoteUpdated={setCheckIfNoteUpdated}
              CheckIfNoteUpdated={CheckIfNoteUpdated}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
