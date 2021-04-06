'use strict';var vue=require('vue');function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script$6 = vue.defineComponent({
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
  setup: function setup(props) {
    var sizeClass = vue.computed(function () {
      var options = {
        sm: "text-sm px-2",
        base: "text-base px-4 py-1",
        lg: "text-lg px-8 py-2"
      };
      return options[props.size];
    });
    var colorClass = vue.computed(function () {
      // 5 cores blue, green, yellow, red, gray
      // ou bg-indigo-400
      var options = {
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
      sizeClass: sizeClass,
      colorClass: colorClass
    };
  }
});function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("button", {
    class: ["mr-2 inline-block rounded text-white", [_ctx.sizeClass, _ctx.colorClass]],
    type: "button"
  }, [vue.renderSlot(_ctx.$slots, "default")], 2);
}script$6.render = render$6;var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, [{
    key: "validate",
    value: function validate(value, rules) {
      if (typeof value == "string") {
        return this.validateString(value, rules);
      }

      return "";
    }
  }, {
    key: "validateString",
    value: function validateString(value, rules) {
      var rulesArray = rules.split("|");
      var message = "";
      rulesArray.some(function (rule) {
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
              message = "Este campo precisa ter ".concat(rule.split(":")[1], " caracteres");
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
              message = "Este campo precisa ter ao menos ".concat(rule.split(":")[1], " caracteres");
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
              message = "Este campo precisa ter no m\xE1ximo ".concat(rule.split(":")[1], " caracteres");
              return true;
            }
          }
        }
      });
      return message;
    }
  }]);

  return Validator;
}();var script$5 = vue.defineComponent({
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
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    /**
     * Construção de um formItem vazio
     */
    var formItem = vue.ref({
      value: "",
      validationRules: "",
      validationError: "",
      status: "pristine"
    });
    var maxlengthLeft = vue.computed(function () {
      if (typeof formItem.value.value == "string" && props.maxlength && props.maxlength > 0) {
        return props.maxlength - formItem.value.value.length;
      }

      return null;
    });
    /**
     * Valida os dados baseados nas regras de validationRules
     */

    var validate = function validate() {
      var validator = new Validator();
      formItem.value.validationError = validator.validate(formItem.value.value, formItem.value.validationRules);
    };
    /**
     * Verifica de forma profunda o formItem
     * e emite o event para atualização no pai
     */


    vue.watch(formItem, function (newVal) {
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

    vue.watch(function () {
      return props.modelValue;
    }, function (newVal) {
      adjustProps(newVal);
    }, {
      deep: true
    });
    /**
     * Ajusta as props nos casos de string / number / object
     */

    var adjustProps = function adjustProps(value) {
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


    vue.onMounted(function () {
      adjustProps(props.modelValue);
    });
    /**
     * Retorna os dados para o template
     */

    return {
      formItem: formItem,
      validate: validate,
      maxlengthLeft: maxlengthLeft
    };
  }
});var _hoisted_1$5 = {
  class: "flex flex-col mb-4 relative w-full"
};
var _hoisted_2$4 = {
  key: 2,
  class: "absolute right-0 text-xs top-2 text-gray-500"
};
var _hoisted_3$2 = {
  class: "text-red-800 text-sm ml-0.5"
};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$5, [vue.createVNode("label", null, vue.toDisplayString(_ctx.label), 1), _ctx.type == 'textarea' ? vue.withDirectives((vue.openBlock(), vue.createBlock("textarea", {
    key: 0,
    class: ["p-2 border rounded", {
      'border-red-800': _ctx.formItem.validationError
    }],
    type: _ctx.type,
    rows: _ctx.rows,
    maxlength: _ctx.maxlength,
    placeholder: _ctx.label,
    onBlur: _cache[1] || (_cache[1] = function () {
      return _ctx.validate && _ctx.validate.apply(_ctx, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.formItem.validationError = '';
    }),
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.formItem.value = $event;
    })
  }, null, 42, ["type", "rows", "maxlength", "placeholder"])), [[vue.vModelText, _ctx.formItem.value]]) : vue.withDirectives((vue.openBlock(), vue.createBlock("input", {
    key: 1,
    class: ["p-2 border rounded", {
      'border-red-800': _ctx.formItem.validationError
    }],
    type: _ctx.type,
    maxlength: _ctx.maxlength,
    placeholder: _ctx.label,
    onBlur: _cache[4] || (_cache[4] = function () {
      return _ctx.validate && _ctx.validate.apply(_ctx, arguments);
    }),
    onKeydown: _cache[5] || (_cache[5] = function ($event) {
      return _ctx.formItem.validationError = '';
    }),
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return _ctx.formItem.value = $event;
    })
  }, null, 42, ["type", "maxlength", "placeholder"])), [[vue.vModelDynamic, _ctx.formItem.value]]), _ctx.maxlengthLeft != null && _ctx.maxlengthLeft >= 0 ? (vue.openBlock(), vue.createBlock("span", _hoisted_2$4, " Restam " + vue.toDisplayString(_ctx.maxlengthLeft) + " caracteres ", 1)) : vue.createCommentVNode("", true), vue.createVNode("span", _hoisted_3$2, vue.toDisplayString(_ctx.formItem.validationError), 1)]);
}script$5.render = render$5;var script$4 = vue.defineComponent({
  name: "FormSection",
  props: {
    label: {
      type: String,
      required: true
    }
  }
});var _hoisted_1$4 = {
  class: "text-lg text-blue-900 mb-2"
};
var _hoisted_2$3 = {
  class: "bg-white shadow-sm p-3 rounded mb-4 flex flex-wrap"
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Fragment, null, [vue.createVNode("div", _hoisted_1$4, vue.toDisplayString(_ctx.label), 1), vue.createVNode("div", _hoisted_2$3, [vue.renderSlot(_ctx.$slots, "default")])], 64);
}script$4.render = render$4;var script$3 = vue.defineComponent({
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
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    /**
     * Construção de um formItem vazio
     */
    var formItem = vue.ref({
      value: "",
      validationRules: "",
      validationError: "",
      status: "pristine"
    });
    /**
     * Verifica de forma profunda o formItem
     * e emite o event para atualização no pai
     */

    vue.watch(formItem, function (newVal) {
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

    vue.watch(function () {
      return props.modelValue;
    }, function (newVal) {
      adjustProps(newVal);
    }, {
      deep: true
    });
    /**
     * Ajusta as props nos casos de string / number / object
     */

    var adjustProps = function adjustProps(value) {
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


    vue.onMounted(function () {
      adjustProps(props.modelValue);
    });
    return {
      formItem: formItem
    };
  }
});var _hoisted_1$3 = {
  class: "flex flex-col mb-4 w-full"
};
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$3, [vue.createVNode("label", null, vue.toDisplayString(_ctx.label), 1), vue.withDirectives(vue.createVNode("select", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return _ctx.formItem.value = $event;
    }),
    class: "p-2 border rounded",
    name: "",
    id: ""
  }, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.items, function (item) {
    return vue.openBlock(), vue.createBlock("option", {
      value: item.value,
      key: item.value
    }, vue.toDisplayString(item.name), 9, ["value"]);
  }), 128))], 512), [[vue.vModelSelect, _ctx.formItem.value]])]);
}script$3.render = render$3;var script$2 = vue.defineComponent({
  name: "TAccordion",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup: function setup() {
    var open = vue.ref(false);
    return {
      open: open
    };
  }
});var _withId = /*#__PURE__*/vue.withScopeId("data-v-9f667f02");

vue.pushScopeId("data-v-9f667f02");

var _hoisted_1$2 = {
  class: "rounded border"
};
var _hoisted_2$2 = {
  class: "overflow-hidden"
};
var _hoisted_3$1 = {
  key: 0,
  class: "transition-all rounded-b ease-in-out overflow-hidden origin-top"
};
var _hoisted_4 = {
  class: "p-2"
};

vue.popScopeId();

var render$2 = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$2, [vue.createVNode("div", {
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.open = !_ctx.open;
    }),
    class: "cursor-pointer rounded-t bg-gray-100 p-1 px-2"
  }, vue.toDisplayString(_ctx.label), 1), vue.createVNode("div", _hoisted_2$2, [vue.createVNode(vue.Transition, {
    name: "fade"
  }, {
    default: _withId(function () {
      return [_ctx.open ? (vue.openBlock(), vue.createBlock("div", _hoisted_3$1, [vue.createVNode("div", _hoisted_4, [vue.renderSlot(_ctx.$slots, "default")])])) : vue.createCommentVNode("", true)];
    }),
    _: 3
  })])]);
});function styleInject(css, ref) {
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
}var css_248z = "\n.fade-enter-active[data-v-9f667f02],\n.fade-leave-active[data-v-9f667f02] {\n  opacity: 1;\n  transform: translate3d(0, 0, 0);\n}\n.fade-enter-from[data-v-9f667f02],\n.fade-leave-to[data-v-9f667f02] {\n  opacity: 0;\n  transform: translate3d(0, -100%, 0);\n}\n";
styleInject(css_248z);script$2.render = render$2;
script$2.__scopeId = "data-v-9f667f02";var script$1 = vue.defineComponent({
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
  setup: function setup(props) {
    var sizeClass = vue.computed(function () {
      var options = {
        sm: {
          button: "w-8 h-4",
          span: "h-2 w-2 ".concat(props.modelValue ? "ml-4" : "ml-1"),
          text: "text-sm"
        },
        base: {
          button: "w-12 h-6",
          span: "h-4 w-4 ".concat(props.modelValue ? "ml-6" : "ml-1"),
          text: "text-base"
        },
        lg: {
          button: "w-16 h-9",
          span: "h-6 w-6 ".concat(props.modelValue ? "ml-8" : "ml-1"),
          text: "text-lg"
        }
      };
      return options[props.size];
    });
    return {
      sizeClass: sizeClass
    };
  }
});var _hoisted_1$1 = {
  class: "cursor-pointer flex flex-col"
};
var _hoisted_2$1 = {
  key: 0
};
var _hoisted_3 = {
  class: "flex items-center"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [_ctx.label ? (vue.openBlock(), vue.createBlock("label", _hoisted_2$1, vue.toDisplayString(_ctx.label), 1)) : vue.createCommentVNode("", true), vue.createVNode("div", _hoisted_3, [vue.createVNode("button", {
    class: ["rounded-full border-2 focus:outline-none mr-2", [{
      'border-green-500': _ctx.modelValue,
      'border-gray-400': !_ctx.modelValue
    }, _ctx.sizeClass.button]],
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('update:modelValue', !_ctx.modelValue);
    })
  }, [vue.createVNode("span", {
    class: ["top-1 transition-all duration-500 ease-in-out block rounded-full", [{
      'bg-green-500': _ctx.modelValue,
      'bg-gray-400': !_ctx.modelValue
    }, _ctx.sizeClass.span]]
  }, null, 2)], 2), _ctx.title ? (vue.openBlock(), vue.createBlock("span", {
    key: 0,
    class: [{
      'text-green-500': _ctx.modelValue,
      'text-gray-400': !_ctx.modelValue
    }, _ctx.sizeClass.text]
  }, vue.toDisplayString(_ctx.modelValue ? _ctx.title[0] : _ctx.title[1]), 3)) : vue.createCommentVNode("", true)])]);
}script$1.render = render$1;var script = vue.defineComponent({
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
  setup: function setup(props) {
    var show = vue.ref(true);
    var colorClass = vue.computed(function () {
      var options = {
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
      show: show,
      colorClass: colorClass
    };
  }
});var _hoisted_1 = {
  key: 0,
  class: "text-lg font-bold"
};
var _hoisted_2 = {
  class: "list-inside"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.show ? (vue.openBlock(), vue.createBlock("div", {
    key: 0,
    class: ["relative border mb-4 p-3 rounded", _ctx.colorClass]
  }, [vue.createVNode("span", {
    class: "absolute cursor-pointer right-2 top-1",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.show = false;
    })
  }, "X"), _ctx.info.title ? (vue.openBlock(), vue.createBlock("p", _hoisted_1, vue.toDisplayString(_ctx.info.title), 1)) : vue.createCommentVNode("", true), vue.createVNode("ul", _hoisted_2, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.info.messages, function (item, index) {
    return vue.openBlock(), vue.createBlock("li", {
      class: {
        'list-disc': _ctx.info.title
      },
      key: index
    }, vue.toDisplayString(item), 3);
  }), 128))])], 2)) : vue.createCommentVNode("", true);
}script.render = render;var components$1=/*#__PURE__*/Object.freeze({__proto__:null,TButton: script$6,TInput: script$5,TFormSection: script$4,TSelect: script$3,TAccordion: script$2,TToggle: script$1,TAlert: script});var install = function installTailpieces(app) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,TButton: script$6,TInput: script$5,TFormSection: script$4,TSelect: script$3,TAccordion: script$2,TToggle: script$1,TAlert: script});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    var key = componentName;
    var val = component;
    install[key] = val;
  }
});module.exports=install;