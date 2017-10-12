<template>
  <transition name='slide'>
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
  /*
  *==========================
  * @Author: Edge
  * @Version: 1.0
  *==========================
  */
  // 取数据语法糖
  import {mapGetters} from 'vuex'

  export default{
    props: {
    },
    data() {
      return {
      }
    },
    methods: {
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    beforeCreate() {},
    created() {
    },
    beforeMount() {},
    mounted() {
      console.log(this.singer, 'vuex')
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
    }
  }
</script>

<style lang='stylus'>
  @import '~common/stylus/variable'
  
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>