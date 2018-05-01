const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('blog/about', { navLabel: 'about' });
})

module.exports = router;