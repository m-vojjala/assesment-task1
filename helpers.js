module.exports = (db) => {

const getUserbyUserName = (userName)=>{
return db.query(`SELECT * FROM users WHERE userName = $1`,
[userName])
.then(res=>res.rows[0])
.catch(err=>console.log(err));
}

const addNewUser = (userName,password)=>{
  return db.query(`INSERT INTO users(userName,password) VALUES($1,$2)`,[userName,password])
  .then(res=>res.rows[0])
  .catch(err=>console.log(err));
}

const checkUserAuthentication = (userName,password) =>{
  return db.query(`SELECT * FROM users WHERE userName = $1 AND password = $2`,[userName,password])
  .then(res=>res.rows[0])
  .catch(err=>console.log(err));
}

const getUsernameById = (user_id) => {
  return db.query(`SELECT users.userName FROM users WHERE id=$1`, [user_id])
    .then(res =>res.rows[0].username)
    .catch(err => console.log(err));
}

const addNewMessage = (sender_username,sender_id,content, receiver_username,time_slot) => {
  return db.query(`INSERT INTO
   messages(sender_username,sender_id,content,receiver_username,time_slot)
   VALUES($1,$2,$3,$4,$5)
   RETURNING *`, [sender_username,sender_id,content,receiver_username,time_slot])
  .then(res => res.rows[0])
  .catch(err => console.log(err));
}

const receivedMessages = (receiver_id) => {
  return db.query(`SELECT 
  messages.id, sender_username,content,time_slot
   FROM messages 
   WHERE receiver_id=$1`, [receiver_id])
    .then(res => res.rows)
    .catch(err => console.log(err));
}


return {
  getUserbyUserName,
  addNewUser,
  checkUserAuthentication,
  getUsernameById,
  addNewMessage,
  receivedMessages
};
}