const request = require('supertest');
const assert = require('assert');

const cepUrl = 'https://servicodados.ibge.gov.br/api/v1';

describe('GET /localidades/estados/ [testando comunicacao com a api]', function() {
    it('Deve retornar 200 OK', function(done) {
      request(cepUrl)
        .get('/localidades/estados/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

