<template>
  <div class="menu">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
            <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
            <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
            v-for="item in menuInfoList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            ></el-option>

            </el-select>
        </el-form-item>
        <el-form-item label="描述">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
            <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
            <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum"></el-input-number>
            <!-- <el-input v-model="form.orderNum"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdate, getEditMenuInfo, getMenuEdit } from '@/services/menu'
export default {
  name: 'menu-create',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true
      },
      menuInfoList: []
    }
  },
  created () {
    this.loadMenuInfo()
    if (this.isEdit) {
      this.loadMenuEdit()
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdate(this.form)
      this.$router.back()
    },
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo()
      this.menuInfoList = data.data.parentMenuList
    },
    async loadMenuEdit () {
      const { data } = await getMenuEdit(this.$route.params.id)
      this.form = data.data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>