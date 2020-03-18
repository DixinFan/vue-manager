<template>
  <div class="login">
    <Row class="vm-login vm-panel">
    <Col span="10" class="login-form">
      <div class="login-header">
        <img src="../assets/img/logo.png" height="80" alt="">
        <p><span>VUE</span>MANAGER</p>
      </div>
      <div class="login-form">
          <Input v-model="username" placeholder="please enter username"></Input>
          <Input v-model="password" type="password" placeholder="Please enter password"></Input>
          <Button type="primary" @click="submit">Login</Button>
      </div>
      <div class="login-footer">
        <Checkbox v-model="remenber">Remenber</Checkbox>
        <span class="forget"><a href="#">Forget Password</a></span>
      </div>
    </Col>
    <Col span="14" class="login-ad">
      <span class="photo-author">Photo: Jure Kravanja</span>
    </Col>
    </Row>
  </div>
</template>
<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  var flag = false
  export default {
    data: {
      username: '',
      password: ''
    },
    methods: {
      async submit () {
        this.$router.push('/Loading')
        var params = new URLSearchParams()
        params.append('userName', this.username)
        params.append('password', this.password)
        await axios.post('http://localhost:8081/index.php/index/index/doLogin/', params)
        .then(function (response) {
          var code = response.data.code
          if (code === 200) {
            flag = true
          }
        })
        if (flag) {
          Cookies.set('userName', this.username)
          this.$router.push('/HomePage')
        }
      }
    }
  }
</script>
