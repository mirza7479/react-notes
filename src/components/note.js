import React, { useState } from 'react'

function Note({ note, onNoteUpdate, onNoteDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleBodyChange = (event) => {
    setBody(event.target.value)
  }

  const handleNoteSave = () => {
    onNoteUpdate(note.id, {
      title,
      body,
      dateModified: new Date().toISOString(),
    })
    setIsEditing(false)
  }

  const handleNoteCancel = () => {
    setTitle(note.title)
    setBody(note.body)
    setIsEditing(false)
  }

  const handleNoteDelete = () => {
    onNoteDelete(note.id)
  }

  if (isEditing) {
    return (
      <>
        <div class="tab">
          <input
            type="checkbox"
            className="selection"
            id={note.title}
            name="rd"
            style={{ display: 'none' }}
          />
          <label class="tab-label" for={note.title}>
            <div className="buttons">
              <button className="edit" onClick={handleNoteSave}>
                <i className="fa fa-save" />
              </button>
              <button className="delete" onClick={handleNoteCancel}>
                <i className="fa fa-times" />
              </button>
            </div>
            <input
              type="text"
              className="editable"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <textarea value={body} onChange={handleBodyChange} />
        </div>
      </>
    )
  }

  return (
    <>
      <div class="tab">
        <input
          type="checkbox"
          className="selection"
          id={note.title}
          name="rd"
          style={{ display: 'none' }}
        />
        <label class="tab-label" for={note.title}>
          <div className="buttons">
            <button className="edit" onClick={() => setIsEditing(true)}>
              <i className="fa fa-pencil" />
            </button>
            <button className="delete" onClick={handleNoteDelete}>
              <i className="fa fa-trash" />
            </button>
          </div>
          {note.title}
        </label>

        <div class="tab-content">
          {note.body}

          <div className="note-footer">
            <p className="span-sort pad">
              Created: {new Date(note.dateCreated).toLocaleString()}
            </p>
            {note.dateModified && (
              <p className="span-sort pad">
                Modified: {new Date(note.dateModified).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Note
