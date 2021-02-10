module.exports = (db) => {

  const userLikes = (tweet_id,user_id) => {
   return db.query(`INSERT INTO
   likes(tweet_id, user_id)
    VALUES ($1, $2) RETURNING *`,
    [tweet_id,user_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err)); 
  }

  const getUserLikes = (user_id) => {
    return db.query(`SELECT tweets.tweet,users.userName 
    FROM tweets
     JOIN likes ON likes.tweet_id = tweets.id
     JOIN users ON likes.user_id = users.id
     WHERE likes.user_id = $1`,
    [user_id])
    .then(res => res.rows)
    .catch(err => console.log(err)); 
  }

  const unLikeTweet = (tweet_id,user_id) => {
    return db.query(`DELETE FROM likes
    WHERE tweet_id = $1 and user_id = $2`,
    [tweet_id,user_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err)); 
  }

  return {
    userLikes,
    getUserLikes,
    unLikeTweet
  };
  }