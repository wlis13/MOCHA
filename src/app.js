const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const PATH_MOVIES = '../movies.json';

const app = express();

async function readMovies() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, PATH_MOVIES));
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error(`Não foi possível concluir a leitura ${ error }`);
  }
}

module.exports = {
  app,
  readMovies,
};