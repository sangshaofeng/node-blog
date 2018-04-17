// 新建文章

(function () {

  var params = {
    title: '',
    content: '',
    summary: '',
    author: '',
    category: '',
    cateLabel: ''
  }

  getCateTags();

  $('#submit-btn').click(function () {
    params.title = $('input[name=title]').val();
    params.content = $('textarea[name=content]').val();
    params.summary = $('input[name=summary]').val();
    params.author = $('input[name=author]').val();
    params.category = $('select[name=category]').val();
    params.cateLabel = $('select[name=category]').find('option:selected').text();
    console.log(params)
  })

  $('#add-tag-btn').click(function (e) {
    $('#add-tags-modal').fadeToggle(150);
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  })
  $('#add-tags-modal').click(function (e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  })
  $(document).click(function (e) {
    $('#add-tags-modal').fadeOut(150);
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  })

  // 获取全部分类标签
  function getCateTags () {
    $.ajax({
      url: '/category/tags',
      type: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.status === 'succ') {
          appendTags(res.data);
        }
      }
    })
  }

  // 填充标签
  function appendTags (tags) {
    var select = $('select[name=category]')
    select.empty();
    for (var i = 0; i < tags.length; i++) {
      var option = '<option value="'+ tags[i]._id +'">'+ tags[i].label +'</option>';
      select.append(option);
    }
  }

  // 提交文章数据
  function submitArticle (params) {
    $.ajax({
      url: '/article',
      type: 'post',
      data: '',
      dataType: 'json',
      success: function (res) {

      }
    })
  }

  // 重置输入框值
  function resetValue () {
    $('input[name=title]').val('');
    $('textarea[name=content]').val('');
    $('input[name=summary]').val('');
    $('input[name=author]').val('');
    $('select[name=category]').val('');
  }

})()
