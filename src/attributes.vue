<template>
  <div>
    <el-form label-width="70px" size="small">
      <div v-for="(attr,index) in attrs" :key="index">
        <!-- 固定属性栏 -->
        <el-form-item v-if="'title' == index" label="标题">
          <el-input v-model="attrs.title"></el-input>
        </el-form-item>
        <el-form-item v-if="'placeholder' == index" label="提示文本">
          <el-input v-model="attrs.placeholder"></el-input>
        </el-form-item>
        <el-form-item v-if="'description' == index" label="描述信息">
          <el-input v-model="attrs.description"></el-input>
        </el-form-item>
        <el-form-item v-if="'multiple' == index" label="是否多选">
          <el-checkbox v-model="attrs.multiple"></el-checkbox>
        </el-form-item>
        <el-form-item v-if="'options' == index" label="可选项">
          <div class="option_item" v-for="(item,index) in attrs.options" :key="index">
            <el-input style="width:36%" v-model="attrs.options[index].value" placeholder="选项值"></el-input>
            <el-input style="width:64%" v-model="attrs.options[index].label" placeholder="显示值"></el-input>
          </div>
          <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" circle @click="addOptions"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-minus" circle @click="delOptions"></el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="'required' == index" label="是否必填">
          <el-checkbox v-model="attrs.required"></el-checkbox>
        </el-form-item>
        <!-- 组件配置属性栏 -->
        <component :is="'cf-a-'+type" v-model="attrs" :attrName="index"></component>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    },
    type: {
      type: String
    }
  },
  watch: {
    attrs(val) {
      this.$emit("input", val);
    },
    value(val){
      this.attrs = val;
    }
  },
  data() {
    return {
      attrs: this.value
    };
  },
  methods: {
    addOptions() {
      let option = this.makeNextOption();
      this.attrs.options.push(option);
    },
    delOptions() {
      this.attrs.options.pop();
    },
    makeNextOption() {
      let max = 0;
      for (let i = 0; i < this.attrs.options.length; i++) {
        if (this.attrs.options[i].value > max) {
          max = this.attrs.options[i].value;
        }
      }
      max++;
      return {
        label: "选项" + max,
        value: max
      };
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
.margin-b {
  margin-bottom: 20px;
}

.option_item {
  display: flex;
}
</style>
