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

describe("POST /user/tweet/like/tweetId", () => {
  it("should like a tweet", () => {
    authenticatedUser
      .post(`/user/tweet/like/${2}`)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
