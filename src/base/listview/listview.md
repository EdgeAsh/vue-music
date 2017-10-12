#悬浮标题栏优化
  fixedTitle
  页面滑动，标题栏切换时随着滑动有动画效果(出现、消失时)

##实现
  定义一个属性 diff，(diff是 fixedTitle 与即将要替换 fixedTitle的标题栏的差值)
  diff 根据滚动距离 scrollY 获得,为滚动距离(负的)与当前视口所在页面下限位置只和
  watch 属性观察 diff
  需要标题高度FIXED_TITLE_HEIGHT，css确定30
  如果 diff值小于30,fixedTitle就需要过渡动画了

  fixedTitle 标签做translate动画，距离是 diff与FIXED_TITLE_HEIGHT差值