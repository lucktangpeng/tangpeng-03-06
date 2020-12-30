<template>
  <div>
    <el-table
      :data="data.records"
      align='center'
      v-loading='isloading'
      v-if="labelList.length > 0"
      border
      style="width: 100%">
      <el-table-column
        v-for="item in labelList"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label">
      </el-table-column>
      <!-- <slot name="tableColumn" slot-scope="scope" :row='scope'></slot> -->
      <el-table-column
        fixed="right"
        label="操作"
        width="140">
        <slot name='edit' slot-scope="scope" :row='scope'></slot>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :disabled='isloading'
      :current-page="data.current"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="data.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PageTable',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isloading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-bottom: 20px;
}
</style>