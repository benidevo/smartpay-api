const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");
const Product = require("../../models/Product");

chai.should();
chai.use(chaiHttp);

describe("Test UPDATE PRODUCT route. PATCH /api/products/:id", () => {
  let user;
  let token;
  let productId;
  before((done) => {
    user = {
      name: "example",
      email: "user@gmail.com",
      password: "Test4321",
    };
    const productData = {
      name: "Oranges",
      price: 2,
      category: "Fruits",
      image: "https://via.placeholder.com/150",
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

  it("should update a product", (done) => {
    const updatedProductData = {
      name: "Beef",
      price: 3,
      category: "Meat",
      image: "https://via.placeholder.com/153",
    };
    chai
      .request(server)
      .patch(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Beef",
        price: 3,
        category: "Meat",
        image: "https://via.placeholder.com/153",
      })
      .end((err, productRes) => {
        productRes.should.have.status(200);
        productRes.body.should.be.a("object");
        productRes.body.should.have.property("success").eql(true);
        productRes.body.should.have
          .property("message")
          .eql("Product updated successfully");
        productRes.body.should.have.property("product");
        productRes.body.product.should.have
          .property("name")
          .eql(updatedProductData.name);
        productRes.body.product.should.have
          .property("price")
          .eql(updatedProductData.price);
        productRes.body.product.should.have
          .property("category")
          .eql(updatedProductData.category);
        done();
      });
  });
});
