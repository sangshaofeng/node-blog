
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
  
  // 获取全部文章
  function getAllArticles () {
    $.ajax({
      url: '/article/all',
      type: 'get',
      dataType: 'json',
      success: function (res) {
        console.log(res)
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
          console.log(res)
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
          console.log(res)
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
          renderComments(res.data)
        }
      }
    })
  }

  function renderArticles (docs) {
    $('.total span b').text(docs.data.length);
    var wrapper = $('#articles-wrapper');
    wrapper.empty();
    $('#article-tpl').tmpl(docs).appendTo(wrapper);
  }

}())