const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");
const Product = require("../../models/Product");

chai.should();
chai.use(chaiHttp);

describe("Test ADD PRODUCT route. POST /api/products", () => {
  let user;
  let token;
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
        chai
          .request(server)
          .post("/api/auth/login")
          .send({ email: user.email, password: user.password })
          .end((err, response) => {
            token = response.body.accessToken;
            done();
          });
      });
  });

  after((done) => {
    User.collection.drop();
    Product.collection.drop();
    done();
  });

  it("should create a product", (done) => {
    const productData = {
      name: "Oranges",
      price: 2,
      category: "Fruits",
      image: "https://via.placeholder.com/150",
    };
    chai
      .request(server)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("success").eql(true);
        response.body.should.have.property("message").eql("product created");
        response.body.should.have.property("product");
        response.body.product.should.have
          .property("name")
          .eql(productData.name);
        response.body.product.should.have
          .property("price")
          .eql(productData.price);
        response.body.product.should.have
          .property("category")
          .eql(productData.category);
        done();
      });
  });
});
