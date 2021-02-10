const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

const expect = chai.expect;
chai.use(chaiHttp);


const userCredentials = {
  userName: 'joh@ymail.com',
  password: 'password'
}
// before any test user is logged in 
var authenticatedUser = chai.request.agent(server);
before((done) => {
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end((err, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
});

describe("POST /message", () => {
  it("should  add the message if there is a sender ", (done) => {
    const message = {
      receiver_username: "amy@ymail.com",
      content: "huhueirityiue"
    };
    authenticatedUser
      .post("/message")
      .send(message)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
  it("should not add the message when receiver_username is empty  ", (done) => {
    const message = {
      receiver_username: "",
      content: "huhueirityiue"
    };
    authenticatedUser
      .post("/message")
      .send(message)
      .end((err, response) => {
        response.text.should.be.eq("receiver_username should not be empty!");
        done();
      });
  });
  it("should not add the message when the message is too long ", (done) => {
    const message = {
      receiver_username: "amy@ymail.com",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    };
    authenticatedUser
      .post("/message")
      .send(message)
      .end((err, response) => {
        response.text.should.be.eq("message is too long");
        done();
      });
  });
});

