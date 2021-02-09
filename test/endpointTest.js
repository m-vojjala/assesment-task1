const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

chai.use(chaiHttp);



describe('Authentication of users', () => {
  // Test to post new Register to the database
  describe("POST /register", () => {
    it("should add new user to the database", (done) => {
      const user = {
        userName: "Ali@m.com",
        password: "1234"
      };
      chai.request(server)
        .post("/register")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it("should not add new user to the database if user exists", (done) => {
      const user = {
        userName: "Ali@m.com",
        password: "1234"
      };
      chai.request(server)
        .post("/register")
        .send(user)
        .end((err, response) => {
          response.text.should.be.eq("user already exists!")
          done();
        });
    });
  });
  describe("POST /login", () => {
    it("user should successfully login ", (done) => {
      const user = {
        userName: "Ali@m.com",
        password: "1234"
      };
      chai.request(server)
        .post("/login")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
  it('should create user session for valid user', (done) => {
    const user = {
      id: "7",
      userName: "Ali@m.com",
      password: "1234"
    };
    chai.request(server)
      .post('/login')
      .set('Cookie', user.id = 7)
      .send(user)
      .end(function (err, response) {
        response.should.have.status(200);
        done();
      });
  });
});
