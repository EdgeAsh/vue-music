<template>
  <div class="recommend" ref="recommend">
    <scroll ref='scroll' :data1="discList" class="recommend-content">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for='recom in recommends'>
              <a :href="recom.linkUrl">
                <img :src="recom.picUrl" @load='imgDone'>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title"> 热门歌单推荐</h1>
          <ul>
            <li class="item" v-for='item in discList'>
              <div class="icon"><img :src="item.imgurl" width='60' height="60"></div>
              <div class="text">
                <h3 class="name" v-html='item.creator.name'></h3>
                <p class="desc" v-html='item.dissname'></p>
              </div>
            </li>
          </ul>
        </div>
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
  import {getRecommend, getDicsList} from '@/api/recommend.js'
  import {ERR_OK} from '@/api/config.js'
  import Slider from '@/base/slider/slider.vue'
  import Scroll from '@/base/scroll/scroll'

  export default{
    props: {
    },
    data() {
      return {
        recommends: {
          type: Array,
          default: []
        },
        discList: [],
        imgChecked: false
      }
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data.slider)
            this.recommends = res.data.slider
          }
        })
      },
      _getDicsList() {
        getDicsList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.discList = res.data.list
          }
        })
      },
      imgDone() {
        // 只需要执行一次
        if (!this.imgChecked) {
          this.$refs.scroll.refresh()
          console.log('img done first')
          this.imgChecked = true
        }
      }
    },
    components: {
      Slider,
      Scroll
    },
    computed: {
    },
    created() {
      setTimeout(() => {
        this._getRecommend()
        // 只要时间少于，可滑动的距离就会多很多，这是个错误
      }, 100)
      this._getDicsList()
    }
  }
</script>

<style lang='stylus'>
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>