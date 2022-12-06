const yargs = require('yargs')
const chalk = require('chalk')
const { readNote } = require('./notes')
const notes = require('./notes')

// customize yargs version
yargs.version('1.1.0')

// add a new note
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// remove a note
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

// list command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler()  {
    notes.listNotes()
  }
})

// read command
yargs.command({
  command: 'read',
  describe: 'Read a single note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    readNote(argv.title)
  }
})

// add, remove, read indiv notes, list all notes

yargs.parse()