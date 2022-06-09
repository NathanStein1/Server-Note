// Require the packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const {v4:uuidv4} = require('uuid');
// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Get
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data))
  })

});

app.get('/notes', (req, res) => {
  console.log(path.join(__dirname, '/public/notes.html'));
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});
// Create unique ID and post
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let newNote = req.body;
    newNote.id= uuidv4()
    let notes = JSON.parse(data)
    notes.push(newNote);
  
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(newNote)
  })
  })
})
// Delete function
app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    let notes = JSON.parse(data);
    let filterNotes = notes.filter(note => note.id !== req.params.id)
    
  
  fs.writeFile('./db/db.json', JSON.stringify(filterNotes), (err) => {
    if (err) throw err;
    res.json(filterNotes)
  })
  })
})


app.listen(PORT, () => {
  console.log(`App at http://localhost:${PORT}`);
});


