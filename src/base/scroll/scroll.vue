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
      data1: {
        type: Array,
        default: null
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