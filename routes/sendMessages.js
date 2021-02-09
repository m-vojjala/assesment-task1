const express = require('express');
const router = express.Router();
const initHelpers = require('../helpers');

module.exports = (db) => {
  const helpers = initHelpers(db);
router.post("/", (req, res) => {

});
return router;
};