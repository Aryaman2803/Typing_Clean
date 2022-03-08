import React, { useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js'
import axios from 'axios'
import './Dashboard.css'
import EditorComp from '../../Hooks/DraftEditor'

export default function AddNote({ setCheckIfNewNoteAdded }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [editorStateTitle, setEditorStateTitle] = useState(() =>
    EditorState.createEmpty()
  )

  const [checkIfNoteEdited, setCheckIfNoteEdited] = useState(false)
  const [DisplayNote, setDisplayNote] = useState(false)

  const submitNote = async () => {
    if (
      checkIfNoteEdited &&
      (editorStateTitle.getCurrentContent().hasText() ||
        editorState.getCurrentContent().hasText())
    ) {
      await axios.post('/api/dashboard/notes', {
        title: JSON.stringify(
          convertToRaw(editorStateTitle.getCurrentContent())
        ),
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      })
      setEditorState(EditorState.createEmpty())
      setEditorStateTitle(EditorState.createEmpty())

      setCheckIfNewNoteAdded(true)
      setCheckIfNoteEdited(false)
    }
  }
  const clearNote = () => {
    setEditorState(EditorState.createEmpty())
    setEditorStateTitle(EditorState.createEmpty())
    setCheckIfNoteEdited(false)
    setDisplayNote(false)
  }

  function expandContainer() {
    setDisplayNote(true)
  }

  function collapseContainer(e) {
    if (
      !editorStateTitle.getCurrentContent().hasText() &&
      !editorState.getCurrentContent().hasText()
    ) {
      setDisplayNote(false)
    }
  }

  return (
    <section className='addNote-wrapper'>
      <div
        className={
          DisplayNote
            ? 'addNote-container addNote-Body-padding-open'
            : ' addNote-container addNote-Body-padding-close '
        }
        onBlur={collapseContainer}
      >
        <div
          className='addNote-Title'
          style={{ display: DisplayNote ? 'block' : 'none' }}
        >
          <EditorComp
            editorState={editorStateTitle}
            setEditorState={setEditorStateTitle}
            placeholderText='Title'
            setCheckIfNoteEdited={setCheckIfNoteEdited}
            showToolbar={false}
          />
        </div>
        <div className='addNote-Body' onClick={expandContainer}>
          <EditorComp
            editorState={editorState}
            setEditorState={setEditorState}
            placeholderText='Start typing...'
            setCheckIfNoteEdited={setCheckIfNoteEdited}
            showToolbar={true}
            submitNote={submitNote}
            clearNote={clearNote}
            DisplayNote={DisplayNote}
          />
        </div>
      </div>
    </section>
  )
}
