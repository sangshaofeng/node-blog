

(function () {

  var articleId = getUrlParam('id')
  $('#nav-title').find('h3').text($('#article-title').text());

  getComments(articleId);

  $(document).scroll(function () {
    var top = $('html').scrollTop();
    if (top > 65) {
      $('#nav-logo').css('display', 'none');
      $('#nav-title').css('display', 'block');
    } else {
      $('#nav-title').css('display', 'none');
      $('#nav-logo').css('display', 'block');
    }
  })

  $('#view-comments').click(function () {
    $('#comments-modal').fadeIn(150)
    $('body').css('overflow-y', 'hidden');
  })

  $('#close-modal-btn').click(function () {
    $('#comments-modal').fadeOut(150)
    $('body').css('overflow-y', 'auto');
  })

  $('#submit-btn').click(function () {
    var params = {};
    params.comment =  $('#comment-content').val();
    params.nickname = $('#nickname').val();
    params.articleId = articleId;
    submitComment(params)
  })

  function renderComments (comm) {
    var wrapper = $('#comments-wrapper');
    wrapper.empty();
    if (!comm.length) {
      var div = '<div class="empty"><span>暂时没有评论</span></div>';
      wrapper.append(div)
    } else {
      $('span.comments').text(comm.length + '条评论')
      for (var i = 0; i < comm.length; i++) {
        var item = '<div class="comment-item">' +
                      '<div class="top">' +
                        '<img class="avatar" src="/images/avatar.svg" alt=""><span class="nickname">${comm[i].nickname}</span>' +
                      '</div>' +
                      '<div class="content"><p>${comm[i].comment}</p></div>' +
                    '</div>';
        wrapper.append(item);
      }
    }
  }

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

  function submitComment (params) {
    $.ajax({
      url: '/comments',
      type: 'post',
      data: params,
      dataType: 'json',
      success: function (res) {
        if (res.status === 'succ') {
          $('#comment-content, #nickname').val('')
          getComments(articleId)
        }
      }
    })
  }

  function getUrlParam (key) {
    var url = window.location.search;
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = url.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }

})()
