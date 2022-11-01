const request = require('supertest');
const assert = require('assert');
const ROOT_URL = "localhost:3000/api";

const data = {
    email: "teste@gmail.com",
    senha: "12345678",
    avatar: "https://dummyimage.com/600x400/000/fff&text=company",
    razaoSocial: "teste",
    nomeFantasia: "teste",
    cnpj: "50368351000228",
    endereco: {
        cep: "76804149",
        estado: "RO",
        cidade: "Porto Velho",
        bairro: "Nossa Senhora das Graças",
        logradouro: "Avenida Governador Jorge Teixeira",
        numero: "21",
        complemento: "teste",
        pontoReferencia: "teste"
    }
}

describe('POST /empresa [testando a funcionalidade de criar empresas]', function() {
    it('Deve retornar 201 OK', function(done) {
      request(ROOT_URL)
        .post('/empresa/')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

