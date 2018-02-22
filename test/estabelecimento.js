process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Estabelecimento = require("../app/models/estabelecimento");
let server = require("../server");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("/GET estabelecimentos", () => {
  it("it should GET all estabelecimentos", done => {
    chai
      .request(server)
      .get("/api/estabelecimentos")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(2226);
        done();
      });
  });
});
