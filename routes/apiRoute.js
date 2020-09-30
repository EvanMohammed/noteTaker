let db = require("../db/db.json");
const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { isBuffer } = require("util");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    return res.json(db);
  });

  app.post("/api/notes", function (req, res) {
    let note = req.body;
    note.id = uuidv4();
    db.push(note);

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(db),
      (err) => {
        if (err) {
          console.log(err);
        }
        res.json(true);
      }
    );
  });

  app.delete("/api/notes/:id", function (req, res) {
    let selectedNoteId = req.params.id;
    console.log(selectedNoteId);
    db = db.filter((note) => note.id !== selectedNoteId);

    console.log(db);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(db),
      (err) => {
        if (err) {
          console.log(err);
        }
        res.json(true);
      }
    );
  });
};
