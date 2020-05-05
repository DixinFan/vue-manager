<template>
  <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
    <div class="card-img">
      <img :src="img" alt />
      <div v-if="editable && type == 'vertical'" class="control">
        <span class="edit">
          <i class="fa fa-pencil" @click="recogniteOk(desc)"></i>
        </span>
        <span class="edit">
          <!-- <a :href="editUrl"> -->
          <i class="fa fa-play" @click="playOk(img, desc)"></i>
          <!-- </a>      -->
        </span>
        <span class="delete">
          <i class="fa fa-trash" @click="modalDelete=true"></i>
        </span>
      </div>
    </div>
    <div class="card-desc panel-body">
      <h2>{{ title }}</h2>
      <!-- <p>{{ desc }}</p> -->
      <!-- <a :href="detailUrl">
        more >
      </a>-->
    </div>
    <!-- <Modal
        v-model="modalEdit"
        title="Edit"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="editOk">
        Are you sure to open this video?
    </Modal>-->
    <Modal
      v-model="modalDelete"
      title="Delete"
      ok-text="OK"
      cancel-text="Cancel"
      v-on:on-ok="deleteOk"
    >Are you sure to delete this data?</Modal>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axios from 'axios'
var flag = false
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
      default:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    }
    // detailUrl: {
    //   type: String,
    //   default: '#'
    // },
    // editUrl: {
    //   type: String,
    //   default: '#'
    // }
  },
  data: function () {
    return {
      modalDelete: false
    }
  },
  methods: {
    deleteOk: function () {
      this.$emit('delete-ok')
    },
    playOk: function (img, desc) {
      console.log(img)
      console.log(desc)
      Cookies.set('VideoPoster', img)
      Cookies.set('VideoURL', desc)
      this.$router.push('/PlayPage')
    },
    // recogniteOk: function(desc) {
    async recogniteOk (desc) {
      confirm('开始进行动作识别，请等待，识别结果将位于已识别列表。')
      this.$router.push('/Loading')
      desc = desc.substr(30)
      console.log('i am desc')
      console.log(desc)
      await axios.get('http://192.168.1.7:5000/recognite?video=' + desc)
      .then(function (response) {
        console.log('i am response')
        console.log(response.data)
        flag = true
      })
      if (flag) {
        this.$router.push('/HomePage/RecognizedVideo')
      }
    }
  }
}
</script>
