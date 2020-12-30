<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item style="float: right;">
            <el-button size='small' type="primary" @click="cancel">取消</el-button>
            <el-button size='small'  @click="onSubmit">确定</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdate, getRoleID } from '../../../services/role'
import Vue from 'vue'
export default Vue.extend({
  name: 'RoleCreateOrEdit',
  props: {
    RoleId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    this.loadRoleId()
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdate(this.form)
      if (data.code === '000000') {
        this.$message.success('创建成功')
        this.$emit('success')
      }
    },
    async loadRoleId () {
      const { data } = await getRoleID(this.RoleId)
      this.form = data.data
    },
    cancel () {
      this.$emit('cancel')
    }
  }
})
</script>

<style lang="scss" scoped>
h{
    text-align: center;
    float: right;
}
</style>