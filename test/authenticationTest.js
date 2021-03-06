const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

// tests for register and login end points 
describe('Authentication of users', () => {
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
    it("should not add new user to the database if user already exists", (done) => {
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
    it("should not register the new user if email is empty ", (done) => {
      const user = {
        userName: "",
        password: "1234"
      };
      chai.request(server)
        .post("/register")
        .send(user)
        .end((err, response) => {
          response.text.should.be.eq("Email should not be empty!")
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
          response.text.should.be.eq("Login success");
          done();
        });
    });
  });
});















