const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

const expect = chai.expect;
chai.use(chaiHttp);

//let's set up the data we need to pass to the login method
const userCredentials = {
  userName: 'joh@ymail.com',
  password: 'password'
}
//now let's login the user before we run any tests
var authenticatedUser = chai.request.agent(server);
before(function (done) {
  authenticatedUser
    .post('/login')
    .send(userCredentials)
    .end(function (err, response) {
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
});

