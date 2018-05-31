
$('body').css('background', '#f0f0f0');

!(function () {

  var articleId = '';

  getAllArticles()

  // 编辑按钮点击
  $('#articles-wrapper').on('click', 'div[role=btn-edit]', function () {
    if (userRole !== 'ADMIN') return alert('没有操作权限');
    articleId = $(this).parents('.article-item').attr('data-id');
    window.location.href = '/admin/article-new?id=' + articleId;
  })

  // 删除按钮点击
  $('#articles-wrapper').on('click', 'div[role=btn-delete]', function () {
    var id = $(this).parents('.article-item').attr('data-id')
    deleteArticle(id).then(() => {
      getAllArticles();
    })
  })

  // 恢复按钮点击
  $('#articles-wrapper').on('click', 'div[role=btn-recovery]', function () {
    var id = $(this).parents('.article-item').attr('data-id')
    recoveryArticle(id).then(() => {
      getAllArticles();
    })
  })

  // 评论管理按钮点击
  $('#articles-wrapper').on('click', 'div[role=btn-comments]', function () {
    var id = $(this).parents('.article-item').attr('data-id');
    articleId = id;
    var title = $(this).parents('.article-item').find('h4').text();
    $('.modal-header').find('h4').text(title);
    $('#comments-wrapper').empty();
    $('#comments-wrapper').append('<div class="loading-wrapper"><img class="loading" src="/images/loading.gif"></div>');
    $('#comments-modal').fadeIn(150)
    getComments(id);
  })

  // 真删除按钮点击
  $('#articles-wrapper').on('click', 'div[role=btn-real-delete]', function () {
      if (window.confirm('确定删除？')) {
          var id = $(this).parents('.article-item').attr('data-id')
          realDeleteArticle(id);
      }
  })

  // 评论删除按钮点击
  $('#comments-wrapper').on('click', 'div[role=delete-comm-btn]', function () {
    var id = $(this).parents('.comment-item').attr('data-id');
    deleteComment(id, articleId);
  })

  // 评论模态框关闭
  $('.modal-close-btn').click(function () {
    $('#comments-modal').fadeOut(150)
  })

  // 获取全部文章
  function getAllArticles () {
    $.ajax({
      url: '/article/all',
      type: 'get',
      dataType: 'json',
      success: function (res) {
        renderArticles(res);
      }
    })
  }

  // 真删除文章
  function realDeleteArticle (id) {
      $.ajax({
          url: '/article/item',
          type: 'delete',
          data: { id: id },
          dataType: 'json',
          success: function (res) {
              if (res.status === 'succ') {
                  getAllArticles()
              }
          }
      })
  }

  // 删除文章
  function deleteArticle (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/article',
        type: 'delete',
        data: { id: id },
        dataType: 'json',
        success: function (res) {
          if (res.status === 'err') {
            alert(res.msg)
          } else if (res.status === 'succ') {
            resolve()
          }
        }
      })
    })
  }

  // 恢复文章
  function recoveryArticle (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/article/recovery',
        type: 'post',
        data: { id: id },
        dataType: 'json',
        success: function (res) {
          if (res.status === 'err') {
            alert(res.msg)
          } else if (res.status === 'succ') {
            resolve()
          }
        }
      })
    })
  }

  // 获取评论
  function getComments (id) {
    $.ajax({
      url: '/comments?articleId=' + id,
      type: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.status === 'succ') {
          renderComments(res);
        }
      }
    })
  }

  // 删除一条评论
  function deleteComment (id, articleId) {
    $.ajax({
      url: '/comments',
      type: 'delete',
      data: {
        id: id,
        articleId: articleId
      },
      dataType: 'json',
      success: function (res) {
        if (res.status === 'succ') {
          getComments(articleId);
        } else if (res.status === 'err') {
          alert(res.msg)
        }
      }
    })
  }

  function renderArticles (docs) {
    $('.total span.articles b').text(docs.data.length);
    $('.total span.comments b').text(docs.commentsAmount);
    var wrapper = $('#articles-wrapper');
    wrapper.empty();
    $('#article-tpl').tmpl(docs).appendTo(wrapper);
  }

  function renderComments (docs) {
    var wrapper = $('#comments-wrapper');
    wrapper.empty();
    if (!docs || !docs.data.length) {
      wrapper.append('<p class="empty">暂无评论</p>');
    } else {
      $('#comments-tpl').tmpl(docs).appendTo(wrapper);
    }
  }

}())
