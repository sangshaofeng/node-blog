const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ArticleCate = require('../mongodb/schema').ArticleCate;

var Category = mongoose.model('category',  ArticleCate);

// 添加标签
router.post('/', function (req, res, next) {
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
