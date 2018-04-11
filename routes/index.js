// 全部路由出口
module.exports = function (app) {

  app.get('/', function (req, res, next) {
    res.render('blog/home')
  })

  app.use('/article', require('./article'));
  app.use('/category', require('./category'));

}
