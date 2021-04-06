import { defineComponent, computed, openBlock, createBlock, renderSlot, ref, watch, onMounted, createVNode, toDisplayString, withDirectives, vModelText, vModelDynamic, createCommentVNode, Fragment } from 'vue';

var script$2 = defineComponent({
  name: "TButton",
  props: {
    size: {
      type: String,
      default: "base"
    },
    color: {
      type: String,
      default: "blue"
    }
  },

  setup(props) {
    const sizeClass = computed(() => {
      let options = {
        sm: "text-sm px-2",
        base: "text-base px-4 py-1",
        lg: "text-lg px-8 py-2"
      };
      return options[props.size];
    });
    const colorClass = computed(() => {
      // 5 cores blue, green, yellow, red, gray
      // ou bg-indigo-400
      let options = {
        blue: "bg-blue-900",
        yellow: "bg-yellow-500",
        green: "bg-green-700",
        red: "bg-yellow-700",
        gray: "bg-gray-500"
      };

      if (props.color.split("-").length > 1) {
        return props.color;
      }

      return options[props.color];
    });
    return {
      sizeClass,
      colorClass
    };
  }

});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("button", {
    class: ["mr-2 inline-block rounded text-white", [_ctx.sizeClass, _ctx.colorClass]],
    type: "button"
  }, [renderSlot(_ctx.$slots, "default")], 2);
}

script$2.render = render$2;

class Validator {
  validate(value, rules) {
    if (typeof value == "string") {
      return this.validateString(value, rules);
    }

    return "";
  }

  validateString(value, rules) {
    const rulesArray = rules.split("|");
    let message = "";
    rulesArray.some(rule => {
      /**
       * Required
       */
      if (rule == "required") {
        if (value == "") {
          message = "Campo Obrigatório";
          return true;
        }
      }
      /**
       * size
       * size:3
       */


      if (rule.split(":")[0] == "size") {
        if (typeof value == "string") {
          if (value.length != parseInt(rule.split(":")[1])) {
            message = `Este campo precisa ter ${rule.split(":")[1]} caracteres`;
            return true;
          }
        }
      }
      /**
       * min
       * ex: min:3
       */


      if (rule.split(":")[0] == "min") {
        if (typeof value == "string") {
          if (value.length < parseInt(rule.split(":")[1])) {
            message = `Este campo precisa ter ao menos ${rule.split(":")[1]} caracteres`;
            return true;
          }
        }
      }
      /**
       * max
       * ex: max:3
       */


      if (rule.split(":")[0] == "max") {
        if (typeof value == "string") {
          if (value.length > parseInt(rule.split(":")[1])) {
            message = `Este campo precisa ter no máximo ${rule.split(":")[1]} caracteres`;
            return true;
          }
        }
      }
    });
    return message;
  }

}

var script$1 = defineComponent({
  name: "BaseInput",
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      // type: [Object, String, Number, Boolean, undefined],
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    rows: {
      type: Number,
      default: 3
    },
    validationRules: {
      type: String,
      default: ""
    },
    maxlength: {
      type: Number
    }
  },

  setup(props, {
    emit
  }) {
    /**
     * Construção de um formItem vazio
     */
    let formItem = ref({
      value: "",
      validationRules: "",
      validationError: "",
      status: "pristine"
    });
    let maxlengthLeft = computed(() => {
      if (typeof formItem.value.value == "string" && props.maxlength && props.maxlength > 0) {
        return props.maxlength - formItem.value.value.length;
      }

      return null;
    });
    /**
     * Valida os dados baseados nas regras de validationRules
     */

    const validate = () => {
      let validator = new Validator();
      formItem.value.validationError = validator.validate(formItem.value.value, formItem.value.validationRules);
    };
    /**
     * Verifica de forma profunda o formItem
     * e emite o event para atualização no pai
     */


    watch(formItem, newVal => {
      if (typeof props.modelValue == "string" || typeof props.modelValue == "number") {
        emit("update:modelValue", newVal.value);
      } else {
        emit("update:modelValue", newVal);
      }
    }, {
      deep: true
    });
    /**
     * Ajusta a prop modelValue ao receber mudanças
     */

    watch(() => props.modelValue, newVal => {
      adjustProps(newVal);
    }, {
      deep: true
    });
    /**
     * Ajusta as props nos casos de string / number / object
     */

    const adjustProps = value => {
      if (typeof value == "string" || typeof value == "number" || typeof value == "boolean" || typeof value == "undefined") {
        formItem.value.value = value;
        formItem.value.validationRules = props.validationRules;
      } else {
        formItem.value = value;

        if (props.validationRules != "") {
          formItem.value.validationRules = props.validationRules;
        }
      }
    };
    /**
     * Ajusta as props ao inicializar o componente
     */


    onMounted(() => {
      adjustProps(props.modelValue);
    });
    /**
     * Retorna os dados para o template
     */

    return {
      formItem,
      validate,
      maxlengthLeft
    };
  }

});

const _hoisted_1$1 = {
  class: "flex flex-col mb-4 relative w-full"
};
const _hoisted_2$1 = {
  key: 2,
  class: "absolute right-0 text-xs top-2 text-gray-500"
};
const _hoisted_3 = {
  class: "text-red-800 text-sm ml-0.5"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$1, [createVNode("label", null, toDisplayString(_ctx.label), 1), _ctx.type == 'textarea' ? withDirectives((openBlock(), createBlock("textarea", {
    key: 0,
    class: ["p-2 border rounded", {
      'border-red-800': _ctx.formItem.validationError
    }],
    type: _ctx.type,
    rows: _ctx.rows,
    maxlength: _ctx.maxlength,
    placeholder: _ctx.label,
    onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.validate && _ctx.validate(...args)),
    onKeydown: _cache[2] || (_cache[2] = $event => _ctx.formItem.validationError = ''),
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.formItem.value = $event)
  }, null, 42, ["type", "rows", "maxlength", "placeholder"])), [[vModelText, _ctx.formItem.value]]) : withDirectives((openBlock(), createBlock("input", {
    key: 1,
    class: ["p-2 border rounded", {
      'border-red-800': _ctx.formItem.validationError
    }],
    type: _ctx.type,
    maxlength: _ctx.maxlength,
    placeholder: _ctx.label,
    onBlur: _cache[4] || (_cache[4] = (...args) => _ctx.validate && _ctx.validate(...args)),
    onKeydown: _cache[5] || (_cache[5] = $event => _ctx.formItem.validationError = ''),
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => _ctx.formItem.value = $event)
  }, null, 42, ["type", "maxlength", "placeholder"])), [[vModelDynamic, _ctx.formItem.value]]), _ctx.maxlengthLeft != null && _ctx.maxlengthLeft >= 0 ? (openBlock(), createBlock("span", _hoisted_2$1, " Restam " + toDisplayString(_ctx.maxlengthLeft) + " caracteres ", 1)) : createCommentVNode("", true), createVNode("span", _hoisted_3, toDisplayString(_ctx.formItem.validationError), 1)]);
}

script$1.render = render$1;

var script = defineComponent({
  name: "FormSection",
  props: {
    label: {
      type: String,
      required: true
    }
  }
});

const _hoisted_1 = {
  class: "text-lg text-blue-900 mb-2"
};
const _hoisted_2 = {
  class: "bg-white shadow-sm p-3 rounded mb-4 flex flex-wrap"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Fragment, null, [createVNode("div", _hoisted_1, toDisplayString(_ctx.label), 1), createVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "default")])], 64);
}

script.render = render;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TButton: script$2,
  TInput: script$1,
  TFormSection: script
});

// Import vue components

const install = function installTailpieces(app) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { script$2 as TButton, script as TFormSection, script$1 as TInput };
