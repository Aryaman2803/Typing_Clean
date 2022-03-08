import React from 'react'
import { RichUtils } from 'draft-js'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import { IconButton } from '@mui/material'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import CodeIcon from '@mui/icons-material/Code'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'
import './toolbar.css'
const Toolbar = (props) => {
  const inlineStyles = [
    {
      type: 'BOLD',
      label: 'Bold',
      toolTip: 'line',
      icon: <FormatBoldIcon sx={{ color: '#01A201' }} />,
    },
    {
      type: 'ITALIC',
      label: 'Italic',
      toolTip: 'Italic',
      icon: <FormatItalicIcon sx={{ color: '#01A201' }} />,
    },
    {
      type: 'UNDERLINE',
      label: 'Underline',
      toolTip: 'Underline',
      icon: <FormatUnderlinedIcon sx={{ color: '#01A201' }} />,
    },
    {
      type: 'CODE',
      label: 'Code',
      toolTip: 'Code Block',
      icon: <CodeIcon sx={{ color: '#01A201' }} />,
    },
  ]

  const blockStyles = [
    {
      type: 'unordered-list-item',
      label: 'Unordered List',
      toolTip: 'Unordered List',
      icon: <FormatListBulletedIcon sx={{ color: '#01A201' }} />,
    },
    {
      type: 'ordered-list-item',
      label: 'Ordered List',
      toolTip: 'Ordered List',
      icon: <FormatListNumberedIcon sx={{ color: '#01A201' }} />,
    },
  ]

  const {
    editorState,
    setEditorState,
    switchFor,
    submitNote,
    handleDelete,
    clearNote,
    updatedAt,
  } = props

  const handleInlineStyle = (event, style) => {
    event.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const handleBlockStyle = (event, block) => {
    event.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, block))
  }

  const renderInlineStyleButton = (style, index) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle()
    let className = 'toolbar-button'
    if (currentInlineStyle.has(style.type)) {
      className = 'toolbar-button-selected'
    }

    return (
      <IconButton
        key={index}
        title={style.toolTip}
        onMouseDown={(event) => handleInlineStyle(event, style.type)}
        onClick={(event) => event.preventDefault()}
        className={className}
      >
        {style.icon}
      </IconButton>
    )
  }

  const renderBlockStyleButton = (block, index) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState)
    let className = 'toolbar-button'
    if (currentBlockType === block.type) {
      className = 'toolbar-button-selected'
    }

    return (
      <IconButton
        key={index}
        title={block.toolTip}
        onMouseDown={(event) => handleBlockStyle(event, block.type)}
        onClick={(event) => event.preventDefault()}
        className={className}
      >
        {block.icon}
      </IconButton>
    )
  }

  const updatedAtTime = new Date(updatedAt).toLocaleTimeString()

  const editorToolbar = {
    zIndex: '1',
    display: 'flex',
    padding: '0 0.4rem !important',
    justifyContent: 'space-between',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  }

  return (
    <div style={editorToolbar}>
      <div>
        {inlineStyles.map((style, index) => {
          return renderInlineStyleButton(style, index)
        })}
        {blockStyles.map((block, index) => {
          return renderBlockStyleButton(block, index)
        })}
      </div>
      <div>
        <span className='updatedAtTimeFormat'>
          {updatedAt ? <>Edited {updatedAtTime}</> : <>Editing</>}
        </span>
        {switchFor === 'addNote' && (
          <>
            <IconButton onClick={submitNote} title='Save'>
              <SaveIcon sx={{ color: '#01A201' }} />
            </IconButton>
            <IconButton onClick={clearNote} title='Clear'>
              <ClearIcon sx={{ color: '#01A201' }} />
            </IconButton>
          </>
        )}
        {switchFor === 'modaleditor' && (
          <>
            <IconButton onClick={handleDelete} title='Delete'>
              <DeleteIcon sx={{ color: '#01A201' }} />
            </IconButton>
          </>
        )}
      </div>
    </div>
  )
}

export default Toolbar
