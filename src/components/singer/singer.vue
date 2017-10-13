<template>
  <div class="singer">
    <list-view :groups='singerList' @select='getSinger'></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  /*
  *==========================
  * @Author: Edge
  * @Version: 1.0
  *==========================
  */
  import {getSingerList} from '@/api/singer.js'
  import {ERR_OK} from '@/api/config'
  import {Singer} from '@/class/Singer.js'
  import ListView from '@/base/listview/listview.vue'
  // 语法糖
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default{
    props: {
    },
    data() {
      return {
        singerList: []
      }
    },
    methods: {
      getSinger(singer) {
        // console.log(singer)
        this.$router.push({path: `/singer/${singer.id}`})
        this.setSinger(singer)
      },
      _initSinger() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data.list)
            let hh = this._refactorSinger(res.data.list)
            // 为了显示加载歌手列表动画
            setTimeout(() => {
              this.singerList = hh
            }, 1000)
          }
        })
      },
      _refactorSinger(list) {
        // 获取所得数据前10条为热门 存入 map的 hot属性，
        // 其余的以Findex为属性存入 map
        // 需要歌手的 id,name,avatar
        let map = {
          hot: {
            title: HOT_NAME,
            itemList: []
          }
        }
        // 遍历数组，分类存放
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map['hot']['itemList'].push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
              avId: item.Fsinger_mid
            }))
            return
          }
          const key = item.Findex
          // 以 Findex 为属性
          if (!map[key]) {
            map[key] = {title: key, itemList: []}
          }
          map[key]['itemList'].push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avId: item.Fsinger_mid
          }))
        })
        // 处理 map,为了有序遍历A-Z. 存放到数组中，"热门"放第一位，A-Z 顺序排
        let hot = []
        let aZ = []

        // 遍历 map, "热门"放第hot中，A-Z 放 aZ 中
        for (let key in map) {
          if (map[key].title === HOT_NAME) {
            hot.push(map[key])
          } else if (map[key].title.match(/[a-zA-Z]/)) {
            aZ.push(map[key])
          }
        }
        // 将数组aZ中元素按 A-Z排序
        aZ.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // console.log([...hot, ...aZ])
        // 合并数组，hot 排第一位
        // console.log(hot.concat(aZ))
        return [...hot, ...aZ]
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    },
    computed: {
    },
    beforeCreate() {},
    create() {
    },
    beforeMount() {},
    mounted() {
      this._initSinger()
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
    }
  }
</script>

<style lang='stylus'>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>