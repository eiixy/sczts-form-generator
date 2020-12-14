<template>
  <div>
    <el-form
      ref="form_generator"
      :model="formsData"
      :label-position="displayType"
      :label-width="labelWidth + 'px'"
      :size="size"
    >
      <el-row :gutter="20">
        <draggable v-model="forms" handle=".handle" :animation="200">
          <el-col
            v-for="(item, index) in forms"
            :key="index"
            @click.native="setSelect(item)"
            :span="item.ui.width ? item.ui.width : 24"
            :class="'form-item' + (select == item.key ? ' active' : '')"
          >
            <i class="el-icon-rank handle" v-if="select == item.key"></i>
            <div class="key">
              <input v-model="forms[index].key" />
            </div>
            <div class="i-object" v-if="item.type == 'object'">
              <div class="title">
                {{ item.attributes.title }}
                <el-tooltip
                  v-if="(item.attributes.description || null) != null"
                  effect="dark"
                  :content="item.attributes.description"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
              <component
                :is="'cf-i-' + item.type"
                :value="forms[index]"
              ></component>
            </div>
            <div class="i-array" v-else-if="item.type == 'array'">
              <div class="title">
                {{ item.attributes.title }}
                <el-tooltip
                  v-if="(item.attributes.description || null) != null"
                  effect="dark"
                  :content="item.attributes.description"
                >
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
              <component
                :is="'cf-i-' + item.type"
                :value="forms[index]"
              ></component>
            </div>
            <div class="i-item" v-else>
              <el-form-item
                class
                :label="item.attributes.title"
                :prop="item.key"
              >
                <div class="lable" slot="label">
                  <span class="required" v-if="item.attributes.required == true"
                    >*</span
                  >
                  {{ item.attributes.title }}
                  <el-tooltip
                    v-if="(item.attributes.description || null) != null"
                    effect="dark"
                    :content="item.attributes.description"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </div>
                <component
                  :is="'cf-i-' + item.type"
                  :value="forms[index]"
                ></component>
              </el-form-item>
            </div>
            <i
              class="el-icon-close remove"
              v-if="item.canRemove !== false"
              @click.stop="remove(index)"
            ></i>
          </el-col>
        </draggable>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { Random } from "sczts-helpers";
export default {
  props: {
    value: {
      type: Object
    },
    size: {
      // 表单控件大小
      type: String,
      default: "medium" // medium / small / mini
    }
  },
  components: {
    draggable
  },
  watch: {
    value: {
      handler(val) {
        this.forms = this.value.forms;
        this.displayType = this.value.displayType;
        this.labelWidth = this.value.labelWidth;
      },
      deep: true
    },
    forms() {
      let index = this.forms.findIndex(item => {
        return item.key == this.select;
      });
      this.$emit("selectIndex", index, this.select);

      this.$emit("input", {
        forms: this.forms,
        displayType: this.displayType,
        labelWidth: this.labelWidth
      });
    },
    select(val) {
      let index = this.forms.findIndex(item => {
        return item.key == val;
      });
      this.$emit("selectIndex", index, val);
    }
  },
  data() {
    return {
      select: this.value.forms.length != 0 ? this.value.forms[0].key : false,
      formsData: {},
      forms: this.value.forms,
      displayType: this.value.displayType,
      labelWidth: this.value.labelWidth
    };
  },
  methods: {
    add(item) {
      let key = item.type + "_" + Random.string(6, "alpha_num").toLowerCase();
      let loop = false;
      do {
        loop = false;
        this.forms.forEach(item => {
          if (item.key == key) {
            key = item.type + "_" + Random.string(6, "alpha_num").toLowerCase();
            loop = true;
          }
        });
      } while (loop);

      let index = this.forms.findIndex(item => {
        return item.key == this.select;
      });
      if (index == -1) {
        this.forms.push({
          ...JSON.parse(JSON.stringify(item)),
          value: null,
          key: key
        });
      } else {
        this.forms.splice(index + 1, 0, {
          ...JSON.parse(JSON.stringify(item)),
          value: null,
          key: key
        });
      }
      this.$set(this, "forms", this.forms);
      this.select = key;
    },
    remove(index) {
      let _index = index == this.forms.length - 1 ? index - 1 : index + 1;
      this.select = _index == -1 ? false : this.forms[_index].key;
      console.log(index, _index, this.select, this.forms);
      this.$nextTick(() => {
        this.forms.splice(index, 1);
      });
    },
    flush(defaultForms) {
      this.select = false;
      this.$set(this, "forms", defaultForms);
    },
    setSelect(item) {
      this.select = item.key;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item {
  position: relative;
  min-height: 50px;
  padding: 22px 24px 6px;
  display: flex;
  border: 1px solid #f3f4f5;
  box-sizing: border-box;
  margin-bottom: 8px;
  .i-object,
  .i-array,
  .i-item {
    width: 100%;
  }
  .i-object,
  .i-array {
    width: 100%;
    position: relative;
    margin: 12px 0;
    .title {
      position: absolute;
      background-color: #fff;
      left: 18px;
      top: -12px;
      padding: 0 4px;
    }
  }
  .i-item .el-form-item {
    margin-bottom: 12px;
  }
  .handle {
    position: absolute;
    left: 0px;
    top: 0px;
    cursor: move;
    background: #409eff;
    width: 16px;
    height: 16px;
    text-align: center;
    color: #fff;
    line-height: 16px;
  }
  .key {
    font-size: 12px;
    color: #999;
    position: absolute;
    left: 18px;
    top: 0px;
    input {
      width: 160px;
      height: 16px;
      font-size: 12px;
      color: #999;
      border: none;
      &:focus {
        border: none;
      }
    }
  }
  .required {
    color: red;
    display: inline-block;
    text-align: center;
    padding-left: 4px;
  }
  .el-icon-info {
    display: inline-block;
    font-size: 14px;
  }
  .input {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .el-form-item {
    width: 100%;
  }
  .el-select,
  .el-input-number,
  .el-date-editor {
    width: 100%;
  }
  .remove {
    display: none;
  }
  &.active {
    border: 1px solid #409eff;
    .remove {
      display: block;
      position: absolute;
      top: 0px;
      right: 0px;
      cursor: pointer;
      background: #409eff;
      width: 16px;
      height: 16px;
      text-align: center;
      color: #fff;
      line-height: 16px;
    }
  }
}
.el-row {
  margin: 0 !important;
}
</style>
