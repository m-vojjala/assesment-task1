const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

const expect = chai.expect;
chai.use(chaiHttp);


const userCredentials = {
  userName: 'amy@ymail.com',
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

describe("GET /user/tweets/likes", () => {
  it("should get all liked tweets of a user", () => {
    authenticatedUser
      .get(`/user/tweets/likes`)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
