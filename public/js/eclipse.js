/******/ (() => {
    // webpackBootstrap
    /******/ var __webpack_modules__ = {
        /***/ "./resources/js/ion.rangeSlider.js":
            /*!*****************************************!*\
  !*** ./resources/js/ion.rangeSlider.js ***!
  \*****************************************/
            /***/ (module, exports) => {
                var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (
                        typeof Symbol === "function" &&
                        typeof Symbol.iterator === "symbol"
                    ) {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj &&
                                typeof Symbol === "function" &&
                                obj.constructor === Symbol &&
                                obj !== Symbol.prototype
                                ? "symbol"
                                : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }

                // Ion.RangeSlider
                // version 2.2.0 Build: 380
                // © Denis Ineshin, 2017
                // https://github.com/IonDen
                //
                // Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
                // GitHub page:     https://github.com/IonDen/ion.rangeSlider
                //
                // Released under MIT licence:
                // http://ionden.com/a/plugins/licence-en.html
                // =====================================================================================================================
                (function (factory) {
                    if (true) {
                        !((__WEBPACK_AMD_DEFINE_ARRAY__ = [
                            Object(
                                (function webpackMissingModule() {
                                    var e = new Error(
                                        "Cannot find module 'jquery'"
                                    );
                                    e.code = "MODULE_NOT_FOUND";
                                    throw e;
                                })()
                            ),
                        ]),
                        (__WEBPACK_AMD_DEFINE_RESULT__ = function (jQuery) {
                            return factory(jQuery, document, window, navigator);
                        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
                        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                            (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    } else {
                    }
                })(function ($, document, window, navigator, undefined) {
                    "use strict"; // =================================================================================================================
                    // Service

                    var plugin_count = 0; // IE8 fix

                    var is_old_ie = (function () {
                        var n = navigator.userAgent,
                            r = /msie\s\d+/i,
                            v;

                        if (n.search(r) > 0) {
                            v = r.exec(n).toString();
                            v = v.split(" ")[1];

                            if (v < 9) {
                                $("html").addClass("lt-ie9");
                                return true;
                            }
                        }

                        return false;
                    })();

                    if (!Function.prototype.bind) {
                        Function.prototype.bind = function bind(that) {
                            var target = this;
                            var slice = [].slice;

                            if (typeof target != "function") {
                                throw new TypeError();
                            }

                            var args = slice.call(arguments, 1),
                                bound = function bound() {
                                    if (this instanceof bound) {
                                        var F = function F() {};

                                        F.prototype = target.prototype;
                                        var self = new F();
                                        var result = target.apply(
                                            self,
                                            args.concat(slice.call(arguments))
                                        );

                                        if (Object(result) === result) {
                                            return result;
                                        }

                                        return self;
                                    } else {
                                        return target.apply(
                                            that,
                                            args.concat(slice.call(arguments))
                                        );
                                    }
                                };

                            return bound;
                        };
                    }

                    if (!Array.prototype.indexOf) {
                        Array.prototype.indexOf = function (
                            searchElement,
                            fromIndex
                        ) {
                            var k;

                            if (this == null) {
                                throw new TypeError(
                                    '"this" is null or not defined'
                                );
                            }

                            var O = Object(this);
                            var len = O.length >>> 0;

                            if (len === 0) {
                                return -1;
                            }

                            var n = +fromIndex || 0;

                            if (Math.abs(n) === Infinity) {
                                n = 0;
                            }

                            if (n >= len) {
                                return -1;
                            }

                            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                            while (k < len) {
                                if (k in O && O[k] === searchElement) {
                                    return k;
                                }

                                k++;
                            }

                            return -1;
                        };
                    } // =================================================================================================================
                    // Template

                    var base_html =
                        '<span class="irs">' +
                        '<span class="irs-line" tabindex="0"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span>' +
                        '<span class="irs-min">0</span><span class="irs-max">1</span>' +
                        '<span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span>' +
                        "</span>" +
                        '<span class="irs-grid"></span>' +
                        '<span class="irs-bar"></span>';
                    var single_html =
                        '<span class="irs-bar-edge"></span>' +
                        '<span class="irs-shadow shadow-single"></span>' +
                        '<span class="irs-slider single"></span>';
                    var double_html =
                        '<span class="irs-shadow shadow-from"></span>' +
                        '<span class="irs-shadow shadow-to"></span>' +
                        '<span class="irs-slider from"></span>' +
                        '<span class="irs-slider to"></span>';
                    var disable_html = '<span class="irs-disable-mask"></span>'; // =================================================================================================================
                    // Core

                    /**
                     * Main plugin constructor
                     *
                     * @param input {Object} link to base input element
                     * @param options {Object} slider config
                     * @param plugin_count {Number}
                     * @constructor
                     */

                    var IonRangeSlider = function IonRangeSlider(
                        input,
                        options,
                        plugin_count
                    ) {
                        this.VERSION = "2.2.0";
                        this.input = input;
                        this.plugin_count = plugin_count;
                        this.current_plugin = 0;
                        this.calc_count = 0;
                        this.update_tm = 0;
                        this.old_from = 0;
                        this.old_to = 0;
                        this.old_min_interval = null;
                        this.raf_id = null;
                        this.dragging = false;
                        this.force_redraw = false;
                        this.no_diapason = false;
                        this.has_tab_index = true;
                        this.is_key = false;
                        this.is_update = false;
                        this.is_start = true;
                        this.is_finish = false;
                        this.is_active = false;
                        this.is_resize = false;
                        this.is_click = false;
                        options = options || {}; // cache for links to all DOM elements

                        this.$cache = {
                            win: $(window),
                            body: $(document.body),
                            input: $(input),
                            cont: null,
                            rs: null,
                            min: null,
                            max: null,
                            from: null,
                            to: null,
                            single: null,
                            bar: null,
                            line: null,
                            s_single: null,
                            s_from: null,
                            s_to: null,
                            shad_single: null,
                            shad_from: null,
                            shad_to: null,
                            edge: null,
                            grid: null,
                            grid_labels: [],
                        }; // storage for measure variables

                        this.coords = {
                            // left
                            x_gap: 0,
                            x_pointer: 0,
                            // width
                            w_rs: 0,
                            w_rs_old: 0,
                            w_handle: 0,
                            // percents
                            p_gap: 0,
                            p_gap_left: 0,
                            p_gap_right: 0,
                            p_step: 0,
                            p_pointer: 0,
                            p_handle: 0,
                            p_single_fake: 0,
                            p_single_real: 0,
                            p_from_fake: 0,
                            p_from_real: 0,
                            p_to_fake: 0,
                            p_to_real: 0,
                            p_bar_x: 0,
                            p_bar_w: 0,
                            // grid
                            grid_gap: 0,
                            big_num: 0,
                            big: [],
                            big_w: [],
                            big_p: [],
                            big_x: [],
                        }; // storage for labels measure variables

                        this.labels = {
                            // width
                            w_min: 0,
                            w_max: 0,
                            w_from: 0,
                            w_to: 0,
                            w_single: 0,
                            // percents
                            p_min: 0,
                            p_max: 0,
                            p_from_fake: 0,
                            p_from_left: 0,
                            p_to_fake: 0,
                            p_to_left: 0,
                            p_single_fake: 0,
                            p_single_left: 0,
                        };
                        /**
                         * get and validate config
                         */

                        var $inp = this.$cache.input,
                            val = $inp.prop("value"),
                            config,
                            config_from_data,
                            prop; // default config

                        config = {
                            type: "single",
                            min: 10,
                            max: 100,
                            from: null,
                            to: null,
                            step: 1,
                            min_interval: 0,
                            max_interval: 0,
                            drag_interval: false,
                            values: [],
                            p_values: [],
                            from_fixed: false,
                            from_min: null,
                            from_max: null,
                            from_shadow: false,
                            to_fixed: false,
                            to_min: null,
                            to_max: null,
                            to_shadow: false,
                            prettify_enabled: true,
                            prettify_separator: " ",
                            prettify: null,
                            force_edges: false,
                            keyboard: true,
                            grid: false,
                            grid_margin: true,
                            grid_num: 4,
                            grid_snap: false,
                            hide_min_max: false,
                            hide_from_to: false,
                            prefix: "",
                            postfix: "",
                            max_postfix: "",
                            decorate_both: true,
                            values_separator: " — ",
                            input_values_separator: ";",
                            disable: false,
                            block: false,
                            extra_classes: "",
                            scope: null,
                            onStart: null,
                            onChange: null,
                            onFinish: null,
                            onUpdate: null,
                        }; // check if base element is input

                        if ($inp[0].nodeName !== "INPUT") {
                            console &&
                                console.warn &&
                                console.warn(
                                    "Base element should be <input>!",
                                    $inp[0]
                                );
                        } // config from data-attributes extends js config

                        config_from_data = {
                            type: $inp.data("type"),
                            min: $inp.data("min"),
                            max: $inp.data("max"),
                            from: $inp.data("from"),
                            to: $inp.data("to"),
                            step: $inp.data("step"),
                            min_interval: $inp.data("minInterval"),
                            max_interval: $inp.data("maxInterval"),
                            drag_interval: $inp.data("dragInterval"),
                            values: $inp.data("values"),
                            from_fixed: $inp.data("fromFixed"),
                            from_min: $inp.data("fromMin"),
                            from_max: $inp.data("fromMax"),
                            from_shadow: $inp.data("fromShadow"),
                            to_fixed: $inp.data("toFixed"),
                            to_min: $inp.data("toMin"),
                            to_max: $inp.data("toMax"),
                            to_shadow: $inp.data("toShadow"),
                            prettify_enabled: $inp.data("prettifyEnabled"),
                            prettify_separator: $inp.data("prettifySeparator"),
                            force_edges: $inp.data("forceEdges"),
                            keyboard: $inp.data("keyboard"),
                            grid: $inp.data("grid"),
                            grid_margin: $inp.data("gridMargin"),
                            grid_num: $inp.data("gridNum"),
                            grid_snap: $inp.data("gridSnap"),
                            hide_min_max: $inp.data("hideMinMax"),
                            hide_from_to: $inp.data("hideFromTo"),
                            prefix: $inp.data("prefix"),
                            postfix: $inp.data("postfix"),
                            max_postfix: $inp.data("maxPostfix"),
                            decorate_both: $inp.data("decorateBoth"),
                            values_separator: $inp.data("valuesSeparator"),
                            input_values_separator: $inp.data(
                                "inputValuesSeparator"
                            ),
                            disable: $inp.data("disable"),
                            block: $inp.data("block"),
                            extra_classes: $inp.data("extraClasses"),
                        };
                        config_from_data.values =
                            config_from_data.values &&
                            config_from_data.values.split(",");

                        for (prop in config_from_data) {
                            if (config_from_data.hasOwnProperty(prop)) {
                                if (
                                    config_from_data[prop] === undefined ||
                                    config_from_data[prop] === ""
                                ) {
                                    delete config_from_data[prop];
                                }
                            }
                        } // input value extends default config

                        if (val !== undefined && val !== "") {
                            val = val.split(
                                config_from_data.input_values_separator ||
                                    options.input_values_separator ||
                                    ";"
                            );

                            if (val[0] && val[0] == +val[0]) {
                                val[0] = +val[0];
                            }

                            if (val[1] && val[1] == +val[1]) {
                                val[1] = +val[1];
                            }

                            if (
                                options &&
                                options.values &&
                                options.values.length
                            ) {
                                config.from =
                                    val[0] && options.values.indexOf(val[0]);
                                config.to =
                                    val[1] && options.values.indexOf(val[1]);
                            } else {
                                config.from = val[0] && +val[0];
                                config.to = val[1] && +val[1];
                            }
                        } // js config extends default config

                        $.extend(config, options); // data config extends config

                        $.extend(config, config_from_data);
                        this.options = config; // validate config, to be sure that all data types are correct

                        this.update_check = {};
                        this.validate(); // default result object, returned to callbacks

                        this.result = {
                            input: this.$cache.input,
                            slider: null,
                            min: this.options.min,
                            max: this.options.max,
                            from: this.options.from,
                            from_percent: 0,
                            from_value: null,
                            to: this.options.to,
                            to_percent: 0,
                            to_value: null,
                        };
                        this.init();
                    };

                    IonRangeSlider.prototype = {
                        /**
                         * Starts or updates the plugin instance
                         *
                         * @param [is_update] {boolean}
                         */
                        init: function init(is_update) {
                            this.no_diapason = false;
                            this.coords.p_step = this.convertToPercent(
                                this.options.step,
                                true
                            );
                            this.target = "base";
                            this.toggleInput();
                            this.append();
                            this.setMinMax();

                            if (is_update) {
                                this.force_redraw = true;
                                this.calc(true); // callbacks called

                                this.callOnUpdate();
                            } else {
                                this.force_redraw = true;
                                this.calc(true); // callbacks called

                                this.callOnStart();
                            }

                            this.updateScene();
                        },

                        /**
                         * Appends slider template to a DOM
                         */
                        append: function append() {
                            var container_html =
                                '<span class="irs js-irs-' +
                                this.plugin_count +
                                " " +
                                this.options.extra_classes +
                                '"></span>';
                            this.$cache.input.before(container_html);
                            this.$cache.input.prop("readonly", true);
                            this.$cache.cont = this.$cache.input.prev();
                            this.result.slider = this.$cache.cont;
                            this.$cache.cont.html(base_html);
                            this.$cache.rs = this.$cache.cont.find(".irs");
                            this.$cache.min = this.$cache.cont.find(".irs-min");
                            this.$cache.max = this.$cache.cont.find(".irs-max");
                            this.$cache.from =
                                this.$cache.cont.find(".irs-from");
                            this.$cache.to = this.$cache.cont.find(".irs-to");
                            this.$cache.single =
                                this.$cache.cont.find(".irs-single");
                            this.$cache.bar = this.$cache.cont.find(".irs-bar");
                            this.$cache.line =
                                this.$cache.cont.find(".irs-line");
                            this.$cache.grid =
                                this.$cache.cont.find(".irs-grid");

                            if (this.options.type === "single") {
                                this.$cache.cont.append(single_html);
                                this.$cache.edge =
                                    this.$cache.cont.find(".irs-bar-edge");
                                this.$cache.s_single =
                                    this.$cache.cont.find(".single");
                                this.$cache.from[0].style.visibility = "hidden";
                                this.$cache.to[0].style.visibility = "hidden";
                                this.$cache.shad_single =
                                    this.$cache.cont.find(".shadow-single");
                            } else {
                                this.$cache.cont.append(double_html);
                                this.$cache.s_from =
                                    this.$cache.cont.find(".from");
                                this.$cache.s_to = this.$cache.cont.find(".to");
                                this.$cache.shad_from =
                                    this.$cache.cont.find(".shadow-from");
                                this.$cache.shad_to =
                                    this.$cache.cont.find(".shadow-to");
                                this.setTopHandler();
                            }

                            if (this.options.hide_from_to) {
                                this.$cache.from[0].style.display = "none";
                                this.$cache.to[0].style.display = "none";
                                this.$cache.single[0].style.display = "none";
                            }

                            this.appendGrid();

                            if (this.options.disable) {
                                this.appendDisableMask();
                                this.$cache.input[0].disabled = true;
                            } else {
                                this.$cache.input[0].disabled = false;
                                this.removeDisableMask();
                                this.bindEvents();
                            } // block only if not disabled

                            if (!this.options.disable) {
                                if (this.options.block) {
                                    this.appendDisableMask();
                                } else {
                                    this.removeDisableMask();
                                }
                            }

                            if (this.options.drag_interval) {
                                this.$cache.bar[0].style.cursor = "ew-resize";
                            }
                        },

                        /**
                         * Determine which handler has a priority
                         * works only for double slider type
                         */
                        setTopHandler: function setTopHandler() {
                            var min = this.options.min,
                                max = this.options.max,
                                from = this.options.from,
                                to = this.options.to;

                            if (from > min && to === max) {
                                this.$cache.s_from.addClass("type_last");
                            } else if (to < max) {
                                this.$cache.s_to.addClass("type_last");
                            }
                        },

                        /**
                         * Determine which handles was clicked last
                         * and which handler should have hover effect
                         *
                         * @param target {String}
                         */
                        changeLevel: function changeLevel(target) {
                            switch (target) {
                                case "single":
                                    this.coords.p_gap = this.toFixed(
                                        this.coords.p_pointer -
                                            this.coords.p_single_fake
                                    );
                                    this.$cache.s_single.addClass(
                                        "state_hover"
                                    );
                                    break;

                                case "from":
                                    this.coords.p_gap = this.toFixed(
                                        this.coords.p_pointer -
                                            this.coords.p_from_fake
                                    );
                                    this.$cache.s_from.addClass("state_hover");
                                    this.$cache.s_from.addClass("type_last");
                                    this.$cache.s_to.removeClass("type_last");
                                    break;

                                case "to":
                                    this.coords.p_gap = this.toFixed(
                                        this.coords.p_pointer -
                                            this.coords.p_to_fake
                                    );
                                    this.$cache.s_to.addClass("state_hover");
                                    this.$cache.s_to.addClass("type_last");
                                    this.$cache.s_from.removeClass("type_last");
                                    break;

                                case "both":
                                    this.coords.p_gap_left = this.toFixed(
                                        this.coords.p_pointer -
                                            this.coords.p_from_fake
                                    );
                                    this.coords.p_gap_right = this.toFixed(
                                        this.coords.p_to_fake -
                                            this.coords.p_pointer
                                    );
                                    this.$cache.s_to.removeClass("type_last");
                                    this.$cache.s_from.removeClass("type_last");
                                    break;
                            }
                        },

                        /**
                         * Then slider is disabled
                         * appends extra layer with opacity
                         */
                        appendDisableMask: function appendDisableMask() {
                            this.$cache.cont.append(disable_html);
                            this.$cache.cont.addClass("irs-disabled");
                        },

                        /**
                         * Then slider is not disabled
                         * remove disable mask
                         */
                        removeDisableMask: function removeDisableMask() {
                            this.$cache.cont.remove(".irs-disable-mask");
                            this.$cache.cont.removeClass("irs-disabled");
                        },

                        /**
                         * Remove slider instance
                         * and unbind all events
                         */
                        remove: function remove() {
                            this.$cache.cont.remove();
                            this.$cache.cont = null;
                            this.$cache.line.off(
                                "keydown.irs_" + this.plugin_count
                            );
                            this.$cache.body.off(
                                "touchmove.irs_" + this.plugin_count
                            );
                            this.$cache.body.off(
                                "mousemove.irs_" + this.plugin_count
                            );
                            this.$cache.win.off(
                                "touchend.irs_" + this.plugin_count
                            );
                            this.$cache.win.off(
                                "mouseup.irs_" + this.plugin_count
                            );

                            if (is_old_ie) {
                                this.$cache.body.off(
                                    "mouseup.irs_" + this.plugin_count
                                );
                                this.$cache.body.off(
                                    "mouseleave.irs_" + this.plugin_count
                                );
                            }

                            this.$cache.grid_labels = [];
                            this.coords.big = [];
                            this.coords.big_w = [];
                            this.coords.big_p = [];
                            this.coords.big_x = [];
                            cancelAnimationFrame(this.raf_id);
                        },

                        /**
                         * bind all slider events
                         */
                        bindEvents: function bindEvents() {
                            if (this.no_diapason) {
                                return;
                            }

                            this.$cache.body.on(
                                "touchmove.irs_" + this.plugin_count,
                                this.pointerMove.bind(this)
                            );
                            this.$cache.body.on(
                                "mousemove.irs_" + this.plugin_count,
                                this.pointerMove.bind(this)
                            );
                            this.$cache.win.on(
                                "touchend.irs_" + this.plugin_count,
                                this.pointerUp.bind(this)
                            );
                            this.$cache.win.on(
                                "mouseup.irs_" + this.plugin_count,
                                this.pointerUp.bind(this)
                            );
                            this.$cache.line.on(
                                "touchstart.irs_" + this.plugin_count,
                                this.pointerClick.bind(this, "click")
                            );
                            this.$cache.line.on(
                                "mousedown.irs_" + this.plugin_count,
                                this.pointerClick.bind(this, "click")
                            );
                            this.$cache.line.on(
                                "focus.irs_" + this.plugin_count,
                                this.pointerFocus.bind(this)
                            );

                            if (
                                this.options.drag_interval &&
                                this.options.type === "double"
                            ) {
                                this.$cache.bar.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "both")
                                );
                                this.$cache.bar.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "both")
                                );
                            } else {
                                this.$cache.bar.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                                this.$cache.bar.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                            }

                            if (this.options.type === "single") {
                                this.$cache.single.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "single")
                                );
                                this.$cache.s_single.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "single")
                                );
                                this.$cache.shad_single.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                                this.$cache.single.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "single")
                                );
                                this.$cache.s_single.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "single")
                                );
                                this.$cache.edge.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                                this.$cache.shad_single.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                            } else {
                                this.$cache.single.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, null)
                                );
                                this.$cache.single.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, null)
                                );
                                this.$cache.from.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "from")
                                );
                                this.$cache.s_from.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "from")
                                );
                                this.$cache.to.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "to")
                                );
                                this.$cache.s_to.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "to")
                                );
                                this.$cache.shad_from.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                                this.$cache.shad_to.on(
                                    "touchstart.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                                this.$cache.from.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "from")
                                );
                                this.$cache.s_from.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "from")
                                );
                                this.$cache.to.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "to")
                                );
                                this.$cache.s_to.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerDown.bind(this, "to")
                                );
                                this.$cache.shad_from.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                                this.$cache.shad_to.on(
                                    "mousedown.irs_" + this.plugin_count,
                                    this.pointerClick.bind(this, "click")
                                );
                            }

                            if (this.options.keyboard) {
                                this.$cache.line.on(
                                    "keydown.irs_" + this.plugin_count,
                                    this.key.bind(this, "keyboard")
                                );
                            }

                            if (is_old_ie) {
                                this.$cache.body.on(
                                    "mouseup.irs_" + this.plugin_count,
                                    this.pointerUp.bind(this)
                                );
                                this.$cache.body.on(
                                    "mouseleave.irs_" + this.plugin_count,
                                    this.pointerUp.bind(this)
                                );
                            }
                        },

                        /**
                         * Focus with tabIndex
                         *
                         * @param e {Object} event object
                         */
                        pointerFocus: function pointerFocus(e) {
                            if (!this.target) {
                                var x;
                                var $handle;

                                if (this.options.type === "single") {
                                    $handle = this.$cache.single;
                                } else {
                                    $handle = this.$cache.from;
                                }

                                x = $handle.offset().left;
                                x += $handle.width() / 2 - 1;
                                this.pointerClick("single", {
                                    preventDefault:
                                        function preventDefault() {},
                                    pageX: x,
                                });
                            }
                        },

                        /**
                         * Mousemove or touchmove
                         * only for handlers
                         *
                         * @param e {Object} event object
                         */
                        pointerMove: function pointerMove(e) {
                            if (!this.dragging) {
                                return;
                            }

                            var x =
                                e.pageX ||
                                (e.originalEvent.touches &&
                                    e.originalEvent.touches[0].pageX);
                            this.coords.x_pointer = x - this.coords.x_gap;
                            this.calc();
                        },

                        /**
                         * Mouseup or touchend
                         * only for handlers
                         *
                         * @param e {Object} event object
                         */
                        pointerUp: function pointerUp(e) {
                            if (this.current_plugin !== this.plugin_count) {
                                return;
                            }

                            if (this.is_active) {
                                this.is_active = false;
                            } else {
                                return;
                            }

                            this.$cache.cont
                                .find(".state_hover")
                                .removeClass("state_hover");
                            this.force_redraw = true;

                            if (is_old_ie) {
                                $("*").prop("unselectable", false);
                            }

                            this.updateScene();
                            this.restoreOriginalMinInterval(); // callbacks call

                            if (
                                $.contains(this.$cache.cont[0], e.target) ||
                                this.dragging
                            ) {
                                this.callOnFinish();
                            }

                            this.dragging = false;
                        },

                        /**
                         * Mousedown or touchstart
                         * only for handlers
                         *
                         * @param target {String|null}
                         * @param e {Object} event object
                         */
                        pointerDown: function pointerDown(target, e) {
                            e.preventDefault();
                            var x =
                                e.pageX ||
                                (e.originalEvent.touches &&
                                    e.originalEvent.touches[0].pageX);

                            if (e.button === 2) {
                                return;
                            }

                            if (target === "both") {
                                this.setTempMinInterval();
                            }

                            if (!target) {
                                target = this.target || "from";
                            }

                            this.current_plugin = this.plugin_count;
                            this.target = target;
                            this.is_active = true;
                            this.dragging = true;
                            this.coords.x_gap = this.$cache.rs.offset().left;
                            this.coords.x_pointer = x - this.coords.x_gap;
                            this.calcPointerPercent();
                            this.changeLevel(target);

                            if (is_old_ie) {
                                $("*").prop("unselectable", true);
                            }

                            this.$cache.line.trigger("focus");
                            this.updateScene();
                        },

                        /**
                         * Mousedown or touchstart
                         * for other slider elements, like diapason line
                         *
                         * @param target {String}
                         * @param e {Object} event object
                         */
                        pointerClick: function pointerClick(target, e) {
                            e.preventDefault();
                            var x =
                                e.pageX ||
                                (e.originalEvent.touches &&
                                    e.originalEvent.touches[0].pageX);

                            if (e.button === 2) {
                                return;
                            }

                            this.current_plugin = this.plugin_count;
                            this.target = target;
                            this.is_click = true;
                            this.coords.x_gap = this.$cache.rs.offset().left;
                            this.coords.x_pointer = +(
                                x - this.coords.x_gap
                            ).toFixed();
                            this.force_redraw = true;
                            this.calc();
                            this.$cache.line.trigger("focus");
                        },

                        /**
                         * Keyborard controls for focused slider
                         *
                         * @param target {String}
                         * @param e {Object} event object
                         * @returns {boolean|undefined}
                         */
                        key: function key(target, e) {
                            if (
                                this.current_plugin !== this.plugin_count ||
                                e.altKey ||
                                e.ctrlKey ||
                                e.shiftKey ||
                                e.metaKey
                            ) {
                                return;
                            }

                            switch (e.which) {
                                case 83: // W

                                case 65: // A

                                case 40: // DOWN

                                case 37:
                                    // LEFT
                                    e.preventDefault();
                                    this.moveByKey(false);
                                    break;

                                case 87: // S

                                case 68: // D

                                case 38: // UP

                                case 39:
                                    // RIGHT
                                    e.preventDefault();
                                    this.moveByKey(true);
                                    break;
                            }

                            return true;
                        },

                        /**
                         * Move by key
                         *
                         * @param right {boolean} direction to move
                         */
                        moveByKey: function moveByKey(right) {
                            var p = this.coords.p_pointer;
                            var p_step =
                                (this.options.max - this.options.min) / 100;
                            p_step = this.options.step / p_step;

                            if (right) {
                                p += p_step;
                            } else {
                                p -= p_step;
                            }

                            this.coords.x_pointer = this.toFixed(
                                (this.coords.w_rs / 100) * p
                            );
                            this.is_key = true;
                            this.calc();
                        },

                        /**
                         * Set visibility and content
                         * of Min and Max labels
                         */
                        setMinMax: function setMinMax() {
                            if (!this.options) {
                                return;
                            }

                            if (this.options.hide_min_max) {
                                this.$cache.min[0].style.display = "none";
                                this.$cache.max[0].style.display = "none";
                                return;
                            }

                            if (this.options.values.length) {
                                this.$cache.min.html(
                                    this.decorate(
                                        this.options.p_values[this.options.min]
                                    )
                                );
                                this.$cache.max.html(
                                    this.decorate(
                                        this.options.p_values[this.options.max]
                                    )
                                );
                            } else {
                                var min_pretty = this._prettify(
                                    this.options.min
                                );

                                var max_pretty = this._prettify(
                                    this.options.max
                                );

                                this.result.min_pretty = min_pretty;
                                this.result.max_pretty = max_pretty;
                                this.$cache.min.html(
                                    this.decorate(min_pretty, this.options.min)
                                );
                                this.$cache.max.html(
                                    this.decorate(max_pretty, this.options.max)
                                );
                            }

                            this.labels.w_min =
                                this.$cache.min.outerWidth(false);
                            this.labels.w_max =
                                this.$cache.max.outerWidth(false);
                        },

                        /**
                         * Then dragging interval, prevent interval collapsing
                         * using min_interval option
                         */
                        setTempMinInterval: function setTempMinInterval() {
                            var interval = this.result.to - this.result.from;

                            if (this.old_min_interval === null) {
                                this.old_min_interval =
                                    this.options.min_interval;
                            }

                            this.options.min_interval = interval;
                        },

                        /**
                         * Restore min_interval option to original
                         */
                        restoreOriginalMinInterval:
                            function restoreOriginalMinInterval() {
                                if (this.old_min_interval !== null) {
                                    this.options.min_interval =
                                        this.old_min_interval;
                                    this.old_min_interval = null;
                                }
                            },
                        // =============================================================================================================
                        // Calculations

                        /**
                         * All calculations and measures start here
                         *
                         * @param update {boolean=}
                         */
                        calc: function calc(update) {
                            if (!this.options) {
                                return;
                            }

                            this.calc_count++;

                            if (this.calc_count === 10 || update) {
                                this.calc_count = 0;
                                this.coords.w_rs =
                                    this.$cache.rs.outerWidth(false);
                                this.calcHandlePercent();
                            }

                            if (!this.coords.w_rs) {
                                return;
                            }

                            this.calcPointerPercent();
                            var handle_x = this.getHandleX();

                            if (this.target === "both") {
                                this.coords.p_gap = 0;
                                handle_x = this.getHandleX();
                            }

                            if (this.target === "click") {
                                this.coords.p_gap = this.coords.p_handle / 2;
                                handle_x = this.getHandleX();

                                if (this.options.drag_interval) {
                                    this.target = "both_one";
                                } else {
                                    this.target = this.chooseHandle(handle_x);
                                }
                            }

                            switch (this.target) {
                                case "base":
                                    var w =
                                            (this.options.max -
                                                this.options.min) /
                                            100,
                                        f =
                                            (this.result.from -
                                                this.options.min) /
                                            w,
                                        t =
                                            (this.result.to -
                                                this.options.min) /
                                            w;
                                    this.coords.p_single_real = this.toFixed(f);
                                    this.coords.p_from_real = this.toFixed(f);
                                    this.coords.p_to_real = this.toFixed(t);
                                    this.coords.p_single_real =
                                        this.checkDiapason(
                                            this.coords.p_single_real,
                                            this.options.from_min,
                                            this.options.from_max
                                        );
                                    this.coords.p_from_real =
                                        this.checkDiapason(
                                            this.coords.p_from_real,
                                            this.options.from_min,
                                            this.options.from_max
                                        );
                                    this.coords.p_to_real = this.checkDiapason(
                                        this.coords.p_to_real,
                                        this.options.to_min,
                                        this.options.to_max
                                    );
                                    this.coords.p_single_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_single_real
                                        );
                                    this.coords.p_from_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_from_real
                                        );
                                    this.coords.p_to_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_to_real
                                        );
                                    this.target = null;
                                    break;

                                case "single":
                                    if (this.options.from_fixed) {
                                        break;
                                    }

                                    this.coords.p_single_real =
                                        this.convertToRealPercent(handle_x);
                                    this.coords.p_single_real =
                                        this.calcWithStep(
                                            this.coords.p_single_real
                                        );
                                    this.coords.p_single_real =
                                        this.checkDiapason(
                                            this.coords.p_single_real,
                                            this.options.from_min,
                                            this.options.from_max
                                        );
                                    this.coords.p_single_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_single_real
                                        );
                                    break;

                                case "from":
                                    if (this.options.from_fixed) {
                                        break;
                                    }

                                    this.coords.p_from_real =
                                        this.convertToRealPercent(handle_x);
                                    this.coords.p_from_real = this.calcWithStep(
                                        this.coords.p_from_real
                                    );

                                    if (
                                        this.coords.p_from_real >
                                        this.coords.p_to_real
                                    ) {
                                        this.coords.p_from_real =
                                            this.coords.p_to_real;
                                    }

                                    this.coords.p_from_real =
                                        this.checkDiapason(
                                            this.coords.p_from_real,
                                            this.options.from_min,
                                            this.options.from_max
                                        );
                                    this.coords.p_from_real =
                                        this.checkMinInterval(
                                            this.coords.p_from_real,
                                            this.coords.p_to_real,
                                            "from"
                                        );
                                    this.coords.p_from_real =
                                        this.checkMaxInterval(
                                            this.coords.p_from_real,
                                            this.coords.p_to_real,
                                            "from"
                                        );
                                    this.coords.p_from_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_from_real
                                        );
                                    break;

                                case "to":
                                    if (this.options.to_fixed) {
                                        break;
                                    }

                                    this.coords.p_to_real =
                                        this.convertToRealPercent(handle_x);
                                    this.coords.p_to_real = this.calcWithStep(
                                        this.coords.p_to_real
                                    );

                                    if (
                                        this.coords.p_to_real <
                                        this.coords.p_from_real
                                    ) {
                                        this.coords.p_to_real =
                                            this.coords.p_from_real;
                                    }

                                    this.coords.p_to_real = this.checkDiapason(
                                        this.coords.p_to_real,
                                        this.options.to_min,
                                        this.options.to_max
                                    );
                                    this.coords.p_to_real =
                                        this.checkMinInterval(
                                            this.coords.p_to_real,
                                            this.coords.p_from_real,
                                            "to"
                                        );
                                    this.coords.p_to_real =
                                        this.checkMaxInterval(
                                            this.coords.p_to_real,
                                            this.coords.p_from_real,
                                            "to"
                                        );
                                    this.coords.p_to_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_to_real
                                        );
                                    break;

                                case "both":
                                    if (
                                        this.options.from_fixed ||
                                        this.options.to_fixed
                                    ) {
                                        break;
                                    }

                                    handle_x = this.toFixed(
                                        handle_x + this.coords.p_handle * 0.001
                                    );
                                    this.coords.p_from_real =
                                        this.convertToRealPercent(handle_x) -
                                        this.coords.p_gap_left;
                                    this.coords.p_from_real = this.calcWithStep(
                                        this.coords.p_from_real
                                    );
                                    this.coords.p_from_real =
                                        this.checkDiapason(
                                            this.coords.p_from_real,
                                            this.options.from_min,
                                            this.options.from_max
                                        );
                                    this.coords.p_from_real =
                                        this.checkMinInterval(
                                            this.coords.p_from_real,
                                            this.coords.p_to_real,
                                            "from"
                                        );
                                    this.coords.p_from_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_from_real
                                        );
                                    this.coords.p_to_real =
                                        this.convertToRealPercent(handle_x) +
                                        this.coords.p_gap_right;
                                    this.coords.p_to_real = this.calcWithStep(
                                        this.coords.p_to_real
                                    );
                                    this.coords.p_to_real = this.checkDiapason(
                                        this.coords.p_to_real,
                                        this.options.to_min,
                                        this.options.to_max
                                    );
                                    this.coords.p_to_real =
                                        this.checkMinInterval(
                                            this.coords.p_to_real,
                                            this.coords.p_from_real,
                                            "to"
                                        );
                                    this.coords.p_to_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_to_real
                                        );
                                    break;

                                case "both_one":
                                    if (
                                        this.options.from_fixed ||
                                        this.options.to_fixed
                                    ) {
                                        break;
                                    }

                                    var real_x =
                                            this.convertToRealPercent(handle_x),
                                        from = this.result.from_percent,
                                        to = this.result.to_percent,
                                        full = to - from,
                                        half = full / 2,
                                        new_from = real_x - half,
                                        new_to = real_x + half;

                                    if (new_from < 0) {
                                        new_from = 0;
                                        new_to = new_from + full;
                                    }

                                    if (new_to > 100) {
                                        new_to = 100;
                                        new_from = new_to - full;
                                    }

                                    this.coords.p_from_real =
                                        this.calcWithStep(new_from);
                                    this.coords.p_from_real =
                                        this.checkDiapason(
                                            this.coords.p_from_real,
                                            this.options.from_min,
                                            this.options.from_max
                                        );
                                    this.coords.p_from_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_from_real
                                        );
                                    this.coords.p_to_real =
                                        this.calcWithStep(new_to);
                                    this.coords.p_to_real = this.checkDiapason(
                                        this.coords.p_to_real,
                                        this.options.to_min,
                                        this.options.to_max
                                    );
                                    this.coords.p_to_fake =
                                        this.convertToFakePercent(
                                            this.coords.p_to_real
                                        );
                                    break;
                            }

                            if (this.options.type === "single") {
                                this.coords.p_bar_x = this.coords.p_handle / 2;
                                this.coords.p_bar_w = this.coords.p_single_fake;
                                this.result.from_percent =
                                    this.coords.p_single_real;
                                this.result.from = this.convertToValue(
                                    this.coords.p_single_real
                                );
                                this.result.from_pretty = this._prettify(
                                    this.result.from
                                );

                                if (this.options.values.length) {
                                    this.result.from_value =
                                        this.options.values[this.result.from];
                                }
                            } else {
                                this.coords.p_bar_x = this.toFixed(
                                    this.coords.p_from_fake +
                                        this.coords.p_handle / 2
                                );
                                this.coords.p_bar_w = this.toFixed(
                                    this.coords.p_to_fake -
                                        this.coords.p_from_fake
                                );
                                this.result.from_percent =
                                    this.coords.p_from_real;
                                this.result.from = this.convertToValue(
                                    this.coords.p_from_real
                                );
                                this.result.from_pretty = this._prettify(
                                    this.result.from
                                );
                                this.result.to_percent = this.coords.p_to_real;
                                this.result.to = this.convertToValue(
                                    this.coords.p_to_real
                                );
                                this.result.to_pretty = this._prettify(
                                    this.result.to
                                );

                                if (this.options.values.length) {
                                    this.result.from_value =
                                        this.options.values[this.result.from];
                                    this.result.to_value =
                                        this.options.values[this.result.to];
                                }
                            }

                            this.calcMinMax();
                            this.calcLabels();
                        },

                        /**
                         * calculates pointer X in percent
                         */
                        calcPointerPercent: function calcPointerPercent() {
                            if (!this.coords.w_rs) {
                                this.coords.p_pointer = 0;
                                return;
                            }

                            if (
                                this.coords.x_pointer < 0 ||
                                isNaN(this.coords.x_pointer)
                            ) {
                                this.coords.x_pointer = 0;
                            } else if (
                                this.coords.x_pointer > this.coords.w_rs
                            ) {
                                this.coords.x_pointer = this.coords.w_rs;
                            }

                            this.coords.p_pointer = this.toFixed(
                                (this.coords.x_pointer / this.coords.w_rs) * 100
                            );
                        },
                        convertToRealPercent: function convertToRealPercent(
                            fake
                        ) {
                            var full = 100 - this.coords.p_handle;
                            return (fake / full) * 100;
                        },
                        convertToFakePercent: function convertToFakePercent(
                            real
                        ) {
                            var full = 100 - this.coords.p_handle;
                            return (real / 100) * full;
                        },
                        getHandleX: function getHandleX() {
                            var max = 100 - this.coords.p_handle,
                                x = this.toFixed(
                                    this.coords.p_pointer - this.coords.p_gap
                                );

                            if (x < 0) {
                                x = 0;
                            } else if (x > max) {
                                x = max;
                            }

                            return x;
                        },
                        calcHandlePercent: function calcHandlePercent() {
                            if (this.options.type === "single") {
                                this.coords.w_handle =
                                    this.$cache.s_single.outerWidth(false);
                            } else {
                                this.coords.w_handle =
                                    this.$cache.s_from.outerWidth(false);
                            }

                            this.coords.p_handle = this.toFixed(
                                (this.coords.w_handle / this.coords.w_rs) * 100
                            );
                        },

                        /**
                         * Find closest handle to pointer click
                         *
                         * @param real_x {Number}
                         * @returns {String}
                         */
                        chooseHandle: function chooseHandle(real_x) {
                            if (this.options.type === "single") {
                                return "single";
                            } else {
                                var m_point =
                                    this.coords.p_from_real +
                                    (this.coords.p_to_real -
                                        this.coords.p_from_real) /
                                        2;

                                if (real_x >= m_point) {
                                    return this.options.to_fixed
                                        ? "from"
                                        : "to";
                                } else {
                                    return this.options.from_fixed
                                        ? "to"
                                        : "from";
                                }
                            }
                        },

                        /**
                         * Measure Min and Max labels width in percent
                         */
                        calcMinMax: function calcMinMax() {
                            if (!this.coords.w_rs) {
                                return;
                            }

                            this.labels.p_min =
                                (this.labels.w_min / this.coords.w_rs) * 100;
                            this.labels.p_max =
                                (this.labels.w_max / this.coords.w_rs) * 100;
                        },

                        /**
                         * Measure labels width and X in percent
                         */
                        calcLabels: function calcLabels() {
                            if (
                                !this.coords.w_rs ||
                                this.options.hide_from_to
                            ) {
                                return;
                            }

                            if (this.options.type === "single") {
                                this.labels.w_single =
                                    this.$cache.single.outerWidth(false);
                                this.labels.p_single_fake =
                                    (this.labels.w_single / this.coords.w_rs) *
                                    100;
                                this.labels.p_single_left =
                                    this.coords.p_single_fake +
                                    this.coords.p_handle / 2 -
                                    this.labels.p_single_fake / 2;
                                this.labels.p_single_left = this.checkEdges(
                                    this.labels.p_single_left,
                                    this.labels.p_single_fake
                                );
                            } else {
                                this.labels.w_from =
                                    this.$cache.from.outerWidth(false);
                                this.labels.p_from_fake =
                                    (this.labels.w_from / this.coords.w_rs) *
                                    100;
                                this.labels.p_from_left =
                                    this.coords.p_from_fake +
                                    this.coords.p_handle / 2 -
                                    this.labels.p_from_fake / 2;
                                this.labels.p_from_left = this.toFixed(
                                    this.labels.p_from_left
                                );
                                this.labels.p_from_left = this.checkEdges(
                                    this.labels.p_from_left,
                                    this.labels.p_from_fake
                                );
                                this.labels.w_to =
                                    this.$cache.to.outerWidth(false);
                                this.labels.p_to_fake =
                                    (this.labels.w_to / this.coords.w_rs) * 100;
                                this.labels.p_to_left =
                                    this.coords.p_to_fake +
                                    this.coords.p_handle / 2 -
                                    this.labels.p_to_fake / 2;
                                this.labels.p_to_left = this.toFixed(
                                    this.labels.p_to_left
                                );
                                this.labels.p_to_left = this.checkEdges(
                                    this.labels.p_to_left,
                                    this.labels.p_to_fake
                                );
                                this.labels.w_single =
                                    this.$cache.single.outerWidth(false);
                                this.labels.p_single_fake =
                                    (this.labels.w_single / this.coords.w_rs) *
                                    100;
                                this.labels.p_single_left =
                                    (this.labels.p_from_left +
                                        this.labels.p_to_left +
                                        this.labels.p_to_fake) /
                                        2 -
                                    this.labels.p_single_fake / 2;
                                this.labels.p_single_left = this.toFixed(
                                    this.labels.p_single_left
                                );
                                this.labels.p_single_left = this.checkEdges(
                                    this.labels.p_single_left,
                                    this.labels.p_single_fake
                                );
                            }
                        },
                        // =============================================================================================================
                        // Drawings

                        /**
                         * Main function called in request animation frame
                         * to update everything
                         */
                        updateScene: function updateScene() {
                            if (this.raf_id) {
                                cancelAnimationFrame(this.raf_id);
                                this.raf_id = null;
                            }

                            clearTimeout(this.update_tm);
                            this.update_tm = null;

                            if (!this.options) {
                                return;
                            }

                            this.drawHandles();

                            if (this.is_active) {
                                this.raf_id = requestAnimationFrame(
                                    this.updateScene.bind(this)
                                );
                            } else {
                                this.update_tm = setTimeout(
                                    this.updateScene.bind(this),
                                    300
                                );
                            }
                        },

                        /**
                         * Draw handles
                         */
                        drawHandles: function drawHandles() {
                            this.coords.w_rs = this.$cache.rs.outerWidth(false);

                            if (!this.coords.w_rs) {
                                return;
                            }

                            if (this.coords.w_rs !== this.coords.w_rs_old) {
                                this.target = "base";
                                this.is_resize = true;
                            }

                            if (
                                this.coords.w_rs !== this.coords.w_rs_old ||
                                this.force_redraw
                            ) {
                                this.setMinMax();
                                this.calc(true);
                                this.drawLabels();

                                if (this.options.grid) {
                                    this.calcGridMargin();
                                    this.calcGridLabels();
                                }

                                this.force_redraw = true;
                                this.coords.w_rs_old = this.coords.w_rs;
                                this.drawShadow();
                            }

                            if (!this.coords.w_rs) {
                                return;
                            }

                            if (
                                !this.dragging &&
                                !this.force_redraw &&
                                !this.is_key
                            ) {
                                return;
                            }

                            if (
                                this.old_from !== this.result.from ||
                                this.old_to !== this.result.to ||
                                this.force_redraw ||
                                this.is_key
                            ) {
                                this.drawLabels();
                                this.$cache.bar[0].style.left =
                                    this.coords.p_bar_x + "%";
                                this.$cache.bar[0].style.width =
                                    this.coords.p_bar_w + "%";

                                if (this.options.type === "single") {
                                    this.$cache.s_single[0].style.left =
                                        this.coords.p_single_fake + "%";
                                    this.$cache.single[0].style.left =
                                        this.labels.p_single_left + "%";
                                } else {
                                    this.$cache.s_from[0].style.left =
                                        this.coords.p_from_fake + "%";
                                    this.$cache.s_to[0].style.left =
                                        this.coords.p_to_fake + "%";

                                    if (
                                        this.old_from !== this.result.from ||
                                        this.force_redraw
                                    ) {
                                        this.$cache.from[0].style.left =
                                            this.labels.p_from_left + "%";
                                    }

                                    if (
                                        this.old_to !== this.result.to ||
                                        this.force_redraw
                                    ) {
                                        this.$cache.to[0].style.left =
                                            this.labels.p_to_left + "%";
                                    }

                                    this.$cache.single[0].style.left =
                                        this.labels.p_single_left + "%";
                                }

                                this.writeToInput();

                                if (
                                    (this.old_from !== this.result.from ||
                                        this.old_to !== this.result.to) &&
                                    !this.is_start
                                ) {
                                    this.$cache.input.trigger("change");
                                    this.$cache.input.trigger("input");
                                }

                                this.old_from = this.result.from;
                                this.old_to = this.result.to; // callbacks call

                                if (
                                    !this.is_resize &&
                                    !this.is_update &&
                                    !this.is_start &&
                                    !this.is_finish
                                ) {
                                    this.callOnChange();
                                }

                                if (this.is_key || this.is_click) {
                                    this.is_key = false;
                                    this.is_click = false;
                                    this.callOnFinish();
                                }

                                this.is_update = false;
                                this.is_resize = false;
                                this.is_finish = false;
                            }

                            this.is_start = false;
                            this.is_key = false;
                            this.is_click = false;
                            this.force_redraw = false;
                        },

                        /**
                         * Draw labels
                         * measure labels collisions
                         * collapse close labels
                         */
                        drawLabels: function drawLabels() {
                            if (!this.options) {
                                return;
                            }

                            var values_num = this.options.values.length;
                            var p_values = this.options.p_values;
                            var text_single;
                            var text_from;
                            var text_to;
                            var from_pretty;
                            var to_pretty;

                            if (this.options.hide_from_to) {
                                return;
                            }

                            if (this.options.type === "single") {
                                if (values_num) {
                                    text_single = this.decorate(
                                        p_values[this.result.from]
                                    );
                                    this.$cache.single.html(text_single);
                                } else {
                                    from_pretty = this._prettify(
                                        this.result.from
                                    );
                                    text_single = this.decorate(
                                        from_pretty,
                                        this.result.from
                                    );
                                    this.$cache.single.html(text_single);
                                }

                                this.calcLabels();

                                if (
                                    this.labels.p_single_left <
                                    this.labels.p_min + 1
                                ) {
                                    this.$cache.min[0].style.visibility =
                                        "hidden";
                                } else {
                                    this.$cache.min[0].style.visibility =
                                        "visible";
                                }

                                if (
                                    this.labels.p_single_left +
                                        this.labels.p_single_fake >
                                    100 - this.labels.p_max - 1
                                ) {
                                    this.$cache.max[0].style.visibility =
                                        "hidden";
                                } else {
                                    this.$cache.max[0].style.visibility =
                                        "visible";
                                }
                            } else {
                                if (values_num) {
                                    if (this.options.decorate_both) {
                                        text_single = this.decorate(
                                            p_values[this.result.from]
                                        );
                                        text_single +=
                                            this.options.values_separator;
                                        text_single += this.decorate(
                                            p_values[this.result.to]
                                        );
                                    } else {
                                        text_single = this.decorate(
                                            p_values[this.result.from] +
                                                this.options.values_separator +
                                                p_values[this.result.to]
                                        );
                                    }

                                    text_from = this.decorate(
                                        p_values[this.result.from]
                                    );
                                    text_to = this.decorate(
                                        p_values[this.result.to]
                                    );
                                    this.$cache.single.html(text_single);
                                    this.$cache.from.html(text_from);
                                    this.$cache.to.html(text_to);
                                } else {
                                    from_pretty = this._prettify(
                                        this.result.from
                                    );
                                    to_pretty = this._prettify(this.result.to);

                                    if (this.options.decorate_both) {
                                        text_single = this.decorate(
                                            from_pretty,
                                            this.result.from
                                        );
                                        text_single +=
                                            this.options.values_separator;
                                        text_single += this.decorate(
                                            to_pretty,
                                            this.result.to
                                        );
                                    } else {
                                        text_single = this.decorate(
                                            from_pretty +
                                                this.options.values_separator +
                                                to_pretty,
                                            this.result.to
                                        );
                                    }

                                    text_from = this.decorate(
                                        from_pretty,
                                        this.result.from
                                    );
                                    text_to = this.decorate(
                                        to_pretty,
                                        this.result.to
                                    );
                                    this.$cache.single.html(text_single);
                                    this.$cache.from.html(text_from);
                                    this.$cache.to.html(text_to);
                                }

                                this.calcLabels();
                                var min = Math.min(
                                        this.labels.p_single_left,
                                        this.labels.p_from_left
                                    ),
                                    single_left =
                                        this.labels.p_single_left +
                                        this.labels.p_single_fake,
                                    to_left =
                                        this.labels.p_to_left +
                                        this.labels.p_to_fake,
                                    max = Math.max(single_left, to_left);

                                if (
                                    this.labels.p_from_left +
                                        this.labels.p_from_fake >=
                                    this.labels.p_to_left
                                ) {
                                    this.$cache.from[0].style.visibility =
                                        "hidden";
                                    this.$cache.to[0].style.visibility =
                                        "hidden";
                                    this.$cache.single[0].style.visibility =
                                        "visible";

                                    if (this.result.from === this.result.to) {
                                        if (this.target === "from") {
                                            this.$cache.from[0].style.visibility =
                                                "visible";
                                        } else if (this.target === "to") {
                                            this.$cache.to[0].style.visibility =
                                                "visible";
                                        } else if (!this.target) {
                                            this.$cache.from[0].style.visibility =
                                                "visible";
                                        }

                                        this.$cache.single[0].style.visibility =
                                            "hidden";
                                        max = to_left;
                                    } else {
                                        this.$cache.from[0].style.visibility =
                                            "hidden";
                                        this.$cache.to[0].style.visibility =
                                            "hidden";
                                        this.$cache.single[0].style.visibility =
                                            "visible";
                                        max = Math.max(single_left, to_left);
                                    }
                                } else {
                                    this.$cache.from[0].style.visibility =
                                        "visible";
                                    this.$cache.to[0].style.visibility =
                                        "visible";
                                    this.$cache.single[0].style.visibility =
                                        "hidden";
                                }

                                if (min < this.labels.p_min + 1) {
                                    this.$cache.min[0].style.visibility =
                                        "hidden";
                                } else {
                                    this.$cache.min[0].style.visibility =
                                        "visible";
                                }

                                if (max > 100 - this.labels.p_max - 1) {
                                    this.$cache.max[0].style.visibility =
                                        "hidden";
                                } else {
                                    this.$cache.max[0].style.visibility =
                                        "visible";
                                }
                            }
                        },

                        /**
                         * Draw shadow intervals
                         */
                        drawShadow: function drawShadow() {
                            var o = this.options,
                                c = this.$cache,
                                is_from_min =
                                    typeof o.from_min === "number" &&
                                    !isNaN(o.from_min),
                                is_from_max =
                                    typeof o.from_max === "number" &&
                                    !isNaN(o.from_max),
                                is_to_min =
                                    typeof o.to_min === "number" &&
                                    !isNaN(o.to_min),
                                is_to_max =
                                    typeof o.to_max === "number" &&
                                    !isNaN(o.to_max),
                                from_min,
                                from_max,
                                to_min,
                                to_max;

                            if (o.type === "single") {
                                if (
                                    o.from_shadow &&
                                    (is_from_min || is_from_max)
                                ) {
                                    from_min = this.convertToPercent(
                                        is_from_min ? o.from_min : o.min
                                    );
                                    from_max =
                                        this.convertToPercent(
                                            is_from_max ? o.from_max : o.max
                                        ) - from_min;
                                    from_min = this.toFixed(
                                        from_min -
                                            (this.coords.p_handle / 100) *
                                                from_min
                                    );
                                    from_max = this.toFixed(
                                        from_max -
                                            (this.coords.p_handle / 100) *
                                                from_max
                                    );
                                    from_min =
                                        from_min + this.coords.p_handle / 2;
                                    c.shad_single[0].style.display = "block";
                                    c.shad_single[0].style.left =
                                        from_min + "%";
                                    c.shad_single[0].style.width =
                                        from_max + "%";
                                } else {
                                    c.shad_single[0].style.display = "none";
                                }
                            } else {
                                if (
                                    o.from_shadow &&
                                    (is_from_min || is_from_max)
                                ) {
                                    from_min = this.convertToPercent(
                                        is_from_min ? o.from_min : o.min
                                    );
                                    from_max =
                                        this.convertToPercent(
                                            is_from_max ? o.from_max : o.max
                                        ) - from_min;
                                    from_min = this.toFixed(
                                        from_min -
                                            (this.coords.p_handle / 100) *
                                                from_min
                                    );
                                    from_max = this.toFixed(
                                        from_max -
                                            (this.coords.p_handle / 100) *
                                                from_max
                                    );
                                    from_min =
                                        from_min + this.coords.p_handle / 2;
                                    c.shad_from[0].style.display = "block";
                                    c.shad_from[0].style.left = from_min + "%";
                                    c.shad_from[0].style.width = from_max + "%";
                                } else {
                                    c.shad_from[0].style.display = "none";
                                }

                                if (o.to_shadow && (is_to_min || is_to_max)) {
                                    to_min = this.convertToPercent(
                                        is_to_min ? o.to_min : o.min
                                    );
                                    to_max =
                                        this.convertToPercent(
                                            is_to_max ? o.to_max : o.max
                                        ) - to_min;
                                    to_min = this.toFixed(
                                        to_min -
                                            (this.coords.p_handle / 100) *
                                                to_min
                                    );
                                    to_max = this.toFixed(
                                        to_max -
                                            (this.coords.p_handle / 100) *
                                                to_max
                                    );
                                    to_min = to_min + this.coords.p_handle / 2;
                                    c.shad_to[0].style.display = "block";
                                    c.shad_to[0].style.left = to_min + "%";
                                    c.shad_to[0].style.width = to_max + "%";
                                } else {
                                    c.shad_to[0].style.display = "none";
                                }
                            }
                        },

                        /**
                         * Write values to input element
                         */
                        writeToInput: function writeToInput() {
                            if (this.options.type === "single") {
                                if (this.options.values.length) {
                                    this.$cache.input.prop(
                                        "value",
                                        this.result.from_value
                                    );
                                } else {
                                    this.$cache.input.prop(
                                        "value",
                                        this.result.from
                                    );
                                }

                                this.$cache.input.data(
                                    "from",
                                    this.result.from
                                );
                            } else {
                                if (this.options.values.length) {
                                    this.$cache.input.prop(
                                        "value",
                                        this.result.from_value +
                                            this.options
                                                .input_values_separator +
                                            this.result.to_value
                                    );
                                } else {
                                    this.$cache.input.prop(
                                        "value",
                                        this.result.from +
                                            this.options
                                                .input_values_separator +
                                            this.result.to
                                    );
                                }

                                this.$cache.input.data(
                                    "from",
                                    this.result.from
                                );
                                this.$cache.input.data("to", this.result.to);
                            }
                        },
                        // =============================================================================================================
                        // Callbacks
                        callOnStart: function callOnStart() {
                            this.writeToInput();

                            if (
                                this.options.onStart &&
                                typeof this.options.onStart === "function"
                            ) {
                                if (this.options.scope) {
                                    this.options.onStart.call(
                                        this.options.scope,
                                        this.result
                                    );
                                } else {
                                    this.options.onStart(this.result);
                                }
                            }
                        },
                        callOnChange: function callOnChange() {
                            this.writeToInput();

                            if (
                                this.options.onChange &&
                                typeof this.options.onChange === "function"
                            ) {
                                if (this.options.scope) {
                                    this.options.onChange.call(
                                        this.options.scope,
                                        this.result
                                    );
                                } else {
                                    this.options.onChange(this.result);
                                }
                            }
                        },
                        callOnFinish: function callOnFinish() {
                            this.writeToInput();

                            if (
                                this.options.onFinish &&
                                typeof this.options.onFinish === "function"
                            ) {
                                if (this.options.scope) {
                                    this.options.onFinish.call(
                                        this.options.scope,
                                        this.result
                                    );
                                } else {
                                    this.options.onFinish(this.result);
                                }
                            }
                        },
                        callOnUpdate: function callOnUpdate() {
                            this.writeToInput();

                            if (
                                this.options.onUpdate &&
                                typeof this.options.onUpdate === "function"
                            ) {
                                if (this.options.scope) {
                                    this.options.onUpdate.call(
                                        this.options.scope,
                                        this.result
                                    );
                                } else {
                                    this.options.onUpdate(this.result);
                                }
                            }
                        },
                        // =============================================================================================================
                        // Service methods
                        toggleInput: function toggleInput() {
                            this.$cache.input.toggleClass("irs-hidden-input");

                            if (this.has_tab_index) {
                                this.$cache.input.prop("tabindex", -1);
                            } else {
                                this.$cache.input.removeProp("tabindex");
                            }

                            this.has_tab_index = !this.has_tab_index;
                        },

                        /**
                         * Convert real value to percent
                         *
                         * @param value {Number} X in real
                         * @param no_min {boolean=} don't use min value
                         * @returns {Number} X in percent
                         */
                        convertToPercent: function convertToPercent(
                            value,
                            no_min
                        ) {
                            var diapason = this.options.max - this.options.min,
                                one_percent = diapason / 100,
                                val,
                                percent;

                            if (!diapason) {
                                this.no_diapason = true;
                                return 0;
                            }

                            if (no_min) {
                                val = value;
                            } else {
                                val = value - this.options.min;
                            }

                            percent = val / one_percent;
                            return this.toFixed(percent);
                        },

                        /**
                         * Convert percent to real values
                         *
                         * @param percent {Number} X in percent
                         * @returns {Number} X in real
                         */
                        convertToValue: function convertToValue(percent) {
                            var min = this.options.min,
                                max = this.options.max,
                                min_decimals = min.toString().split(".")[1],
                                max_decimals = max.toString().split(".")[1],
                                min_length,
                                max_length,
                                avg_decimals = 0,
                                abs = 0;

                            if (percent === 0) {
                                return this.options.min;
                            }

                            if (percent === 100) {
                                return this.options.max;
                            }

                            if (min_decimals) {
                                min_length = min_decimals.length;
                                avg_decimals = min_length;
                            }

                            if (max_decimals) {
                                max_length = max_decimals.length;
                                avg_decimals = max_length;
                            }

                            if (min_length && max_length) {
                                avg_decimals =
                                    min_length >= max_length
                                        ? min_length
                                        : max_length;
                            }

                            if (min < 0) {
                                abs = Math.abs(min);
                                min = +(min + abs).toFixed(avg_decimals);
                                max = +(max + abs).toFixed(avg_decimals);
                            }

                            var number = ((max - min) / 100) * percent + min,
                                string = this.options.step
                                    .toString()
                                    .split(".")[1],
                                result;

                            if (string) {
                                number = +number.toFixed(string.length);
                            } else {
                                number = number / this.options.step;
                                number = number * this.options.step;
                                number = +number.toFixed(0);
                            }

                            if (abs) {
                                number -= abs;
                            }

                            if (string) {
                                result = +number.toFixed(string.length);
                            } else {
                                result = this.toFixed(number);
                            }

                            if (result < this.options.min) {
                                result = this.options.min;
                            } else if (result > this.options.max) {
                                result = this.options.max;
                            }

                            return result;
                        },

                        /**
                         * Round percent value with step
                         *
                         * @param percent {Number}
                         * @returns percent {Number} rounded
                         */
                        calcWithStep: function calcWithStep(percent) {
                            var rounded =
                                Math.round(percent / this.coords.p_step) *
                                this.coords.p_step;

                            if (rounded > 100) {
                                rounded = 100;
                            }

                            if (percent === 100) {
                                rounded = 100;
                            }

                            return this.toFixed(rounded);
                        },
                        checkMinInterval: function checkMinInterval(
                            p_current,
                            p_next,
                            type
                        ) {
                            var o = this.options,
                                current,
                                next;

                            if (!o.min_interval) {
                                return p_current;
                            }

                            current = this.convertToValue(p_current);
                            next = this.convertToValue(p_next);

                            if (type === "from") {
                                if (next - current < o.min_interval) {
                                    current = next - o.min_interval;
                                }
                            } else {
                                if (current - next < o.min_interval) {
                                    current = next + o.min_interval;
                                }
                            }

                            return this.convertToPercent(current);
                        },
                        checkMaxInterval: function checkMaxInterval(
                            p_current,
                            p_next,
                            type
                        ) {
                            var o = this.options,
                                current,
                                next;

                            if (!o.max_interval) {
                                return p_current;
                            }

                            current = this.convertToValue(p_current);
                            next = this.convertToValue(p_next);

                            if (type === "from") {
                                if (next - current > o.max_interval) {
                                    current = next - o.max_interval;
                                }
                            } else {
                                if (current - next > o.max_interval) {
                                    current = next + o.max_interval;
                                }
                            }

                            return this.convertToPercent(current);
                        },
                        checkDiapason: function checkDiapason(p_num, min, max) {
                            var num = this.convertToValue(p_num),
                                o = this.options;

                            if (typeof min !== "number") {
                                min = o.min;
                            }

                            if (typeof max !== "number") {
                                max = o.max;
                            }

                            if (num < min) {
                                num = min;
                            }

                            if (num > max) {
                                num = max;
                            }

                            return this.convertToPercent(num);
                        },
                        toFixed: function toFixed(num) {
                            num = num.toFixed(20);
                            return +num;
                        },
                        _prettify: function _prettify(num) {
                            if (!this.options.prettify_enabled) {
                                return num;
                            }

                            if (
                                this.options.prettify &&
                                typeof this.options.prettify === "function"
                            ) {
                                return this.options.prettify(num);
                            } else {
                                return this.prettify(num);
                            }
                        },
                        prettify: function prettify(num) {
                            var n = num.toString();
                            return n.replace(
                                /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
                                "$1" + this.options.prettify_separator
                            );
                        },
                        checkEdges: function checkEdges(left, width) {
                            if (!this.options.force_edges) {
                                return this.toFixed(left);
                            }

                            if (left < 0) {
                                left = 0;
                            } else if (left > 100 - width) {
                                left = 100 - width;
                            }

                            return this.toFixed(left);
                        },
                        validate: function validate() {
                            var o = this.options,
                                r = this.result,
                                v = o.values,
                                vl = v.length,
                                value,
                                i;
                            if (typeof o.min === "string") o.min = +o.min;
                            if (typeof o.max === "string") o.max = +o.max;
                            if (typeof o.from === "string") o.from = +o.from;
                            if (typeof o.to === "string") o.to = +o.to;
                            if (typeof o.step === "string") o.step = +o.step;
                            if (typeof o.from_min === "string")
                                o.from_min = +o.from_min;
                            if (typeof o.from_max === "string")
                                o.from_max = +o.from_max;
                            if (typeof o.to_min === "string")
                                o.to_min = +o.to_min;
                            if (typeof o.to_max === "string")
                                o.to_max = +o.to_max;
                            if (typeof o.grid_num === "string")
                                o.grid_num = +o.grid_num;

                            if (o.max < o.min) {
                                o.max = o.min;
                            }

                            if (vl) {
                                o.p_values = [];
                                o.min = 0;
                                o.max = vl - 1;
                                o.step = 1;
                                o.grid_num = o.max;
                                o.grid_snap = true;

                                for (i = 0; i < vl; i++) {
                                    value = +v[i];

                                    if (!isNaN(value)) {
                                        v[i] = value;
                                        value = this._prettify(value);
                                    } else {
                                        value = v[i];
                                    }

                                    o.p_values.push(value);
                                }
                            }

                            if (typeof o.from !== "number" || isNaN(o.from)) {
                                o.from = o.min;
                            }

                            if (typeof o.to !== "number" || isNaN(o.to)) {
                                o.to = o.max;
                            }

                            if (o.type === "single") {
                                if (o.from < o.min) o.from = o.min;
                                if (o.from > o.max) o.from = o.max;
                            } else {
                                if (o.from < o.min) o.from = o.min;
                                if (o.from > o.max) o.from = o.max;
                                if (o.to < o.min) o.to = o.min;
                                if (o.to > o.max) o.to = o.max;

                                if (this.update_check.from) {
                                    if (this.update_check.from !== o.from) {
                                        if (o.from > o.to) o.from = o.to;
                                    }

                                    if (this.update_check.to !== o.to) {
                                        if (o.to < o.from) o.to = o.from;
                                    }
                                }

                                if (o.from > o.to) o.from = o.to;
                                if (o.to < o.from) o.to = o.from;
                            }

                            if (
                                typeof o.step !== "number" ||
                                isNaN(o.step) ||
                                !o.step ||
                                o.step < 0
                            ) {
                                o.step = 1;
                            }

                            if (
                                typeof o.from_min === "number" &&
                                o.from < o.from_min
                            ) {
                                o.from = o.from_min;
                            }

                            if (
                                typeof o.from_max === "number" &&
                                o.from > o.from_max
                            ) {
                                o.from = o.from_max;
                            }

                            if (
                                typeof o.to_min === "number" &&
                                o.to < o.to_min
                            ) {
                                o.to = o.to_min;
                            }

                            if (
                                typeof o.to_max === "number" &&
                                o.from > o.to_max
                            ) {
                                o.to = o.to_max;
                            }

                            if (r) {
                                if (r.min !== o.min) {
                                    r.min = o.min;
                                }

                                if (r.max !== o.max) {
                                    r.max = o.max;
                                }

                                if (r.from < r.min || r.from > r.max) {
                                    r.from = o.from;
                                }

                                if (r.to < r.min || r.to > r.max) {
                                    r.to = o.to;
                                }
                            }

                            if (
                                typeof o.min_interval !== "number" ||
                                isNaN(o.min_interval) ||
                                !o.min_interval ||
                                o.min_interval < 0
                            ) {
                                o.min_interval = 0;
                            }

                            if (
                                typeof o.max_interval !== "number" ||
                                isNaN(o.max_interval) ||
                                !o.max_interval ||
                                o.max_interval < 0
                            ) {
                                o.max_interval = 0;
                            }

                            if (
                                o.min_interval &&
                                o.min_interval > o.max - o.min
                            ) {
                                o.min_interval = o.max - o.min;
                            }

                            if (
                                o.max_interval &&
                                o.max_interval > o.max - o.min
                            ) {
                                o.max_interval = o.max - o.min;
                            }
                        },
                        decorate: function decorate(num, original) {
                            var decorated = "",
                                o = this.options;

                            if (o.prefix) {
                                decorated += o.prefix;
                            }

                            decorated += num;

                            if (o.max_postfix) {
                                if (
                                    o.values.length &&
                                    num === o.p_values[o.max]
                                ) {
                                    decorated += o.max_postfix;

                                    if (o.postfix) {
                                        decorated += " ";
                                    }
                                } else if (original === o.max) {
                                    decorated += o.max_postfix;

                                    if (o.postfix) {
                                        decorated += " ";
                                    }
                                }
                            }

                            if (o.postfix) {
                                decorated += o.postfix;
                            }

                            return decorated;
                        },
                        updateFrom: function updateFrom() {
                            this.result.from = this.options.from;
                            this.result.from_percent = this.convertToPercent(
                                this.result.from
                            );
                            this.result.from_pretty = this._prettify(
                                this.result.from
                            );

                            if (this.options.values) {
                                this.result.from_value =
                                    this.options.values[this.result.from];
                            }
                        },
                        updateTo: function updateTo() {
                            this.result.to = this.options.to;
                            this.result.to_percent = this.convertToPercent(
                                this.result.to
                            );
                            this.result.to_pretty = this._prettify(
                                this.result.to
                            );

                            if (this.options.values) {
                                this.result.to_value =
                                    this.options.values[this.result.to];
                            }
                        },
                        updateResult: function updateResult() {
                            this.result.min = this.options.min;
                            this.result.max = this.options.max;
                            this.updateFrom();
                            this.updateTo();
                        },
                        // =============================================================================================================
                        // Grid
                        appendGrid: function appendGrid() {
                            if (!this.options.grid) {
                                return;
                            }

                            var o = this.options,
                                i,
                                z,
                                total = o.max - o.min,
                                big_num = o.grid_num,
                                big_p = 0,
                                big_w = 0,
                                small_max = 4,
                                local_small_max,
                                small_p,
                                small_w = 0,
                                result,
                                html = "";
                            this.calcGridMargin();

                            if (o.grid_snap) {
                                if (total > 50) {
                                    big_num = 50 / o.step;
                                    big_p = this.toFixed(o.step / 0.5);
                                } else {
                                    big_num = total / o.step;
                                    big_p = this.toFixed(
                                        o.step / (total / 100)
                                    );
                                }
                            } else {
                                big_p = this.toFixed(100 / big_num);
                            }

                            if (big_num > 4) {
                                small_max = 3;
                            }

                            if (big_num > 7) {
                                small_max = 2;
                            }

                            if (big_num > 14) {
                                small_max = 1;
                            }

                            if (big_num > 28) {
                                small_max = 0;
                            }

                            for (i = 0; i < big_num + 1; i++) {
                                local_small_max = small_max;
                                big_w = this.toFixed(big_p * i);

                                if (big_w > 100) {
                                    big_w = 100;
                                }

                                this.coords.big[i] = big_w;
                                small_p =
                                    (big_w - big_p * (i - 1)) /
                                    (local_small_max + 1);

                                for (z = 1; z <= local_small_max; z++) {
                                    if (big_w === 0) {
                                        break;
                                    }

                                    small_w = this.toFixed(big_w - small_p * z);
                                    html +=
                                        '<span class="irs-grid-pol small" style="left: ' +
                                        small_w +
                                        '%"></span>';
                                }

                                html +=
                                    '<span class="irs-grid-pol" style="left: ' +
                                    big_w +
                                    '%"></span>';
                                result = this.convertToValue(big_w);

                                if (o.values.length) {
                                    result = o.p_values[result];
                                } else {
                                    result = this._prettify(result);
                                }

                                html +=
                                    '<span class="irs-grid-text js-grid-text-' +
                                    i +
                                    '" style="left: ' +
                                    big_w +
                                    '%">' +
                                    result +
                                    "</span>";
                            }

                            this.coords.big_num = Math.ceil(big_num + 1);
                            this.$cache.cont.addClass("irs-with-grid");
                            this.$cache.grid.html(html);
                            this.cacheGridLabels();
                        },
                        cacheGridLabels: function cacheGridLabels() {
                            var $label,
                                i,
                                num = this.coords.big_num;

                            for (i = 0; i < num; i++) {
                                $label = this.$cache.grid.find(
                                    ".js-grid-text-" + i
                                );
                                this.$cache.grid_labels.push($label);
                            }

                            this.calcGridLabels();
                        },
                        calcGridLabels: function calcGridLabels() {
                            var i,
                                label,
                                start = [],
                                finish = [],
                                num = this.coords.big_num;

                            for (i = 0; i < num; i++) {
                                this.coords.big_w[i] =
                                    this.$cache.grid_labels[i].outerWidth(
                                        false
                                    );
                                this.coords.big_p[i] = this.toFixed(
                                    (this.coords.big_w[i] / this.coords.w_rs) *
                                        100
                                );
                                this.coords.big_x[i] = this.toFixed(
                                    this.coords.big_p[i] / 2
                                );
                                start[i] = this.toFixed(
                                    this.coords.big[i] - this.coords.big_x[i]
                                );
                                finish[i] = this.toFixed(
                                    start[i] + this.coords.big_p[i]
                                );
                            }

                            if (this.options.force_edges) {
                                if (start[0] < -this.coords.grid_gap) {
                                    start[0] = -this.coords.grid_gap;
                                    finish[0] = this.toFixed(
                                        start[0] + this.coords.big_p[0]
                                    );
                                    this.coords.big_x[0] = this.coords.grid_gap;
                                }

                                if (
                                    finish[num - 1] >
                                    100 + this.coords.grid_gap
                                ) {
                                    finish[num - 1] =
                                        100 + this.coords.grid_gap;
                                    start[num - 1] = this.toFixed(
                                        finish[num - 1] -
                                            this.coords.big_p[num - 1]
                                    );
                                    this.coords.big_x[num - 1] = this.toFixed(
                                        this.coords.big_p[num - 1] -
                                            this.coords.grid_gap
                                    );
                                }
                            }

                            this.calcGridCollision(2, start, finish);
                            this.calcGridCollision(4, start, finish);

                            for (i = 0; i < num; i++) {
                                label = this.$cache.grid_labels[i][0];

                                if (
                                    this.coords.big_x[i] !==
                                    Number.POSITIVE_INFINITY
                                ) {
                                    label.style.marginLeft =
                                        -this.coords.big_x[i] + "%";
                                }
                            }
                        },
                        // Collisions Calc Beta
                        // TODO: Refactor then have plenty of time
                        calcGridCollision: function calcGridCollision(
                            step,
                            start,
                            finish
                        ) {
                            var i,
                                next_i,
                                label,
                                num = this.coords.big_num;

                            for (i = 0; i < num; i += step) {
                                next_i = i + step / 2;

                                if (next_i >= num) {
                                    break;
                                }

                                label = this.$cache.grid_labels[next_i][0];

                                if (finish[i] <= start[next_i]) {
                                    label.style.visibility = "visible";
                                } else {
                                    label.style.visibility = "hidden";
                                }
                            }
                        },
                        calcGridMargin: function calcGridMargin() {
                            if (!this.options.grid_margin) {
                                return;
                            }

                            this.coords.w_rs = this.$cache.rs.outerWidth(false);

                            if (!this.coords.w_rs) {
                                return;
                            }

                            if (this.options.type === "single") {
                                this.coords.w_handle =
                                    this.$cache.s_single.outerWidth(false);
                            } else {
                                this.coords.w_handle =
                                    this.$cache.s_from.outerWidth(false);
                            }

                            this.coords.p_handle = this.toFixed(
                                (this.coords.w_handle / this.coords.w_rs) * 100
                            );
                            this.coords.grid_gap = this.toFixed(
                                this.coords.p_handle / 2 - 0.1
                            );
                            this.$cache.grid[0].style.width =
                                this.toFixed(100 - this.coords.p_handle) + "%";
                            this.$cache.grid[0].style.left =
                                this.coords.grid_gap + "%";
                        },
                        // =============================================================================================================
                        // Public methods
                        update: function update(options) {
                            if (!this.input) {
                                return;
                            }

                            this.is_update = true;
                            this.options.from = this.result.from;
                            this.options.to = this.result.to;
                            this.update_check.from = this.result.from;
                            this.update_check.to = this.result.to;
                            this.options = $.extend(this.options, options);
                            this.validate();
                            this.updateResult(options);
                            this.toggleInput();
                            this.remove();
                            this.init(true);
                        },
                        reset: function reset() {
                            if (!this.input) {
                                return;
                            }

                            this.updateResult();
                            this.update();
                        },
                        destroy: function destroy() {
                            if (!this.input) {
                                return;
                            }

                            this.toggleInput();
                            this.$cache.input.prop("readonly", false);
                            $.data(this.input, "ionRangeSlider", null);
                            this.remove();
                            this.input = null;
                            this.options = null;
                        },
                    };

                    $.fn.ionRangeSlider = function (options) {
                        return this.each(function () {
                            if (!$.data(this, "ionRangeSlider")) {
                                $.data(
                                    this,
                                    "ionRangeSlider",
                                    new IonRangeSlider(
                                        this,
                                        options,
                                        plugin_count++
                                    )
                                );
                            }
                        });
                    }; // =================================================================================================================
                    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
                    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
                    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
                    // MIT license

                    (function () {
                        var lastTime = 0;
                        var vendors = ["ms", "moz", "webkit", "o"];

                        for (
                            var x = 0;
                            x < vendors.length && !window.requestAnimationFrame;
                            ++x
                        ) {
                            window.requestAnimationFrame =
                                window[vendors[x] + "RequestAnimationFrame"];
                            window.cancelAnimationFrame =
                                window[vendors[x] + "CancelAnimationFrame"] ||
                                window[
                                    vendors[x] + "CancelRequestAnimationFrame"
                                ];
                        }

                        if (!window.requestAnimationFrame)
                            window.requestAnimationFrame = function (
                                callback,
                                element
                            ) {
                                var currTime = new Date().getTime();
                                var timeToCall = Math.max(
                                    0,
                                    16 - (currTime - lastTime)
                                );
                                var id = window.setTimeout(function () {
                                    callback(currTime + timeToCall);
                                }, timeToCall);
                                lastTime = currTime + timeToCall;
                                return id;
                            };
                        if (!window.cancelAnimationFrame)
                            window.cancelAnimationFrame = function (id) {
                                clearTimeout(id);
                            };
                    })();
                });

                /***/
            },

        /***/ "./resources/js/jquery.js":
            /*!********************************!*\
  !*** ./resources/js/jquery.js ***!
  \********************************/
            /***/ function (module, exports, __webpack_require__) {
                /* module decorator */ module = __webpack_require__.nmd(module);
                var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (
                        typeof Symbol === "function" &&
                        typeof Symbol.iterator === "symbol"
                    ) {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj &&
                                typeof Symbol === "function" &&
                                obj.constructor === Symbol &&
                                obj !== Symbol.prototype
                                ? "symbol"
                                : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }

                /*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
                !(function (a, b) {
                    "use strict";

                    "object" == (false ? 0 : _typeof(module)) &&
                    "object" == _typeof(module.exports)
                        ? (module.exports = a.document
                              ? b(a, !0)
                              : function (a) {
                                    if (!a.document)
                                        throw new Error(
                                            "jQuery requires a window with a document"
                                        );
                                    return b(a);
                                })
                        : b(a);
                })(
                    "undefined" != typeof window ? window : this,
                    function (a, b) {
                        "use strict";

                        var c = [],
                            d = a.document,
                            e = Object.getPrototypeOf,
                            f = c.slice,
                            g = c.concat,
                            h = c.push,
                            i = c.indexOf,
                            j = {},
                            k = j.toString,
                            l = j.hasOwnProperty,
                            m = l.toString,
                            n = m.call(Object),
                            o = {};

                        function p(a, b) {
                            b = b || d;
                            var c = b.createElement("script");
                            (c.text = a),
                                b.head.appendChild(c).parentNode.removeChild(c);
                        }

                        var q = "3.2.1",
                            r = function r(a, b) {
                                return new r.fn.init(a, b);
                            },
                            s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                            t = /^-ms-/,
                            u = /-([a-z])/g,
                            v = function v(a, b) {
                                return b.toUpperCase();
                            };

                        (r.fn = r.prototype =
                            {
                                jquery: q,
                                constructor: r,
                                length: 0,
                                toArray: function toArray() {
                                    return f.call(this);
                                },
                                get: function get(a) {
                                    return null == a
                                        ? f.call(this)
                                        : a < 0
                                        ? this[a + this.length]
                                        : this[a];
                                },
                                pushStack: function pushStack(a) {
                                    var b = r.merge(this.constructor(), a);
                                    return (b.prevObject = this), b;
                                },
                                each: function each(a) {
                                    return r.each(this, a);
                                },
                                map: function map(a) {
                                    return this.pushStack(
                                        r.map(this, function (b, c) {
                                            return a.call(b, c, b);
                                        })
                                    );
                                },
                                slice: function slice() {
                                    return this.pushStack(
                                        f.apply(this, arguments)
                                    );
                                },
                                first: function first() {
                                    return this.eq(0);
                                },
                                last: function last() {
                                    return this.eq(-1);
                                },
                                eq: function eq(a) {
                                    var b = this.length,
                                        c = +a + (a < 0 ? b : 0);
                                    return this.pushStack(
                                        c >= 0 && c < b ? [this[c]] : []
                                    );
                                },
                                end: function end() {
                                    return (
                                        this.prevObject || this.constructor()
                                    );
                                },
                                push: h,
                                sort: c.sort,
                                splice: c.splice,
                            }),
                            (r.extend = r.fn.extend =
                                function () {
                                    var a,
                                        b,
                                        c,
                                        d,
                                        e,
                                        f,
                                        g = arguments[0] || {},
                                        h = 1,
                                        i = arguments.length,
                                        j = !1;

                                    for (
                                        "boolean" == typeof g &&
                                            ((j = g),
                                            (g = arguments[h] || {}),
                                            h++),
                                            "object" == _typeof(g) ||
                                                r.isFunction(g) ||
                                                (g = {}),
                                            h === i && ((g = this), h--);
                                        h < i;
                                        h++
                                    ) {
                                        if (null != (a = arguments[h]))
                                            for (b in a) {
                                                (c = g[b]),
                                                    (d = a[b]),
                                                    g !== d &&
                                                        (j &&
                                                        d &&
                                                        (r.isPlainObject(d) ||
                                                            (e =
                                                                Array.isArray(
                                                                    d
                                                                )))
                                                            ? (e
                                                                  ? ((e = !1),
                                                                    (f =
                                                                        c &&
                                                                        Array.isArray(
                                                                            c
                                                                        )
                                                                            ? c
                                                                            : []))
                                                                  : (f =
                                                                        c &&
                                                                        r.isPlainObject(
                                                                            c
                                                                        )
                                                                            ? c
                                                                            : {}),
                                                              (g[b] = r.extend(
                                                                  j,
                                                                  f,
                                                                  d
                                                              )))
                                                            : void 0 !== d &&
                                                              (g[b] = d));
                                            }
                                    }

                                    return g;
                                }),
                            r.extend({
                                expando:
                                    "jQuery" +
                                    (q + Math.random()).replace(/\D/g, ""),
                                isReady: !0,
                                error: function error(a) {
                                    throw new Error(a);
                                },
                                noop: function noop() {},
                                isFunction: function isFunction(a) {
                                    return "function" === r.type(a);
                                },
                                isWindow: function isWindow(a) {
                                    return null != a && a === a.window;
                                },
                                isNumeric: function isNumeric(a) {
                                    var b = r.type(a);
                                    return (
                                        ("number" === b || "string" === b) &&
                                        !isNaN(a - parseFloat(a))
                                    );
                                },
                                isPlainObject: function isPlainObject(a) {
                                    var b, c;
                                    return (
                                        !(
                                            !a ||
                                            "[object Object]" !== k.call(a)
                                        ) &&
                                        (!(b = e(a)) ||
                                            ((c =
                                                l.call(b, "constructor") &&
                                                b.constructor),
                                            "function" == typeof c &&
                                                m.call(c) === n))
                                    );
                                },
                                isEmptyObject: function isEmptyObject(a) {
                                    var b;

                                    for (b in a) {
                                        return !1;
                                    }

                                    return !0;
                                },
                                type: function type(a) {
                                    return null == a
                                        ? a + ""
                                        : "object" == _typeof(a) ||
                                          "function" == typeof a
                                        ? j[k.call(a)] || "object"
                                        : _typeof(a);
                                },
                                globalEval: function globalEval(a) {
                                    p(a);
                                },
                                camelCase: function camelCase(a) {
                                    return a.replace(t, "ms-").replace(u, v);
                                },
                                each: function each(a, b) {
                                    var c,
                                        d = 0;

                                    if (w(a)) {
                                        for (c = a.length; d < c; d++) {
                                            if (b.call(a[d], d, a[d]) === !1)
                                                break;
                                        }
                                    } else
                                        for (d in a) {
                                            if (b.call(a[d], d, a[d]) === !1)
                                                break;
                                        }

                                    return a;
                                },
                                trim: function trim(a) {
                                    return null == a
                                        ? ""
                                        : (a + "").replace(s, "");
                                },
                                makeArray: function makeArray(a, b) {
                                    var c = b || [];
                                    return (
                                        null != a &&
                                            (w(Object(a))
                                                ? r.merge(
                                                      c,
                                                      "string" == typeof a
                                                          ? [a]
                                                          : a
                                                  )
                                                : h.call(c, a)),
                                        c
                                    );
                                },
                                inArray: function inArray(a, b, c) {
                                    return null == b ? -1 : i.call(b, a, c);
                                },
                                merge: function merge(a, b) {
                                    for (
                                        var c = +b.length, d = 0, e = a.length;
                                        d < c;
                                        d++
                                    ) {
                                        a[e++] = b[d];
                                    }

                                    return (a.length = e), a;
                                },
                                grep: function grep(a, b, c) {
                                    for (
                                        var d,
                                            e = [],
                                            f = 0,
                                            g = a.length,
                                            h = !c;
                                        f < g;
                                        f++
                                    ) {
                                        (d = !b(a[f], f)),
                                            d !== h && e.push(a[f]);
                                    }

                                    return e;
                                },
                                map: function map(a, b, c) {
                                    var d,
                                        e,
                                        f = 0,
                                        h = [];
                                    if (w(a))
                                        for (d = a.length; f < d; f++) {
                                            (e = b(a[f], f, c)),
                                                null != e && h.push(e);
                                        }
                                    else
                                        for (f in a) {
                                            (e = b(a[f], f, c)),
                                                null != e && h.push(e);
                                        }
                                    return g.apply([], h);
                                },
                                guid: 1,
                                proxy: function proxy(a, b) {
                                    var c, d, e;
                                    if (
                                        ("string" == typeof b &&
                                            ((c = a[b]), (b = a), (a = c)),
                                        r.isFunction(a))
                                    )
                                        return (
                                            (d = f.call(arguments, 2)),
                                            (e = function e() {
                                                return a.apply(
                                                    b || this,
                                                    d.concat(f.call(arguments))
                                                );
                                            }),
                                            (e.guid = a.guid =
                                                a.guid || r.guid++),
                                            e
                                        );
                                },
                                now: Date.now,
                                support: o,
                            }),
                            "function" == typeof Symbol &&
                                (r.fn[Symbol.iterator] = c[Symbol.iterator]),
                            r.each(
                                "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                                    " "
                                ),
                                function (a, b) {
                                    j["[object " + b + "]"] = b.toLowerCase();
                                }
                            );

                        function w(a) {
                            var b = !!a && "length" in a && a.length,
                                c = r.type(a);
                            return (
                                "function" !== c &&
                                !r.isWindow(a) &&
                                ("array" === c ||
                                    0 === b ||
                                    ("number" == typeof b &&
                                        b > 0 &&
                                        b - 1 in a))
                            );
                        }

                        var x = (function (a) {
                            var b,
                                c,
                                d,
                                e,
                                f,
                                g,
                                h,
                                i,
                                j,
                                k,
                                l,
                                m,
                                n,
                                o,
                                p,
                                q,
                                r,
                                s,
                                t,
                                u = "sizzle" + 1 * new Date(),
                                v = a.document,
                                w = 0,
                                x = 0,
                                y = ha(),
                                z = ha(),
                                A = ha(),
                                B = function B(a, b) {
                                    return a === b && (l = !0), 0;
                                },
                                C = {}.hasOwnProperty,
                                D = [],
                                E = D.pop,
                                F = D.push,
                                G = D.push,
                                H = D.slice,
                                I = function I(a, b) {
                                    for (var c = 0, d = a.length; c < d; c++) {
                                        if (a[c] === b) return c;
                                    }

                                    return -1;
                                },
                                J =
                                    "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                                K = "[\\x20\\t\\r\\n\\f]",
                                L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                                M =
                                    "\\[" +
                                    K +
                                    "*(" +
                                    L +
                                    ")(?:" +
                                    K +
                                    "*([*^$|!~]?=)" +
                                    K +
                                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                                    L +
                                    "))|)" +
                                    K +
                                    "*\\]",
                                N =
                                    ":(" +
                                    L +
                                    ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                                    M +
                                    ")*)|.*)\\)|)",
                                O = new RegExp(K + "+", "g"),
                                P = new RegExp(
                                    "^" +
                                        K +
                                        "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                                        K +
                                        "+$",
                                    "g"
                                ),
                                Q = new RegExp("^" + K + "*," + K + "*"),
                                R = new RegExp(
                                    "^" + K + "*([>+~]|" + K + ")" + K + "*"
                                ),
                                S = new RegExp(
                                    "=" + K + "*([^\\]'\"]*?)" + K + "*\\]",
                                    "g"
                                ),
                                T = new RegExp(N),
                                U = new RegExp("^" + L + "$"),
                                V = {
                                    ID: new RegExp("^#(" + L + ")"),
                                    CLASS: new RegExp("^\\.(" + L + ")"),
                                    TAG: new RegExp("^(" + L + "|[*])"),
                                    ATTR: new RegExp("^" + M),
                                    PSEUDO: new RegExp("^" + N),
                                    CHILD: new RegExp(
                                        "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                                            K +
                                            "*(even|odd|(([+-]|)(\\d*)n|)" +
                                            K +
                                            "*(?:([+-]|)" +
                                            K +
                                            "*(\\d+)|))" +
                                            K +
                                            "*\\)|)",
                                        "i"
                                    ),
                                    bool: new RegExp("^(?:" + J + ")$", "i"),
                                    needsContext: new RegExp(
                                        "^" +
                                            K +
                                            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                                            K +
                                            "*((?:-\\d)?\\d*)" +
                                            K +
                                            "*\\)|)(?=[^-]|$)",
                                        "i"
                                    ),
                                },
                                W = /^(?:input|select|textarea|button)$/i,
                                X = /^h\d$/i,
                                Y = /^[^{]+\{\s*\[native \w/,
                                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                                $ = /[+~]/,
                                _ = new RegExp(
                                    "\\\\([\\da-f]{1,6}" +
                                        K +
                                        "?|(" +
                                        K +
                                        ")|.)",
                                    "ig"
                                ),
                                aa = function aa(a, b, c) {
                                    var d = "0x" + b - 65536;
                                    return d !== d || c
                                        ? b
                                        : d < 0
                                        ? String.fromCharCode(d + 65536)
                                        : String.fromCharCode(
                                              (d >> 10) | 55296,
                                              (1023 & d) | 56320
                                          );
                                },
                                ba =
                                    /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                                ca = function ca(a, b) {
                                    return b
                                        ? "\0" === a
                                            ? "\uFFFD"
                                            : a.slice(0, -1) +
                                              "\\" +
                                              a
                                                  .charCodeAt(a.length - 1)
                                                  .toString(16) +
                                              " "
                                        : "\\" + a;
                                },
                                da = function da() {
                                    m();
                                },
                                ea = ta(
                                    function (a) {
                                        return (
                                            a.disabled === !0 &&
                                            ("form" in a || "label" in a)
                                        );
                                    },
                                    {
                                        dir: "parentNode",
                                        next: "legend",
                                    }
                                );

                            try {
                                G.apply(
                                    (D = H.call(v.childNodes)),
                                    v.childNodes
                                ),
                                    D[v.childNodes.length].nodeType;
                            } catch (fa) {
                                G = {
                                    apply: D.length
                                        ? function (a, b) {
                                              F.apply(a, H.call(b));
                                          }
                                        : function (a, b) {
                                              var c = a.length,
                                                  d = 0;

                                              while ((a[c++] = b[d++])) {}

                                              a.length = c - 1;
                                          },
                                };
                            }

                            function ga(a, b, d, e) {
                                var f,
                                    h,
                                    j,
                                    k,
                                    l,
                                    o,
                                    r,
                                    s = b && b.ownerDocument,
                                    w = b ? b.nodeType : 9;
                                if (
                                    ((d = d || []),
                                    "string" != typeof a ||
                                        !a ||
                                        (1 !== w && 9 !== w && 11 !== w))
                                )
                                    return d;

                                if (
                                    !e &&
                                    ((b ? b.ownerDocument || b : v) !== n &&
                                        m(b),
                                    (b = b || n),
                                    p)
                                ) {
                                    if (11 !== w && (l = Z.exec(a)))
                                        if ((f = l[1])) {
                                            if (9 === w) {
                                                if (!(j = b.getElementById(f)))
                                                    return d;
                                                if (j.id === f)
                                                    return d.push(j), d;
                                            } else if (
                                                s &&
                                                (j = s.getElementById(f)) &&
                                                t(b, j) &&
                                                j.id === f
                                            )
                                                return d.push(j), d;
                                        } else {
                                            if (l[2])
                                                return (
                                                    G.apply(
                                                        d,
                                                        b.getElementsByTagName(
                                                            a
                                                        )
                                                    ),
                                                    d
                                                );
                                            if (
                                                (f = l[3]) &&
                                                c.getElementsByClassName &&
                                                b.getElementsByClassName
                                            )
                                                return (
                                                    G.apply(
                                                        d,
                                                        b.getElementsByClassName(
                                                            f
                                                        )
                                                    ),
                                                    d
                                                );
                                        }

                                    if (
                                        c.qsa &&
                                        !A[a + " "] &&
                                        (!q || !q.test(a))
                                    ) {
                                        if (1 !== w) (s = b), (r = a);
                                        else if (
                                            "object" !==
                                            b.nodeName.toLowerCase()
                                        ) {
                                            (k = b.getAttribute("id"))
                                                ? (k = k.replace(ba, ca))
                                                : b.setAttribute("id", (k = u)),
                                                (o = g(a)),
                                                (h = o.length);

                                            while (h--) {
                                                o[h] = "#" + k + " " + sa(o[h]);
                                            }

                                            (r = o.join(",")),
                                                (s =
                                                    ($.test(a) &&
                                                        qa(b.parentNode)) ||
                                                    b);
                                        }
                                        if (r)
                                            try {
                                                return (
                                                    G.apply(
                                                        d,
                                                        s.querySelectorAll(r)
                                                    ),
                                                    d
                                                );
                                            } catch (x) {
                                            } finally {
                                                k === u &&
                                                    b.removeAttribute("id");
                                            }
                                    }
                                }

                                return i(a.replace(P, "$1"), b, d, e);
                            }

                            function ha() {
                                var a = [];

                                function b(c, e) {
                                    return (
                                        a.push(c + " ") > d.cacheLength &&
                                            delete b[a.shift()],
                                        (b[c + " "] = e)
                                    );
                                }

                                return b;
                            }

                            function ia(a) {
                                return (a[u] = !0), a;
                            }

                            function ja(a) {
                                var b = n.createElement("fieldset");

                                try {
                                    return !!a(b);
                                } catch (c) {
                                    return !1;
                                } finally {
                                    b.parentNode && b.parentNode.removeChild(b),
                                        (b = null);
                                }
                            }

                            function ka(a, b) {
                                var c = a.split("|"),
                                    e = c.length;

                                while (e--) {
                                    d.attrHandle[c[e]] = b;
                                }
                            }

                            function la(a, b) {
                                var c = b && a,
                                    d =
                                        c &&
                                        1 === a.nodeType &&
                                        1 === b.nodeType &&
                                        a.sourceIndex - b.sourceIndex;
                                if (d) return d;
                                if (c)
                                    while ((c = c.nextSibling)) {
                                        if (c === b) return -1;
                                    }
                                return a ? 1 : -1;
                            }

                            function ma(a) {
                                return function (b) {
                                    var c = b.nodeName.toLowerCase();
                                    return "input" === c && b.type === a;
                                };
                            }

                            function na(a) {
                                return function (b) {
                                    var c = b.nodeName.toLowerCase();
                                    return (
                                        ("input" === c || "button" === c) &&
                                        b.type === a
                                    );
                                };
                            }

                            function oa(a) {
                                return function (b) {
                                    return "form" in b
                                        ? b.parentNode && b.disabled === !1
                                            ? "label" in b
                                                ? "label" in b.parentNode
                                                    ? b.parentNode.disabled ===
                                                      a
                                                    : b.disabled === a
                                                : b.isDisabled === a ||
                                                  (b.isDisabled !== !a &&
                                                      ea(b) === a)
                                            : b.disabled === a
                                        : "label" in b && b.disabled === a;
                                };
                            }

                            function pa(a) {
                                return ia(function (b) {
                                    return (
                                        (b = +b),
                                        ia(function (c, d) {
                                            var e,
                                                f = a([], c.length, b),
                                                g = f.length;

                                            while (g--) {
                                                c[(e = f[g])] &&
                                                    (c[e] = !(d[e] = c[e]));
                                            }
                                        })
                                    );
                                });
                            }

                            function qa(a) {
                                return (
                                    a &&
                                    "undefined" !=
                                        typeof a.getElementsByTagName &&
                                    a
                                );
                            }

                            (c = ga.support = {}),
                                (f = ga.isXML =
                                    function (a) {
                                        var b =
                                            a &&
                                            (a.ownerDocument || a)
                                                .documentElement;
                                        return !!b && "HTML" !== b.nodeName;
                                    }),
                                (m = ga.setDocument =
                                    function (a) {
                                        var b,
                                            e,
                                            g = a ? a.ownerDocument || a : v;
                                        return g !== n &&
                                            9 === g.nodeType &&
                                            g.documentElement
                                            ? ((n = g),
                                              (o = n.documentElement),
                                              (p = !f(n)),
                                              v !== n &&
                                                  (e = n.defaultView) &&
                                                  e.top !== e &&
                                                  (e.addEventListener
                                                      ? e.addEventListener(
                                                            "unload",
                                                            da,
                                                            !1
                                                        )
                                                      : e.attachEvent &&
                                                        e.attachEvent(
                                                            "onunload",
                                                            da
                                                        )),
                                              (c.attributes = ja(function (a) {
                                                  return (
                                                      (a.className = "i"),
                                                      !a.getAttribute(
                                                          "className"
                                                      )
                                                  );
                                              })),
                                              (c.getElementsByTagName = ja(
                                                  function (a) {
                                                      return (
                                                          a.appendChild(
                                                              n.createComment(
                                                                  ""
                                                              )
                                                          ),
                                                          !a.getElementsByTagName(
                                                              "*"
                                                          ).length
                                                      );
                                                  }
                                              )),
                                              (c.getElementsByClassName =
                                                  Y.test(
                                                      n.getElementsByClassName
                                                  )),
                                              (c.getById = ja(function (a) {
                                                  return (
                                                      (o.appendChild(a).id = u),
                                                      !n.getElementsByName ||
                                                          !n.getElementsByName(
                                                              u
                                                          ).length
                                                  );
                                              })),
                                              c.getById
                                                  ? ((d.filter.ID = function (
                                                        a
                                                    ) {
                                                        var b = a.replace(
                                                            _,
                                                            aa
                                                        );
                                                        return function (a) {
                                                            return (
                                                                a.getAttribute(
                                                                    "id"
                                                                ) === b
                                                            );
                                                        };
                                                    }),
                                                    (d.find.ID = function (
                                                        a,
                                                        b
                                                    ) {
                                                        if (
                                                            "undefined" !=
                                                                typeof b.getElementById &&
                                                            p
                                                        ) {
                                                            var c =
                                                                b.getElementById(
                                                                    a
                                                                );
                                                            return c ? [c] : [];
                                                        }
                                                    }))
                                                  : ((d.filter.ID = function (
                                                        a
                                                    ) {
                                                        var b = a.replace(
                                                            _,
                                                            aa
                                                        );
                                                        return function (a) {
                                                            var c =
                                                                "undefined" !=
                                                                    typeof a.getAttributeNode &&
                                                                a.getAttributeNode(
                                                                    "id"
                                                                );
                                                            return (
                                                                c &&
                                                                c.value === b
                                                            );
                                                        };
                                                    }),
                                                    (d.find.ID = function (
                                                        a,
                                                        b
                                                    ) {
                                                        if (
                                                            "undefined" !=
                                                                typeof b.getElementById &&
                                                            p
                                                        ) {
                                                            var c,
                                                                d,
                                                                e,
                                                                f =
                                                                    b.getElementById(
                                                                        a
                                                                    );

                                                            if (f) {
                                                                if (
                                                                    ((c =
                                                                        f.getAttributeNode(
                                                                            "id"
                                                                        )),
                                                                    c &&
                                                                        c.value ===
                                                                            a)
                                                                )
                                                                    return [f];
                                                                (e =
                                                                    b.getElementsByName(
                                                                        a
                                                                    )),
                                                                    (d = 0);

                                                                while (
                                                                    (f = e[d++])
                                                                ) {
                                                                    if (
                                                                        ((c =
                                                                            f.getAttributeNode(
                                                                                "id"
                                                                            )),
                                                                        c &&
                                                                            c.value ===
                                                                                a)
                                                                    )
                                                                        return [
                                                                            f,
                                                                        ];
                                                                }
                                                            }

                                                            return [];
                                                        }
                                                    })),
                                              (d.find.TAG =
                                                  c.getElementsByTagName
                                                      ? function (a, b) {
                                                            return "undefined" !=
                                                                typeof b.getElementsByTagName
                                                                ? b.getElementsByTagName(
                                                                      a
                                                                  )
                                                                : c.qsa
                                                                ? b.querySelectorAll(
                                                                      a
                                                                  )
                                                                : void 0;
                                                        }
                                                      : function (a, b) {
                                                            var c,
                                                                d = [],
                                                                e = 0,
                                                                f =
                                                                    b.getElementsByTagName(
                                                                        a
                                                                    );

                                                            if ("*" === a) {
                                                                while (
                                                                    (c = f[e++])
                                                                ) {
                                                                    1 ===
                                                                        c.nodeType &&
                                                                        d.push(
                                                                            c
                                                                        );
                                                                }

                                                                return d;
                                                            }

                                                            return f;
                                                        }),
                                              (d.find.CLASS =
                                                  c.getElementsByClassName &&
                                                  function (a, b) {
                                                      if (
                                                          "undefined" !=
                                                              typeof b.getElementsByClassName &&
                                                          p
                                                      )
                                                          return b.getElementsByClassName(
                                                              a
                                                          );
                                                  }),
                                              (r = []),
                                              (q = []),
                                              (c.qsa = Y.test(
                                                  n.querySelectorAll
                                              )) &&
                                                  (ja(function (a) {
                                                      (o.appendChild(
                                                          a
                                                      ).innerHTML =
                                                          "<a id='" +
                                                          u +
                                                          "'></a><select id='" +
                                                          u +
                                                          "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                                          a.querySelectorAll(
                                                              "[msallowcapture^='']"
                                                          ).length &&
                                                              q.push(
                                                                  "[*^$]=" +
                                                                      K +
                                                                      "*(?:''|\"\")"
                                                              ),
                                                          a.querySelectorAll(
                                                              "[selected]"
                                                          ).length ||
                                                              q.push(
                                                                  "\\[" +
                                                                      K +
                                                                      "*(?:value|" +
                                                                      J +
                                                                      ")"
                                                              ),
                                                          a.querySelectorAll(
                                                              "[id~=" + u + "-]"
                                                          ).length ||
                                                              q.push("~="),
                                                          a.querySelectorAll(
                                                              ":checked"
                                                          ).length ||
                                                              q.push(
                                                                  ":checked"
                                                              ),
                                                          a.querySelectorAll(
                                                              "a#" + u + "+*"
                                                          ).length ||
                                                              q.push(
                                                                  ".#.+[+~]"
                                                              );
                                                  }),
                                                  ja(function (a) {
                                                      a.innerHTML =
                                                          "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                                      var b =
                                                          n.createElement(
                                                              "input"
                                                          );
                                                      b.setAttribute(
                                                          "type",
                                                          "hidden"
                                                      ),
                                                          a
                                                              .appendChild(b)
                                                              .setAttribute(
                                                                  "name",
                                                                  "D"
                                                              ),
                                                          a.querySelectorAll(
                                                              "[name=d]"
                                                          ).length &&
                                                              q.push(
                                                                  "name" +
                                                                      K +
                                                                      "*[*^$|!~]?="
                                                              ),
                                                          2 !==
                                                              a.querySelectorAll(
                                                                  ":enabled"
                                                              ).length &&
                                                              q.push(
                                                                  ":enabled",
                                                                  ":disabled"
                                                              ),
                                                          (o.appendChild(
                                                              a
                                                          ).disabled = !0),
                                                          2 !==
                                                              a.querySelectorAll(
                                                                  ":disabled"
                                                              ).length &&
                                                              q.push(
                                                                  ":enabled",
                                                                  ":disabled"
                                                              ),
                                                          a.querySelectorAll(
                                                              "*,:x"
                                                          ),
                                                          q.push(",.*:");
                                                  })),
                                              (c.matchesSelector = Y.test(
                                                  (s =
                                                      o.matches ||
                                                      o.webkitMatchesSelector ||
                                                      o.mozMatchesSelector ||
                                                      o.oMatchesSelector ||
                                                      o.msMatchesSelector)
                                              )) &&
                                                  ja(function (a) {
                                                      (c.disconnectedMatch =
                                                          s.call(a, "*")),
                                                          s.call(
                                                              a,
                                                              "[s!='']:x"
                                                          ),
                                                          r.push("!=", N);
                                                  }),
                                              (q =
                                                  q.length &&
                                                  new RegExp(q.join("|"))),
                                              (r =
                                                  r.length &&
                                                  new RegExp(r.join("|"))),
                                              (b = Y.test(
                                                  o.compareDocumentPosition
                                              )),
                                              (t =
                                                  b || Y.test(o.contains)
                                                      ? function (a, b) {
                                                            var c =
                                                                    9 ===
                                                                    a.nodeType
                                                                        ? a.documentElement
                                                                        : a,
                                                                d =
                                                                    b &&
                                                                    b.parentNode;
                                                            return (
                                                                a === d ||
                                                                !(
                                                                    !d ||
                                                                    1 !==
                                                                        d.nodeType ||
                                                                    !(c.contains
                                                                        ? c.contains(
                                                                              d
                                                                          )
                                                                        : a.compareDocumentPosition &&
                                                                          16 &
                                                                              a.compareDocumentPosition(
                                                                                  d
                                                                              ))
                                                                )
                                                            );
                                                        }
                                                      : function (a, b) {
                                                            if (b)
                                                                while (
                                                                    (b =
                                                                        b.parentNode)
                                                                ) {
                                                                    if (b === a)
                                                                        return !0;
                                                                }
                                                            return !1;
                                                        }),
                                              (B = b
                                                  ? function (a, b) {
                                                        if (a === b)
                                                            return (l = !0), 0;
                                                        var d =
                                                            !a.compareDocumentPosition -
                                                            !b.compareDocumentPosition;
                                                        return d
                                                            ? d
                                                            : ((d =
                                                                  (a.ownerDocument ||
                                                                      a) ===
                                                                  (b.ownerDocument ||
                                                                      b)
                                                                      ? a.compareDocumentPosition(
                                                                            b
                                                                        )
                                                                      : 1),
                                                              1 & d ||
                                                              (!c.sortDetached &&
                                                                  b.compareDocumentPosition(
                                                                      a
                                                                  ) === d)
                                                                  ? a === n ||
                                                                    (a.ownerDocument ===
                                                                        v &&
                                                                        t(v, a))
                                                                      ? -1
                                                                      : b ===
                                                                            n ||
                                                                        (b.ownerDocument ===
                                                                            v &&
                                                                            t(
                                                                                v,
                                                                                b
                                                                            ))
                                                                      ? 1
                                                                      : k
                                                                      ? I(
                                                                            k,
                                                                            a
                                                                        ) -
                                                                        I(k, b)
                                                                      : 0
                                                                  : 4 & d
                                                                  ? -1
                                                                  : 1);
                                                    }
                                                  : function (a, b) {
                                                        if (a === b)
                                                            return (l = !0), 0;
                                                        var c,
                                                            d = 0,
                                                            e = a.parentNode,
                                                            f = b.parentNode,
                                                            g = [a],
                                                            h = [b];
                                                        if (!e || !f)
                                                            return a === n
                                                                ? -1
                                                                : b === n
                                                                ? 1
                                                                : e
                                                                ? -1
                                                                : f
                                                                ? 1
                                                                : k
                                                                ? I(k, a) -
                                                                  I(k, b)
                                                                : 0;
                                                        if (e === f)
                                                            return la(a, b);
                                                        c = a;

                                                        while (
                                                            (c = c.parentNode)
                                                        ) {
                                                            g.unshift(c);
                                                        }

                                                        c = b;

                                                        while (
                                                            (c = c.parentNode)
                                                        ) {
                                                            h.unshift(c);
                                                        }

                                                        while (g[d] === h[d]) {
                                                            d++;
                                                        }

                                                        return d
                                                            ? la(g[d], h[d])
                                                            : g[d] === v
                                                            ? -1
                                                            : h[d] === v
                                                            ? 1
                                                            : 0;
                                                    }),
                                              n)
                                            : n;
                                    }),
                                (ga.matches = function (a, b) {
                                    return ga(a, null, null, b);
                                }),
                                (ga.matchesSelector = function (a, b) {
                                    if (
                                        ((a.ownerDocument || a) !== n && m(a),
                                        (b = b.replace(S, "='$1']")),
                                        c.matchesSelector &&
                                            p &&
                                            !A[b + " "] &&
                                            (!r || !r.test(b)) &&
                                            (!q || !q.test(b)))
                                    )
                                        try {
                                            var d = s.call(a, b);
                                            if (
                                                d ||
                                                c.disconnectedMatch ||
                                                (a.document &&
                                                    11 !== a.document.nodeType)
                                            )
                                                return d;
                                        } catch (e) {}
                                    return ga(b, n, null, [a]).length > 0;
                                }),
                                (ga.contains = function (a, b) {
                                    return (
                                        (a.ownerDocument || a) !== n && m(a),
                                        t(a, b)
                                    );
                                }),
                                (ga.attr = function (a, b) {
                                    (a.ownerDocument || a) !== n && m(a);
                                    var e = d.attrHandle[b.toLowerCase()],
                                        f =
                                            e &&
                                            C.call(
                                                d.attrHandle,
                                                b.toLowerCase()
                                            )
                                                ? e(a, b, !p)
                                                : void 0;
                                    return void 0 !== f
                                        ? f
                                        : c.attributes || !p
                                        ? a.getAttribute(b)
                                        : (f = a.getAttributeNode(b)) &&
                                          f.specified
                                        ? f.value
                                        : null;
                                }),
                                (ga.escape = function (a) {
                                    return (a + "").replace(ba, ca);
                                }),
                                (ga.error = function (a) {
                                    throw new Error(
                                        "Syntax error, unrecognized expression: " +
                                            a
                                    );
                                }),
                                (ga.uniqueSort = function (a) {
                                    var b,
                                        d = [],
                                        e = 0,
                                        f = 0;

                                    if (
                                        ((l = !c.detectDuplicates),
                                        (k = !c.sortStable && a.slice(0)),
                                        a.sort(B),
                                        l)
                                    ) {
                                        while ((b = a[f++])) {
                                            b === a[f] && (e = d.push(f));
                                        }

                                        while (e--) {
                                            a.splice(d[e], 1);
                                        }
                                    }

                                    return (k = null), a;
                                }),
                                (e = ga.getText =
                                    function (a) {
                                        var b,
                                            c = "",
                                            d = 0,
                                            f = a.nodeType;

                                        if (f) {
                                            if (
                                                1 === f ||
                                                9 === f ||
                                                11 === f
                                            ) {
                                                if (
                                                    "string" ==
                                                    typeof a.textContent
                                                )
                                                    return a.textContent;

                                                for (
                                                    a = a.firstChild;
                                                    a;
                                                    a = a.nextSibling
                                                ) {
                                                    c += e(a);
                                                }
                                            } else if (3 === f || 4 === f)
                                                return a.nodeValue;
                                        } else
                                            while ((b = a[d++])) {
                                                c += e(b);
                                            }

                                        return c;
                                    }),
                                (d = ga.selectors =
                                    {
                                        cacheLength: 50,
                                        createPseudo: ia,
                                        match: V,
                                        attrHandle: {},
                                        find: {},
                                        relative: {
                                            ">": {
                                                dir: "parentNode",
                                                first: !0,
                                            },
                                            " ": {
                                                dir: "parentNode",
                                            },
                                            "+": {
                                                dir: "previousSibling",
                                                first: !0,
                                            },
                                            "~": {
                                                dir: "previousSibling",
                                            },
                                        },
                                        preFilter: {
                                            ATTR: function ATTR(a) {
                                                return (
                                                    (a[1] = a[1].replace(
                                                        _,
                                                        aa
                                                    )),
                                                    (a[3] = (
                                                        a[3] ||
                                                        a[4] ||
                                                        a[5] ||
                                                        ""
                                                    ).replace(_, aa)),
                                                    "~=" === a[2] &&
                                                        (a[3] =
                                                            " " + a[3] + " "),
                                                    a.slice(0, 4)
                                                );
                                            },
                                            CHILD: function CHILD(a) {
                                                return (
                                                    (a[1] = a[1].toLowerCase()),
                                                    "nth" === a[1].slice(0, 3)
                                                        ? (a[3] ||
                                                              ga.error(a[0]),
                                                          (a[4] = +(a[4]
                                                              ? a[5] +
                                                                (a[6] || 1)
                                                              : 2 *
                                                                ("even" ===
                                                                    a[3] ||
                                                                    "odd" ===
                                                                        a[3]))),
                                                          (a[5] = +(
                                                              a[7] + a[8] ||
                                                              "odd" === a[3]
                                                          )))
                                                        : a[3] &&
                                                          ga.error(a[0]),
                                                    a
                                                );
                                            },
                                            PSEUDO: function PSEUDO(a) {
                                                var b,
                                                    c = !a[6] && a[2];
                                                return V.CHILD.test(a[0])
                                                    ? null
                                                    : (a[3]
                                                          ? (a[2] =
                                                                a[4] ||
                                                                a[5] ||
                                                                "")
                                                          : c &&
                                                            T.test(c) &&
                                                            (b = g(c, !0)) &&
                                                            (b =
                                                                c.indexOf(
                                                                    ")",
                                                                    c.length - b
                                                                ) - c.length) &&
                                                            ((a[0] = a[0].slice(
                                                                0,
                                                                b
                                                            )),
                                                            (a[2] = c.slice(
                                                                0,
                                                                b
                                                            ))),
                                                      a.slice(0, 3));
                                            },
                                        },
                                        filter: {
                                            TAG: function TAG(a) {
                                                var b = a
                                                    .replace(_, aa)
                                                    .toLowerCase();
                                                return "*" === a
                                                    ? function () {
                                                          return !0;
                                                      }
                                                    : function (a) {
                                                          return (
                                                              a.nodeName &&
                                                              a.nodeName.toLowerCase() ===
                                                                  b
                                                          );
                                                      };
                                            },
                                            CLASS: function CLASS(a) {
                                                var b = y[a + " "];
                                                return (
                                                    b ||
                                                    ((b = new RegExp(
                                                        "(^|" +
                                                            K +
                                                            ")" +
                                                            a +
                                                            "(" +
                                                            K +
                                                            "|$)"
                                                    )) &&
                                                        y(a, function (a) {
                                                            return b.test(
                                                                ("string" ==
                                                                    typeof a.className &&
                                                                    a.className) ||
                                                                    ("undefined" !=
                                                                        typeof a.getAttribute &&
                                                                        a.getAttribute(
                                                                            "class"
                                                                        )) ||
                                                                    ""
                                                            );
                                                        }))
                                                );
                                            },
                                            ATTR: function ATTR(a, b, c) {
                                                return function (d) {
                                                    var e = ga.attr(d, a);
                                                    return null == e
                                                        ? "!=" === b
                                                        : !b ||
                                                              ((e += ""),
                                                              "=" === b
                                                                  ? e === c
                                                                  : "!=" === b
                                                                  ? e !== c
                                                                  : "^=" === b
                                                                  ? c &&
                                                                    0 ===
                                                                        e.indexOf(
                                                                            c
                                                                        )
                                                                  : "*=" === b
                                                                  ? c &&
                                                                    e.indexOf(
                                                                        c
                                                                    ) > -1
                                                                  : "$=" === b
                                                                  ? c &&
                                                                    e.slice(
                                                                        -c.length
                                                                    ) === c
                                                                  : "~=" === b
                                                                  ? (
                                                                        " " +
                                                                        e.replace(
                                                                            O,
                                                                            " "
                                                                        ) +
                                                                        " "
                                                                    ).indexOf(
                                                                        c
                                                                    ) > -1
                                                                  : "|=" ===
                                                                        b &&
                                                                    (e === c ||
                                                                        e.slice(
                                                                            0,
                                                                            c.length +
                                                                                1
                                                                        ) ===
                                                                            c +
                                                                                "-"));
                                                };
                                            },
                                            CHILD: function CHILD(
                                                a,
                                                b,
                                                c,
                                                d,
                                                e
                                            ) {
                                                var f = "nth" !== a.slice(0, 3),
                                                    g = "last" !== a.slice(-4),
                                                    h = "of-type" === b;
                                                return 1 === d && 0 === e
                                                    ? function (a) {
                                                          return !!a.parentNode;
                                                      }
                                                    : function (b, c, i) {
                                                          var j,
                                                              k,
                                                              l,
                                                              m,
                                                              n,
                                                              o,
                                                              p =
                                                                  f !== g
                                                                      ? "nextSibling"
                                                                      : "previousSibling",
                                                              q = b.parentNode,
                                                              r =
                                                                  h &&
                                                                  b.nodeName.toLowerCase(),
                                                              s = !i && !h,
                                                              t = !1;

                                                          if (q) {
                                                              if (f) {
                                                                  while (p) {
                                                                      m = b;

                                                                      while (
                                                                          (m =
                                                                              m[
                                                                                  p
                                                                              ])
                                                                      ) {
                                                                          if (
                                                                              h
                                                                                  ? m.nodeName.toLowerCase() ===
                                                                                    r
                                                                                  : 1 ===
                                                                                    m.nodeType
                                                                          )
                                                                              return !1;
                                                                      }

                                                                      o = p =
                                                                          "only" ===
                                                                              a &&
                                                                          !o &&
                                                                          "nextSibling";
                                                                  }

                                                                  return !0;
                                                              }

                                                              if (
                                                                  ((o = [
                                                                      g
                                                                          ? q.firstChild
                                                                          : q.lastChild,
                                                                  ]),
                                                                  g && s)
                                                              ) {
                                                                  (m = q),
                                                                      (l =
                                                                          m[
                                                                              u
                                                                          ] ||
                                                                          (m[
                                                                              u
                                                                          ] =
                                                                              {})),
                                                                      (k =
                                                                          l[
                                                                              m
                                                                                  .uniqueID
                                                                          ] ||
                                                                          (l[
                                                                              m.uniqueID
                                                                          ] =
                                                                              {})),
                                                                      (j =
                                                                          k[
                                                                              a
                                                                          ] ||
                                                                          []),
                                                                      (n =
                                                                          j[0] ===
                                                                              w &&
                                                                          j[1]),
                                                                      (t =
                                                                          n &&
                                                                          j[2]),
                                                                      (m =
                                                                          n &&
                                                                          q
                                                                              .childNodes[
                                                                              n
                                                                          ]);

                                                                  while (
                                                                      (m =
                                                                          (++n &&
                                                                              m &&
                                                                              m[
                                                                                  p
                                                                              ]) ||
                                                                          (t =
                                                                              n =
                                                                                  0) ||
                                                                          o.pop())
                                                                  ) {
                                                                      if (
                                                                          1 ===
                                                                              m.nodeType &&
                                                                          ++t &&
                                                                          m ===
                                                                              b
                                                                      ) {
                                                                          k[a] =
                                                                              [
                                                                                  w,
                                                                                  n,
                                                                                  t,
                                                                              ];
                                                                          break;
                                                                      }
                                                                  }
                                                              } else if (
                                                                  (s &&
                                                                      ((m = b),
                                                                      (l =
                                                                          m[
                                                                              u
                                                                          ] ||
                                                                          (m[
                                                                              u
                                                                          ] =
                                                                              {})),
                                                                      (k =
                                                                          l[
                                                                              m
                                                                                  .uniqueID
                                                                          ] ||
                                                                          (l[
                                                                              m.uniqueID
                                                                          ] =
                                                                              {})),
                                                                      (j =
                                                                          k[
                                                                              a
                                                                          ] ||
                                                                          []),
                                                                      (n =
                                                                          j[0] ===
                                                                              w &&
                                                                          j[1]),
                                                                      (t = n)),
                                                                  t === !1)
                                                              )
                                                                  while (
                                                                      (m =
                                                                          (++n &&
                                                                              m &&
                                                                              m[
                                                                                  p
                                                                              ]) ||
                                                                          (t =
                                                                              n =
                                                                                  0) ||
                                                                          o.pop())
                                                                  ) {
                                                                      if (
                                                                          (h
                                                                              ? m.nodeName.toLowerCase() ===
                                                                                r
                                                                              : 1 ===
                                                                                m.nodeType) &&
                                                                          ++t &&
                                                                          (s &&
                                                                              ((l =
                                                                                  m[
                                                                                      u
                                                                                  ] ||
                                                                                  (m[
                                                                                      u
                                                                                  ] =
                                                                                      {})),
                                                                              (k =
                                                                                  l[
                                                                                      m
                                                                                          .uniqueID
                                                                                  ] ||
                                                                                  (l[
                                                                                      m.uniqueID
                                                                                  ] =
                                                                                      {})),
                                                                              (k[
                                                                                  a
                                                                              ] =
                                                                                  [
                                                                                      w,
                                                                                      t,
                                                                                  ])),
                                                                          m ===
                                                                              b)
                                                                      )
                                                                          break;
                                                                  }

                                                              return (
                                                                  (t -= e),
                                                                  t === d ||
                                                                      (t % d ===
                                                                          0 &&
                                                                          t /
                                                                              d >=
                                                                              0)
                                                              );
                                                          }
                                                      };
                                            },
                                            PSEUDO: function PSEUDO(a, b) {
                                                var c,
                                                    e =
                                                        d.pseudos[a] ||
                                                        d.setFilters[
                                                            a.toLowerCase()
                                                        ] ||
                                                        ga.error(
                                                            "unsupported pseudo: " +
                                                                a
                                                        );
                                                return e[u]
                                                    ? e(b)
                                                    : e.length > 1
                                                    ? ((c = [a, a, "", b]),
                                                      d.setFilters.hasOwnProperty(
                                                          a.toLowerCase()
                                                      )
                                                          ? ia(function (a, c) {
                                                                var d,
                                                                    f = e(a, b),
                                                                    g =
                                                                        f.length;

                                                                while (g--) {
                                                                    (d = I(
                                                                        a,
                                                                        f[g]
                                                                    )),
                                                                        (a[d] =
                                                                            !(c[
                                                                                d
                                                                            ] =
                                                                                f[
                                                                                    g
                                                                                ]));
                                                                }
                                                            })
                                                          : function (a) {
                                                                return e(
                                                                    a,
                                                                    0,
                                                                    c
                                                                );
                                                            })
                                                    : e;
                                            },
                                        },
                                        pseudos: {
                                            not: ia(function (a) {
                                                var b = [],
                                                    c = [],
                                                    d = h(a.replace(P, "$1"));
                                                return d[u]
                                                    ? ia(function (a, b, c, e) {
                                                          var f,
                                                              g = d(
                                                                  a,
                                                                  null,
                                                                  e,
                                                                  []
                                                              ),
                                                              h = a.length;

                                                          while (h--) {
                                                              (f = g[h]) &&
                                                                  (a[h] = !(b[
                                                                      h
                                                                  ] = f));
                                                          }
                                                      })
                                                    : function (a, e, f) {
                                                          return (
                                                              (b[0] = a),
                                                              d(b, null, f, c),
                                                              (b[0] = null),
                                                              !c.pop()
                                                          );
                                                      };
                                            }),
                                            has: ia(function (a) {
                                                return function (b) {
                                                    return ga(a, b).length > 0;
                                                };
                                            }),
                                            contains: ia(function (a) {
                                                return (
                                                    (a = a.replace(_, aa)),
                                                    function (b) {
                                                        return (
                                                            (
                                                                b.textContent ||
                                                                b.innerText ||
                                                                e(b)
                                                            ).indexOf(a) > -1
                                                        );
                                                    }
                                                );
                                            }),
                                            lang: ia(function (a) {
                                                return (
                                                    U.test(a || "") ||
                                                        ga.error(
                                                            "unsupported lang: " +
                                                                a
                                                        ),
                                                    (a = a
                                                        .replace(_, aa)
                                                        .toLowerCase()),
                                                    function (b) {
                                                        var c;

                                                        do {
                                                            if (
                                                                (c = p
                                                                    ? b.lang
                                                                    : b.getAttribute(
                                                                          "xml:lang"
                                                                      ) ||
                                                                      b.getAttribute(
                                                                          "lang"
                                                                      ))
                                                            )
                                                                return (
                                                                    (c =
                                                                        c.toLowerCase()),
                                                                    c === a ||
                                                                        0 ===
                                                                            c.indexOf(
                                                                                a +
                                                                                    "-"
                                                                            )
                                                                );
                                                        } while (
                                                            (b =
                                                                b.parentNode) &&
                                                            1 === b.nodeType
                                                        );

                                                        return !1;
                                                    }
                                                );
                                            }),
                                            target: function target(b) {
                                                var c =
                                                    a.location &&
                                                    a.location.hash;
                                                return c && c.slice(1) === b.id;
                                            },
                                            root: function root(a) {
                                                return a === o;
                                            },
                                            focus: function focus(a) {
                                                return (
                                                    a === n.activeElement &&
                                                    (!n.hasFocus ||
                                                        n.hasFocus()) &&
                                                    !!(
                                                        a.type ||
                                                        a.href ||
                                                        ~a.tabIndex
                                                    )
                                                );
                                            },
                                            enabled: oa(!1),
                                            disabled: oa(!0),
                                            checked: function checked(a) {
                                                var b =
                                                    a.nodeName.toLowerCase();
                                                return (
                                                    ("input" === b &&
                                                        !!a.checked) ||
                                                    ("option" === b &&
                                                        !!a.selected)
                                                );
                                            },
                                            selected: function selected(a) {
                                                return (
                                                    a.parentNode &&
                                                        a.parentNode
                                                            .selectedIndex,
                                                    a.selected === !0
                                                );
                                            },
                                            empty: function empty(a) {
                                                for (
                                                    a = a.firstChild;
                                                    a;
                                                    a = a.nextSibling
                                                ) {
                                                    if (a.nodeType < 6)
                                                        return !1;
                                                }

                                                return !0;
                                            },
                                            parent: function parent(a) {
                                                return !d.pseudos.empty(a);
                                            },
                                            header: function header(a) {
                                                return X.test(a.nodeName);
                                            },
                                            input: function input(a) {
                                                return W.test(a.nodeName);
                                            },
                                            button: function button(a) {
                                                var b =
                                                    a.nodeName.toLowerCase();
                                                return (
                                                    ("input" === b &&
                                                        "button" === a.type) ||
                                                    "button" === b
                                                );
                                            },
                                            text: function text(a) {
                                                var b;
                                                return (
                                                    "input" ===
                                                        a.nodeName.toLowerCase() &&
                                                    "text" === a.type &&
                                                    (null ==
                                                        (b =
                                                            a.getAttribute(
                                                                "type"
                                                            )) ||
                                                        "text" ===
                                                            b.toLowerCase())
                                                );
                                            },
                                            first: pa(function () {
                                                return [0];
                                            }),
                                            last: pa(function (a, b) {
                                                return [b - 1];
                                            }),
                                            eq: pa(function (a, b, c) {
                                                return [c < 0 ? c + b : c];
                                            }),
                                            even: pa(function (a, b) {
                                                for (var c = 0; c < b; c += 2) {
                                                    a.push(c);
                                                }

                                                return a;
                                            }),
                                            odd: pa(function (a, b) {
                                                for (var c = 1; c < b; c += 2) {
                                                    a.push(c);
                                                }

                                                return a;
                                            }),
                                            lt: pa(function (a, b, c) {
                                                for (
                                                    var d = c < 0 ? c + b : c;
                                                    --d >= 0;

                                                ) {
                                                    a.push(d);
                                                }

                                                return a;
                                            }),
                                            gt: pa(function (a, b, c) {
                                                for (
                                                    var d = c < 0 ? c + b : c;
                                                    ++d < b;

                                                ) {
                                                    a.push(d);
                                                }

                                                return a;
                                            }),
                                        },
                                    }),
                                (d.pseudos.nth = d.pseudos.eq);

                            for (b in {
                                radio: !0,
                                checkbox: !0,
                                file: !0,
                                password: !0,
                                image: !0,
                            }) {
                                d.pseudos[b] = ma(b);
                            }

                            for (b in {
                                submit: !0,
                                reset: !0,
                            }) {
                                d.pseudos[b] = na(b);
                            }

                            function ra() {}

                            (ra.prototype = d.filters = d.pseudos),
                                (d.setFilters = new ra()),
                                (g = ga.tokenize =
                                    function (a, b) {
                                        var c,
                                            e,
                                            f,
                                            g,
                                            h,
                                            i,
                                            j,
                                            k = z[a + " "];
                                        if (k) return b ? 0 : k.slice(0);
                                        (h = a), (i = []), (j = d.preFilter);

                                        while (h) {
                                            (c && !(e = Q.exec(h))) ||
                                                (e &&
                                                    (h =
                                                        h.slice(e[0].length) ||
                                                        h),
                                                i.push((f = []))),
                                                (c = !1),
                                                (e = R.exec(h)) &&
                                                    ((c = e.shift()),
                                                    f.push({
                                                        value: c,
                                                        type: e[0].replace(
                                                            P,
                                                            " "
                                                        ),
                                                    }),
                                                    (h = h.slice(c.length)));

                                            for (g in d.filter) {
                                                !(e = V[g].exec(h)) ||
                                                    (j[g] && !(e = j[g](e))) ||
                                                    ((c = e.shift()),
                                                    f.push({
                                                        value: c,
                                                        type: g,
                                                        matches: e,
                                                    }),
                                                    (h = h.slice(c.length)));
                                            }

                                            if (!c) break;
                                        }

                                        return b
                                            ? h.length
                                            : h
                                            ? ga.error(a)
                                            : z(a, i).slice(0);
                                    });

                            function sa(a) {
                                for (
                                    var b = 0, c = a.length, d = "";
                                    b < c;
                                    b++
                                ) {
                                    d += a[b].value;
                                }

                                return d;
                            }

                            function ta(a, b, c) {
                                var d = b.dir,
                                    e = b.next,
                                    f = e || d,
                                    g = c && "parentNode" === f,
                                    h = x++;
                                return b.first
                                    ? function (b, c, e) {
                                          while ((b = b[d])) {
                                              if (1 === b.nodeType || g)
                                                  return a(b, c, e);
                                          }

                                          return !1;
                                      }
                                    : function (b, c, i) {
                                          var j,
                                              k,
                                              l,
                                              m = [w, h];

                                          if (i) {
                                              while ((b = b[d])) {
                                                  if (
                                                      (1 === b.nodeType || g) &&
                                                      a(b, c, i)
                                                  )
                                                      return !0;
                                              }
                                          } else
                                              while ((b = b[d])) {
                                                  if (1 === b.nodeType || g)
                                                      if (
                                                          ((l =
                                                              b[u] ||
                                                              (b[u] = {})),
                                                          (k =
                                                              l[b.uniqueID] ||
                                                              (l[b.uniqueID] =
                                                                  {})),
                                                          e &&
                                                              e ===
                                                                  b.nodeName.toLowerCase())
                                                      )
                                                          b = b[d] || b;
                                                      else {
                                                          if (
                                                              (j = k[f]) &&
                                                              j[0] === w &&
                                                              j[1] === h
                                                          )
                                                              return (m[2] =
                                                                  j[2]);
                                                          if (
                                                              ((k[f] = m),
                                                              (m[2] = a(
                                                                  b,
                                                                  c,
                                                                  i
                                                              )))
                                                          )
                                                              return !0;
                                                      }
                                              }

                                          return !1;
                                      };
                            }

                            function ua(a) {
                                return a.length > 1
                                    ? function (b, c, d) {
                                          var e = a.length;

                                          while (e--) {
                                              if (!a[e](b, c, d)) return !1;
                                          }

                                          return !0;
                                      }
                                    : a[0];
                            }

                            function va(a, b, c) {
                                for (var d = 0, e = b.length; d < e; d++) {
                                    ga(a, b[d], c);
                                }

                                return c;
                            }

                            function wa(a, b, c, d, e) {
                                for (
                                    var f,
                                        g = [],
                                        h = 0,
                                        i = a.length,
                                        j = null != b;
                                    h < i;
                                    h++
                                ) {
                                    (f = a[h]) &&
                                        ((c && !c(f, d, e)) ||
                                            (g.push(f), j && b.push(h)));
                                }

                                return g;
                            }

                            function xa(a, b, c, d, e, f) {
                                return (
                                    d && !d[u] && (d = xa(d)),
                                    e && !e[u] && (e = xa(e, f)),
                                    ia(function (f, g, h, i) {
                                        var j,
                                            k,
                                            l,
                                            m = [],
                                            n = [],
                                            o = g.length,
                                            p =
                                                f ||
                                                va(
                                                    b || "*",
                                                    h.nodeType ? [h] : h,
                                                    []
                                                ),
                                            q =
                                                !a || (!f && b)
                                                    ? p
                                                    : wa(p, m, a, h, i),
                                            r = c
                                                ? e || (f ? a : o || d)
                                                    ? []
                                                    : g
                                                : q;

                                        if ((c && c(q, r, h, i), d)) {
                                            (j = wa(r, n)),
                                                d(j, [], h, i),
                                                (k = j.length);

                                            while (k--) {
                                                (l = j[k]) &&
                                                    (r[n[k]] = !(q[n[k]] = l));
                                            }
                                        }

                                        if (f) {
                                            if (e || a) {
                                                if (e) {
                                                    (j = []), (k = r.length);

                                                    while (k--) {
                                                        (l = r[k]) &&
                                                            j.push((q[k] = l));
                                                    }

                                                    e(null, (r = []), j, i);
                                                }

                                                k = r.length;

                                                while (k--) {
                                                    (l = r[k]) &&
                                                        (j = e
                                                            ? I(f, l)
                                                            : m[k]) > -1 &&
                                                        (f[j] = !(g[j] = l));
                                                }
                                            }
                                        } else (r = wa(r === g ? r.splice(o, r.length) : r)), e ? e(null, g, r, i) : G.apply(g, r);
                                    })
                                );
                            }

                            function ya(a) {
                                for (
                                    var b,
                                        c,
                                        e,
                                        f = a.length,
                                        g = d.relative[a[0].type],
                                        h = g || d.relative[" "],
                                        i = g ? 1 : 0,
                                        k = ta(
                                            function (a) {
                                                return a === b;
                                            },
                                            h,
                                            !0
                                        ),
                                        l = ta(
                                            function (a) {
                                                return I(b, a) > -1;
                                            },
                                            h,
                                            !0
                                        ),
                                        m = [
                                            function (a, c, d) {
                                                var e =
                                                    (!g && (d || c !== j)) ||
                                                    ((b = c).nodeType
                                                        ? k(a, c, d)
                                                        : l(a, c, d));
                                                return (b = null), e;
                                            },
                                        ];
                                    i < f;
                                    i++
                                ) {
                                    if ((c = d.relative[a[i].type]))
                                        m = [ta(ua(m), c)];
                                    else {
                                        if (
                                            ((c = d.filter[a[i].type].apply(
                                                null,
                                                a[i].matches
                                            )),
                                            c[u])
                                        ) {
                                            for (e = ++i; e < f; e++) {
                                                if (d.relative[a[e].type])
                                                    break;
                                            }

                                            return xa(
                                                i > 1 && ua(m),
                                                i > 1 &&
                                                    sa(
                                                        a
                                                            .slice(0, i - 1)
                                                            .concat({
                                                                value:
                                                                    " " ===
                                                                    a[i - 2]
                                                                        .type
                                                                        ? "*"
                                                                        : "",
                                                            })
                                                    ).replace(P, "$1"),
                                                c,
                                                i < e && ya(a.slice(i, e)),
                                                e < f && ya((a = a.slice(e))),
                                                e < f && sa(a)
                                            );
                                        }

                                        m.push(c);
                                    }
                                }

                                return ua(m);
                            }

                            function za(a, b) {
                                var c = b.length > 0,
                                    e = a.length > 0,
                                    f = function f(_f, g, h, i, k) {
                                        var l,
                                            o,
                                            q,
                                            r = 0,
                                            s = "0",
                                            t = _f && [],
                                            u = [],
                                            v = j,
                                            x = _f || (e && d.find.TAG("*", k)),
                                            y = (w +=
                                                null == v
                                                    ? 1
                                                    : Math.random() || 0.1),
                                            z = x.length;

                                        for (
                                            k && (j = g === n || g || k);
                                            s !== z && null != (l = x[s]);
                                            s++
                                        ) {
                                            if (e && l) {
                                                (o = 0),
                                                    g ||
                                                        l.ownerDocument === n ||
                                                        (m(l), (h = !p));

                                                while ((q = a[o++])) {
                                                    if (q(l, g || n, h)) {
                                                        i.push(l);
                                                        break;
                                                    }
                                                }

                                                k && (w = y);
                                            }

                                            c &&
                                                ((l = !q && l) && r--,
                                                _f && t.push(l));
                                        }

                                        if (((r += s), c && s !== r)) {
                                            o = 0;

                                            while ((q = b[o++])) {
                                                q(t, u, g, h);
                                            }

                                            if (_f) {
                                                if (r > 0)
                                                    while (s--) {
                                                        t[s] ||
                                                            u[s] ||
                                                            (u[s] = E.call(i));
                                                    }
                                                u = wa(u);
                                            }

                                            G.apply(i, u),
                                                k &&
                                                    !_f &&
                                                    u.length > 0 &&
                                                    r + b.length > 1 &&
                                                    ga.uniqueSort(i);
                                        }

                                        return k && ((w = y), (j = v)), t;
                                    };

                                return c ? ia(f) : f;
                            }

                            return (
                                (h = ga.compile =
                                    function (a, b) {
                                        var c,
                                            d = [],
                                            e = [],
                                            f = A[a + " "];

                                        if (!f) {
                                            b || (b = g(a)), (c = b.length);

                                            while (c--) {
                                                (f = ya(b[c])),
                                                    f[u]
                                                        ? d.push(f)
                                                        : e.push(f);
                                            }

                                            (f = A(a, za(e, d))),
                                                (f.selector = a);
                                        }

                                        return f;
                                    }),
                                (i = ga.select =
                                    function (a, b, c, e) {
                                        var f,
                                            i,
                                            j,
                                            k,
                                            l,
                                            m = "function" == typeof a && a,
                                            n = !e && g((a = m.selector || a));

                                        if (((c = c || []), 1 === n.length)) {
                                            if (
                                                ((i = n[0] = n[0].slice(0)),
                                                i.length > 2 &&
                                                    "ID" === (j = i[0]).type &&
                                                    9 === b.nodeType &&
                                                    p &&
                                                    d.relative[i[1].type])
                                            ) {
                                                if (
                                                    ((b = (d.find.ID(
                                                        j.matches[0].replace(
                                                            _,
                                                            aa
                                                        ),
                                                        b
                                                    ) || [])[0]),
                                                    !b)
                                                )
                                                    return c;
                                                m && (b = b.parentNode),
                                                    (a = a.slice(
                                                        i.shift().value.length
                                                    ));
                                            }

                                            f = V.needsContext.test(a)
                                                ? 0
                                                : i.length;

                                            while (f--) {
                                                if (
                                                    ((j = i[f]),
                                                    d.relative[(k = j.type)])
                                                )
                                                    break;

                                                if (
                                                    (l = d.find[k]) &&
                                                    (e = l(
                                                        j.matches[0].replace(
                                                            _,
                                                            aa
                                                        ),
                                                        ($.test(i[0].type) &&
                                                            qa(b.parentNode)) ||
                                                            b
                                                    ))
                                                ) {
                                                    if (
                                                        (i.splice(f, 1),
                                                        (a = e.length && sa(i)),
                                                        !a)
                                                    )
                                                        return G.apply(c, e), c;
                                                    break;
                                                }
                                            }
                                        }

                                        return (
                                            (m || h(a, n))(
                                                e,
                                                b,
                                                !p,
                                                c,
                                                !b ||
                                                    ($.test(a) &&
                                                        qa(b.parentNode)) ||
                                                    b
                                            ),
                                            c
                                        );
                                    }),
                                (c.sortStable =
                                    u.split("").sort(B).join("") === u),
                                (c.detectDuplicates = !!l),
                                m(),
                                (c.sortDetached = ja(function (a) {
                                    return (
                                        1 &
                                        a.compareDocumentPosition(
                                            n.createElement("fieldset")
                                        )
                                    );
                                })),
                                ja(function (a) {
                                    return (
                                        (a.innerHTML = "<a href='#'></a>"),
                                        "#" ===
                                            a.firstChild.getAttribute("href")
                                    );
                                }) ||
                                    ka(
                                        "type|href|height|width",
                                        function (a, b, c) {
                                            if (!c)
                                                return a.getAttribute(
                                                    b,
                                                    "type" === b.toLowerCase()
                                                        ? 1
                                                        : 2
                                                );
                                        }
                                    ),
                                (c.attributes &&
                                    ja(function (a) {
                                        return (
                                            (a.innerHTML = "<input/>"),
                                            a.firstChild.setAttribute(
                                                "value",
                                                ""
                                            ),
                                            "" ===
                                                a.firstChild.getAttribute(
                                                    "value"
                                                )
                                        );
                                    })) ||
                                    ka("value", function (a, b, c) {
                                        if (
                                            !c &&
                                            "input" === a.nodeName.toLowerCase()
                                        )
                                            return a.defaultValue;
                                    }),
                                ja(function (a) {
                                    return null == a.getAttribute("disabled");
                                }) ||
                                    ka(J, function (a, b, c) {
                                        var d;
                                        if (!c)
                                            return a[b] === !0
                                                ? b.toLowerCase()
                                                : (d = a.getAttributeNode(b)) &&
                                                  d.specified
                                                ? d.value
                                                : null;
                                    }),
                                ga
                            );
                        })(a);

                        (r.find = x),
                            (r.expr = x.selectors),
                            (r.expr[":"] = r.expr.pseudos),
                            (r.uniqueSort = r.unique = x.uniqueSort),
                            (r.text = x.getText),
                            (r.isXMLDoc = x.isXML),
                            (r.contains = x.contains),
                            (r.escapeSelector = x.escape);

                        var y = function y(a, b, c) {
                                var d = [],
                                    e = void 0 !== c;

                                while ((a = a[b]) && 9 !== a.nodeType) {
                                    if (1 === a.nodeType) {
                                        if (e && r(a).is(c)) break;
                                        d.push(a);
                                    }
                                }

                                return d;
                            },
                            z = function z(a, b) {
                                for (var c = []; a; a = a.nextSibling) {
                                    1 === a.nodeType && a !== b && c.push(a);
                                }

                                return c;
                            },
                            A = r.expr.match.needsContext;

                        function B(a, b) {
                            return (
                                a.nodeName &&
                                a.nodeName.toLowerCase() === b.toLowerCase()
                            );
                        }

                        var C =
                                /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
                            D = /^.[^:#\[\.,]*$/;

                        function E(a, b, c) {
                            return r.isFunction(b)
                                ? r.grep(a, function (a, d) {
                                      return !!b.call(a, d, a) !== c;
                                  })
                                : b.nodeType
                                ? r.grep(a, function (a) {
                                      return (a === b) !== c;
                                  })
                                : "string" != typeof b
                                ? r.grep(a, function (a) {
                                      return i.call(b, a) > -1 !== c;
                                  })
                                : D.test(b)
                                ? r.filter(b, a, c)
                                : ((b = r.filter(b, a)),
                                  r.grep(a, function (a) {
                                      return (
                                          i.call(b, a) > -1 !== c &&
                                          1 === a.nodeType
                                      );
                                  }));
                        }

                        (r.filter = function (a, b, c) {
                            var d = b[0];
                            return (
                                c && (a = ":not(" + a + ")"),
                                1 === b.length && 1 === d.nodeType
                                    ? r.find.matchesSelector(d, a)
                                        ? [d]
                                        : []
                                    : r.find.matches(
                                          a,
                                          r.grep(b, function (a) {
                                              return 1 === a.nodeType;
                                          })
                                      )
                            );
                        }),
                            r.fn.extend({
                                find: function find(a) {
                                    var b,
                                        c,
                                        d = this.length,
                                        e = this;
                                    if ("string" != typeof a)
                                        return this.pushStack(
                                            r(a).filter(function () {
                                                for (b = 0; b < d; b++) {
                                                    if (r.contains(e[b], this))
                                                        return !0;
                                                }
                                            })
                                        );

                                    for (
                                        c = this.pushStack([]), b = 0;
                                        b < d;
                                        b++
                                    ) {
                                        r.find(a, e[b], c);
                                    }

                                    return d > 1 ? r.uniqueSort(c) : c;
                                },
                                filter: function filter(a) {
                                    return this.pushStack(E(this, a || [], !1));
                                },
                                not: function not(a) {
                                    return this.pushStack(E(this, a || [], !0));
                                },
                                is: function is(a) {
                                    return !!E(
                                        this,
                                        "string" == typeof a && A.test(a)
                                            ? r(a)
                                            : a || [],
                                        !1
                                    ).length;
                                },
                            });

                        var F,
                            G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
                            H = (r.fn.init = function (a, b, c) {
                                var e, f;
                                if (!a) return this;

                                if (((c = c || F), "string" == typeof a)) {
                                    if (
                                        ((e =
                                            "<" === a[0] &&
                                            ">" === a[a.length - 1] &&
                                            a.length >= 3
                                                ? [null, a, null]
                                                : G.exec(a)),
                                        !e || (!e[1] && b))
                                    )
                                        return !b || b.jquery
                                            ? (b || c).find(a)
                                            : this.constructor(b).find(a);

                                    if (e[1]) {
                                        if (
                                            ((b = b instanceof r ? b[0] : b),
                                            r.merge(
                                                this,
                                                r.parseHTML(
                                                    e[1],
                                                    b && b.nodeType
                                                        ? b.ownerDocument || b
                                                        : d,
                                                    !0
                                                )
                                            ),
                                            C.test(e[1]) && r.isPlainObject(b))
                                        )
                                            for (e in b) {
                                                r.isFunction(this[e])
                                                    ? this[e](b[e])
                                                    : this.attr(e, b[e]);
                                            }
                                        return this;
                                    }

                                    return (
                                        (f = d.getElementById(e[2])),
                                        f && ((this[0] = f), (this.length = 1)),
                                        this
                                    );
                                }

                                return a.nodeType
                                    ? ((this[0] = a), (this.length = 1), this)
                                    : r.isFunction(a)
                                    ? void 0 !== c.ready
                                        ? c.ready(a)
                                        : a(r)
                                    : r.makeArray(a, this);
                            });

                        (H.prototype = r.fn), (F = r(d));
                        var I = /^(?:parents|prev(?:Until|All))/,
                            J = {
                                children: !0,
                                contents: !0,
                                next: !0,
                                prev: !0,
                            };
                        r.fn.extend({
                            has: function has(a) {
                                var b = r(a, this),
                                    c = b.length;
                                return this.filter(function () {
                                    for (var a = 0; a < c; a++) {
                                        if (r.contains(this, b[a])) return !0;
                                    }
                                });
                            },
                            closest: function closest(a, b) {
                                var c,
                                    d = 0,
                                    e = this.length,
                                    f = [],
                                    g = "string" != typeof a && r(a);
                                if (!A.test(a))
                                    for (; d < e; d++) {
                                        for (
                                            c = this[d];
                                            c && c !== b;
                                            c = c.parentNode
                                        ) {
                                            if (
                                                c.nodeType < 11 &&
                                                (g
                                                    ? g.index(c) > -1
                                                    : 1 === c.nodeType &&
                                                      r.find.matchesSelector(
                                                          c,
                                                          a
                                                      ))
                                            ) {
                                                f.push(c);
                                                break;
                                            }
                                        }
                                    }
                                return this.pushStack(
                                    f.length > 1 ? r.uniqueSort(f) : f
                                );
                            },
                            index: function index(a) {
                                return a
                                    ? "string" == typeof a
                                        ? i.call(r(a), this[0])
                                        : i.call(this, a.jquery ? a[0] : a)
                                    : this[0] && this[0].parentNode
                                    ? this.first().prevAll().length
                                    : -1;
                            },
                            add: function add(a, b) {
                                return this.pushStack(
                                    r.uniqueSort(r.merge(this.get(), r(a, b)))
                                );
                            },
                            addBack: function addBack(a) {
                                return this.add(
                                    null == a
                                        ? this.prevObject
                                        : this.prevObject.filter(a)
                                );
                            },
                        });

                        function K(a, b) {
                            while ((a = a[b]) && 1 !== a.nodeType) {}

                            return a;
                        }

                        r.each(
                            {
                                parent: function parent(a) {
                                    var b = a.parentNode;
                                    return b && 11 !== b.nodeType ? b : null;
                                },
                                parents: function parents(a) {
                                    return y(a, "parentNode");
                                },
                                parentsUntil: function parentsUntil(a, b, c) {
                                    return y(a, "parentNode", c);
                                },
                                next: function next(a) {
                                    return K(a, "nextSibling");
                                },
                                prev: function prev(a) {
                                    return K(a, "previousSibling");
                                },
                                nextAll: function nextAll(a) {
                                    return y(a, "nextSibling");
                                },
                                prevAll: function prevAll(a) {
                                    return y(a, "previousSibling");
                                },
                                nextUntil: function nextUntil(a, b, c) {
                                    return y(a, "nextSibling", c);
                                },
                                prevUntil: function prevUntil(a, b, c) {
                                    return y(a, "previousSibling", c);
                                },
                                siblings: function siblings(a) {
                                    return z(
                                        (a.parentNode || {}).firstChild,
                                        a
                                    );
                                },
                                children: function children(a) {
                                    return z(a.firstChild);
                                },
                                contents: function contents(a) {
                                    return B(a, "iframe")
                                        ? a.contentDocument
                                        : (B(a, "template") &&
                                              (a = a.content || a),
                                          r.merge([], a.childNodes));
                                },
                            },
                            function (a, b) {
                                r.fn[a] = function (c, d) {
                                    var e = r.map(this, b, c);
                                    return (
                                        "Until" !== a.slice(-5) && (d = c),
                                        d &&
                                            "string" == typeof d &&
                                            (e = r.filter(d, e)),
                                        this.length > 1 &&
                                            (J[a] || r.uniqueSort(e),
                                            I.test(a) && e.reverse()),
                                        this.pushStack(e)
                                    );
                                };
                            }
                        );
                        var L = /[^\x20\t\r\n\f]+/g;

                        function M(a) {
                            var b = {};
                            return (
                                r.each(a.match(L) || [], function (a, c) {
                                    b[c] = !0;
                                }),
                                b
                            );
                        }

                        r.Callbacks = function (a) {
                            a = "string" == typeof a ? M(a) : r.extend({}, a);

                            var b,
                                c,
                                d,
                                e,
                                f = [],
                                g = [],
                                h = -1,
                                i = function i() {
                                    for (
                                        e = e || a.once, d = b = !0;
                                        g.length;
                                        h = -1
                                    ) {
                                        c = g.shift();

                                        while (++h < f.length) {
                                            f[h].apply(c[0], c[1]) === !1 &&
                                                a.stopOnFalse &&
                                                ((h = f.length), (c = !1));
                                        }
                                    }

                                    a.memory || (c = !1),
                                        (b = !1),
                                        e && (f = c ? [] : "");
                                },
                                j = {
                                    add: function add() {
                                        return (
                                            f &&
                                                (c &&
                                                    !b &&
                                                    ((h = f.length - 1),
                                                    g.push(c)),
                                                (function d(b) {
                                                    r.each(b, function (b, c) {
                                                        r.isFunction(c)
                                                            ? (a.unique &&
                                                                  j.has(c)) ||
                                                              f.push(c)
                                                            : c &&
                                                              c.length &&
                                                              "string" !==
                                                                  r.type(c) &&
                                                              d(c);
                                                    });
                                                })(arguments),
                                                c && !b && i()),
                                            this
                                        );
                                    },
                                    remove: function remove() {
                                        return (
                                            r.each(arguments, function (a, b) {
                                                var c;

                                                while (
                                                    (c = r.inArray(b, f, c)) >
                                                    -1
                                                ) {
                                                    f.splice(c, 1),
                                                        c <= h && h--;
                                                }
                                            }),
                                            this
                                        );
                                    },
                                    has: function has(a) {
                                        return a
                                            ? r.inArray(a, f) > -1
                                            : f.length > 0;
                                    },
                                    empty: function empty() {
                                        return f && (f = []), this;
                                    },
                                    disable: function disable() {
                                        return (e = g = []), (f = c = ""), this;
                                    },
                                    disabled: function disabled() {
                                        return !f;
                                    },
                                    lock: function lock() {
                                        return (
                                            (e = g = []),
                                            c || b || (f = c = ""),
                                            this
                                        );
                                    },
                                    locked: function locked() {
                                        return !!e;
                                    },
                                    fireWith: function fireWith(a, c) {
                                        return (
                                            e ||
                                                ((c = c || []),
                                                (c = [
                                                    a,
                                                    c.slice ? c.slice() : c,
                                                ]),
                                                g.push(c),
                                                b || i()),
                                            this
                                        );
                                    },
                                    fire: function fire() {
                                        return (
                                            j.fireWith(this, arguments), this
                                        );
                                    },
                                    fired: function fired() {
                                        return !!d;
                                    },
                                };

                            return j;
                        };

                        function N(a) {
                            return a;
                        }

                        function O(a) {
                            throw a;
                        }

                        function P(a, b, c, d) {
                            var e;

                            try {
                                a && r.isFunction((e = a.promise))
                                    ? e.call(a).done(b).fail(c)
                                    : a && r.isFunction((e = a.then))
                                    ? e.call(a, b, c)
                                    : b.apply(void 0, [a].slice(d));
                            } catch (a) {
                                c.apply(void 0, [a]);
                            }
                        }

                        r.extend({
                            Deferred: function Deferred(b) {
                                var c = [
                                        [
                                            "notify",
                                            "progress",
                                            r.Callbacks("memory"),
                                            r.Callbacks("memory"),
                                            2,
                                        ],
                                        [
                                            "resolve",
                                            "done",
                                            r.Callbacks("once memory"),
                                            r.Callbacks("once memory"),
                                            0,
                                            "resolved",
                                        ],
                                        [
                                            "reject",
                                            "fail",
                                            r.Callbacks("once memory"),
                                            r.Callbacks("once memory"),
                                            1,
                                            "rejected",
                                        ],
                                    ],
                                    d = "pending",
                                    e = {
                                        state: function state() {
                                            return d;
                                        },
                                        always: function always() {
                                            return (
                                                f
                                                    .done(arguments)
                                                    .fail(arguments),
                                                this
                                            );
                                        },
                                        catch: function _catch(a) {
                                            return e.then(null, a);
                                        },
                                        pipe: function pipe() {
                                            var a = arguments;
                                            return r
                                                .Deferred(function (b) {
                                                    r.each(c, function (c, d) {
                                                        var e =
                                                            r.isFunction(
                                                                a[d[4]]
                                                            ) && a[d[4]];
                                                        f[d[1]](function () {
                                                            var a =
                                                                e &&
                                                                e.apply(
                                                                    this,
                                                                    arguments
                                                                );
                                                            a &&
                                                            r.isFunction(
                                                                a.promise
                                                            )
                                                                ? a
                                                                      .promise()
                                                                      .progress(
                                                                          b.notify
                                                                      )
                                                                      .done(
                                                                          b.resolve
                                                                      )
                                                                      .fail(
                                                                          b.reject
                                                                      )
                                                                : b[
                                                                      d[0] +
                                                                          "With"
                                                                  ](
                                                                      this,
                                                                      e
                                                                          ? [a]
                                                                          : arguments
                                                                  );
                                                        });
                                                    }),
                                                        (a = null);
                                                })
                                                .promise();
                                        },
                                        then: function then(b, d, e) {
                                            var f = 0;

                                            function g(b, c, d, e) {
                                                return function () {
                                                    var h = this,
                                                        i = arguments,
                                                        j = function j() {
                                                            var a, j;

                                                            if (!(b < f)) {
                                                                if (
                                                                    ((a =
                                                                        d.apply(
                                                                            h,
                                                                            i
                                                                        )),
                                                                    a ===
                                                                        c.promise())
                                                                )
                                                                    throw new TypeError(
                                                                        "Thenable self-resolution"
                                                                    );
                                                                (j =
                                                                    a &&
                                                                    ("object" ==
                                                                        _typeof(
                                                                            a
                                                                        ) ||
                                                                        "function" ==
                                                                            typeof a) &&
                                                                    a.then),
                                                                    r.isFunction(
                                                                        j
                                                                    )
                                                                        ? e
                                                                            ? j.call(
                                                                                  a,
                                                                                  g(
                                                                                      f,
                                                                                      c,
                                                                                      N,
                                                                                      e
                                                                                  ),
                                                                                  g(
                                                                                      f,
                                                                                      c,
                                                                                      O,
                                                                                      e
                                                                                  )
                                                                              )
                                                                            : (f++,
                                                                              j.call(
                                                                                  a,
                                                                                  g(
                                                                                      f,
                                                                                      c,
                                                                                      N,
                                                                                      e
                                                                                  ),
                                                                                  g(
                                                                                      f,
                                                                                      c,
                                                                                      O,
                                                                                      e
                                                                                  ),
                                                                                  g(
                                                                                      f,
                                                                                      c,
                                                                                      N,
                                                                                      c.notifyWith
                                                                                  )
                                                                              ))
                                                                        : (d !==
                                                                              N &&
                                                                              ((h =
                                                                                  void 0),
                                                                              (i =
                                                                                  [
                                                                                      a,
                                                                                  ])),
                                                                          (
                                                                              e ||
                                                                              c.resolveWith
                                                                          )(
                                                                              h,
                                                                              i
                                                                          ));
                                                            }
                                                        },
                                                        k = e
                                                            ? j
                                                            : function () {
                                                                  try {
                                                                      j();
                                                                  } catch (a) {
                                                                      r.Deferred
                                                                          .exceptionHook &&
                                                                          r.Deferred.exceptionHook(
                                                                              a,
                                                                              k.stackTrace
                                                                          ),
                                                                          b +
                                                                              1 >=
                                                                              f &&
                                                                              (d !==
                                                                                  O &&
                                                                                  ((h =
                                                                                      void 0),
                                                                                  (i =
                                                                                      [
                                                                                          a,
                                                                                      ])),
                                                                              c.rejectWith(
                                                                                  h,
                                                                                  i
                                                                              ));
                                                                  }
                                                              };

                                                    b
                                                        ? k()
                                                        : (r.Deferred
                                                              .getStackHook &&
                                                              (k.stackTrace =
                                                                  r.Deferred.getStackHook()),
                                                          a.setTimeout(k));
                                                };
                                            }

                                            return r
                                                .Deferred(function (a) {
                                                    c[0][3].add(
                                                        g(
                                                            0,
                                                            a,
                                                            r.isFunction(e)
                                                                ? e
                                                                : N,
                                                            a.notifyWith
                                                        )
                                                    ),
                                                        c[1][3].add(
                                                            g(
                                                                0,
                                                                a,
                                                                r.isFunction(b)
                                                                    ? b
                                                                    : N
                                                            )
                                                        ),
                                                        c[2][3].add(
                                                            g(
                                                                0,
                                                                a,
                                                                r.isFunction(d)
                                                                    ? d
                                                                    : O
                                                            )
                                                        );
                                                })
                                                .promise();
                                        },
                                        promise: function promise(a) {
                                            return null != a
                                                ? r.extend(a, e)
                                                : e;
                                        },
                                    },
                                    f = {};
                                return (
                                    r.each(c, function (a, b) {
                                        var g = b[2],
                                            h = b[5];
                                        (e[b[1]] = g.add),
                                            h &&
                                                g.add(
                                                    function () {
                                                        d = h;
                                                    },
                                                    c[3 - a][2].disable,
                                                    c[0][2].lock
                                                ),
                                            g.add(b[3].fire),
                                            (f[b[0]] = function () {
                                                return (
                                                    f[b[0] + "With"](
                                                        this === f
                                                            ? void 0
                                                            : this,
                                                        arguments
                                                    ),
                                                    this
                                                );
                                            }),
                                            (f[b[0] + "With"] = g.fireWith);
                                    }),
                                    e.promise(f),
                                    b && b.call(f, f),
                                    f
                                );
                            },
                            when: function when(a) {
                                var b = arguments.length,
                                    c = b,
                                    d = Array(c),
                                    e = f.call(arguments),
                                    g = r.Deferred(),
                                    h = function h(a) {
                                        return function (c) {
                                            (d[a] = this),
                                                (e[a] =
                                                    arguments.length > 1
                                                        ? f.call(arguments)
                                                        : c),
                                                --b || g.resolveWith(d, e);
                                        };
                                    };

                                if (
                                    b <= 1 &&
                                    (P(a, g.done(h(c)).resolve, g.reject, !b),
                                    "pending" === g.state() ||
                                        r.isFunction(e[c] && e[c].then))
                                )
                                    return g.then();

                                while (c--) {
                                    P(e[c], h(c), g.reject);
                                }

                                return g.promise();
                            },
                        });
                        var Q =
                            /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
                        (r.Deferred.exceptionHook = function (b, c) {
                            a.console &&
                                a.console.warn &&
                                b &&
                                Q.test(b.name) &&
                                a.console.warn(
                                    "jQuery.Deferred exception: " + b.message,
                                    b.stack,
                                    c
                                );
                        }),
                            (r.readyException = function (b) {
                                a.setTimeout(function () {
                                    throw b;
                                });
                            });
                        var R = r.Deferred();
                        (r.fn.ready = function (a) {
                            return (
                                R.then(a)["catch"](function (a) {
                                    r.readyException(a);
                                }),
                                this
                            );
                        }),
                            r.extend({
                                isReady: !1,
                                readyWait: 1,
                                ready: function ready(a) {
                                    (a === !0 ? --r.readyWait : r.isReady) ||
                                        ((r.isReady = !0),
                                        (a !== !0 && --r.readyWait > 0) ||
                                            R.resolveWith(d, [r]));
                                },
                            }),
                            (r.ready.then = R.then);

                        function S() {
                            d.removeEventListener("DOMContentLoaded", S),
                                a.removeEventListener("load", S),
                                r.ready();
                        }

                        "complete" === d.readyState ||
                        ("loading" !== d.readyState &&
                            !d.documentElement.doScroll)
                            ? a.setTimeout(r.ready)
                            : (d.addEventListener("DOMContentLoaded", S),
                              a.addEventListener("load", S));

                        var T = function T(a, b, c, d, e, f, g) {
                                var h = 0,
                                    i = a.length,
                                    j = null == c;

                                if ("object" === r.type(c)) {
                                    e = !0;

                                    for (h in c) {
                                        T(a, b, h, c[h], !0, f, g);
                                    }
                                } else if (
                                    void 0 !== d &&
                                    ((e = !0),
                                    r.isFunction(d) || (g = !0),
                                    j &&
                                        (g
                                            ? (b.call(a, d), (b = null))
                                            : ((j = b),
                                              (b = function b(a, _b, c) {
                                                  return j.call(r(a), c);
                                              }))),
                                    b)
                                )
                                    for (; h < i; h++) {
                                        b(
                                            a[h],
                                            c,
                                            g ? d : d.call(a[h], h, b(a[h], c))
                                        );
                                    }

                                return e
                                    ? a
                                    : j
                                    ? b.call(a)
                                    : i
                                    ? b(a[0], c)
                                    : f;
                            },
                            U = function U(a) {
                                return (
                                    1 === a.nodeType ||
                                    9 === a.nodeType ||
                                    !+a.nodeType
                                );
                            };

                        function V() {
                            this.expando = r.expando + V.uid++;
                        }

                        (V.uid = 1),
                            (V.prototype = {
                                cache: function cache(a) {
                                    var b = a[this.expando];
                                    return (
                                        b ||
                                            ((b = {}),
                                            U(a) &&
                                                (a.nodeType
                                                    ? (a[this.expando] = b)
                                                    : Object.defineProperty(
                                                          a,
                                                          this.expando,
                                                          {
                                                              value: b,
                                                              configurable: !0,
                                                          }
                                                      ))),
                                        b
                                    );
                                },
                                set: function set(a, b, c) {
                                    var d,
                                        e = this.cache(a);
                                    if ("string" == typeof b)
                                        e[r.camelCase(b)] = c;
                                    else
                                        for (d in b) {
                                            e[r.camelCase(d)] = b[d];
                                        }
                                    return e;
                                },
                                get: function get(a, b) {
                                    return void 0 === b
                                        ? this.cache(a)
                                        : a[this.expando] &&
                                              a[this.expando][r.camelCase(b)];
                                },
                                access: function access(a, b, c) {
                                    return void 0 === b ||
                                        (b &&
                                            "string" == typeof b &&
                                            void 0 === c)
                                        ? this.get(a, b)
                                        : (this.set(a, b, c),
                                          void 0 !== c ? c : b);
                                },
                                remove: function remove(a, b) {
                                    var c,
                                        d = a[this.expando];

                                    if (void 0 !== d) {
                                        if (void 0 !== b) {
                                            Array.isArray(b)
                                                ? (b = b.map(r.camelCase))
                                                : ((b = r.camelCase(b)),
                                                  (b =
                                                      b in d
                                                          ? [b]
                                                          : b.match(L) || [])),
                                                (c = b.length);

                                            while (c--) {
                                                delete d[b[c]];
                                            }
                                        }

                                        (void 0 === b || r.isEmptyObject(d)) &&
                                            (a.nodeType
                                                ? (a[this.expando] = void 0)
                                                : delete a[this.expando]);
                                    }
                                },
                                hasData: function hasData(a) {
                                    var b = a[this.expando];
                                    return void 0 !== b && !r.isEmptyObject(b);
                                },
                            });
                        var W = new V(),
                            X = new V(),
                            Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                            Z = /[A-Z]/g;

                        function $(a) {
                            return (
                                "true" === a ||
                                ("false" !== a &&
                                    ("null" === a
                                        ? null
                                        : a === +a + ""
                                        ? +a
                                        : Y.test(a)
                                        ? JSON.parse(a)
                                        : a))
                            );
                        }

                        function _(a, b, c) {
                            var d;
                            if (void 0 === c && 1 === a.nodeType)
                                if (
                                    ((d =
                                        "data-" +
                                        b.replace(Z, "-$&").toLowerCase()),
                                    (c = a.getAttribute(d)),
                                    "string" == typeof c)
                                ) {
                                    try {
                                        c = $(c);
                                    } catch (e) {}

                                    X.set(a, b, c);
                                } else c = void 0;
                            return c;
                        }

                        r.extend({
                            hasData: function hasData(a) {
                                return X.hasData(a) || W.hasData(a);
                            },
                            data: function data(a, b, c) {
                                return X.access(a, b, c);
                            },
                            removeData: function removeData(a, b) {
                                X.remove(a, b);
                            },
                            _data: function _data(a, b, c) {
                                return W.access(a, b, c);
                            },
                            _removeData: function _removeData(a, b) {
                                W.remove(a, b);
                            },
                        }),
                            r.fn.extend({
                                data: function data(a, b) {
                                    var c,
                                        d,
                                        e,
                                        f = this[0],
                                        g = f && f.attributes;

                                    if (void 0 === a) {
                                        if (
                                            this.length &&
                                            ((e = X.get(f)),
                                            1 === f.nodeType &&
                                                !W.get(f, "hasDataAttrs"))
                                        ) {
                                            c = g.length;

                                            while (c--) {
                                                g[c] &&
                                                    ((d = g[c].name),
                                                    0 === d.indexOf("data-") &&
                                                        ((d = r.camelCase(
                                                            d.slice(5)
                                                        )),
                                                        _(f, d, e[d])));
                                            }

                                            W.set(f, "hasDataAttrs", !0);
                                        }

                                        return e;
                                    }

                                    return "object" == _typeof(a)
                                        ? this.each(function () {
                                              X.set(this, a);
                                          })
                                        : T(
                                              this,
                                              function (b) {
                                                  var c;

                                                  if (f && void 0 === b) {
                                                      if (
                                                          ((c = X.get(f, a)),
                                                          void 0 !== c)
                                                      )
                                                          return c;
                                                      if (
                                                          ((c = _(f, a)),
                                                          void 0 !== c)
                                                      )
                                                          return c;
                                                  } else
                                                      this.each(function () {
                                                          X.set(this, a, b);
                                                      });
                                              },
                                              null,
                                              b,
                                              arguments.length > 1,
                                              null,
                                              !0
                                          );
                                },
                                removeData: function removeData(a) {
                                    return this.each(function () {
                                        X.remove(this, a);
                                    });
                                },
                            }),
                            r.extend({
                                queue: function queue(a, b, c) {
                                    var d;
                                    if (a)
                                        return (
                                            (b = (b || "fx") + "queue"),
                                            (d = W.get(a, b)),
                                            c &&
                                                (!d || Array.isArray(c)
                                                    ? (d = W.access(
                                                          a,
                                                          b,
                                                          r.makeArray(c)
                                                      ))
                                                    : d.push(c)),
                                            d || []
                                        );
                                },
                                dequeue: function dequeue(a, b) {
                                    b = b || "fx";

                                    var c = r.queue(a, b),
                                        d = c.length,
                                        e = c.shift(),
                                        f = r._queueHooks(a, b),
                                        g = function g() {
                                            r.dequeue(a, b);
                                        };

                                    "inprogress" === e &&
                                        ((e = c.shift()), d--),
                                        e &&
                                            ("fx" === b &&
                                                c.unshift("inprogress"),
                                            delete f.stop,
                                            e.call(a, g, f)),
                                        !d && f && f.empty.fire();
                                },
                                _queueHooks: function _queueHooks(a, b) {
                                    var c = b + "queueHooks";
                                    return (
                                        W.get(a, c) ||
                                        W.access(a, c, {
                                            empty: r
                                                .Callbacks("once memory")
                                                .add(function () {
                                                    W.remove(a, [
                                                        b + "queue",
                                                        c,
                                                    ]);
                                                }),
                                        })
                                    );
                                },
                            }),
                            r.fn.extend({
                                queue: function queue(a, b) {
                                    var c = 2;
                                    return (
                                        "string" != typeof a &&
                                            ((b = a), (a = "fx"), c--),
                                        arguments.length < c
                                            ? r.queue(this[0], a)
                                            : void 0 === b
                                            ? this
                                            : this.each(function () {
                                                  var c = r.queue(this, a, b);
                                                  r._queueHooks(this, a),
                                                      "fx" === a &&
                                                          "inprogress" !==
                                                              c[0] &&
                                                          r.dequeue(this, a);
                                              })
                                    );
                                },
                                dequeue: function dequeue(a) {
                                    return this.each(function () {
                                        r.dequeue(this, a);
                                    });
                                },
                                clearQueue: function clearQueue(a) {
                                    return this.queue(a || "fx", []);
                                },
                                promise: function promise(a, b) {
                                    var c,
                                        d = 1,
                                        e = r.Deferred(),
                                        f = this,
                                        g = this.length,
                                        h = function h() {
                                            --d || e.resolveWith(f, [f]);
                                        };

                                    "string" != typeof a &&
                                        ((b = a), (a = void 0)),
                                        (a = a || "fx");

                                    while (g--) {
                                        (c = W.get(f[g], a + "queueHooks")),
                                            c &&
                                                c.empty &&
                                                (d++, c.empty.add(h));
                                    }

                                    return h(), e.promise(b);
                                },
                            });

                        var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                            ba = new RegExp(
                                "^(?:([+-])=|)(" + aa + ")([a-z%]*)$",
                                "i"
                            ),
                            ca = ["Top", "Right", "Bottom", "Left"],
                            da = function da(a, b) {
                                return (
                                    (a = b || a),
                                    "none" === a.style.display ||
                                        ("" === a.style.display &&
                                            r.contains(a.ownerDocument, a) &&
                                            "none" === r.css(a, "display"))
                                );
                            },
                            ea = function ea(a, b, c, d) {
                                var e,
                                    f,
                                    g = {};

                                for (f in b) {
                                    (g[f] = a.style[f]), (a.style[f] = b[f]);
                                }

                                e = c.apply(a, d || []);

                                for (f in b) {
                                    a.style[f] = g[f];
                                }

                                return e;
                            };

                        function fa(a, b, c, d) {
                            var e,
                                f = 1,
                                g = 20,
                                h = d
                                    ? function () {
                                          return d.cur();
                                      }
                                    : function () {
                                          return r.css(a, b, "");
                                      },
                                i = h(),
                                j = (c && c[3]) || (r.cssNumber[b] ? "" : "px"),
                                k =
                                    (r.cssNumber[b] || ("px" !== j && +i)) &&
                                    ba.exec(r.css(a, b));

                            if (k && k[3] !== j) {
                                (j = j || k[3]), (c = c || []), (k = +i || 1);

                                do {
                                    (f = f || ".5"),
                                        (k /= f),
                                        r.style(a, b, k + j);
                                } while (f !== (f = h() / i) && 1 !== f && --g);
                            }

                            return (
                                c &&
                                    ((k = +k || +i || 0),
                                    (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]),
                                    d &&
                                        ((d.unit = j),
                                        (d.start = k),
                                        (d.end = e))),
                                e
                            );
                        }

                        var ga = {};

                        function ha(a) {
                            var b,
                                c = a.ownerDocument,
                                d = a.nodeName,
                                e = ga[d];
                            return e
                                ? e
                                : ((b = c.body.appendChild(c.createElement(d))),
                                  (e = r.css(b, "display")),
                                  b.parentNode.removeChild(b),
                                  "none" === e && (e = "block"),
                                  (ga[d] = e),
                                  e);
                        }

                        function ia(a, b) {
                            for (
                                var c, d, e = [], f = 0, g = a.length;
                                f < g;
                                f++
                            ) {
                                (d = a[f]),
                                    d.style &&
                                        ((c = d.style.display),
                                        b
                                            ? ("none" === c &&
                                                  ((e[f] =
                                                      W.get(d, "display") ||
                                                      null),
                                                  e[f] ||
                                                      (d.style.display = "")),
                                              "" === d.style.display &&
                                                  da(d) &&
                                                  (e[f] = ha(d)))
                                            : "none" !== c &&
                                              ((e[f] = "none"),
                                              W.set(d, "display", c)));
                            }

                            for (f = 0; f < g; f++) {
                                null != e[f] && (a[f].style.display = e[f]);
                            }

                            return a;
                        }

                        r.fn.extend({
                            show: function show() {
                                return ia(this, !0);
                            },
                            hide: function hide() {
                                return ia(this);
                            },
                            toggle: function toggle(a) {
                                return "boolean" == typeof a
                                    ? a
                                        ? this.show()
                                        : this.hide()
                                    : this.each(function () {
                                          da(this)
                                              ? r(this).show()
                                              : r(this).hide();
                                      });
                            },
                        });
                        var ja = /^(?:checkbox|radio)$/i,
                            ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                            la = /^$|\/(?:java|ecma)script/i,
                            ma = {
                                option: [
                                    1,
                                    "<select multiple='multiple'>",
                                    "</select>",
                                ],
                                thead: [1, "<table>", "</table>"],
                                col: [
                                    2,
                                    "<table><colgroup>",
                                    "</colgroup></table>",
                                ],
                                tr: [2, "<table><tbody>", "</tbody></table>"],
                                td: [
                                    3,
                                    "<table><tbody><tr>",
                                    "</tr></tbody></table>",
                                ],
                                _default: [0, "", ""],
                            };
                        (ma.optgroup = ma.option),
                            (ma.tbody =
                                ma.tfoot =
                                ma.colgroup =
                                ma.caption =
                                    ma.thead),
                            (ma.th = ma.td);

                        function na(a, b) {
                            var c;
                            return (
                                (c =
                                    "undefined" != typeof a.getElementsByTagName
                                        ? a.getElementsByTagName(b || "*")
                                        : "undefined" !=
                                          typeof a.querySelectorAll
                                        ? a.querySelectorAll(b || "*")
                                        : []),
                                void 0 === b || (b && B(a, b))
                                    ? r.merge([a], c)
                                    : c
                            );
                        }

                        function oa(a, b) {
                            for (var c = 0, d = a.length; c < d; c++) {
                                W.set(
                                    a[c],
                                    "globalEval",
                                    !b || W.get(b[c], "globalEval")
                                );
                            }
                        }

                        var pa = /<|&#?\w+;/;

                        function qa(a, b, c, d, e) {
                            for (
                                var f,
                                    g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l = b.createDocumentFragment(),
                                    m = [],
                                    n = 0,
                                    o = a.length;
                                n < o;
                                n++
                            ) {
                                if (((f = a[n]), f || 0 === f))
                                    if ("object" === r.type(f))
                                        r.merge(m, f.nodeType ? [f] : f);
                                    else if (pa.test(f)) {
                                        (g =
                                            g ||
                                            l.appendChild(
                                                b.createElement("div")
                                            )),
                                            (h = (ka.exec(f) || [
                                                "",
                                                "",
                                            ])[1].toLowerCase()),
                                            (i = ma[h] || ma._default),
                                            (g.innerHTML =
                                                i[1] +
                                                r.htmlPrefilter(f) +
                                                i[2]),
                                            (k = i[0]);

                                        while (k--) {
                                            g = g.lastChild;
                                        }

                                        r.merge(m, g.childNodes),
                                            (g = l.firstChild),
                                            (g.textContent = "");
                                    } else m.push(b.createTextNode(f));
                            }

                            (l.textContent = ""), (n = 0);

                            while ((f = m[n++])) {
                                if (d && r.inArray(f, d) > -1) e && e.push(f);
                                else if (
                                    ((j = r.contains(f.ownerDocument, f)),
                                    (g = na(l.appendChild(f), "script")),
                                    j && oa(g),
                                    c)
                                ) {
                                    k = 0;

                                    while ((f = g[k++])) {
                                        la.test(f.type || "") && c.push(f);
                                    }
                                }
                            }

                            return l;
                        }

                        !(function () {
                            var a = d.createDocumentFragment(),
                                b = a.appendChild(d.createElement("div")),
                                c = d.createElement("input");
                            c.setAttribute("type", "radio"),
                                c.setAttribute("checked", "checked"),
                                c.setAttribute("name", "t"),
                                b.appendChild(c),
                                (o.checkClone = b
                                    .cloneNode(!0)
                                    .cloneNode(!0).lastChild.checked),
                                (b.innerHTML = "<textarea>x</textarea>"),
                                (o.noCloneChecked = !!b.cloneNode(!0).lastChild
                                    .defaultValue);
                        })();
                        var ra = d.documentElement,
                            sa = /^key/,
                            ta =
                                /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                            ua = /^([^.]*)(?:\.(.+)|)/;

                        function va() {
                            return !0;
                        }

                        function wa() {
                            return !1;
                        }

                        function xa() {
                            try {
                                return d.activeElement;
                            } catch (a) {}
                        }

                        function ya(a, b, c, d, e, f) {
                            var g, h;

                            if ("object" == _typeof(b)) {
                                "string" != typeof c &&
                                    ((d = d || c), (c = void 0));

                                for (h in b) {
                                    ya(a, h, c, d, b[h], f);
                                }

                                return a;
                            }

                            if (
                                (null == d && null == e
                                    ? ((e = c), (d = c = void 0))
                                    : null == e &&
                                      ("string" == typeof c
                                          ? ((e = d), (d = void 0))
                                          : ((e = d), (d = c), (c = void 0))),
                                e === !1)
                            )
                                e = wa;
                            else if (!e) return a;
                            return (
                                1 === f &&
                                    ((g = e),
                                    (e = function e(a) {
                                        return (
                                            r().off(a), g.apply(this, arguments)
                                        );
                                    }),
                                    (e.guid = g.guid || (g.guid = r.guid++))),
                                a.each(function () {
                                    r.event.add(this, b, e, d, c);
                                })
                            );
                        }

                        (r.event = {
                            global: {},
                            add: function add(a, b, c, d, e) {
                                var f,
                                    g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l,
                                    m,
                                    n,
                                    o,
                                    p,
                                    q = W.get(a);

                                if (q) {
                                    c.handler &&
                                        ((f = c),
                                        (c = f.handler),
                                        (e = f.selector)),
                                        e && r.find.matchesSelector(ra, e),
                                        c.guid || (c.guid = r.guid++),
                                        (i = q.events) || (i = q.events = {}),
                                        (g = q.handle) ||
                                            (g = q.handle =
                                                function (b) {
                                                    return "undefined" !=
                                                        typeof r &&
                                                        r.event.triggered !==
                                                            b.type
                                                        ? r.event.dispatch.apply(
                                                              a,
                                                              arguments
                                                          )
                                                        : void 0;
                                                }),
                                        (b = (b || "").match(L) || [""]),
                                        (j = b.length);

                                    while (j--) {
                                        (h = ua.exec(b[j]) || []),
                                            (n = p = h[1]),
                                            (o = (h[2] || "")
                                                .split(".")
                                                .sort()),
                                            n &&
                                                ((l = r.event.special[n] || {}),
                                                (n =
                                                    (e
                                                        ? l.delegateType
                                                        : l.bindType) || n),
                                                (l = r.event.special[n] || {}),
                                                (k = r.extend(
                                                    {
                                                        type: n,
                                                        origType: p,
                                                        data: d,
                                                        handler: c,
                                                        guid: c.guid,
                                                        selector: e,
                                                        needsContext:
                                                            e &&
                                                            r.expr.match.needsContext.test(
                                                                e
                                                            ),
                                                        namespace: o.join("."),
                                                    },
                                                    f
                                                )),
                                                (m = i[n]) ||
                                                    ((m = i[n] = []),
                                                    (m.delegateCount = 0),
                                                    (l.setup &&
                                                        l.setup.call(
                                                            a,
                                                            d,
                                                            o,
                                                            g
                                                        ) !== !1) ||
                                                        (a.addEventListener &&
                                                            a.addEventListener(
                                                                n,
                                                                g
                                                            ))),
                                                l.add &&
                                                    (l.add.call(a, k),
                                                    k.handler.guid ||
                                                        (k.handler.guid =
                                                            c.guid)),
                                                e
                                                    ? m.splice(
                                                          m.delegateCount++,
                                                          0,
                                                          k
                                                      )
                                                    : m.push(k),
                                                (r.event.global[n] = !0));
                                    }
                                }
                            },
                            remove: function remove(a, b, c, d, e) {
                                var f,
                                    g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l,
                                    m,
                                    n,
                                    o,
                                    p,
                                    q = W.hasData(a) && W.get(a);

                                if (q && (i = q.events)) {
                                    (b = (b || "").match(L) || [""]),
                                        (j = b.length);

                                    while (j--) {
                                        if (
                                            ((h = ua.exec(b[j]) || []),
                                            (n = p = h[1]),
                                            (o = (h[2] || "")
                                                .split(".")
                                                .sort()),
                                            n)
                                        ) {
                                            (l = r.event.special[n] || {}),
                                                (n =
                                                    (d
                                                        ? l.delegateType
                                                        : l.bindType) || n),
                                                (m = i[n] || []),
                                                (h =
                                                    h[2] &&
                                                    new RegExp(
                                                        "(^|\\.)" +
                                                            o.join(
                                                                "\\.(?:.*\\.|)"
                                                            ) +
                                                            "(\\.|$)"
                                                    )),
                                                (g = f = m.length);

                                            while (f--) {
                                                (k = m[f]),
                                                    (!e && p !== k.origType) ||
                                                        (c &&
                                                            c.guid !==
                                                                k.guid) ||
                                                        (h &&
                                                            !h.test(
                                                                k.namespace
                                                            )) ||
                                                        (d &&
                                                            d !== k.selector &&
                                                            ("**" !== d ||
                                                                !k.selector)) ||
                                                        (m.splice(f, 1),
                                                        k.selector &&
                                                            m.delegateCount--,
                                                        l.remove &&
                                                            l.remove.call(
                                                                a,
                                                                k
                                                            ));
                                            }

                                            g &&
                                                !m.length &&
                                                ((l.teardown &&
                                                    l.teardown.call(
                                                        a,
                                                        o,
                                                        q.handle
                                                    ) !== !1) ||
                                                    r.removeEvent(
                                                        a,
                                                        n,
                                                        q.handle
                                                    ),
                                                delete i[n]);
                                        } else
                                            for (n in i) {
                                                r.event.remove(
                                                    a,
                                                    n + b[j],
                                                    c,
                                                    d,
                                                    !0
                                                );
                                            }
                                    }

                                    r.isEmptyObject(i) &&
                                        W.remove(a, "handle events");
                                }
                            },
                            dispatch: function dispatch(a) {
                                var b = r.event.fix(a),
                                    c,
                                    d,
                                    e,
                                    f,
                                    g,
                                    h,
                                    i = new Array(arguments.length),
                                    j =
                                        (W.get(this, "events") || {})[b.type] ||
                                        [],
                                    k = r.event.special[b.type] || {};

                                for (
                                    i[0] = b, c = 1;
                                    c < arguments.length;
                                    c++
                                ) {
                                    i[c] = arguments[c];
                                }

                                if (
                                    ((b.delegateTarget = this),
                                    !k.preDispatch ||
                                        k.preDispatch.call(this, b) !== !1)
                                ) {
                                    (h = r.event.handlers.call(this, b, j)),
                                        (c = 0);

                                    while (
                                        (f = h[c++]) &&
                                        !b.isPropagationStopped()
                                    ) {
                                        (b.currentTarget = f.elem), (d = 0);

                                        while (
                                            (g = f.handlers[d++]) &&
                                            !b.isImmediatePropagationStopped()
                                        ) {
                                            (b.rnamespace &&
                                                !b.rnamespace.test(
                                                    g.namespace
                                                )) ||
                                                ((b.handleObj = g),
                                                (b.data = g.data),
                                                (e = (
                                                    (
                                                        r.event.special[
                                                            g.origType
                                                        ] || {}
                                                    ).handle || g.handler
                                                ).apply(f.elem, i)),
                                                void 0 !== e &&
                                                    (b.result = e) === !1 &&
                                                    (b.preventDefault(),
                                                    b.stopPropagation()));
                                        }
                                    }

                                    return (
                                        k.postDispatch &&
                                            k.postDispatch.call(this, b),
                                        b.result
                                    );
                                }
                            },
                            handlers: function handlers(a, b) {
                                var c,
                                    d,
                                    e,
                                    f,
                                    g,
                                    h = [],
                                    i = b.delegateCount,
                                    j = a.target;
                                if (
                                    i &&
                                    j.nodeType &&
                                    !("click" === a.type && a.button >= 1)
                                )
                                    for (
                                        ;
                                        j !== this;
                                        j = j.parentNode || this
                                    ) {
                                        if (
                                            1 === j.nodeType &&
                                            ("click" !== a.type ||
                                                j.disabled !== !0)
                                        ) {
                                            for (
                                                f = [], g = {}, c = 0;
                                                c < i;
                                                c++
                                            ) {
                                                (d = b[c]),
                                                    (e = d.selector + " "),
                                                    void 0 === g[e] &&
                                                        (g[e] = d.needsContext
                                                            ? r(e, this).index(
                                                                  j
                                                              ) > -1
                                                            : r.find(
                                                                  e,
                                                                  this,
                                                                  null,
                                                                  [j]
                                                              ).length),
                                                    g[e] && f.push(d);
                                            }

                                            f.length &&
                                                h.push({
                                                    elem: j,
                                                    handlers: f,
                                                });
                                        }
                                    }
                                return (
                                    (j = this),
                                    i < b.length &&
                                        h.push({
                                            elem: j,
                                            handlers: b.slice(i),
                                        }),
                                    h
                                );
                            },
                            addProp: function addProp(a, b) {
                                Object.defineProperty(r.Event.prototype, a, {
                                    enumerable: !0,
                                    configurable: !0,
                                    get: r.isFunction(b)
                                        ? function () {
                                              if (this.originalEvent)
                                                  return b(this.originalEvent);
                                          }
                                        : function () {
                                              if (this.originalEvent)
                                                  return this.originalEvent[a];
                                          },
                                    set: function set(b) {
                                        Object.defineProperty(this, a, {
                                            enumerable: !0,
                                            configurable: !0,
                                            writable: !0,
                                            value: b,
                                        });
                                    },
                                });
                            },
                            fix: function fix(a) {
                                return a[r.expando] ? a : new r.Event(a);
                            },
                            special: {
                                load: {
                                    noBubble: !0,
                                },
                                focus: {
                                    trigger: function trigger() {
                                        if (this !== xa() && this.focus)
                                            return this.focus(), !1;
                                    },
                                    delegateType: "focusin",
                                },
                                blur: {
                                    trigger: function trigger() {
                                        if (this === xa() && this.blur)
                                            return this.blur(), !1;
                                    },
                                    delegateType: "focusout",
                                },
                                click: {
                                    trigger: function trigger() {
                                        if (
                                            "checkbox" === this.type &&
                                            this.click &&
                                            B(this, "input")
                                        )
                                            return this.click(), !1;
                                    },
                                    _default: function _default(a) {
                                        return B(a.target, "a");
                                    },
                                },
                                beforeunload: {
                                    postDispatch: function postDispatch(a) {
                                        void 0 !== a.result &&
                                            a.originalEvent &&
                                            (a.originalEvent.returnValue =
                                                a.result);
                                    },
                                },
                            },
                        }),
                            (r.removeEvent = function (a, b, c) {
                                a.removeEventListener &&
                                    a.removeEventListener(b, c);
                            }),
                            (r.Event = function (a, b) {
                                return this instanceof r.Event
                                    ? (a && a.type
                                          ? ((this.originalEvent = a),
                                            (this.type = a.type),
                                            (this.isDefaultPrevented =
                                                a.defaultPrevented ||
                                                (void 0 ===
                                                    a.defaultPrevented &&
                                                    a.returnValue === !1)
                                                    ? va
                                                    : wa),
                                            (this.target =
                                                a.target &&
                                                3 === a.target.nodeType
                                                    ? a.target.parentNode
                                                    : a.target),
                                            (this.currentTarget =
                                                a.currentTarget),
                                            (this.relatedTarget =
                                                a.relatedTarget))
                                          : (this.type = a),
                                      b && r.extend(this, b),
                                      (this.timeStamp =
                                          (a && a.timeStamp) || r.now()),
                                      void (this[r.expando] = !0))
                                    : new r.Event(a, b);
                            }),
                            (r.Event.prototype = {
                                constructor: r.Event,
                                isDefaultPrevented: wa,
                                isPropagationStopped: wa,
                                isImmediatePropagationStopped: wa,
                                isSimulated: !1,
                                preventDefault: function preventDefault() {
                                    var a = this.originalEvent;
                                    (this.isDefaultPrevented = va),
                                        a &&
                                            !this.isSimulated &&
                                            a.preventDefault();
                                },
                                stopPropagation: function stopPropagation() {
                                    var a = this.originalEvent;
                                    (this.isPropagationStopped = va),
                                        a &&
                                            !this.isSimulated &&
                                            a.stopPropagation();
                                },
                                stopImmediatePropagation:
                                    function stopImmediatePropagation() {
                                        var a = this.originalEvent;
                                        (this.isImmediatePropagationStopped =
                                            va),
                                            a &&
                                                !this.isSimulated &&
                                                a.stopImmediatePropagation(),
                                            this.stopPropagation();
                                    },
                            }),
                            r.each(
                                {
                                    altKey: !0,
                                    bubbles: !0,
                                    cancelable: !0,
                                    changedTouches: !0,
                                    ctrlKey: !0,
                                    detail: !0,
                                    eventPhase: !0,
                                    metaKey: !0,
                                    pageX: !0,
                                    pageY: !0,
                                    shiftKey: !0,
                                    view: !0,
                                    char: !0,
                                    charCode: !0,
                                    key: !0,
                                    keyCode: !0,
                                    button: !0,
                                    buttons: !0,
                                    clientX: !0,
                                    clientY: !0,
                                    offsetX: !0,
                                    offsetY: !0,
                                    pointerId: !0,
                                    pointerType: !0,
                                    screenX: !0,
                                    screenY: !0,
                                    targetTouches: !0,
                                    toElement: !0,
                                    touches: !0,
                                    which: function which(a) {
                                        var b = a.button;
                                        return null == a.which &&
                                            sa.test(a.type)
                                            ? null != a.charCode
                                                ? a.charCode
                                                : a.keyCode
                                            : !a.which &&
                                              void 0 !== b &&
                                              ta.test(a.type)
                                            ? 1 & b
                                                ? 1
                                                : 2 & b
                                                ? 3
                                                : 4 & b
                                                ? 2
                                                : 0
                                            : a.which;
                                    },
                                },
                                r.event.addProp
                            ),
                            r.each(
                                {
                                    mouseenter: "mouseover",
                                    mouseleave: "mouseout",
                                    pointerenter: "pointerover",
                                    pointerleave: "pointerout",
                                },
                                function (a, b) {
                                    r.event.special[a] = {
                                        delegateType: b,
                                        bindType: b,
                                        handle: function handle(a) {
                                            var c,
                                                d = this,
                                                e = a.relatedTarget,
                                                f = a.handleObj;
                                            return (
                                                (e &&
                                                    (e === d ||
                                                        r.contains(d, e))) ||
                                                    ((a.type = f.origType),
                                                    (c = f.handler.apply(
                                                        this,
                                                        arguments
                                                    )),
                                                    (a.type = b)),
                                                c
                                            );
                                        },
                                    };
                                }
                            ),
                            r.fn.extend({
                                on: function on(a, b, c, d) {
                                    return ya(this, a, b, c, d);
                                },
                                one: function one(a, b, c, d) {
                                    return ya(this, a, b, c, d, 1);
                                },
                                off: function off(a, b, c) {
                                    var d, e;
                                    if (a && a.preventDefault && a.handleObj)
                                        return (
                                            (d = a.handleObj),
                                            r(a.delegateTarget).off(
                                                d.namespace
                                                    ? d.origType +
                                                          "." +
                                                          d.namespace
                                                    : d.origType,
                                                d.selector,
                                                d.handler
                                            ),
                                            this
                                        );

                                    if ("object" == _typeof(a)) {
                                        for (e in a) {
                                            this.off(e, b, a[e]);
                                        }

                                        return this;
                                    }

                                    return (
                                        (b !== !1 && "function" != typeof b) ||
                                            ((c = b), (b = void 0)),
                                        c === !1 && (c = wa),
                                        this.each(function () {
                                            r.event.remove(this, a, c, b);
                                        })
                                    );
                                },
                            });
                        var za =
                                /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                            Aa = /<script|<style|<link/i,
                            Ba = /checked\s*(?:[^=]|=\s*.checked.)/i,
                            Ca = /^true\/(.*)/,
                            Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

                        function Ea(a, b) {
                            return B(a, "table") &&
                                B(11 !== b.nodeType ? b : b.firstChild, "tr")
                                ? r(">tbody", a)[0] || a
                                : a;
                        }

                        function Fa(a) {
                            return (
                                (a.type =
                                    (null !== a.getAttribute("type")) +
                                    "/" +
                                    a.type),
                                a
                            );
                        }

                        function Ga(a) {
                            var b = Ca.exec(a.type);
                            return (
                                b ? (a.type = b[1]) : a.removeAttribute("type"),
                                a
                            );
                        }

                        function Ha(a, b) {
                            var c, d, e, f, g, h, i, j;

                            if (1 === b.nodeType) {
                                if (
                                    W.hasData(a) &&
                                    ((f = W.access(a)),
                                    (g = W.set(b, f)),
                                    (j = f.events))
                                ) {
                                    delete g.handle, (g.events = {});

                                    for (e in j) {
                                        for (
                                            c = 0, d = j[e].length;
                                            c < d;
                                            c++
                                        ) {
                                            r.event.add(b, e, j[e][c]);
                                        }
                                    }
                                }

                                X.hasData(a) &&
                                    ((h = X.access(a)),
                                    (i = r.extend({}, h)),
                                    X.set(b, i));
                            }
                        }

                        function Ia(a, b) {
                            var c = b.nodeName.toLowerCase();
                            "input" === c && ja.test(a.type)
                                ? (b.checked = a.checked)
                                : ("input" !== c && "textarea" !== c) ||
                                  (b.defaultValue = a.defaultValue);
                        }

                        function Ja(a, b, c, d) {
                            b = g.apply([], b);
                            var e,
                                f,
                                h,
                                i,
                                j,
                                k,
                                l = 0,
                                m = a.length,
                                n = m - 1,
                                q = b[0],
                                s = r.isFunction(q);
                            if (
                                s ||
                                (m > 1 &&
                                    "string" == typeof q &&
                                    !o.checkClone &&
                                    Ba.test(q))
                            )
                                return a.each(function (e) {
                                    var f = a.eq(e);
                                    s && (b[0] = q.call(this, e, f.html())),
                                        Ja(f, b, c, d);
                                });

                            if (
                                m &&
                                ((e = qa(b, a[0].ownerDocument, !1, a, d)),
                                (f = e.firstChild),
                                1 === e.childNodes.length && (e = f),
                                f || d)
                            ) {
                                for (
                                    h = r.map(na(e, "script"), Fa),
                                        i = h.length;
                                    l < m;
                                    l++
                                ) {
                                    (j = e),
                                        l !== n &&
                                            ((j = r.clone(j, !0, !0)),
                                            i && r.merge(h, na(j, "script"))),
                                        c.call(a[l], j, l);
                                }

                                if (i)
                                    for (
                                        k = h[h.length - 1].ownerDocument,
                                            r.map(h, Ga),
                                            l = 0;
                                        l < i;
                                        l++
                                    ) {
                                        (j = h[l]),
                                            la.test(j.type || "") &&
                                                !W.access(j, "globalEval") &&
                                                r.contains(k, j) &&
                                                (j.src
                                                    ? r._evalUrl &&
                                                      r._evalUrl(j.src)
                                                    : p(
                                                          j.textContent.replace(
                                                              Da,
                                                              ""
                                                          ),
                                                          k
                                                      ));
                                    }
                            }

                            return a;
                        }

                        function Ka(a, b, c) {
                            for (
                                var d, e = b ? r.filter(b, a) : a, f = 0;
                                null != (d = e[f]);
                                f++
                            ) {
                                c || 1 !== d.nodeType || r.cleanData(na(d)),
                                    d.parentNode &&
                                        (c &&
                                            r.contains(d.ownerDocument, d) &&
                                            oa(na(d, "script")),
                                        d.parentNode.removeChild(d));
                            }

                            return a;
                        }

                        r.extend({
                            htmlPrefilter: function htmlPrefilter(a) {
                                return a.replace(za, "<$1></$2>");
                            },
                            clone: function clone(a, b, c) {
                                var d,
                                    e,
                                    f,
                                    g,
                                    h = a.cloneNode(!0),
                                    i = r.contains(a.ownerDocument, a);
                                if (
                                    !(
                                        o.noCloneChecked ||
                                        (1 !== a.nodeType &&
                                            11 !== a.nodeType) ||
                                        r.isXMLDoc(a)
                                    )
                                )
                                    for (
                                        g = na(h),
                                            f = na(a),
                                            d = 0,
                                            e = f.length;
                                        d < e;
                                        d++
                                    ) {
                                        Ia(f[d], g[d]);
                                    }
                                if (b)
                                    if (c)
                                        for (
                                            f = f || na(a),
                                                g = g || na(h),
                                                d = 0,
                                                e = f.length;
                                            d < e;
                                            d++
                                        ) {
                                            Ha(f[d], g[d]);
                                        }
                                    else Ha(a, h);
                                return (
                                    (g = na(h, "script")),
                                    g.length > 0 &&
                                        oa(g, !i && na(a, "script")),
                                    h
                                );
                            },
                            cleanData: function cleanData(a) {
                                for (
                                    var b, c, d, e = r.event.special, f = 0;
                                    void 0 !== (c = a[f]);
                                    f++
                                ) {
                                    if (U(c)) {
                                        if ((b = c[W.expando])) {
                                            if (b.events)
                                                for (d in b.events) {
                                                    e[d]
                                                        ? r.event.remove(c, d)
                                                        : r.removeEvent(
                                                              c,
                                                              d,
                                                              b.handle
                                                          );
                                                }
                                            c[W.expando] = void 0;
                                        }

                                        c[X.expando] && (c[X.expando] = void 0);
                                    }
                                }
                            },
                        }),
                            r.fn.extend({
                                detach: function detach(a) {
                                    return Ka(this, a, !0);
                                },
                                remove: function remove(a) {
                                    return Ka(this, a);
                                },
                                text: function text(a) {
                                    return T(
                                        this,
                                        function (a) {
                                            return void 0 === a
                                                ? r.text(this)
                                                : this.empty().each(
                                                      function () {
                                                          (1 !==
                                                              this.nodeType &&
                                                              11 !==
                                                                  this
                                                                      .nodeType &&
                                                              9 !==
                                                                  this
                                                                      .nodeType) ||
                                                              (this.textContent =
                                                                  a);
                                                      }
                                                  );
                                        },
                                        null,
                                        a,
                                        arguments.length
                                    );
                                },
                                append: function append() {
                                    return Ja(this, arguments, function (a) {
                                        if (
                                            1 === this.nodeType ||
                                            11 === this.nodeType ||
                                            9 === this.nodeType
                                        ) {
                                            var b = Ea(this, a);
                                            b.appendChild(a);
                                        }
                                    });
                                },
                                prepend: function prepend() {
                                    return Ja(this, arguments, function (a) {
                                        if (
                                            1 === this.nodeType ||
                                            11 === this.nodeType ||
                                            9 === this.nodeType
                                        ) {
                                            var b = Ea(this, a);
                                            b.insertBefore(a, b.firstChild);
                                        }
                                    });
                                },
                                before: function before() {
                                    return Ja(this, arguments, function (a) {
                                        this.parentNode &&
                                            this.parentNode.insertBefore(
                                                a,
                                                this
                                            );
                                    });
                                },
                                after: function after() {
                                    return Ja(this, arguments, function (a) {
                                        this.parentNode &&
                                            this.parentNode.insertBefore(
                                                a,
                                                this.nextSibling
                                            );
                                    });
                                },
                                empty: function empty() {
                                    for (
                                        var a, b = 0;
                                        null != (a = this[b]);
                                        b++
                                    ) {
                                        1 === a.nodeType &&
                                            (r.cleanData(na(a, !1)),
                                            (a.textContent = ""));
                                    }

                                    return this;
                                },
                                clone: function clone(a, b) {
                                    return (
                                        (a = null != a && a),
                                        (b = null == b ? a : b),
                                        this.map(function () {
                                            return r.clone(this, a, b);
                                        })
                                    );
                                },
                                html: function html(a) {
                                    return T(
                                        this,
                                        function (a) {
                                            var b = this[0] || {},
                                                c = 0,
                                                d = this.length;
                                            if (
                                                void 0 === a &&
                                                1 === b.nodeType
                                            )
                                                return b.innerHTML;

                                            if (
                                                "string" == typeof a &&
                                                !Aa.test(a) &&
                                                !ma[
                                                    (ka.exec(a) || [
                                                        "",
                                                        "",
                                                    ])[1].toLowerCase()
                                                ]
                                            ) {
                                                a = r.htmlPrefilter(a);

                                                try {
                                                    for (; c < d; c++) {
                                                        (b = this[c] || {}),
                                                            1 === b.nodeType &&
                                                                (r.cleanData(
                                                                    na(b, !1)
                                                                ),
                                                                (b.innerHTML =
                                                                    a));
                                                    }

                                                    b = 0;
                                                } catch (e) {}
                                            }

                                            b && this.empty().append(a);
                                        },
                                        null,
                                        a,
                                        arguments.length
                                    );
                                },
                                replaceWith: function replaceWith() {
                                    var a = [];
                                    return Ja(
                                        this,
                                        arguments,
                                        function (b) {
                                            var c = this.parentNode;
                                            r.inArray(this, a) < 0 &&
                                                (r.cleanData(na(this)),
                                                c && c.replaceChild(b, this));
                                        },
                                        a
                                    );
                                },
                            }),
                            r.each(
                                {
                                    appendTo: "append",
                                    prependTo: "prepend",
                                    insertBefore: "before",
                                    insertAfter: "after",
                                    replaceAll: "replaceWith",
                                },
                                function (a, b) {
                                    r.fn[a] = function (a) {
                                        for (
                                            var c,
                                                d = [],
                                                e = r(a),
                                                f = e.length - 1,
                                                g = 0;
                                            g <= f;
                                            g++
                                        ) {
                                            (c =
                                                g === f
                                                    ? this
                                                    : this.clone(!0)),
                                                r(e[g])[b](c),
                                                h.apply(d, c.get());
                                        }

                                        return this.pushStack(d);
                                    };
                                }
                            );

                        var La = /^margin/,
                            Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"),
                            Na = function Na(b) {
                                var c = b.ownerDocument.defaultView;
                                return (
                                    (c && c.opener) || (c = a),
                                    c.getComputedStyle(b)
                                );
                            };

                        !(function () {
                            function b() {
                                if (i) {
                                    (i.style.cssText =
                                        "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
                                        (i.innerHTML = ""),
                                        ra.appendChild(h);
                                    var b = a.getComputedStyle(i);
                                    (c = "1%" !== b.top),
                                        (g = "2px" === b.marginLeft),
                                        (e = "4px" === b.width),
                                        (i.style.marginRight = "50%"),
                                        (f = "4px" === b.marginRight),
                                        ra.removeChild(h),
                                        (i = null);
                                }
                            }

                            var c,
                                e,
                                f,
                                g,
                                h = d.createElement("div"),
                                i = d.createElement("div");
                            i.style &&
                                ((i.style.backgroundClip = "content-box"),
                                (i.cloneNode(!0).style.backgroundClip = ""),
                                (o.clearCloneStyle =
                                    "content-box" === i.style.backgroundClip),
                                (h.style.cssText =
                                    "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                                h.appendChild(i),
                                r.extend(o, {
                                    pixelPosition: function pixelPosition() {
                                        return b(), c;
                                    },
                                    boxSizingReliable:
                                        function boxSizingReliable() {
                                            return b(), e;
                                        },
                                    pixelMarginRight:
                                        function pixelMarginRight() {
                                            return b(), f;
                                        },
                                    reliableMarginLeft:
                                        function reliableMarginLeft() {
                                            return b(), g;
                                        },
                                }));
                        })();

                        function Oa(a, b, c) {
                            var d,
                                e,
                                f,
                                g,
                                h = a.style;
                            return (
                                (c = c || Na(a)),
                                c &&
                                    ((g = c.getPropertyValue(b) || c[b]),
                                    "" !== g ||
                                        r.contains(a.ownerDocument, a) ||
                                        (g = r.style(a, b)),
                                    !o.pixelMarginRight() &&
                                        Ma.test(g) &&
                                        La.test(b) &&
                                        ((d = h.width),
                                        (e = h.minWidth),
                                        (f = h.maxWidth),
                                        (h.minWidth = h.maxWidth = h.width = g),
                                        (g = c.width),
                                        (h.width = d),
                                        (h.minWidth = e),
                                        (h.maxWidth = f))),
                                void 0 !== g ? g + "" : g
                            );
                        }

                        function Pa(a, b) {
                            return {
                                get: function get() {
                                    return a()
                                        ? void delete this.get
                                        : (this.get = b).apply(this, arguments);
                                },
                            };
                        }

                        var Qa = /^(none|table(?!-c[ea]).+)/,
                            Ra = /^--/,
                            Sa = {
                                position: "absolute",
                                visibility: "hidden",
                                display: "block",
                            },
                            Ta = {
                                letterSpacing: "0",
                                fontWeight: "400",
                            },
                            Ua = ["Webkit", "Moz", "ms"],
                            Va = d.createElement("div").style;

                        function Wa(a) {
                            if (a in Va) return a;
                            var b = a[0].toUpperCase() + a.slice(1),
                                c = Ua.length;

                            while (c--) {
                                if (((a = Ua[c] + b), a in Va)) return a;
                            }
                        }

                        function Xa(a) {
                            var b = r.cssProps[a];
                            return b || (b = r.cssProps[a] = Wa(a) || a), b;
                        }

                        function Ya(a, b, c) {
                            var d = ba.exec(b);
                            return d
                                ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px")
                                : b;
                        }

                        function Za(a, b, c, d, e) {
                            var f,
                                g = 0;

                            for (
                                f =
                                    c === (d ? "border" : "content")
                                        ? 4
                                        : "width" === b
                                        ? 1
                                        : 0;
                                f < 4;
                                f += 2
                            ) {
                                "margin" === c &&
                                    (g += r.css(a, c + ca[f], !0, e)),
                                    d
                                        ? ("content" === c &&
                                              (g -= r.css(
                                                  a,
                                                  "padding" + ca[f],
                                                  !0,
                                                  e
                                              )),
                                          "margin" !== c &&
                                              (g -= r.css(
                                                  a,
                                                  "border" + ca[f] + "Width",
                                                  !0,
                                                  e
                                              )))
                                        : ((g += r.css(
                                              a,
                                              "padding" + ca[f],
                                              !0,
                                              e
                                          )),
                                          "padding" !== c &&
                                              (g += r.css(
                                                  a,
                                                  "border" + ca[f] + "Width",
                                                  !0,
                                                  e
                                              )));
                            }

                            return g;
                        }

                        function $a(a, b, c) {
                            var d,
                                e = Na(a),
                                f = Oa(a, b, e),
                                g =
                                    "border-box" ===
                                    r.css(a, "boxSizing", !1, e);
                            return Ma.test(f)
                                ? f
                                : ((d =
                                      g &&
                                      (o.boxSizingReliable() ||
                                          f === a.style[b])),
                                  "auto" === f &&
                                      (f =
                                          a[
                                              "offset" +
                                                  b[0].toUpperCase() +
                                                  b.slice(1)
                                          ]),
                                  (f = parseFloat(f) || 0),
                                  f +
                                      Za(
                                          a,
                                          b,
                                          c || (g ? "border" : "content"),
                                          d,
                                          e
                                      ) +
                                      "px");
                        }

                        r.extend({
                            cssHooks: {
                                opacity: {
                                    get: function get(a, b) {
                                        if (b) {
                                            var c = Oa(a, "opacity");
                                            return "" === c ? "1" : c;
                                        }
                                    },
                                },
                            },
                            cssNumber: {
                                animationIterationCount: !0,
                                columnCount: !0,
                                fillOpacity: !0,
                                flexGrow: !0,
                                flexShrink: !0,
                                fontWeight: !0,
                                lineHeight: !0,
                                opacity: !0,
                                order: !0,
                                orphans: !0,
                                widows: !0,
                                zIndex: !0,
                                zoom: !0,
                            },
                            cssProps: {
                                float: "cssFloat",
                            },
                            style: function style(a, b, c, d) {
                                if (
                                    a &&
                                    3 !== a.nodeType &&
                                    8 !== a.nodeType &&
                                    a.style
                                ) {
                                    var e,
                                        f,
                                        g,
                                        h = r.camelCase(b),
                                        i = Ra.test(b),
                                        j = a.style;
                                    return (
                                        i || (b = Xa(h)),
                                        (g = r.cssHooks[b] || r.cssHooks[h]),
                                        void 0 === c
                                            ? g &&
                                              "get" in g &&
                                              void 0 !== (e = g.get(a, !1, d))
                                                ? e
                                                : j[b]
                                            : ((f = _typeof(c)),
                                              "string" === f &&
                                                  (e = ba.exec(c)) &&
                                                  e[1] &&
                                                  ((c = fa(a, b, e)),
                                                  (f = "number")),
                                              null != c &&
                                                  c === c &&
                                                  ("number" === f &&
                                                      (c +=
                                                          (e && e[3]) ||
                                                          (r.cssNumber[h]
                                                              ? ""
                                                              : "px")),
                                                  o.clearCloneStyle ||
                                                      "" !== c ||
                                                      0 !==
                                                          b.indexOf(
                                                              "background"
                                                          ) ||
                                                      (j[b] = "inherit"),
                                                  (g &&
                                                      "set" in g &&
                                                      void 0 ===
                                                          (c = g.set(
                                                              a,
                                                              c,
                                                              d
                                                          ))) ||
                                                      (i
                                                          ? j.setProperty(b, c)
                                                          : (j[b] = c))),
                                              void 0)
                                    );
                                }
                            },
                            css: function css(a, b, c, d) {
                                var e,
                                    f,
                                    g,
                                    h = r.camelCase(b),
                                    i = Ra.test(b);
                                return (
                                    i || (b = Xa(h)),
                                    (g = r.cssHooks[b] || r.cssHooks[h]),
                                    g && "get" in g && (e = g.get(a, !0, c)),
                                    void 0 === e && (e = Oa(a, b, d)),
                                    "normal" === e && b in Ta && (e = Ta[b]),
                                    "" === c || c
                                        ? ((f = parseFloat(e)),
                                          c === !0 || isFinite(f) ? f || 0 : e)
                                        : e
                                );
                            },
                        }),
                            r.each(["height", "width"], function (a, b) {
                                r.cssHooks[b] = {
                                    get: function get(a, c, d) {
                                        if (c)
                                            return !Qa.test(
                                                r.css(a, "display")
                                            ) ||
                                                (a.getClientRects().length &&
                                                    a.getBoundingClientRect()
                                                        .width)
                                                ? $a(a, b, d)
                                                : ea(a, Sa, function () {
                                                      return $a(a, b, d);
                                                  });
                                    },
                                    set: function set(a, c, d) {
                                        var e,
                                            f = d && Na(a),
                                            g =
                                                d &&
                                                Za(
                                                    a,
                                                    b,
                                                    d,
                                                    "border-box" ===
                                                        r.css(
                                                            a,
                                                            "boxSizing",
                                                            !1,
                                                            f
                                                        ),
                                                    f
                                                );
                                        return (
                                            g &&
                                                (e = ba.exec(c)) &&
                                                "px" !== (e[3] || "px") &&
                                                ((a.style[b] = c),
                                                (c = r.css(a, b))),
                                            Ya(a, c, g)
                                        );
                                    },
                                };
                            }),
                            (r.cssHooks.marginLeft = Pa(
                                o.reliableMarginLeft,
                                function (a, b) {
                                    if (b)
                                        return (
                                            (parseFloat(Oa(a, "marginLeft")) ||
                                                a.getBoundingClientRect().left -
                                                    ea(
                                                        a,
                                                        {
                                                            marginLeft: 0,
                                                        },
                                                        function () {
                                                            return a.getBoundingClientRect()
                                                                .left;
                                                        }
                                                    )) + "px"
                                        );
                                }
                            )),
                            r.each(
                                {
                                    margin: "",
                                    padding: "",
                                    border: "Width",
                                },
                                function (a, b) {
                                    (r.cssHooks[a + b] = {
                                        expand: function expand(c) {
                                            for (
                                                var d = 0,
                                                    e = {},
                                                    f =
                                                        "string" == typeof c
                                                            ? c.split(" ")
                                                            : [c];
                                                d < 4;
                                                d++
                                            ) {
                                                e[a + ca[d] + b] =
                                                    f[d] || f[d - 2] || f[0];
                                            }

                                            return e;
                                        },
                                    }),
                                        La.test(a) ||
                                            (r.cssHooks[a + b].set = Ya);
                                }
                            ),
                            r.fn.extend({
                                css: function css(a, b) {
                                    return T(
                                        this,
                                        function (a, b, c) {
                                            var d,
                                                e,
                                                f = {},
                                                g = 0;

                                            if (Array.isArray(b)) {
                                                for (
                                                    d = Na(a), e = b.length;
                                                    g < e;
                                                    g++
                                                ) {
                                                    f[b[g]] = r.css(
                                                        a,
                                                        b[g],
                                                        !1,
                                                        d
                                                    );
                                                }

                                                return f;
                                            }

                                            return void 0 !== c
                                                ? r.style(a, b, c)
                                                : r.css(a, b);
                                        },
                                        a,
                                        b,
                                        arguments.length > 1
                                    );
                                },
                            });

                        function _a(a, b, c, d, e) {
                            return new _a.prototype.init(a, b, c, d, e);
                        }

                        (r.Tween = _a),
                            (_a.prototype = {
                                constructor: _a,
                                init: function init(a, b, c, d, e, f) {
                                    (this.elem = a),
                                        (this.prop = c),
                                        (this.easing = e || r.easing._default),
                                        (this.options = b),
                                        (this.start = this.now = this.cur()),
                                        (this.end = d),
                                        (this.unit =
                                            f || (r.cssNumber[c] ? "" : "px"));
                                },
                                cur: function cur() {
                                    var a = _a.propHooks[this.prop];
                                    return a && a.get
                                        ? a.get(this)
                                        : _a.propHooks._default.get(this);
                                },
                                run: function run(a) {
                                    var b,
                                        c = _a.propHooks[this.prop];
                                    return (
                                        this.options.duration
                                            ? (this.pos = b =
                                                  r.easing[this.easing](
                                                      a,
                                                      this.options.duration * a,
                                                      0,
                                                      1,
                                                      this.options.duration
                                                  ))
                                            : (this.pos = b = a),
                                        (this.now =
                                            (this.end - this.start) * b +
                                            this.start),
                                        this.options.step &&
                                            this.options.step.call(
                                                this.elem,
                                                this.now,
                                                this
                                            ),
                                        c && c.set
                                            ? c.set(this)
                                            : _a.propHooks._default.set(this),
                                        this
                                    );
                                },
                            }),
                            (_a.prototype.init.prototype = _a.prototype),
                            (_a.propHooks = {
                                _default: {
                                    get: function get(a) {
                                        var b;
                                        return 1 !== a.elem.nodeType ||
                                            (null != a.elem[a.prop] &&
                                                null == a.elem.style[a.prop])
                                            ? a.elem[a.prop]
                                            : ((b = r.css(a.elem, a.prop, "")),
                                              b && "auto" !== b ? b : 0);
                                    },
                                    set: function set(a) {
                                        r.fx.step[a.prop]
                                            ? r.fx.step[a.prop](a)
                                            : 1 !== a.elem.nodeType ||
                                              (null ==
                                                  a.elem.style[
                                                      r.cssProps[a.prop]
                                                  ] &&
                                                  !r.cssHooks[a.prop])
                                            ? (a.elem[a.prop] = a.now)
                                            : r.style(
                                                  a.elem,
                                                  a.prop,
                                                  a.now + a.unit
                                              );
                                    },
                                },
                            }),
                            (_a.propHooks.scrollTop = _a.propHooks.scrollLeft =
                                {
                                    set: function set(a) {
                                        a.elem.nodeType &&
                                            a.elem.parentNode &&
                                            (a.elem[a.prop] = a.now);
                                    },
                                }),
                            (r.easing = {
                                linear: function linear(a) {
                                    return a;
                                },
                                swing: function swing(a) {
                                    return 0.5 - Math.cos(a * Math.PI) / 2;
                                },
                                _default: "swing",
                            }),
                            (r.fx = _a.prototype.init),
                            (r.fx.step = {});
                        var ab,
                            bb,
                            cb = /^(?:toggle|show|hide)$/,
                            db = /queueHooks$/;

                        function eb() {
                            bb &&
                                (d.hidden === !1 && a.requestAnimationFrame
                                    ? a.requestAnimationFrame(eb)
                                    : a.setTimeout(eb, r.fx.interval),
                                r.fx.tick());
                        }

                        function fb() {
                            return (
                                a.setTimeout(function () {
                                    ab = void 0;
                                }),
                                (ab = r.now())
                            );
                        }

                        function gb(a, b) {
                            var c,
                                d = 0,
                                e = {
                                    height: a,
                                };

                            for (b = b ? 1 : 0; d < 4; d += 2 - b) {
                                (c = ca[d]),
                                    (e["margin" + c] = e["padding" + c] = a);
                            }

                            return b && (e.opacity = e.width = a), e;
                        }

                        function hb(a, b, c) {
                            for (
                                var d,
                                    e = (kb.tweeners[b] || []).concat(
                                        kb.tweeners["*"]
                                    ),
                                    f = 0,
                                    g = e.length;
                                f < g;
                                f++
                            ) {
                                if ((d = e[f].call(c, b, a))) return d;
                            }
                        }

                        function ib(a, b, c) {
                            var d,
                                e,
                                f,
                                g,
                                h,
                                i,
                                j,
                                k,
                                l = "width" in b || "height" in b,
                                m = this,
                                n = {},
                                o = a.style,
                                p = a.nodeType && da(a),
                                q = W.get(a, "fxshow");
                            c.queue ||
                                ((g = r._queueHooks(a, "fx")),
                                null == g.unqueued &&
                                    ((g.unqueued = 0),
                                    (h = g.empty.fire),
                                    (g.empty.fire = function () {
                                        g.unqueued || h();
                                    })),
                                g.unqueued++,
                                m.always(function () {
                                    m.always(function () {
                                        g.unqueued--,
                                            r.queue(a, "fx").length ||
                                                g.empty.fire();
                                    });
                                }));

                            for (d in b) {
                                if (((e = b[d]), cb.test(e))) {
                                    if (
                                        (delete b[d],
                                        (f = f || "toggle" === e),
                                        e === (p ? "hide" : "show"))
                                    ) {
                                        if (
                                            "show" !== e ||
                                            !q ||
                                            void 0 === q[d]
                                        )
                                            continue;
                                        p = !0;
                                    }

                                    n[d] = (q && q[d]) || r.style(a, d);
                                }
                            }

                            if (
                                ((i = !r.isEmptyObject(b)),
                                i || !r.isEmptyObject(n))
                            ) {
                                l &&
                                    1 === a.nodeType &&
                                    ((c.overflow = [
                                        o.overflow,
                                        o.overflowX,
                                        o.overflowY,
                                    ]),
                                    (j = q && q.display),
                                    null == j && (j = W.get(a, "display")),
                                    (k = r.css(a, "display")),
                                    "none" === k &&
                                        (j
                                            ? (k = j)
                                            : (ia([a], !0),
                                              (j = a.style.display || j),
                                              (k = r.css(a, "display")),
                                              ia([a]))),
                                    ("inline" === k ||
                                        ("inline-block" === k && null != j)) &&
                                        "none" === r.css(a, "float") &&
                                        (i ||
                                            (m.done(function () {
                                                o.display = j;
                                            }),
                                            null == j &&
                                                ((k = o.display),
                                                (j = "none" === k ? "" : k))),
                                        (o.display = "inline-block"))),
                                    c.overflow &&
                                        ((o.overflow = "hidden"),
                                        m.always(function () {
                                            (o.overflow = c.overflow[0]),
                                                (o.overflowX = c.overflow[1]),
                                                (o.overflowY = c.overflow[2]);
                                        })),
                                    (i = !1);

                                for (d in n) {
                                    i ||
                                        (q
                                            ? "hidden" in q && (p = q.hidden)
                                            : (q = W.access(a, "fxshow", {
                                                  display: j,
                                              })),
                                        f && (q.hidden = !p),
                                        p && ia([a], !0),
                                        m.done(function () {
                                            p || ia([a]), W.remove(a, "fxshow");

                                            for (d in n) {
                                                r.style(a, d, n[d]);
                                            }
                                        })),
                                        (i = hb(p ? q[d] : 0, d, m)),
                                        d in q ||
                                            ((q[d] = i.start),
                                            p &&
                                                ((i.end = i.start),
                                                (i.start = 0)));
                                }
                            }
                        }

                        function jb(a, b) {
                            var c, d, e, f, g;

                            for (c in a) {
                                if (
                                    ((d = r.camelCase(c)),
                                    (e = b[d]),
                                    (f = a[c]),
                                    Array.isArray(f) &&
                                        ((e = f[1]), (f = a[c] = f[0])),
                                    c !== d && ((a[d] = f), delete a[c]),
                                    (g = r.cssHooks[d]),
                                    g && "expand" in g)
                                ) {
                                    (f = g.expand(f)), delete a[d];

                                    for (c in f) {
                                        c in a || ((a[c] = f[c]), (b[c] = e));
                                    }
                                } else b[d] = e;
                            }
                        }

                        function kb(a, b, c) {
                            var d,
                                e,
                                f = 0,
                                g = kb.prefilters.length,
                                h = r.Deferred().always(function () {
                                    delete i.elem;
                                }),
                                i = function i() {
                                    if (e) return !1;

                                    for (
                                        var b = ab || fb(),
                                            c = Math.max(
                                                0,
                                                j.startTime + j.duration - b
                                            ),
                                            d = c / j.duration || 0,
                                            f = 1 - d,
                                            g = 0,
                                            i = j.tweens.length;
                                        g < i;
                                        g++
                                    ) {
                                        j.tweens[g].run(f);
                                    }

                                    return (
                                        h.notifyWith(a, [j, f, c]),
                                        f < 1 && i
                                            ? c
                                            : (i || h.notifyWith(a, [j, 1, 0]),
                                              h.resolveWith(a, [j]),
                                              !1)
                                    );
                                },
                                j = h.promise({
                                    elem: a,
                                    props: r.extend({}, b),
                                    opts: r.extend(
                                        !0,
                                        {
                                            specialEasing: {},
                                            easing: r.easing._default,
                                        },
                                        c
                                    ),
                                    originalProperties: b,
                                    originalOptions: c,
                                    startTime: ab || fb(),
                                    duration: c.duration,
                                    tweens: [],
                                    createTween: function createTween(b, c) {
                                        var d = r.Tween(
                                            a,
                                            j.opts,
                                            b,
                                            c,
                                            j.opts.specialEasing[b] ||
                                                j.opts.easing
                                        );
                                        return j.tweens.push(d), d;
                                    },
                                    stop: function stop(b) {
                                        var c = 0,
                                            d = b ? j.tweens.length : 0;
                                        if (e) return this;

                                        for (e = !0; c < d; c++) {
                                            j.tweens[c].run(1);
                                        }

                                        return (
                                            b
                                                ? (h.notifyWith(a, [j, 1, 0]),
                                                  h.resolveWith(a, [j, b]))
                                                : h.rejectWith(a, [j, b]),
                                            this
                                        );
                                    },
                                }),
                                k = j.props;

                            for (jb(k, j.opts.specialEasing); f < g; f++) {
                                if (
                                    (d = kb.prefilters[f].call(j, a, k, j.opts))
                                )
                                    return (
                                        r.isFunction(d.stop) &&
                                            (r._queueHooks(
                                                j.elem,
                                                j.opts.queue
                                            ).stop = r.proxy(d.stop, d)),
                                        d
                                    );
                            }

                            return (
                                r.map(k, hb, j),
                                r.isFunction(j.opts.start) &&
                                    j.opts.start.call(a, j),
                                j
                                    .progress(j.opts.progress)
                                    .done(j.opts.done, j.opts.complete)
                                    .fail(j.opts.fail)
                                    .always(j.opts.always),
                                r.fx.timer(
                                    r.extend(i, {
                                        elem: a,
                                        anim: j,
                                        queue: j.opts.queue,
                                    })
                                ),
                                j
                            );
                        }

                        (r.Animation = r.extend(kb, {
                            tweeners: {
                                "*": [
                                    function (a, b) {
                                        var c = this.createTween(a, b);
                                        return fa(c.elem, a, ba.exec(b), c), c;
                                    },
                                ],
                            },
                            tweener: function tweener(a, b) {
                                r.isFunction(a)
                                    ? ((b = a), (a = ["*"]))
                                    : (a = a.match(L));

                                for (var c, d = 0, e = a.length; d < e; d++) {
                                    (c = a[d]),
                                        (kb.tweeners[c] = kb.tweeners[c] || []),
                                        kb.tweeners[c].unshift(b);
                                }
                            },
                            prefilters: [ib],
                            prefilter: function prefilter(a, b) {
                                b
                                    ? kb.prefilters.unshift(a)
                                    : kb.prefilters.push(a);
                            },
                        })),
                            (r.speed = function (a, b, c) {
                                var d =
                                    a && "object" == _typeof(a)
                                        ? r.extend({}, a)
                                        : {
                                              complete:
                                                  c ||
                                                  (!c && b) ||
                                                  (r.isFunction(a) && a),
                                              duration: a,
                                              easing:
                                                  (c && b) ||
                                                  (b && !r.isFunction(b) && b),
                                          };
                                return (
                                    r.fx.off
                                        ? (d.duration = 0)
                                        : "number" != typeof d.duration &&
                                          (d.duration in r.fx.speeds
                                              ? (d.duration =
                                                    r.fx.speeds[d.duration])
                                              : (d.duration =
                                                    r.fx.speeds._default)),
                                    (null != d.queue && d.queue !== !0) ||
                                        (d.queue = "fx"),
                                    (d.old = d.complete),
                                    (d.complete = function () {
                                        r.isFunction(d.old) && d.old.call(this),
                                            d.queue && r.dequeue(this, d.queue);
                                    }),
                                    d
                                );
                            }),
                            r.fn.extend({
                                fadeTo: function fadeTo(a, b, c, d) {
                                    return this.filter(da)
                                        .css("opacity", 0)
                                        .show()
                                        .end()
                                        .animate(
                                            {
                                                opacity: b,
                                            },
                                            a,
                                            c,
                                            d
                                        );
                                },
                                animate: function animate(a, b, c, d) {
                                    var e = r.isEmptyObject(a),
                                        f = r.speed(b, c, d),
                                        g = function g() {
                                            var b = kb(
                                                this,
                                                r.extend({}, a),
                                                f
                                            );
                                            (e || W.get(this, "finish")) &&
                                                b.stop(!0);
                                        };

                                    return (
                                        (g.finish = g),
                                        e || f.queue === !1
                                            ? this.each(g)
                                            : this.queue(f.queue, g)
                                    );
                                },
                                stop: function stop(a, b, c) {
                                    var d = function d(a) {
                                        var b = a.stop;
                                        delete a.stop, b(c);
                                    };

                                    return (
                                        "string" != typeof a &&
                                            ((c = b), (b = a), (a = void 0)),
                                        b &&
                                            a !== !1 &&
                                            this.queue(a || "fx", []),
                                        this.each(function () {
                                            var b = !0,
                                                e =
                                                    null != a &&
                                                    a + "queueHooks",
                                                f = r.timers,
                                                g = W.get(this);
                                            if (e) g[e] && g[e].stop && d(g[e]);
                                            else
                                                for (e in g) {
                                                    g[e] &&
                                                        g[e].stop &&
                                                        db.test(e) &&
                                                        d(g[e]);
                                                }

                                            for (e = f.length; e--; ) {
                                                f[e].elem !== this ||
                                                    (null != a &&
                                                        f[e].queue !== a) ||
                                                    (f[e].anim.stop(c),
                                                    (b = !1),
                                                    f.splice(e, 1));
                                            }

                                            (!b && c) || r.dequeue(this, a);
                                        })
                                    );
                                },
                                finish: function finish(a) {
                                    return (
                                        a !== !1 && (a = a || "fx"),
                                        this.each(function () {
                                            var b,
                                                c = W.get(this),
                                                d = c[a + "queue"],
                                                e = c[a + "queueHooks"],
                                                f = r.timers,
                                                g = d ? d.length : 0;

                                            for (
                                                c.finish = !0,
                                                    r.queue(this, a, []),
                                                    e &&
                                                        e.stop &&
                                                        e.stop.call(this, !0),
                                                    b = f.length;
                                                b--;

                                            ) {
                                                f[b].elem === this &&
                                                    f[b].queue === a &&
                                                    (f[b].anim.stop(!0),
                                                    f.splice(b, 1));
                                            }

                                            for (b = 0; b < g; b++) {
                                                d[b] &&
                                                    d[b].finish &&
                                                    d[b].finish.call(this);
                                            }

                                            delete c.finish;
                                        })
                                    );
                                },
                            }),
                            r.each(["toggle", "show", "hide"], function (a, b) {
                                var c = r.fn[b];

                                r.fn[b] = function (a, d, e) {
                                    return null == a || "boolean" == typeof a
                                        ? c.apply(this, arguments)
                                        : this.animate(gb(b, !0), a, d, e);
                                };
                            }),
                            r.each(
                                {
                                    slideDown: gb("show"),
                                    slideUp: gb("hide"),
                                    slideToggle: gb("toggle"),
                                    fadeIn: {
                                        opacity: "show",
                                    },
                                    fadeOut: {
                                        opacity: "hide",
                                    },
                                    fadeToggle: {
                                        opacity: "toggle",
                                    },
                                },
                                function (a, b) {
                                    r.fn[a] = function (a, c, d) {
                                        return this.animate(b, a, c, d);
                                    };
                                }
                            ),
                            (r.timers = []),
                            (r.fx.tick = function () {
                                var a,
                                    b = 0,
                                    c = r.timers;

                                for (ab = r.now(); b < c.length; b++) {
                                    (a = c[b]),
                                        a() || c[b] !== a || c.splice(b--, 1);
                                }

                                c.length || r.fx.stop(), (ab = void 0);
                            }),
                            (r.fx.timer = function (a) {
                                r.timers.push(a), r.fx.start();
                            }),
                            (r.fx.interval = 13),
                            (r.fx.start = function () {
                                bb || ((bb = !0), eb());
                            }),
                            (r.fx.stop = function () {
                                bb = null;
                            }),
                            (r.fx.speeds = {
                                slow: 600,
                                fast: 200,
                                _default: 400,
                            }),
                            (r.fn.delay = function (b, c) {
                                return (
                                    (b = r.fx ? r.fx.speeds[b] || b : b),
                                    (c = c || "fx"),
                                    this.queue(c, function (c, d) {
                                        var e = a.setTimeout(c, b);

                                        d.stop = function () {
                                            a.clearTimeout(e);
                                        };
                                    })
                                );
                            }),
                            (function () {
                                var a = d.createElement("input"),
                                    b = d.createElement("select"),
                                    c = b.appendChild(
                                        d.createElement("option")
                                    );
                                (a.type = "checkbox"),
                                    (o.checkOn = "" !== a.value),
                                    (o.optSelected = c.selected),
                                    (a = d.createElement("input")),
                                    (a.value = "t"),
                                    (a.type = "radio"),
                                    (o.radioValue = "t" === a.value);
                            })();
                        var lb,
                            mb = r.expr.attrHandle;
                        r.fn.extend({
                            attr: function attr(a, b) {
                                return T(
                                    this,
                                    r.attr,
                                    a,
                                    b,
                                    arguments.length > 1
                                );
                            },
                            removeAttr: function removeAttr(a) {
                                return this.each(function () {
                                    r.removeAttr(this, a);
                                });
                            },
                        }),
                            r.extend({
                                attr: function attr(a, b, c) {
                                    var d,
                                        e,
                                        f = a.nodeType;
                                    if (3 !== f && 8 !== f && 2 !== f)
                                        return "undefined" ==
                                            typeof a.getAttribute
                                            ? r.prop(a, b, c)
                                            : ((1 === f && r.isXMLDoc(a)) ||
                                                  (e =
                                                      r.attrHooks[
                                                          b.toLowerCase()
                                                      ] ||
                                                      (r.expr.match.bool.test(b)
                                                          ? lb
                                                          : void 0)),
                                              void 0 !== c
                                                  ? null === c
                                                      ? void r.removeAttr(a, b)
                                                      : e &&
                                                        "set" in e &&
                                                        void 0 !==
                                                            (d = e.set(a, c, b))
                                                      ? d
                                                      : (a.setAttribute(
                                                            b,
                                                            c + ""
                                                        ),
                                                        c)
                                                  : e &&
                                                    "get" in e &&
                                                    null !== (d = e.get(a, b))
                                                  ? d
                                                  : ((d = r.find.attr(a, b)),
                                                    null == d ? void 0 : d));
                                },
                                attrHooks: {
                                    type: {
                                        set: function set(a, b) {
                                            if (
                                                !o.radioValue &&
                                                "radio" === b &&
                                                B(a, "input")
                                            ) {
                                                var c = a.value;
                                                return (
                                                    a.setAttribute("type", b),
                                                    c && (a.value = c),
                                                    b
                                                );
                                            }
                                        },
                                    },
                                },
                                removeAttr: function removeAttr(a, b) {
                                    var c,
                                        d = 0,
                                        e = b && b.match(L);
                                    if (e && 1 === a.nodeType)
                                        while ((c = e[d++])) {
                                            a.removeAttribute(c);
                                        }
                                },
                            }),
                            (lb = {
                                set: function set(a, b, c) {
                                    return (
                                        b === !1
                                            ? r.removeAttr(a, c)
                                            : a.setAttribute(c, c),
                                        c
                                    );
                                },
                            }),
                            r.each(
                                r.expr.match.bool.source.match(/\w+/g),
                                function (a, b) {
                                    var c = mb[b] || r.find.attr;

                                    mb[b] = function (a, b, d) {
                                        var e,
                                            f,
                                            g = b.toLowerCase();
                                        return (
                                            d ||
                                                ((f = mb[g]),
                                                (mb[g] = e),
                                                (e =
                                                    null != c(a, b, d)
                                                        ? g
                                                        : null),
                                                (mb[g] = f)),
                                            e
                                        );
                                    };
                                }
                            );
                        var nb = /^(?:input|select|textarea|button)$/i,
                            ob = /^(?:a|area)$/i;
                        r.fn.extend({
                            prop: function prop(a, b) {
                                return T(
                                    this,
                                    r.prop,
                                    a,
                                    b,
                                    arguments.length > 1
                                );
                            },
                            removeProp: function removeProp(a) {
                                return this.each(function () {
                                    delete this[r.propFix[a] || a];
                                });
                            },
                        }),
                            r.extend({
                                prop: function prop(a, b, c) {
                                    var d,
                                        e,
                                        f = a.nodeType;
                                    if (3 !== f && 8 !== f && 2 !== f)
                                        return (
                                            (1 === f && r.isXMLDoc(a)) ||
                                                ((b = r.propFix[b] || b),
                                                (e = r.propHooks[b])),
                                            void 0 !== c
                                                ? e &&
                                                  "set" in e &&
                                                  void 0 !==
                                                      (d = e.set(a, c, b))
                                                    ? d
                                                    : (a[b] = c)
                                                : e &&
                                                  "get" in e &&
                                                  null !== (d = e.get(a, b))
                                                ? d
                                                : a[b]
                                        );
                                },
                                propHooks: {
                                    tabIndex: {
                                        get: function get(a) {
                                            var b = r.find.attr(a, "tabindex");
                                            return b
                                                ? parseInt(b, 10)
                                                : nb.test(a.nodeName) ||
                                                  (ob.test(a.nodeName) &&
                                                      a.href)
                                                ? 0
                                                : -1;
                                        },
                                    },
                                },
                                propFix: {
                                    for: "htmlFor",
                                    class: "className",
                                },
                            }),
                            o.optSelected ||
                                (r.propHooks.selected = {
                                    get: function get(a) {
                                        var b = a.parentNode;
                                        return (
                                            b &&
                                                b.parentNode &&
                                                b.parentNode.selectedIndex,
                                            null
                                        );
                                    },
                                    set: function set(a) {
                                        var b = a.parentNode;
                                        b &&
                                            (b.selectedIndex,
                                            b.parentNode &&
                                                b.parentNode.selectedIndex);
                                    },
                                }),
                            r.each(
                                [
                                    "tabIndex",
                                    "readOnly",
                                    "maxLength",
                                    "cellSpacing",
                                    "cellPadding",
                                    "rowSpan",
                                    "colSpan",
                                    "useMap",
                                    "frameBorder",
                                    "contentEditable",
                                ],
                                function () {
                                    r.propFix[this.toLowerCase()] = this;
                                }
                            );

                        function pb(a) {
                            var b = a.match(L) || [];
                            return b.join(" ");
                        }

                        function qb(a) {
                            return (
                                (a.getAttribute && a.getAttribute("class")) ||
                                ""
                            );
                        }

                        r.fn.extend({
                            addClass: function addClass(a) {
                                var b,
                                    c,
                                    d,
                                    e,
                                    f,
                                    g,
                                    h,
                                    i = 0;
                                if (r.isFunction(a))
                                    return this.each(function (b) {
                                        r(this).addClass(
                                            a.call(this, b, qb(this))
                                        );
                                    });

                                if ("string" == typeof a && a) {
                                    b = a.match(L) || [];

                                    while ((c = this[i++])) {
                                        if (
                                            ((e = qb(c)),
                                            (d =
                                                1 === c.nodeType &&
                                                " " + pb(e) + " "))
                                        ) {
                                            g = 0;

                                            while ((f = b[g++])) {
                                                d.indexOf(" " + f + " ") < 0 &&
                                                    (d += f + " ");
                                            }

                                            (h = pb(d)),
                                                e !== h &&
                                                    c.setAttribute("class", h);
                                        }
                                    }
                                }

                                return this;
                            },
                            removeClass: function removeClass(a) {
                                var b,
                                    c,
                                    d,
                                    e,
                                    f,
                                    g,
                                    h,
                                    i = 0;
                                if (r.isFunction(a))
                                    return this.each(function (b) {
                                        r(this).removeClass(
                                            a.call(this, b, qb(this))
                                        );
                                    });
                                if (!arguments.length)
                                    return this.attr("class", "");

                                if ("string" == typeof a && a) {
                                    b = a.match(L) || [];

                                    while ((c = this[i++])) {
                                        if (
                                            ((e = qb(c)),
                                            (d =
                                                1 === c.nodeType &&
                                                " " + pb(e) + " "))
                                        ) {
                                            g = 0;

                                            while ((f = b[g++])) {
                                                while (
                                                    d.indexOf(" " + f + " ") >
                                                    -1
                                                ) {
                                                    d = d.replace(
                                                        " " + f + " ",
                                                        " "
                                                    );
                                                }
                                            }

                                            (h = pb(d)),
                                                e !== h &&
                                                    c.setAttribute("class", h);
                                        }
                                    }
                                }

                                return this;
                            },
                            toggleClass: function toggleClass(a, b) {
                                var c = _typeof(a);

                                return "boolean" == typeof b && "string" === c
                                    ? b
                                        ? this.addClass(a)
                                        : this.removeClass(a)
                                    : r.isFunction(a)
                                    ? this.each(function (c) {
                                          r(this).toggleClass(
                                              a.call(this, c, qb(this), b),
                                              b
                                          );
                                      })
                                    : this.each(function () {
                                          var b, d, e, f;

                                          if ("string" === c) {
                                              (d = 0),
                                                  (e = r(this)),
                                                  (f = a.match(L) || []);

                                              while ((b = f[d++])) {
                                                  e.hasClass(b)
                                                      ? e.removeClass(b)
                                                      : e.addClass(b);
                                              }
                                          } else (void 0 !== a && "boolean" !== c) || ((b = qb(this)), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || ""));
                                      });
                            },
                            hasClass: function hasClass(a) {
                                var b,
                                    c,
                                    d = 0;
                                b = " " + a + " ";

                                while ((c = this[d++])) {
                                    if (
                                        1 === c.nodeType &&
                                        (" " + pb(qb(c)) + " ").indexOf(b) > -1
                                    )
                                        return !0;
                                }

                                return !1;
                            },
                        });
                        var rb = /\r/g;
                        r.fn.extend({
                            val: function val(a) {
                                var b,
                                    c,
                                    d,
                                    e = this[0];
                                {
                                    if (arguments.length)
                                        return (
                                            (d = r.isFunction(a)),
                                            this.each(function (c) {
                                                var e;
                                                1 === this.nodeType &&
                                                    ((e = d
                                                        ? a.call(
                                                              this,
                                                              c,
                                                              r(this).val()
                                                          )
                                                        : a),
                                                    null == e
                                                        ? (e = "")
                                                        : "number" == typeof e
                                                        ? (e += "")
                                                        : Array.isArray(e) &&
                                                          (e = r.map(
                                                              e,
                                                              function (a) {
                                                                  return null ==
                                                                      a
                                                                      ? ""
                                                                      : a + "";
                                                              }
                                                          )),
                                                    (b =
                                                        r.valHooks[this.type] ||
                                                        r.valHooks[
                                                            this.nodeName.toLowerCase()
                                                        ]),
                                                    (b &&
                                                        "set" in b &&
                                                        void 0 !==
                                                            b.set(
                                                                this,
                                                                e,
                                                                "value"
                                                            )) ||
                                                        (this.value = e));
                                            })
                                        );
                                    if (e)
                                        return (
                                            (b =
                                                r.valHooks[e.type] ||
                                                r.valHooks[
                                                    e.nodeName.toLowerCase()
                                                ]),
                                            b &&
                                            "get" in b &&
                                            void 0 !== (c = b.get(e, "value"))
                                                ? c
                                                : ((c = e.value),
                                                  "string" == typeof c
                                                      ? c.replace(rb, "")
                                                      : null == c
                                                      ? ""
                                                      : c)
                                        );
                                }
                            },
                        }),
                            r.extend({
                                valHooks: {
                                    option: {
                                        get: function get(a) {
                                            var b = r.find.attr(a, "value");
                                            return null != b
                                                ? b
                                                : pb(r.text(a));
                                        },
                                    },
                                    select: {
                                        get: function get(a) {
                                            var b,
                                                c,
                                                d,
                                                e = a.options,
                                                f = a.selectedIndex,
                                                g = "select-one" === a.type,
                                                h = g ? null : [],
                                                i = g ? f + 1 : e.length;

                                            for (
                                                d = f < 0 ? i : g ? f : 0;
                                                d < i;
                                                d++
                                            ) {
                                                if (
                                                    ((c = e[d]),
                                                    (c.selected || d === f) &&
                                                        !c.disabled &&
                                                        (!c.parentNode
                                                            .disabled ||
                                                            !B(
                                                                c.parentNode,
                                                                "optgroup"
                                                            )))
                                                ) {
                                                    if (((b = r(c).val()), g))
                                                        return b;
                                                    h.push(b);
                                                }
                                            }

                                            return h;
                                        },
                                        set: function set(a, b) {
                                            var c,
                                                d,
                                                e = a.options,
                                                f = r.makeArray(b),
                                                g = e.length;

                                            while (g--) {
                                                (d = e[g]),
                                                    (d.selected =
                                                        r.inArray(
                                                            r.valHooks.option.get(
                                                                d
                                                            ),
                                                            f
                                                        ) > -1) && (c = !0);
                                            }

                                            return (
                                                c || (a.selectedIndex = -1), f
                                            );
                                        },
                                    },
                                },
                            }),
                            r.each(["radio", "checkbox"], function () {
                                (r.valHooks[this] = {
                                    set: function set(a, b) {
                                        if (Array.isArray(b))
                                            return (a.checked =
                                                r.inArray(r(a).val(), b) > -1);
                                    },
                                }),
                                    o.checkOn ||
                                        (r.valHooks[this].get = function (a) {
                                            return null ===
                                                a.getAttribute("value")
                                                ? "on"
                                                : a.value;
                                        });
                            });
                        var sb = /^(?:focusinfocus|focusoutblur)$/;
                        r.extend(r.event, {
                            trigger: function trigger(b, c, e, f) {
                                var g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    m,
                                    n,
                                    o = [e || d],
                                    p = l.call(b, "type") ? b.type : b,
                                    q = l.call(b, "namespace")
                                        ? b.namespace.split(".")
                                        : [];

                                if (
                                    ((h = i = e = e || d),
                                    3 !== e.nodeType &&
                                        8 !== e.nodeType &&
                                        !sb.test(p + r.event.triggered) &&
                                        (p.indexOf(".") > -1 &&
                                            ((q = p.split(".")),
                                            (p = q.shift()),
                                            q.sort()),
                                        (k = p.indexOf(":") < 0 && "on" + p),
                                        (b = b[r.expando]
                                            ? b
                                            : new r.Event(
                                                  p,
                                                  "object" == _typeof(b) && b
                                              )),
                                        (b.isTrigger = f ? 2 : 3),
                                        (b.namespace = q.join(".")),
                                        (b.rnamespace = b.namespace
                                            ? new RegExp(
                                                  "(^|\\.)" +
                                                      q.join("\\.(?:.*\\.|)") +
                                                      "(\\.|$)"
                                              )
                                            : null),
                                        (b.result = void 0),
                                        b.target || (b.target = e),
                                        (c =
                                            null == c
                                                ? [b]
                                                : r.makeArray(c, [b])),
                                        (n = r.event.special[p] || {}),
                                        f ||
                                            !n.trigger ||
                                            n.trigger.apply(e, c) !== !1))
                                ) {
                                    if (!f && !n.noBubble && !r.isWindow(e)) {
                                        for (
                                            j = n.delegateType || p,
                                                sb.test(j + p) ||
                                                    (h = h.parentNode);
                                            h;
                                            h = h.parentNode
                                        ) {
                                            o.push(h), (i = h);
                                        }

                                        i === (e.ownerDocument || d) &&
                                            o.push(
                                                i.defaultView ||
                                                    i.parentWindow ||
                                                    a
                                            );
                                    }

                                    g = 0;

                                    while (
                                        (h = o[g++]) &&
                                        !b.isPropagationStopped()
                                    ) {
                                        (b.type = g > 1 ? j : n.bindType || p),
                                            (m =
                                                (W.get(h, "events") || {})[
                                                    b.type
                                                ] && W.get(h, "handle")),
                                            m && m.apply(h, c),
                                            (m = k && h[k]),
                                            m &&
                                                m.apply &&
                                                U(h) &&
                                                ((b.result = m.apply(h, c)),
                                                b.result === !1 &&
                                                    b.preventDefault());
                                    }

                                    return (
                                        (b.type = p),
                                        f ||
                                            b.isDefaultPrevented() ||
                                            (n._default &&
                                                n._default.apply(o.pop(), c) !==
                                                    !1) ||
                                            !U(e) ||
                                            (k &&
                                                r.isFunction(e[p]) &&
                                                !r.isWindow(e) &&
                                                ((i = e[k]),
                                                i && (e[k] = null),
                                                (r.event.triggered = p),
                                                e[p](),
                                                (r.event.triggered = void 0),
                                                i && (e[k] = i))),
                                        b.result
                                    );
                                }
                            },
                            simulate: function simulate(a, b, c) {
                                var d = r.extend(new r.Event(), c, {
                                    type: a,
                                    isSimulated: !0,
                                });
                                r.event.trigger(d, null, b);
                            },
                        }),
                            r.fn.extend({
                                trigger: function trigger(a, b) {
                                    return this.each(function () {
                                        r.event.trigger(a, b, this);
                                    });
                                },
                                triggerHandler: function triggerHandler(a, b) {
                                    var c = this[0];
                                    if (c) return r.event.trigger(a, b, c, !0);
                                },
                            }),
                            r.each(
                                "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                                    " "
                                ),
                                function (a, b) {
                                    r.fn[b] = function (a, c) {
                                        return arguments.length > 0
                                            ? this.on(b, null, a, c)
                                            : this.trigger(b);
                                    };
                                }
                            ),
                            r.fn.extend({
                                hover: function hover(a, b) {
                                    return this.mouseenter(a).mouseleave(
                                        b || a
                                    );
                                },
                            }),
                            (o.focusin = "onfocusin" in a),
                            o.focusin ||
                                r.each(
                                    {
                                        focus: "focusin",
                                        blur: "focusout",
                                    },
                                    function (a, b) {
                                        var c = function c(a) {
                                            r.event.simulate(
                                                b,
                                                a.target,
                                                r.event.fix(a)
                                            );
                                        };

                                        r.event.special[b] = {
                                            setup: function setup() {
                                                var d =
                                                        this.ownerDocument ||
                                                        this,
                                                    e = W.access(d, b);
                                                e ||
                                                    d.addEventListener(
                                                        a,
                                                        c,
                                                        !0
                                                    ),
                                                    W.access(
                                                        d,
                                                        b,
                                                        (e || 0) + 1
                                                    );
                                            },
                                            teardown: function teardown() {
                                                var d =
                                                        this.ownerDocument ||
                                                        this,
                                                    e = W.access(d, b) - 1;
                                                e
                                                    ? W.access(d, b, e)
                                                    : (d.removeEventListener(
                                                          a,
                                                          c,
                                                          !0
                                                      ),
                                                      W.remove(d, b));
                                            },
                                        };
                                    }
                                );
                        var tb = a.location,
                            ub = r.now(),
                            vb = /\?/;

                        r.parseXML = function (b) {
                            var c;
                            if (!b || "string" != typeof b) return null;

                            try {
                                c = new a.DOMParser().parseFromString(
                                    b,
                                    "text/xml"
                                );
                            } catch (d) {
                                c = void 0;
                            }

                            return (
                                (c &&
                                    !c.getElementsByTagName("parsererror")
                                        .length) ||
                                    r.error("Invalid XML: " + b),
                                c
                            );
                        };

                        var wb = /\[\]$/,
                            xb = /\r?\n/g,
                            yb = /^(?:submit|button|image|reset|file)$/i,
                            zb = /^(?:input|select|textarea|keygen)/i;

                        function Ab(a, b, c, d) {
                            var e;
                            if (Array.isArray(b))
                                r.each(b, function (b, e) {
                                    c || wb.test(a)
                                        ? d(a, e)
                                        : Ab(
                                              a +
                                                  "[" +
                                                  ("object" == _typeof(e) &&
                                                  null != e
                                                      ? b
                                                      : "") +
                                                  "]",
                                              e,
                                              c,
                                              d
                                          );
                                });
                            else if (c || "object" !== r.type(b)) d(a, b);
                            else
                                for (e in b) {
                                    Ab(a + "[" + e + "]", b[e], c, d);
                                }
                        }

                        (r.param = function (a, b) {
                            var c,
                                d = [],
                                e = function e(a, b) {
                                    var c = r.isFunction(b) ? b() : b;
                                    d[d.length] =
                                        encodeURIComponent(a) +
                                        "=" +
                                        encodeURIComponent(null == c ? "" : c);
                                };

                            if (
                                Array.isArray(a) ||
                                (a.jquery && !r.isPlainObject(a))
                            )
                                r.each(a, function () {
                                    e(this.name, this.value);
                                });
                            else
                                for (c in a) {
                                    Ab(c, a[c], b, e);
                                }
                            return d.join("&");
                        }),
                            r.fn.extend({
                                serialize: function serialize() {
                                    return r.param(this.serializeArray());
                                },
                                serializeArray: function serializeArray() {
                                    return this.map(function () {
                                        var a = r.prop(this, "elements");
                                        return a ? r.makeArray(a) : this;
                                    })
                                        .filter(function () {
                                            var a = this.type;
                                            return (
                                                this.name &&
                                                !r(this).is(":disabled") &&
                                                zb.test(this.nodeName) &&
                                                !yb.test(a) &&
                                                (this.checked || !ja.test(a))
                                            );
                                        })
                                        .map(function (a, b) {
                                            var c = r(this).val();
                                            return null == c
                                                ? null
                                                : Array.isArray(c)
                                                ? r.map(c, function (a) {
                                                      return {
                                                          name: b.name,
                                                          value: a.replace(
                                                              xb,
                                                              "\r\n"
                                                          ),
                                                      };
                                                  })
                                                : {
                                                      name: b.name,
                                                      value: c.replace(
                                                          xb,
                                                          "\r\n"
                                                      ),
                                                  };
                                        })
                                        .get();
                                },
                            });
                        var Bb = /%20/g,
                            Cb = /#.*$/,
                            Db = /([?&])_=[^&]*/,
                            Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                            Fb =
                                /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                            Gb = /^(?:GET|HEAD)$/,
                            Hb = /^\/\//,
                            Ib = {},
                            Jb = {},
                            Kb = "*/".concat("*"),
                            Lb = d.createElement("a");
                        Lb.href = tb.href;

                        function Mb(a) {
                            return function (b, c) {
                                "string" != typeof b && ((c = b), (b = "*"));
                                var d,
                                    e = 0,
                                    f = b.toLowerCase().match(L) || [];
                                if (r.isFunction(c))
                                    while ((d = f[e++])) {
                                        "+" === d[0]
                                            ? ((d = d.slice(1) || "*"),
                                              (a[d] = a[d] || []).unshift(c))
                                            : (a[d] = a[d] || []).push(c);
                                    }
                            };
                        }

                        function Nb(a, b, c, d) {
                            var e = {},
                                f = a === Jb;

                            function g(h) {
                                var i;
                                return (
                                    (e[h] = !0),
                                    r.each(a[h] || [], function (a, h) {
                                        var j = h(b, c, d);
                                        return "string" != typeof j || f || e[j]
                                            ? f
                                                ? !(i = j)
                                                : void 0
                                            : (b.dataTypes.unshift(j),
                                              g(j),
                                              !1);
                                    }),
                                    i
                                );
                            }

                            return g(b.dataTypes[0]) || (!e["*"] && g("*"));
                        }

                        function Ob(a, b) {
                            var c,
                                d,
                                e = r.ajaxSettings.flatOptions || {};

                            for (c in b) {
                                void 0 !== b[c] &&
                                    ((e[c] ? a : d || (d = {}))[c] = b[c]);
                            }

                            return d && r.extend(!0, a, d), a;
                        }

                        function Pb(a, b, c) {
                            var d,
                                e,
                                f,
                                g,
                                h = a.contents,
                                i = a.dataTypes;

                            while ("*" === i[0]) {
                                i.shift(),
                                    void 0 === d &&
                                        (d =
                                            a.mimeType ||
                                            b.getResponseHeader(
                                                "Content-Type"
                                            ));
                            }

                            if (d)
                                for (e in h) {
                                    if (h[e] && h[e].test(d)) {
                                        i.unshift(e);
                                        break;
                                    }
                                }
                            if (i[0] in c) f = i[0];
                            else {
                                for (e in c) {
                                    if (!i[0] || a.converters[e + " " + i[0]]) {
                                        f = e;
                                        break;
                                    }

                                    g || (g = e);
                                }

                                f = f || g;
                            }
                            if (f) return f !== i[0] && i.unshift(f), c[f];
                        }

                        function Qb(a, b, c, d) {
                            var e,
                                f,
                                g,
                                h,
                                i,
                                j = {},
                                k = a.dataTypes.slice();
                            if (k[1])
                                for (g in a.converters) {
                                    j[g.toLowerCase()] = a.converters[g];
                                }
                            f = k.shift();

                            while (f) {
                                if (
                                    (a.responseFields[f] &&
                                        (c[a.responseFields[f]] = b),
                                    !i &&
                                        d &&
                                        a.dataFilter &&
                                        (b = a.dataFilter(b, a.dataType)),
                                    (i = f),
                                    (f = k.shift()))
                                )
                                    if ("*" === f) f = i;
                                    else if ("*" !== i && i !== f) {
                                        if (
                                            ((g =
                                                j[i + " " + f] || j["* " + f]),
                                            !g)
                                        )
                                            for (e in j) {
                                                if (
                                                    ((h = e.split(" ")),
                                                    h[1] === f &&
                                                        (g =
                                                            j[i + " " + h[0]] ||
                                                            j["* " + h[0]]))
                                                ) {
                                                    g === !0
                                                        ? (g = j[e])
                                                        : j[e] !== !0 &&
                                                          ((f = h[0]),
                                                          k.unshift(h[1]));
                                                    break;
                                                }
                                            }
                                        if (g !== !0)
                                            if (g && a["throws"]) b = g(b);
                                            else
                                                try {
                                                    b = g(b);
                                                } catch (l) {
                                                    return {
                                                        state: "parsererror",
                                                        error: g
                                                            ? l
                                                            : "No conversion from " +
                                                              i +
                                                              " to " +
                                                              f,
                                                    };
                                                }
                                    }
                            }

                            return {
                                state: "success",
                                data: b,
                            };
                        }

                        r.extend({
                            active: 0,
                            lastModified: {},
                            etag: {},
                            ajaxSettings: {
                                url: tb.href,
                                type: "GET",
                                isLocal: Fb.test(tb.protocol),
                                global: !0,
                                processData: !0,
                                async: !0,
                                contentType:
                                    "application/x-www-form-urlencoded; charset=UTF-8",
                                accepts: {
                                    "*": Kb,
                                    text: "text/plain",
                                    html: "text/html",
                                    xml: "application/xml, text/xml",
                                    json: "application/json, text/javascript",
                                },
                                contents: {
                                    xml: /\bxml\b/,
                                    html: /\bhtml/,
                                    json: /\bjson\b/,
                                },
                                responseFields: {
                                    xml: "responseXML",
                                    text: "responseText",
                                    json: "responseJSON",
                                },
                                converters: {
                                    "* text": String,
                                    "text html": !0,
                                    "text json": JSON.parse,
                                    "text xml": r.parseXML,
                                },
                                flatOptions: {
                                    url: !0,
                                    context: !0,
                                },
                            },
                            ajaxSetup: function ajaxSetup(a, b) {
                                return b
                                    ? Ob(Ob(a, r.ajaxSettings), b)
                                    : Ob(r.ajaxSettings, a);
                            },
                            ajaxPrefilter: Mb(Ib),
                            ajaxTransport: Mb(Jb),
                            ajax: function ajax(b, c) {
                                "object" == _typeof(b) &&
                                    ((c = b), (b = void 0)),
                                    (c = c || {});
                                var e,
                                    f,
                                    g,
                                    h,
                                    i,
                                    j,
                                    k,
                                    l,
                                    m,
                                    n,
                                    o = r.ajaxSetup({}, c),
                                    p = o.context || o,
                                    q =
                                        o.context && (p.nodeType || p.jquery)
                                            ? r(p)
                                            : r.event,
                                    s = r.Deferred(),
                                    t = r.Callbacks("once memory"),
                                    u = o.statusCode || {},
                                    v = {},
                                    w = {},
                                    x = "canceled",
                                    y = {
                                        readyState: 0,
                                        getResponseHeader:
                                            function getResponseHeader(a) {
                                                var b;

                                                if (k) {
                                                    if (!h) {
                                                        h = {};

                                                        while (
                                                            (b = Eb.exec(g))
                                                        ) {
                                                            h[
                                                                b[1].toLowerCase()
                                                            ] = b[2];
                                                        }
                                                    }

                                                    b = h[a.toLowerCase()];
                                                }

                                                return null == b ? null : b;
                                            },
                                        getAllResponseHeaders:
                                            function getAllResponseHeaders() {
                                                return k ? g : null;
                                            },
                                        setRequestHeader:
                                            function setRequestHeader(a, b) {
                                                return (
                                                    null == k &&
                                                        ((a = w[
                                                            a.toLowerCase()
                                                        ] =
                                                            w[
                                                                a.toLowerCase()
                                                            ] || a),
                                                        (v[a] = b)),
                                                    this
                                                );
                                            },
                                        overrideMimeType:
                                            function overrideMimeType(a) {
                                                return (
                                                    null == k &&
                                                        (o.mimeType = a),
                                                    this
                                                );
                                            },
                                        statusCode: function statusCode(a) {
                                            var b;
                                            if (a)
                                                if (k) y.always(a[y.status]);
                                                else
                                                    for (b in a) {
                                                        u[b] = [u[b], a[b]];
                                                    }
                                            return this;
                                        },
                                        abort: function abort(a) {
                                            var b = a || x;
                                            return (
                                                e && e.abort(b), A(0, b), this
                                            );
                                        },
                                    };

                                if (
                                    (s.promise(y),
                                    (o.url = (
                                        (b || o.url || tb.href) + ""
                                    ).replace(Hb, tb.protocol + "//")),
                                    (o.type =
                                        c.method ||
                                        c.type ||
                                        o.method ||
                                        o.type),
                                    (o.dataTypes = (o.dataType || "*")
                                        .toLowerCase()
                                        .match(L) || [""]),
                                    null == o.crossDomain)
                                ) {
                                    j = d.createElement("a");

                                    try {
                                        (j.href = o.url),
                                            (j.href = j.href),
                                            (o.crossDomain =
                                                Lb.protocol + "//" + Lb.host !=
                                                j.protocol + "//" + j.host);
                                    } catch (z) {
                                        o.crossDomain = !0;
                                    }
                                }

                                if (
                                    (o.data &&
                                        o.processData &&
                                        "string" != typeof o.data &&
                                        (o.data = r.param(
                                            o.data,
                                            o.traditional
                                        )),
                                    Nb(Ib, o, c, y),
                                    k)
                                )
                                    return y;
                                (l = r.event && o.global),
                                    l &&
                                        0 === r.active++ &&
                                        r.event.trigger("ajaxStart"),
                                    (o.type = o.type.toUpperCase()),
                                    (o.hasContent = !Gb.test(o.type)),
                                    (f = o.url.replace(Cb, "")),
                                    o.hasContent
                                        ? o.data &&
                                          o.processData &&
                                          0 ===
                                              (o.contentType || "").indexOf(
                                                  "application/x-www-form-urlencoded"
                                              ) &&
                                          (o.data = o.data.replace(Bb, "+"))
                                        : ((n = o.url.slice(f.length)),
                                          o.data &&
                                              ((f +=
                                                  (vb.test(f) ? "&" : "?") +
                                                  o.data),
                                              delete o.data),
                                          o.cache === !1 &&
                                              ((f = f.replace(Db, "$1")),
                                              (n =
                                                  (vb.test(f) ? "&" : "?") +
                                                  "_=" +
                                                  ub++ +
                                                  n)),
                                          (o.url = f + n)),
                                    o.ifModified &&
                                        (r.lastModified[f] &&
                                            y.setRequestHeader(
                                                "If-Modified-Since",
                                                r.lastModified[f]
                                            ),
                                        r.etag[f] &&
                                            y.setRequestHeader(
                                                "If-None-Match",
                                                r.etag[f]
                                            )),
                                    ((o.data &&
                                        o.hasContent &&
                                        o.contentType !== !1) ||
                                        c.contentType) &&
                                        y.setRequestHeader(
                                            "Content-Type",
                                            o.contentType
                                        ),
                                    y.setRequestHeader(
                                        "Accept",
                                        o.dataTypes[0] &&
                                            o.accepts[o.dataTypes[0]]
                                            ? o.accepts[o.dataTypes[0]] +
                                                  ("*" !== o.dataTypes[0]
                                                      ? ", " + Kb + "; q=0.01"
                                                      : "")
                                            : o.accepts["*"]
                                    );

                                for (m in o.headers) {
                                    y.setRequestHeader(m, o.headers[m]);
                                }

                                if (
                                    o.beforeSend &&
                                    (o.beforeSend.call(p, y, o) === !1 || k)
                                )
                                    return y.abort();

                                if (
                                    ((x = "abort"),
                                    t.add(o.complete),
                                    y.done(o.success),
                                    y.fail(o.error),
                                    (e = Nb(Jb, o, c, y)))
                                ) {
                                    if (
                                        ((y.readyState = 1),
                                        l && q.trigger("ajaxSend", [y, o]),
                                        k)
                                    )
                                        return y;
                                    o.async &&
                                        o.timeout > 0 &&
                                        (i = a.setTimeout(function () {
                                            y.abort("timeout");
                                        }, o.timeout));

                                    try {
                                        (k = !1), e.send(v, A);
                                    } catch (z) {
                                        if (k) throw z;
                                        A(-1, z);
                                    }
                                } else A(-1, "No Transport");

                                function A(b, c, d, h) {
                                    var j,
                                        m,
                                        n,
                                        v,
                                        w,
                                        x = c;
                                    k ||
                                        ((k = !0),
                                        i && a.clearTimeout(i),
                                        (e = void 0),
                                        (g = h || ""),
                                        (y.readyState = b > 0 ? 4 : 0),
                                        (j =
                                            (b >= 200 && b < 300) || 304 === b),
                                        d && (v = Pb(o, y, d)),
                                        (v = Qb(o, v, y, j)),
                                        j
                                            ? (o.ifModified &&
                                                  ((w =
                                                      y.getResponseHeader(
                                                          "Last-Modified"
                                                      )),
                                                  w && (r.lastModified[f] = w),
                                                  (w =
                                                      y.getResponseHeader(
                                                          "etag"
                                                      )),
                                                  w && (r.etag[f] = w)),
                                              204 === b || "HEAD" === o.type
                                                  ? (x = "nocontent")
                                                  : 304 === b
                                                  ? (x = "notmodified")
                                                  : ((x = v.state),
                                                    (m = v.data),
                                                    (n = v.error),
                                                    (j = !n)))
                                            : ((n = x),
                                              (!b && x) ||
                                                  ((x = "error"),
                                                  b < 0 && (b = 0))),
                                        (y.status = b),
                                        (y.statusText = (c || x) + ""),
                                        j
                                            ? s.resolveWith(p, [m, x, y])
                                            : s.rejectWith(p, [y, x, n]),
                                        y.statusCode(u),
                                        (u = void 0),
                                        l &&
                                            q.trigger(
                                                j ? "ajaxSuccess" : "ajaxError",
                                                [y, o, j ? m : n]
                                            ),
                                        t.fireWith(p, [y, x]),
                                        l &&
                                            (q.trigger("ajaxComplete", [y, o]),
                                            --r.active ||
                                                r.event.trigger("ajaxStop")));
                                }

                                return y;
                            },
                            getJSON: function getJSON(a, b, c) {
                                return r.get(a, b, c, "json");
                            },
                            getScript: function getScript(a, b) {
                                return r.get(a, void 0, b, "script");
                            },
                        }),
                            r.each(["get", "post"], function (a, b) {
                                r[b] = function (a, c, d, e) {
                                    return (
                                        r.isFunction(c) &&
                                            ((e = e || d),
                                            (d = c),
                                            (c = void 0)),
                                        r.ajax(
                                            r.extend(
                                                {
                                                    url: a,
                                                    type: b,
                                                    dataType: e,
                                                    data: c,
                                                    success: d,
                                                },
                                                r.isPlainObject(a) && a
                                            )
                                        )
                                    );
                                };
                            }),
                            (r._evalUrl = function (a) {
                                return r.ajax({
                                    url: a,
                                    type: "GET",
                                    dataType: "script",
                                    cache: !0,
                                    async: !1,
                                    global: !1,
                                    throws: !0,
                                });
                            }),
                            r.fn.extend({
                                wrapAll: function wrapAll(a) {
                                    var b;
                                    return (
                                        this[0] &&
                                            (r.isFunction(a) &&
                                                (a = a.call(this[0])),
                                            (b = r(a, this[0].ownerDocument)
                                                .eq(0)
                                                .clone(!0)),
                                            this[0].parentNode &&
                                                b.insertBefore(this[0]),
                                            b
                                                .map(function () {
                                                    var a = this;

                                                    while (
                                                        a.firstElementChild
                                                    ) {
                                                        a = a.firstElementChild;
                                                    }

                                                    return a;
                                                })
                                                .append(this)),
                                        this
                                    );
                                },
                                wrapInner: function wrapInner(a) {
                                    return r.isFunction(a)
                                        ? this.each(function (b) {
                                              r(this).wrapInner(
                                                  a.call(this, b)
                                              );
                                          })
                                        : this.each(function () {
                                              var b = r(this),
                                                  c = b.contents();
                                              c.length
                                                  ? c.wrapAll(a)
                                                  : b.append(a);
                                          });
                                },
                                wrap: function wrap(a) {
                                    var b = r.isFunction(a);
                                    return this.each(function (c) {
                                        r(this).wrapAll(
                                            b ? a.call(this, c) : a
                                        );
                                    });
                                },
                                unwrap: function unwrap(a) {
                                    return (
                                        this.parent(a)
                                            .not("body")
                                            .each(function () {
                                                r(this).replaceWith(
                                                    this.childNodes
                                                );
                                            }),
                                        this
                                    );
                                },
                            }),
                            (r.expr.pseudos.hidden = function (a) {
                                return !r.expr.pseudos.visible(a);
                            }),
                            (r.expr.pseudos.visible = function (a) {
                                return !!(
                                    a.offsetWidth ||
                                    a.offsetHeight ||
                                    a.getClientRects().length
                                );
                            }),
                            (r.ajaxSettings.xhr = function () {
                                try {
                                    return new a.XMLHttpRequest();
                                } catch (b) {}
                            });
                        var Rb = {
                                0: 200,
                                1223: 204,
                            },
                            Sb = r.ajaxSettings.xhr();
                        (o.cors = !!Sb && "withCredentials" in Sb),
                            (o.ajax = Sb = !!Sb),
                            r.ajaxTransport(function (b) {
                                var _c, d;

                                if (o.cors || (Sb && !b.crossDomain))
                                    return {
                                        send: function send(e, f) {
                                            var g,
                                                h = b.xhr();
                                            if (
                                                (h.open(
                                                    b.type,
                                                    b.url,
                                                    b.async,
                                                    b.username,
                                                    b.password
                                                ),
                                                b.xhrFields)
                                            )
                                                for (g in b.xhrFields) {
                                                    h[g] = b.xhrFields[g];
                                                }
                                            b.mimeType &&
                                                h.overrideMimeType &&
                                                h.overrideMimeType(b.mimeType),
                                                b.crossDomain ||
                                                    e["X-Requested-With"] ||
                                                    (e["X-Requested-With"] =
                                                        "XMLHttpRequest");

                                            for (g in e) {
                                                h.setRequestHeader(g, e[g]);
                                            }

                                            (_c = function c(a) {
                                                return function () {
                                                    _c &&
                                                        ((_c =
                                                            d =
                                                            h.onload =
                                                            h.onerror =
                                                            h.onabort =
                                                            h.onreadystatechange =
                                                                null),
                                                        "abort" === a
                                                            ? h.abort()
                                                            : "error" === a
                                                            ? "number" !=
                                                              typeof h.status
                                                                ? f(0, "error")
                                                                : f(
                                                                      h.status,
                                                                      h.statusText
                                                                  )
                                                            : f(
                                                                  Rb[
                                                                      h.status
                                                                  ] || h.status,
                                                                  h.statusText,
                                                                  "text" !==
                                                                      (h.responseType ||
                                                                          "text") ||
                                                                      "string" !=
                                                                          typeof h.responseText
                                                                      ? {
                                                                            binary: h.response,
                                                                        }
                                                                      : {
                                                                            text: h.responseText,
                                                                        },
                                                                  h.getAllResponseHeaders()
                                                              ));
                                                };
                                            }),
                                                (h.onload = _c()),
                                                (d = h.onerror = _c("error")),
                                                void 0 !== h.onabort
                                                    ? (h.onabort = d)
                                                    : (h.onreadystatechange =
                                                          function () {
                                                              4 ===
                                                                  h.readyState &&
                                                                  a.setTimeout(
                                                                      function () {
                                                                          _c &&
                                                                              d();
                                                                      }
                                                                  );
                                                          }),
                                                (_c = _c("abort"));

                                            try {
                                                h.send(
                                                    (b.hasContent && b.data) ||
                                                        null
                                                );
                                            } catch (i) {
                                                if (_c) throw i;
                                            }
                                        },
                                        abort: function abort() {
                                            _c && _c();
                                        },
                                    };
                            }),
                            r.ajaxPrefilter(function (a) {
                                a.crossDomain && (a.contents.script = !1);
                            }),
                            r.ajaxSetup({
                                accepts: {
                                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
                                },
                                contents: {
                                    script: /\b(?:java|ecma)script\b/,
                                },
                                converters: {
                                    "text script": function textScript(a) {
                                        return r.globalEval(a), a;
                                    },
                                },
                            }),
                            r.ajaxPrefilter("script", function (a) {
                                void 0 === a.cache && (a.cache = !1),
                                    a.crossDomain && (a.type = "GET");
                            }),
                            r.ajaxTransport("script", function (a) {
                                if (a.crossDomain) {
                                    var b, _c2;

                                    return {
                                        send: function send(e, f) {
                                            (b = r("<script>")
                                                .prop({
                                                    charset: a.scriptCharset,
                                                    src: a.url,
                                                })
                                                .on(
                                                    "load error",
                                                    (_c2 = function c(a) {
                                                        b.remove(),
                                                            (_c2 = null),
                                                            a &&
                                                                f(
                                                                    "error" ===
                                                                        a.type
                                                                        ? 404
                                                                        : 200,
                                                                    a.type
                                                                );
                                                    })
                                                )),
                                                d.head.appendChild(b[0]);
                                        },
                                        abort: function abort() {
                                            _c2 && _c2();
                                        },
                                    };
                                }
                            });
                        var Tb = [],
                            Ub = /(=)\?(?=&|$)|\?\?/;
                        r.ajaxSetup({
                            jsonp: "callback",
                            jsonpCallback: function jsonpCallback() {
                                var a = Tb.pop() || r.expando + "_" + ub++;
                                return (this[a] = !0), a;
                            },
                        }),
                            r.ajaxPrefilter("json jsonp", function (b, c, d) {
                                var e,
                                    f,
                                    g,
                                    h =
                                        b.jsonp !== !1 &&
                                        (Ub.test(b.url)
                                            ? "url"
                                            : "string" == typeof b.data &&
                                              0 ===
                                                  (b.contentType || "").indexOf(
                                                      "application/x-www-form-urlencoded"
                                                  ) &&
                                              Ub.test(b.data) &&
                                              "data");
                                if (h || "jsonp" === b.dataTypes[0])
                                    return (
                                        (e = b.jsonpCallback =
                                            r.isFunction(b.jsonpCallback)
                                                ? b.jsonpCallback()
                                                : b.jsonpCallback),
                                        h
                                            ? (b[h] = b[h].replace(
                                                  Ub,
                                                  "$1" + e
                                              ))
                                            : b.jsonp !== !1 &&
                                              (b.url +=
                                                  (vb.test(b.url) ? "&" : "?") +
                                                  b.jsonp +
                                                  "=" +
                                                  e),
                                        (b.converters["script json"] =
                                            function () {
                                                return (
                                                    g ||
                                                        r.error(
                                                            e +
                                                                " was not called"
                                                        ),
                                                    g[0]
                                                );
                                            }),
                                        (b.dataTypes[0] = "json"),
                                        (f = a[e]),
                                        (a[e] = function () {
                                            g = arguments;
                                        }),
                                        d.always(function () {
                                            void 0 === f
                                                ? r(a).removeProp(e)
                                                : (a[e] = f),
                                                b[e] &&
                                                    ((b.jsonpCallback =
                                                        c.jsonpCallback),
                                                    Tb.push(e)),
                                                g && r.isFunction(f) && f(g[0]),
                                                (g = f = void 0);
                                        }),
                                        "script"
                                    );
                            }),
                            (o.createHTMLDocument = (function () {
                                var a =
                                    d.implementation.createHTMLDocument(
                                        ""
                                    ).body;
                                return (
                                    (a.innerHTML =
                                        "<form></form><form></form>"),
                                    2 === a.childNodes.length
                                );
                            })()),
                            (r.parseHTML = function (a, b, c) {
                                if ("string" != typeof a) return [];
                                "boolean" == typeof b && ((c = b), (b = !1));
                                var e, f, g;
                                return (
                                    b ||
                                        (o.createHTMLDocument
                                            ? ((b =
                                                  d.implementation.createHTMLDocument(
                                                      ""
                                                  )),
                                              (e = b.createElement("base")),
                                              (e.href = d.location.href),
                                              b.head.appendChild(e))
                                            : (b = d)),
                                    (f = C.exec(a)),
                                    (g = !c && []),
                                    f
                                        ? [b.createElement(f[1])]
                                        : ((f = qa([a], b, g)),
                                          g && g.length && r(g).remove(),
                                          r.merge([], f.childNodes))
                                );
                            }),
                            (r.fn.load = function (a, b, c) {
                                var d,
                                    e,
                                    f,
                                    g = this,
                                    h = a.indexOf(" ");
                                return (
                                    h > -1 &&
                                        ((d = pb(a.slice(h))),
                                        (a = a.slice(0, h))),
                                    r.isFunction(b)
                                        ? ((c = b), (b = void 0))
                                        : b &&
                                          "object" == _typeof(b) &&
                                          (e = "POST"),
                                    g.length > 0 &&
                                        r
                                            .ajax({
                                                url: a,
                                                type: e || "GET",
                                                dataType: "html",
                                                data: b,
                                            })
                                            .done(function (a) {
                                                (f = arguments),
                                                    g.html(
                                                        d
                                                            ? r("<div>")
                                                                  .append(
                                                                      r.parseHTML(
                                                                          a
                                                                      )
                                                                  )
                                                                  .find(d)
                                                            : a
                                                    );
                                            })
                                            .always(
                                                c &&
                                                    function (a, b) {
                                                        g.each(function () {
                                                            c.apply(
                                                                this,
                                                                f || [
                                                                    a.responseText,
                                                                    b,
                                                                    a,
                                                                ]
                                                            );
                                                        });
                                                    }
                                            ),
                                    this
                                );
                            }),
                            r.each(
                                [
                                    "ajaxStart",
                                    "ajaxStop",
                                    "ajaxComplete",
                                    "ajaxError",
                                    "ajaxSuccess",
                                    "ajaxSend",
                                ],
                                function (a, b) {
                                    r.fn[b] = function (a) {
                                        return this.on(b, a);
                                    };
                                }
                            ),
                            (r.expr.pseudos.animated = function (a) {
                                return r.grep(r.timers, function (b) {
                                    return a === b.elem;
                                }).length;
                            }),
                            (r.offset = {
                                setOffset: function setOffset(a, b, c) {
                                    var d,
                                        e,
                                        f,
                                        g,
                                        h,
                                        i,
                                        j,
                                        k = r.css(a, "position"),
                                        l = r(a),
                                        m = {};
                                    "static" === k &&
                                        (a.style.position = "relative"),
                                        (h = l.offset()),
                                        (f = r.css(a, "top")),
                                        (i = r.css(a, "left")),
                                        (j =
                                            ("absolute" === k ||
                                                "fixed" === k) &&
                                            (f + i).indexOf("auto") > -1),
                                        j
                                            ? ((d = l.position()),
                                              (g = d.top),
                                              (e = d.left))
                                            : ((g = parseFloat(f) || 0),
                                              (e = parseFloat(i) || 0)),
                                        r.isFunction(b) &&
                                            (b = b.call(a, c, r.extend({}, h))),
                                        null != b.top &&
                                            (m.top = b.top - h.top + g),
                                        null != b.left &&
                                            (m.left = b.left - h.left + e),
                                        "using" in b
                                            ? b.using.call(a, m)
                                            : l.css(m);
                                },
                            }),
                            r.fn.extend({
                                offset: function offset(a) {
                                    if (arguments.length)
                                        return void 0 === a
                                            ? this
                                            : this.each(function (b) {
                                                  r.offset.setOffset(
                                                      this,
                                                      a,
                                                      b
                                                  );
                                              });
                                    var b,
                                        c,
                                        d,
                                        e,
                                        f = this[0];
                                    if (f)
                                        return f.getClientRects().length
                                            ? ((d = f.getBoundingClientRect()),
                                              (b = f.ownerDocument),
                                              (c = b.documentElement),
                                              (e = b.defaultView),
                                              {
                                                  top:
                                                      d.top +
                                                      e.pageYOffset -
                                                      c.clientTop,
                                                  left:
                                                      d.left +
                                                      e.pageXOffset -
                                                      c.clientLeft,
                                              })
                                            : {
                                                  top: 0,
                                                  left: 0,
                                              };
                                },
                                position: function position() {
                                    if (this[0]) {
                                        var a,
                                            b,
                                            c = this[0],
                                            d = {
                                                top: 0,
                                                left: 0,
                                            };
                                        return (
                                            "fixed" === r.css(c, "position")
                                                ? (b =
                                                      c.getBoundingClientRect())
                                                : ((a = this.offsetParent()),
                                                  (b = this.offset()),
                                                  B(a[0], "html") ||
                                                      (d = a.offset()),
                                                  (d = {
                                                      top:
                                                          d.top +
                                                          r.css(
                                                              a[0],
                                                              "borderTopWidth",
                                                              !0
                                                          ),
                                                      left:
                                                          d.left +
                                                          r.css(
                                                              a[0],
                                                              "borderLeftWidth",
                                                              !0
                                                          ),
                                                  })),
                                            {
                                                top:
                                                    b.top -
                                                    d.top -
                                                    r.css(c, "marginTop", !0),
                                                left:
                                                    b.left -
                                                    d.left -
                                                    r.css(c, "marginLeft", !0),
                                            }
                                        );
                                    }
                                },
                                offsetParent: function offsetParent() {
                                    return this.map(function () {
                                        var a = this.offsetParent;

                                        while (
                                            a &&
                                            "static" === r.css(a, "position")
                                        ) {
                                            a = a.offsetParent;
                                        }

                                        return a || ra;
                                    });
                                },
                            }),
                            r.each(
                                {
                                    scrollLeft: "pageXOffset",
                                    scrollTop: "pageYOffset",
                                },
                                function (a, b) {
                                    var c = "pageYOffset" === b;

                                    r.fn[a] = function (d) {
                                        return T(
                                            this,
                                            function (a, d, e) {
                                                var f;
                                                return (
                                                    r.isWindow(a)
                                                        ? (f = a)
                                                        : 9 === a.nodeType &&
                                                          (f = a.defaultView),
                                                    void 0 === e
                                                        ? f
                                                            ? f[b]
                                                            : a[d]
                                                        : void (f
                                                              ? f.scrollTo(
                                                                    c
                                                                        ? f.pageXOffset
                                                                        : e,
                                                                    c
                                                                        ? e
                                                                        : f.pageYOffset
                                                                )
                                                              : (a[d] = e))
                                                );
                                            },
                                            a,
                                            d,
                                            arguments.length
                                        );
                                    };
                                }
                            ),
                            r.each(["top", "left"], function (a, b) {
                                r.cssHooks[b] = Pa(
                                    o.pixelPosition,
                                    function (a, c) {
                                        if (c)
                                            return (
                                                (c = Oa(a, b)),
                                                Ma.test(c)
                                                    ? r(a).position()[b] + "px"
                                                    : c
                                            );
                                    }
                                );
                            }),
                            r.each(
                                {
                                    Height: "height",
                                    Width: "width",
                                },
                                function (a, b) {
                                    r.each(
                                        {
                                            padding: "inner" + a,
                                            content: b,
                                            "": "outer" + a,
                                        },
                                        function (c, d) {
                                            r.fn[d] = function (e, f) {
                                                var g =
                                                        arguments.length &&
                                                        (c ||
                                                            "boolean" !=
                                                                typeof e),
                                                    h =
                                                        c ||
                                                        (e === !0 || f === !0
                                                            ? "margin"
                                                            : "border");
                                                return T(
                                                    this,
                                                    function (b, c, e) {
                                                        var f;
                                                        return r.isWindow(b)
                                                            ? 0 ===
                                                              d.indexOf("outer")
                                                                ? b["inner" + a]
                                                                : b.document
                                                                      .documentElement[
                                                                      "client" +
                                                                          a
                                                                  ]
                                                            : 9 === b.nodeType
                                                            ? ((f =
                                                                  b.documentElement),
                                                              Math.max(
                                                                  b.body[
                                                                      "scroll" +
                                                                          a
                                                                  ],
                                                                  f[
                                                                      "scroll" +
                                                                          a
                                                                  ],
                                                                  b.body[
                                                                      "offset" +
                                                                          a
                                                                  ],
                                                                  f[
                                                                      "offset" +
                                                                          a
                                                                  ],
                                                                  f[
                                                                      "client" +
                                                                          a
                                                                  ]
                                                              ))
                                                            : void 0 === e
                                                            ? r.css(b, c, h)
                                                            : r.style(
                                                                  b,
                                                                  c,
                                                                  e,
                                                                  h
                                                              );
                                                    },
                                                    b,
                                                    g ? e : void 0,
                                                    g
                                                );
                                            };
                                        }
                                    );
                                }
                            ),
                            r.fn.extend({
                                bind: function bind(a, b, c) {
                                    return this.on(a, null, b, c);
                                },
                                unbind: function unbind(a, b) {
                                    return this.off(a, null, b);
                                },
                                delegate: function delegate(a, b, c, d) {
                                    return this.on(b, a, c, d);
                                },
                                undelegate: function undelegate(a, b, c) {
                                    return 1 === arguments.length
                                        ? this.off(a, "**")
                                        : this.off(b, a || "**", c);
                                },
                            }),
                            (r.holdReady = function (a) {
                                a ? r.readyWait++ : r.ready(!0);
                            }),
                            (r.isArray = Array.isArray),
                            (r.parseJSON = JSON.parse),
                            (r.nodeName = B),
                            true &&
                                !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
                                (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                                    return r;
                                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
                                __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                                    (module.exports =
                                        __WEBPACK_AMD_DEFINE_RESULT__));
                        var Vb = a.jQuery,
                            Wb = a.$;
                        return (
                            (r.noConflict = function (b) {
                                return (
                                    a.$ === r && (a.$ = Wb),
                                    b && a.jQuery === r && (a.jQuery = Vb),
                                    r
                                );
                            }),
                            b || (a.jQuery = a.$ = r),
                            r
                        );
                    }
                );

                /***/
            },

        /***/ "./resources/js/jquery.sticky.js":
            /*!***************************************!*\
  !*** ./resources/js/jquery.sticky.js ***!
  \***************************************/
            /***/ () => {
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (
                        typeof Symbol === "function" &&
                        typeof Symbol.iterator === "symbol"
                    ) {
                        _typeof = function _typeof(obj) {
                            return typeof obj;
                        };
                    } else {
                        _typeof = function _typeof(obj) {
                            return obj &&
                                typeof Symbol === "function" &&
                                obj.constructor === Symbol &&
                                obj !== Symbol.prototype
                                ? "symbol"
                                : typeof obj;
                        };
                    }
                    return _typeof(obj);
                }

                // Sticky Plugin v1.0.0 for jQuery
                // =============
                // Author: Anthony Garand
                // Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
                // Improvements by Leonardo C. Daronco (daronco)
                // Created: 2/14/2011
                // Date: 2/12/2012
                // Website: http://labs.anthonygarand.com/sticky
                // Description: Makes an element on the page stick on the screen as you scroll
                //       It will only set the 'top' and 'position' of your element, you
                //       might need to adjust the width in some cases.
                (function ($) {
                    var defaults = {
                            topSpacing: 0,
                            bottomSpacing: 0,
                            className: "is-sticky",
                            wrapperClassName: "sticky-wrapper",
                            center: false,
                            getWidthFrom: "",
                            responsiveWidth: false,
                        },
                        $window = $(window),
                        $document = $(document),
                        sticked = [],
                        windowHeight = $window.height(),
                        scroller = function scroller() {
                            var scrollTop = $window.scrollTop(),
                                documentHeight = $document.height(),
                                dwh = documentHeight - windowHeight,
                                extra = scrollTop > dwh ? dwh - scrollTop : 0;

                            for (var i = 0; i < sticked.length; i++) {
                                var s = sticked[i],
                                    elementTop = s.stickyWrapper.offset().top,
                                    etse = elementTop - s.topSpacing - extra;

                                if (scrollTop <= etse) {
                                    if (s.currentTop !== null) {
                                        s.stickyElement
                                            .css("width", "")
                                            .css("position", "")
                                            .css("top", "");
                                        s.stickyElement
                                            .trigger("sticky-end", [s])
                                            .parent()
                                            .removeClass(s.className);
                                        s.currentTop = null;
                                    }
                                } else {
                                    var newTop =
                                        documentHeight -
                                        s.stickyElement.outerHeight() -
                                        s.topSpacing -
                                        s.bottomSpacing -
                                        scrollTop -
                                        extra;

                                    if (newTop < 0) {
                                        newTop = newTop + s.topSpacing;
                                    } else {
                                        newTop = s.topSpacing;
                                    }

                                    if (s.currentTop != newTop) {
                                        s.stickyElement
                                            .css(
                                                "width",
                                                s.stickyElement.width()
                                            )
                                            .css("position", "fixed")
                                            .css("top", newTop);

                                        if (
                                            typeof s.getWidthFrom !==
                                            "undefined"
                                        ) {
                                            s.stickyElement.css(
                                                "width",
                                                $(s.getWidthFrom).width()
                                            );
                                        }

                                        s.stickyElement
                                            .trigger("sticky-start", [s])
                                            .parent()
                                            .addClass(s.className);
                                        s.currentTop = newTop;
                                    }
                                }
                            }
                        },
                        resizer = function resizer() {
                            windowHeight = $window.height();

                            for (var i = 0; i < sticked.length; i++) {
                                var s = sticked[i];

                                if (
                                    typeof s.getWidthFrom !== "undefined" &&
                                    s.responsiveWidth === true
                                ) {
                                    s.stickyElement.css(
                                        "width",
                                        $(s.getWidthFrom).width()
                                    );
                                }
                            }
                        },
                        methods = {
                            init: function init(options) {
                                var o = $.extend({}, defaults, options);
                                return this.each(function () {
                                    var stickyElement = $(this);
                                    var stickyId = stickyElement.attr("id");
                                    var wrapperId = stickyId
                                        ? stickyId +
                                          "-" +
                                          defaults.wrapperClassName
                                        : defaults.wrapperClassName;
                                    var wrapper = $("<div></div>")
                                        .attr(
                                            "id",
                                            stickyId + "-sticky-wrapper"
                                        )
                                        .addClass(o.wrapperClassName);
                                    stickyElement.wrapAll(wrapper);

                                    if (o.center) {
                                        stickyElement.parent().css({
                                            width: stickyElement.outerWidth(),
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        });
                                    }

                                    if (stickyElement.css("float") == "right") {
                                        stickyElement
                                            .css({
                                                float: "none",
                                            })
                                            .parent()
                                            .css({
                                                float: "right",
                                            });
                                    }

                                    var stickyWrapper = stickyElement.parent();
                                    stickyWrapper.css(
                                        "height",
                                        stickyElement.outerHeight()
                                    );
                                    sticked.push({
                                        topSpacing: o.topSpacing,
                                        bottomSpacing: o.bottomSpacing,
                                        stickyElement: stickyElement,
                                        currentTop: null,
                                        stickyWrapper: stickyWrapper,
                                        className: o.className,
                                        getWidthFrom: o.getWidthFrom,
                                        responsiveWidth: o.responsiveWidth,
                                    });
                                });
                            },
                            update: scroller,
                            unstick: function unstick(options) {
                                return this.each(function () {
                                    var unstickyElement = $(this);
                                    var removeIdx = -1;

                                    for (var i = 0; i < sticked.length; i++) {
                                        if (
                                            sticked[i].stickyElement.get(0) ==
                                            unstickyElement.get(0)
                                        ) {
                                            removeIdx = i;
                                        }
                                    }

                                    if (removeIdx != -1) {
                                        sticked.splice(removeIdx, 1);
                                        unstickyElement.unwrap();
                                        unstickyElement.removeAttr("style");
                                    }
                                });
                            },
                        }; // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):

                    if (window.addEventListener) {
                        window.addEventListener("scroll", scroller, false);
                        window.addEventListener("resize", resizer, false);
                    } else if (window.attachEvent) {
                        window.attachEvent("onscroll", scroller);
                        window.attachEvent("onresize", resizer);
                    }

                    $.fn.sticky = function (method) {
                        if (methods[method]) {
                            return methods[method].apply(
                                this,
                                Array.prototype.slice.call(arguments, 1)
                            );
                        } else if (_typeof(method) === "object" || !method) {
                            return methods.init.apply(this, arguments);
                        } else {
                            $.error(
                                "Method " +
                                    method +
                                    " does not exist on jQuery.sticky"
                            );
                        }
                    };

                    $.fn.unstick = function (method) {
                        if (methods[method]) {
                            return methods[method].apply(
                                this,
                                Array.prototype.slice.call(arguments, 1)
                            );
                        } else if (_typeof(method) === "object" || !method) {
                            return methods.unstick.apply(this, arguments);
                        } else {
                            $.error(
                                "Method " +
                                    method +
                                    " does not exist on jQuery.sticky"
                            );
                        }
                    };

                    $(function () {
                        setTimeout(scroller, 0);
                    });
                })(jQuery);

                /***/
            },

        /***/ "./resources/js/main.js":
            /*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
            /***/ () => {
                $(function () {
                    "use strict";

                    var window_width = $(window).width(),
                        window_height = window.innerHeight,
                        header_height = $(".default-header").height(),
                        header_height_static = $(
                            ".site-header.static"
                        ).outerHeight(),
                        fitscreen = window_height - header_height;
                    $(".fullscreen").css("height", window_height);
                    $(".fitscreen").css("height", fitscreen); //------- Header Scroll Class  js --------//

                    $(window).scroll(function () {
                        if ($(this).scrollTop() > 100) {
                            $(".default-header").addClass('header-scrolled');
                        } else {
                            $(".default-header").removeClass('header-scrolled');
                        }
                    });

                    if ($("select")) {
                        $("select").niceSelect();
                    }

                    $(".img-pop-up").magnificPopup({
                        type: "image",
                        gallery: {
                            enabled: true,
                        },
                    }); // Search Toggle

                    $("#search-input-box").hide();
                    $("#search").on("click", function () {
                        $("#search-input-box").slideToggle();
                        $("#search-input").focus();
                    });
                    $("#close-search").on("click", function () {
                        $("#search-input-box").slideUp(500);
                    }); // $('.navbar-nav>li>a').on('click', function(){
                    //     $('.navbar-collapse').collapse('hide');
                    // });
                    //  Counter Js

                    $(".counter").counterUp({
                        delay: 10,
                        time: 1000,
                    });
                    $(".play-btn").magnificPopup({
                        type: "iframe",
                        mainClass: "mfp-fade",
                        removalDelay: 160,
                        preloader: false,
                        fixedContentPos: false,
                    });
                    $(".popuar-course-carusel").owlCarousel({
                        items: 4,
                        loop: true,
                        autoplay: true,
                        margin: 30,
                        nav: true,
                        stagePadding: 60,
                        navText: [
                            "<img src='img/prev.png'>",
                            "<img src='img/next.png'>",
                        ],
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 0,
                            },
                            575: {
                                items: 2,
                                stagePadding: 0,
                            },
                            768: {
                                items: 2,
                                stagePadding: 0,
                            },
                            992: {
                                items: 3,
                                stagePadding: 0,
                            },
                            1200: {
                                items: 3,
                                stagePadding: 60,
                            },
                            1440: {
                                items: 4,
                                stagePadding: 60,
                            },
                        },
                    });
                    $(".video-carousel").owlCarousel({
                        items: 1,
                        loop: true,
                        autoplay: true,
                        margin: 30,
                        nav: true,
                        dots: false,
                        navText: [
                            "<img src='img/prev.png'>",
                            "<img src='img/next.png'>",
                        ],
                    });
                    $(".testi-slider").owlCarousel({
                        items: 1,
                        loop: true,
                        autoplay: true,
                        margin: 30,
                        nav: true,
                        navText: [
                            "<img src='img/prev.png'>",
                            "<img src='img/next.png'>",
                        ],
                    }); // Select all links with hashes

                    $('.navbar-nav a[href*="#"]') // Remove links that don't actually link to anything
                        .not('[href="#"]')
                        .not('[href="#0"]')
                        .on("click", function (event) {
                            // On-page links
                            if (
                                location.pathname.replace(/^\//, "") ==
                                    this.pathname.replace(/^\//, "") &&
                                location.hostname == this.hostname
                            ) {
                                // Figure out element to scroll to
                                var target = $(this.hash);
                                target = target.length
                                    ? target
                                    : $("[name=" + this.hash.slice(1) + "]"); // Does a scroll target exist?

                                if (target.length) {
                                    // Only prevent default if animation is actually gonna happen
                                    event.preventDefault();
                                    $("html, body").animate(
                                        {
                                            scrollTop: target.offset().top - 50,
                                        },
                                        1000,
                                        function () {
                                            // Callback after animation
                                            // Must change focus!
                                            var $target = $(target);
                                            $target.focus();

                                            if ($target.is(":focus")) {
                                                // Checking if the target was focused
                                                return false;
                                            } else {
                                                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable

                                                $target.focus(); // Set focus again
                                            }
                                        }
                                    );
                                }
                            }
                        }); // Google Map

                    if (document.getElementById("map")) {
                        var init = function init() {
                            // Basic options for a simple Google Map
                            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                            var mapOptions = {
                                // How zoomed in you want the map to start at (always required)
                                zoom: 11,
                                // The latitude and longitude to center the map (always required)
                                center: new google.maps.LatLng(
                                    3.8991742,
                                    11.5546661
                                ),
                                // New York
                                // How you would like to style the map.
                                // This is where you would paste any style found on Snazzy Maps.
                                styles: [
                                    {
                                        featureType: "water",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#e9e9e9",
                                            },
                                            {
                                                lightness: 17,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "landscape",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#f5f5f5",
                                            },
                                            {
                                                lightness: 20,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "road.highway",
                                        elementType: "geometry.fill",
                                        stylers: [
                                            {
                                                color: "#ffffff",
                                            },
                                            {
                                                lightness: 17,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "road.highway",
                                        elementType: "geometry.stroke",
                                        stylers: [
                                            {
                                                color: "#ffffff",
                                            },
                                            {
                                                lightness: 29,
                                            },
                                            {
                                                weight: 0.2,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "road.arterial",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#ffffff",
                                            },
                                            {
                                                lightness: 18,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "road.local",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#ffffff",
                                            },
                                            {
                                                lightness: 16,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "poi",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#f5f5f5",
                                            },
                                            {
                                                lightness: 21,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "poi.park",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#dedede",
                                            },
                                            {
                                                lightness: 21,
                                            },
                                        ],
                                    },
                                    {
                                        elementType: "labels.text.stroke",
                                        stylers: [
                                            {
                                                visibility: "on",
                                            },
                                            {
                                                color: "#ffffff",
                                            },
                                            {
                                                lightness: 16,
                                            },
                                        ],
                                    },
                                    {
                                        elementType: "labels.text.fill",
                                        stylers: [
                                            {
                                                saturation: 36,
                                            },
                                            {
                                                color: "#333333",
                                            },
                                            {
                                                lightness: 40,
                                            },
                                        ],
                                    },
                                    {
                                        elementType: "labels.icon",
                                        stylers: [
                                            {
                                                visibility: "off",
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "transit",
                                        elementType: "geometry",
                                        stylers: [
                                            {
                                                color: "#f2f2f2",
                                            },
                                            {
                                                lightness: 19,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "administrative",
                                        elementType: "geometry.fill",
                                        stylers: [
                                            {
                                                color: "#fefefe",
                                            },
                                            {
                                                lightness: 20,
                                            },
                                        ],
                                    },
                                    {
                                        featureType: "administrative",
                                        elementType: "geometry.stroke",
                                        stylers: [
                                            {
                                                color: "#fefefe",
                                            },
                                            {
                                                lightness: 17,
                                            },
                                            {
                                                weight: 1.2,
                                            },
                                        ],
                                    },
                                ],
                            }; // Get the HTML DOM element that will contain your map
                            // We are using a div with id="map" seen below in the <body>

                            var mapElement = document.getElementById("map"); // Create the Google Map using our element and options defined above

                            var map = new google.maps.Map(
                                mapElement,
                                mapOptions
                            ); // Let's also add a marker while we're at it

                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng(40.67, -73.94),
                                map: map,
                                title: "Snazzy!",
                            });
                        };

                        google.maps.event.addDomListener(window, "load", init);
                    }

                    $(document).ready(function () {
                        $("#mc_embed_signup").find("form").ajaxChimp();
                    });
                });

                /***/
            },

        /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ id: moduleId,
            /******/ loaded: false,
            /******/ exports: {},
            /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        /******/
        /******/ // Flag the module as loaded
        /******/ module.loaded = true;
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/node module decorator */
    /******/ (() => {
        /******/ __webpack_require__.nmd = (module) => {
            /******/ module.paths = [];
            /******/ if (!module.children) module.children = [];
            /******/ return module;
            /******/
        };
        /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        /*!*********************************!*\
  !*** ./resources/js/eclipse.js ***!
  \*********************************/
        __webpack_require__(/*! ./jquery */ "./resources/js/jquery.js");

        __webpack_require__(
            /*! ./jquery.sticky */ "./resources/js/jquery.sticky.js"
        );

        __webpack_require__(
            /*! ./ion.rangeSlider */ "./resources/js/ion.rangeSlider.js"
        );

        __webpack_require__(/*! ./main */ "./resources/js/main.js");
    })();

    /******/
})();
