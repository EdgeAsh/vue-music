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

# 注意
  由于子组件 scroll data1关联到的数据是discList，
  scroll的高度是 .slider-wrapper 和 .recommend-list.两者之和
  在这种情况下，如果.slider-wrapper 先绘制完成，那么data1关系 dislist 没有问题。
  但是，如果 .slider-wrapper 后绘制。则整个 scroll 就会失去.slider-wrapper 的高度，导致 scroll 不能滑动到底。
  .slider-wrapper是由图片撑开的，
  在 :data1= 'disclist' 的前提下
  监听.slider-wrapper中 img的 onload事件。图片加载完成再通知 scroll 刷新重新计算高度
  
###但是 好像出错了. 如果定时超过200,可滑动的距离就会超出范围。这应该是插件的问题,虽然作者演示的时候没有这个问题




  scroll 子元素高度 2690
        滑动视口 648
        滚动到底需要滑动 2042