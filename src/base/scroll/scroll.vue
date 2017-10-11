<template>
  <div ref='wrapper'>
    <slot></slot>
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

  export default{
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data1: Array,
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    methods: {
      _initscroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        // 由父组件决定是否要监听 scroll 事件(better-scroll 派发)
        if (this.listenScroll) {
          this._onscroll()
        }
      },
      // 代理方法
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        // this.scroll && this.scroll.refresh()
        if (this.scroll) {
          this.scroll.refresh()
          // console.log('scroll refreshed')
        }
      },
      scrollTo(...rest) {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, rest)
      },
      scrollToElement(...rest) {
        // console.log(rest instanceof Array, arguments instanceof Array)
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, rest)
      },
      _onscroll() {
        // 监听 scroll事件
        let me = this
        this.scroll.on('scroll', (pos) => {
          // 将位置信息传递到父组件
          me.$emit('scroll', pos)
        })
      }
    },
    components: {
    },
    computed: {
    },
    watch: {
      data1() {
        setTimeout(() => {
          this.refresh()
          console.log('data1 changed')
        }, 20)
      }
    },
    beforeCreate() {},
    create() {
    },
    beforeMount() {},
    mounted() {
      setTimeout(() => {
        this._initscroll()
      }, 20)
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
    }
  }
</script>

<style lang='stylus'>
</style>