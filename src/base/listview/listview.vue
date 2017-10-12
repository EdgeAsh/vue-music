<template>
  <scroll class="listview" ref="listview"
    :data1='groups'
    :listenScroll='listenScroll'
    @scroll='scrollIng'
    :probeType='probeType'
  >
    <ul>
      <li v-for='group in groups' class="list-group" ref='listGroup'>
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.itemList">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
        @touchstart='onShotcutTouchStart'
        @touchmove.stop.prevent='onShotcutTouchMove'>
      <ul>
        <!-- 定义 data-index 存放 索引 -->
        <li class="item" 
            v-for='(item, index) in menuList'
            :data-index='index' 
            :class="{current: index === setIndex}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show='scrollY <= 0' ref='fixed'>
      <h2 class="fixed-title">{{fixedTile}}</h2>
    </div>
    <div class="loading-container" v-show="!groups.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  /*
  *==========================
  * @Author: Edge
  * @Version: 1.0
  *==========================
  */
  import Scroll from '@/base/scroll/scroll.vue'
  import {getData} from 'common/js/dom.js'
  import Loading from '@/base/loading/loading.vue'

  const MENU_ITEM_HIGHT = 18
  const FIXED_TITLE_HEIGHT = 30

  export default{
    props: {
      groups: Array
    },
    data() {
      return {
        listHeight: [],
        currentIndex: 0,
        scrollY: 0,
        diff: -1
      }
    },
    methods: {
      onShotcutTouchStart(e) {
        // 获取被点击条目的索引, scroll滚动
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        console.log(anchorIndex)
        // 保存第一次触摸位置,索引
        this.touch.anchorIndex = Number(anchorIndex)
        this.touch.y1 = firstTouch.pageY
        // 滚动
        this._scrollTo(anchorIndex)
      },
      onShotcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / MENU_ITEM_HIGHT | 0
        // 实际滚动到索引
        let anchorIndex = this.touch.anchorIndex + delta
        this._scrollTo(anchorIndex)
      },
      scrollIng(pos) {
        // 获取子组件 scroll事件 传来的位置信息。滑动就会调用。
        this.scrollY = pos.y
        // console.log(pos.y)
        this.whereIsIndex()
      },
      whereIsIndex() {
        // 滑动的值，手指上滑的时候是负数。在头部下拉的时候是正的； 滑动位置分三种情况
        let sy = this.scrollY
        // 在头部下拉滑动的时候
        if (sy > 0) {
          this.currentIndex = 0
          return
        }
        const hList = this.listHeight
        // 在中间部分。遍历 listHeight，确定区间返回缩影值。
        let len = hList.length - 1
        for (let i = 0; i < len; i++) {
          let h1 = hList[i]; let h2 = hList[i + 1]
          if (h1 <= -sy && h2 > -sy) {
            this.currentIndex = i
            this.diff = h2 + sy
            return
          }
        }
        // 滚动到底部的时候
        if (hList[len] < -sy) {
          this.currentIndex = len
          return
        }
        console.log(1)
      },
      _scrollTo(index) {
        /* 空白区域无效&&索引值是有范围的(范围可以由目录个数定)
         * 从目录底部空白区上滑时，index应该从最后一个目录开始
        */
        // console.log(index, 'b')
        if (!index && index !== 0) {
          // index 为 null
          console.log(index, !index)
          return
        }

        if (index < 0) {
          // 到达目录上边界
          index = 0
        } else if (index > this.menuList.length - 1) {
          // 到达目录下边界
          index = this.menuList.length - 1
        }
        console.log(index, 'a')
        // 设置右侧目录条目样式
        this.currentIndex = Number(index)
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight() {
        // 将每组的高度区间存放于数组listHeight中维护
        let height = 0
        let list = this.$refs.listGroup
        // 第一组的位置就是0
        list.forEach((group) => {
          this.listHeight.push(height)
          // 最后一组的高度没有加上去，目录跟页面组数是一致的
          height += group.clientHeight
        })
        let res = []
        this.listHeight.map((item, ind) => {
          if (ind > 20) res.push(item)
        })
        console.log(height, res)
      }
    },
    components: {
      Scroll,
      Loading
    },
    computed: {
      // 获取右侧快速列表
      menuList() {
        return this.groups.map((item) => {
          return item.title.substr(0, 1) // 获取第一个字符
        })
      },
      setIndex() {
        return this.currentIndex
      },
      fixedTile() {
        // 悬浮条目标题
        return this.groups[this.currentIndex] ? this.groups[this.currentIndex].title : ''
      }
    },
    watch: {
      groups() {
        this.$nextTick(function() {
          this._calculateHeight()
        })
      },
      diff(newVal) {
        // newVal就是data中diff参数改变的值
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          // 为减少 dom操作
          return
        }
        this.fixedTop = fixedTop

        // dom 操作，标题过渡动画
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        console.log(`val:${parseInt(newVal)}`)
      }
    },
    created() {
      this.touch = {
        anchorIndex: Number,
        y1: Number,
        y2: Number
      }
      this.probeType = 3
      this.listenScroll = true
      this.listHeight = []
    }
  }
</script>

<style lang='stylus'>
  @import '~common/stylus/variable'
  
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>