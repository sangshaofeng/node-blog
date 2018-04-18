!(function () {

  var cateId = getUrlParam('cateId');

  // 首页点击
  $('#btn-first').click(function () {
    if (currentPage !== 1) {
      currentPage = 1
      getArticles(cateId, currentPage)
    } else return null;
  })

  // 上一页点击
  $('#btn-prev').click(function () {
    if (currentPage !== 1) {
      currentPage -= 1
      getArticles(cateId, currentPage)
    } else return null;
  })

  // 下一页点击
  $('#btn-next').click(function () {
    if (currentPage !== totalPages) {
      currentPage += 1
      getArticles(cateId, currentPage)
    } else return null;
  })

  // 末页点击
  $('#btn-last').click(function () {
    if (currentPage !== totalPages) {
      currentPage = totalPages
      getArticles(cateId, currentPage)
    } else return null;
  })

  function getArticles (cateId, page) {
    var url = '/article';
    if (page && page !== '') url += '?page=' + page;
    if (cateId !== null) url += '&cateId=' + cateId;
    url += '&ajax=true';
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function (res) {
        currentPage = res.currentPage;
        totalPages = res.totalPages;
        renderArticles(res.data);
      }
    })
  }

  // 渲染文章，使用tmpl模板和ejs有冲突，直接js写模板
  // 需要浏览器兼容es6语法
  function renderArticles (doc) {
    var wrapper = $('#articles-wrapper')
    wrapper.empty();
    $('#curr-total-count').text(''+ currentPage +' / '+ totalPages +'');
    for (var i = 0; i < doc.length; i++) {
      var item = `<div class="article-item">
        <div class="article-header">
          <span>作者：<span>${doc[i].author}</span></span>
          <span class="published-at">发布时间：${doc[i].meta.createdAt}</span>
        </div>
        <h3><a href="/article/details?id=${doc[i]._id}">${doc[i].title}</a></h3>
        <p>${doc[i].summary}</p>
        <div class="article-footer">
          <div class="comments-wrapper">
            <span class="category">分类：${doc[i].cateLabel}</span>
            <svg class="Zi Zi--Comment Button-zi" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
              <path d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z" fill-rule="evenodd"></path>
            </svg>
            <span class="comments">${doc[i].commentsAmount}条评论</span>
          </div>
        </div>
      </div>`;
      wrapper.append(item);
    }
  }

  // 获取地址栏参数
  function getUrlParam (key) {
    var url = window.location.search;
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = url.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }

}())
