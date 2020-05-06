<template>
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <img :src="img" alt="">
      <div v-if="editable && type == 'vertical'" class="control">
        <span class="create">
          <i class="fa fa-line-chart" @click="recogniteOk(desc)"></i>
        </span>
        <span class="create">
          <i class="fa fa-file-code-o" @click="skeletonOk(desc)"></i>
        </span>
        <span class="edit">
            <i class="fa fa-play" @click="playOk(img, desc)"></i>
        </span>
        <span class="delete">
          <i class="fa fa-trash" @click="deleteOk(desc)"></i>
        </span>
      </div>
    </div>
    <div class="card-desc panel-body">
      <h2>{{ title }}</h2>
    </div>
    <Modal
        v-model="modalDelete"
        title="Delete"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="deleteOk">
        Are you sure to delete this data?
    </Modal>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import axios from 'axios'
  var DeleteFlag = false
  export default {
    name: 'VmCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      editable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Title'
      },
      img: {
        type: String,
        default: require('@/assets/img/img-1.jpg')
      },
      desc: {
        type: String,
        default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s'
      }
    },
    data: function () {
      return {
        modalDelete: false
      }
    },
    methods: {
      // deleteOk: function () {
      //   this.$emit('delete-ok')
      // },
      async deleteOk (desc) {
        // this.$emit('delete-ok')
        confirm('确认删除本条动作识别结果？')
        this.$router.push('/Loading')
        desc = desc.substr(30)
        var params = new URLSearchParams()
        params.append('RenderedVideoName', desc)
        await axios.post('http://localhost:8081/index.php/index/index/deleteRenderedVideo/', params)
        .then(function (response) {
          var code = response.data.code
          if (code === 200) {
            DeleteFlag = true
          }
        })
        if (DeleteFlag) {
          confirm('删除成功')
          this.$router.push('/HomePage/RecognizedVideo')
        }
      },
      playOk: function (img, desc) {
        console.log(img)
        console.log(desc)
        Cookies.set('VideoPoster', img)
        Cookies.set('VideoURL', desc)
        this.$router.push('/PlayPage')
      },
      recogniteOk: function (desc) {
        desc = desc.substr(30)
        Cookies.set('RenderedVideoName', desc)
        console.log(desc)
        this.$router.push('/HomePage/charts')
      },
      skeletonOk: function (desc) {
        desc = desc.substr(30)
        Cookies.set('RenderedVideoName', desc)
        console.log(desc)
        this.$router.push('/SkeletonJson')
      }
    }
  }
</script>
