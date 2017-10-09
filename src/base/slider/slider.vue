<template>
  <div class="slider" ref='slider'>
    <div class="slider-group" ref='sliderGroup'>
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class='{active: index === currentPage}'></span>
    </div>
  </div>
</template>

<script>
  /*
  *==========================
  * @Author: Edge
  * @Version: 1.0
  *==========================
  */
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom.js'

  export default{
    props: {
      interval: {
        type: Number,
        default: 3000
      },
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dots: [],
        currentPage: 0
      }
    },
    methods: {
      _setSliderWidth(resize = false) {
        this.childrens = this.$refs.sliderGroup.children
        // console.log(this.childrens)
        if (!resize) {
          let length = this.childrens.length
          this.dots = new Array(length)
        }
        // 获取 slider 元素的宽度，将改宽度设置给每一个 slider item, each item sum up sliderGroup's width
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let ch of this.childrens) {
          ch.style.width = sliderWidth + 'px'
          // 添加 class
          addClass(ch, 'slider-item')
          width += sliderWidth
        }
        if (this.loop && !resize) {
          // 因为 better-scroll 多复制了两个
          width += 2 * sliderWidth
        }
        // console.log(width)
        this.$refs.sliderGroup.style.width = width + 'px'
        // 自动播放
        if (this.autoPlay) {
          this._play()
        }
      },
      _initSlider() {
        // 注意元素
        /*
         * 设置snap选项时实例化 BScroll会自动克隆头尾两个条目，
         * 原最后一条副本插在第一条前
         * 原第一条的副本跟在最后一条
        */
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {loop: this.loop, threshold: 0.2, speed: 400}
        })

        // 监听 slider的事件 scrollEnd
        this.slider.on('scrollEnd', () => {
          this.currentPage = this.slider.getCurrentPage().pageX - 1
          if (this.autoPlay) {
            this._play()
          }
        })
      },
      _play() {
        clearTimeout(this.timer)
        let page = this.currentPage + 1
        // 循环播放
        this.timer = setTimeout(() => {
          this.slider.goToPage(page + 1, 0, 1000)
        }, this.interval)
      },
      _listenResize() {
        window.onresize = () => {
          if (!this.slider) return
          this._setSliderWidth(true)
          this.slider.refresh()
        }
      }
    },
    components: {
      BScroll
    },
    computed: {
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
        this._listenResize()
      }, 20)
    },
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>
  
<style lang='stylus'>
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>