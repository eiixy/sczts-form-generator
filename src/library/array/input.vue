<template>
  <div class="cf-array">

  </div>
</template>

<script>
import formItem from "../form-item"
import { clearNoNum } from '@/utils/utils'
export default {
  extends: formItem,
  methods: {
    inputhandle({target}) {
      clearNoNum(target)
    }
  }
};
</script>

<style lang="scss" scoped>
.cf-object{
  border: 2px dashed #eee;
  width: 100%;
  min-height: 60px;
}
</style>
