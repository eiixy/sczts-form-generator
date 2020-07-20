export default [{
  name: "基础组件",
  widgets: [{
      type: "string",
      name: "单行输入框",
      attributes: {
        title: "单行输入框",
        description: "描述信息",
        placeholder: "请输入",
        required: false
      },
      ui: {
        width: 24
      },
      rules: [{
        pattern: "",
        message: ""
      }]
    },
    {
      type: "select",
      name: "单择框",
      attributes: {
        title: "单择框",
        description: "",
        placeholder: "请选择",
        required: false,
        options: [{
          label: "选择1",
          value: 0
        }, {
          label: "选择2",
          value: 1
        }, {
          label: "选择3",
          value: 2
        }]
      },
      ui: {
        width: 24
      }
    },
    {
      type: "multi-select",
      name: "多择框",
      attributes: {
        title: "多择框",
        description: "",
        placeholder: "请选择",
        required: false,
        options: [{
          label: "选择1",
          value: 0
        }, {
          label: "选择2",
          value: 1
        }, {
          label: "选择3",
          value: 2
        }]
      },
      ui: {
        width: 24
      }
    },
    {
      type: "date",
      name: "日期选择框",
      attributes: {
        title: "日期选择框",
        description: "",
        placeholder: "请选择",
        required: false
      },
      ui: {
        width: 24
      }
    },
    {
      type: "datetime",
      name: "时间日期选择框",
      attributes: {
        title: "时间日期选择框",
        description: "",
        placeholder: "请选择",
        required: false
      },
      ui: {
        width: 24
      }
    },
    {
      type: "textarea",
      name: "多行文本框",
      attributes: {
        title: "多行文本框",
        description: "",
        placeholder: "请输入",
        rows: 3,
        required: false,
      },
      ui: {
        width: 24
      }
    },
    {
      type: "number",
      name: "数值框",
      attributes: {
        title: "数值框",
        description: "",
        placeholder: "请输入",
        required: false
      },
      ui: {
        width: 24
      }
    },
    {
      type: "amount",
      name: "金额框",
      attributes: {
        title: "金额框",
        description: "",
        placeholder: "请输入",
        required: false
      },
      ui: {
        width: 24,
        table: {
          show: false,
          search: false,
          sort: false
        }
      }
    },
    {
      type: "images",
      name: "图片",
      attributes: {
        title: "图片",
        description: "",
        multiple: false,
        placeholder: "请选择",
        required: false
      },
      ui: {
        width: 24
      }
    },
    {
      type: "upload",
      name: "附件",
      attributes: {
        title: "附件",
        description: "",
        placeholder: "请选择",
        required: false,
        multiple: true,
        accept: '*'
      },
      ui: {
        width: 24
      }
    }
  ]
}, {
  name: "布局组件",
  widgets: [{
      type: "object",
      name: "对象",
      attributes: {
        title: "对象"
      },
      ui: {
        width: 24
      },
      forms: []
    },
    {
      type: "array",
      name: "列表",
      attributes: {
        title: "列表"
      },
      ui: {
        width: 24
      },
      forms: []
    }
  ]
}];
