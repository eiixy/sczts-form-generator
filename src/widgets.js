export default [{
  name: "基础组件",
  widgets: [{
      type: "string",
      name: "单行输入框",
      attributes: {
        title: "单行输入框",
        description: "",
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
          value: 1
        }, {
          label: "选择2",
          value: 2
        }, {
          label: "选择3",
          value: 3
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
    }
  ]
}];
