const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleSchema = require('../mongodb/schema').ArticleSchema;

var Article = mongoose.model('article', ArticleSchema);

// 获取全部文章
router.get('/', function (req, res, next) {
  var cateId = req.query.cateId;
  if (typeof cateId === 'undefined') {
    Article.find({}, function (err, doc) {
      res.render('blog/home', { articles: doc })
    })
  } else {
    Article.find({ category: cateId }, function (err, doc) {
      res.render('blog/home', { articles: doc })
    })
  }
})

// 新增一篇文章
router.post('/', function (req, res, next) {
  const articleObject = {
    title: req.body.title,
    content: req.body.content,
    category: req.body.labelId,
    summary: req.body.summary
  }
  Article.create(articleObject, function (err, doc) {
    if (!err) {
      res.json({ msg: '上传文章成功', status: 'succ' })
    } else {
      res.json({ msg: '上传文章失败', status: 'err' })
    }
  })
})

// 删除一篇文章
router.delete('/', function (err, doc) {

})

module.exports = router;
