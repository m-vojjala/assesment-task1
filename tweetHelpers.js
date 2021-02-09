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

  return {
    createTweet,
    readAllTweets
  };
  }