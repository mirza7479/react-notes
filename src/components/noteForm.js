import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function NoteForm({ onNoteCreate }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleBodyChange = (event) => {
    setBody(event.target.value)
  }

  const handleNoteCreate = () => {
    if (title.trim() && body.trim()) {
      const newNote = {
        id: uuidv4(),
        title,
        body,
        dateCreated: new Date().toISOString(),
      }
      onNoteCreate(newNote)
      setTitle('')
      setBody('')
    }
  }

  return (
    <div className="note-form">
      <h2>New Note</h2>
      <input
        className="input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        className="body"
        placeholder="Description"
        value={body}
        onChange={handleBodyChange}
      ></textarea>
      <button onClick={handleNoteCreate} className="create">
        Create
      </button>
    </div>
  )
}

export default NoteForm
