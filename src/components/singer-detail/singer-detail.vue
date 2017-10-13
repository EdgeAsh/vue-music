<template>
  <transition name='slide'>
    <music-list :bg-image='bgImage' :songs='songLists' :title='title'></music-list>
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
  import {getSingerDetail} from '@/api/singer.js'
  import {ERR_OK} from '@/api/config.js'
  import {createSong} from '@/class/Song.js'
  import MusicList from '@/components/music-list/music-list.vue'

  export default{
    props: {
    },
    data() {
      return {
        songLists: []
      }
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          // 针对用户在当前页面刷新的情况
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            // 获取歌手的歌曲列表
            this.songLists = this._refactorSongs(res.data.list)
            // console.log(this.songLists[0])
          }
        })
      },
      _refactorSongs(list) {
        // 对数据重构，构建自己需要的数据结构.只要 musicData数据
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          // 需要歌曲 id, albumid
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
      bgImage() {
        return this.singer.avatar
      },
      title() {
        return this.singer.name
      }
    },
    beforeCreate() {},
    created() {
      this._getDetail()
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
  
  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: $color-background
  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>