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
import formItem from "../form-item";

export default {
  extends: formItem,
  methods: {
    inputhandle({ target }) {
      target.value = target.value.replace(/[^\d.]/g, "");
      target.value = target.value.replace(/^\./g, "");
      target.value = target.value.replace(/\.{2,}/g, ".");
      target.value = target.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    }
  }
};
</script>
