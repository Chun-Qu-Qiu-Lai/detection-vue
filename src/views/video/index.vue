<template>
  <a-spin tip="上传检测中..." size="large" :spinning="data.spinning">
    <div class="uploadVideo" style="padding: .7rem 0.5rem;width: 15%;text-align: center;letter-spacing: 0.1rem;">
      <a-upload
        style="width: 900px !important; display: flex !important;background-color: red !important;color: #fff !important;"
        @change="handleChange" v-model:file-list="data.fileList" name="file" :action="data.host"
        :data="data.signaturesignatureFormData" :showUploadList="false" :maxCount=1 :beforeUpload="beforeUpload"
        accept="video/*">
        上传视频检测
      </a-upload>
    </div>
    <!-- <video-player class="video-player-custom" ref="videoPlayer" :options="playerOptions" :playsinline="true"
    customEventName="customstatechangedeventname" @play="onPlayerPlay" @pause="onPlayerPause" @ended="onPlayerEnded"
    @ready="playerReadied" @statechanged="playerStateChanged" @playing="onPlayerPlaying" @waiting="onPlayerWaiting"
    @loadeddata="onPlayerLoadeddata" @timeupdate="timeupdate" @canplay="onPlayerCanplay"
    @canplaythrough="onPlayerCanplaythrough">
  </video-player> -->
    <video-player  controls style="width: 600px !important;height: 500px !important;margin:0 auto;box-shadow:5px 5px 8px #888888"
      class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="data.playerOptions"
      v-if="!data.showV" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)" @statechanged="playerStateChanged($event)" @ready="playerReadied">
    </video-player>
    <!-- <vue-core-video-player src="https://oss-zscyun.oss-cn-beijing.aliyuncs.com/1221212.mp4"></vue-core-video-player> -->
  </a-spin>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import 'video.js/dist/video-js.css'
import { message } from 'ant-design-vue'

// import VueCoreVideoPlayer from 'vue-core-video-player'
// Vue.use(VueCoreVideoPlayer, {
//   lang: 'zh-CN'
// })

export default defineComponent({
  name: 'videoIndex',
  components: {
    // VueCoreVideoPlayer
  },
  setup () {
    const data = reactive({
      playerOptions: {
        width: 500,
        height: 400,
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选择的播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4',
          // src: './static/videos/demo.mp4'//url地址
          // src: '.../.../.../.../.../.../.../.../.../public/videos/demo.mp4'//url地址
          src: 'https://oss-zscyun.oss-cn-beijing.aliyuncs.com/1221212.mp4'// url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        controls: true,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 全屏按钮
        }
      },
      countBug: 0,
      spinning: false,
      signaturesignatureFormData: {
        key: '',
        policy: '',
        OSSAccessKeyId: 'LTAI5tNaT4y5Ta2YVh6YpU82',
        success_action_status: '200',
        callback: '',
        signature: ''
      },
      fileList: [],
      host: 'https://oss-zscyun.oss-cn-beijing.aliyuncs.com/',
      showV: false
    })
    // 上传之前
    const beforeUpload = async () => {
      data.spinning = true
      setTimeout(() => {
        message.success('检测成功')
        data.showV = true
        data.spinning = false
      }, 5000)
      // const { data: res } = await getVideoSignature()
      // console.log(res)
      // if (res.code === 200) {
      //   data.signaturesignatureFormData.key = res.data.dir
      //   data.host = res.data.host
      //   data.signaturesignatureFormData.policy = res.data.policy
      //   data.signaturesignatureFormData.OSSAccessKeyId = res.data.accessKeyId
      //   data.signaturesignatureFormData.success_action_status = '200'
      //   data.signaturesignatureFormData.signature = res.data.signature
      // }
    }
    // 当视频改变
    const handleChange = async (info) => {
      // if (info.file.percent === 100) {
      //   data.countBug = data.countBug + 1
      //   if (data.countBug === 2) {
      //     data.countBug = 0
      //     const s = 'https://oss-zscyun.oss-cn-beijing.aliyuncs.com/' + data.signaturesignatureFormData.key
      //     const { data: res } = await picDetect(s)
      //     if (res.code === 200) {
      //       message.success('检测成功')
      //       data.playerOptions.sources[0].src = res.data
      //     }
      //   }
      // }
    }
    function onPlayerPlay (player) {
      console.log('player play!', player)
    }
    function onPlayerPause (player) {
      console.log('player pause!', player)
    }
    function onPlayerEnded (player) {
      console.log('player onPlayerEnded!', player)
    }
    function onPlayerWaiting (player) {
      console.log('player onPlayerWaiting!', player)
    }
    function onPlayerPlaying (player) {
      console.log('player onPlayerPlaying!', player)
    }
    function onPlayerLoadeddata (player) {
      console.log('player onPlayerLoadeddata!', player)
    }
    function onPlayerTimeupdate (player) {
      console.log('player onPlayerTimeupdate!', player)
    }
    function onPlayerCanplay (player) {
      console.log('player onPlayerCanplay!', player)
    }
    function onPlayerCanplaythrough (player) {
      console.log('player onPlayerCanplaythrough!', player)
    }
    // ...player event

    // or listen state event
    function playerStateChanged (playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    }

    // player is ready
    function playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }

    return {
      beforeUpload,
      handleChange,
      data,
      onPlayerPlay,
      playerReadied,
      playerStateChanged,
      onPlayerCanplaythrough,
      onPlayerCanplay,
      onPlayerTimeupdate,
      onPlayerLoadeddata,
      onPlayerPlaying,
      onPlayerWaiting,
      onPlayerEnded,
      onPlayerPause
    }
  }
})

</script>
<style lang="scss" scoped>
.uploadVideo {
  background-color: #40a9ff;
  color: #fff;
  cursor: pointer;
  border-radius: .3rem;
  box-shadow: 2px 2px 5px rgb(215, 201, 112);
  font-weight: 700;
  margin: 0 auto;
}

.uploadVideo:hover {
  background-color: #a2e6cf;
  transition: .3s;
  box-shadow: 2px 2px 5px rgb(141, 222, 237);
}

.ant-upload {
  width: 900px !important;
  display: flex !important;
}

.ant-upload,
.ant-upload-select,
.ant-upload-select-text {
  display: flex !important;
  width: 900px !important;
}

// 播放器
</style>
