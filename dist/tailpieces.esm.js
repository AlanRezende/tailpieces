import { defineComponent, computed, openBlock, createBlock, renderSlot, ref, watch, onMounted, createVNode, toDisplayString, withDirectives, vModelText, vModelDynamic, createCommentVNode, Fragment, renderList, vModelSelect, pushScopeId, popScopeId, Transition, withScopeId, createTextVNode, vShow } from 'vue';

var script$9 = defineComponent({
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

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("button", {
    class: ["mr-2 inline-block rounded text-white", [_ctx.sizeClass, _ctx.colorClass]],
    type: "button"
  }, [renderSlot(_ctx.$slots, "default")], 2);
}

script$9.render = render$9;

class Form {
  constructor(data, validationRules = {}) {
    this.data = this.addProperties(data);
    this.validationRules = {};

    if (validationRules != {}) {
      this.setRules(validationRules);
    }
  }

  getOriginal() {
    return this.removeProperties(this.data);
  }

  syncRules() {
    this.setRules(this.validationRules, this.data);
  }

  setPristine() {// Muda o status de todos os campos do form
  }

  clearErrors(data = this.data) {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value.value == "object" && value.value != null) {
        if (typeof value == "object") {
          value.value.forEach(item => {
            this.clearErrors(item);
          });
        }
      } else {
        value.value;
        data[key]["validationError"] = "";
      }
    });
  }

  hasErrors() {
    return this.errors() > 0;
  }

  errors(data = this.data) {
    let totalErrors = 0;
    Object.values(data).forEach(value => {
      if (typeof value.value == "object" && value.value != null) {
        value.value.forEach(item => {
          totalErrors += this.errors(item);
        });
      } else {
        if (value.validationError != "") {
          totalErrors += 1;
        }
      }
    });
    return totalErrors;
  }

  validate(data = this.data) {
    const validator = new Validator();
    Object.values(data).forEach(value => {
      if (typeof value.value == "object" && value.value != null) {
        value.value.forEach(item => {
          this.validate(item);
        });
      } else {
        value.validationError = validator.validate(value.value, value.validationRules);
      }
    });
  }

  get(key) {
    if (this.data[key]) {
      return this.data[key].value;
    }

    return undefined;
  }
  /**
   * Adiciona as regras de validação aos itens do form
   * 1 nível @todo subníveis
   */


  setRules(rules, data = this.data) {
    if (data == this.data) {
      this.validationRules = rules;
    }

    Object.entries(rules).forEach(([key, value]) => {
      if (data[key] && typeof value == "string") {
        data[key]["validationRules"] = value;
      } else {
        const temp = data[key.substr(1)];

        if (temp && typeof value == "object" && typeof temp.value == "object" && temp.value != null) {
          temp.value.forEach(item => {
            this.setRules(value, item);
          });
        }
      }
    });
  } // @todo criar SetRule para apenas 1 item
  // name: 'required' ou categories.name: required

  /**
   * Retorna o objeto ao estado inicial
   */


  removeProperties(data) {
    const newObj = {};
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value.value == "object" && value.value != null) {
        const nested = [];
        value.value.forEach(item => {
          nested.push(this.removeProperties(item));
        });
        newObj[key] = nested;
      } else {
        if (typeof value.value != "undefined") {
          newObj[key] = value.value;
        }
      }
    });
    return newObj;
  }
  /**
   * Adiciona as propriedades extras do objeto
   */


  addProperties(data) {
    if (data == null) {
      return;
    }

    const newObj = {};
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value == "object" && value != null) {
        const nested = [];
        value.forEach(item => {
          nested.push(this.addProperties(item));
        });
        newObj[key] = {
          value: nested,
          validationRules: "",
          validationError: "",
          status: ""
        };
      } else {
        newObj[key] = {
          value: value,
          validationRules: "",
          validationError: "",
          status: ""
        };
      }
    });
    return newObj;
  }

}

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

var script$8 = defineComponent({
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

const _hoisted_1$8 = {
  class: "flex flex-col mb-4 relative w-full"
};
const _hoisted_2$5 = {
  key: 2,
  class: "absolute right-0 text-xs top-2 text-gray-500"
};
const _hoisted_3$3 = {
  class: "text-red-800 text-sm ml-0.5"
};
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$8, [createVNode("label", null, toDisplayString(_ctx.label), 1), _ctx.type == 'textarea' ? withDirectives((openBlock(), createBlock("textarea", {
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
  }, null, 42, ["type", "maxlength", "placeholder"])), [[vModelDynamic, _ctx.formItem.value]]), _ctx.maxlengthLeft != null && _ctx.maxlengthLeft >= 0 ? (openBlock(), createBlock("span", _hoisted_2$5, " Restam " + toDisplayString(_ctx.maxlengthLeft) + " caracteres ", 1)) : createCommentVNode("", true), createVNode("span", _hoisted_3$3, toDisplayString(_ctx.formItem.validationError), 1)]);
}

script$8.render = render$8;

var script$7 = defineComponent({
  name: "FormSection",
  props: {
    label: {
      type: String,
      required: true
    }
  }
});

const _hoisted_1$7 = {
  class: "text-lg text-blue-900 mb-2"
};
const _hoisted_2$4 = {
  class: "bg-white shadow-sm p-3 rounded mb-4 flex flex-wrap"
};
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Fragment, null, [createVNode("div", _hoisted_1$7, toDisplayString(_ctx.label), 1), createVNode("div", _hoisted_2$4, [renderSlot(_ctx.$slots, "default")])], 64);
}

script$7.render = render$7;

var script$6 = defineComponent({
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      required: true
    },
    items: {
      type: Array,
      required: true
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
        formItem.value.value = value; // formItem.value.validationRules = props.validationRules;
      } else {
        formItem.value = value; // if (props.validationRules != "") {
        //   formItem.value.validationRules = props.validationRules;
        // }
      }
    };
    /**
     * Ajusta as props ao inicializar o componente
     */


    onMounted(() => {
      adjustProps(props.modelValue);
    });
    return {
      formItem
    };
  }

});

const _hoisted_1$6 = {
  class: "flex flex-col mb-4 w-full"
};
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$6, [createVNode("label", null, toDisplayString(_ctx.label), 1), withDirectives(createVNode("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.formItem.value = $event),
    class: "p-2 border rounded",
    name: "",
    id: ""
  }, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, item => {
    return openBlock(), createBlock("option", {
      value: item.value,
      key: item.value
    }, toDisplayString(item.name), 9, ["value"]);
  }), 128))], 512), [[vModelSelect, _ctx.formItem.value]])]);
}

script$6.render = render$6;

var script$5 = defineComponent({
  name: "TAccordion",
  props: {
    label: {
      type: String,
      required: true
    }
  },

  setup() {
    let open = ref(false);
    return {
      open
    };
  }

});

const _withId = /*#__PURE__*/withScopeId("data-v-05d6287b");

pushScopeId("data-v-05d6287b");

const _hoisted_1$5 = {
  class: "rounded border"
};
const _hoisted_2$3 = {
  class: "overflow-hidden"
};
const _hoisted_3$2 = {
  key: 0,
  class: "transition-all rounded-b ease-in-out overflow-hidden origin-top"
};
const _hoisted_4$1 = {
  class: "p-2"
};

popScopeId();

const render$5 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", _hoisted_1$5, [createVNode("div", {
    onClick: _cache[1] || (_cache[1] = $event => _ctx.open = !_ctx.open),
    class: "cursor-pointer rounded-t bg-gray-100 p-1 px-2"
  }, toDisplayString(_ctx.label), 1), createVNode("div", _hoisted_2$3, [createVNode(Transition, {
    name: "fade"
  }, {
    default: _withId(() => [_ctx.open ? (openBlock(), createBlock("div", _hoisted_3$2, [createVNode("div", _hoisted_4$1, [renderSlot(_ctx.$slots, "default")])])) : createCommentVNode("", true)]),
    _: 3
  })])]);
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.fade-enter-active[data-v-05d6287b],\n.fade-leave-active[data-v-05d6287b] {\n  opacity: 1;\n  transform: translate3d(0, 0, 0);\n}\n.fade-enter-from[data-v-05d6287b],\n.fade-leave-to[data-v-05d6287b] {\n  opacity: 0;\n  transform: translate3d(0, -100%, 0);\n}\n";
styleInject(css_248z);

script$5.render = render$5;
script$5.__scopeId = "data-v-05d6287b";

var script$4 = defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    label: {
      type: String
    },
    size: {
      type: String,
      default: "base"
    },
    title: {
      type: Array
    }
  },

  setup(props) {
    const sizeClass = computed(() => {
      let options = {
        sm: {
          button: "w-8 h-4",
          span: `h-2 w-2 ${props.modelValue ? "ml-4" : "ml-1"}`,
          text: "text-sm"
        },
        base: {
          button: "w-12 h-6",
          span: `h-4 w-4 ${props.modelValue ? "ml-6" : "ml-1"}`,
          text: "text-base"
        },
        lg: {
          button: "w-16 h-9",
          span: `h-6 w-6 ${props.modelValue ? "ml-8" : "ml-1"}`,
          text: "text-lg"
        }
      };
      return options[props.size];
    });
    return {
      sizeClass
    };
  }

});

const _hoisted_1$4 = {
  class: "cursor-pointer flex flex-col"
};
const _hoisted_2$2 = {
  key: 0
};
const _hoisted_3$1 = {
  class: "flex items-center"
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$4, [_ctx.label ? (openBlock(), createBlock("label", _hoisted_2$2, toDisplayString(_ctx.label), 1)) : createCommentVNode("", true), createVNode("div", _hoisted_3$1, [createVNode("button", {
    class: ["rounded-full border-2 focus:outline-none mr-2", [{
      'border-green-500': _ctx.modelValue,
      'border-gray-400': !_ctx.modelValue
    }, _ctx.sizeClass.button]],
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('update:modelValue', !_ctx.modelValue))
  }, [createVNode("span", {
    class: ["top-1 transition-all duration-500 ease-in-out block rounded-full", [{
      'bg-green-500': _ctx.modelValue,
      'bg-gray-400': !_ctx.modelValue
    }, _ctx.sizeClass.span]]
  }, null, 2)], 2), _ctx.title ? (openBlock(), createBlock("span", {
    key: 0,
    class: [{
      'text-green-500': _ctx.modelValue,
      'text-gray-400': !_ctx.modelValue
    }, _ctx.sizeClass.text]
  }, toDisplayString(_ctx.modelValue ? _ctx.title[0] : _ctx.title[1]), 3)) : createCommentVNode("", true)])]);
}

script$4.render = render$4;

var script$3 = defineComponent({
  props: {
    info: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: "blue"
    }
  },

  setup(props) {
    let show = ref(true);
    const colorClass = computed(() => {
      let options = {
        red: "bg-red-100 text-red-900 border-red-300",
        blue: "bg-blue-100 text-blue-900 border-blue-300",
        yellow: "bg-yellow-100 text-yellow-900 border-yellow-300",
        green: "bg-green-100 text-green-900 border-green-300",
        gray: "bg-gray-50 text-gray-900 border-gray-300"
      };

      if (props.color.split("-").length > 1) {
        return props.color;
      }

      return options[props.color];
    });
    return {
      show,
      colorClass
    };
  }

});

const _hoisted_1$3 = {
  key: 0,
  class: "text-lg font-bold"
};
const _hoisted_2$1 = {
  class: "list-inside"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.show ? (openBlock(), createBlock("div", {
    key: 0,
    class: ["relative border mb-4 p-3 rounded", _ctx.colorClass]
  }, [createVNode("span", {
    class: "absolute cursor-pointer right-2 top-1",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.show = false)
  }, "X"), _ctx.info.title ? (openBlock(), createBlock("p", _hoisted_1$3, toDisplayString(_ctx.info.title), 1)) : createCommentVNode("", true), createVNode("ul", _hoisted_2$1, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.info.messages, (item, index) => {
    return openBlock(), createBlock("li", {
      class: {
        'list-disc': _ctx.info.title
      },
      key: index
    }, toDisplayString(item), 3);
  }), 128))])], 2)) : createCommentVNode("", true);
}

script$3.render = render$3;

var script$2 = defineComponent({
  props: {
    label: {
      type: String,
      default: "Opções"
    }
  },

  setup() {
    const open = ref(false);
    const root = ref();

    const toggleDropdown = () => {
      if (open.value) {
        document.removeEventListener("click", handleClicks);
      } else {
        document.addEventListener("click", handleClicks);
      }

      open.value = !open.value;
    };

    const handleClicks = evt => {
      if (!root.value.contains(evt.target)) {
        toggleDropdown();
      }
    };

    return {
      open,
      toggleDropdown,
      root
    };
  }

});

const _hoisted_1$2 = {
  ref: "root",
  class: "relative inline-block"
};
const _hoisted_2 = {
  class: "focus:outline-none hover:underline flex items-center"
};

const _hoisted_3 = /*#__PURE__*/createVNode("path", {
  d: "M6 9l6 6 6-6"
}, null, -1);

const _hoisted_4 = {
  class: "shadow rounded z-30 border bg-white absolute"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$2, [createVNode("div", {
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.toggleDropdown && _ctx.toggleDropdown(...args)),
    class: "inline-block"
  }, [renderSlot(_ctx.$slots, "trigger", {}, () => [createVNode("button", _hoisted_2, [createTextVNode(toDisplayString(_ctx.label) + " ", 1), (openBlock(), createBlock("svg", {
    fill: "none",
    class: ["fill-current w-6 h-6 transition-all duration-500 ease-in-out", {
      'transform rotate-180': _ctx.open
    }],
    viewBox: "0 0 24 24",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    xmlns: "http://www.w3.org/2000/svg"
  }, [_hoisted_3], 2))])])]), withDirectives(createVNode("ul", _hoisted_4, [renderSlot(_ctx.$slots, "default")], 512), [[vShow, _ctx.open]])], 512);
}

script$2.render = render$2;

var script$1 = defineComponent({
  props: {
    type: {
      type: String,
      default: "link"
    },
    href: {
      type: String,
      default: "#"
    }
  }
});

const _hoisted_1$1 = {
  key: 1,
  class: "border-t mt-1 pt-1"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("li", null, [_ctx.type == 'link' ? (openBlock(), createBlock("a", {
    key: 0,
    class: "hover:bg-gray-100 px-4 py-1 block whitespace-nowrap",
    href: _ctx.href
  }, [renderSlot(_ctx.$slots, "default")], 8, ["href"])) : (openBlock(), createBlock("hr", _hoisted_1$1))]);
}

script$1.render = render$1;

var script = defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  }
});

const _hoisted_1 = {
  key: 0
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return typeof _ctx.data.value == 'object' ? (openBlock(), createBlock("div", _hoisted_1, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.data.value, (item, index) => {
    return renderSlot(_ctx.$slots, "default", {
      item: item,
      index: index,
      key: index
    });
  }), 128))])) : createCommentVNode("", true);
}

script.render = render;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TButton: script$9,
  TInput: script$8,
  TFormSection: script$7,
  TSelect: script$6,
  TAccordion: script$5,
  TToggle: script$4,
  TAlert: script$3,
  TDropdown: script$2,
  TDropdownItem: script$1,
  TLoop: script
});

// Import vue components

const install = function installTailpieces(app) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { Form, script$5 as TAccordion, script$3 as TAlert, script$9 as TButton, script$2 as TDropdown, script$1 as TDropdownItem, script$7 as TFormSection, script$8 as TInput, script as TLoop, script$6 as TSelect, script$4 as TToggle, Validator };
