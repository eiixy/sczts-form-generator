<template>
  <el-date-picker
    class="w100"
    v-model="item.value"
    type="datetime"
    :placeholder="item.attributes.placeholder"
  ></el-date-picker>
</template>

<script>
import vModel from "../../vModel"
export default {
  extends: vModel
};
</script>
