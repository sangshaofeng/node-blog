// 新建文章

(function () {

  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create()

  var params = {
    title: '',
    content: '',
    summary: '',
    author: '',
    labelId: '',
    cateLabel: ''
  }

  getCateTags();

  // 提交文章数据按钮点击
  $('#submit-btn').click(function () {
    params.title = $('input[name=title]').val();
    params.content = $('textarea[name=content]').val();
    params.summary = $('input[name=summary]').val();
    params.author = $('input[name=author]').val();
    params.labelId = editor.txt.html();
    params.cateLabel = $('select[name=category]').find('option:selected').text();
    submitArticle(params);
  })

  // 添加标签模态框显示隐藏
  $('#add-tag-btn').click(function (e) {
    $('#add-tags-modal').fadeToggle(150);
    $('input[name=label]').val('')
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  })
  $('#add-tags-modal').click(function (e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  })
  $(document).click(function (e) {
    $('#add-tags-modal').fadeOut(150);
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
  })

  // 添加分类标签确定点击
  $('#confirm-post-tag').click(function () {
    var labelName = $('input[name=label]').val();
    submitCateTag(labelName);
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

  // 提交分类标签
  function submitCateTag (labelName) {
    $.ajax({
      url: '/category/tags',
      type: 'post',
      data: {
        label: labelName
      },
      dataType: 'json',
      success: function (res) {
        alert(res);
        if (res.status === 'succ') {
          $('#add-tags-modal').fadeOut(150);
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
      data: params,
      dataType: 'json',
      success: function (res) {
        alert(res.msg);
        if (res.status === 'succ') {
          resetValue();
        }
      }
    })
  }

  // 重置输入框值
  function resetValue () {
    $('input[name=title]').val('');
    $('textarea[name=content]').val('');
    $('input[name=summary]').val('');
    $('input[name=author]').val('');
  }

})()
