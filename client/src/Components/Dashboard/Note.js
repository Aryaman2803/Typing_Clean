import './Dashboard.css'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Dashboard.css'
import { convertFromRaw, EditorState } from 'draft-js'
import ModalEditor from '../../Hooks/ModalEditor'

const Note = ({ note }) => {
  const location = useLocation()

  const [editorStateTitle, setEditorStateTitle] = useState(
    calcState(note.title)
  )
  const [editorStateBody, setEditorStateBody] = useState(calcState(note.body))

  useEffect(() => {
    setEditorStateTitle(calcState(note.title))
    setEditorStateBody(calcState(note.body))
  }, [note])

  return (
    <section className='single-note-wrapper'>
      <Link
        key={note._id}
        to={`/dashboard/${note._id}`}
        state={{ background: location }}
        className='note-link'
      >
        <article className='single-note'>
          <div className='note-title'>
            <ModalEditor
              editorState={editorStateTitle}
              onChange={setEditorStateTitle}
              isReadOnly={true}
            />
          </div>
          <div className='note-body'>
            <ModalEditor
              editorState={editorStateBody}
              onChange={setEditorStateBody}
              isReadOnly={true}
              updatedAt={note.updatedAt}
            />
          </div>
        </article>
      </Link>
    </section>
  )
}

const calcState = (value) => {
  return value
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
    : EditorState.createEmpty()
}
export default Note
