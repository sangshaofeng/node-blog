const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleSchema = require('../mongodb/schema').ArticleSchema;
const ArticleCate = require('../mongodb/schema').ArticleCate;
const ArticleComments = require('../mongodb/schema').ArticleComments;

var Article = mongoose.model('article', ArticleSchema);
var Category = mongoose.model('category',  ArticleCate);
var Comments = mongoose.model('comment', ArticleComments);

// 获取isDeleted=0的文章和全部标签，
// ajax=true表示ajax请求，不加ajax字段表示直接客户端请求
// doc是查询到的每页数据，result是全部数据
router.get('/', function (req, res, next) {
  var cateId = req.query.cateId;
  var label = req.query.label;
  var page = parseInt(req.query.page)
  var ajax = req.query.ajax;
  var query = Article.find({ category: cateId, isDeleted: '0' }).sort({'_id': -1});
  if (!label || label === '') label = 'all';
  if (!page || page === '') page = 1;
  if (typeof cateId === 'undefined') {
    query = Article.find({ isDeleted: '0' }).sort({'_id': -1});
    query.skip((page - 1) * 6); query.limit(6);
    query.exec(function (err, doc) {
      Article.find({ isDeleted: '0' }, function (err, result) {
        Category.find({}).exec(function (err, tags) {
          var totalPages = Math.ceil(result.length / 6);
          var currentPage = page;
          if (!ajax) {
            res.render('blog/home', { articles: doc, tags: tags, label: label, navLabel: 'home', articleAmount: result.length, totalPages: totalPages, currentPage: currentPage })
          } else {
            res.json({ data: doc, totalPages: totalPages, currentPage: currentPage, msg: '获取成功', status: 'succ' })
          }
        })
      })
    })
  } else {
    query.skip((page - 1) * 6); query.limit(6);
    query.exec(function (err, doc) {
      Article.find({ category: cateId, isDeleted: '0' }, function (err, result) {
        Category.find({}).exec(function (err, tags) {
          var totalPages = Math.ceil(result.length / 6);
          var currentPage = page;
          if (!ajax) {
            res.render('blog/home', { articles: doc, tags: tags, label: label, navLabel: 'home', articleAmount: result.length, totalPages: totalPages, currentPage: currentPage })
          } else {
            res.json({ data: doc, totalPages: totalPages, currentPage: currentPage, msg: '获取成功', status: 'succ' })
          }
        })
      })
    })
  }
})

// 获取全部文章，后台使用
// 包括isDeleted=1的文章
router.get('/all', function (req, res, next) {
  Article.find({}).sort({'_id': -1}).exec(function (err, docs) {
    if (!err) {
      Comments.count({}, function (err, count) {
        res.json({ data: docs, msg: '获取成功', status: 'succ', commentsAmount: count, })
      })
    }
  })
})

// 获取文章详情
router.get('/details', function (req, res, next) {
  const id = req.query.id;
  Article.find({ _id: id }, function (err, doc) {
    Article.count({ isDeleted: '0' }, function (err, total) {
      var totalPages = Math.ceil(total / 6);
      res.render('blog/article', { article: doc, navLabel: null, articleAmount: total, totalPages: totalPages });
    })
  })
})

// 新增一篇文章
router.post('/', function (req, res, next) {
  if (!req.session.user) {
    return res.json({ msg: '未登录', status: 'err' })
  } else if (req.session.user.userRole !== 'ADMIN') {
    return res.json({ msg: '没有操作权限', status: 'err' })
  }

  const articleObject = {
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    author: req.body.author,
    category: req.body.labelId,
    cateLabel: req.body.cateLabel
  }

  if (!articleObject.title || articleObject.title === '') {
    return res.json({ msg: '缺少文章标题', status: 'err' });
  } else if (!articleObject.content || articleObject.content === '') {
    return res.json({ msg: '缺少文章内容', status: 'err' });
  } else if (!articleObject.summary || articleObject.summary === '') {
    return res.json({ msg: '缺少文章摘要', status: 'err' });
  } else if (!articleObject.author || articleObject.author === '') {
    return res.json({ msg: '缺少作者', status: 'err' });
  } else if (!articleObject.cateLabel || articleObject.cateLabel === '') {
    return res.json({ msg: '缺少分类标签名者', status: 'err' });
  } else if (!articleObject.category || articleObject.category === '') {
    return res.json({ msg: '缺少文章分类', status: 'err' });
  }

  Article.create(articleObject, function (err, doc) {
    if (!err) {
      res.json({ msg: '上传文章成功', status: 'succ' })
    } else {
      res.json({ msg: '上传文章失败', status: 'err' })
    }
  })
})

// 获取某一篇文章详情，ajax获取
router.get('/item', function (req, res, next) {
  const id = req.query.id;
  Article.find({ _id: id }, function (err, doc) {
    if (!err) {
      res.json({ data: doc, msg: '获取成功', status: 'succ' })
    } else {
      console.log(err)
    }
  })
})

// 编辑文章
router.put('/', function (req, res, next) {
  if (!req.session.user) {
    return res.json({ msg: '未登录', status: 'err' })
  } else if (req.session.user.userRole !== 'ADMIN') {
    return res.json({ msg: '没有操作权限', status: 'err' })
  }
  const id = req.query.id;
  const title = req.body.title;
  const content = req.body.content;
  const summary = req.body.summary;
  const author = req.body.author;
  const category = req.body.labelId;
  const cateLabel = req.body.cateLabel;
  if (!title || title === '') {
    return res.json({ msg: '缺少文章标题', status: 'err' });
  } else if (!content || content === '') {
    return res.json({ msg: '缺少文章内容', status: 'err' });
  } else if (!summary || summary === '') {
    return res.json({ msg: '缺少文章摘要', status: 'err' });
  } else if (!author || author === '') {
    return res.json({ msg: '缺少作者', status: 'err' });
  } else if (!cateLabel || cateLabel === '') {
    return res.json({ msg: '缺少分类标签名者', status: 'err' });
  } else if (!category || category === '') {
    return res.json({ msg: '缺少文章分类', status: 'err' });
  }
  Article.findByIdAndUpdate(id, {$set: {
    title: title,
    content: content,
    summary: summary,
    author: author,
    category: category,
    cateLabel: cateLabel,
    updateAt: Date.now()
  }}, { new: true }, function (err, doc) {
    if (!err) {
      res.json({ msg: '修改成功', status: 'succ' });
    }
  })

})

// 删除文章，假删除
router.delete('/', function (req, res, next) {
  if (!req.session.user) {
    return res.json({ msg: '未登录', status: 'err' })
  } else if (req.session.user.userRole !== 'ADMIN') {
    return res.json({ msg: '没有操作权限', status: 'err' })
  }

  const id = req.body.id;
  Article.findByIdAndUpdate(id, {$set: { isDeleted: '1' }}, { new: true }, function (err, doc) {
    if (!err) {
      res.json({ msg: '删除成功', status: 'succ' })
    }
  })
})

// 恢复删除文章
router.post('/recovery', function (req, res, next) {
  if (!req.session.user) {
    return res.json({ msg: '未登录', status: 'err' })
  } else if (req.session.user.userRole !== 'ADMIN') {
    return res.json({ msg: '没有操作权限', status: 'err' })
  }

  const id = req.body.id;
  Article.findByIdAndUpdate(id, {$set: { isDeleted: '0' }}, { new: true }, function (err, doc) {
    if (!err) {
      res.json({ msg: '恢复成功', status: 'succ' })
    }
  })
})

module.exports = router;
