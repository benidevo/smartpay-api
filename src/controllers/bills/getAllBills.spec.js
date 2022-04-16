const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../../../server");
const User = require("../../models/User");
const Bill = require("../../models/Bill");

chai.should();
chai.use(chaiHttp);

describe("Test RETRIEVE ALL BILLS route. GET /api/bills", () => {
  let user;
  let token;
  let billsData;
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
            billsData = {
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
              .send(billsData)
              .end((err, response) => {
                done();
              });
          });
      });
  });

  after((done) => {
    User.collection.drop();
    Bill.collection.drop();
    done();
  });

  it("should create a bill", (done) => {
    chai
      .request(server)
      .get("/api/bills")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have
          .property("message")
          .eql("Bills retrieved successfully");
        response.body.should.have.property("bills");
        response.body.bills.should.be.a("array");
        response.body.bills.length.should.be.eql(1);
        response.body.bills[0].should.have
          .property("customerName")
          .eql(billsData.customerName);
        response.body.bills[0].should.have
          .property("phone")
          .eql(billsData.phone);
        response.body.bills[0].should.have
          .property("paymentMethod")
          .eql(billsData.paymentMethod);
        response.body.bills[0].should.have
          .property("subtotal")
          .eql(billsData.subtotal);
        done();
      });
  });
});
