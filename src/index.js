import fgEditor from './editor.vue'
import fgRender from './render.vue'

export default {
  install(Vue, options) {
    let transfers = {};
    let components = {};
    let requireComponent = require.context("./widgets", true, /\.(vue|js)$/);

    requireComponent.keys().forEach(fileName => {
      let type = fileName.replace("./", "").replace(".vue", "").replace(".js", "").split("/");
      const componentConfig = requireComponent(fileName);
      if (type[1] == "input") {
        components["fg-i-" + type[0]] = componentConfig.default || componentConfig;
      } else if (type[1] == "attribute") {
        components["fg-a-" + type[0]] = componentConfig.default || componentConfig;
      } else if (type[1] == "transfer") {
        transfers[type[0]] = componentConfig.default || componentConfig;
      }
    });
    // 自定义控件
    if('extend' in options && options.extend != []){
      options.extend.keys().forEach(fileName => {
        let type = fileName.replace("./", "").replace(".vue", "").replace(".js", "").split("/");
        const componentConfig = options.extend(fileName);
        if (type[1] == "input") {
          components["fg-i-" + type[0]] = componentConfig.default || componentConfig;
        } else if (type[1] == "attribute") {
          components["fg-a-" + type[0]] = componentConfig.default || componentConfig;
        } else if (type[1] == "transfer") {
          transfers[type[0]] = componentConfig.default || componentConfig;
        }
      });
    }


    // 注册到全局组件
    for (let name in components) {
      Vue.component(name, components[name])
    }
    Vue.component('fg-editor', fgEditor)
    Vue.component('fg-render', fgRender)


    /**
     * 数据转换器 单条数据
     * @param {array} forms 表单配置
     * @param {object} data 元数据
     */
    Vue.prototype.$fgConvert = (forms, data) => {
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
    Vue.prototype.$fgConvertCollection = (forms, data) => {
      for (let i = 0; i < data.length; i++) {
        data[i] = Vue.prototype.$fgConvert(forms, data[i])
      }
      return data;
    }

    Vue.prototype.$fgWidgets = options.widgets
  },


}
