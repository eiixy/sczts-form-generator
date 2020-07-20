<template>
  <el-select
    class="w100"
    v-model="item.value"
    multiple
    :placeholder="item.attributes.placeholder"
  >
    <el-option
      v-for="(option,i) in item.attributes.options"
      :key="i"
      :label="option.label"
      :value="option.value"
    ></el-option>
  </el-select>
</template>

<script>
import formItem from "../form-item"
export default {
  extends: formItem
};
</script>
