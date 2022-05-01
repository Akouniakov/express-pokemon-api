const pokemons = require("./mock-pokemon");
const morgan = require("morgan");
const express = require("express");
const { succes } = require("./helper");

const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log(`URL : ${req.url}`);
  next();
};

app.use(logger);

app.get("/", (req, res) => res.send("Hello Express nodemon"));
app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon à été trouvé";
  // Format en JSON et ajoute le type MIME
  res.json(succes(message, pokemon));
});
app.get("/api/pokemons", (req, res) => {
  res.send(`Il y a ${pokemons.length} acutellement`);
});
app.listen(port, () =>
  console.log(`Application lancé sur : http://localhost:${port}`)
);
