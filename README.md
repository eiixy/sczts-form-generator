## 快速开始
1. 安装依赖
```bash
npm i sczts-custom-form
```

## 组件说明
### 1. 表单编辑器
#### 如何使用
```vue
<template>
  <div>
    <cf-editor v-model="forms" :defaultForms="defaultForms"></cf-editor>
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
    <cf-generator
        v-model="form_data"
        :forms="config.forms"
        :labelWidth="config.labelWidth"
        :displayType="config.displayType"
    ></cf-generator>
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
