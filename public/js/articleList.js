
$('body').css('background', '#f0f0f0');

!(function () {

  getAllArticles()

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
    $('#comments-wrapper').empty();
    $('#comments-wrapper').append('<div class="loading-wrapper"><img class="loading" src="/images/loading.gif"></div>');
    $('#comments-modal').fadeIn(150)
    getComments(id);
  })

  // 评论删除按钮点击
  $('#comments-wrapper').on('click', 'div[role=delete-comm-btn]', function () {
    
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

  // 删除文章
  function deleteArticle (id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/article',
        type: 'delete',
        data: { id: id },
        dataType: 'json',
        success: function (res) {
          resolve()
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
          resolve()
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
  function deleteComment (id) {
    
  }

  function renderArticles (docs) {
    $('.total span b').text(docs.data.length);
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