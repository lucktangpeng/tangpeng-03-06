<template>
    <div class="login">
      <el-form
        class="login_form"
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="ClickLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { login } from '../../services/user'
import { mapMutations } from 'vuex'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async ClickLogin () {
      const { data } = await login(this.form)
      if (data.state !== 1) {
        return this.$message.error(data.message)
      }
      this.setUser(data.content)
      console.log(this.$route.query.redirect)
      this.$router.push(this.$route.query.redirect as string || '/')
      this.$message({
        message: '登录成功',
        type: 'success'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    .login_form {
        width: 250px;
        background: #fff;
        padding: 30px;
        border-radius: 5px;
        .el-button {
            width: 100%;
        }
    }
}
</style>