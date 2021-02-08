module.exports = (db) => {

const getUserbyUserName = (userName)=>{
return db.query(`SELECT * FROM users WHERE userName=$1`,
[userName])
.then(res=>res.rows[0])
.catch(err=>console.log(err))
}

const addNewUser = (userName,password)=>{
  return db.query(`INSERT INTO users(userName,password) VALUES($1,$2)`,[userName,password])
  .then(res=>res.rows[0])
  .catch(err=>console.log(err))
}
return {
  getUserbyUserName,
  addNewUser
};
}