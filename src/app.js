const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const PATH_MOVIES = '../movies.json';

const app = express();
app.use(express.json());

async function readMovies() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, PATH_MOVIES));
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(`Não foi possível concluir a leitura ${ error }`);
  }
}

async function setMovie(newMovie) {
  const data = await readMovies();
  const concatMovie = [...data, newMovie];
  const stringMovie = JSON.stringify(concatMovie);
  try {
    await fs.writeFile(path.resolve(__dirname, PATH_MOVIES), stringMovie);
    return concatMovie;
  } catch (error) {
    console.error(`error ${ error }`);
  }
}

async function replaceMovie(id) {
  const data = await readMovies();
  const replaceData = data.find((iten) => iten.id === Number(id));
  try {
    return replaceData;
  } catch (error) {
    console.error(`error ${ error }`);
  }
}

app.get('/movies', async (req, res) => {
  const showMovies = await readMovies();

  res.status(200).json({ movies: showMovies });
});

app.post('/movies', async (req, res) => {
  const getMovies = await readMovies();
  const id = getMovies.length + 1;
  const { movie, price } = req.body;
  const newMovie = {
    id,
    movie,
    price,
  };

  const resMovie = await setMovie(newMovie);

  res.status(201).json({ movie: resMovie });
});

app.post('/movies/search/:id', async (req, res) => {
  const { id } = req.params;
  const getMovieFromId = await replaceMovie(id);
  res.status(201).json({ showMovie: getMovieFromId });
});

module.exports = {
  app,
  readMovies,
};