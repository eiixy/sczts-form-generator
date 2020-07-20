export default {
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value(val) {
      this.item = val;
    },
    item(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      item: this.value
    };
  }
}
