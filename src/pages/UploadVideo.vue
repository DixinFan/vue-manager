<template>
    <div id="app">
        <Input v-model="value" placeholder="输入视频标题" style="margin-left:30px;width: 300px" />
        <a href="javascript:;" class="file">选择文件
            <input type="file" @change="onFileChange" name="" id="">
        </a>
        <Button style="margin-left:10px" @click="checkUpload">上传</Button>
        <nobr style="margin-left:30px"></nobr>
        <nobr v-for="item in file" :key='item.keyID' style="margin-left:10px">{{ item.name }}
            <a href="javascript:;"  @click="delectFile(item.keyID)">X</a>
        </nobr>
        <br/>
        <br/>
        <div id="preview">
            <img v-if="url" :src="url" alt="http://localhost:8081/uploads/no-preview-available.png"/>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      url: 'http://localhost:8081/uploads/no-preview-available.png',
      value: '',
      file: [],
      uploadFile: [] // 需要上传的文件List
    }
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      if (file.type === 'image/jpeg') {
        this.url = URL.createObjectURL(file)
      }
      let keyID = Math.random().toString().substr(2)
      file['keyID'] = keyID
      this.file.push(file)
      this.uploadFile.push(file)
    },
    delectFile (keyID) { // 删除文件
      this.file = this.file.filter(item => {
        return item.keyID !== keyID
      })
      this.uploadFile = this.uploadFile.filter(item => {
        return item.keyID !== keyID
      })
    },
    checkUpload () { // 上传文件
      if (this.value === '') {
        this.$Message.error('未输入视频标题')
        return false
      }
      if (this.uploadFile.length === 0) {
        this.$Message.error('未选择上传文件')
        return false
      }
      if (this.uploadFile.length === 1) {
        this.$Message.error('选择一个mp4视频文件和一个jpg封面文件')
        return false
      }
      if (this.uploadFile.length > 2) {
        this.$Message.error('仅选择上传一个mp4视频文件和一个jpg封面文件')
        return false
      }
      var FlagOne = (this.uploadFile[0].type === 'image/jpeg') && (this.uploadFile[1].type === 'video/mp4')
      var FlagTwo = (this.uploadFile[1].type === 'image/jpeg') && (this.uploadFile[0].type === 'video/mp4')
      if (FlagOne || FlagTwo) {
        confirm('上传符合规范，立即上传文件')
        this.$router.push('/Loading')
        this.upload()
      } else {
        this.$Message.error('上传一个mp4视频文件和一个jpg封面文件')
        return false
      }
    },
    async upload () {
      var ImageFile = null
      var VideoFile = null
      if (this.uploadFile[0].type === 'image/jpeg') {
        ImageFile = this.uploadFile[0]
        VideoFile = this.uploadFile[1]
      } else {
        ImageFile = this.uploadFile[1]
        VideoFile = this.uploadFile[0]
      }
      let param = new FormData()
      param.append('video', VideoFile)
      var userName = Cookies.get('userName')
      param.append('UserName', userName)
      param.append('VideoTitle', this.value)
      param.append('image', ImageFile)
      console.log(VideoFile)
      console.log(userName)
      console.log(this.value)
      console.log(ImageFile)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      await this.$http.post('http://localhost:8081/index.php/index/index/uploadVideo/', param, config).then(
        function (response) {
          console.log(response.data)
          confirm('上传成功')
          this.$router.push('/HomePage/VideoPlay')
        }
      ).catch(
        function (error) {
          console.log(error)
        }
      )
    }
  }
}
</script>

<style scoped>
    body {
        background-color: #e2e2e2;
    }
    #app {
        padding: 20px;
    }
    #preview {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #preview img {
        max-width: 100%;
        max-height: 500px;
    }
    .file {
        margin: -11px 30px;
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
</style>
