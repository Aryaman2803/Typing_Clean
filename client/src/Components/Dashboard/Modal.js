import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import axios from 'axios'
import userNotesContext from '../../Context/userNotesContext'
import './Dashboard.css'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import ModalEditor from '../../Hooks/ModalEditor'
import Toolbar from '../../Hooks/Toolbar'

const Modal = () => {
  let navigate = useNavigate()
  let { id } = useParams()
  let buttonRef = useRef(null)
  const { CheckIfNoteUpdated, setCheckIfNoteUpdated } =
    useContext(userNotesContext)

  const [CheckIfNoteIsEdited, setCheckIfNoteIsEdited] = useState(false)
  const [editorStateTitle, setEditorStateTitle] = useState(() =>
    EditorState.createEmpty()
  )
  const [editorStateBody, setEditorStateBody] = useState(() =>
    EditorState.createEmpty()
  )
  const [updatedAt, setUpdatedAt] = useState('')

  const onDismiss = async () => {
    if (
      CheckIfNoteIsEdited &&
      (editorStateTitle.getCurrentContent().hasText() ||
        editorStateBody.getCurrentContent().hasText())
    ) {
      await axios.put(`/api/dashboard/notes/${id}`, {
        title: JSON.stringify(
          convertToRaw(editorStateTitle.getCurrentContent())
        ),
        body: JSON.stringify(convertToRaw(editorStateBody.getCurrentContent())),
      })
      setCheckIfNoteUpdated(true)
      setCheckIfNoteIsEdited(false)
    } else if (
      CheckIfNoteIsEdited &&
      !editorStateTitle.getCurrentContent().hasText() &&
      !editorStateBody.getCurrentContent().hasText()
    ) {
      await axios.delete(`/api/dashboard/notes/${id}`)
      setCheckIfNoteUpdated(true)
      setCheckIfNoteIsEdited(false)
      console.log('deleted')
    }
    navigate(-1)
  }

  const fetchNote = async (id) => {
    try {
      const response = await axios.get(`/api/dashboard/${id}`, {
        withCredentials: true,
      })
      if (response?.status === 200) {
        setEditorStateTitle(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(response?.data.note.title))
          )
        )
        setEditorStateBody(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(response?.data.note.body))
          )
        )
        setUpdatedAt(response?.data.note.updatedAt)
      }
    } catch (err) {
      console.log('error from dashboard js file', err)
      navigate('/login')
    }
  }

  const handleDelete = async () => {
    await axios.delete(`/api/dashboard/notes/${id}`)
    setCheckIfNoteUpdated(true)
    navigate(-1)
  }

  useEffect(() => {
    fetchNote(id)
  }, [])

  if (!id) return null
  return (
    <Dialog
      aria-labelledby='label'
      className='modal-wrapper'
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='modal-wrapper-inner'>
        <div className='modal-edit-title'>
          <ModalEditor
            editorState={editorStateTitle}
            setEditorState={setEditorStateTitle}
            showToolbar={false}
            placeholderText={'Title'}
            setCheckIfNoteIsEdited={setCheckIfNoteIsEdited}
            isReadOnly={false}
          />
        </div>
        <div className='modal-edit-body sc1'>
          <ModalEditor
            editorState={editorStateBody}
            setEditorState={setEditorStateBody}
            showToolbar={true}
            placeholderText={'Body'}
            setCheckIfNoteIsEdited={setCheckIfNoteIsEdited}
            isReadOnly={false}
          />
        </div>
        <div className='modal-toolbar'>
          <Toolbar
            editorState={editorStateBody}
            setEditorState={setEditorStateBody}
            switchFor={'modaleditor'}
            handleDelete={handleDelete}
            updatedAt={updatedAt}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
