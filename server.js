const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC FOLDER
app.use(express.static("public"));

// ROUTES
require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

// LISTEN
app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});
