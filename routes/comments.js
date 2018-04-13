const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleComments = require('../mongodb/schema').ArticleComments;

var Comments = mongoose.model('comment', ArticleComments);

// 获取评论
router.get('/', function (req, res, next) {
  const articleId = req.query.articleId;
  Comments.find({ articleId: articleId }, function (err, doc) {
    if (!err) {
      res.json({ data: doc, msg: '获取成功', status: 'succ' });
    } else {
      res.json({ msg: '获取失败', status: 'err' });
    }
  })
})

// 添加评论
router.post('/', function (req, res, next) {
  const commentObject = {
    nickname: req.body.nickname,
    comment: req.body.comment,
    articleId: req.body.articleId
  }

  if (!commentObject.nickname || commentObject.nickname === ''){
    res.json({ msg: '缺少昵称', status: 'err' });
    return false;
  } else if (!commentObject.comment || commentObject.comment === '') {
    res.json({ msg: '缺少评论内容', status: 'err' });
    return false;
  } else if (!commentObject.articleId || commentObject.articleId === '') {
    res.json({ msg: '缺少相关文章id', status: 'err' });
    return false;
  }

  Comments.create(commentObject, function (err, doc) {
    if (!err) {
      res.json({ msg: '评论成功', status: 'succ' });
    } else {
      res.json({ msg: '评论失败', status: 'succ' });
    }
  })
})

module.exports = router;
