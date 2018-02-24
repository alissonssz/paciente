process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Estabelecimento = require("../app/models/estabelecimento");
let server = require("../server");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET ranking", () => {
  it("it should GET the ranking", done => {
    chai
      .request(server)
      .get("/api/ranking")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("presencaEquipe");
        res.body.should.have.property("tempoEspera");
        res.body.should.have.property("qualidadeAtendimento");
        res.body.should.have.property("medicamentos");
        res.body.should.have.property("equipamentos");
        res.body.should.have.property("infraestrutura");
        done();
      });
  });
});

describe("/GET ranking/:id", () => {
  it("it should GET a specific complete ranking", done => {
    chai
      .request(server)
      .get("/api/ranking/qualidadeAtendimento")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
