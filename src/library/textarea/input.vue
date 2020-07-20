<template>
  <el-input
    v-model="item.value"
    type="textarea"
    :rows="item.attributes.rows||3"
    :placeholder="item.attributes.placeholder"
  ></el-input>
</template>

<script>
import formItem from "../form-item"
export default {
  extends: formItem
};
</script>
