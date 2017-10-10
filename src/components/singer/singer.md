#获取到数据之后，根据我们的界面需要对数据结构做更改

##目标数据结构
  得到的单个歌手的数据结构
    Farea:"1"
    Fattribute_3:"3"
    Fattribute_4:"0"
    Fgenre:"0"
    Findex:"X"
    Fother_name:"Joker"
    Fsinger_id:"5062"
    Fsinger_mid:"002J4UUk29y8BY"
    Fsinger_name:"薛之谦"
    Fsinger_tag:"541,555"
    Fsort:"1"
    Ftrend:"0"
    Ftype:"0"
    voc:"0"
  
  目标数据结构
    需要:id,名称，头像
    分两类排名: 热门  姓名首字母
    然后按歌手姓名首字母排序（根据Findex)


##遍历顺序问题
  对象的遍历是无序的，而渲染的时候需要有序输出
  到前段的结果就是
    热门-A-B-C-....-Z