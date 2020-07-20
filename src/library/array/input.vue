<template>
  <div class="cf-array"></div>
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

<style lang="scss" scoped>
.cf-object {
  border: 2px dashed #eee;
  width: 100%;
  min-height: 60px;
}
</style>
