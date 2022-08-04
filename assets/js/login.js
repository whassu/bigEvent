$(function () {
    // 需求1：点击a链接实现跳转
    $('.loginBox a').on('click', function () {
        // 点击去注册，登录区域隐藏，注册区域显示
        $('.loginBox').hide()
        $('.regBox').show()
    })

    $('.regBox a').on('click', function () {
        // 点击去登录，注册区域隐藏，登录区域显示
        $('.regBox').hide()
        $('.loginBox').show()
    })

    // 需求二：校验规则
    // 自定义校验规则
    layui.use('form', function () {
        var form = layui.form;
        form.verify({
            username: [
                /^[\S]{0,9}$/
                , '用户名必须1到10位，且不能出现空格'
            ],
            pass: [
                /^[\S]{0,9}$/
                , '密码必须1到10位，且不能出现空格'
            ],
            repsw: function (value, item) { //value：确认密码表单的值、item：表单的DOM对象
                let psw = $('.regBox input[name=password]').val()
                if (psw!==value) {
                    return '两次输入的密码不一致';
                }
            }
        })

    })

    // 需求三：注册功能
    $('#formReg').on('submit',function(e){
        // 阻止表单默认提交
        e.preventDefault()
        axios({
            method:'POST',
            url:'/api/reguser',
            data:$(this).serialize(),
        }).then(res=>{
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }
            layer.msg('恭喜您，注册成功')
            // 注册成功后页面跳转到登录
            $('.regBox a').click()
            // 内容清空
            $('#formReg')[0].reset()
        })
    })

    // 需求四：登录功能
    $('#formLogin').on('submit',function(e){
        e.preventDefault()
        axios({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
        }).then(({data:res})=>{
            if (res.status !==0) {
                return layer.msg(res.message)
            }
            layer.msg('恭喜您，登录成功')
            location.href='/index.html'
            localStorage.setItem('token',res.token)
        })
    })

})