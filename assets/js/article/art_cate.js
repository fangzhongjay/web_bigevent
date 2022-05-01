$(function () {


    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // 只有引入了模板引擎js文件，就可以调用template 函数
                var htmlStr = template('tpl-table', res) // 第一个是模板的 id,第二个的数据
                $('tbody').html(htmlStr)
                console.log(htmlStr)
            }
        })
    }


    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1, // 选择类型1，去掉原本的按钮
            area: ['500px', '250px'], // 给弹出层设置宽高
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })


    // 不能直接给按钮绑定事件，因为当时页面还没有该按钮，
    // 所以通过代理的形式,为form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(), // 快速获取要提交的数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                // 成功则重新获取数据，刷新列表
                initArtCateList()
                // 添加成功之后，关闭弹出层
                layer.close(indexAdd)
                layer.msg('新增分类成功！')

            }
        })
    })


    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类的层
        indexEdit = layer.open({
            type: 1, // 选择类型1，去掉原本的按钮
            area: ['500px', '250px'], // 给弹出层设置宽高
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id') // 获取点击对应的id值
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data) // 把点击对应的数据赋值给弹出层
            }
        })
    })


    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新数据失败！')

                }
                layer.msg('更新数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })



    // 通过代理的形式,为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // console.log('ok')
        var id = $(this).attr('data-id') // 获取设置的自定义属性值
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id, // url 拼接 
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')

                    }
                    layer.msg('删除分类成功！')
                    layer.close(index) // 成功之后关闭弹出层
                    initArtCateList()  // 重新获取文章列表
                }
            })
        });
    })



})