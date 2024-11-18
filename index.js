const form = document.getElementById('note-form');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const notesList = document.getElementById('notes-list');
const clearAllBtn = document.getElementById('clear-all');

//Hämta anteckningar från LocalStorage
function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Spara anteckningar till LocalStorage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Funktion för att spara en ny anteckning
function saveNewNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();

    // Kontrollera om titel eller innehåll är tomt
    if (title === '' && content === '') {
        alert('Du måste fylla i både titel och innehåll.');
    } else if (title === '') {
        alert('Du måste fylla i en titel.');
    } else if (content === '') {
        alert('Du måste fylla i innehåll.');
    } else {
        // Skapa en ny anteckning om allt är ifyllt
        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
            timestamp: new Date().toLocaleString()
        };

        const notes = getNotes();
        notes.push(newNote);
        saveNotes(notes);

        alert('Anteckning sparad!');
        document.getElementById('note-form').reset();
        displayNotes();
    }
}

// Funktion för att visa alla anteckningar
function displayNotes() {
    const notes = getNotes();
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <div class="note-header">
                <span class="note-title">${note.title}</span>
                <span class="note-timestamp">${note.timestamp}</span>
                <button onclick="deleteNoteByIndex(${index})">Ta bort</button>
            </div>
            <p class="note-content">${note.content}</p>
        `;
        notesList.appendChild(noteDiv);
    });
}

// Funktion för att ta bort en anteckning baserat på index
function deleteNoteByIndex(index) {
    const notes = getNotes();
    notes.splice(index, 1); // Ta bort anteckning vid angivet index
    saveNotes(notes);
    displayNotes();
}

// Funktion för att ta bort alla anteckningar
function clearAllNotes() {
    if (confirm('Är du säker på att du vill ta bort alla anteckningar?')) {
        localStorage.removeItem('notes');
        displayNotes();
    }
}

// Event-lyssnare för att spara en ny anteckning
document.getElementById('note-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra sidladdning
    saveNewNote();
});

// Event-lyssnare för att ta bort alla anteckningar
document.getElementById('clear-all').addEventListener('click', clearAllNotes);

// Visa anteckningar när sidan laddas
displayNotes();
