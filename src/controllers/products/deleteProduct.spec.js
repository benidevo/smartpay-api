const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");
const Product = require("../../models/Product");

chai.should();
chai.use(chaiHttp);

describe("Test DELETE PRODUCT route. DELETE /api/products/:id", () => {
  let user;
  let token;
  let productId;
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
          .end((err, res) => {
            token = res.body.accessToken;
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
                productId = response.body.product._id;
                done();
              });
          });
      });
  });

  after((done) => {
    User.collection.drop();
    Product.collection.drop();
    done();
  });

  it("should delete a product", (done) => {
    chai
      .request(server)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("success").eql(true);
        response.body.should.have.property("message").eql("product deleted");
        done();
      });
  });
});
