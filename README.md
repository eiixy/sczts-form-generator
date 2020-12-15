## 简介

## 快速开始
1. 安装
```bash
npm i sczts-form-generator
```

2. 在 `main.js` 中全局引用
```javascript
import Vue from 'vue'
import formGenerator, { fgWidgets } from 'sczts-form-generator'

// ...
Vue.use(formGenerator, {
  widgets: fgWidgets
});

```


## 组件说明
### 1. 表单编辑器
#### 如何使用
```vue
<template>
  <div>
    <fg-editor v-model="forms" :defaultForms="defaultForms"></fg-editor>
  </div>
</template>

<script>
export default {
  data(){
    return {
      forms: [],
      defaultForms: [
        {

        }
      ]
    }
  }
}
</script>
```

#### 属性
属性名 | 说明 | 参数
-- | -- | --
defaultForms | 默认表单配置 | Array
showTable | 是否展示列表显示配置 | Boolean

### 2. 表单生成器
#### 如何使用
```vue
<template>
  <div>
    <fg-render
        v-model="form_data"
        :forms="config.forms"
        :labelWidth="config.labelWidth"
        :displayType="config.displayType"
    ></fg-render>
  </div>
</template>

<script>
export default {
  data(){
    return {
        config: {
            forms: [],
            labelWidth: 120,
            displayType: 'top'
        },
        form_data:{}
    }
  }
}
</script>
```

#### 属性
属性名 | 说明 | 参数
-- | -- | --
gutter | 分栏间隔 | Number
displayType | label 展示位置 | String
labelWidth | label 展示宽度 | Number
size | 表单控件大小 | String
forms | 表单配置 | Array
value | 表单数据 | Object
changeDelay | 监听可编辑条件项表单值的防抖延时 | Number


## 如何扩展自定义表单控件？
* `/src/components/form_generator_extends` 为扩展控件目录
* `/src/components/form_generator_extends/widgets.js` 为 widgets 配置文件
* `/src/components/form_generator_extends/widgets` 为控件目录
* `/src/components/form_generator_extends/widgets/[widget_name]/input.vue` 为控件实现代码
* `/src/components/form_generator_extends/widgets/[widget_name]/attrbute.vue` 为控件自定义属性配置

1. 编写 widgets 配置文件 `/src/components/form_generator_extends/widgets.js`
```javascript
export default [{
  name: "扩展组件",
  widgets: [
    {
      type: "upload",
      name: "附件",
      attributes: {
        title: "附件",      // 默认属性 展示标题
        description: "",    // 默认属性 说明文字
        placeholder: "",    // 默认属性 占位符
        required: false,    // 默认属性 是否必填
        multiple: true,     // 默认属性 是否可多选
        accept: [],         // 自定义属性 上传格式
        // ...
      },
      ui: {
        width: 24
      }
    }
  ]
}]
```
2. 编写自定义上传控件 `/src/components/form_generator_extends/widgets/upload/input.vue`
```vue
<template>
  <el-upload
    :action="upload_url"
    :data="uploadData"
    :multiple="item.attributes.multiple"
    :accept="acceptType"
    controls-position="right"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import vModel from "sczts-form-generator/src/vModel";
import { getUploadToken } from "@/api/common";
import { Arr, Cache } from "sczts-helpers";

export default {
  extends: vModel,
  data() {
    return {
      upload_url: "http://up-z2.qiniup.com",
      uploadData: {
        token: "",
      },
      fileList: [],
    };
  },
  created() {
    this.item.value = [];
  },
  computed: {
    acceptType() {
      let accept = this.item.attributes.accept;
      return accept.length > 0 ? accept.join(",") : "*";
    },
  },
  methods: {
    // 上传前 从接口获取token值，并缓存3500秒，在回调中设置token值
    beforeUpload() {
      return Cache.rememberPromise("upload_token", 3500, () =>
        getUploadToken()
      ).then((res) => {
        this.uploadData.token = res.data.data.token;
      });
    },
    handleSuccess(response, file) {
      this.item.value.push({
        url: response.file,
        name: response.name,
      });
    },
    handleRemove(file, fileList) {
      this.item.value = fileList.map((file) => {
        return {
          url: file.response.file,
          name: file.response.name,
        };
      });
    },
  },
};
</script>
```

3. 上传控件属性配置[可选]  `/src/components/form_generator_extends/widgets/upload/attribure.vue`
```vue
<template>
  <div>
    <el-form-item label="文件类型">
      <el-select
        v-model="item.accept"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="默认为所有类型"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import vModel from "sczts-form-generator/src/vModel";
export default {
  extends: vModel,
  data() {
    return {
      options: [
        {
          label: ".jpg",
          value: ".jpg",
        },
        {
          label: ".png",
          value: ".png",
        },
        {
          label: ".doc",
          value: ".doc",
        },
        {
          label: ".xls",
          value: ".xls",
        },
        {
          label: ".pdf",
          value: ".pdf",
        },
      ],
    };
  },
};
</script>
```

4. 在 `main.js` 中全局引用时注入自定义配置
```javascript
import Vue from 'vue'
import formGenerator, { fgWidgets } from 'sczts-form-generator'
import fgExtends from "@/components/form_generator_extends/widgets.js"
// ...
Vue.use(formGenerator, {
  widgets: {
    ...fgWidgets,
    ...fgExtends
  },
  // 注入扩展组件目录
  extend: require.context('@/components/form_generator_extends/widgets', true, /\.(vue|js)$/),
});

```