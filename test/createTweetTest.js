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

describe("POST /user/tweet", () => {
  it("create new tweet", (done) => {
    const tweet = {
      tweet: "Contrary to popular belief, Lorem Ipsum is not simply random text. "
    };
    authenticatedUser
      .post(`/user/tweet`)
      .send(tweet)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });

  it("should validate the length of the tweet ", (done) => {
    const tweet = {
      tweet: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the "
    };
    authenticatedUser
      .post(`/user/tweet`)
      .send(tweet)
      .end((err, response) => {
        response.text.should.be.eq("Tweet is too long!");
        done();
      });
  });
});
