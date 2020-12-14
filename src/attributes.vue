<template>
  <div>
    <el-form label-width="70px" size="small">
      <div v-for="(attr, index) in attrs" :key="index">
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
          <draggable v-model="attrs.options" handle=".handle" :animation="200">
            <div
              class="option_item"
              v-for="(item, index) in attrs.options"
              :key="index"
            >
              <el-input
                size="mini"
                style="width:34%"
                v-model="attrs.options[index].value"
                placeholder="选项值"
              ></el-input>
              <el-input
                size="mini"
                style="width:66%;padding-left: 8px;"
                v-model="attrs.options[index].label"
                placeholder="显示值"
              ></el-input>
              <i class="handle el-icon-rank"></i>
            </div>
          </draggable>
          <div class="btns">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              circle
              @click="addOptions"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-minus"
              circle
              @click="delOptions"
            ></el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="'required' == index" label="是否必填">
          <el-checkbox v-model="attrs.required"></el-checkbox>
        </el-form-item>
      </div>
      <!-- 组件配置属性栏 -->
      <component
        v-if="hasComponent(type)"
        :is="'cf-a-' + type"
        v-model="attrs"
      ></component>
    </el-form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
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
    value(val) {
      this.attrs = val;
    }
  },
  data() {
    return {
      attrs: this.value
    };
  },
  methods: {
    hasComponent(type){
      return this.$root.$options.components['cf-a-' + type]
    },
    addOptions() {
      this.attrs.options.push({
        label: "",
        value: ""
      });
    },
    delOptions() {
      this.attrs.options.pop();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}
.margin-b {
  margin-bottom: 20px;
}

.option_item {
  display: flex;
  align-items: center;
  .handle {
    cursor: move;
    padding-left: 4px;
  }
  /deep/.el-input__inner {
    border-radius: 0;
    padding: 0 8px;
  }
}
.btns {
  padding-top: 8px;
}
</style>
