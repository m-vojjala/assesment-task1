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

describe("POST /user/tweet/like/tweetId", () => {
  it("should like tweet", () => {
    authenticatedUser
      .post(`/user/tweet/like/${5}`)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
});
