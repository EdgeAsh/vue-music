<template>
  <div class="music-list">
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html='title'></h1>
    <div class="bg-image" :style='backgroundImag' ref='bgAv'>
      <div class="play-wrapper" ref='plyBtn' v-if='songs.length > 0'>
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref='filter'></div>
    </div>
    <div class="bg-layer" ref='layer'></div>
    <scroll :data1='songs'
            @scroll='scrollMu'
            :probe-type='3'
            :listen-scroll='true'
            class='list' ref='list'>
      <div class="song-list-wrapper">
        <song-list :songs='songs'></song-list>
      </div>
      <div class="loading-container" v-if='!songs.length'>
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  /*
  *==========================
  * @Author: Edge
  * @Version: 1.0
  *==========================
  */
  import Scroll from '@/base/scroll/scroll.vue'
  import SongList from '@/base/song-list/song-list.vue'
  import {prefixStyle} from 'common/js/dom.js'
  import Loading from '@/base/loading/loading.vue'

  // 在滚动时头部预留的高度
  const RESERVED_HEIGHT = 40
  // 根据浏览器添加前缀
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default{
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default() {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    methods: {
      scrollMu(pos) {
        // 获取 scroll组件滚动的垂直距离
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      }
    },
    components: {
      Scroll,
      SongList,
      Loading
    },
    computed: {
      backgroundImag() {
        return `background-image: url(${this.bgImage})`
      }
    },
    watch: {
      scrollY(newY) {
        // .bg-layer 层随着 scroll滚动做过渡动画(有范围),最多滚动距离为this.bgAvHeight
        let transY = Math.max(this.translateY, newY)
        let zIndex = 0
        // 下拉放大效果
        let scale = 1
        // 上滑毛玻璃效果，背景虚化。仅ios 有效果
        let blur = 0
        const percent = Math.abs(newY / this.bgAvHeight)
        if (newY > 0) {
          zIndex = 10
          scale += percent
        } else {
          blur = Math.min(20 * percent, 20)
        }
        // 毛玻璃，背景虚化（仅限ios)
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        // layer 转换
        this.$refs.layer.style[transform] = `translate3d(0,${transY}px,0)`
        // 解决滚动时文字覆盖图片问题
        if (this.translateY > newY) {
          // 更改.bg—image 的高度和 z-index(css 设计时考虑到了，利用这一点)
          zIndex = 10
          this.$refs.bgAv.style['height'] = RESERVED_HEIGHT + 'px'
          this.$refs.bgAv.style.paddingTop = '0'
          // 播放按钮
          this.$refs.plyBtn.style.display = 'none'
        } else {
          // 往回滑的时候
          this.$refs.bgAv.style['height'] = 0
          this.$refs.bgAv.style.paddingTop = '70%'
          this.$refs.plyBtn.style.display = ''
        }

        this.$refs.bgAv.style.zIndex = zIndex
        // 放大 .bg-image
        this.$refs.bgAv.style[transform] = `scale(${scale})`
      }
    },
    beforeCreate() {},
    created() {
    },
    beforeMount() {},
    mounted() {
      // .bg-layer的 translate3d需要图片高度
      this.bgAvHeight = this.$refs.bgAv.clientHeight
      // .bg-layer 能滚动的最大值
      this.translateY = -this.bgAvHeight + RESERVED_HEIGHT
      // 设置歌曲列表距离顶部的距离，高度就是放图片的.
      this.$refs.list.$el.style.top = `${this.bgAvHeight}px`
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
    }
  }
</script>

<style lang='stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>