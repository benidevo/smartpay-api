const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");
const Product = require("../../models/Product");

chai.should();
chai.use(chaiHttp);

describe("Test RETRIEVE PRODUCTS BY CATEGORY route. GET /api/products/category/:name", () => {
  let user;
  let token;
  let productId;
  let productData;
  let fruitCategory;
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
            productData = {
              name: "Beef",
              price: 7,
              category: "Meat",
              image: "https://via.placeholder.com/100",
            };
            chai
              .request(server)
              .post("/api/products")
              .set("Authorization", `Bearer ${token}`)
              .send(productData)
              .end((err, response) => {
                fruitCategory = {
                  name: "Oranges",
                  price: 2,
                  category: "Fruits",
                  image: "https://via.placeholder.com/150",
                };
                chai
                  .request(server)
                  .post("/api/products")
                  .set("Authorization", `Bearer ${token}`)
                  .send(fruitCategory)
                  .end((err, response) => {
                    productId = response.body.product._id;
                    done();
                  });
              });
          });
      });
  });

  after((done) => {
    User.collection.drop();
    Product.collection.drop();
    done();
  });

  it("should retrieve all products", (done) => {
    chai
      .request(server)
      .get(`/api/products/category/${fruitCategory.category}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("products retrieved successfully");
        res.body.should.have.property("products");
        res.body.products.should.be.a("array");
        res.body.products.length.should.be.eql(1);
        res.body.products[0].should.have.property("_id").eql(productId);
        res.body.products[0].should.have
          .property("name")
          .eql(fruitCategory.name);
        res.body.products[0].should.have
          .property("price")
          .eql(fruitCategory.price);
        res.body.products[0].should.have
          .property("category")
          .eql(fruitCategory.category);
        res.body.products[0].should.have
          .property("image")
          .eql(fruitCategory.image);
        done();
      });
  });
});
