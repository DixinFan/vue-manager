<template>
  <VmImageList :data="dataImageList"  @delete-ok="deletefn" class="vm-margin"></VmImageList>
</template>

<script>
  import Cookies from 'js-cookie'
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8081/index.php/index/index'
  var count = -1
  var VideoTitle = []
  var VideoPoster = []
  var VideoName = []
  import VmImageList from '@/components/vm-recognition-list'
  export default {
    name: 'ImageList',
    components: {
      VmImageList
    },
    data () {
      return {
        dataImageList: []
      }
    },
    mounted: function () {
      this.listPoster()
    },
    methods: {
      async listPoster () {
        var userName = Cookies.get('userName')
        var params = new URLSearchParams()
        params.append('userName', userName)
        await axios.post('/playRecognitedPoster', params)
          .then(function (response) {
            console.log(response.data)
            VideoTitle = response.data.data.VideoTitle
            VideoPoster = response.data.data.VideoPoster
            VideoName = response.data.data.VideoName
            count = response.data.data.count
          })
          .catch(function (error) {
            console.log(error)
          })
        var TempList = []
        var i = 0
        console.log(VideoTitle)
        console.log(VideoPoster)
        console.log(count)
        for (;i < count; i++) {
          TempList.push(
            {
              id: i,
              title: VideoTitle[i],
              img: 'http://localhost:8081/uploads/' + VideoPoster[i],
              desc: 'http://localhost:8081/uploads/' + VideoName[i]
            //   desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever sincc the 1500s ly dummy tly dummy tly dummy tly dummy tly dummy tly dummy t',
            //   detailUrl: '#',
            //   editUrl: '/'
            }
          )
        }
        console.log(TempList)
        this.dataImageList = TempList
      },
      playVideo (x) {
        console.log(x)
      }
    }
  }
</script>
