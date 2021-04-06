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
}var script$2 = vue.defineComponent({
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
});function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("button", {
    class: ["mr-2 inline-block rounded text-white", [_ctx.sizeClass, _ctx.colorClass]],
    type: "button"
  }, [vue.renderSlot(_ctx.$slots, "default")], 2);
}script$2.render = render$2;var Validator = /*#__PURE__*/function () {
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
}();var script$1 = vue.defineComponent({
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
});var _hoisted_1$1 = {
  class: "flex flex-col mb-4 relative w-full"
};
var _hoisted_2$1 = {
  key: 2,
  class: "absolute right-0 text-xs top-2 text-gray-500"
};
var _hoisted_3 = {
  class: "text-red-800 text-sm ml-0.5"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [vue.createVNode("label", null, vue.toDisplayString(_ctx.label), 1), _ctx.type == 'textarea' ? vue.withDirectives((vue.openBlock(), vue.createBlock("textarea", {
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
  }, null, 42, ["type", "maxlength", "placeholder"])), [[vue.vModelDynamic, _ctx.formItem.value]]), _ctx.maxlengthLeft != null && _ctx.maxlengthLeft >= 0 ? (vue.openBlock(), vue.createBlock("span", _hoisted_2$1, " Restam " + vue.toDisplayString(_ctx.maxlengthLeft) + " caracteres ", 1)) : vue.createCommentVNode("", true), vue.createVNode("span", _hoisted_3, vue.toDisplayString(_ctx.formItem.validationError), 1)]);
}script$1.render = render$1;var script = vue.defineComponent({
  name: "FormSection",
  props: {
    label: {
      type: String,
      required: true
    }
  }
});var _hoisted_1 = {
  class: "text-lg text-blue-900 mb-2"
};
var _hoisted_2 = {
  class: "bg-white shadow-sm p-3 rounded mb-4 flex flex-wrap"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Fragment, null, [vue.createVNode("div", _hoisted_1, vue.toDisplayString(_ctx.label), 1), vue.createVNode("div", _hoisted_2, [vue.renderSlot(_ctx.$slots, "default")])], 64);
}script.render = render;var components$1=/*#__PURE__*/Object.freeze({__proto__:null,TButton: script$2,TInput: script$1,TFormSection: script});var install = function installTailpieces(app) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,TButton: script$2,TInput: script$1,TFormSection: script});// only expose one global var, with component exports exposed as properties of
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