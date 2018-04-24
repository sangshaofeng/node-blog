// 管理员路由
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Administrator = require('../mongodb/schema').Administrator;

// 登录验证
router.get('/signin', function (req, res, next) {

})

// 创建账户
router.post('/signup', function (req, res, next) {

})

// 退出登录
router.post('/signout', function (req, res, next) {
  
})

// 文章列表
router.get('/article-list', function (req, res, next) {
  res.render('admin/articleList', { menu: 'articlelist' });
})

// 新建文章
router.get('/article-new', function (req, res, next) {
  res.render('admin/articleNew', { menu: 'articlenew' });
})

module.exports = router;
