// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import Button from '@mui/material/Button'
// import { styled } from '@mui/material/styles'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import IconButton from '@mui/material/IconButton'
// import CloseIcon from '@mui/icons-material/Close'
// const EditNote = () => {
//   const navigate = useNavigate()
//   const { id } = useParams()
//   const [noteData, setNoteData] = useState()
//   //   const verifyUser =async () => {
//   //     try {
//   //       const response =await axios.get(`/api/dashboard/notes/${id}`, {
//   //         withCredentials: true,
//   //       })
//   //       if (response?.status === 200) {
//   //         setNoteData(response)
//   //         console.log('printing resonse', response)
//   //       }
//   //       console.log(response)
//   //     } catch (err) {
//   //       console.log('error from editNote js file', err)
//   //       navigate('/login')
//   //     }
//   //   }
//   //   useEffect(() => {
//   //     verifyUser()
//   //   }, [])

//   if (!id) return <h3>No id found</h3>
//   return <div>hello world from editNote</div>
// }

// export default EditNote
