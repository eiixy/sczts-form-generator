<template>
  <el-date-picker
    class="w100"
    v-model="item.value"
    value-format="yyyy-MM-dd HH:mm:ss"
    type="date"
    :placeholder="item.attributes.placeholder"
  ></el-date-picker>
</template>

<script>
import formItem from "../form-item"
export default {
  extends: formItem
};
</script>
