<template>
  <el-input v-model="item.value" :placeholder="item.attributes.placeholder"></el-input>
</template>

<script>
import formItem from "../form-item"
export default {
  extends: formItem
};
</script>
