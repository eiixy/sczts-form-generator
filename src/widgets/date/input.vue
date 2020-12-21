<template>
  <el-date-picker
    class="w100"
    v-model="item.value"
    value-format="yyyy-MM-dd HH:mm:ss"
    type="date"
    :readonly="'readonly' in item.attributes ? item.attributes.readonly : false"
    :placeholder="item.attributes.placeholder"
  ></el-date-picker>
</template>

<script>
import vModel from "../../vModel"
export default {
  extends: vModel
};
</script>
