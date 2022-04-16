const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");

chai.should();
chai.use(chaiHttp);

describe("Test REGISTER route /api/auth/register", () => {


  after((done) => {
    User.collection.drop();
    done();
  });
  it("should register a new user", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send({
        name: "example",
        email: "example1@gmail.com",
        password: "Test4321",
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have
          .property("message")
          .eql("Registration successful");
        done();
      });
  });
});
