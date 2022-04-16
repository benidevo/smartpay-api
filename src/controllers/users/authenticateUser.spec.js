const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");

chai.should();
chai.use(chaiHttp);

describe("Test LOGIN route /api/auth/login", () => {
  let user;
  before((done) => {
    user = {
      name: "example",
      email: "user@gmail.com",
      password: "Test4321",
    };
    chai
      .request(server)
      .post("/api/auth/register")
      .send(user)
      .end((_, __) => {
        done();
      });
  });

  after((done) => {
    User.collection.drop();
    done();
  });

  it("should authenticate a user", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("message").eql("Login successful");
        response.body.should.have.property("accessToken");
        response.body.accessToken.should.not.be.empty;
        done();
      });
  });
});
