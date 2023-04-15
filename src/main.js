import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/index.scss'
import * as echarts from 'echarts'
import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

// 视频组件成功
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

// 视频组件测试
// import VueCoreVideoPlayer from 'vue-core-video-player'

import VueClipBoard from 'vue-clipboard2'
const app = createApp(App)
app.config.productionTip = false
app.config.globalProperties.$echarts = echarts
app.use(store)
  .use(router)
  .use(Antd)
  .use(Vue3ColorPicker)
  .use(VueCropper)
  .use(VueClipBoard)
  .use(VueVideoPlayer)
  // .use(VueCoreVideoPlayer)
  .mount('#app')
