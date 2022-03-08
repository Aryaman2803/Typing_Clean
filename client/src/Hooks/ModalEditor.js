import React from 'react'
import { Editor, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'

const ModalEditor = ({
  editorState,
  setEditorState,
  setCheckIfNoteIsEdited,
  placeholderText,
  isReadOnly,
}) => {
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      setCheckIfNoteIsEdited(true)
    }
  }

  const onChange = (newState) => {
    const currentContentState = editorState.getCurrentContent()
    const newContentState = newState.getCurrentContent()
    setEditorState(newState)
    if (currentContentState !== newContentState) {
      setCheckIfNoteIsEdited(true)
    }
  }
  return (
    <>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder={placeholderText}
        handleKeyCommand={handleKeyCommand}
        readOnly={isReadOnly}
      />
    </>
  )
}

export default ModalEditor
