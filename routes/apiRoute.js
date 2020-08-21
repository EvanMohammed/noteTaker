let fs = require("fs");
let notes = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(notes);
    })
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        newNote.id = uuidv4();
        notes.push(newNote);
        fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) => {
          
            res.json(newNote);
            
        })
    })
    app.delete("/api/notes/:id", function (req, res) {
        let deleteNote = req.param.id;
        notes.splice(deleteNote, 1)
        fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) => {
           
            console.log("Deleted this note" + deleteNote);
            res.sendFile(path.join(__dirname, "public/index.html"))
        })
    })
}