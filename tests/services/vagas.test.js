const ROOT_URL = "https://estagiei.herokuapp.com/api";
const request = require('supertest');
const assert = require('assert');

describe('GET /vaga', function() {
    it('Deve retornar 200 OK', function(done) {
      request(ROOT_URL)
        .get("/vaga")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});