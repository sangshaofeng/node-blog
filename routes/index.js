// 全部路由出口
module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.redirect('/article');
  })

  app.use('/article', require('./article'));
  app.use('/category', require('./category'));
  app.use('/comments', require('./comments'));
  app.use('/admin', require('./admin'));

  // 处理404页面
  app.use(function (req, res, next) {
    if (!res.headersSent) {
      res.status(404).render('blog/404');
    }
  })
}
