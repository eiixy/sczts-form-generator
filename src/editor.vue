<template>
  <div class="container">
    <!-- 控件库 -->
    <el-card class="widgets" shadow="never">
      <div class="widgets-group" v-for="(group, index) in widgets" :key="index">
        <div class="name">{{ group.name }}</div>
        <div class="widgets">
          <el-row :gutter="10">
            <el-col :span="12" v-for="(widget, i) in group.widgets" :key="i">
              <div @dblclick="add(widget)" class="widgets-item">{{ widget.name }}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <p class="tips">
        <i class="el-icon-info"></i> 双击添加控件到自定义表单
      </p>
    </el-card>
    <!-- 自定义表单 -->
    <el-card class="editor" shadow="never">
      <div class="header">
        <div class="operation">
          <el-button size="mini" @click="preview = !preview">
            {{
            preview ? "编辑" : "预览"
            }}
          </el-button>
          <el-button size="mini" @click="showJsonDialog">查看JSON</el-button>
          <el-button size="mini" @click="flush">清空</el-button>
        </div>
        <el-button
          :icon="show_attrs ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          @click="show_attrs = !show_attrs"
          type="text"
        >{{ show_attrs ? "隐藏属性栏" : "展示属性栏" }}</el-button>
      </div>
      <div class="content">
        <preview-forms
          v-show="preview"
          :forms="editor.forms"
          :labelWidth="editor.labelWidth"
          :displayType="editor.displayType"
          size="small"
        ></preview-forms>
        <input-content
          v-show="!preview"
          ref="input-content"
          v-model="editor"
          size="small"
          @selectIndex="i => (selectIndex = i)"
        ></input-content>
      </div>
    </el-card>
    <!-- 属性 -->
    <div class="attribute" v-show="show_attrs">
      <el-tabs type="border-card" class="form_attrs" value="attrs">
        <el-tab-pane class="widgets-group" name="attrs" label="表单属性">
          <el-form label-width="100px" size="small">
            <el-form-item label="标签展示模式">
              <el-select size="mini" v-model="editor.displayType" placeholder="请选择标签展示模式">
                <el-option label="上方" value="top"></el-option>
                <el-option label="右边" value="right"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签宽度(px)">
              <el-slider size="mini" :min="60" :max="200" v-model="editor.labelWidth"></el-slider>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs
        type="border-card"
        :stretch="true"
        v-if="selectIndex !== -1 && !preview"
        value="attrs"
      >
        <el-tab-pane class="widgets-group" name="attrs" label="控件属性">
          <base-attrs
            v-model="editor.forms[selectIndex].attributes"
            :type="editor.forms[selectIndex].type"
          ></base-attrs>
        </el-tab-pane>
        <el-tab-pane class="widgets-group" name="style" label="控件样式">
          <ui-attrs v-model="editor.forms[selectIndex].ui" :showTable="showTable"></ui-attrs>
        </el-tab-pane>
        <!-- <el-tab-pane class="widgets-group" name="rules" label="验证规则">
          <rule-attrs v-model="editor.forms[selectIndex].rules"></rule-attrs>
        </el-tab-pane> -->
      </el-tabs>
    </div>

    <el-dialog title="Json" append-to-body :visible.sync="dialogVisible" width="600px">
      <codemirror v-model="jsonString" :options="cmOptions"></codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editJson">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Attrs from "./attributes";
import Input from "./input";
import Ui from "./ui";
// import Rules from "./rules";
import FormGenerator from "./generator";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/mode/javascript/javascript.js";

export default {
  components: {
    codemirror,
    "base-attrs": Attrs,
    "input-content": Input,
    "ui-attrs": Ui,
    // "rule-attrs": Rules,
    "preview-forms": FormGenerator
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          displayType: "right",
          labelWidth: 100,
          forms: []
        };
      }
    },
    /**
     * 默认表单
     */
    defaultForms: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * 是否展示table配置
     */
    showTable: {
      type: Boolean,
      default: false
    },
    /**
     * 可展示的组件，默认展示所有
     */
    components: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      selectIndex: this.value.forms.length ? 0 : -1,
      show_attrs: true,
      preview: false,
      widgets: this.$fgWidgets,
      editor: this.value,
      jsonString: null,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: {
          name: "javascript",
          json: true
        },
        theme: "base16-dark",
        lineNumbers: true,
        line: true
        // 更多 codemirror 的高级配置...
      }
    };
  },
  created() {
    this.$set(this.editor, "forms", [
      ...this.defaultForms,
      ...this.editor.forms.filter(current => {
        return !this.defaultForms.find(form => {
          return current.key == form.key;
        });
      })
    ]);
    this.widgets = this.widgets
      .map(group => {
        let widgets = group.widgets.filter(widget => {
          if (
            this.components.length == 0 ||
            this.components.includes(widget.type)
          ) {
            return true;
          }
          return false;
        });
        group.widgets = widgets;
        return group;
      })
      .filter(group => {
        return group.widgets.length > 0;
      });
  },
  watch: {
    editor(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    json() {
      return JSON.stringify(this.editor, null, 4);
    }
  },
  methods: {
    flush() {
      this.$refs["input-content"].flush(
        JSON.parse(JSON.stringify(this.defaultForms))
      );
    },
    add(item) {
      item = JSON.parse(JSON.stringify(item))
      delete item.name;
      this.$refs["input-content"].add(item);
    },
    showJsonDialog() {
      this.jsonString = JSON.stringify(this.editor, null, 4);
      this.dialogVisible = true;
    },
    editJson() {
      try {
        let json = JSON.parse(this.jsonString);
        this.editor = json;
        this.dialogVisible = false;
      } catch (err) {
        this.$message.warning("json 格式有误");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  /deep/.el-card__body {
    padding: 16px 8px;
  }
  .widgets {
    min-width: 240px;
    max-width: 240px;
    box-sizing: border-box;
    .widgets-group {
      display: flex;
      flex-direction: column;
      .name {
        font-size: 16px;
        font-weight: 700;
        color: #333;
        line-height: 2;
        padding-bottom: 6px;
      }
      .widgets-item {
        border: 1px solid #ccc;
        margin-bottom: 8px;
        text-align: center;
        padding: 4px 0;
        font-size: 14px;
        color: #999;
        border-radius: 2px;
        cursor: pointer;
        user-select: none;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
    .tips {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .editor {
    margin: 0 8px;
    width: 100%;
    min-width: 360px;
    .header {
      font-size: 22px;
      text-align: center;
      line-height: 1.4;
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      i {
        font-size: 14px;
      }
    }
    .form-item {
      position: relative;
      min-height: 50px;
      padding: 24px 24px 6px;
      display: flex;
      .title {
        min-width: 100px;
        padding-right: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          color: red;
          display: inline-block;
          width: 14px;
          text-align: center;
          padding-left: 4px;
        }
      }
      .input {
        width: 100%;
        display: flex;
        align-items: center;
      }
      .remove {
        display: none;
      }
      &.active {
        background-color: #f9f9f9;
        .remove {
          display: block;
          position: absolute;
          top: 0px;
          right: 0px;
          cursor: pointer;
          font-size: 14px;
          background: red;
          color: #fff;
        }
      }
    }
    .content {
      padding: 16px 8px;
      border: 1px solid #f3f4f5;
      background-color: #fefefe;
    }
  }
  .attribute {
    min-width: 294px;
    max-width: 294px;
    .form_attrs {
      margin-bottom: 16px;
    }
    .options {
      width: 170px;
    }
  }

  .widgets,
  .editor,
  .attribute {
    max-height: 700px;
    overflow: auto;
  }
}
</style>
