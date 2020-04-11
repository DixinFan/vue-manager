// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import '!style-loader!css-loader!less-loader!./theme/index.less'

Vue.config.productionTip = false

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

import VueResource from 'vue-resource'
Vue.use(VueResource)

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

import JsonViewer from 'vue-json-viewer/ssr'
Vue.use(JsonViewer)
import 'vue-json-viewer/style.css'
