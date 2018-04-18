const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleSchema = require('../mongodb/schema').ArticleSchema;
const ArticleCate = require('../mongodb/schema').ArticleCate;

var Article = mongoose.model('article', ArticleSchema);
var Category = mongoose.model('category',  ArticleCate);

// 获取首页文章和标签，ajax=true表示ajax请求，不加ajax字段表示直接客户端请求
// doc是查询到的每页数据，result是全部数据
router.get('/', function (req, res, next) {
  var cateId = req.query.cateId;
  var page = parseInt(req.query.page)
  var ajax = req.query.ajax;
  var query = Article.find({ category: cateId }).sort({'_id': -1});
  if (!page || page === '') page = 1;
  if (typeof cateId === 'undefined') {
    query = Article.find({}).sort({'_id': -1});
    Article.find({}).sort({'_id': -1});
    query.skip((page - 1) * 5); query.limit(5);
    query.exec(function (err, doc) {
      Article.find({}, function (err, result) {
        Category.find({}).exec(function (err, tags) {
          var totalPages = Math.ceil(result.length / 5);
          var currentPage = page;
          if (!ajax) {
            res.render('blog/home', { articles: doc, tags: tags, totalPages: totalPages, currentPage: currentPage })
          } else {
            res.json({ data: doc, totalPages: totalPages, currentPage: currentPage, msg: '获取成功', status: 'succ' })
          }
        })
      })
    })
  } else {
    query.skip((page - 1) * 5); query.limit(5);
    query.exec(function (err, doc) {
      Article.find({ category: cateId }, function (err, result) {
        Category.find({}).exec(function (err, tags) {
          var totalPages = Math.ceil(result.length / 5);
          var currentPage = page;
          if (!ajax) {
            res.render('blog/home', { articles: doc, tags: tags, totalPages: totalPages, currentPage: currentPage })
          } else {
            res.json({ data: doc, totalPages: totalPages, currentPage: currentPage, msg: '获取成功', status: 'succ' })
          }
        })
      })
    })
  }
})

// 获取文章详情
router.get('/details', function (req, res, next) {
  const id = req.query.id;
  Article.find({ _id: id }, function (err, doc) {
    res.render('blog/article', { article: doc, test: {name: 'haha'} })
  })
})

// 新增一篇文章
router.post('/', function (req, res, next) {
  const articleObject = {
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    author: req.body.author,
    category: req.body.labelId,
    cateLabel: req.body.cateLabel
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
  } else if (!articleObject.cateLabel || articleObject.cateLabel === '') {
    res.json({ msg: '缺少分类标签名者', status: 'err' });
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

// 删除文章，其下的评论也一并删除
router.delete('/', function (err, doc) {

})

module.exports = router;
