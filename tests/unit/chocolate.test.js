const sinon = require('sinon');
const fs = require('fs');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../../src/app');

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

describe('GET/chocolates', function () {
  it('test show chocolates', async function () {
    const result = await chai.request(app).get('/chocolates');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.haveOwnProperty('chocolates');
    expect(result.body.chocolates).to.haveOwnProperty('brands');
    expect(result.body.chocolates).to.haveOwnProperty('chocolates');
  });
});

// eslint-disable-next-line mocha/max-top-level-suites
describe('teste usando sinon', function () {
  it('test simalção com sinon', async function () {
    sinon.stub(fs.promises, 'readFile').resolves(mockFile);
    const result = await chai.request(app).get('/chocolates');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.haveOwnProperty('chocolates');
    expect(result.body.chocolates).to.haveOwnProperty('brands');
    expect(result.body.chocolates).to.haveOwnProperty('chocolates');
  });
});
