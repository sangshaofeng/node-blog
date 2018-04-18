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
        console.log(res)
      }
    })
  }

  // 获取地址栏参数
  function getUrlParam (key) {
    var url = window.location.search;
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = url.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }

}())
