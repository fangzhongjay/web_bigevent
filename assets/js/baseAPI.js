// 优化：每次都要拼接很长的 url 很麻烦，可以使用 jquery 中的 ajaxPrefilter 函数 

// 注意：每次调用 $.get() 或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 Ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})