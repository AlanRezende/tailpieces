import { defineComponent, pushScopeId, popScopeId, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, withScopeId, computed, renderSlot } from 'vue';

var script$1 = /*#__PURE__*/defineComponent({
  name: "TailpiecesSample",

  // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null
      }
    };
  },

  computed: {
    changedBy() {
      const {
        message
      } = this;
      if (!message.action) return "initialized";
      return `${message.action} ${message.amount || ""}`.trim();
    }

  },
  methods: {
    increment(arg) {
      const amount = typeof arg !== "number" ? 1 : arg;
      this.counter += amount;
      this.message.action = "incremented by";
      this.message.amount = amount;
    },

    decrement(arg) {
      const amount = typeof arg !== "number" ? 1 : arg;
      this.counter -= amount;
      this.message.action = "decremented by";
      this.message.amount = amount;
    },

    reset() {
      this.counter = this.initCounter;
      this.message.action = "reset";
      this.message.amount = null;
    }

  }
});

const _withId = /*#__PURE__*/withScopeId("data-v-4285bdec");

pushScopeId("data-v-4285bdec");

const _hoisted_1 = {
  class: "tailpieces-sample"
};

const _hoisted_2 = /*#__PURE__*/createTextVNode(". ");

popScopeId();

const render$1 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", _hoisted_1, [createVNode("p", null, [createTextVNode(" The counter was " + toDisplayString(_ctx.changedBy) + " to ", 1), createVNode("b", null, toDisplayString(_ctx.counter), 1), _hoisted_2]), createVNode("button", {
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.increment && _ctx.increment(...args))
  }, " Click +1 "), createVNode("button", {
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.decrement && _ctx.decrement(...args))
  }, " Click -1 "), createVNode("button", {
    onClick: _cache[3] || (_cache[3] = $event => _ctx.increment(5))
  }, " Click +5 "), createVNode("button", {
    onClick: _cache[4] || (_cache[4] = $event => _ctx.decrement(5))
  }, " Click -5 "), createVNode("button", {
    onClick: _cache[5] || (_cache[5] = (...args) => _ctx.reset && _ctx.reset(...args))
  }, " Reset ")]);
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

var css_248z = "\n.tailpieces-sample[data-v-4285bdec] {\n  display: block;\n  width: 400px;\n  margin: 25px auto;\n  border: 1px solid #ccc;\n  background: #eaeaea;\n  text-align: center;\n  padding: 25px;\n}\n.tailpieces-sample p[data-v-4285bdec] {\n  margin: 0 0 1em;\n}\n";
styleInject(css_248z);

script$1.render = render$1;
script$1.__scopeId = "data-v-4285bdec";

var script = defineComponent({
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("button", {
    class: ["mr-2 inline-block rounded text-white", [_ctx.sizeClass, _ctx.colorClass]],
    type: "button"
  }, [renderSlot(_ctx.$slots, "default")], 2);
}

script.render = render;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TailpiecesSample: script$1,
  TButton: script
});

// Import vue components

const install = function installTailpieces(app) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { script as TButton, script$1 as TailpiecesSample };
