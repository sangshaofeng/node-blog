

!(function () {

  $('#login-btn').click(function () {
    var params = Object.create(null);
    params.account = $('input.username').val();
    params.password = $('input.password').val();
    getLogin(params)
  })

  function  getLogin (params) {
    $.ajax({
      url: '/admin/signin',
      type: 'post',
      data: params,
      dataType: 'json',
      success: function (res) {
        if (res.status === 'succ') {
          window.location.href = '/admin/article-list';
        } else if (res.status === 'err') {
          alert(res.msg);
        }
      }
    })
  }

}())
