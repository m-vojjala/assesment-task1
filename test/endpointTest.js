const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

describe('Authentication of users', () => {
  // Test to post new user to the database
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

describe("POST /message", () => {
  it("should not add the message if there is no sender ", (done) => {
    const user = {
      receiver_username: "Ali@m.com",
      content: "hi"
    };
    chai.request(server)
      .post("/message")
      .send(user)
      .end((err, response) => {
        response.text.should.be.eq("Please login!");
        done();
      });
  });
});

describe("POST /user/tweet", () => {
  it("should validate the tweet length ", () => {
    const tweet = {
      tweet: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the "
    };
    chai.request(server)
      .post("/user/tweet")
      .send(tweet)
      .end((err, response) => {
        response.text.should.be.eq("Tweet is too long!");
      
      });
  });
});

describe("GET /tweets", () => {
  it("get all the tweets", () => {
    chai.request(server)
      .get("/tweets")
      .end((err, response) => {
        response.body.should.be.a('array');
      });
  });
});










