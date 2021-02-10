const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

const expect = chai.expect;
chai.use(chaiHttp);

//let's set up the data we need to pass to the login method
const userCredentials = {
  userName: 'amy@ymail.com',
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

describe("GET /user/tweets/likes", () => {
  it("should get all liked tweets of a user", () => {
    authenticatedUser
      .get(`/user/tweets/likes`)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
