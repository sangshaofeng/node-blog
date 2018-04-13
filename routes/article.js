const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleSchema = require('../mongodb/schema').ArticleSchema;
const ArticleComments = require('../mongodb/schema').ArticleComments;

var Article = mongoose.model('article', ArticleSchema);
var Comments = mongoose.model('comment', ArticleComments);

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
    summary: req.body.summary,
    author: req.body.author,
    category: req.body.labelId
  }

  if (!articleObject.title || articleObject.title === '') {
    res.json({ msg: '缺少文章标题', status: 'err' });
    return false;
  } else if (!articleObject.content || articleObject.content === '') {
    res.json({ msg: '缺少文章内容', status: 'err' });
    return false;
  } else if (!articleObject.summary || articleObject.summary === '') {
    res.json({ msg: '缺少文章摘要', status: 'err' });
    return false;
  } else if (!articleObject.author || articleObject.author === '') {
    res.json({ msg: '缺少作者', status: 'err' });
    return false;
  } else if (!articleObject.category || articleObject.category === '') {
    res.json({ msg: '缺少文章分类', status: 'err' });
    return false;
  }

  Article.create(articleObject, function (err, doc) {
    if (!err) {
      res.json({ msg: '上传文章成功', status: 'succ' })
    } else {
      res.json({ msg: '上传文章失败', status: 'err' })
    }
  })
})

// 编辑文章
router.put('/', function (req, res, next) {

})

// 删除一篇文章
router.delete('/', function (err, doc) {

})

module.exports = router;
