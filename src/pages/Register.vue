<template>
  <div class="login">
    <Row class="vm-login vm-panel">
    <Col span="10" class="login-form">
      <div class="login-header">
        <img src="../assets/img/logo.png" height="50" alt="">
        <p>基于<span>骨架</span>的动作识别系统</p>
      </div>
      <div class="login-form">
          <Input v-model="UserName" placeholder="请输入用户名"></Input>
          <Input v-model="Password" type="password" placeholder="请输入密码"></Input>
          <Input v-model="CheckPassword" type="password" placeholder="确认密码"></Input>
          <Button type="primary" @click="submit">注册</Button>
      </div>
      <div class="login-footer">
      </div>
    </Col>
    <Col span="14" class="login-ad">
      <!-- <span class="photo-author">Photo: Peng Zhang</span> -->
    </Col>
    </Row>
  </div>
</template>
<script>
  import axios from 'axios'
  var flag = false
  export default {
    data: {
      UserName: '',
      Password: '',
      CheckPassword: ''
    },
    methods: {
      async submit () {
        if (!this.UserName || !this.Password || !this.CheckPassword) {
          confirm('请输入完整信息')
        } else {
          if (this.Password !== this.CheckPassword) {
            confirm('密码不一致')
          } else {
            this.$router.push('/Loading')
            var params = new URLSearchParams()
            params.append('UserName', this.UserName)
            params.append('Password', this.Password)
            await axios.post('http://localhost:8081/index.php/index/index/doRegister/', params)
            .then(function (response) {
              var code = response.data.code
              if (code === 200) {
                flag = true
              }
            })
            if (flag) {
              this.$router.push('/HomePage/VideoPlay')
            }
          }
        }
      }
    }
  }
</script>
