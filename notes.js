const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(x => x.title === title);

    if (duplicateNote){
        console.log(chalk.red('Note Title Taken, Please Try another'));
    } else {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('Note Added Successfully'));
    }
}

const removeNote = (title) => {
    let notes = loadNotes();
    const noteIndex = notes.findIndex(x => x.title == title)
    if (noteIndex > -1) {
        notes = notes.filter(x => x.title !== title);
        saveNotes(notes);
        console.log(chalk.green('Note Removed Successfully'))
    } else {
        console.log(chalk.red('No Note found with title:', title));
    }
}

const listNotes = () => {
    console.log(chalk.bold('NOTES LIST :'));
    loadNotes().forEach((note, index) => {
        console.log(chalk.bold(index + 1 + '. ') + note.title);
    });
}

const readNote = (title) => {
    const note = loadNotes().find(x => x.title == title);
    if (note) {
        console.log(chalk.bold.inverse(note.title + ': '));
        console.log(note.body);
    } else {
        console.log(chalk.red('No Note found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer.toString());
    } catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};