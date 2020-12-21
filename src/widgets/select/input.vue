<template>
  <el-select
    class="w100"
    v-model="item.value"
    :placeholder="item.attributes.placeholder"
  >
  :readonly="'readonly' in item.attributes ? item.attributes.readonly : false"
    <el-option
      v-for="(option,i) in item.attributes.options"
      :key="i"
      :label="option.label"
      :value="option.value"
    ></el-option>
  </el-select>
</template>

<script>
import vModel from "../../vModel"
export default {
  extends: vModel
};
</script>
