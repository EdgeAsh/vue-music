/*
* 对歌曲的封装
* id: 歌曲 ID
* mid:
* singer: 歌手
* name: 歌曲名
* album: 专辑
* duration: 播放时长
* image: 歌曲图片
* url: 歌曲播放地址
*/
class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

// 使用工厂函数，简化代码
export function createSong(musicData) {
  const song = new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: getName(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
  return song
}

function getName(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    if (s && s.name) {
      ret.push(s.name)
    }
  })
  return ret.join('/')
}