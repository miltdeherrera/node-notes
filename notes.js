const fs = require('fs')

const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  debugger

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added'))
  } else {
    console.log(chalk.red.inverse('Duplicate found'))
  }
}

const removeNote = title => {
  const notes = loadNotes()
  const filteredNotes = notes.filter(
    note => note.title !== title
  )
  saveNotes(filteredNotes)

  filteredNotes.length === notes.length
    ? console.log(chalk.bgRed('Note not found'))
    : console.log(chalk.bgGreen(`"${title}" deleted`))
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.bgCyan.bold('Your notes:'))
  notes.forEach(note => {
    console.log(note.title)
  })
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const readNote = title => {
  const notes = loadNotes()
  const currentNote = notes.find(note => note.title === title)

  if (currentNote) {
    console.log(chalk.black.bgWhite.bold(currentNote.title))
    console.log(currentNote.body)
  } else {
    console.log(chalk.bgRed('No note found'))
  }
}


module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}