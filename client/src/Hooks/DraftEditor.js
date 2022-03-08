import React from 'react'
import { Editor, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import Toolbar from './Toolbar'

const EditorComp = ({
  editorState,
  setEditorState,
  placeholderText,
  setCheckIfNoteEdited,
  showToolbar,
  submitNote,
  clearNote,
  DisplayNote,
}) => {
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      setCheckIfNoteEdited(true)
    }
  }
  const onChange = (newState) => {
    const currentContentState = editorState.getCurrentContent()
    const newContentState = newState.getCurrentContent()
    setEditorState(newState)
    if (currentContentState !== newContentState) setCheckIfNoteEdited(true)
  }

  return (
    <>
      <Editor
        editorState={editorState}
        value={editorState}
        onChange={onChange}
        placeholder={placeholderText}
        handleKeyCommand={handleKeyCommand}
      />
      {/* {showToolbar && editorState.getCurrentContent().hasText() && ( */}
      {showToolbar && DisplayNote && (
        <Toolbar
          editorState={editorState}
          setEditorState={setEditorState}
          submitNote={submitNote}
          clearNote={clearNote}
          switchFor={'addNote'}
        />
      )}
    </>
  )
}

export default EditorComp
