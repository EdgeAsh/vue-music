export class Singer {
  constructor(opt) {
    this.id = opt.id
    this.name = opt.name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${opt.avId}.jpg?max_age=2592000`
  }
}