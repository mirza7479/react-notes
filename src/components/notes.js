import React, { useEffect, useState } from 'react'
import Note from './note'
import NoteForm from './noteForm'
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    setNotes(
      localStorage.getItem('notes')
        ? JSON.parse(localStorage.getItem('notes'))
        : [],
    )
  }, [])

  const updateLocalStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  const handleNoteCreate = (newNote) => {
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
    updateLocalStorage(newNotes)
  }

  const handleNoteUpdate = (id, updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...updatedNote }
      }
      return note
    })
    setNotes(updatedNotes)
    updateLocalStorage(updatedNotes)
  }

  const handleNoteDelete = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id)
    setNotes(filteredNotes)
    updateLocalStorage(filteredNotes)
  }

  const [searchText, setSearchText] = useState('')

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.body.toLowerCase().includes(searchText.toLowerCase()),
  )

  const [sortType, setSortType] = useState('default')

  const handleSortTypeChange = (event) => {
    setSortType(event.target.value)
  }

  const sortedNotes = filteredNotes.slice().sort((a, b) => {
    switch (sortType) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'dateCreated':
        return new Date(b.dateCreated) - new Date(a.dateCreated)
      case 'dateModified':
        return new Date(b.dateModified) - new Date(a.dateModified)
      default:
        return 0
    }
  })

  return (
    <div className="notes">
      <h1 className="h1">Notes</h1>
      <NoteForm onNoteCreate={handleNoteCreate} />

      <div className="notes-container">
        <div className="filters">
          <div className="notes-search">
            <input
              type="text"
              placeholder="Search notes"
              className="input small"
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </div>
          <div className="notes-sort">
            <label htmlFor="sort-type" className="span-sort">
              Sort by:
            </label>
            <select
              id="sort-type"
              className="input small select"
              value={sortType}
              onChange={handleSortTypeChange}
            >
              <option value="default" disabled>
                Default
              </option>
              <option value="title">Title</option>
              <option value="dateCreated">Date created</option>
              <option value="dateModified">Date modified</option>
            </select>
          </div>
        </div>
        <ul className="notes-list">
          {sortedNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onNoteUpdate={handleNoteUpdate}
              onNoteDelete={handleNoteDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Notes
