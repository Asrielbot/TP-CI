const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

const contacts = []; // Stockage des contacts en mémoire

app.get("/", (req, res) => {
  res.send("Welcome to the Contact Manager API");
});

app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const newContact = { id: contacts.length + 1, name, email, phone };
  contacts.push(newContact);
  res.status(201).send(newContact);
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports = app;
