const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");
const Bill = require("../../models/Bill");

chai.should();
chai.use(chaiHttp);

describe("Test CHARGE BILL route. POST /api/bills", () => {
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
    Bill.collection.drop();
    done();
  });

  it("should create a bill", (done) => {
    const data = {
      customerName: "John Doe",
      phone: "0712345678",
      paymentMethod: "CASH",
      subtotal: 100,
      tax: 10,
      total: 110,
      cartItems: [
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8f8",
          name: "Test",
          price: 100,
          quantity: 1,
          image: "https://via.placeholder.com/150",
          category: "Test",
          updatedAt: "2020-05-06T13:41:00.000Z",
          createdAt: "2020-05-06T13:41:00.000Z",
          __v: 0,
        },
      ],
    };
    chai
      .request(server)
      .post("/api/bills")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have
          .property("message")
          .eql("Bill charged successfully");
        response.body.bill.should.have
          .property("customerName")
          .eql(data.customerName);
        response.body.bill.should.have.property("phone").eql(data.phone);
        response.body.bill.should.have
          .property("paymentMethod")
          .eql(data.paymentMethod);
        response.body.bill.should.have.property("subtotal").eql(data.subtotal);
        response.body.bill.should.have.property("tax").eql(data.tax);
        response.body.bill.should.have.property("total").eql(data.total);
        done();
      });
  });
});
