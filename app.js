const morgan = require("morgan");
const express = require("express");
const { success, getUniqueId } = require("./helper");
const bodyParser = require("body-parser");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log(`URL : ${req.url}`);
  next();
};

// Middleware custom
// app.use(logger);

// Middleware library
app.use(morgan("dev")).use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello Express nodemon"));
app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokemon à été trouvé";
  // Format en JSON et ajoute le type MIME
  res.json(success(message, pokemon));
});
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokémons a bien été récupérée.";
  res.json(success(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} à été crée`;
  res.json(success(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });

  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});
app.listen(port, () =>
  console.log(`Application lancé sur : http://localhost:${port}`)
);
