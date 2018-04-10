const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleSchema = require('../mongodb/schema').ArticleSchema;

var Article = mongoose.model('article', ArticleSchema);

router.get('/', function (req, res, next) {
  res.render('blog/home')
})

router.post('/', function (req, res, next) {

  const articleObject = {
    title: req.body.title,
    content: req.body.content
  }

  Article.create(articleObject).exec()
  .then(function (doc) {
    console.log(doc)
  })

})

module.exports = router;
