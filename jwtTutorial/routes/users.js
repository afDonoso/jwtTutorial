var express = require('express');
var router = express.Router();
const Mongolib = require('../db/Mongolib')

/* GET users listing. */
router.get('/', function (req, res, next) {
  Mongolib.getDatabase(db => {
    Mongolib.getUsers(db, docs => {
      res.send(docs);
    })
  })
});

router.post('/create', function (req, res, next) {
  Mongolib.getDatabase(db => {
    Mongolib.createUser(db, req.body, () => {
      res.send(`User ${req.body.username} created succesfully!`)
    })
  })
})

router.delete('/delete/:username', function (req, res, next) {
  Mongolib.getDatabase(db => {
    Mongolib.deleteUser(req.params.username, db, () => {
      res.send(`User ${req.params.username} deleted`)
    })
  })
})

module.exports = router;
