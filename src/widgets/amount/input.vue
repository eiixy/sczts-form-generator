<template>
  <el-input
    class="w100"
    @input.native="inputhandle"
    :placeholder="item.attributes.placeholder"
    v-model="item.value"
    controls-position="right"
  ></el-input>
</template>

<script>
import vModel from "../../vModel";

export default {
  extends: vModel,
  methods: {
    inputhandle({ target }) {
      target.value = target.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      target.value = target.value.replace(/^\./g, ""); //验证第一个字符是数字而不是.
      target.value = target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的.
      target.value = target.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    },
  },
};
</script>
