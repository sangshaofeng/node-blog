const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleCate = require('../mongodb/schema').ArticleCate;

var Category = mongoose.model('category',  ArticleCate);

// 获取全部标签
router.get('/tags', function (req, res, next) {
  Category.find({}, function (err, doc) {
    if (!err) {
      res.json({ data: doc, msg: '获取成功', status: 'succ' })
    } else {
      res.json({ msg: '获取失败', status: 'err' })
    }
  })
})

// 添加标签
router.post('/tags', function (req, res, next) {
  if (!req.session.user) {
    return res.json({ msg: '未登录', status: 'err' })
  } else if (req.session.user.userRole !== 'ADMIN') {
    return res.json({ msg: '没有操作权限', status: 'err' })
  }
  
  const labelObject = {
    label: req.body.label
  }
  Category.create(labelObject, function(err, doc) {
    if (!err) {
      res.json({ msg: '上传标签成功', status: 'succ' })
    } else {
      res.json({ msg: '上传标签失败', status: 'err' })
    }
  })
})

module.exports = router;
