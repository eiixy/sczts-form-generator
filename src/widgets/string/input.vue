<template>
  <el-input v-model="item.value" :placeholder="item.attributes.placeholder"></el-input>
</template>

<script>
import vModel from "../../vModel"
export default {
  extends: vModel
};
</script>
