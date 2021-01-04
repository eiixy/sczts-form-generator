<template>
  <div>
    <el-form
      ref="form_generator"
      :model="formsData"
      :rules="rules"
      :label-position="displayType"
      :label-width="labelWidth + 'px'"
      :size="size"
    >
      <el-row :gutter="gutter">
        <el-col
          v-for="(item, index) in forms"
          :key="index"
          :span="'width' in item.ui ? item.ui.width : 24"
        >
          <el-form-item :label="item.attributes.title" :prop="item.key">
            <template class="lable" slot="label">
              {{ item.attributes.title }}
              <el-tooltip
                v-if="(item.attributes.description || null) != null"
                effect="dark"
                :content="item.attributes.description"
              >
                <i class="el-icon-info"></i>
              </el-tooltip>
            </template>
            <component
              :is="'fg-i-' + item.type"
              v-model="forms[index]"
            ></component>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 预留插槽 -->
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    gutter: {
      // 分栏间隔
      type: Number,
      default: 20,
    },
    displayType: {
      // label 位置
      type: String,
      default: "right", // right/left/top
    },
    labelWidth: {
      // label 宽度
      type: Number,
      default: 100,
    },
    size: {
      // 表单控件大小
      type: String,
      default: "medium", // medium / small / mini
    },
    forms: {
      // 表单配置
      type: Array,
    },
    value: {
      // 表单数据
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    this.forms.forEach((form, index) => {
      if (form.key in this.value) {
        this.forms[index].value = this.value[form.key];
      }
      if (form.attributes.required) {
        this.rules[form.key] = [
          {
            required: true,
            message: form.attributes.title + "不能为空",
            trigger: "blur",
          },
        ];
      }
      if (form.type == "amount") {
        this.rules[form.key] = [
          {
            pattern: "/^(([1-9][0-9]*)|(([0].d{1,2}|[1-9][0-9]*.d{1,2})))$/",
            message: form.attributes.title + "必须为金额",
            trigger: "blur",
          },
        ];
      }
    });
  },
  data() {
    return {
      rules: {},
    };
  },
  computed: {
    /**
     * 计算表单值
     */
    formsData() {
      let data = {};
      this.forms.forEach((form) => {
        data[form.key] = form.value;
      });
      return data;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 0;
}
.el-form {
  .el-form-item {
    margin-bottom: 18px;
  }
}
</style>
