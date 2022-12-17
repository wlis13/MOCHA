const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { readMovies, app } = require('../../src/app');

chai.use(chaiHttp);

describe('test função readMovies', function () {
  it('testa o retorno da função readeMovies', async function () {
    const movies = await readMovies();
    expect(movies).to.be.instanceOf(Array);
  });

  describe('Teste GET/movies', function () {
    it('testa se é retornado a lista completa de filmes', async function () {
      const response = await chai.request(app).get('/movies');
      expect(response.status).to.be.equals(200);
      expect(response.body).to.haveOwnProperty('movies');
      expect(response.body.movies).to.be.instanceOf(Array);
    });
  });

  describe('POST/movie', function () {
    it('testa se o valor é inserido corretamente', async function () {
      const result = await chai.request(app).post('/movies');
      const { movie } = result.body;
      expect(result.status).to.be.equal(201);

      const getMovie = movie.filter((iten) => iten.id <= 11);

      getMovie.forEach((iten) => {
        expect(iten).to.haveOwnProperty('id');
        expect(iten).to.haveOwnProperty('movie');
        expect(iten).to.haveOwnProperty('price');
      });
    });
  });
});
