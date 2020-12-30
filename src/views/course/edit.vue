<template>
  <div>
    <create-or-update :isEdit="true" :courseId="courseId"></create-or-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'
export default Vue.extend({
  name: 'CourseEdit',
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style scoped></style>