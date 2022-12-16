const { expect } = require('chai');
const { readMovies } = require('../../src/app');

describe('iniciando exercicíos de testes', function () {
  it('testa o retorno da função readeMovies', async function () {
    const movies = await readMovies();
    expect(movies).to.be.instanceOf(Array);
  });
});
