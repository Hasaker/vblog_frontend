<template>
  <div id="login" data-title="Login - VBLOG">
    <div class="me-login-box me-login-box-radius">
      <h1>VBLOG</h1>
      <el-form ref="userForm" :model="loginData" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="Username" v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="Password" show-password type="password" v-model="loginData.password"></el-input>
        </el-form-item>
        <el-form-item size="medium" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapMutations} from 'vuex'

  export default {
    name: 'Login',

    data() {
      return {
        loginData: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: 'Please input username', trigger: 'blur'},
            {max: 10, message: 'Username should no more than 10 characters', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please input password', trigger: 'blur'},
            {min: 4, max: 16, message: 'Password should between 4 and 16 characters', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      ...mapMutations(['setToken']),

      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/login', this.loginData).then(res => {
              if (res.status === 200 && res.data.code === '1') {
                this.setToken(res.data.data)
                this.$router.push({path:'/'})
              } else {
                this.$notify({
                    title: 'Login notice',
                    message: 'Wrong username or password!',
                    type: 'error'
                });
              }
            })
          }
        });
      }
    }
  }
</script>

<style scoped>
  #login {
    min-width: 100%;
    min-height: 100%;
  }

  .me-login-box {
    position: absolute;
    width: 300px;
    height: 230px;
    background-color: white;
    margin-top: 150px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    box-shadow: 0 0 1px 1px rgba(161, 159, 159, 0.1);
  }

  .me-login-box h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    vertical-align: middle;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }
</style>
