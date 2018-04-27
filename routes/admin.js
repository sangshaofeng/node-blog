// 管理员路由
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sha1 = require('sha1');
const Administrator = require('../mongodb/schema').Administrator;

var Admin = mongoose.model('Administrator', Administrator);

// 登录路由
router.get('/signin', function (req, res, next) {
  res.render('admin/signin')
})

// 登录验证
router.post('/signin', function (req, res, next) {
  const account = req.body.account;
  const password = req.body.password;
  Admin.find({ account: account }, function (err, doc) {
    if (!doc.length) {
      return res.json({ status: 'err', msg: '用户不存在' })
    }
    if (doc[0].password !== sha1(password)) {
      return res.json({ status: 'err', msg: '密码错误' })
    }

    delete doc[0].password;
    req.session.user = doc[0];
    return res.json({ status: 'succ', msg: '登录成功' })
  })
})

// 创建账户
router.post('/signup', function (req, res, next) {
  const userInfo = {
    account: req.body.account,
    password: sha1(req.body.password),
    userRole: req.body.role
  }

  if (!userInfo.account || userInfo.account === '') {
    res.json({ msg: '缺少用户名', status: 'err' })
    return false;
  } else if (!userInfo.password || userInfo.password === '') {
    res.json({ msg: '缺少密码', status: 'err' })
    return false;
  } else if (!userInfo.userRole || userInfo.userRole === '') {
    res.json({ msg: '缺少角色', status: 'err' })
    return false;
  }

  Admin.create(userInfo, function (err, doc) {
    if (!err) {
      res.json({ msg: '注册成功', status: 'succ', })
    } else {
      if (err.code === 11000) {
        res.json({ msg: '用户名已存在', status: 'err', })
      }
    }
  })
})

// 退出登录
router.get('/signout', function (req, res, next) {
  req.session.user = null;
  res.redirect('/admin/signin')
})

// 文章列表
router.get('/article-list', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/admin/signin')
  } else {
    var account = req.session.user.account;
    res.render('admin/articleList', { menu: 'articlelist', account: account });
  }
})

// 新建文章
router.get('/article-new', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/admin/signin')
  } else {
    var account = req.session.user.account;
    res.render('admin/articleNew', { menu: 'articlenew', account: account })
  };
})

module.exports = router;
