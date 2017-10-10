<template>
  <div class="loading">
    <img src="/static/loading-svg/loading-spinning-bubbles.svg" width='36' height="36">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  /*
  *==========================
  * @Author: Edge
  * @Version: 1.0
  *==========================
  */
  export default{
    props: {
      title: {
        type: String,
        default: '正在加载中.....'
      }
    }
  }
</script>

<style lang='stylus'>
  @import "~common/stylus/variable"
  
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>