export default {
  install(Vue, options) {
    let transfers = {};
    let components = {};
    let requireComponent = require.context("./widgets", true, /\.(vue|js)$/);

    requireComponent.keys().forEach(fileName => {
      let type = fileName.replace("./", "").replace(".vue", "").replace(".js", "").split("/");
      const componentConfig = requireComponent(fileName);
      if (type[1] == "input") {
        components["cf-i-" + type[0]] = componentConfig.default || componentConfig;
      } else if (type[1] == "attribute") {
        components["cf-a-" + type[0]] = componentConfig.default || componentConfig;
      } else if (type[1] == "transfer") {
        transfers[type[0]] = componentConfig.default || componentConfig;
      }
    });

    // 自定义控件
    options.extend.keys().forEach(fileName => {
      let type = fileName.replace("./", "").replace(".vue", "").replace(".js", "").split("/");
      const componentConfig = options.extend(fileName);
      if (type[1] == "input") {
        components["cf-i-" + type[0]] = componentConfig.default || componentConfig;
      } else if (type[1] == "attribute") {
        components["cf-a-" + type[0]] = componentConfig.default || componentConfig;
      } else if (type[1] == "transfer") {
        transfers[type[0]] = componentConfig.default || componentConfig;
      }
    });

    // 注册到全局组件
    for (let name in components) {
      Vue.component(name, components[name])
    }

    /**
     * 数据转换器 单条数据
     * @param {array} forms 表单配置
     * @param {object} data 元数据
     */
    Vue.prototype.$cfConvert = (forms, data) => {
      forms.forEach(form => {
        if (form.type in transfers && form.key in data) {
          data = transfers[form.type](form, data)
        }
      })
      return data
    }

    /**
     * 数据转换器 多条数据
     * @param {array} forms 表单配置
     * @param {array} data 元数据
     */
    Vue.prototype.$cfConvertCollection = (forms, data) => {
      for (let i = 0; i < data.length; i++) {
        data[i] = Vue.prototype.$cfConvert(forms, data[i])
      }
      return data;
    }

    Vue.prototype.$cfLibrary = options.library
  },


}
