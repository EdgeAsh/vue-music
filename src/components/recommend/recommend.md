# panner
1, 数据的获取(jsonp)
    编写获取数据接口(in recommend.js)getRecommend()



# recommend list todolist
1, 数据的获取(代理)
    获取音乐列表数据，因为 qq 音乐接口的原因。我需要使用本地node服务器设置代理
    node使用 axios 携带更改过Request Headers 中的 host与 referer 的值才能获取qq音乐服务器的数据
    <!-- 编写获取数据接口(in recommend.js)getDicsList() -->
    然后前端的请求地址就是本地服务器，使用 axios前端ajax插件
    
2, 使用 better-scroll 搞定页面的滑动