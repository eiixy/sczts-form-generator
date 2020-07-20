<template>
  <el-input
    class="w100"
    @input.native="inputhandle"
    :placeholder="item.attributes.placeholder"
    v-model="item.value"
    controls-position="right"
  ></el-input>
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
