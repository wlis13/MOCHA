const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const chaiHttp = require('chai-http');
const { readMovies, app } = require('../../src/app');

chai.use(chaiHttp);

const mockFile = JSON.stringify({
  brands: [
    {
      id: 1,
      name: 'Lindt & Sprungli',
    },
    {
      id: 2,
      name: 'Ferrero',
    },
    {
      id: 3,
      name: 'Ghirardelli',
    },
  ],
  chocolates: [
    {
      id: 1,
      name: 'Mint Intense',
      brandId: 1,
    },
    {
      id: 2,
      name: 'White Coconut',
      brandId: 1,
    },
    {
      id: 3,
      name: 'Mon Chéri',
      brandId: 2,
    },
    {
      id: 4,
      name: 'Mounds',
      brandId: 3,
    },
  ],
});

const mockFileSinon = JSON.stringify({
  chocolates: [
    {
      id: 1,
      name: 'Mint Intense',
      brandId: 1,
    },
    {
      id: 2,
      name: 'White Coconut',
      brandId: 1,
    },
    {
      id: 3,
      name: 'Mon Chéri',
      brandId: 2,
    },
    {
      id: 4,
      name: 'Mounds',
      brandId: 3,
    },
  ],
});

describe('test função readMovies', function () {
  it('testa o retorno da função readeMovies', async function () {
    const movies = await readMovies();
    expect(movies).to.be.instanceOf(Array);
  });
});

// eslint-disable-next-line mocha/no-identical-title, mocha/max-top-level-suites
describe('test função readMovies', function () {
  it('testa o retorno da função readeMovies com sinon', async function () {
    sinon.stub(fs.promises, 'readFile').resolves(mockFileSinon);
    const movies = await readMovies();
    expect(movies.chocolates).to.be.instanceOf(Array);
    expect(movies.chocolates).to.be.lengthOf(4);
  });
});

afterEach(function () {
  sinon.restore();
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

describe('POST/movies/search/:id ', function () {
  it('test', async function () {
    const promise = await chai.request(app).post(`/movies/search/${ 1 }`);

    expect(promise.status).to.be.equal(201);
    expect(promise.body).to.haveOwnProperty('showMovie');
    expect(promise.body.showMovie).to.haveOwnProperty('movie');
    expect(promise.body.showMovie).to.haveOwnProperty('price');
  });
});
