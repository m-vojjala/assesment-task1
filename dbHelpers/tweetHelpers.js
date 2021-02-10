const { use } = require("../server");

module.exports = (db) => {

  const createTweet = (tweet,user_id,created_date) =>{
    return db.query(`INSERT INTO 
    tweets (tweet,created_by,created_date)
    VALUES ($1,$2,$3) RETURNING *`,
    [tweet,user_id,created_date])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
  }

  const readAllTweets = () =>{
    return db.query(`SELECT * FROM tweets`)
    .then(res => res.rows)
    .catch(err => console.log(err));
  }

  const readTweet  = (tweet_id,user_id) =>{
    return db.query(`SELECT tweet FROM tweets WHERE tweets.id = $1 AND created_by = $2`,[tweet_id,user_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
  }
  
  const updateTweet = (tweet,tweet_id,user_id,created_date) =>{
      return db.query(`UPDATE tweets
      SET tweet = $1 WHERE tweets.id = $2 AND created_by = $3 AND created_date = $4
      RETURNING *`,
      [tweet,tweet_id,user_id,created_date])
      .then(res => res.rows[0])
      .catch(err => console.log(err));
  }

  const deleteAllTweets = (user_id) =>{
    return db.query(`DELETE FROM tweets
    WHERE created_by = $1`,
    [user_id])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
  }

  const deleteSingleTweet = (tweet_id,user_id) =>{
    return db.query(`DELETE FROM tweets
    WHERE tweets.id = $1 AND created_by = $2 `,
    [tweet_id,user_id])
    .then(res => res.rows)
    .catch(err => console.log(err));
  }

  return {
    createTweet,
    readAllTweets,
    readTweet,
    updateTweet,
    deleteAllTweets,
    deleteSingleTweet
  };
  }