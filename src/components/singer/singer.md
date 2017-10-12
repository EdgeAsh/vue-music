#获取到数据之后，根据我们的界面需要对数据结构做更改

##目标数据结构
  得到的单个歌手的数据结构
    Farea:"1"
    Fattribute_3:"3"
    Fattribute_4:"0"
    Fgenre:"0"
    Findex:"X"
    Fother_name:"Joker"
    Fsinger_id:"5062"
    Fsinger_mid:"002J4UUk29y8BY"
    Fsinger_name:"薛之谦"
    Fsinger_tag:"541,555"
    Fsort:"1"
    Ftrend:"0"
    Ftype:"0"
    voc:"0"
  
  目标数据结构
    需要:id,名称，头像
    分两类排名: 热门  姓名首字母
    然后按歌手姓名首字母排序（根据Findex)


##遍历顺序问题
  对象的遍历是无序的，而渲染的时候需要有序输出
  到前段的结果就是
    热门-A-B-C-....-Z

    完成之后，使用自定义的组件 listview(基于 自定义组件scroll)

##右侧悬浮目录栏问题 (在 ListView 组件实现)
    目标：左边滑动，右侧目录需要对应显示。右侧点击，左侧可以跳转到相应的内容

    右侧点击，左侧响应：（右侧点击，获取到被点击对象的索引。左侧根据此索引移动）
        根据原生 DOM 事件，使用标签的 data-*属性存放目录索引
        使用 scroll 的 scrollToElement 方法移动页面
        (关键还是要懂 better-scroll 的 api)

        右侧需要支持滑动
        （获取初始位置‘ontouchstart’和离开屏幕位置'ontouchend'，根据两者纵向坐标差值确定左侧 scroll滑动到哪）
            了解原生 event 对象能拿到什么（包含信息量很大）


    左侧滑动，右侧响应：（左侧滑动，右侧变换目录位置高亮)
        获取左侧滑动的距离scrollY与当前右侧的目录位置currentIndex(以容器顶部为界)
        右侧当前条目的位置区间 小于 滑动距离  ？改变当前目录 ： 不改变

        实现：监听 scroll组件的 scroll 事件，它会给出位置信息
            遍历歌手列表，将每组在页面的位置（头，尾）使用数组listHeight维护。
            遍历listHeight, 查看scrollY会落在哪个区间。currentIndex 就是符合条件的数组索引值



