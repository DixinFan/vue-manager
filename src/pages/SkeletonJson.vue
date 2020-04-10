<template>
    <json-viewer
        :value="jsonData"
        :expand-depth=5
        copyable
        boxed
        sort>
    </json-viewer>
</template>

<script>
  import Vue from 'vue'
  import JsonViewer from 'vue-json-viewer'
  Vue.use(JsonViewer)
  import Cookies from 'js-cookie'
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8081/index.php/index/index'
  var TempJson = []
  export default {
    data () {
      return {
        jsonData: []
      }
    },
    mounted: function () {
      this.getSkeleton()
    },
    methods: {
      async getSkeleton () {
        var RenderedVideoName = Cookies.get('RenderedVideoName')
        var params = new URLSearchParams()
        params.append('RenderedVideoName', RenderedVideoName)
        await axios.post('/getSkeleton', params)
          .then(function (response) {
            TempJson = response.data.data
          })
          .catch(function (error) {
            console.log(error)
          })
        this.jsonData = TempJson
      }
    }
  }
</script>
