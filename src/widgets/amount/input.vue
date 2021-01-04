<template>
  <el-input
    class="w100"
    :placeholder="item.attributes.placeholder"
    :readonly="'readonly' in item.attributes ? item.attributes.readonly : false"
    v-model="item.value"
    controls-position="right"
  ></el-input>
</template>

<script>
import vModel from "../../vModel";

export default {
  extends: vModel,
};
</script>
