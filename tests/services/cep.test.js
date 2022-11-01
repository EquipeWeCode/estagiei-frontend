const request = require('supertest');
const assert = require('assert');

const cepUrl = 'https://viacep.com.br/ws';

describe('GET /cep [testando comunicacao com a api]', function() {
    it('Deve retornar 200 OK', function(done) {
      request(cepUrl)
        .get('/01001000/json/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

