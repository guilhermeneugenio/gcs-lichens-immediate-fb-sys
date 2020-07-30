// Imports
var express = require('express');
var router = express.Router();

var db = require('../modules/db');
var cache = require('../modules/cache');
var config = require('../extension/config');

// Get Users
router.post('/', async (req, res) => {

  // Check cache
  cache.get(req.body.adminEmail)
  .then(async result => {
    // If user not in cache
    if (typeof result === 'undefined') res.status(403).send();
    else res.status(200).send(await db.getDocument('users'));
    });
});

// Register User
router.post('/register', async (req, res) => {

  // Create new user object
  const newUser = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type
  };
  // Search for user with same email
  var repeated = await  db.getDocument('users', { email: newUser.email });

  // If user found send 302
  if (repeated.length > 0) {
    res.status(302).send();
  }
  // If user not found send 201
  else {
    await db.insertDocument('users', { email: newUser.email });
    res.status(201).send();
  }
});

// Login User
router.post('/login', async (req, res) => {

  // Login user object
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  // Get login admin credentials
  for (admin of config.admin) {
    if (admin.email === user.email && admin.password === user.password) {
      // Add admin to cache
      cache.set(String(user.email), config.userTimeout);
      return res.status(200).send({ type: 'admin' });
    }
  }
  // Search for user in db
  const found = await db.getDocument('users',user);

  // If user found
  if (found.length === 1) {
    // Store in cache
    cache.set(String(user.email), config.userTimeout);
    return res.status(200).send({ type: found[0].type });
  }
  // If user not found
  res.status(404).send();
});

// Login user with oauth
router.post('/logout', async (req, res) => {
  cache.del(String(req.body.email))
    .then(async result => {
      if (result) res.status(200).send();
      else res.status(404).send();
    });
});

// Change User Type
router.post('/changeType', async (req, res) => {
  cache.get(req.body.adminEmail)
    .then(async result => {
      // Check if admin is in the cache
      if (typeof result === 'undefined') res.status(403).send();
      else {
        // Search and updtate type for user with same email
        await db.updateDocument('users',{ email: req.body.email }, { $set: { type: req.body.type } })
        res.status(200).send();
      }
    });
});

// Delete User
router.post('/remove', async (req, res) => {
  cache.get(req.body.adminEmail)
    .then(async result => {
      // Check if admin is in the cache
      if (typeof result === 'undefined') res.status(403).send();
      else {
        // Check if admin pasword correct
        for (admin of config.admin) {
          if (admin.password === req.body.adminPassword) {
            // Removes user with the specified email with admin auth
            await db.deleteDocument('users',{ email: req.body.emailDelete });
            res.status(200).send();
          }
        }
        res.status(401).send();
      }
    });
});

// Export router
module.exports = router;