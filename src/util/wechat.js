export default wechatShare = () => {
  // let _this = this;
  //微信分享SDK
  this.$axios.get('/api/h5/index/getwechatsdkconf?route='+ encodeURIComponent(window.location.pathname+window.location.search))
    .then(res => {
      // this.config = res.data;
      wx.config(this.config)

      /*s*/
//        分享到朋友圈
      wx.onMenuShareTimeline({
        title: '游戏酱紫,即点即玩,游戏就是这样简单', // 分享标题
        link: 'http://h5.wan855.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://h5.wan855.cn/logo.png', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          alert('分享成功!')
          _this.$axios.get('/api/Integral/Task/share',{
            params: {
              gid: 0
            }
          })
            .then(res => {
              if (res.code === '200'){
                console.log(res.msg)
                location.reload()
              }
            })
            .catch(function(error){
              console.log(error)
            })
        },
        cancel: function () {

        },
        error:function () {
        }
      })
      /*e*/

//        分享给朋友
      wx.onMenuShareAppMessage({
        title: '游戏酱紫', // 分享标题
        desc: '即点即玩,游戏就是这样简单', // 分享描述
        link: 'http://h5.wan855.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://h5.wan855.cn/logo.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          alert('分享成功!')
          _this.$axios.get('/api/Integral/Task/share',{
            params: {
              gid: 0
            }
          })
            .then(res => {
              if (res.code === '200'){
                console.log(res.msg)
                location.reload()
              }
            })
            .catch(function(error){
              console.log(error)
            })
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    })
    .catch(function(error){
        console.log(error)
    })
}