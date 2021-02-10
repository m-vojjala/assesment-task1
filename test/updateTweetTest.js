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

describe("PUT /tweet", () => {
  it("update tweet", () => {
    const tweet = {
      tweet: "Hello there! "
    };
    authenticatedUser
      .put(`/user/tweet/${4}`)
      .send(tweet)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
      });
  });
  it("should show an error if tweet length is more than 140 characters", () => {
    const tweet = {
      tweet: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "
    };
    authenticatedUser
      .put(`/user/tweet/${4}`)
      .send(tweet)
      .end((err, response) => {
        response.text.should.be.eq("Tweet is too long!");
      });
  });
});
