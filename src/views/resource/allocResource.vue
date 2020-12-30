<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色资源管理</span>
      </div>
      <el-tree
      :data="allResource"
      :props="defaultProps"
      show-checkbox
      >
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceAll, AllocateRoleResources } from '../../services/resource'
export default Vue.extend({
  name: 'allocResource',
  props: {
    RoleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      allResource: [{
        label: '一级 1',
        children: [
          {
            label: '二级 1-1'
          },
          {
            label: '二级 1-1'
          },
          {
            label: '二级 1-1'
          },
          {
            label: '二级 1-1'
          }
        ]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
    this.loadResourceAll()
  },
  methods: {
    async loadResourceAll () {
      const { data } = await getResourceAll()
      console.log(data)
    }
    // async loadAllocateRoleResources () {
    //   const { data } = await AllocateRoleResources()
    // }
  }
})
</script>

<style scoped>
::v-deep .el-tree-node.is-expanded > .el-tree-node__children {
  display: flex;
}

::v-deep .el-icon-caret-right:before {
  content: none;
}
::v-deep .el-tree-node__content {
  padding: 20px !important;
  border: 1px solid #dcdfe6;
  /* margin: 20px 0 20px 0; */
  /* padding-top: 20px;
  padding-bottom: 20px; */
}
/* ::v-deep .el-tree-node > .el-tree-node__content {
  padding: 20px !important;
} */

</style>