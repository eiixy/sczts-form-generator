const table_attrs = {
  show: false,
  search: false,
  filter: false,
  sort: false
}
export default {
    1: [{
        type: "amount",
        name: "收入金额框",
        canRemove: false,
        key: "income",
        attributes: {
          title: "收入金额",
          description: "",
          placeholder: "请输入",
          required: true
        },
        ui: {
          width: 24
        }
    }],
    2: [{
        type: "amount",
        name: "支出金额框",
        canRemove: false,
        key: "expend",
        attributes: {
          title: "支出金额",
          description: "",
          placeholder: "请输入",
          required: true
        },
        ui: {
          width: 24
        }
    }],
    3: [{
        type: "amount",
        name: "收入金额框",
        canRemove: false,
        key: "income",
        attributes: {
          title: "收入金额",
          description: "",
          placeholder: "请输入",
          required: true
        },
        ui: {
          width: 24,
          table: {
            ...table_attrs
          }
        }
    }],
    4: [{
        type: "amount",
        name: "支出金额框",
        canRemove: false,
        key: "expend",
        attributes: {
          title: "支出金额",
          description: "",
          placeholder: "请输入",
          required: true
        },
        ui: {
          width: 24,
          table: {
            ...table_attrs
          }
        }
    }],
    5: [{

    }],
    7: {
        type: "stock",
        name: "添加库存框",
        key: "stock",
        attributes: {
            title: {
                title: "标题",
                type: "input",
                value: "添加库存"
            },
            placeholder: {
                title: "提示文字",
                type: "input",
                value: "点击添加库存"
            },
            ...table_attrs
        },
        value:{ // 库存值格式
            type: "",	// 库存类型编号
            mode: "",  // 库存模式（服务，唯一物品，固定资产）
            amount: "", // 库存数量
            attributes:{	// 库存属性
            }
        }
    },
    8: {
        type: "stock_select",
        name: "库存选择框",
        key: "stock_select",
        attributes: {
            title: {
                title: "标题",
                type: "input",
                value: "选择库存"
            },
            placeholder: {
                title: "提示文字",
                type: "input",
                value: "请输入"
            },
            ...table_attrs
        },
        value: [1,2,3]
    }
}
