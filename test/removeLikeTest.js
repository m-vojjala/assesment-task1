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

describe("DELETE /user/tweet/unlike/tweetId", () => {
  it("should unlike the tweet", () => {
    authenticatedUser
      .delete(`/user/tweet/unlike/${2}`)
      .end((err, response) => {
        expect(response.statusCode).to.equal(204);
      });
  });
});
