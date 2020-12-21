<template>
  <el-input
    v-model="item.value"
    type="textarea"
    :rows="item.attributes.rows||3"
    :placeholder="item.attributes.placeholder"
    :readonly="'readonly' in item.attributes ? item.attributes.readonly : false"
  ></el-input>
</template>

<script>
import vModel from "../../vModel"
export default {
  extends: vModel
};
</script>
