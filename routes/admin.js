// 管理员路由
const express = require('express');
const router = express.Router();

router.get('/signin', function (req, res, next) {

})

router.get('/article-list', function (req, res, next) {
  res.render('admin/articleList', { menu: 'list' });
})

router.get('/article-new', function (req, res, next) {

})

module.exports = router;
