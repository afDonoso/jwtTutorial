const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const CryptoJS = require('crypto-js')
let config = require('../config');

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db('jwt-db');

        callback(db, client);
    });
}

const getUsers = function (db, callback) {
    const collection = db.collection('users');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const createUser = function (db, user, callback) {
    const collection = db.collection('users')

    //Password encryption
    var cipher = CryptoJS.AES.encrypt(user.password, config.secret);
    user.password = cipher.toString();
    console.log(user.password);

    collection.insertOne(user).then(callback(user))
}

const deleteUser = function (username, db, callback) {
    const collection = db.collection('users')
    collection.deleteOne({ "username": username }, callback(username))
}

const getUser = function (username, db, callback) {
    const collection = db.collection('users')
    collection.findOne({ "username": username }).then(docs => {
        callback(docs)
    })
}

exports.getDatabase = getDatabase;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;