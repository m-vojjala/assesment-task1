INSERT INTO
  users( userName, password)
VALUES
  ('joh@ymail.com', 'password');

INSERT INTO
  users(userName, password)
VALUES
  ('amy@ymail.com', 'password');

INSERT INTO
  users( userName, password)
VALUES
  ('alice@gmail.com', 'password');

INSERT INTO messages (sender_username,sender_id,receiver_username,receiver_id,content) VALUES('amy@ymail.com',2,'alice@gmail.com',3,'Hey! Wassup!');

INSERT INTO messages (sender_username,sender_id,receiver_username,receiver_id,content) VALUES('alice@gmail.com',3,'joh@ymail.com',1,'Hello,How are you?');

INSERT INTO messages (sender_username,sender_id,receiver_username,receiver_id,content) VALUES('alice@gmail.com',3,'joh@ymail.com',1,'Hello');

INSERT INTO tweets (tweet,created_by,created_date) VALUES ('BLAH BLAH BLAH',3,'02/10/2021');

INSERT INTO tweets (tweet,created_by,created_date) VALUES ('BLAH BLAH BLAH',2,'02/10/2021');

INSERT INTO tweets (tweet,created_by,created_date) VALUES ('BLAH BLAH BLAH',3,'02/10/2021');

INSERT INTO tweets (tweet,created_by,created_date) VALUES ('lololololol',2,'02/10/2021');

INSERT INTO tweets (tweet,created_by,created_date) VALUES ('pooppoooo',1,'02/10/2021');

INSERT INTO likes (tweet_id,user_id) VALUES (1,2);

INSERT INTO likes (tweet_id,user_id) VALUES (2,3);

INSERT INTO likes (tweet_id,user_id) VALUES (1,3);

INSERT INTO likes (tweet_id,user_id) VALUES (4,3);

INSERT INTO likes (tweet_id,user_id) VALUES (3,2)
