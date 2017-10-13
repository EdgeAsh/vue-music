import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from './config.js'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    pagenum: 1
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(mid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: mid,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen'
  })

  return jsonp(url, data, options)
}