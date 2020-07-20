<template>
  <el-date-picker
    class="w100"
    v-model="item.value"
    type="datetime"
    :placeholder="item.attributes.placeholder"
  ></el-date-picker>
</template>

<script>
import formItem from "../form-item"
export default {
  extends: formItem
};
</script>
