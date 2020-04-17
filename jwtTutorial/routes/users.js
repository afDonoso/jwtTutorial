var express = require('express');
var router = express.Router();
const Mongolib = require('../db/Mongolib')

/* GET users listing. */
router.get('/users', function (req, res, next) {
  Mongolib.getDatabase(db => {
    Mongolib.findDocuments(db, docs => {
      res.send(docs)
    })
  })
});

module.exports = router;
