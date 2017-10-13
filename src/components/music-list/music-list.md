#列表高度会覆盖顶部歌手信息
  获取顶部元素的高度 height，给 scroll设置 css 的top 值为height
  能`${this.$refs.bgAv.clientHeight}px`获取这个高度，css/html 结构需要配合

##交互效果
  使用.bg-layer（注意此标签的位置） 帮助实现效果
  实现：监听 scroll组件的事件获取滚动距离scrollY，.bg-layer根据 scrollY做动画
      因为.bg-layer 只有一屏的高度，需要设置.bg-layer 的transform:translate3d 的值
      如果.bg-layer的translate3d已经到了顶部（这段距离就是图片的高度），则不需要在过渡了。（获取.bg-image(图片)的高度）

      解决滚动过程中，文字覆盖图片的问题
        利用 z-index，更改.bg-image的 z-index和高度

      歌单下拉，图片放大效果
        使用 scale，根据下拉距离改变 scale值