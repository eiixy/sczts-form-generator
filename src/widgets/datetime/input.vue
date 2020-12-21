<template>
  <el-date-picker
    class="w100"
    v-model="item.value"
    type="datetime"
    :placeholder="item.attributes.placeholder"
    :readonly="'readonly' in item.attributes ? item.attributes.readonly : false"
  ></el-date-picker>
</template>

<script>
import vModel from "../../vModel"
export default {
  extends: vModel
};
</script>
