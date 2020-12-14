<template>
  <div>
    <div class="rules">
      <div class="rule-item" v-for="(rule, index) in rules" :key="index">
        <div class="item">
          <label for="">验证规则</label>
          <el-input size="mini" v-model="rules[index].pattern"></el-input>
        </div>
        <div class="item">
          <label for="">提示消息</label>
          <el-input size="mini" v-model="rules[index].message"></el-input>
        </div>
      </div>
    </div>
    <div class="btns">
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-plus"
        circle
        @click="addRule"
      ></el-button>
      <el-button
        size="mini"
        type="danger"
        icon="el-icon-minus"
        circle
        @click="delRule"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Array
  },
  data() {
    return {
      rules: this.value || []
    };
  },
  watch: {
    value(val) {
      this.rules = val;
    },
    rules(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    addRule() {
      this.rules.push({
        pattern: "",
        message: ""
      });
    },
    delRule() {
      this.rules.pop()
    }
  }
};
</script>

<style lang="scss" scoped>
.rules{
  .rule-item{
    border: 1px solid #ccc;
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 4px;
    .item{
      display: flex;
      align-items: center;
      padding: 2px 0;
      label{
        width: 80px;
      }
    }
  }
}
</style>
