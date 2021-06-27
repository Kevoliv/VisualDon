
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	/* @preserve
	 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
	 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
	 */

	var leafletSrc = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  factory(exports) ;
	}(commonjsGlobal, (function (exports) {
	  var version = "1.7.1";

	  /*
	   * @namespace Util
	   *
	   * Various utility functions, used by Leaflet internally.
	   */

	  // @function extend(dest: Object, src?: Object): Object
	  // Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
	  function extend(dest) {
	  	var i, j, len, src;

	  	for (j = 1, len = arguments.length; j < len; j++) {
	  		src = arguments[j];
	  		for (i in src) {
	  			dest[i] = src[i];
	  		}
	  	}
	  	return dest;
	  }

	  // @function create(proto: Object, properties?: Object): Object
	  // Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
	  var create = Object.create || (function () {
	  	function F() {}
	  	return function (proto) {
	  		F.prototype = proto;
	  		return new F();
	  	};
	  })();

	  // @function bind(fn: Function, …): Function
	  // Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	  // Has a `L.bind()` shortcut.
	  function bind(fn, obj) {
	  	var slice = Array.prototype.slice;

	  	if (fn.bind) {
	  		return fn.bind.apply(fn, slice.call(arguments, 1));
	  	}

	  	var args = slice.call(arguments, 2);

	  	return function () {
	  		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
	  	};
	  }

	  // @property lastId: Number
	  // Last unique ID used by [`stamp()`](#util-stamp)
	  var lastId = 0;

	  // @function stamp(obj: Object): Number
	  // Returns the unique ID of an object, assigning it one if it doesn't have it.
	  function stamp(obj) {
	  	/*eslint-disable */
	  	obj._leaflet_id = obj._leaflet_id || ++lastId;
	  	return obj._leaflet_id;
	  	/* eslint-enable */
	  }

	  // @function throttle(fn: Function, time: Number, context: Object): Function
	  // Returns a function which executes function `fn` with the given scope `context`
	  // (so that the `this` keyword refers to `context` inside `fn`'s code). The function
	  // `fn` will be called no more than one time per given amount of `time`. The arguments
	  // received by the bound function will be any arguments passed when binding the
	  // function, followed by any arguments passed when invoking the bound function.
	  // Has an `L.throttle` shortcut.
	  function throttle(fn, time, context) {
	  	var lock, args, wrapperFn, later;

	  	later = function () {
	  		// reset lock and call if queued
	  		lock = false;
	  		if (args) {
	  			wrapperFn.apply(context, args);
	  			args = false;
	  		}
	  	};

	  	wrapperFn = function () {
	  		if (lock) {
	  			// called too soon, queue to call later
	  			args = arguments;

	  		} else {
	  			// call and lock until later
	  			fn.apply(context, arguments);
	  			setTimeout(later, time);
	  			lock = true;
	  		}
	  	};

	  	return wrapperFn;
	  }

	  // @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
	  // Returns the number `num` modulo `range` in such a way so it lies within
	  // `range[0]` and `range[1]`. The returned value will be always smaller than
	  // `range[1]` unless `includeMax` is set to `true`.
	  function wrapNum(x, range, includeMax) {
	  	var max = range[1],
	  	    min = range[0],
	  	    d = max - min;
	  	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	  }

	  // @function falseFn(): Function
	  // Returns a function which always returns `false`.
	  function falseFn() { return false; }

	  // @function formatNum(num: Number, digits?: Number): Number
	  // Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
	  function formatNum(num, digits) {
	  	var pow = Math.pow(10, (digits === undefined ? 6 : digits));
	  	return Math.round(num * pow) / pow;
	  }

	  // @function trim(str: String): String
	  // Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
	  function trim(str) {
	  	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	  }

	  // @function splitWords(str: String): String[]
	  // Trims and splits the string on whitespace and returns the array of parts.
	  function splitWords(str) {
	  	return trim(str).split(/\s+/);
	  }

	  // @function setOptions(obj: Object, options: Object): Object
	  // Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
	  function setOptions(obj, options) {
	  	if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
	  		obj.options = obj.options ? create(obj.options) : {};
	  	}
	  	for (var i in options) {
	  		obj.options[i] = options[i];
	  	}
	  	return obj.options;
	  }

	  // @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
	  // Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
	  // translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
	  // be appended at the end. If `uppercase` is `true`, the parameter names will
	  // be uppercased (e.g. `'?A=foo&B=bar'`)
	  function getParamString(obj, existingUrl, uppercase) {
	  	var params = [];
	  	for (var i in obj) {
	  		params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
	  	}
	  	return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	  }

	  var templateRe = /\{ *([\w_-]+) *\}/g;

	  // @function template(str: String, data: Object): String
	  // Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
	  // and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
	  // `('Hello foo, bar')`. You can also specify functions instead of strings for
	  // data values — they will be evaluated passing `data` as an argument.
	  function template(str, data) {
	  	return str.replace(templateRe, function (str, key) {
	  		var value = data[key];

	  		if (value === undefined) {
	  			throw new Error('No value provided for variable ' + str);

	  		} else if (typeof value === 'function') {
	  			value = value(data);
	  		}
	  		return value;
	  	});
	  }

	  // @function isArray(obj): Boolean
	  // Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
	  var isArray = Array.isArray || function (obj) {
	  	return (Object.prototype.toString.call(obj) === '[object Array]');
	  };

	  // @function indexOf(array: Array, el: Object): Number
	  // Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
	  function indexOf(array, el) {
	  	for (var i = 0; i < array.length; i++) {
	  		if (array[i] === el) { return i; }
	  	}
	  	return -1;
	  }

	  // @property emptyImageUrl: String
	  // Data URI string containing a base64-encoded empty GIF image.
	  // Used as a hack to free memory from unused images on WebKit-powered
	  // mobile devices (by setting image `src` to this string).
	  var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

	  // inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	  function getPrefixed(name) {
	  	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	  }

	  var lastTime = 0;

	  // fallback for IE 7-8
	  function timeoutDefer(fn) {
	  	var time = +new Date(),
	  	    timeToCall = Math.max(0, 16 - (time - lastTime));

	  	lastTime = time + timeToCall;
	  	return window.setTimeout(fn, timeToCall);
	  }

	  var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
	  var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
	  		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

	  // @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
	  // Schedules `fn` to be executed when the browser repaints. `fn` is bound to
	  // `context` if given. When `immediate` is set, `fn` is called immediately if
	  // the browser doesn't have native support for
	  // [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
	  // otherwise it's delayed. Returns a request ID that can be used to cancel the request.
	  function requestAnimFrame(fn, context, immediate) {
	  	if (immediate && requestFn === timeoutDefer) {
	  		fn.call(context);
	  	} else {
	  		return requestFn.call(window, bind(fn, context));
	  	}
	  }

	  // @function cancelAnimFrame(id: Number): undefined
	  // Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
	  function cancelAnimFrame(id) {
	  	if (id) {
	  		cancelFn.call(window, id);
	  	}
	  }

	  var Util = ({
	    extend: extend,
	    create: create,
	    bind: bind,
	    lastId: lastId,
	    stamp: stamp,
	    throttle: throttle,
	    wrapNum: wrapNum,
	    falseFn: falseFn,
	    formatNum: formatNum,
	    trim: trim,
	    splitWords: splitWords,
	    setOptions: setOptions,
	    getParamString: getParamString,
	    template: template,
	    isArray: isArray,
	    indexOf: indexOf,
	    emptyImageUrl: emptyImageUrl,
	    requestFn: requestFn,
	    cancelFn: cancelFn,
	    requestAnimFrame: requestAnimFrame,
	    cancelAnimFrame: cancelAnimFrame
	  });

	  // @class Class
	  // @aka L.Class

	  // @section
	  // @uninheritable

	  // Thanks to John Resig and Dean Edwards for inspiration!

	  function Class() {}

	  Class.extend = function (props) {

	  	// @function extend(props: Object): Function
	  	// [Extends the current class](#class-inheritance) given the properties to be included.
	  	// Returns a Javascript function that is a class constructor (to be called with `new`).
	  	var NewClass = function () {

	  		// call the constructor
	  		if (this.initialize) {
	  			this.initialize.apply(this, arguments);
	  		}

	  		// call all constructor hooks
	  		this.callInitHooks();
	  	};

	  	var parentProto = NewClass.__super__ = this.prototype;

	  	var proto = create(parentProto);
	  	proto.constructor = NewClass;

	  	NewClass.prototype = proto;

	  	// inherit parent's statics
	  	for (var i in this) {
	  		if (Object.prototype.hasOwnProperty.call(this, i) && i !== 'prototype' && i !== '__super__') {
	  			NewClass[i] = this[i];
	  		}
	  	}

	  	// mix static properties into the class
	  	if (props.statics) {
	  		extend(NewClass, props.statics);
	  		delete props.statics;
	  	}

	  	// mix includes into the prototype
	  	if (props.includes) {
	  		checkDeprecatedMixinEvents(props.includes);
	  		extend.apply(null, [proto].concat(props.includes));
	  		delete props.includes;
	  	}

	  	// merge options
	  	if (proto.options) {
	  		props.options = extend(create(proto.options), props.options);
	  	}

	  	// mix given properties into the prototype
	  	extend(proto, props);

	  	proto._initHooks = [];

	  	// add method for calling all hooks
	  	proto.callInitHooks = function () {

	  		if (this._initHooksCalled) { return; }

	  		if (parentProto.callInitHooks) {
	  			parentProto.callInitHooks.call(this);
	  		}

	  		this._initHooksCalled = true;

	  		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
	  			proto._initHooks[i].call(this);
	  		}
	  	};

	  	return NewClass;
	  };


	  // @function include(properties: Object): this
	  // [Includes a mixin](#class-includes) into the current class.
	  Class.include = function (props) {
	  	extend(this.prototype, props);
	  	return this;
	  };

	  // @function mergeOptions(options: Object): this
	  // [Merges `options`](#class-options) into the defaults of the class.
	  Class.mergeOptions = function (options) {
	  	extend(this.prototype.options, options);
	  	return this;
	  };

	  // @function addInitHook(fn: Function): this
	  // Adds a [constructor hook](#class-constructor-hooks) to the class.
	  Class.addInitHook = function (fn) { // (Function) || (String, args...)
	  	var args = Array.prototype.slice.call(arguments, 1);

	  	var init = typeof fn === 'function' ? fn : function () {
	  		this[fn].apply(this, args);
	  	};

	  	this.prototype._initHooks = this.prototype._initHooks || [];
	  	this.prototype._initHooks.push(init);
	  	return this;
	  };

	  function checkDeprecatedMixinEvents(includes) {
	  	if (typeof L === 'undefined' || !L || !L.Mixin) { return; }

	  	includes = isArray(includes) ? includes : [includes];

	  	for (var i = 0; i < includes.length; i++) {
	  		if (includes[i] === L.Mixin.Events) {
	  			console.warn('Deprecated include of L.Mixin.Events: ' +
	  				'this property will be removed in future releases, ' +
	  				'please inherit from L.Evented instead.', new Error().stack);
	  		}
	  	}
	  }

	  /*
	   * @class Evented
	   * @aka L.Evented
	   * @inherits Class
	   *
	   * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
	   *
	   * @example
	   *
	   * ```js
	   * map.on('click', function(e) {
	   * 	alert(e.latlng);
	   * } );
	   * ```
	   *
	   * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
	   *
	   * ```js
	   * function onClick(e) { ... }
	   *
	   * map.on('click', onClick);
	   * map.off('click', onClick);
	   * ```
	   */

	  var Events = {
	  	/* @method on(type: String, fn: Function, context?: Object): this
	  	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
	  	 *
	  	 * @alternative
	  	 * @method on(eventMap: Object): this
	  	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	  	 */
	  	on: function (types, fn, context) {

	  		// types can be a map of types/handlers
	  		if (typeof types === 'object') {
	  			for (var type in types) {
	  				// we don't process space-separated events here for performance;
	  				// it's a hot path since Layer uses the on(obj) syntax
	  				this._on(type, types[type], fn);
	  			}

	  		} else {
	  			// types can be a string of space-separated words
	  			types = splitWords(types);

	  			for (var i = 0, len = types.length; i < len; i++) {
	  				this._on(types[i], fn, context);
	  			}
	  		}

	  		return this;
	  	},

	  	/* @method off(type: String, fn?: Function, context?: Object): this
	  	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
	  	 *
	  	 * @alternative
	  	 * @method off(eventMap: Object): this
	  	 * Removes a set of type/listener pairs.
	  	 *
	  	 * @alternative
	  	 * @method off: this
	  	 * Removes all listeners to all events on the object. This includes implicitly attached events.
	  	 */
	  	off: function (types, fn, context) {

	  		if (!types) {
	  			// clear all listeners if called without arguments
	  			delete this._events;

	  		} else if (typeof types === 'object') {
	  			for (var type in types) {
	  				this._off(type, types[type], fn);
	  			}

	  		} else {
	  			types = splitWords(types);

	  			for (var i = 0, len = types.length; i < len; i++) {
	  				this._off(types[i], fn, context);
	  			}
	  		}

	  		return this;
	  	},

	  	// attach listener (without syntactic sugar now)
	  	_on: function (type, fn, context) {
	  		this._events = this._events || {};

	  		/* get/init listeners for type */
	  		var typeListeners = this._events[type];
	  		if (!typeListeners) {
	  			typeListeners = [];
	  			this._events[type] = typeListeners;
	  		}

	  		if (context === this) {
	  			// Less memory footprint.
	  			context = undefined;
	  		}
	  		var newListener = {fn: fn, ctx: context},
	  		    listeners = typeListeners;

	  		// check if fn already there
	  		for (var i = 0, len = listeners.length; i < len; i++) {
	  			if (listeners[i].fn === fn && listeners[i].ctx === context) {
	  				return;
	  			}
	  		}

	  		listeners.push(newListener);
	  	},

	  	_off: function (type, fn, context) {
	  		var listeners,
	  		    i,
	  		    len;

	  		if (!this._events) { return; }

	  		listeners = this._events[type];

	  		if (!listeners) {
	  			return;
	  		}

	  		if (!fn) {
	  			// Set all removed listeners to noop so they are not called if remove happens in fire
	  			for (i = 0, len = listeners.length; i < len; i++) {
	  				listeners[i].fn = falseFn;
	  			}
	  			// clear all listeners for a type if function isn't specified
	  			delete this._events[type];
	  			return;
	  		}

	  		if (context === this) {
	  			context = undefined;
	  		}

	  		if (listeners) {

	  			// find fn and remove it
	  			for (i = 0, len = listeners.length; i < len; i++) {
	  				var l = listeners[i];
	  				if (l.ctx !== context) { continue; }
	  				if (l.fn === fn) {

	  					// set the removed listener to noop so that's not called if remove happens in fire
	  					l.fn = falseFn;

	  					if (this._firingCount) {
	  						/* copy array in case events are being fired */
	  						this._events[type] = listeners = listeners.slice();
	  					}
	  					listeners.splice(i, 1);

	  					return;
	  				}
	  			}
	  		}
	  	},

	  	// @method fire(type: String, data?: Object, propagate?: Boolean): this
	  	// Fires an event of the specified type. You can optionally provide an data
	  	// object — the first argument of the listener function will contain its
	  	// properties. The event can optionally be propagated to event parents.
	  	fire: function (type, data, propagate) {
	  		if (!this.listens(type, propagate)) { return this; }

	  		var event = extend({}, data, {
	  			type: type,
	  			target: this,
	  			sourceTarget: data && data.sourceTarget || this
	  		});

	  		if (this._events) {
	  			var listeners = this._events[type];

	  			if (listeners) {
	  				this._firingCount = (this._firingCount + 1) || 1;
	  				for (var i = 0, len = listeners.length; i < len; i++) {
	  					var l = listeners[i];
	  					l.fn.call(l.ctx || this, event);
	  				}

	  				this._firingCount--;
	  			}
	  		}

	  		if (propagate) {
	  			// propagate the event to parents (set with addEventParent)
	  			this._propagateEvent(event);
	  		}

	  		return this;
	  	},

	  	// @method listens(type: String): Boolean
	  	// Returns `true` if a particular event type has any listeners attached to it.
	  	listens: function (type, propagate) {
	  		var listeners = this._events && this._events[type];
	  		if (listeners && listeners.length) { return true; }

	  		if (propagate) {
	  			// also check parents for listeners if event propagates
	  			for (var id in this._eventParents) {
	  				if (this._eventParents[id].listens(type, propagate)) { return true; }
	  			}
	  		}
	  		return false;
	  	},

	  	// @method once(…): this
	  	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
	  	once: function (types, fn, context) {

	  		if (typeof types === 'object') {
	  			for (var type in types) {
	  				this.once(type, types[type], fn);
	  			}
	  			return this;
	  		}

	  		var handler = bind(function () {
	  			this
	  			    .off(types, fn, context)
	  			    .off(types, handler, context);
	  		}, this);

	  		// add a listener that's executed once and removed after that
	  		return this
	  		    .on(types, fn, context)
	  		    .on(types, handler, context);
	  	},

	  	// @method addEventParent(obj: Evented): this
	  	// Adds an event parent - an `Evented` that will receive propagated events
	  	addEventParent: function (obj) {
	  		this._eventParents = this._eventParents || {};
	  		this._eventParents[stamp(obj)] = obj;
	  		return this;
	  	},

	  	// @method removeEventParent(obj: Evented): this
	  	// Removes an event parent, so it will stop receiving propagated events
	  	removeEventParent: function (obj) {
	  		if (this._eventParents) {
	  			delete this._eventParents[stamp(obj)];
	  		}
	  		return this;
	  	},

	  	_propagateEvent: function (e) {
	  		for (var id in this._eventParents) {
	  			this._eventParents[id].fire(e.type, extend({
	  				layer: e.target,
	  				propagatedFrom: e.target
	  			}, e), true);
	  		}
	  	}
	  };

	  // aliases; we should ditch those eventually

	  // @method addEventListener(…): this
	  // Alias to [`on(…)`](#evented-on)
	  Events.addEventListener = Events.on;

	  // @method removeEventListener(…): this
	  // Alias to [`off(…)`](#evented-off)

	  // @method clearAllEventListeners(…): this
	  // Alias to [`off()`](#evented-off)
	  Events.removeEventListener = Events.clearAllEventListeners = Events.off;

	  // @method addOneTimeEventListener(…): this
	  // Alias to [`once(…)`](#evented-once)
	  Events.addOneTimeEventListener = Events.once;

	  // @method fireEvent(…): this
	  // Alias to [`fire(…)`](#evented-fire)
	  Events.fireEvent = Events.fire;

	  // @method hasEventListeners(…): Boolean
	  // Alias to [`listens(…)`](#evented-listens)
	  Events.hasEventListeners = Events.listens;

	  var Evented = Class.extend(Events);

	  /*
	   * @class Point
	   * @aka L.Point
	   *
	   * Represents a point with `x` and `y` coordinates in pixels.
	   *
	   * @example
	   *
	   * ```js
	   * var point = L.point(200, 300);
	   * ```
	   *
	   * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
	   *
	   * ```js
	   * map.panBy([200, 300]);
	   * map.panBy(L.point(200, 300));
	   * ```
	   *
	   * Note that `Point` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function Point(x, y, round) {
	  	// @property x: Number; The `x` coordinate of the point
	  	this.x = (round ? Math.round(x) : x);
	  	// @property y: Number; The `y` coordinate of the point
	  	this.y = (round ? Math.round(y) : y);
	  }

	  var trunc = Math.trunc || function (v) {
	  	return v > 0 ? Math.floor(v) : Math.ceil(v);
	  };

	  Point.prototype = {

	  	// @method clone(): Point
	  	// Returns a copy of the current point.
	  	clone: function () {
	  		return new Point(this.x, this.y);
	  	},

	  	// @method add(otherPoint: Point): Point
	  	// Returns the result of addition of the current and the given points.
	  	add: function (point) {
	  		// non-destructive, returns a new point
	  		return this.clone()._add(toPoint(point));
	  	},

	  	_add: function (point) {
	  		// destructive, used directly for performance in situations where it's safe to modify existing point
	  		this.x += point.x;
	  		this.y += point.y;
	  		return this;
	  	},

	  	// @method subtract(otherPoint: Point): Point
	  	// Returns the result of subtraction of the given point from the current.
	  	subtract: function (point) {
	  		return this.clone()._subtract(toPoint(point));
	  	},

	  	_subtract: function (point) {
	  		this.x -= point.x;
	  		this.y -= point.y;
	  		return this;
	  	},

	  	// @method divideBy(num: Number): Point
	  	// Returns the result of division of the current point by the given number.
	  	divideBy: function (num) {
	  		return this.clone()._divideBy(num);
	  	},

	  	_divideBy: function (num) {
	  		this.x /= num;
	  		this.y /= num;
	  		return this;
	  	},

	  	// @method multiplyBy(num: Number): Point
	  	// Returns the result of multiplication of the current point by the given number.
	  	multiplyBy: function (num) {
	  		return this.clone()._multiplyBy(num);
	  	},

	  	_multiplyBy: function (num) {
	  		this.x *= num;
	  		this.y *= num;
	  		return this;
	  	},

	  	// @method scaleBy(scale: Point): Point
	  	// Multiply each coordinate of the current point by each coordinate of
	  	// `scale`. In linear algebra terms, multiply the point by the
	  	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
	  	// defined by `scale`.
	  	scaleBy: function (point) {
	  		return new Point(this.x * point.x, this.y * point.y);
	  	},

	  	// @method unscaleBy(scale: Point): Point
	  	// Inverse of `scaleBy`. Divide each coordinate of the current point by
	  	// each coordinate of `scale`.
	  	unscaleBy: function (point) {
	  		return new Point(this.x / point.x, this.y / point.y);
	  	},

	  	// @method round(): Point
	  	// Returns a copy of the current point with rounded coordinates.
	  	round: function () {
	  		return this.clone()._round();
	  	},

	  	_round: function () {
	  		this.x = Math.round(this.x);
	  		this.y = Math.round(this.y);
	  		return this;
	  	},

	  	// @method floor(): Point
	  	// Returns a copy of the current point with floored coordinates (rounded down).
	  	floor: function () {
	  		return this.clone()._floor();
	  	},

	  	_floor: function () {
	  		this.x = Math.floor(this.x);
	  		this.y = Math.floor(this.y);
	  		return this;
	  	},

	  	// @method ceil(): Point
	  	// Returns a copy of the current point with ceiled coordinates (rounded up).
	  	ceil: function () {
	  		return this.clone()._ceil();
	  	},

	  	_ceil: function () {
	  		this.x = Math.ceil(this.x);
	  		this.y = Math.ceil(this.y);
	  		return this;
	  	},

	  	// @method trunc(): Point
	  	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
	  	trunc: function () {
	  		return this.clone()._trunc();
	  	},

	  	_trunc: function () {
	  		this.x = trunc(this.x);
	  		this.y = trunc(this.y);
	  		return this;
	  	},

	  	// @method distanceTo(otherPoint: Point): Number
	  	// Returns the cartesian distance between the current and the given points.
	  	distanceTo: function (point) {
	  		point = toPoint(point);

	  		var x = point.x - this.x,
	  		    y = point.y - this.y;

	  		return Math.sqrt(x * x + y * y);
	  	},

	  	// @method equals(otherPoint: Point): Boolean
	  	// Returns `true` if the given point has the same coordinates.
	  	equals: function (point) {
	  		point = toPoint(point);

	  		return point.x === this.x &&
	  		       point.y === this.y;
	  	},

	  	// @method contains(otherPoint: Point): Boolean
	  	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	  	contains: function (point) {
	  		point = toPoint(point);

	  		return Math.abs(point.x) <= Math.abs(this.x) &&
	  		       Math.abs(point.y) <= Math.abs(this.y);
	  	},

	  	// @method toString(): String
	  	// Returns a string representation of the point for debugging purposes.
	  	toString: function () {
	  		return 'Point(' +
	  		        formatNum(this.x) + ', ' +
	  		        formatNum(this.y) + ')';
	  	}
	  };

	  // @factory L.point(x: Number, y: Number, round?: Boolean)
	  // Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

	  // @alternative
	  // @factory L.point(coords: Number[])
	  // Expects an array of the form `[x, y]` instead.

	  // @alternative
	  // @factory L.point(coords: Object)
	  // Expects a plain object of the form `{x: Number, y: Number}` instead.
	  function toPoint(x, y, round) {
	  	if (x instanceof Point) {
	  		return x;
	  	}
	  	if (isArray(x)) {
	  		return new Point(x[0], x[1]);
	  	}
	  	if (x === undefined || x === null) {
	  		return x;
	  	}
	  	if (typeof x === 'object' && 'x' in x && 'y' in x) {
	  		return new Point(x.x, x.y);
	  	}
	  	return new Point(x, y, round);
	  }

	  /*
	   * @class Bounds
	   * @aka L.Bounds
	   *
	   * Represents a rectangular area in pixel coordinates.
	   *
	   * @example
	   *
	   * ```js
	   * var p1 = L.point(10, 10),
	   * p2 = L.point(40, 60),
	   * bounds = L.bounds(p1, p2);
	   * ```
	   *
	   * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
	   *
	   * ```js
	   * otherBounds.intersects([[10, 10], [40, 60]]);
	   * ```
	   *
	   * Note that `Bounds` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function Bounds(a, b) {
	  	if (!a) { return; }

	  	var points = b ? [a, b] : a;

	  	for (var i = 0, len = points.length; i < len; i++) {
	  		this.extend(points[i]);
	  	}
	  }

	  Bounds.prototype = {
	  	// @method extend(point: Point): this
	  	// Extends the bounds to contain the given point.
	  	extend: function (point) { // (Point)
	  		point = toPoint(point);

	  		// @property min: Point
	  		// The top left corner of the rectangle.
	  		// @property max: Point
	  		// The bottom right corner of the rectangle.
	  		if (!this.min && !this.max) {
	  			this.min = point.clone();
	  			this.max = point.clone();
	  		} else {
	  			this.min.x = Math.min(point.x, this.min.x);
	  			this.max.x = Math.max(point.x, this.max.x);
	  			this.min.y = Math.min(point.y, this.min.y);
	  			this.max.y = Math.max(point.y, this.max.y);
	  		}
	  		return this;
	  	},

	  	// @method getCenter(round?: Boolean): Point
	  	// Returns the center point of the bounds.
	  	getCenter: function (round) {
	  		return new Point(
	  		        (this.min.x + this.max.x) / 2,
	  		        (this.min.y + this.max.y) / 2, round);
	  	},

	  	// @method getBottomLeft(): Point
	  	// Returns the bottom-left point of the bounds.
	  	getBottomLeft: function () {
	  		return new Point(this.min.x, this.max.y);
	  	},

	  	// @method getTopRight(): Point
	  	// Returns the top-right point of the bounds.
	  	getTopRight: function () { // -> Point
	  		return new Point(this.max.x, this.min.y);
	  	},

	  	// @method getTopLeft(): Point
	  	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
	  	getTopLeft: function () {
	  		return this.min; // left, top
	  	},

	  	// @method getBottomRight(): Point
	  	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
	  	getBottomRight: function () {
	  		return this.max; // right, bottom
	  	},

	  	// @method getSize(): Point
	  	// Returns the size of the given bounds
	  	getSize: function () {
	  		return this.max.subtract(this.min);
	  	},

	  	// @method contains(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle contains the given one.
	  	// @alternative
	  	// @method contains(point: Point): Boolean
	  	// Returns `true` if the rectangle contains the given point.
	  	contains: function (obj) {
	  		var min, max;

	  		if (typeof obj[0] === 'number' || obj instanceof Point) {
	  			obj = toPoint(obj);
	  		} else {
	  			obj = toBounds(obj);
	  		}

	  		if (obj instanceof Bounds) {
	  			min = obj.min;
	  			max = obj.max;
	  		} else {
	  			min = max = obj;
	  		}

	  		return (min.x >= this.min.x) &&
	  		       (max.x <= this.max.x) &&
	  		       (min.y >= this.min.y) &&
	  		       (max.y <= this.max.y);
	  	},

	  	// @method intersects(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle intersects the given bounds. Two bounds
	  	// intersect if they have at least one point in common.
	  	intersects: function (bounds) { // (Bounds) -> Boolean
	  		bounds = toBounds(bounds);

	  		var min = this.min,
	  		    max = this.max,
	  		    min2 = bounds.min,
	  		    max2 = bounds.max,
	  		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
	  		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

	  		return xIntersects && yIntersects;
	  	},

	  	// @method overlaps(otherBounds: Bounds): Boolean
	  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
	  	// overlap if their intersection is an area.
	  	overlaps: function (bounds) { // (Bounds) -> Boolean
	  		bounds = toBounds(bounds);

	  		var min = this.min,
	  		    max = this.max,
	  		    min2 = bounds.min,
	  		    max2 = bounds.max,
	  		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
	  		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

	  		return xOverlaps && yOverlaps;
	  	},

	  	isValid: function () {
	  		return !!(this.min && this.max);
	  	}
	  };


	  // @factory L.bounds(corner1: Point, corner2: Point)
	  // Creates a Bounds object from two corners coordinate pairs.
	  // @alternative
	  // @factory L.bounds(points: Point[])
	  // Creates a Bounds object from the given array of points.
	  function toBounds(a, b) {
	  	if (!a || a instanceof Bounds) {
	  		return a;
	  	}
	  	return new Bounds(a, b);
	  }

	  /*
	   * @class LatLngBounds
	   * @aka L.LatLngBounds
	   *
	   * Represents a rectangular geographical area on a map.
	   *
	   * @example
	   *
	   * ```js
	   * var corner1 = L.latLng(40.712, -74.227),
	   * corner2 = L.latLng(40.774, -74.125),
	   * bounds = L.latLngBounds(corner1, corner2);
	   * ```
	   *
	   * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
	   *
	   * ```js
	   * map.fitBounds([
	   * 	[40.712, -74.227],
	   * 	[40.774, -74.125]
	   * ]);
	   * ```
	   *
	   * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
	   *
	   * Note that `LatLngBounds` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
	  	if (!corner1) { return; }

	  	var latlngs = corner2 ? [corner1, corner2] : corner1;

	  	for (var i = 0, len = latlngs.length; i < len; i++) {
	  		this.extend(latlngs[i]);
	  	}
	  }

	  LatLngBounds.prototype = {

	  	// @method extend(latlng: LatLng): this
	  	// Extend the bounds to contain the given point

	  	// @alternative
	  	// @method extend(otherBounds: LatLngBounds): this
	  	// Extend the bounds to contain the given bounds
	  	extend: function (obj) {
	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2, ne2;

	  		if (obj instanceof LatLng) {
	  			sw2 = obj;
	  			ne2 = obj;

	  		} else if (obj instanceof LatLngBounds) {
	  			sw2 = obj._southWest;
	  			ne2 = obj._northEast;

	  			if (!sw2 || !ne2) { return this; }

	  		} else {
	  			return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
	  		}

	  		if (!sw && !ne) {
	  			this._southWest = new LatLng(sw2.lat, sw2.lng);
	  			this._northEast = new LatLng(ne2.lat, ne2.lng);
	  		} else {
	  			sw.lat = Math.min(sw2.lat, sw.lat);
	  			sw.lng = Math.min(sw2.lng, sw.lng);
	  			ne.lat = Math.max(ne2.lat, ne.lat);
	  			ne.lng = Math.max(ne2.lng, ne.lng);
	  		}

	  		return this;
	  	},

	  	// @method pad(bufferRatio: Number): LatLngBounds
	  	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
	  	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
	  	// Negative values will retract the bounds.
	  	pad: function (bufferRatio) {
	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
	  		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

	  		return new LatLngBounds(
	  		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
	  		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	  	},

	  	// @method getCenter(): LatLng
	  	// Returns the center point of the bounds.
	  	getCenter: function () {
	  		return new LatLng(
	  		        (this._southWest.lat + this._northEast.lat) / 2,
	  		        (this._southWest.lng + this._northEast.lng) / 2);
	  	},

	  	// @method getSouthWest(): LatLng
	  	// Returns the south-west point of the bounds.
	  	getSouthWest: function () {
	  		return this._southWest;
	  	},

	  	// @method getNorthEast(): LatLng
	  	// Returns the north-east point of the bounds.
	  	getNorthEast: function () {
	  		return this._northEast;
	  	},

	  	// @method getNorthWest(): LatLng
	  	// Returns the north-west point of the bounds.
	  	getNorthWest: function () {
	  		return new LatLng(this.getNorth(), this.getWest());
	  	},

	  	// @method getSouthEast(): LatLng
	  	// Returns the south-east point of the bounds.
	  	getSouthEast: function () {
	  		return new LatLng(this.getSouth(), this.getEast());
	  	},

	  	// @method getWest(): Number
	  	// Returns the west longitude of the bounds
	  	getWest: function () {
	  		return this._southWest.lng;
	  	},

	  	// @method getSouth(): Number
	  	// Returns the south latitude of the bounds
	  	getSouth: function () {
	  		return this._southWest.lat;
	  	},

	  	// @method getEast(): Number
	  	// Returns the east longitude of the bounds
	  	getEast: function () {
	  		return this._northEast.lng;
	  	},

	  	// @method getNorth(): Number
	  	// Returns the north latitude of the bounds
	  	getNorth: function () {
	  		return this._northEast.lat;
	  	},

	  	// @method contains(otherBounds: LatLngBounds): Boolean
	  	// Returns `true` if the rectangle contains the given one.

	  	// @alternative
	  	// @method contains (latlng: LatLng): Boolean
	  	// Returns `true` if the rectangle contains the given point.
	  	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
	  		if (typeof obj[0] === 'number' || obj instanceof LatLng || 'lat' in obj) {
	  			obj = toLatLng(obj);
	  		} else {
	  			obj = toLatLngBounds(obj);
	  		}

	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2, ne2;

	  		if (obj instanceof LatLngBounds) {
	  			sw2 = obj.getSouthWest();
	  			ne2 = obj.getNorthEast();
	  		} else {
	  			sw2 = ne2 = obj;
	  		}

	  		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
	  		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	  	},

	  	// @method intersects(otherBounds: LatLngBounds): Boolean
	  	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
	  	intersects: function (bounds) {
	  		bounds = toLatLngBounds(bounds);

	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2 = bounds.getSouthWest(),
	  		    ne2 = bounds.getNorthEast(),

	  		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
	  		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

	  		return latIntersects && lngIntersects;
	  	},

	  	// @method overlaps(otherBounds: LatLngBounds): Boolean
	  	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
	  	overlaps: function (bounds) {
	  		bounds = toLatLngBounds(bounds);

	  		var sw = this._southWest,
	  		    ne = this._northEast,
	  		    sw2 = bounds.getSouthWest(),
	  		    ne2 = bounds.getNorthEast(),

	  		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
	  		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

	  		return latOverlaps && lngOverlaps;
	  	},

	  	// @method toBBoxString(): String
	  	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
	  	toBBoxString: function () {
	  		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	  	},

	  	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
	  	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
	  	equals: function (bounds, maxMargin) {
	  		if (!bounds) { return false; }

	  		bounds = toLatLngBounds(bounds);

	  		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
	  		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
	  	},

	  	// @method isValid(): Boolean
	  	// Returns `true` if the bounds are properly initialized.
	  	isValid: function () {
	  		return !!(this._southWest && this._northEast);
	  	}
	  };

	  // TODO International date line?

	  // @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
	  // Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

	  // @alternative
	  // @factory L.latLngBounds(latlngs: LatLng[])
	  // Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
	  function toLatLngBounds(a, b) {
	  	if (a instanceof LatLngBounds) {
	  		return a;
	  	}
	  	return new LatLngBounds(a, b);
	  }

	  /* @class LatLng
	   * @aka L.LatLng
	   *
	   * Represents a geographical point with a certain latitude and longitude.
	   *
	   * @example
	   *
	   * ```
	   * var latlng = L.latLng(50.5, 30.5);
	   * ```
	   *
	   * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
	   *
	   * ```
	   * map.panTo([50, 30]);
	   * map.panTo({lon: 30, lat: 50});
	   * map.panTo({lat: 50, lng: 30});
	   * map.panTo(L.latLng(50, 30));
	   * ```
	   *
	   * Note that `LatLng` does not inherit from Leaflet's `Class` object,
	   * which means new classes can't inherit from it, and new methods
	   * can't be added to it with the `include` function.
	   */

	  function LatLng(lat, lng, alt) {
	  	if (isNaN(lat) || isNaN(lng)) {
	  		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	  	}

	  	// @property lat: Number
	  	// Latitude in degrees
	  	this.lat = +lat;

	  	// @property lng: Number
	  	// Longitude in degrees
	  	this.lng = +lng;

	  	// @property alt: Number
	  	// Altitude in meters (optional)
	  	if (alt !== undefined) {
	  		this.alt = +alt;
	  	}
	  }

	  LatLng.prototype = {
	  	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
	  	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
	  	equals: function (obj, maxMargin) {
	  		if (!obj) { return false; }

	  		obj = toLatLng(obj);

	  		var margin = Math.max(
	  		        Math.abs(this.lat - obj.lat),
	  		        Math.abs(this.lng - obj.lng));

	  		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	  	},

	  	// @method toString(): String
	  	// Returns a string representation of the point (for debugging purposes).
	  	toString: function (precision) {
	  		return 'LatLng(' +
	  		        formatNum(this.lat, precision) + ', ' +
	  		        formatNum(this.lng, precision) + ')';
	  	},

	  	// @method distanceTo(otherLatLng: LatLng): Number
	  	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
	  	distanceTo: function (other) {
	  		return Earth.distance(this, toLatLng(other));
	  	},

	  	// @method wrap(): LatLng
	  	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	  	wrap: function () {
	  		return Earth.wrapLatLng(this);
	  	},

	  	// @method toBounds(sizeInMeters: Number): LatLngBounds
	  	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	  	toBounds: function (sizeInMeters) {
	  		var latAccuracy = 180 * sizeInMeters / 40075017,
	  		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

	  		return toLatLngBounds(
	  		        [this.lat - latAccuracy, this.lng - lngAccuracy],
	  		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
	  	},

	  	clone: function () {
	  		return new LatLng(this.lat, this.lng, this.alt);
	  	}
	  };



	  // @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
	  // Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

	  // @alternative
	  // @factory L.latLng(coords: Array): LatLng
	  // Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

	  // @alternative
	  // @factory L.latLng(coords: Object): LatLng
	  // Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

	  function toLatLng(a, b, c) {
	  	if (a instanceof LatLng) {
	  		return a;
	  	}
	  	if (isArray(a) && typeof a[0] !== 'object') {
	  		if (a.length === 3) {
	  			return new LatLng(a[0], a[1], a[2]);
	  		}
	  		if (a.length === 2) {
	  			return new LatLng(a[0], a[1]);
	  		}
	  		return null;
	  	}
	  	if (a === undefined || a === null) {
	  		return a;
	  	}
	  	if (typeof a === 'object' && 'lat' in a) {
	  		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	  	}
	  	if (b === undefined) {
	  		return null;
	  	}
	  	return new LatLng(a, b, c);
	  }

	  /*
	   * @namespace CRS
	   * @crs L.CRS.Base
	   * Object that defines coordinate reference systems for projecting
	   * geographical points into pixel (screen) coordinates and back (and to
	   * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
	   * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
	   *
	   * Leaflet defines the most usual CRSs by default. If you want to use a
	   * CRS not defined by default, take a look at the
	   * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
	   *
	   * Note that the CRS instances do not inherit from Leaflet's `Class` object,
	   * and can't be instantiated. Also, new classes can't inherit from them,
	   * and methods can't be added to them with the `include` function.
	   */

	  var CRS = {
	  	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
	  	// Projects geographical coordinates into pixel coordinates for a given zoom.
	  	latLngToPoint: function (latlng, zoom) {
	  		var projectedPoint = this.projection.project(latlng),
	  		    scale = this.scale(zoom);

	  		return this.transformation._transform(projectedPoint, scale);
	  	},

	  	// @method pointToLatLng(point: Point, zoom: Number): LatLng
	  	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
	  	// zoom into geographical coordinates.
	  	pointToLatLng: function (point, zoom) {
	  		var scale = this.scale(zoom),
	  		    untransformedPoint = this.transformation.untransform(point, scale);

	  		return this.projection.unproject(untransformedPoint);
	  	},

	  	// @method project(latlng: LatLng): Point
	  	// Projects geographical coordinates into coordinates in units accepted for
	  	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
	  	project: function (latlng) {
	  		return this.projection.project(latlng);
	  	},

	  	// @method unproject(point: Point): LatLng
	  	// Given a projected coordinate returns the corresponding LatLng.
	  	// The inverse of `project`.
	  	unproject: function (point) {
	  		return this.projection.unproject(point);
	  	},

	  	// @method scale(zoom: Number): Number
	  	// Returns the scale used when transforming projected coordinates into
	  	// pixel coordinates for a particular zoom. For example, it returns
	  	// `256 * 2^zoom` for Mercator-based CRS.
	  	scale: function (zoom) {
	  		return 256 * Math.pow(2, zoom);
	  	},

	  	// @method zoom(scale: Number): Number
	  	// Inverse of `scale()`, returns the zoom level corresponding to a scale
	  	// factor of `scale`.
	  	zoom: function (scale) {
	  		return Math.log(scale / 256) / Math.LN2;
	  	},

	  	// @method getProjectedBounds(zoom: Number): Bounds
	  	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
	  	getProjectedBounds: function (zoom) {
	  		if (this.infinite) { return null; }

	  		var b = this.projection.bounds,
	  		    s = this.scale(zoom),
	  		    min = this.transformation.transform(b.min, s),
	  		    max = this.transformation.transform(b.max, s);

	  		return new Bounds(min, max);
	  	},

	  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	  	// Returns the distance between two geographical coordinates.

	  	// @property code: String
	  	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
	  	//
	  	// @property wrapLng: Number[]
	  	// An array of two numbers defining whether the longitude (horizontal) coordinate
	  	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
	  	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
	  	//
	  	// @property wrapLat: Number[]
	  	// Like `wrapLng`, but for the latitude (vertical) axis.

	  	// wrapLng: [min, max],
	  	// wrapLat: [min, max],

	  	// @property infinite: Boolean
	  	// If true, the coordinate space will be unbounded (infinite in both axes)
	  	infinite: false,

	  	// @method wrapLatLng(latlng: LatLng): LatLng
	  	// Returns a `LatLng` where lat and lng has been wrapped according to the
	  	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
	  	wrapLatLng: function (latlng) {
	  		var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
	  		    lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
	  		    alt = latlng.alt;

	  		return new LatLng(lat, lng, alt);
	  	},

	  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	  	// Returns a `LatLngBounds` with the same size as the given one, ensuring
	  	// that its center is within the CRS's bounds.
	  	// Only accepts actual `L.LatLngBounds` instances, not arrays.
	  	wrapLatLngBounds: function (bounds) {
	  		var center = bounds.getCenter(),
	  		    newCenter = this.wrapLatLng(center),
	  		    latShift = center.lat - newCenter.lat,
	  		    lngShift = center.lng - newCenter.lng;

	  		if (latShift === 0 && lngShift === 0) {
	  			return bounds;
	  		}

	  		var sw = bounds.getSouthWest(),
	  		    ne = bounds.getNorthEast(),
	  		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
	  		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

	  		return new LatLngBounds(newSw, newNe);
	  	}
	  };

	  /*
	   * @namespace CRS
	   * @crs L.CRS.Earth
	   *
	   * Serves as the base for CRS that are global such that they cover the earth.
	   * Can only be used as the base for other CRS and cannot be used directly,
	   * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
	   * meters.
	   */

	  var Earth = extend({}, CRS, {
	  	wrapLng: [-180, 180],

	  	// Mean Earth Radius, as recommended for use by
	  	// the International Union of Geodesy and Geophysics,
	  	// see http://rosettacode.org/wiki/Haversine_formula
	  	R: 6371000,

	  	// distance between two geographical points using spherical law of cosines approximation
	  	distance: function (latlng1, latlng2) {
	  		var rad = Math.PI / 180,
	  		    lat1 = latlng1.lat * rad,
	  		    lat2 = latlng2.lat * rad,
	  		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
	  		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
	  		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
	  		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  		return this.R * c;
	  	}
	  });

	  /*
	   * @namespace Projection
	   * @projection L.Projection.SphericalMercator
	   *
	   * Spherical Mercator projection — the most common projection for online maps,
	   * used by almost all free and commercial tile providers. Assumes that Earth is
	   * a sphere. Used by the `EPSG:3857` CRS.
	   */

	  var earthRadius = 6378137;

	  var SphericalMercator = {

	  	R: earthRadius,
	  	MAX_LATITUDE: 85.0511287798,

	  	project: function (latlng) {
	  		var d = Math.PI / 180,
	  		    max = this.MAX_LATITUDE,
	  		    lat = Math.max(Math.min(max, latlng.lat), -max),
	  		    sin = Math.sin(lat * d);

	  		return new Point(
	  			this.R * latlng.lng * d,
	  			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	  	},

	  	unproject: function (point) {
	  		var d = 180 / Math.PI;

	  		return new LatLng(
	  			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
	  			point.x * d / this.R);
	  	},

	  	bounds: (function () {
	  		var d = earthRadius * Math.PI;
	  		return new Bounds([-d, -d], [d, d]);
	  	})()
	  };

	  /*
	   * @class Transformation
	   * @aka L.Transformation
	   *
	   * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
	   * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
	   * the reverse. Used by Leaflet in its projections code.
	   *
	   * @example
	   *
	   * ```js
	   * var transformation = L.transformation(2, 5, -1, 10),
	   * 	p = L.point(1, 2),
	   * 	p2 = transformation.transform(p), //  L.point(7, 8)
	   * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
	   * ```
	   */


	  // factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
	  // Creates a `Transformation` object with the given coefficients.
	  function Transformation(a, b, c, d) {
	  	if (isArray(a)) {
	  		// use array properties
	  		this._a = a[0];
	  		this._b = a[1];
	  		this._c = a[2];
	  		this._d = a[3];
	  		return;
	  	}
	  	this._a = a;
	  	this._b = b;
	  	this._c = c;
	  	this._d = d;
	  }

	  Transformation.prototype = {
	  	// @method transform(point: Point, scale?: Number): Point
	  	// Returns a transformed point, optionally multiplied by the given scale.
	  	// Only accepts actual `L.Point` instances, not arrays.
	  	transform: function (point, scale) { // (Point, Number) -> Point
	  		return this._transform(point.clone(), scale);
	  	},

	  	// destructive transform (faster)
	  	_transform: function (point, scale) {
	  		scale = scale || 1;
	  		point.x = scale * (this._a * point.x + this._b);
	  		point.y = scale * (this._c * point.y + this._d);
	  		return point;
	  	},

	  	// @method untransform(point: Point, scale?: Number): Point
	  	// Returns the reverse transformation of the given point, optionally divided
	  	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
	  	untransform: function (point, scale) {
	  		scale = scale || 1;
	  		return new Point(
	  		        (point.x / scale - this._b) / this._a,
	  		        (point.y / scale - this._d) / this._c);
	  	}
	  };

	  // factory L.transformation(a: Number, b: Number, c: Number, d: Number)

	  // @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
	  // Instantiates a Transformation object with the given coefficients.

	  // @alternative
	  // @factory L.transformation(coefficients: Array): Transformation
	  // Expects an coefficients array of the form
	  // `[a: Number, b: Number, c: Number, d: Number]`.

	  function toTransformation(a, b, c, d) {
	  	return new Transformation(a, b, c, d);
	  }

	  /*
	   * @namespace CRS
	   * @crs L.CRS.EPSG3857
	   *
	   * The most common CRS for online maps, used by almost all free and commercial
	   * tile providers. Uses Spherical Mercator projection. Set in by default in
	   * Map's `crs` option.
	   */

	  var EPSG3857 = extend({}, Earth, {
	  	code: 'EPSG:3857',
	  	projection: SphericalMercator,

	  	transformation: (function () {
	  		var scale = 0.5 / (Math.PI * SphericalMercator.R);
	  		return toTransformation(scale, 0.5, -scale, 0.5);
	  	}())
	  });

	  var EPSG900913 = extend({}, EPSG3857, {
	  	code: 'EPSG:900913'
	  });

	  // @namespace SVG; @section
	  // There are several static functions which can be called without instantiating L.SVG:

	  // @function create(name: String): SVGElement
	  // Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
	  // corresponding to the class name passed. For example, using 'line' will return
	  // an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
	  function svgCreate(name) {
	  	return document.createElementNS('http://www.w3.org/2000/svg', name);
	  }

	  // @function pointsToPath(rings: Point[], closed: Boolean): String
	  // Generates a SVG path string for multiple rings, with each ring turning
	  // into "M..L..L.." instructions
	  function pointsToPath(rings, closed) {
	  	var str = '',
	  	i, j, len, len2, points, p;

	  	for (i = 0, len = rings.length; i < len; i++) {
	  		points = rings[i];

	  		for (j = 0, len2 = points.length; j < len2; j++) {
	  			p = points[j];
	  			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
	  		}

	  		// closes the ring for polygons; "x" is VML syntax
	  		str += closed ? (svg ? 'z' : 'x') : '';
	  	}

	  	// SVG complains about empty path strings
	  	return str || 'M0 0';
	  }

	  /*
	   * @namespace Browser
	   * @aka L.Browser
	   *
	   * A namespace with static properties for browser/feature detection used by Leaflet internally.
	   *
	   * @example
	   *
	   * ```js
	   * if (L.Browser.ielt9) {
	   *   alert('Upgrade your browser, dude!');
	   * }
	   * ```
	   */

	  var style$1 = document.documentElement.style;

	  // @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
	  var ie = 'ActiveXObject' in window;

	  // @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
	  var ielt9 = ie && !document.addEventListener;

	  // @property edge: Boolean; `true` for the Edge web browser.
	  var edge = 'msLaunchUri' in navigator && !('documentMode' in document);

	  // @property webkit: Boolean;
	  // `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
	  var webkit = userAgentContains('webkit');

	  // @property android: Boolean
	  // `true` for any browser running on an Android platform.
	  var android = userAgentContains('android');

	  // @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
	  var android23 = userAgentContains('android 2') || userAgentContains('android 3');

	  /* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
	  var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
	  // @property androidStock: Boolean; `true` for the Android stock browser (i.e. not Chrome)
	  var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);

	  // @property opera: Boolean; `true` for the Opera browser
	  var opera = !!window.opera;

	  // @property chrome: Boolean; `true` for the Chrome browser.
	  var chrome = !edge && userAgentContains('chrome');

	  // @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
	  var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;

	  // @property safari: Boolean; `true` for the Safari browser.
	  var safari = !chrome && userAgentContains('safari');

	  var phantom = userAgentContains('phantom');

	  // @property opera12: Boolean
	  // `true` for the Opera browser supporting CSS transforms (version 12 or later).
	  var opera12 = 'OTransition' in style$1;

	  // @property win: Boolean; `true` when the browser is running in a Windows platform
	  var win = navigator.platform.indexOf('Win') === 0;

	  // @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
	  var ie3d = ie && ('transition' in style$1);

	  // @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
	  var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;

	  // @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
	  var gecko3d = 'MozPerspective' in style$1;

	  // @property any3d: Boolean
	  // `true` for all browsers supporting CSS transforms.
	  var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;

	  // @property mobile: Boolean; `true` for all browsers running in a mobile device.
	  var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

	  // @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
	  var mobileWebkit = mobile && webkit;

	  // @property mobileWebkit3d: Boolean
	  // `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
	  var mobileWebkit3d = mobile && webkit3d;

	  // @property msPointer: Boolean
	  // `true` for browsers implementing the Microsoft touch events model (notably IE10).
	  var msPointer = !window.PointerEvent && window.MSPointerEvent;

	  // @property pointer: Boolean
	  // `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
	  var pointer = !!(window.PointerEvent || msPointer);

	  // @property touch: Boolean
	  // `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
	  // This does not necessarily mean that the browser is running in a computer with
	  // a touchscreen, it only means that the browser is capable of understanding
	  // touch events.
	  var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
	  		(window.DocumentTouch && document instanceof window.DocumentTouch));

	  // @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
	  var mobileOpera = mobile && opera;

	  // @property mobileGecko: Boolean
	  // `true` for gecko-based browsers running in a mobile device.
	  var mobileGecko = mobile && gecko;

	  // @property retina: Boolean
	  // `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
	  var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;

	  // @property passiveEvents: Boolean
	  // `true` for browsers that support passive events.
	  var passiveEvents = (function () {
	  	var supportsPassiveOption = false;
	  	try {
	  		var opts = Object.defineProperty({}, 'passive', {
	  			get: function () { // eslint-disable-line getter-return
	  				supportsPassiveOption = true;
	  			}
	  		});
	  		window.addEventListener('testPassiveEventSupport', falseFn, opts);
	  		window.removeEventListener('testPassiveEventSupport', falseFn, opts);
	  	} catch (e) {
	  		// Errors can safely be ignored since this is only a browser support test.
	  	}
	  	return supportsPassiveOption;
	  }());

	  // @property canvas: Boolean
	  // `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
	  var canvas = (function () {
	  	return !!document.createElement('canvas').getContext;
	  }());

	  // @property svg: Boolean
	  // `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
	  var svg = !!(document.createElementNS && svgCreate('svg').createSVGRect);

	  // @property vml: Boolean
	  // `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
	  var vml = !svg && (function () {
	  	try {
	  		var div = document.createElement('div');
	  		div.innerHTML = '<v:shape adj="1"/>';

	  		var shape = div.firstChild;
	  		shape.style.behavior = 'url(#default#VML)';

	  		return shape && (typeof shape.adj === 'object');

	  	} catch (e) {
	  		return false;
	  	}
	  }());


	  function userAgentContains(str) {
	  	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
	  }

	  var Browser = ({
	    ie: ie,
	    ielt9: ielt9,
	    edge: edge,
	    webkit: webkit,
	    android: android,
	    android23: android23,
	    androidStock: androidStock,
	    opera: opera,
	    chrome: chrome,
	    gecko: gecko,
	    safari: safari,
	    phantom: phantom,
	    opera12: opera12,
	    win: win,
	    ie3d: ie3d,
	    webkit3d: webkit3d,
	    gecko3d: gecko3d,
	    any3d: any3d,
	    mobile: mobile,
	    mobileWebkit: mobileWebkit,
	    mobileWebkit3d: mobileWebkit3d,
	    msPointer: msPointer,
	    pointer: pointer,
	    touch: touch,
	    mobileOpera: mobileOpera,
	    mobileGecko: mobileGecko,
	    retina: retina,
	    passiveEvents: passiveEvents,
	    canvas: canvas,
	    svg: svg,
	    vml: vml
	  });

	  /*
	   * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
	   */


	  var POINTER_DOWN =   msPointer ? 'MSPointerDown'   : 'pointerdown';
	  var POINTER_MOVE =   msPointer ? 'MSPointerMove'   : 'pointermove';
	  var POINTER_UP =     msPointer ? 'MSPointerUp'     : 'pointerup';
	  var POINTER_CANCEL = msPointer ? 'MSPointerCancel' : 'pointercancel';

	  var _pointers = {};
	  var _pointerDocListener = false;

	  // Provides a touch events wrapper for (ms)pointer events.
	  // ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	  function addPointerListener(obj, type, handler, id) {
	  	if (type === 'touchstart') {
	  		_addPointerStart(obj, handler, id);

	  	} else if (type === 'touchmove') {
	  		_addPointerMove(obj, handler, id);

	  	} else if (type === 'touchend') {
	  		_addPointerEnd(obj, handler, id);
	  	}

	  	return this;
	  }

	  function removePointerListener(obj, type, id) {
	  	var handler = obj['_leaflet_' + type + id];

	  	if (type === 'touchstart') {
	  		obj.removeEventListener(POINTER_DOWN, handler, false);

	  	} else if (type === 'touchmove') {
	  		obj.removeEventListener(POINTER_MOVE, handler, false);

	  	} else if (type === 'touchend') {
	  		obj.removeEventListener(POINTER_UP, handler, false);
	  		obj.removeEventListener(POINTER_CANCEL, handler, false);
	  	}

	  	return this;
	  }

	  function _addPointerStart(obj, handler, id) {
	  	var onDown = bind(function (e) {
	  		// IE10 specific: MsTouch needs preventDefault. See #2000
	  		if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
	  			preventDefault(e);
	  		}

	  		_handlePointer(e, handler);
	  	});

	  	obj['_leaflet_touchstart' + id] = onDown;
	  	obj.addEventListener(POINTER_DOWN, onDown, false);

	  	// need to keep track of what pointers and how many are active to provide e.touches emulation
	  	if (!_pointerDocListener) {
	  		// we listen document as any drags that end by moving the touch off the screen get fired there
	  		document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
	  		document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
	  		document.addEventListener(POINTER_UP, _globalPointerUp, true);
	  		document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);

	  		_pointerDocListener = true;
	  	}
	  }

	  function _globalPointerDown(e) {
	  	_pointers[e.pointerId] = e;
	  }

	  function _globalPointerMove(e) {
	  	if (_pointers[e.pointerId]) {
	  		_pointers[e.pointerId] = e;
	  	}
	  }

	  function _globalPointerUp(e) {
	  	delete _pointers[e.pointerId];
	  }

	  function _handlePointer(e, handler) {
	  	e.touches = [];
	  	for (var i in _pointers) {
	  		e.touches.push(_pointers[i]);
	  	}
	  	e.changedTouches = [e];

	  	handler(e);
	  }

	  function _addPointerMove(obj, handler, id) {
	  	var onMove = function (e) {
	  		// don't fire touch moves when mouse isn't down
	  		if ((e.pointerType === (e.MSPOINTER_TYPE_MOUSE || 'mouse')) && e.buttons === 0) {
	  			return;
	  		}

	  		_handlePointer(e, handler);
	  	};

	  	obj['_leaflet_touchmove' + id] = onMove;
	  	obj.addEventListener(POINTER_MOVE, onMove, false);
	  }

	  function _addPointerEnd(obj, handler, id) {
	  	var onUp = function (e) {
	  		_handlePointer(e, handler);
	  	};

	  	obj['_leaflet_touchend' + id] = onUp;
	  	obj.addEventListener(POINTER_UP, onUp, false);
	  	obj.addEventListener(POINTER_CANCEL, onUp, false);
	  }

	  /*
	   * Extends the event handling code with double tap support for mobile browsers.
	   */

	  var _touchstart = msPointer ? 'MSPointerDown' : pointer ? 'pointerdown' : 'touchstart';
	  var _touchend = msPointer ? 'MSPointerUp' : pointer ? 'pointerup' : 'touchend';
	  var _pre = '_leaflet_';

	  // inspired by Zepto touch code by Thomas Fuchs
	  function addDoubleTapListener(obj, handler, id) {
	  	var last, touch$$1,
	  	    doubleTap = false,
	  	    delay = 250;

	  	function onTouchStart(e) {

	  		if (pointer) {
	  			if (!e.isPrimary) { return; }
	  			if (e.pointerType === 'mouse') { return; } // mouse fires native dblclick
	  		} else if (e.touches.length > 1) {
	  			return;
	  		}

	  		var now = Date.now(),
	  		    delta = now - (last || now);

	  		touch$$1 = e.touches ? e.touches[0] : e;
	  		doubleTap = (delta > 0 && delta <= delay);
	  		last = now;
	  	}

	  	function onTouchEnd(e) {
	  		if (doubleTap && !touch$$1.cancelBubble) {
	  			if (pointer) {
	  				if (e.pointerType === 'mouse') { return; }
	  				// work around .type being readonly with MSPointer* events
	  				var newTouch = {},
	  				    prop, i;

	  				for (i in touch$$1) {
	  					prop = touch$$1[i];
	  					newTouch[i] = prop && prop.bind ? prop.bind(touch$$1) : prop;
	  				}
	  				touch$$1 = newTouch;
	  			}
	  			touch$$1.type = 'dblclick';
	  			touch$$1.button = 0;
	  			handler(touch$$1);
	  			last = null;
	  		}
	  	}

	  	obj[_pre + _touchstart + id] = onTouchStart;
	  	obj[_pre + _touchend + id] = onTouchEnd;
	  	obj[_pre + 'dblclick' + id] = handler;

	  	obj.addEventListener(_touchstart, onTouchStart, passiveEvents ? {passive: false} : false);
	  	obj.addEventListener(_touchend, onTouchEnd, passiveEvents ? {passive: false} : false);

	  	// On some platforms (notably, chrome<55 on win10 + touchscreen + mouse),
	  	// the browser doesn't fire touchend/pointerup events but does fire
	  	// native dblclicks. See #4127.
	  	// Edge 14 also fires native dblclicks, but only for pointerType mouse, see #5180.
	  	obj.addEventListener('dblclick', handler, false);

	  	return this;
	  }

	  function removeDoubleTapListener(obj, id) {
	  	var touchstart = obj[_pre + _touchstart + id],
	  	    touchend = obj[_pre + _touchend + id],
	  	    dblclick = obj[_pre + 'dblclick' + id];

	  	obj.removeEventListener(_touchstart, touchstart, passiveEvents ? {passive: false} : false);
	  	obj.removeEventListener(_touchend, touchend, passiveEvents ? {passive: false} : false);
	  	obj.removeEventListener('dblclick', dblclick, false);

	  	return this;
	  }

	  /*
	   * @namespace DomUtil
	   *
	   * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
	   * tree, used by Leaflet internally.
	   *
	   * Most functions expecting or returning a `HTMLElement` also work for
	   * SVG elements. The only difference is that classes refer to CSS classes
	   * in HTML and SVG classes in SVG.
	   */


	  // @property TRANSFORM: String
	  // Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
	  var TRANSFORM = testProp(
	  	['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

	  // webkitTransition comes first because some browser versions that drop vendor prefix don't do
	  // the same for the transitionend event, in particular the Android 4.1 stock browser

	  // @property TRANSITION: String
	  // Vendor-prefixed transition style name.
	  var TRANSITION = testProp(
	  	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

	  // @property TRANSITION_END: String
	  // Vendor-prefixed transitionend event name.
	  var TRANSITION_END =
	  	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


	  // @function get(id: String|HTMLElement): HTMLElement
	  // Returns an element given its DOM id, or returns the element itself
	  // if it was passed directly.
	  function get(id) {
	  	return typeof id === 'string' ? document.getElementById(id) : id;
	  }

	  // @function getStyle(el: HTMLElement, styleAttrib: String): String
	  // Returns the value for a certain style attribute on an element,
	  // including computed values or values set through CSS.
	  function getStyle(el, style) {
	  	var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

	  	if ((!value || value === 'auto') && document.defaultView) {
	  		var css = document.defaultView.getComputedStyle(el, null);
	  		value = css ? css[style] : null;
	  	}
	  	return value === 'auto' ? null : value;
	  }

	  // @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
	  // Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
	  function create$1(tagName, className, container) {
	  	var el = document.createElement(tagName);
	  	el.className = className || '';

	  	if (container) {
	  		container.appendChild(el);
	  	}
	  	return el;
	  }

	  // @function remove(el: HTMLElement)
	  // Removes `el` from its parent element
	  function remove(el) {
	  	var parent = el.parentNode;
	  	if (parent) {
	  		parent.removeChild(el);
	  	}
	  }

	  // @function empty(el: HTMLElement)
	  // Removes all of `el`'s children elements from `el`
	  function empty(el) {
	  	while (el.firstChild) {
	  		el.removeChild(el.firstChild);
	  	}
	  }

	  // @function toFront(el: HTMLElement)
	  // Makes `el` the last child of its parent, so it renders in front of the other children.
	  function toFront(el) {
	  	var parent = el.parentNode;
	  	if (parent && parent.lastChild !== el) {
	  		parent.appendChild(el);
	  	}
	  }

	  // @function toBack(el: HTMLElement)
	  // Makes `el` the first child of its parent, so it renders behind the other children.
	  function toBack(el) {
	  	var parent = el.parentNode;
	  	if (parent && parent.firstChild !== el) {
	  		parent.insertBefore(el, parent.firstChild);
	  	}
	  }

	  // @function hasClass(el: HTMLElement, name: String): Boolean
	  // Returns `true` if the element's class attribute contains `name`.
	  function hasClass(el, name) {
	  	if (el.classList !== undefined) {
	  		return el.classList.contains(name);
	  	}
	  	var className = getClass(el);
	  	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	  }

	  // @function addClass(el: HTMLElement, name: String)
	  // Adds `name` to the element's class attribute.
	  function addClass(el, name) {
	  	if (el.classList !== undefined) {
	  		var classes = splitWords(name);
	  		for (var i = 0, len = classes.length; i < len; i++) {
	  			el.classList.add(classes[i]);
	  		}
	  	} else if (!hasClass(el, name)) {
	  		var className = getClass(el);
	  		setClass(el, (className ? className + ' ' : '') + name);
	  	}
	  }

	  // @function removeClass(el: HTMLElement, name: String)
	  // Removes `name` from the element's class attribute.
	  function removeClass(el, name) {
	  	if (el.classList !== undefined) {
	  		el.classList.remove(name);
	  	} else {
	  		setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
	  	}
	  }

	  // @function setClass(el: HTMLElement, name: String)
	  // Sets the element's class.
	  function setClass(el, name) {
	  	if (el.className.baseVal === undefined) {
	  		el.className = name;
	  	} else {
	  		// in case of SVG element
	  		el.className.baseVal = name;
	  	}
	  }

	  // @function getClass(el: HTMLElement): String
	  // Returns the element's class.
	  function getClass(el) {
	  	// Check if the element is an SVGElementInstance and use the correspondingElement instead
	  	// (Required for linked SVG elements in IE11.)
	  	if (el.correspondingElement) {
	  		el = el.correspondingElement;
	  	}
	  	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	  }

	  // @function setOpacity(el: HTMLElement, opacity: Number)
	  // Set the opacity of an element (including old IE support).
	  // `opacity` must be a number from `0` to `1`.
	  function setOpacity(el, value) {
	  	if ('opacity' in el.style) {
	  		el.style.opacity = value;
	  	} else if ('filter' in el.style) {
	  		_setOpacityIE(el, value);
	  	}
	  }

	  function _setOpacityIE(el, value) {
	  	var filter = false,
	  	    filterName = 'DXImageTransform.Microsoft.Alpha';

	  	// filters collection throws an error if we try to retrieve a filter that doesn't exist
	  	try {
	  		filter = el.filters.item(filterName);
	  	} catch (e) {
	  		// don't set opacity to 1 if we haven't already set an opacity,
	  		// it isn't needed and breaks transparent pngs.
	  		if (value === 1) { return; }
	  	}

	  	value = Math.round(value * 100);

	  	if (filter) {
	  		filter.Enabled = (value !== 100);
	  		filter.Opacity = value;
	  	} else {
	  		el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
	  	}
	  }

	  // @function testProp(props: String[]): String|false
	  // Goes through the array of style names and returns the first name
	  // that is a valid style name for an element. If no such name is found,
	  // it returns false. Useful for vendor-prefixed styles like `transform`.
	  function testProp(props) {
	  	var style = document.documentElement.style;

	  	for (var i = 0; i < props.length; i++) {
	  		if (props[i] in style) {
	  			return props[i];
	  		}
	  	}
	  	return false;
	  }

	  // @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
	  // Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
	  // and optionally scaled by `scale`. Does not have an effect if the
	  // browser doesn't support 3D CSS transforms.
	  function setTransform(el, offset, scale) {
	  	var pos = offset || new Point(0, 0);

	  	el.style[TRANSFORM] =
	  		(ie3d ?
	  			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
	  			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
	  		(scale ? ' scale(' + scale + ')' : '');
	  }

	  // @function setPosition(el: HTMLElement, position: Point)
	  // Sets the position of `el` to coordinates specified by `position`,
	  // using CSS translate or top/left positioning depending on the browser
	  // (used by Leaflet internally to position its layers).
	  function setPosition(el, point) {

	  	/*eslint-disable */
	  	el._leaflet_pos = point;
	  	/* eslint-enable */

	  	if (any3d) {
	  		setTransform(el, point);
	  	} else {
	  		el.style.left = point.x + 'px';
	  		el.style.top = point.y + 'px';
	  	}
	  }

	  // @function getPosition(el: HTMLElement): Point
	  // Returns the coordinates of an element previously positioned with setPosition.
	  function getPosition(el) {
	  	// this method is only used for elements previously positioned using setPosition,
	  	// so it's safe to cache the position for performance

	  	return el._leaflet_pos || new Point(0, 0);
	  }

	  // @function disableTextSelection()
	  // Prevents the user from generating `selectstart` DOM events, usually generated
	  // when the user drags the mouse through a page with text. Used internally
	  // by Leaflet to override the behaviour of any click-and-drag interaction on
	  // the map. Affects drag interactions on the whole document.

	  // @function enableTextSelection()
	  // Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
	  var disableTextSelection;
	  var enableTextSelection;
	  var _userSelect;
	  if ('onselectstart' in document) {
	  	disableTextSelection = function () {
	  		on(window, 'selectstart', preventDefault);
	  	};
	  	enableTextSelection = function () {
	  		off(window, 'selectstart', preventDefault);
	  	};
	  } else {
	  	var userSelectProperty = testProp(
	  		['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

	  	disableTextSelection = function () {
	  		if (userSelectProperty) {
	  			var style = document.documentElement.style;
	  			_userSelect = style[userSelectProperty];
	  			style[userSelectProperty] = 'none';
	  		}
	  	};
	  	enableTextSelection = function () {
	  		if (userSelectProperty) {
	  			document.documentElement.style[userSelectProperty] = _userSelect;
	  			_userSelect = undefined;
	  		}
	  	};
	  }

	  // @function disableImageDrag()
	  // As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
	  // for `dragstart` DOM events, usually generated when the user drags an image.
	  function disableImageDrag() {
	  	on(window, 'dragstart', preventDefault);
	  }

	  // @function enableImageDrag()
	  // Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
	  function enableImageDrag() {
	  	off(window, 'dragstart', preventDefault);
	  }

	  var _outlineElement, _outlineStyle;
	  // @function preventOutline(el: HTMLElement)
	  // Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
	  // of the element `el` invisible. Used internally by Leaflet to prevent
	  // focusable elements from displaying an outline when the user performs a
	  // drag interaction on them.
	  function preventOutline(element) {
	  	while (element.tabIndex === -1) {
	  		element = element.parentNode;
	  	}
	  	if (!element.style) { return; }
	  	restoreOutline();
	  	_outlineElement = element;
	  	_outlineStyle = element.style.outline;
	  	element.style.outline = 'none';
	  	on(window, 'keydown', restoreOutline);
	  }

	  // @function restoreOutline()
	  // Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
	  function restoreOutline() {
	  	if (!_outlineElement) { return; }
	  	_outlineElement.style.outline = _outlineStyle;
	  	_outlineElement = undefined;
	  	_outlineStyle = undefined;
	  	off(window, 'keydown', restoreOutline);
	  }

	  // @function getSizedParentNode(el: HTMLElement): HTMLElement
	  // Finds the closest parent node which size (width and height) is not null.
	  function getSizedParentNode(element) {
	  	do {
	  		element = element.parentNode;
	  	} while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
	  	return element;
	  }

	  // @function getScale(el: HTMLElement): Object
	  // Computes the CSS scale currently applied on the element.
	  // Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
	  // and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
	  function getScale(element) {
	  	var rect = element.getBoundingClientRect(); // Read-only in old browsers.

	  	return {
	  		x: rect.width / element.offsetWidth || 1,
	  		y: rect.height / element.offsetHeight || 1,
	  		boundingClientRect: rect
	  	};
	  }

	  var DomUtil = ({
	    TRANSFORM: TRANSFORM,
	    TRANSITION: TRANSITION,
	    TRANSITION_END: TRANSITION_END,
	    get: get,
	    getStyle: getStyle,
	    create: create$1,
	    remove: remove,
	    empty: empty,
	    toFront: toFront,
	    toBack: toBack,
	    hasClass: hasClass,
	    addClass: addClass,
	    removeClass: removeClass,
	    setClass: setClass,
	    getClass: getClass,
	    setOpacity: setOpacity,
	    testProp: testProp,
	    setTransform: setTransform,
	    setPosition: setPosition,
	    getPosition: getPosition,
	    disableTextSelection: disableTextSelection,
	    enableTextSelection: enableTextSelection,
	    disableImageDrag: disableImageDrag,
	    enableImageDrag: enableImageDrag,
	    preventOutline: preventOutline,
	    restoreOutline: restoreOutline,
	    getSizedParentNode: getSizedParentNode,
	    getScale: getScale
	  });

	  /*
	   * @namespace DomEvent
	   * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
	   */

	  // Inspired by John Resig, Dean Edwards and YUI addEvent implementations.

	  // @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
	  // Adds a listener function (`fn`) to a particular DOM event type of the
	  // element `el`. You can optionally specify the context of the listener
	  // (object the `this` keyword will point to). You can also pass several
	  // space-separated types (e.g. `'click dblclick'`).

	  // @alternative
	  // @function on(el: HTMLElement, eventMap: Object, context?: Object): this
	  // Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	  function on(obj, types, fn, context) {

	  	if (typeof types === 'object') {
	  		for (var type in types) {
	  			addOne(obj, type, types[type], fn);
	  		}
	  	} else {
	  		types = splitWords(types);

	  		for (var i = 0, len = types.length; i < len; i++) {
	  			addOne(obj, types[i], fn, context);
	  		}
	  	}

	  	return this;
	  }

	  var eventsKey = '_leaflet_events';

	  // @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
	  // Removes a previously added listener function.
	  // Note that if you passed a custom context to on, you must pass the same
	  // context to `off` in order to remove the listener.

	  // @alternative
	  // @function off(el: HTMLElement, eventMap: Object, context?: Object): this
	  // Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	  function off(obj, types, fn, context) {

	  	if (typeof types === 'object') {
	  		for (var type in types) {
	  			removeOne(obj, type, types[type], fn);
	  		}
	  	} else if (types) {
	  		types = splitWords(types);

	  		for (var i = 0, len = types.length; i < len; i++) {
	  			removeOne(obj, types[i], fn, context);
	  		}
	  	} else {
	  		for (var j in obj[eventsKey]) {
	  			removeOne(obj, j, obj[eventsKey][j]);
	  		}
	  		delete obj[eventsKey];
	  	}

	  	return this;
	  }

	  function browserFiresNativeDblClick() {
	  	// See https://github.com/w3c/pointerevents/issues/171
	  	if (pointer) {
	  		return !(edge || safari);
	  	}
	  }

	  var mouseSubst = {
	  	mouseenter: 'mouseover',
	  	mouseleave: 'mouseout',
	  	wheel: !('onwheel' in window) && 'mousewheel'
	  };

	  function addOne(obj, type, fn, context) {
	  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : '');

	  	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

	  	var handler = function (e) {
	  		return fn.call(context || obj, e || window.event);
	  	};

	  	var originalHandler = handler;

	  	if (pointer && type.indexOf('touch') === 0) {
	  		// Needs DomEvent.Pointer.js
	  		addPointerListener(obj, type, handler, id);

	  	} else if (touch && (type === 'dblclick') && !browserFiresNativeDblClick()) {
	  		addDoubleTapListener(obj, handler, id);

	  	} else if ('addEventListener' in obj) {

	  		if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' ||  type === 'mousewheel') {
	  			obj.addEventListener(mouseSubst[type] || type, handler, passiveEvents ? {passive: false} : false);

	  		} else if (type === 'mouseenter' || type === 'mouseleave') {
	  			handler = function (e) {
	  				e = e || window.event;
	  				if (isExternalTarget(obj, e)) {
	  					originalHandler(e);
	  				}
	  			};
	  			obj.addEventListener(mouseSubst[type], handler, false);

	  		} else {
	  			obj.addEventListener(type, originalHandler, false);
	  		}

	  	} else if ('attachEvent' in obj) {
	  		obj.attachEvent('on' + type, handler);
	  	}

	  	obj[eventsKey] = obj[eventsKey] || {};
	  	obj[eventsKey][id] = handler;
	  }

	  function removeOne(obj, type, fn, context) {

	  	var id = type + stamp(fn) + (context ? '_' + stamp(context) : ''),
	  	    handler = obj[eventsKey] && obj[eventsKey][id];

	  	if (!handler) { return this; }

	  	if (pointer && type.indexOf('touch') === 0) {
	  		removePointerListener(obj, type, id);

	  	} else if (touch && (type === 'dblclick') && !browserFiresNativeDblClick()) {
	  		removeDoubleTapListener(obj, id);

	  	} else if ('removeEventListener' in obj) {

	  		obj.removeEventListener(mouseSubst[type] || type, handler, false);

	  	} else if ('detachEvent' in obj) {
	  		obj.detachEvent('on' + type, handler);
	  	}

	  	obj[eventsKey][id] = null;
	  }

	  // @function stopPropagation(ev: DOMEvent): this
	  // Stop the given event from propagation to parent elements. Used inside the listener functions:
	  // ```js
	  // L.DomEvent.on(div, 'click', function (ev) {
	  // 	L.DomEvent.stopPropagation(ev);
	  // });
	  // ```
	  function stopPropagation(e) {

	  	if (e.stopPropagation) {
	  		e.stopPropagation();
	  	} else if (e.originalEvent) {  // In case of Leaflet event.
	  		e.originalEvent._stopped = true;
	  	} else {
	  		e.cancelBubble = true;
	  	}
	  	skipped(e);

	  	return this;
	  }

	  // @function disableScrollPropagation(el: HTMLElement): this
	  // Adds `stopPropagation` to the element's `'wheel'` events (plus browser variants).
	  function disableScrollPropagation(el) {
	  	addOne(el, 'wheel', stopPropagation);
	  	return this;
	  }

	  // @function disableClickPropagation(el: HTMLElement): this
	  // Adds `stopPropagation` to the element's `'click'`, `'doubleclick'`,
	  // `'mousedown'` and `'touchstart'` events (plus browser variants).
	  function disableClickPropagation(el) {
	  	on(el, 'mousedown touchstart dblclick', stopPropagation);
	  	addOne(el, 'click', fakeStop);
	  	return this;
	  }

	  // @function preventDefault(ev: DOMEvent): this
	  // Prevents the default action of the DOM Event `ev` from happening (such as
	  // following a link in the href of the a element, or doing a POST request
	  // with page reload when a `<form>` is submitted).
	  // Use it inside listener functions.
	  function preventDefault(e) {
	  	if (e.preventDefault) {
	  		e.preventDefault();
	  	} else {
	  		e.returnValue = false;
	  	}
	  	return this;
	  }

	  // @function stop(ev: DOMEvent): this
	  // Does `stopPropagation` and `preventDefault` at the same time.
	  function stop(e) {
	  	preventDefault(e);
	  	stopPropagation(e);
	  	return this;
	  }

	  // @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
	  // Gets normalized mouse position from a DOM event relative to the
	  // `container` (border excluded) or to the whole page if not specified.
	  function getMousePosition(e, container) {
	  	if (!container) {
	  		return new Point(e.clientX, e.clientY);
	  	}

	  	var scale = getScale(container),
	  	    offset = scale.boundingClientRect; // left and top  values are in page scale (like the event clientX/Y)

	  	return new Point(
	  		// offset.left/top values are in page scale (like clientX/Y),
	  		// whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
	  		(e.clientX - offset.left) / scale.x - container.clientLeft,
	  		(e.clientY - offset.top) / scale.y - container.clientTop
	  	);
	  }

	  // Chrome on Win scrolls double the pixels as in other platforms (see #4538),
	  // and Firefox scrolls device pixels, not CSS pixels
	  var wheelPxFactor =
	  	(win && chrome) ? 2 * window.devicePixelRatio :
	  	gecko ? window.devicePixelRatio : 1;

	  // @function getWheelDelta(ev: DOMEvent): Number
	  // Gets normalized wheel delta from a wheel DOM event, in vertical
	  // pixels scrolled (negative if scrolling down).
	  // Events from pointing devices without precise scrolling are mapped to
	  // a best guess of 60 pixels.
	  function getWheelDelta(e) {
	  	return (edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
	  	       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
	  	       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
	  	       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
	  	       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
	  	       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
	  	       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
	  	       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
	  	       0;
	  }

	  var skipEvents = {};

	  function fakeStop(e) {
	  	// fakes stopPropagation by setting a special event flag, checked/reset with skipped(e)
	  	skipEvents[e.type] = true;
	  }

	  function skipped(e) {
	  	var events = skipEvents[e.type];
	  	// reset when checking, as it's only used in map container and propagates outside of the map
	  	skipEvents[e.type] = false;
	  	return events;
	  }

	  // check if element really left/entered the event target (for mouseenter/mouseleave)
	  function isExternalTarget(el, e) {

	  	var related = e.relatedTarget;

	  	if (!related) { return true; }

	  	try {
	  		while (related && (related !== el)) {
	  			related = related.parentNode;
	  		}
	  	} catch (err) {
	  		return false;
	  	}
	  	return (related !== el);
	  }

	  var DomEvent = ({
	    on: on,
	    off: off,
	    stopPropagation: stopPropagation,
	    disableScrollPropagation: disableScrollPropagation,
	    disableClickPropagation: disableClickPropagation,
	    preventDefault: preventDefault,
	    stop: stop,
	    getMousePosition: getMousePosition,
	    getWheelDelta: getWheelDelta,
	    fakeStop: fakeStop,
	    skipped: skipped,
	    isExternalTarget: isExternalTarget,
	    addListener: on,
	    removeListener: off
	  });

	  /*
	   * @class PosAnimation
	   * @aka L.PosAnimation
	   * @inherits Evented
	   * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
	   *
	   * @example
	   * ```js
	   * var fx = new L.PosAnimation();
	   * fx.run(el, [300, 500], 0.5);
	   * ```
	   *
	   * @constructor L.PosAnimation()
	   * Creates a `PosAnimation` object.
	   *
	   */

	  var PosAnimation = Evented.extend({

	  	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
	  	// Run an animation of a given element to a new position, optionally setting
	  	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
	  	// argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
	  	// `0.5` by default).
	  	run: function (el, newPos, duration, easeLinearity) {
	  		this.stop();

	  		this._el = el;
	  		this._inProgress = true;
	  		this._duration = duration || 0.25;
	  		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

	  		this._startPos = getPosition(el);
	  		this._offset = newPos.subtract(this._startPos);
	  		this._startTime = +new Date();

	  		// @event start: Event
	  		// Fired when the animation starts
	  		this.fire('start');

	  		this._animate();
	  	},

	  	// @method stop()
	  	// Stops the animation (if currently running).
	  	stop: function () {
	  		if (!this._inProgress) { return; }

	  		this._step(true);
	  		this._complete();
	  	},

	  	_animate: function () {
	  		// animation loop
	  		this._animId = requestAnimFrame(this._animate, this);
	  		this._step();
	  	},

	  	_step: function (round) {
	  		var elapsed = (+new Date()) - this._startTime,
	  		    duration = this._duration * 1000;

	  		if (elapsed < duration) {
	  			this._runFrame(this._easeOut(elapsed / duration), round);
	  		} else {
	  			this._runFrame(1);
	  			this._complete();
	  		}
	  	},

	  	_runFrame: function (progress, round) {
	  		var pos = this._startPos.add(this._offset.multiplyBy(progress));
	  		if (round) {
	  			pos._round();
	  		}
	  		setPosition(this._el, pos);

	  		// @event step: Event
	  		// Fired continuously during the animation.
	  		this.fire('step');
	  	},

	  	_complete: function () {
	  		cancelAnimFrame(this._animId);

	  		this._inProgress = false;
	  		// @event end: Event
	  		// Fired when the animation ends.
	  		this.fire('end');
	  	},

	  	_easeOut: function (t) {
	  		return 1 - Math.pow(1 - t, this._easeOutPower);
	  	}
	  });

	  /*
	   * @class Map
	   * @aka L.Map
	   * @inherits Evented
	   *
	   * The central class of the API — it is used to create a map on a page and manipulate it.
	   *
	   * @example
	   *
	   * ```js
	   * // initialize the map on the "map" div with a given center and zoom
	   * var map = L.map('map', {
	   * 	center: [51.505, -0.09],
	   * 	zoom: 13
	   * });
	   * ```
	   *
	   */

	  var Map = Evented.extend({

	  	options: {
	  		// @section Map State Options
	  		// @option crs: CRS = L.CRS.EPSG3857
	  		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
	  		// sure what it means.
	  		crs: EPSG3857,

	  		// @option center: LatLng = undefined
	  		// Initial geographic center of the map
	  		center: undefined,

	  		// @option zoom: Number = undefined
	  		// Initial map zoom level
	  		zoom: undefined,

	  		// @option minZoom: Number = *
	  		// Minimum zoom level of the map.
	  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
	  		// the lowest of their `minZoom` options will be used instead.
	  		minZoom: undefined,

	  		// @option maxZoom: Number = *
	  		// Maximum zoom level of the map.
	  		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
	  		// the highest of their `maxZoom` options will be used instead.
	  		maxZoom: undefined,

	  		// @option layers: Layer[] = []
	  		// Array of layers that will be added to the map initially
	  		layers: [],

	  		// @option maxBounds: LatLngBounds = null
	  		// When this option is set, the map restricts the view to the given
	  		// geographical bounds, bouncing the user back if the user tries to pan
	  		// outside the view. To set the restriction dynamically, use
	  		// [`setMaxBounds`](#map-setmaxbounds) method.
	  		maxBounds: undefined,

	  		// @option renderer: Renderer = *
	  		// The default method for drawing vector layers on the map. `L.SVG`
	  		// or `L.Canvas` by default depending on browser support.
	  		renderer: undefined,


	  		// @section Animation Options
	  		// @option zoomAnimation: Boolean = true
	  		// Whether the map zoom animation is enabled. By default it's enabled
	  		// in all browsers that support CSS3 Transitions except Android.
	  		zoomAnimation: true,

	  		// @option zoomAnimationThreshold: Number = 4
	  		// Won't animate zoom if the zoom difference exceeds this value.
	  		zoomAnimationThreshold: 4,

	  		// @option fadeAnimation: Boolean = true
	  		// Whether the tile fade animation is enabled. By default it's enabled
	  		// in all browsers that support CSS3 Transitions except Android.
	  		fadeAnimation: true,

	  		// @option markerZoomAnimation: Boolean = true
	  		// Whether markers animate their zoom with the zoom animation, if disabled
	  		// they will disappear for the length of the animation. By default it's
	  		// enabled in all browsers that support CSS3 Transitions except Android.
	  		markerZoomAnimation: true,

	  		// @option transform3DLimit: Number = 2^23
	  		// Defines the maximum size of a CSS translation transform. The default
	  		// value should not be changed unless a web browser positions layers in
	  		// the wrong place after doing a large `panBy`.
	  		transform3DLimit: 8388608, // Precision limit of a 32-bit float

	  		// @section Interaction Options
	  		// @option zoomSnap: Number = 1
	  		// Forces the map's zoom level to always be a multiple of this, particularly
	  		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
	  		// By default, the zoom level snaps to the nearest integer; lower values
	  		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
	  		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
	  		zoomSnap: 1,

	  		// @option zoomDelta: Number = 1
	  		// Controls how much the map's zoom level will change after a
	  		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
	  		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
	  		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
	  		zoomDelta: 1,

	  		// @option trackResize: Boolean = true
	  		// Whether the map automatically handles browser window resize to update itself.
	  		trackResize: true
	  	},

	  	initialize: function (id, options) { // (HTMLElement or String, Object)
	  		options = setOptions(this, options);

	  		// Make sure to assign internal flags at the beginning,
	  		// to avoid inconsistent state in some edge cases.
	  		this._handlers = [];
	  		this._layers = {};
	  		this._zoomBoundLayers = {};
	  		this._sizeChanged = true;

	  		this._initContainer(id);
	  		this._initLayout();

	  		// hack for https://github.com/Leaflet/Leaflet/issues/1980
	  		this._onResize = bind(this._onResize, this);

	  		this._initEvents();

	  		if (options.maxBounds) {
	  			this.setMaxBounds(options.maxBounds);
	  		}

	  		if (options.zoom !== undefined) {
	  			this._zoom = this._limitZoom(options.zoom);
	  		}

	  		if (options.center && options.zoom !== undefined) {
	  			this.setView(toLatLng(options.center), options.zoom, {reset: true});
	  		}

	  		this.callInitHooks();

	  		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
	  		this._zoomAnimated = TRANSITION && any3d && !mobileOpera &&
	  				this.options.zoomAnimation;

	  		// zoom transitions run with the same duration for all layers, so if one of transitionend events
	  		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
	  		if (this._zoomAnimated) {
	  			this._createAnimProxy();
	  			on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
	  		}

	  		this._addLayers(this.options.layers);
	  	},


	  	// @section Methods for modifying map state

	  	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
	  	// Sets the view of the map (geographical center and zoom) with the given
	  	// animation options.
	  	setView: function (center, zoom, options) {

	  		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
	  		center = this._limitCenter(toLatLng(center), zoom, this.options.maxBounds);
	  		options = options || {};

	  		this._stop();

	  		if (this._loaded && !options.reset && options !== true) {

	  			if (options.animate !== undefined) {
	  				options.zoom = extend({animate: options.animate}, options.zoom);
	  				options.pan = extend({animate: options.animate, duration: options.duration}, options.pan);
	  			}

	  			// try animating pan or zoom
	  			var moved = (this._zoom !== zoom) ?
	  				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
	  				this._tryAnimatedPan(center, options.pan);

	  			if (moved) {
	  				// prevent resize handler call, the view will refresh after animation anyway
	  				clearTimeout(this._sizeTimer);
	  				return this;
	  			}
	  		}

	  		// animation didn't start, just reset the map view
	  		this._resetView(center, zoom);

	  		return this;
	  	},

	  	// @method setZoom(zoom: Number, options?: Zoom/pan options): this
	  	// Sets the zoom of the map.
	  	setZoom: function (zoom, options) {
	  		if (!this._loaded) {
	  			this._zoom = zoom;
	  			return this;
	  		}
	  		return this.setView(this.getCenter(), zoom, {zoom: options});
	  	},

	  	// @method zoomIn(delta?: Number, options?: Zoom options): this
	  	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	  	zoomIn: function (delta, options) {
	  		delta = delta || (any3d ? this.options.zoomDelta : 1);
	  		return this.setZoom(this._zoom + delta, options);
	  	},

	  	// @method zoomOut(delta?: Number, options?: Zoom options): this
	  	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	  	zoomOut: function (delta, options) {
	  		delta = delta || (any3d ? this.options.zoomDelta : 1);
	  		return this.setZoom(this._zoom - delta, options);
	  	},

	  	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
	  	// Zooms the map while keeping a specified geographical point on the map
	  	// stationary (e.g. used internally for scroll zoom and double-click zoom).
	  	// @alternative
	  	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
	  	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
	  	setZoomAround: function (latlng, zoom, options) {
	  		var scale = this.getZoomScale(zoom),
	  		    viewHalf = this.getSize().divideBy(2),
	  		    containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng),

	  		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
	  		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

	  		return this.setView(newCenter, zoom, {zoom: options});
	  	},

	  	_getBoundsCenterZoom: function (bounds, options) {

	  		options = options || {};
	  		bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);

	  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
	  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),

	  		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

	  		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

	  		if (zoom === Infinity) {
	  			return {
	  				center: bounds.getCenter(),
	  				zoom: zoom
	  			};
	  		}

	  		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

	  		    swPoint = this.project(bounds.getSouthWest(), zoom),
	  		    nePoint = this.project(bounds.getNorthEast(), zoom),
	  		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

	  		return {
	  			center: center,
	  			zoom: zoom
	  		};
	  	},

	  	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
	  	// Sets a map view that contains the given geographical bounds with the
	  	// maximum zoom level possible.
	  	fitBounds: function (bounds, options) {

	  		bounds = toLatLngBounds(bounds);

	  		if (!bounds.isValid()) {
	  			throw new Error('Bounds are not valid.');
	  		}

	  		var target = this._getBoundsCenterZoom(bounds, options);
	  		return this.setView(target.center, target.zoom, options);
	  	},

	  	// @method fitWorld(options?: fitBounds options): this
	  	// Sets a map view that mostly contains the whole world with the maximum
	  	// zoom level possible.
	  	fitWorld: function (options) {
	  		return this.fitBounds([[-90, -180], [90, 180]], options);
	  	},

	  	// @method panTo(latlng: LatLng, options?: Pan options): this
	  	// Pans the map to a given center.
	  	panTo: function (center, options) { // (LatLng)
	  		return this.setView(center, this._zoom, {pan: options});
	  	},

	  	// @method panBy(offset: Point, options?: Pan options): this
	  	// Pans the map by a given number of pixels (animated).
	  	panBy: function (offset, options) {
	  		offset = toPoint(offset).round();
	  		options = options || {};

	  		if (!offset.x && !offset.y) {
	  			return this.fire('moveend');
	  		}
	  		// If we pan too far, Chrome gets issues with tiles
	  		// and makes them disappear or appear in the wrong place (slightly offset) #2602
	  		if (options.animate !== true && !this.getSize().contains(offset)) {
	  			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
	  			return this;
	  		}

	  		if (!this._panAnim) {
	  			this._panAnim = new PosAnimation();

	  			this._panAnim.on({
	  				'step': this._onPanTransitionStep,
	  				'end': this._onPanTransitionEnd
	  			}, this);
	  		}

	  		// don't fire movestart if animating inertia
	  		if (!options.noMoveStart) {
	  			this.fire('movestart');
	  		}

	  		// animate pan unless animate: false specified
	  		if (options.animate !== false) {
	  			addClass(this._mapPane, 'leaflet-pan-anim');

	  			var newPos = this._getMapPanePos().subtract(offset).round();
	  			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
	  		} else {
	  			this._rawPanBy(offset);
	  			this.fire('move').fire('moveend');
	  		}

	  		return this;
	  	},

	  	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
	  	// Sets the view of the map (geographical center and zoom) performing a smooth
	  	// pan-zoom animation.
	  	flyTo: function (targetCenter, targetZoom, options) {

	  		options = options || {};
	  		if (options.animate === false || !any3d) {
	  			return this.setView(targetCenter, targetZoom, options);
	  		}

	  		this._stop();

	  		var from = this.project(this.getCenter()),
	  		    to = this.project(targetCenter),
	  		    size = this.getSize(),
	  		    startZoom = this._zoom;

	  		targetCenter = toLatLng(targetCenter);
	  		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

	  		var w0 = Math.max(size.x, size.y),
	  		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
	  		    u1 = (to.distanceTo(from)) || 1,
	  		    rho = 1.42,
	  		    rho2 = rho * rho;

	  		function r(i) {
	  			var s1 = i ? -1 : 1,
	  			    s2 = i ? w1 : w0,
	  			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
	  			    b1 = 2 * s2 * rho2 * u1,
	  			    b = t1 / b1,
	  			    sq = Math.sqrt(b * b + 1) - b;

	  			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
	  			    // thus triggering an infinite loop in flyTo
	  			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

	  			return log;
	  		}

	  		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
	  		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
	  		function tanh(n) { return sinh(n) / cosh(n); }

	  		var r0 = r(0);

	  		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
	  		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

	  		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

	  		var start = Date.now(),
	  		    S = (r(1) - r0) / rho,
	  		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

	  		function frame() {
	  			var t = (Date.now() - start) / duration,
	  			    s = easeOut(t) * S;

	  			if (t <= 1) {
	  				this._flyToFrame = requestAnimFrame(frame, this);

	  				this._move(
	  					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
	  					this.getScaleZoom(w0 / w(s), startZoom),
	  					{flyTo: true});

	  			} else {
	  				this
	  					._move(targetCenter, targetZoom)
	  					._moveEnd(true);
	  			}
	  		}

	  		this._moveStart(true, options.noMoveStart);

	  		frame.call(this);
	  		return this;
	  	},

	  	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
	  	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
	  	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
	  	flyToBounds: function (bounds, options) {
	  		var target = this._getBoundsCenterZoom(bounds, options);
	  		return this.flyTo(target.center, target.zoom, options);
	  	},

	  	// @method setMaxBounds(bounds: LatLngBounds): this
	  	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
	  	setMaxBounds: function (bounds) {
	  		bounds = toLatLngBounds(bounds);

	  		if (!bounds.isValid()) {
	  			this.options.maxBounds = null;
	  			return this.off('moveend', this._panInsideMaxBounds);
	  		} else if (this.options.maxBounds) {
	  			this.off('moveend', this._panInsideMaxBounds);
	  		}

	  		this.options.maxBounds = bounds;

	  		if (this._loaded) {
	  			this._panInsideMaxBounds();
	  		}

	  		return this.on('moveend', this._panInsideMaxBounds);
	  	},

	  	// @method setMinZoom(zoom: Number): this
	  	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
	  	setMinZoom: function (zoom) {
	  		var oldZoom = this.options.minZoom;
	  		this.options.minZoom = zoom;

	  		if (this._loaded && oldZoom !== zoom) {
	  			this.fire('zoomlevelschange');

	  			if (this.getZoom() < this.options.minZoom) {
	  				return this.setZoom(zoom);
	  			}
	  		}

	  		return this;
	  	},

	  	// @method setMaxZoom(zoom: Number): this
	  	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
	  	setMaxZoom: function (zoom) {
	  		var oldZoom = this.options.maxZoom;
	  		this.options.maxZoom = zoom;

	  		if (this._loaded && oldZoom !== zoom) {
	  			this.fire('zoomlevelschange');

	  			if (this.getZoom() > this.options.maxZoom) {
	  				return this.setZoom(zoom);
	  			}
	  		}

	  		return this;
	  	},

	  	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
	  	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
	  	panInsideBounds: function (bounds, options) {
	  		this._enforcingBounds = true;
	  		var center = this.getCenter(),
	  		    newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));

	  		if (!center.equals(newCenter)) {
	  			this.panTo(newCenter, options);
	  		}

	  		this._enforcingBounds = false;
	  		return this;
	  	},

	  	// @method panInside(latlng: LatLng, options?: options): this
	  	// Pans the map the minimum amount to make the `latlng` visible. Use
	  	// `padding`, `paddingTopLeft` and `paddingTopRight` options to fit
	  	// the display to more restricted bounds, like [`fitBounds`](#map-fitbounds).
	  	// If `latlng` is already within the (optionally padded) display bounds,
	  	// the map will not be panned.
	  	panInside: function (latlng, options) {
	  		options = options || {};

	  		var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]),
	  		    paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]),
	  		    center = this.getCenter(),
	  		    pixelCenter = this.project(center),
	  		    pixelPoint = this.project(latlng),
	  		    pixelBounds = this.getPixelBounds(),
	  		    halfPixelBounds = pixelBounds.getSize().divideBy(2),
	  		    paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]);

	  		if (!paddedBounds.contains(pixelPoint)) {
	  			this._enforcingBounds = true;
	  			var diff = pixelCenter.subtract(pixelPoint),
	  			    newCenter = toPoint(pixelPoint.x + diff.x, pixelPoint.y + diff.y);

	  			if (pixelPoint.x < paddedBounds.min.x || pixelPoint.x > paddedBounds.max.x) {
	  				newCenter.x = pixelCenter.x - diff.x;
	  				if (diff.x > 0) {
	  					newCenter.x += halfPixelBounds.x - paddingTL.x;
	  				} else {
	  					newCenter.x -= halfPixelBounds.x - paddingBR.x;
	  				}
	  			}
	  			if (pixelPoint.y < paddedBounds.min.y || pixelPoint.y > paddedBounds.max.y) {
	  				newCenter.y = pixelCenter.y - diff.y;
	  				if (diff.y > 0) {
	  					newCenter.y += halfPixelBounds.y - paddingTL.y;
	  				} else {
	  					newCenter.y -= halfPixelBounds.y - paddingBR.y;
	  				}
	  			}
	  			this.panTo(this.unproject(newCenter), options);
	  			this._enforcingBounds = false;
	  		}
	  		return this;
	  	},

	  	// @method invalidateSize(options: Zoom/pan options): this
	  	// Checks if the map container size changed and updates the map if so —
	  	// call it after you've changed the map size dynamically, also animating
	  	// pan by default. If `options.pan` is `false`, panning will not occur.
	  	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
	  	// that it doesn't happen often even if the method is called many
	  	// times in a row.

	  	// @alternative
	  	// @method invalidateSize(animate: Boolean): this
	  	// Checks if the map container size changed and updates the map if so —
	  	// call it after you've changed the map size dynamically, also animating
	  	// pan by default.
	  	invalidateSize: function (options) {
	  		if (!this._loaded) { return this; }

	  		options = extend({
	  			animate: false,
	  			pan: true
	  		}, options === true ? {animate: true} : options);

	  		var oldSize = this.getSize();
	  		this._sizeChanged = true;
	  		this._lastCenter = null;

	  		var newSize = this.getSize(),
	  		    oldCenter = oldSize.divideBy(2).round(),
	  		    newCenter = newSize.divideBy(2).round(),
	  		    offset = oldCenter.subtract(newCenter);

	  		if (!offset.x && !offset.y) { return this; }

	  		if (options.animate && options.pan) {
	  			this.panBy(offset);

	  		} else {
	  			if (options.pan) {
	  				this._rawPanBy(offset);
	  			}

	  			this.fire('move');

	  			if (options.debounceMoveend) {
	  				clearTimeout(this._sizeTimer);
	  				this._sizeTimer = setTimeout(bind(this.fire, this, 'moveend'), 200);
	  			} else {
	  				this.fire('moveend');
	  			}
	  		}

	  		// @section Map state change events
	  		// @event resize: ResizeEvent
	  		// Fired when the map is resized.
	  		return this.fire('resize', {
	  			oldSize: oldSize,
	  			newSize: newSize
	  		});
	  	},

	  	// @section Methods for modifying map state
	  	// @method stop(): this
	  	// Stops the currently running `panTo` or `flyTo` animation, if any.
	  	stop: function () {
	  		this.setZoom(this._limitZoom(this._zoom));
	  		if (!this.options.zoomSnap) {
	  			this.fire('viewreset');
	  		}
	  		return this._stop();
	  	},

	  	// @section Geolocation methods
	  	// @method locate(options?: Locate options): this
	  	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
	  	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
	  	// and optionally sets the map view to the user's location with respect to
	  	// detection accuracy (or to the world view if geolocation failed).
	  	// Note that, if your page doesn't use HTTPS, this method will fail in
	  	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
	  	// See `Locate options` for more details.
	  	locate: function (options) {

	  		options = this._locateOptions = extend({
	  			timeout: 10000,
	  			watch: false
	  			// setView: false
	  			// maxZoom: <Number>
	  			// maximumAge: 0
	  			// enableHighAccuracy: false
	  		}, options);

	  		if (!('geolocation' in navigator)) {
	  			this._handleGeolocationError({
	  				code: 0,
	  				message: 'Geolocation not supported.'
	  			});
	  			return this;
	  		}

	  		var onResponse = bind(this._handleGeolocationResponse, this),
	  		    onError = bind(this._handleGeolocationError, this);

	  		if (options.watch) {
	  			this._locationWatchId =
	  			        navigator.geolocation.watchPosition(onResponse, onError, options);
	  		} else {
	  			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
	  		}
	  		return this;
	  	},

	  	// @method stopLocate(): this
	  	// Stops watching location previously initiated by `map.locate({watch: true})`
	  	// and aborts resetting the map view if map.locate was called with
	  	// `{setView: true}`.
	  	stopLocate: function () {
	  		if (navigator.geolocation && navigator.geolocation.clearWatch) {
	  			navigator.geolocation.clearWatch(this._locationWatchId);
	  		}
	  		if (this._locateOptions) {
	  			this._locateOptions.setView = false;
	  		}
	  		return this;
	  	},

	  	_handleGeolocationError: function (error) {
	  		var c = error.code,
	  		    message = error.message ||
	  		            (c === 1 ? 'permission denied' :
	  		            (c === 2 ? 'position unavailable' : 'timeout'));

	  		if (this._locateOptions.setView && !this._loaded) {
	  			this.fitWorld();
	  		}

	  		// @section Location events
	  		// @event locationerror: ErrorEvent
	  		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
	  		this.fire('locationerror', {
	  			code: c,
	  			message: 'Geolocation error: ' + message + '.'
	  		});
	  	},

	  	_handleGeolocationResponse: function (pos) {
	  		var lat = pos.coords.latitude,
	  		    lng = pos.coords.longitude,
	  		    latlng = new LatLng(lat, lng),
	  		    bounds = latlng.toBounds(pos.coords.accuracy * 2),
	  		    options = this._locateOptions;

	  		if (options.setView) {
	  			var zoom = this.getBoundsZoom(bounds);
	  			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
	  		}

	  		var data = {
	  			latlng: latlng,
	  			bounds: bounds,
	  			timestamp: pos.timestamp
	  		};

	  		for (var i in pos.coords) {
	  			if (typeof pos.coords[i] === 'number') {
	  				data[i] = pos.coords[i];
	  			}
	  		}

	  		// @event locationfound: LocationEvent
	  		// Fired when geolocation (using the [`locate`](#map-locate) method)
	  		// went successfully.
	  		this.fire('locationfound', data);
	  	},

	  	// TODO Appropriate docs section?
	  	// @section Other Methods
	  	// @method addHandler(name: String, HandlerClass: Function): this
	  	// Adds a new `Handler` to the map, given its name and constructor function.
	  	addHandler: function (name, HandlerClass) {
	  		if (!HandlerClass) { return this; }

	  		var handler = this[name] = new HandlerClass(this);

	  		this._handlers.push(handler);

	  		if (this.options[name]) {
	  			handler.enable();
	  		}

	  		return this;
	  	},

	  	// @method remove(): this
	  	// Destroys the map and clears all related event listeners.
	  	remove: function () {

	  		this._initEvents(true);
	  		this.off('moveend', this._panInsideMaxBounds);

	  		if (this._containerId !== this._container._leaflet_id) {
	  			throw new Error('Map container is being reused by another instance');
	  		}

	  		try {
	  			// throws error in IE6-8
	  			delete this._container._leaflet_id;
	  			delete this._containerId;
	  		} catch (e) {
	  			/*eslint-disable */
	  			this._container._leaflet_id = undefined;
	  			/* eslint-enable */
	  			this._containerId = undefined;
	  		}

	  		if (this._locationWatchId !== undefined) {
	  			this.stopLocate();
	  		}

	  		this._stop();

	  		remove(this._mapPane);

	  		if (this._clearControlPos) {
	  			this._clearControlPos();
	  		}
	  		if (this._resizeRequest) {
	  			cancelAnimFrame(this._resizeRequest);
	  			this._resizeRequest = null;
	  		}

	  		this._clearHandlers();

	  		if (this._loaded) {
	  			// @section Map state change events
	  			// @event unload: Event
	  			// Fired when the map is destroyed with [remove](#map-remove) method.
	  			this.fire('unload');
	  		}

	  		var i;
	  		for (i in this._layers) {
	  			this._layers[i].remove();
	  		}
	  		for (i in this._panes) {
	  			remove(this._panes[i]);
	  		}

	  		this._layers = [];
	  		this._panes = [];
	  		delete this._mapPane;
	  		delete this._renderer;

	  		return this;
	  	},

	  	// @section Other Methods
	  	// @method createPane(name: String, container?: HTMLElement): HTMLElement
	  	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
	  	// then returns it. The pane is created as a child of `container`, or
	  	// as a child of the main map pane if not set.
	  	createPane: function (name, container) {
	  		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
	  		    pane = create$1('div', className, container || this._mapPane);

	  		if (name) {
	  			this._panes[name] = pane;
	  		}
	  		return pane;
	  	},

	  	// @section Methods for Getting Map State

	  	// @method getCenter(): LatLng
	  	// Returns the geographical center of the map view
	  	getCenter: function () {
	  		this._checkIfLoaded();

	  		if (this._lastCenter && !this._moved()) {
	  			return this._lastCenter;
	  		}
	  		return this.layerPointToLatLng(this._getCenterLayerPoint());
	  	},

	  	// @method getZoom(): Number
	  	// Returns the current zoom level of the map view
	  	getZoom: function () {
	  		return this._zoom;
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the geographical bounds visible in the current map view
	  	getBounds: function () {
	  		var bounds = this.getPixelBounds(),
	  		    sw = this.unproject(bounds.getBottomLeft()),
	  		    ne = this.unproject(bounds.getTopRight());

	  		return new LatLngBounds(sw, ne);
	  	},

	  	// @method getMinZoom(): Number
	  	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
	  	getMinZoom: function () {
	  		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
	  	},

	  	// @method getMaxZoom(): Number
	  	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
	  	getMaxZoom: function () {
	  		return this.options.maxZoom === undefined ?
	  			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
	  			this.options.maxZoom;
	  	},

	  	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
	  	// Returns the maximum zoom level on which the given bounds fit to the map
	  	// view in its entirety. If `inside` (optional) is set to `true`, the method
	  	// instead returns the minimum zoom level on which the map view fits into
	  	// the given bounds in its entirety.
	  	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
	  		bounds = toLatLngBounds(bounds);
	  		padding = toPoint(padding || [0, 0]);

	  		var zoom = this.getZoom() || 0,
	  		    min = this.getMinZoom(),
	  		    max = this.getMaxZoom(),
	  		    nw = bounds.getNorthWest(),
	  		    se = bounds.getSouthEast(),
	  		    size = this.getSize().subtract(padding),
	  		    boundsSize = toBounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
	  		    snap = any3d ? this.options.zoomSnap : 1,
	  		    scalex = size.x / boundsSize.x,
	  		    scaley = size.y / boundsSize.y,
	  		    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

	  		zoom = this.getScaleZoom(scale, zoom);

	  		if (snap) {
	  			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
	  			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
	  		}

	  		return Math.max(min, Math.min(max, zoom));
	  	},

	  	// @method getSize(): Point
	  	// Returns the current size of the map container (in pixels).
	  	getSize: function () {
	  		if (!this._size || this._sizeChanged) {
	  			this._size = new Point(
	  				this._container.clientWidth || 0,
	  				this._container.clientHeight || 0);

	  			this._sizeChanged = false;
	  		}
	  		return this._size.clone();
	  	},

	  	// @method getPixelBounds(): Bounds
	  	// Returns the bounds of the current map view in projected pixel
	  	// coordinates (sometimes useful in layer and overlay implementations).
	  	getPixelBounds: function (center, zoom) {
	  		var topLeftPoint = this._getTopLeftPoint(center, zoom);
	  		return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	  	},

	  	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
	  	// the map pane? "left point of the map layer" can be confusing, specially
	  	// since there can be negative offsets.
	  	// @method getPixelOrigin(): Point
	  	// Returns the projected pixel coordinates of the top left point of
	  	// the map layer (useful in custom layer and overlay implementations).
	  	getPixelOrigin: function () {
	  		this._checkIfLoaded();
	  		return this._pixelOrigin;
	  	},

	  	// @method getPixelWorldBounds(zoom?: Number): Bounds
	  	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
	  	// If `zoom` is omitted, the map's current zoom level is used.
	  	getPixelWorldBounds: function (zoom) {
	  		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
	  	},

	  	// @section Other Methods

	  	// @method getPane(pane: String|HTMLElement): HTMLElement
	  	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
	  	getPane: function (pane) {
	  		return typeof pane === 'string' ? this._panes[pane] : pane;
	  	},

	  	// @method getPanes(): Object
	  	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
	  	// the panes as values.
	  	getPanes: function () {
	  		return this._panes;
	  	},

	  	// @method getContainer: HTMLElement
	  	// Returns the HTML element that contains the map.
	  	getContainer: function () {
	  		return this._container;
	  	},


	  	// @section Conversion Methods

	  	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
	  	// Returns the scale factor to be applied to a map transition from zoom level
	  	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
	  	getZoomScale: function (toZoom, fromZoom) {
	  		// TODO replace with universal implementation after refactoring projections
	  		var crs = this.options.crs;
	  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
	  		return crs.scale(toZoom) / crs.scale(fromZoom);
	  	},

	  	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
	  	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
	  	// level and everything is scaled by a factor of `scale`. Inverse of
	  	// [`getZoomScale`](#map-getZoomScale).
	  	getScaleZoom: function (scale, fromZoom) {
	  		var crs = this.options.crs;
	  		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
	  		var zoom = crs.zoom(scale * crs.scale(fromZoom));
	  		return isNaN(zoom) ? Infinity : zoom;
	  	},

	  	// @method project(latlng: LatLng, zoom: Number): Point
	  	// Projects a geographical coordinate `LatLng` according to the projection
	  	// of the map's CRS, then scales it according to `zoom` and the CRS's
	  	// `Transformation`. The result is pixel coordinate relative to
	  	// the CRS origin.
	  	project: function (latlng, zoom) {
	  		zoom = zoom === undefined ? this._zoom : zoom;
	  		return this.options.crs.latLngToPoint(toLatLng(latlng), zoom);
	  	},

	  	// @method unproject(point: Point, zoom: Number): LatLng
	  	// Inverse of [`project`](#map-project).
	  	unproject: function (point, zoom) {
	  		zoom = zoom === undefined ? this._zoom : zoom;
	  		return this.options.crs.pointToLatLng(toPoint(point), zoom);
	  	},

	  	// @method layerPointToLatLng(point: Point): LatLng
	  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	  	// returns the corresponding geographical coordinate (for the current zoom level).
	  	layerPointToLatLng: function (point) {
	  		var projectedPoint = toPoint(point).add(this.getPixelOrigin());
	  		return this.unproject(projectedPoint);
	  	},

	  	// @method latLngToLayerPoint(latlng: LatLng): Point
	  	// Given a geographical coordinate, returns the corresponding pixel coordinate
	  	// relative to the [origin pixel](#map-getpixelorigin).
	  	latLngToLayerPoint: function (latlng) {
	  		var projectedPoint = this.project(toLatLng(latlng))._round();
	  		return projectedPoint._subtract(this.getPixelOrigin());
	  	},

	  	// @method wrapLatLng(latlng: LatLng): LatLng
	  	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
	  	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
	  	// CRS's bounds.
	  	// By default this means longitude is wrapped around the dateline so its
	  	// value is between -180 and +180 degrees.
	  	wrapLatLng: function (latlng) {
	  		return this.options.crs.wrapLatLng(toLatLng(latlng));
	  	},

	  	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	  	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
	  	// its center is within the CRS's bounds.
	  	// By default this means the center longitude is wrapped around the dateline so its
	  	// value is between -180 and +180 degrees, and the majority of the bounds
	  	// overlaps the CRS's bounds.
	  	wrapLatLngBounds: function (latlng) {
	  		return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
	  	},

	  	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	  	// Returns the distance between two geographical coordinates according to
	  	// the map's CRS. By default this measures distance in meters.
	  	distance: function (latlng1, latlng2) {
	  		return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
	  	},

	  	// @method containerPointToLayerPoint(point: Point): Point
	  	// Given a pixel coordinate relative to the map container, returns the corresponding
	  	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
	  	containerPointToLayerPoint: function (point) { // (Point)
	  		return toPoint(point).subtract(this._getMapPanePos());
	  	},

	  	// @method layerPointToContainerPoint(point: Point): Point
	  	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	  	// returns the corresponding pixel coordinate relative to the map container.
	  	layerPointToContainerPoint: function (point) { // (Point)
	  		return toPoint(point).add(this._getMapPanePos());
	  	},

	  	// @method containerPointToLatLng(point: Point): LatLng
	  	// Given a pixel coordinate relative to the map container, returns
	  	// the corresponding geographical coordinate (for the current zoom level).
	  	containerPointToLatLng: function (point) {
	  		var layerPoint = this.containerPointToLayerPoint(toPoint(point));
	  		return this.layerPointToLatLng(layerPoint);
	  	},

	  	// @method latLngToContainerPoint(latlng: LatLng): Point
	  	// Given a geographical coordinate, returns the corresponding pixel coordinate
	  	// relative to the map container.
	  	latLngToContainerPoint: function (latlng) {
	  		return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
	  	},

	  	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
	  	// Given a MouseEvent object, returns the pixel coordinate relative to the
	  	// map container where the event took place.
	  	mouseEventToContainerPoint: function (e) {
	  		return getMousePosition(e, this._container);
	  	},

	  	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
	  	// Given a MouseEvent object, returns the pixel coordinate relative to
	  	// the [origin pixel](#map-getpixelorigin) where the event took place.
	  	mouseEventToLayerPoint: function (e) {
	  		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	  	},

	  	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
	  	// Given a MouseEvent object, returns geographical coordinate where the
	  	// event took place.
	  	mouseEventToLatLng: function (e) { // (MouseEvent)
	  		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	  	},


	  	// map initialization methods

	  	_initContainer: function (id) {
	  		var container = this._container = get(id);

	  		if (!container) {
	  			throw new Error('Map container not found.');
	  		} else if (container._leaflet_id) {
	  			throw new Error('Map container is already initialized.');
	  		}

	  		on(container, 'scroll', this._onScroll, this);
	  		this._containerId = stamp(container);
	  	},

	  	_initLayout: function () {
	  		var container = this._container;

	  		this._fadeAnimated = this.options.fadeAnimation && any3d;

	  		addClass(container, 'leaflet-container' +
	  			(touch ? ' leaflet-touch' : '') +
	  			(retina ? ' leaflet-retina' : '') +
	  			(ielt9 ? ' leaflet-oldie' : '') +
	  			(safari ? ' leaflet-safari' : '') +
	  			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

	  		var position = getStyle(container, 'position');

	  		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
	  			container.style.position = 'relative';
	  		}

	  		this._initPanes();

	  		if (this._initControlPos) {
	  			this._initControlPos();
	  		}
	  	},

	  	_initPanes: function () {
	  		var panes = this._panes = {};
	  		this._paneRenderers = {};

	  		// @section
	  		//
	  		// Panes are DOM elements used to control the ordering of layers on the map. You
	  		// can access panes with [`map.getPane`](#map-getpane) or
	  		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
	  		// [`map.createPane`](#map-createpane) method.
	  		//
	  		// Every map has the following default panes that differ only in zIndex.
	  		//
	  		// @pane mapPane: HTMLElement = 'auto'
	  		// Pane that contains all other map panes

	  		this._mapPane = this.createPane('mapPane', this._container);
	  		setPosition(this._mapPane, new Point(0, 0));

	  		// @pane tilePane: HTMLElement = 200
	  		// Pane for `GridLayer`s and `TileLayer`s
	  		this.createPane('tilePane');
	  		// @pane overlayPane: HTMLElement = 400
	  		// Pane for overlay shadows (e.g. `Marker` shadows)
	  		this.createPane('shadowPane');
	  		// @pane shadowPane: HTMLElement = 500
	  		// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
	  		this.createPane('overlayPane');
	  		// @pane markerPane: HTMLElement = 600
	  		// Pane for `Icon`s of `Marker`s
	  		this.createPane('markerPane');
	  		// @pane tooltipPane: HTMLElement = 650
	  		// Pane for `Tooltip`s.
	  		this.createPane('tooltipPane');
	  		// @pane popupPane: HTMLElement = 700
	  		// Pane for `Popup`s.
	  		this.createPane('popupPane');

	  		if (!this.options.markerZoomAnimation) {
	  			addClass(panes.markerPane, 'leaflet-zoom-hide');
	  			addClass(panes.shadowPane, 'leaflet-zoom-hide');
	  		}
	  	},


	  	// private methods that modify map state

	  	// @section Map state change events
	  	_resetView: function (center, zoom) {
	  		setPosition(this._mapPane, new Point(0, 0));

	  		var loading = !this._loaded;
	  		this._loaded = true;
	  		zoom = this._limitZoom(zoom);

	  		this.fire('viewprereset');

	  		var zoomChanged = this._zoom !== zoom;
	  		this
	  			._moveStart(zoomChanged, false)
	  			._move(center, zoom)
	  			._moveEnd(zoomChanged);

	  		// @event viewreset: Event
	  		// Fired when the map needs to redraw its content (this usually happens
	  		// on map zoom or load). Very useful for creating custom overlays.
	  		this.fire('viewreset');

	  		// @event load: Event
	  		// Fired when the map is initialized (when its center and zoom are set
	  		// for the first time).
	  		if (loading) {
	  			this.fire('load');
	  		}
	  	},

	  	_moveStart: function (zoomChanged, noMoveStart) {
	  		// @event zoomstart: Event
	  		// Fired when the map zoom is about to change (e.g. before zoom animation).
	  		// @event movestart: Event
	  		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
	  		if (zoomChanged) {
	  			this.fire('zoomstart');
	  		}
	  		if (!noMoveStart) {
	  			this.fire('movestart');
	  		}
	  		return this;
	  	},

	  	_move: function (center, zoom, data) {
	  		if (zoom === undefined) {
	  			zoom = this._zoom;
	  		}
	  		var zoomChanged = this._zoom !== zoom;

	  		this._zoom = zoom;
	  		this._lastCenter = center;
	  		this._pixelOrigin = this._getNewPixelOrigin(center);

	  		// @event zoom: Event
	  		// Fired repeatedly during any change in zoom level, including zoom
	  		// and fly animations.
	  		if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
	  			this.fire('zoom', data);
	  		}

	  		// @event move: Event
	  		// Fired repeatedly during any movement of the map, including pan and
	  		// fly animations.
	  		return this.fire('move', data);
	  	},

	  	_moveEnd: function (zoomChanged) {
	  		// @event zoomend: Event
	  		// Fired when the map has changed, after any animations.
	  		if (zoomChanged) {
	  			this.fire('zoomend');
	  		}

	  		// @event moveend: Event
	  		// Fired when the center of the map stops changing (e.g. user stopped
	  		// dragging the map).
	  		return this.fire('moveend');
	  	},

	  	_stop: function () {
	  		cancelAnimFrame(this._flyToFrame);
	  		if (this._panAnim) {
	  			this._panAnim.stop();
	  		}
	  		return this;
	  	},

	  	_rawPanBy: function (offset) {
	  		setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	  	},

	  	_getZoomSpan: function () {
	  		return this.getMaxZoom() - this.getMinZoom();
	  	},

	  	_panInsideMaxBounds: function () {
	  		if (!this._enforcingBounds) {
	  			this.panInsideBounds(this.options.maxBounds);
	  		}
	  	},

	  	_checkIfLoaded: function () {
	  		if (!this._loaded) {
	  			throw new Error('Set map center and zoom first.');
	  		}
	  	},

	  	// DOM event handling

	  	// @section Interaction events
	  	_initEvents: function (remove$$1) {
	  		this._targets = {};
	  		this._targets[stamp(this._container)] = this;

	  		var onOff = remove$$1 ? off : on;

	  		// @event click: MouseEvent
	  		// Fired when the user clicks (or taps) the map.
	  		// @event dblclick: MouseEvent
	  		// Fired when the user double-clicks (or double-taps) the map.
	  		// @event mousedown: MouseEvent
	  		// Fired when the user pushes the mouse button on the map.
	  		// @event mouseup: MouseEvent
	  		// Fired when the user releases the mouse button on the map.
	  		// @event mouseover: MouseEvent
	  		// Fired when the mouse enters the map.
	  		// @event mouseout: MouseEvent
	  		// Fired when the mouse leaves the map.
	  		// @event mousemove: MouseEvent
	  		// Fired while the mouse moves over the map.
	  		// @event contextmenu: MouseEvent
	  		// Fired when the user pushes the right mouse button on the map, prevents
	  		// default browser context menu from showing if there are listeners on
	  		// this event. Also fired on mobile when the user holds a single touch
	  		// for a second (also called long press).
	  		// @event keypress: KeyboardEvent
	  		// Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
	  		// @event keydown: KeyboardEvent
	  		// Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
	  		// the `keydown` event is fired for keys that produce a character value and for keys
	  		// that do not produce a character value.
	  		// @event keyup: KeyboardEvent
	  		// Fired when the user releases a key from the keyboard while the map is focused.
	  		onOff(this._container, 'click dblclick mousedown mouseup ' +
	  			'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);

	  		if (this.options.trackResize) {
	  			onOff(window, 'resize', this._onResize, this);
	  		}

	  		if (any3d && this.options.transform3DLimit) {
	  			(remove$$1 ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
	  		}
	  	},

	  	_onResize: function () {
	  		cancelAnimFrame(this._resizeRequest);
	  		this._resizeRequest = requestAnimFrame(
	  		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
	  	},

	  	_onScroll: function () {
	  		this._container.scrollTop  = 0;
	  		this._container.scrollLeft = 0;
	  	},

	  	_onMoveEnd: function () {
	  		var pos = this._getMapPanePos();
	  		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
	  			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
	  			// a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
	  			this._resetView(this.getCenter(), this.getZoom());
	  		}
	  	},

	  	_findEventTargets: function (e, type) {
	  		var targets = [],
	  		    target,
	  		    isHover = type === 'mouseout' || type === 'mouseover',
	  		    src = e.target || e.srcElement,
	  		    dragging = false;

	  		while (src) {
	  			target = this._targets[stamp(src)];
	  			if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
	  				// Prevent firing click after you just dragged an object.
	  				dragging = true;
	  				break;
	  			}
	  			if (target && target.listens(type, true)) {
	  				if (isHover && !isExternalTarget(src, e)) { break; }
	  				targets.push(target);
	  				if (isHover) { break; }
	  			}
	  			if (src === this._container) { break; }
	  			src = src.parentNode;
	  		}
	  		if (!targets.length && !dragging && !isHover && isExternalTarget(src, e)) {
	  			targets = [this];
	  		}
	  		return targets;
	  	},

	  	_handleDOMEvent: function (e) {
	  		if (!this._loaded || skipped(e)) { return; }

	  		var type = e.type;

	  		if (type === 'mousedown' || type === 'keypress' || type === 'keyup' || type === 'keydown') {
	  			// prevents outline when clicking on keyboard-focusable element
	  			preventOutline(e.target || e.srcElement);
	  		}

	  		this._fireDOMEvent(e, type);
	  	},

	  	_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

	  	_fireDOMEvent: function (e, type, targets) {

	  		if (e.type === 'click') {
	  			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
	  			// @event preclick: MouseEvent
	  			// Fired before mouse click on the map (sometimes useful when you
	  			// want something to happen on click before any existing click
	  			// handlers start running).
	  			var synth = extend({}, e);
	  			synth.type = 'preclick';
	  			this._fireDOMEvent(synth, synth.type, targets);
	  		}

	  		if (e._stopped) { return; }

	  		// Find the layer the event is propagating from and its parents.
	  		targets = (targets || []).concat(this._findEventTargets(e, type));

	  		if (!targets.length) { return; }

	  		var target = targets[0];
	  		if (type === 'contextmenu' && target.listens(type, true)) {
	  			preventDefault(e);
	  		}

	  		var data = {
	  			originalEvent: e
	  		};

	  		if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
	  			var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
	  			data.containerPoint = isMarker ?
	  				this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
	  			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
	  			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
	  		}

	  		for (var i = 0; i < targets.length; i++) {
	  			targets[i].fire(type, data, true);
	  			if (data.originalEvent._stopped ||
	  				(targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1)) { return; }
	  		}
	  	},

	  	_draggableMoved: function (obj) {
	  		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
	  		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
	  	},

	  	_clearHandlers: function () {
	  		for (var i = 0, len = this._handlers.length; i < len; i++) {
	  			this._handlers[i].disable();
	  		}
	  	},

	  	// @section Other Methods

	  	// @method whenReady(fn: Function, context?: Object): this
	  	// Runs the given function `fn` when the map gets initialized with
	  	// a view (center and zoom) and at least one layer, or immediately
	  	// if it's already initialized, optionally passing a function context.
	  	whenReady: function (callback, context) {
	  		if (this._loaded) {
	  			callback.call(context || this, {target: this});
	  		} else {
	  			this.on('load', callback, context);
	  		}
	  		return this;
	  	},


	  	// private methods for getting map state

	  	_getMapPanePos: function () {
	  		return getPosition(this._mapPane) || new Point(0, 0);
	  	},

	  	_moved: function () {
	  		var pos = this._getMapPanePos();
	  		return pos && !pos.equals([0, 0]);
	  	},

	  	_getTopLeftPoint: function (center, zoom) {
	  		var pixelOrigin = center && zoom !== undefined ?
	  			this._getNewPixelOrigin(center, zoom) :
	  			this.getPixelOrigin();
	  		return pixelOrigin.subtract(this._getMapPanePos());
	  	},

	  	_getNewPixelOrigin: function (center, zoom) {
	  		var viewHalf = this.getSize()._divideBy(2);
	  		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
	  	},

	  	_latLngToNewLayerPoint: function (latlng, zoom, center) {
	  		var topLeft = this._getNewPixelOrigin(center, zoom);
	  		return this.project(latlng, zoom)._subtract(topLeft);
	  	},

	  	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
	  		var topLeft = this._getNewPixelOrigin(center, zoom);
	  		return toBounds([
	  			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
	  			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
	  			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
	  			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
	  		]);
	  	},

	  	// layer point of the current center
	  	_getCenterLayerPoint: function () {
	  		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	  	},

	  	// offset of the specified place to the current center in pixels
	  	_getCenterOffset: function (latlng) {
	  		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	  	},

	  	// adjust center for view to get inside bounds
	  	_limitCenter: function (center, zoom, bounds) {

	  		if (!bounds) { return center; }

	  		var centerPoint = this.project(center, zoom),
	  		    viewHalf = this.getSize().divideBy(2),
	  		    viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
	  		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

	  		// If offset is less than a pixel, ignore.
	  		// This prevents unstable projections from getting into
	  		// an infinite loop of tiny offsets.
	  		if (offset.round().equals([0, 0])) {
	  			return center;
	  		}

	  		return this.unproject(centerPoint.add(offset), zoom);
	  	},

	  	// adjust offset for view to get inside bounds
	  	_limitOffset: function (offset, bounds) {
	  		if (!bounds) { return offset; }

	  		var viewBounds = this.getPixelBounds(),
	  		    newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

	  		return offset.add(this._getBoundsOffset(newBounds, bounds));
	  	},

	  	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	  	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
	  		var projectedMaxBounds = toBounds(
	  		        this.project(maxBounds.getNorthEast(), zoom),
	  		        this.project(maxBounds.getSouthWest(), zoom)
	  		    ),
	  		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
	  		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

	  		    dx = this._rebound(minOffset.x, -maxOffset.x),
	  		    dy = this._rebound(minOffset.y, -maxOffset.y);

	  		return new Point(dx, dy);
	  	},

	  	_rebound: function (left, right) {
	  		return left + right > 0 ?
	  			Math.round(left - right) / 2 :
	  			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	  	},

	  	_limitZoom: function (zoom) {
	  		var min = this.getMinZoom(),
	  		    max = this.getMaxZoom(),
	  		    snap = any3d ? this.options.zoomSnap : 1;
	  		if (snap) {
	  			zoom = Math.round(zoom / snap) * snap;
	  		}
	  		return Math.max(min, Math.min(max, zoom));
	  	},

	  	_onPanTransitionStep: function () {
	  		this.fire('move');
	  	},

	  	_onPanTransitionEnd: function () {
	  		removeClass(this._mapPane, 'leaflet-pan-anim');
	  		this.fire('moveend');
	  	},

	  	_tryAnimatedPan: function (center, options) {
	  		// difference between the new and current centers in pixels
	  		var offset = this._getCenterOffset(center)._trunc();

	  		// don't animate too far unless animate: true specified in options
	  		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

	  		this.panBy(offset, options);

	  		return true;
	  	},

	  	_createAnimProxy: function () {

	  		var proxy = this._proxy = create$1('div', 'leaflet-proxy leaflet-zoom-animated');
	  		this._panes.mapPane.appendChild(proxy);

	  		this.on('zoomanim', function (e) {
	  			var prop = TRANSFORM,
	  			    transform = this._proxy.style[prop];

	  			setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

	  			// workaround for case when transform is the same and so transitionend event is not fired
	  			if (transform === this._proxy.style[prop] && this._animatingZoom) {
	  				this._onZoomTransitionEnd();
	  			}
	  		}, this);

	  		this.on('load moveend', this._animMoveEnd, this);

	  		this._on('unload', this._destroyAnimProxy, this);
	  	},

	  	_destroyAnimProxy: function () {
	  		remove(this._proxy);
	  		this.off('load moveend', this._animMoveEnd, this);
	  		delete this._proxy;
	  	},

	  	_animMoveEnd: function () {
	  		var c = this.getCenter(),
	  		    z = this.getZoom();
	  		setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
	  	},

	  	_catchTransitionEnd: function (e) {
	  		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
	  			this._onZoomTransitionEnd();
	  		}
	  	},

	  	_nothingToAnimate: function () {
	  		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	  	},

	  	_tryAnimatedZoom: function (center, zoom, options) {

	  		if (this._animatingZoom) { return true; }

	  		options = options || {};

	  		// don't animate if disabled, not supported or zoom difference is too large
	  		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
	  		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

	  		// offset is the pixel coords of the zoom origin relative to the current center
	  		var scale = this.getZoomScale(zoom),
	  		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

	  		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
	  		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

	  		requestAnimFrame(function () {
	  			this
	  			    ._moveStart(true, false)
	  			    ._animateZoom(center, zoom, true);
	  		}, this);

	  		return true;
	  	},

	  	_animateZoom: function (center, zoom, startAnim, noUpdate) {
	  		if (!this._mapPane) { return; }

	  		if (startAnim) {
	  			this._animatingZoom = true;

	  			// remember what center/zoom to set after animation
	  			this._animateToCenter = center;
	  			this._animateToZoom = zoom;

	  			addClass(this._mapPane, 'leaflet-zoom-anim');
	  		}

	  		// @section Other Events
	  		// @event zoomanim: ZoomAnimEvent
	  		// Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
	  		this.fire('zoomanim', {
	  			center: center,
	  			zoom: zoom,
	  			noUpdate: noUpdate
	  		});

	  		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
	  		setTimeout(bind(this._onZoomTransitionEnd, this), 250);
	  	},

	  	_onZoomTransitionEnd: function () {
	  		if (!this._animatingZoom) { return; }

	  		if (this._mapPane) {
	  			removeClass(this._mapPane, 'leaflet-zoom-anim');
	  		}

	  		this._animatingZoom = false;

	  		this._move(this._animateToCenter, this._animateToZoom);

	  		// This anim frame should prevent an obscure iOS webkit tile loading race condition.
	  		requestAnimFrame(function () {
	  			this._moveEnd(true);
	  		}, this);
	  	}
	  });

	  // @section

	  // @factory L.map(id: String, options?: Map options)
	  // Instantiates a map object given the DOM ID of a `<div>` element
	  // and optionally an object literal with `Map options`.
	  //
	  // @alternative
	  // @factory L.map(el: HTMLElement, options?: Map options)
	  // Instantiates a map object given an instance of a `<div>` HTML element
	  // and optionally an object literal with `Map options`.
	  function createMap(id, options) {
	  	return new Map(id, options);
	  }

	  /*
	   * @class Control
	   * @aka L.Control
	   * @inherits Class
	   *
	   * L.Control is a base class for implementing map controls. Handles positioning.
	   * All other controls extend from this class.
	   */

	  var Control = Class.extend({
	  	// @section
	  	// @aka Control options
	  	options: {
	  		// @option position: String = 'topright'
	  		// The position of the control (one of the map corners). Possible values are `'topleft'`,
	  		// `'topright'`, `'bottomleft'` or `'bottomright'`
	  		position: 'topright'
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  	},

	  	/* @section
	  	 * Classes extending L.Control will inherit the following methods:
	  	 *
	  	 * @method getPosition: string
	  	 * Returns the position of the control.
	  	 */
	  	getPosition: function () {
	  		return this.options.position;
	  	},

	  	// @method setPosition(position: string): this
	  	// Sets the position of the control.
	  	setPosition: function (position) {
	  		var map = this._map;

	  		if (map) {
	  			map.removeControl(this);
	  		}

	  		this.options.position = position;

	  		if (map) {
	  			map.addControl(this);
	  		}

	  		return this;
	  	},

	  	// @method getContainer: HTMLElement
	  	// Returns the HTMLElement that contains the control.
	  	getContainer: function () {
	  		return this._container;
	  	},

	  	// @method addTo(map: Map): this
	  	// Adds the control to the given map.
	  	addTo: function (map) {
	  		this.remove();
	  		this._map = map;

	  		var container = this._container = this.onAdd(map),
	  		    pos = this.getPosition(),
	  		    corner = map._controlCorners[pos];

	  		addClass(container, 'leaflet-control');

	  		if (pos.indexOf('bottom') !== -1) {
	  			corner.insertBefore(container, corner.firstChild);
	  		} else {
	  			corner.appendChild(container);
	  		}

	  		this._map.on('unload', this.remove, this);

	  		return this;
	  	},

	  	// @method remove: this
	  	// Removes the control from the map it is currently active on.
	  	remove: function () {
	  		if (!this._map) {
	  			return this;
	  		}

	  		remove(this._container);

	  		if (this.onRemove) {
	  			this.onRemove(this._map);
	  		}

	  		this._map.off('unload', this.remove, this);
	  		this._map = null;

	  		return this;
	  	},

	  	_refocusOnMap: function (e) {
	  		// if map exists and event is not a keyboard event
	  		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
	  			this._map.getContainer().focus();
	  		}
	  	}
	  });

	  var control = function (options) {
	  	return new Control(options);
	  };

	  /* @section Extension methods
	   * @uninheritable
	   *
	   * Every control should extend from `L.Control` and (re-)implement the following methods.
	   *
	   * @method onAdd(map: Map): HTMLElement
	   * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
	   *
	   * @method onRemove(map: Map)
	   * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
	   */

	  /* @namespace Map
	   * @section Methods for Layers and Controls
	   */
	  Map.include({
	  	// @method addControl(control: Control): this
	  	// Adds the given control to the map
	  	addControl: function (control) {
	  		control.addTo(this);
	  		return this;
	  	},

	  	// @method removeControl(control: Control): this
	  	// Removes the given control from the map
	  	removeControl: function (control) {
	  		control.remove();
	  		return this;
	  	},

	  	_initControlPos: function () {
	  		var corners = this._controlCorners = {},
	  		    l = 'leaflet-',
	  		    container = this._controlContainer =
	  		            create$1('div', l + 'control-container', this._container);

	  		function createCorner(vSide, hSide) {
	  			var className = l + vSide + ' ' + l + hSide;

	  			corners[vSide + hSide] = create$1('div', className, container);
	  		}

	  		createCorner('top', 'left');
	  		createCorner('top', 'right');
	  		createCorner('bottom', 'left');
	  		createCorner('bottom', 'right');
	  	},

	  	_clearControlPos: function () {
	  		for (var i in this._controlCorners) {
	  			remove(this._controlCorners[i]);
	  		}
	  		remove(this._controlContainer);
	  		delete this._controlCorners;
	  		delete this._controlContainer;
	  	}
	  });

	  /*
	   * @class Control.Layers
	   * @aka L.Control.Layers
	   * @inherits Control
	   *
	   * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](http://leafletjs.com/examples/layers-control/)). Extends `Control`.
	   *
	   * @example
	   *
	   * ```js
	   * var baseLayers = {
	   * 	"Mapbox": mapbox,
	   * 	"OpenStreetMap": osm
	   * };
	   *
	   * var overlays = {
	   * 	"Marker": marker,
	   * 	"Roads": roadsLayer
	   * };
	   *
	   * L.control.layers(baseLayers, overlays).addTo(map);
	   * ```
	   *
	   * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
	   *
	   * ```js
	   * {
	   *     "<someName1>": layer1,
	   *     "<someName2>": layer2
	   * }
	   * ```
	   *
	   * The layer names can contain HTML, which allows you to add additional styling to the items:
	   *
	   * ```js
	   * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
	   * ```
	   */

	  var Layers = Control.extend({
	  	// @section
	  	// @aka Control.Layers options
	  	options: {
	  		// @option collapsed: Boolean = true
	  		// If `true`, the control will be collapsed into an icon and expanded on mouse hover or touch.
	  		collapsed: true,
	  		position: 'topright',

	  		// @option autoZIndex: Boolean = true
	  		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
	  		autoZIndex: true,

	  		// @option hideSingleBase: Boolean = false
	  		// If `true`, the base layers in the control will be hidden when there is only one.
	  		hideSingleBase: false,

	  		// @option sortLayers: Boolean = false
	  		// Whether to sort the layers. When `false`, layers will keep the order
	  		// in which they were added to the control.
	  		sortLayers: false,

	  		// @option sortFunction: Function = *
	  		// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
	  		// that will be used for sorting the layers, when `sortLayers` is `true`.
	  		// The function receives both the `L.Layer` instances and their names, as in
	  		// `sortFunction(layerA, layerB, nameA, nameB)`.
	  		// By default, it sorts layers alphabetically by their name.
	  		sortFunction: function (layerA, layerB, nameA, nameB) {
	  			return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
	  		}
	  	},

	  	initialize: function (baseLayers, overlays, options) {
	  		setOptions(this, options);

	  		this._layerControlInputs = [];
	  		this._layers = [];
	  		this._lastZIndex = 0;
	  		this._handlingClick = false;

	  		for (var i in baseLayers) {
	  			this._addLayer(baseLayers[i], i);
	  		}

	  		for (i in overlays) {
	  			this._addLayer(overlays[i], i, true);
	  		}
	  	},

	  	onAdd: function (map) {
	  		this._initLayout();
	  		this._update();

	  		this._map = map;
	  		map.on('zoomend', this._checkDisabledLayers, this);

	  		for (var i = 0; i < this._layers.length; i++) {
	  			this._layers[i].layer.on('add remove', this._onLayerChange, this);
	  		}

	  		return this._container;
	  	},

	  	addTo: function (map) {
	  		Control.prototype.addTo.call(this, map);
	  		// Trigger expand after Layers Control has been inserted into DOM so that is now has an actual height.
	  		return this._expandIfNotCollapsed();
	  	},

	  	onRemove: function () {
	  		this._map.off('zoomend', this._checkDisabledLayers, this);

	  		for (var i = 0; i < this._layers.length; i++) {
	  			this._layers[i].layer.off('add remove', this._onLayerChange, this);
	  		}
	  	},

	  	// @method addBaseLayer(layer: Layer, name: String): this
	  	// Adds a base layer (radio button entry) with the given name to the control.
	  	addBaseLayer: function (layer, name) {
	  		this._addLayer(layer, name);
	  		return (this._map) ? this._update() : this;
	  	},

	  	// @method addOverlay(layer: Layer, name: String): this
	  	// Adds an overlay (checkbox entry) with the given name to the control.
	  	addOverlay: function (layer, name) {
	  		this._addLayer(layer, name, true);
	  		return (this._map) ? this._update() : this;
	  	},

	  	// @method removeLayer(layer: Layer): this
	  	// Remove the given layer from the control.
	  	removeLayer: function (layer) {
	  		layer.off('add remove', this._onLayerChange, this);

	  		var obj = this._getLayer(stamp(layer));
	  		if (obj) {
	  			this._layers.splice(this._layers.indexOf(obj), 1);
	  		}
	  		return (this._map) ? this._update() : this;
	  	},

	  	// @method expand(): this
	  	// Expand the control container if collapsed.
	  	expand: function () {
	  		addClass(this._container, 'leaflet-control-layers-expanded');
	  		this._section.style.height = null;
	  		var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
	  		if (acceptableHeight < this._section.clientHeight) {
	  			addClass(this._section, 'leaflet-control-layers-scrollbar');
	  			this._section.style.height = acceptableHeight + 'px';
	  		} else {
	  			removeClass(this._section, 'leaflet-control-layers-scrollbar');
	  		}
	  		this._checkDisabledLayers();
	  		return this;
	  	},

	  	// @method collapse(): this
	  	// Collapse the control container if expanded.
	  	collapse: function () {
	  		removeClass(this._container, 'leaflet-control-layers-expanded');
	  		return this;
	  	},

	  	_initLayout: function () {
	  		var className = 'leaflet-control-layers',
	  		    container = this._container = create$1('div', className),
	  		    collapsed = this.options.collapsed;

	  		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
	  		container.setAttribute('aria-haspopup', true);

	  		disableClickPropagation(container);
	  		disableScrollPropagation(container);

	  		var section = this._section = create$1('section', className + '-list');

	  		if (collapsed) {
	  			this._map.on('click', this.collapse, this);

	  			if (!android) {
	  				on(container, {
	  					mouseenter: this.expand,
	  					mouseleave: this.collapse
	  				}, this);
	  			}
	  		}

	  		var link = this._layersLink = create$1('a', className + '-toggle', container);
	  		link.href = '#';
	  		link.title = 'Layers';

	  		if (touch) {
	  			on(link, 'click', stop);
	  			on(link, 'click', this.expand, this);
	  		} else {
	  			on(link, 'focus', this.expand, this);
	  		}

	  		if (!collapsed) {
	  			this.expand();
	  		}

	  		this._baseLayersList = create$1('div', className + '-base', section);
	  		this._separator = create$1('div', className + '-separator', section);
	  		this._overlaysList = create$1('div', className + '-overlays', section);

	  		container.appendChild(section);
	  	},

	  	_getLayer: function (id) {
	  		for (var i = 0; i < this._layers.length; i++) {

	  			if (this._layers[i] && stamp(this._layers[i].layer) === id) {
	  				return this._layers[i];
	  			}
	  		}
	  	},

	  	_addLayer: function (layer, name, overlay) {
	  		if (this._map) {
	  			layer.on('add remove', this._onLayerChange, this);
	  		}

	  		this._layers.push({
	  			layer: layer,
	  			name: name,
	  			overlay: overlay
	  		});

	  		if (this.options.sortLayers) {
	  			this._layers.sort(bind(function (a, b) {
	  				return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
	  			}, this));
	  		}

	  		if (this.options.autoZIndex && layer.setZIndex) {
	  			this._lastZIndex++;
	  			layer.setZIndex(this._lastZIndex);
	  		}

	  		this._expandIfNotCollapsed();
	  	},

	  	_update: function () {
	  		if (!this._container) { return this; }

	  		empty(this._baseLayersList);
	  		empty(this._overlaysList);

	  		this._layerControlInputs = [];
	  		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

	  		for (i = 0; i < this._layers.length; i++) {
	  			obj = this._layers[i];
	  			this._addItem(obj);
	  			overlaysPresent = overlaysPresent || obj.overlay;
	  			baseLayersPresent = baseLayersPresent || !obj.overlay;
	  			baseLayersCount += !obj.overlay ? 1 : 0;
	  		}

	  		// Hide base layers section if there's only one layer.
	  		if (this.options.hideSingleBase) {
	  			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
	  			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
	  		}

	  		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

	  		return this;
	  	},

	  	_onLayerChange: function (e) {
	  		if (!this._handlingClick) {
	  			this._update();
	  		}

	  		var obj = this._getLayer(stamp(e.target));

	  		// @namespace Map
	  		// @section Layer events
	  		// @event baselayerchange: LayersControlEvent
	  		// Fired when the base layer is changed through the [layers control](#control-layers).
	  		// @event overlayadd: LayersControlEvent
	  		// Fired when an overlay is selected through the [layers control](#control-layers).
	  		// @event overlayremove: LayersControlEvent
	  		// Fired when an overlay is deselected through the [layers control](#control-layers).
	  		// @namespace Control.Layers
	  		var type = obj.overlay ?
	  			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
	  			(e.type === 'add' ? 'baselayerchange' : null);

	  		if (type) {
	  			this._map.fire(type, obj);
	  		}
	  	},

	  	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	  	_createRadioElement: function (name, checked) {

	  		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
	  				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

	  		var radioFragment = document.createElement('div');
	  		radioFragment.innerHTML = radioHtml;

	  		return radioFragment.firstChild;
	  	},

	  	_addItem: function (obj) {
	  		var label = document.createElement('label'),
	  		    checked = this._map.hasLayer(obj.layer),
	  		    input;

	  		if (obj.overlay) {
	  			input = document.createElement('input');
	  			input.type = 'checkbox';
	  			input.className = 'leaflet-control-layers-selector';
	  			input.defaultChecked = checked;
	  		} else {
	  			input = this._createRadioElement('leaflet-base-layers_' + stamp(this), checked);
	  		}

	  		this._layerControlInputs.push(input);
	  		input.layerId = stamp(obj.layer);

	  		on(input, 'click', this._onInputClick, this);

	  		var name = document.createElement('span');
	  		name.innerHTML = ' ' + obj.name;

	  		// Helps from preventing layer control flicker when checkboxes are disabled
	  		// https://github.com/Leaflet/Leaflet/issues/2771
	  		var holder = document.createElement('div');

	  		label.appendChild(holder);
	  		holder.appendChild(input);
	  		holder.appendChild(name);

	  		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
	  		container.appendChild(label);

	  		this._checkDisabledLayers();
	  		return label;
	  	},

	  	_onInputClick: function () {
	  		var inputs = this._layerControlInputs,
	  		    input, layer;
	  		var addedLayers = [],
	  		    removedLayers = [];

	  		this._handlingClick = true;

	  		for (var i = inputs.length - 1; i >= 0; i--) {
	  			input = inputs[i];
	  			layer = this._getLayer(input.layerId).layer;

	  			if (input.checked) {
	  				addedLayers.push(layer);
	  			} else if (!input.checked) {
	  				removedLayers.push(layer);
	  			}
	  		}

	  		// Bugfix issue 2318: Should remove all old layers before readding new ones
	  		for (i = 0; i < removedLayers.length; i++) {
	  			if (this._map.hasLayer(removedLayers[i])) {
	  				this._map.removeLayer(removedLayers[i]);
	  			}
	  		}
	  		for (i = 0; i < addedLayers.length; i++) {
	  			if (!this._map.hasLayer(addedLayers[i])) {
	  				this._map.addLayer(addedLayers[i]);
	  			}
	  		}

	  		this._handlingClick = false;

	  		this._refocusOnMap();
	  	},

	  	_checkDisabledLayers: function () {
	  		var inputs = this._layerControlInputs,
	  		    input,
	  		    layer,
	  		    zoom = this._map.getZoom();

	  		for (var i = inputs.length - 1; i >= 0; i--) {
	  			input = inputs[i];
	  			layer = this._getLayer(input.layerId).layer;
	  			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
	  			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

	  		}
	  	},

	  	_expandIfNotCollapsed: function () {
	  		if (this._map && !this.options.collapsed) {
	  			this.expand();
	  		}
	  		return this;
	  	},

	  	_expand: function () {
	  		// Backward compatibility, remove me in 1.1.
	  		return this.expand();
	  	},

	  	_collapse: function () {
	  		// Backward compatibility, remove me in 1.1.
	  		return this.collapse();
	  	}

	  });


	  // @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
	  // Creates a layers control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
	  var layers = function (baseLayers, overlays, options) {
	  	return new Layers(baseLayers, overlays, options);
	  };

	  /*
	   * @class Control.Zoom
	   * @aka L.Control.Zoom
	   * @inherits Control
	   *
	   * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
	   */

	  var Zoom = Control.extend({
	  	// @section
	  	// @aka Control.Zoom options
	  	options: {
	  		position: 'topleft',

	  		// @option zoomInText: String = '+'
	  		// The text set on the 'zoom in' button.
	  		zoomInText: '+',

	  		// @option zoomInTitle: String = 'Zoom in'
	  		// The title set on the 'zoom in' button.
	  		zoomInTitle: 'Zoom in',

	  		// @option zoomOutText: String = '&#x2212;'
	  		// The text set on the 'zoom out' button.
	  		zoomOutText: '&#x2212;',

	  		// @option zoomOutTitle: String = 'Zoom out'
	  		// The title set on the 'zoom out' button.
	  		zoomOutTitle: 'Zoom out'
	  	},

	  	onAdd: function (map) {
	  		var zoomName = 'leaflet-control-zoom',
	  		    container = create$1('div', zoomName + ' leaflet-bar'),
	  		    options = this.options;

	  		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
	  		        zoomName + '-in',  container, this._zoomIn);
	  		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
	  		        zoomName + '-out', container, this._zoomOut);

	  		this._updateDisabled();
	  		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

	  		return container;
	  	},

	  	onRemove: function (map) {
	  		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	  	},

	  	disable: function () {
	  		this._disabled = true;
	  		this._updateDisabled();
	  		return this;
	  	},

	  	enable: function () {
	  		this._disabled = false;
	  		this._updateDisabled();
	  		return this;
	  	},

	  	_zoomIn: function (e) {
	  		if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
	  			this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
	  		}
	  	},

	  	_zoomOut: function (e) {
	  		if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
	  			this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
	  		}
	  	},

	  	_createButton: function (html, title, className, container, fn) {
	  		var link = create$1('a', className, container);
	  		link.innerHTML = html;
	  		link.href = '#';
	  		link.title = title;

	  		/*
	  		 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
	  		 */
	  		link.setAttribute('role', 'button');
	  		link.setAttribute('aria-label', title);

	  		disableClickPropagation(link);
	  		on(link, 'click', stop);
	  		on(link, 'click', fn, this);
	  		on(link, 'click', this._refocusOnMap, this);

	  		return link;
	  	},

	  	_updateDisabled: function () {
	  		var map = this._map,
	  		    className = 'leaflet-disabled';

	  		removeClass(this._zoomInButton, className);
	  		removeClass(this._zoomOutButton, className);

	  		if (this._disabled || map._zoom === map.getMinZoom()) {
	  			addClass(this._zoomOutButton, className);
	  		}
	  		if (this._disabled || map._zoom === map.getMaxZoom()) {
	  			addClass(this._zoomInButton, className);
	  		}
	  	}
	  });

	  // @namespace Map
	  // @section Control options
	  // @option zoomControl: Boolean = true
	  // Whether a [zoom control](#control-zoom) is added to the map by default.
	  Map.mergeOptions({
	  	zoomControl: true
	  });

	  Map.addInitHook(function () {
	  	if (this.options.zoomControl) {
	  		// @section Controls
	  		// @property zoomControl: Control.Zoom
	  		// The default zoom control (only available if the
	  		// [`zoomControl` option](#map-zoomcontrol) was `true` when creating the map).
	  		this.zoomControl = new Zoom();
	  		this.addControl(this.zoomControl);
	  	}
	  });

	  // @namespace Control.Zoom
	  // @factory L.control.zoom(options: Control.Zoom options)
	  // Creates a zoom control
	  var zoom = function (options) {
	  	return new Zoom(options);
	  };

	  /*
	   * @class Control.Scale
	   * @aka L.Control.Scale
	   * @inherits Control
	   *
	   * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
	   *
	   * @example
	   *
	   * ```js
	   * L.control.scale().addTo(map);
	   * ```
	   */

	  var Scale = Control.extend({
	  	// @section
	  	// @aka Control.Scale options
	  	options: {
	  		position: 'bottomleft',

	  		// @option maxWidth: Number = 100
	  		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
	  		maxWidth: 100,

	  		// @option metric: Boolean = True
	  		// Whether to show the metric scale line (m/km).
	  		metric: true,

	  		// @option imperial: Boolean = True
	  		// Whether to show the imperial scale line (mi/ft).
	  		imperial: true

	  		// @option updateWhenIdle: Boolean = false
	  		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
	  	},

	  	onAdd: function (map) {
	  		var className = 'leaflet-control-scale',
	  		    container = create$1('div', className),
	  		    options = this.options;

	  		this._addScales(options, className + '-line', container);

	  		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	  		map.whenReady(this._update, this);

	  		return container;
	  	},

	  	onRemove: function (map) {
	  		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	  	},

	  	_addScales: function (options, className, container) {
	  		if (options.metric) {
	  			this._mScale = create$1('div', className, container);
	  		}
	  		if (options.imperial) {
	  			this._iScale = create$1('div', className, container);
	  		}
	  	},

	  	_update: function () {
	  		var map = this._map,
	  		    y = map.getSize().y / 2;

	  		var maxMeters = map.distance(
	  			map.containerPointToLatLng([0, y]),
	  			map.containerPointToLatLng([this.options.maxWidth, y]));

	  		this._updateScales(maxMeters);
	  	},

	  	_updateScales: function (maxMeters) {
	  		if (this.options.metric && maxMeters) {
	  			this._updateMetric(maxMeters);
	  		}
	  		if (this.options.imperial && maxMeters) {
	  			this._updateImperial(maxMeters);
	  		}
	  	},

	  	_updateMetric: function (maxMeters) {
	  		var meters = this._getRoundNum(maxMeters),
	  		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

	  		this._updateScale(this._mScale, label, meters / maxMeters);
	  	},

	  	_updateImperial: function (maxMeters) {
	  		var maxFeet = maxMeters * 3.2808399,
	  		    maxMiles, miles, feet;

	  		if (maxFeet > 5280) {
	  			maxMiles = maxFeet / 5280;
	  			miles = this._getRoundNum(maxMiles);
	  			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

	  		} else {
	  			feet = this._getRoundNum(maxFeet);
	  			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
	  		}
	  	},

	  	_updateScale: function (scale, text, ratio) {
	  		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
	  		scale.innerHTML = text;
	  	},

	  	_getRoundNum: function (num) {
	  		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
	  		    d = num / pow10;

	  		d = d >= 10 ? 10 :
	  		    d >= 5 ? 5 :
	  		    d >= 3 ? 3 :
	  		    d >= 2 ? 2 : 1;

	  		return pow10 * d;
	  	}
	  });


	  // @factory L.control.scale(options?: Control.Scale options)
	  // Creates an scale control with the given options.
	  var scale = function (options) {
	  	return new Scale(options);
	  };

	  /*
	   * @class Control.Attribution
	   * @aka L.Control.Attribution
	   * @inherits Control
	   *
	   * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
	   */

	  var Attribution = Control.extend({
	  	// @section
	  	// @aka Control.Attribution options
	  	options: {
	  		position: 'bottomright',

	  		// @option prefix: String = 'Leaflet'
	  		// The HTML text shown before the attributions. Pass `false` to disable.
	  		prefix: '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);

	  		this._attributions = {};
	  	},

	  	onAdd: function (map) {
	  		map.attributionControl = this;
	  		this._container = create$1('div', 'leaflet-control-attribution');
	  		disableClickPropagation(this._container);

	  		// TODO ugly, refactor
	  		for (var i in map._layers) {
	  			if (map._layers[i].getAttribution) {
	  				this.addAttribution(map._layers[i].getAttribution());
	  			}
	  		}

	  		this._update();

	  		return this._container;
	  	},

	  	// @method setPrefix(prefix: String): this
	  	// Sets the text before the attributions.
	  	setPrefix: function (prefix) {
	  		this.options.prefix = prefix;
	  		this._update();
	  		return this;
	  	},

	  	// @method addAttribution(text: String): this
	  	// Adds an attribution text (e.g. `'Vector data &copy; Mapbox'`).
	  	addAttribution: function (text) {
	  		if (!text) { return this; }

	  		if (!this._attributions[text]) {
	  			this._attributions[text] = 0;
	  		}
	  		this._attributions[text]++;

	  		this._update();

	  		return this;
	  	},

	  	// @method removeAttribution(text: String): this
	  	// Removes an attribution text.
	  	removeAttribution: function (text) {
	  		if (!text) { return this; }

	  		if (this._attributions[text]) {
	  			this._attributions[text]--;
	  			this._update();
	  		}

	  		return this;
	  	},

	  	_update: function () {
	  		if (!this._map) { return; }

	  		var attribs = [];

	  		for (var i in this._attributions) {
	  			if (this._attributions[i]) {
	  				attribs.push(i);
	  			}
	  		}

	  		var prefixAndAttribs = [];

	  		if (this.options.prefix) {
	  			prefixAndAttribs.push(this.options.prefix);
	  		}
	  		if (attribs.length) {
	  			prefixAndAttribs.push(attribs.join(', '));
	  		}

	  		this._container.innerHTML = prefixAndAttribs.join(' | ');
	  	}
	  });

	  // @namespace Map
	  // @section Control options
	  // @option attributionControl: Boolean = true
	  // Whether a [attribution control](#control-attribution) is added to the map by default.
	  Map.mergeOptions({
	  	attributionControl: true
	  });

	  Map.addInitHook(function () {
	  	if (this.options.attributionControl) {
	  		new Attribution().addTo(this);
	  	}
	  });

	  // @namespace Control.Attribution
	  // @factory L.control.attribution(options: Control.Attribution options)
	  // Creates an attribution control.
	  var attribution = function (options) {
	  	return new Attribution(options);
	  };

	  Control.Layers = Layers;
	  Control.Zoom = Zoom;
	  Control.Scale = Scale;
	  Control.Attribution = Attribution;

	  control.layers = layers;
	  control.zoom = zoom;
	  control.scale = scale;
	  control.attribution = attribution;

	  /*
	  	L.Handler is a base class for handler classes that are used internally to inject
	  	interaction features like dragging to classes like Map and Marker.
	  */

	  // @class Handler
	  // @aka L.Handler
	  // Abstract class for map interaction handlers

	  var Handler = Class.extend({
	  	initialize: function (map) {
	  		this._map = map;
	  	},

	  	// @method enable(): this
	  	// Enables the handler
	  	enable: function () {
	  		if (this._enabled) { return this; }

	  		this._enabled = true;
	  		this.addHooks();
	  		return this;
	  	},

	  	// @method disable(): this
	  	// Disables the handler
	  	disable: function () {
	  		if (!this._enabled) { return this; }

	  		this._enabled = false;
	  		this.removeHooks();
	  		return this;
	  	},

	  	// @method enabled(): Boolean
	  	// Returns `true` if the handler is enabled
	  	enabled: function () {
	  		return !!this._enabled;
	  	}

	  	// @section Extension methods
	  	// Classes inheriting from `Handler` must implement the two following methods:
	  	// @method addHooks()
	  	// Called when the handler is enabled, should add event hooks.
	  	// @method removeHooks()
	  	// Called when the handler is disabled, should remove the event hooks added previously.
	  });

	  // @section There is static function which can be called without instantiating L.Handler:
	  // @function addTo(map: Map, name: String): this
	  // Adds a new Handler to the given map with the given name.
	  Handler.addTo = function (map, name) {
	  	map.addHandler(name, this);
	  	return this;
	  };

	  var Mixin = {Events: Events};

	  /*
	   * @class Draggable
	   * @aka L.Draggable
	   * @inherits Evented
	   *
	   * A class for making DOM elements draggable (including touch support).
	   * Used internally for map and marker dragging. Only works for elements
	   * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
	   *
	   * @example
	   * ```js
	   * var draggable = new L.Draggable(elementToDrag);
	   * draggable.enable();
	   * ```
	   */

	  var START = touch ? 'touchstart mousedown' : 'mousedown';
	  var END = {
	  	mousedown: 'mouseup',
	  	touchstart: 'touchend',
	  	pointerdown: 'touchend',
	  	MSPointerDown: 'touchend'
	  };
	  var MOVE = {
	  	mousedown: 'mousemove',
	  	touchstart: 'touchmove',
	  	pointerdown: 'touchmove',
	  	MSPointerDown: 'touchmove'
	  };


	  var Draggable = Evented.extend({

	  	options: {
	  		// @section
	  		// @aka Draggable options
	  		// @option clickTolerance: Number = 3
	  		// The max number of pixels a user can shift the mouse pointer during a click
	  		// for it to be considered a valid click (as opposed to a mouse drag).
	  		clickTolerance: 3
	  	},

	  	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
	  	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
	  	initialize: function (element, dragStartTarget, preventOutline$$1, options) {
	  		setOptions(this, options);

	  		this._element = element;
	  		this._dragStartTarget = dragStartTarget || element;
	  		this._preventOutline = preventOutline$$1;
	  	},

	  	// @method enable()
	  	// Enables the dragging ability
	  	enable: function () {
	  		if (this._enabled) { return; }

	  		on(this._dragStartTarget, START, this._onDown, this);

	  		this._enabled = true;
	  	},

	  	// @method disable()
	  	// Disables the dragging ability
	  	disable: function () {
	  		if (!this._enabled) { return; }

	  		// If we're currently dragging this draggable,
	  		// disabling it counts as first ending the drag.
	  		if (Draggable._dragging === this) {
	  			this.finishDrag();
	  		}

	  		off(this._dragStartTarget, START, this._onDown, this);

	  		this._enabled = false;
	  		this._moved = false;
	  	},

	  	_onDown: function (e) {
	  		// Ignore simulated events, since we handle both touch and
	  		// mouse explicitly; otherwise we risk getting duplicates of
	  		// touch events, see #4315.
	  		// Also ignore the event if disabled; this happens in IE11
	  		// under some circumstances, see #3666.
	  		if (e._simulated || !this._enabled) { return; }

	  		this._moved = false;

	  		if (hasClass(this._element, 'leaflet-zoom-anim')) { return; }

	  		if (Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
	  		Draggable._dragging = this;  // Prevent dragging multiple objects at once.

	  		if (this._preventOutline) {
	  			preventOutline(this._element);
	  		}

	  		disableImageDrag();
	  		disableTextSelection();

	  		if (this._moving) { return; }

	  		// @event down: Event
	  		// Fired when a drag is about to start.
	  		this.fire('down');

	  		var first = e.touches ? e.touches[0] : e,
	  		    sizedParent = getSizedParentNode(this._element);

	  		this._startPoint = new Point(first.clientX, first.clientY);

	  		// Cache the scale, so that we can continuously compensate for it during drag (_onMove).
	  		this._parentScale = getScale(sizedParent);

	  		on(document, MOVE[e.type], this._onMove, this);
	  		on(document, END[e.type], this._onUp, this);
	  	},

	  	_onMove: function (e) {
	  		// Ignore simulated events, since we handle both touch and
	  		// mouse explicitly; otherwise we risk getting duplicates of
	  		// touch events, see #4315.
	  		// Also ignore the event if disabled; this happens in IE11
	  		// under some circumstances, see #3666.
	  		if (e._simulated || !this._enabled) { return; }

	  		if (e.touches && e.touches.length > 1) {
	  			this._moved = true;
	  			return;
	  		}

	  		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
	  		    offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);

	  		if (!offset.x && !offset.y) { return; }
	  		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

	  		// We assume that the parent container's position, border and scale do not change for the duration of the drag.
	  		// Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
	  		// and we can use the cached value for the scale.
	  		offset.x /= this._parentScale.x;
	  		offset.y /= this._parentScale.y;

	  		preventDefault(e);

	  		if (!this._moved) {
	  			// @event dragstart: Event
	  			// Fired when a drag starts
	  			this.fire('dragstart');

	  			this._moved = true;
	  			this._startPos = getPosition(this._element).subtract(offset);

	  			addClass(document.body, 'leaflet-dragging');

	  			this._lastTarget = e.target || e.srcElement;
	  			// IE and Edge do not give the <use> element, so fetch it
	  			// if necessary
	  			if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
	  				this._lastTarget = this._lastTarget.correspondingUseElement;
	  			}
	  			addClass(this._lastTarget, 'leaflet-drag-target');
	  		}

	  		this._newPos = this._startPos.add(offset);
	  		this._moving = true;

	  		cancelAnimFrame(this._animRequest);
	  		this._lastEvent = e;
	  		this._animRequest = requestAnimFrame(this._updatePosition, this, true);
	  	},

	  	_updatePosition: function () {
	  		var e = {originalEvent: this._lastEvent};

	  		// @event predrag: Event
	  		// Fired continuously during dragging *before* each corresponding
	  		// update of the element's position.
	  		this.fire('predrag', e);
	  		setPosition(this._element, this._newPos);

	  		// @event drag: Event
	  		// Fired continuously during dragging.
	  		this.fire('drag', e);
	  	},

	  	_onUp: function (e) {
	  		// Ignore simulated events, since we handle both touch and
	  		// mouse explicitly; otherwise we risk getting duplicates of
	  		// touch events, see #4315.
	  		// Also ignore the event if disabled; this happens in IE11
	  		// under some circumstances, see #3666.
	  		if (e._simulated || !this._enabled) { return; }
	  		this.finishDrag();
	  	},

	  	finishDrag: function () {
	  		removeClass(document.body, 'leaflet-dragging');

	  		if (this._lastTarget) {
	  			removeClass(this._lastTarget, 'leaflet-drag-target');
	  			this._lastTarget = null;
	  		}

	  		for (var i in MOVE) {
	  			off(document, MOVE[i], this._onMove, this);
	  			off(document, END[i], this._onUp, this);
	  		}

	  		enableImageDrag();
	  		enableTextSelection();

	  		if (this._moved && this._moving) {
	  			// ensure drag is not fired after dragend
	  			cancelAnimFrame(this._animRequest);

	  			// @event dragend: DragEndEvent
	  			// Fired when the drag ends.
	  			this.fire('dragend', {
	  				distance: this._newPos.distanceTo(this._startPos)
	  			});
	  		}

	  		this._moving = false;
	  		Draggable._dragging = false;
	  	}

	  });

	  /*
	   * @namespace LineUtil
	   *
	   * Various utility functions for polyline points processing, used by Leaflet internally to make polylines lightning-fast.
	   */

	  // Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	  // Improves rendering performance dramatically by lessening the number of points to draw.

	  // @function simplify(points: Point[], tolerance: Number): Point[]
	  // Dramatically reduces the number of points in a polyline while retaining
	  // its shape and returns a new array of simplified points, using the
	  // [Douglas-Peucker algorithm](http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm).
	  // Used for a huge performance boost when processing/displaying Leaflet polylines for
	  // each zoom level and also reducing visual noise. tolerance affects the amount of
	  // simplification (lesser value means higher quality but slower and with more points).
	  // Also released as a separated micro-library [Simplify.js](http://mourner.github.com/simplify-js/).
	  function simplify(points, tolerance) {
	  	if (!tolerance || !points.length) {
	  		return points.slice();
	  	}

	  	var sqTolerance = tolerance * tolerance;

	  	    // stage 1: vertex reduction
	  	    points = _reducePoints(points, sqTolerance);

	  	    // stage 2: Douglas-Peucker simplification
	  	    points = _simplifyDP(points, sqTolerance);

	  	return points;
	  }

	  // @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
	  // Returns the distance between point `p` and segment `p1` to `p2`.
	  function pointToSegmentDistance(p, p1, p2) {
	  	return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
	  }

	  // @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
	  // Returns the closest point from a point `p` on a segment `p1` to `p2`.
	  function closestPointOnSegment(p, p1, p2) {
	  	return _sqClosestPointOnSegment(p, p1, p2);
	  }

	  // Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	  function _simplifyDP(points, sqTolerance) {

	  	var len = points.length,
	  	    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
	  	    markers = new ArrayConstructor(len);

	  	    markers[0] = markers[len - 1] = 1;

	  	_simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

	  	var i,
	  	    newPoints = [];

	  	for (i = 0; i < len; i++) {
	  		if (markers[i]) {
	  			newPoints.push(points[i]);
	  		}
	  	}

	  	return newPoints;
	  }

	  function _simplifyDPStep(points, markers, sqTolerance, first, last) {

	  	var maxSqDist = 0,
	  	index, i, sqDist;

	  	for (i = first + 1; i <= last - 1; i++) {
	  		sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

	  		if (sqDist > maxSqDist) {
	  			index = i;
	  			maxSqDist = sqDist;
	  		}
	  	}

	  	if (maxSqDist > sqTolerance) {
	  		markers[index] = 1;

	  		_simplifyDPStep(points, markers, sqTolerance, first, index);
	  		_simplifyDPStep(points, markers, sqTolerance, index, last);
	  	}
	  }

	  // reduce points that are too close to each other to a single point
	  function _reducePoints(points, sqTolerance) {
	  	var reducedPoints = [points[0]];

	  	for (var i = 1, prev = 0, len = points.length; i < len; i++) {
	  		if (_sqDist(points[i], points[prev]) > sqTolerance) {
	  			reducedPoints.push(points[i]);
	  			prev = i;
	  		}
	  	}
	  	if (prev < len - 1) {
	  		reducedPoints.push(points[len - 1]);
	  	}
	  	return reducedPoints;
	  }

	  var _lastCode;

	  // @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
	  // Clips the segment a to b by rectangular bounds with the
	  // [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
	  // (modifying the segment points directly!). Used by Leaflet to only show polyline
	  // points that are on the screen or near, increasing performance.
	  function clipSegment(a, b, bounds, useLastCode, round) {
	  	var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds),
	  	    codeB = _getBitCode(b, bounds),

	  	    codeOut, p, newCode;

	  	    // save 2nd code to avoid calculating it on the next segment
	  	    _lastCode = codeB;

	  	while (true) {
	  		// if a,b is inside the clip window (trivial accept)
	  		if (!(codeA | codeB)) {
	  			return [a, b];
	  		}

	  		// if a,b is outside the clip window (trivial reject)
	  		if (codeA & codeB) {
	  			return false;
	  		}

	  		// other cases
	  		codeOut = codeA || codeB;
	  		p = _getEdgeIntersection(a, b, codeOut, bounds, round);
	  		newCode = _getBitCode(p, bounds);

	  		if (codeOut === codeA) {
	  			a = p;
	  			codeA = newCode;
	  		} else {
	  			b = p;
	  			codeB = newCode;
	  		}
	  	}
	  }

	  function _getEdgeIntersection(a, b, code, bounds, round) {
	  	var dx = b.x - a.x,
	  	    dy = b.y - a.y,
	  	    min = bounds.min,
	  	    max = bounds.max,
	  	    x, y;

	  	if (code & 8) { // top
	  		x = a.x + dx * (max.y - a.y) / dy;
	  		y = max.y;

	  	} else if (code & 4) { // bottom
	  		x = a.x + dx * (min.y - a.y) / dy;
	  		y = min.y;

	  	} else if (code & 2) { // right
	  		x = max.x;
	  		y = a.y + dy * (max.x - a.x) / dx;

	  	} else if (code & 1) { // left
	  		x = min.x;
	  		y = a.y + dy * (min.x - a.x) / dx;
	  	}

	  	return new Point(x, y, round);
	  }

	  function _getBitCode(p, bounds) {
	  	var code = 0;

	  	if (p.x < bounds.min.x) { // left
	  		code |= 1;
	  	} else if (p.x > bounds.max.x) { // right
	  		code |= 2;
	  	}

	  	if (p.y < bounds.min.y) { // bottom
	  		code |= 4;
	  	} else if (p.y > bounds.max.y) { // top
	  		code |= 8;
	  	}

	  	return code;
	  }

	  // square distance (to avoid unnecessary Math.sqrt calls)
	  function _sqDist(p1, p2) {
	  	var dx = p2.x - p1.x,
	  	    dy = p2.y - p1.y;
	  	return dx * dx + dy * dy;
	  }

	  // return closest point on segment or distance to that point
	  function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
	  	var x = p1.x,
	  	    y = p1.y,
	  	    dx = p2.x - x,
	  	    dy = p2.y - y,
	  	    dot = dx * dx + dy * dy,
	  	    t;

	  	if (dot > 0) {
	  		t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

	  		if (t > 1) {
	  			x = p2.x;
	  			y = p2.y;
	  		} else if (t > 0) {
	  			x += dx * t;
	  			y += dy * t;
	  		}
	  	}

	  	dx = p.x - x;
	  	dy = p.y - y;

	  	return sqDist ? dx * dx + dy * dy : new Point(x, y);
	  }


	  // @function isFlat(latlngs: LatLng[]): Boolean
	  // Returns true if `latlngs` is a flat array, false is nested.
	  function isFlat(latlngs) {
	  	return !isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
	  }

	  function _flat(latlngs) {
	  	console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.');
	  	return isFlat(latlngs);
	  }

	  var LineUtil = ({
	    simplify: simplify,
	    pointToSegmentDistance: pointToSegmentDistance,
	    closestPointOnSegment: closestPointOnSegment,
	    clipSegment: clipSegment,
	    _getEdgeIntersection: _getEdgeIntersection,
	    _getBitCode: _getBitCode,
	    _sqClosestPointOnSegment: _sqClosestPointOnSegment,
	    isFlat: isFlat,
	    _flat: _flat
	  });

	  /*
	   * @namespace PolyUtil
	   * Various utility functions for polygon geometries.
	   */

	  /* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
	   * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
	   * Used by Leaflet to only show polygon points that are on the screen or near, increasing
	   * performance. Note that polygon points needs different algorithm for clipping
	   * than polyline, so there's a separate method for it.
	   */
	  function clipPolygon(points, bounds, round) {
	  	var clippedPoints,
	  	    edges = [1, 4, 2, 8],
	  	    i, j, k,
	  	    a, b,
	  	    len, edge, p;

	  	for (i = 0, len = points.length; i < len; i++) {
	  		points[i]._code = _getBitCode(points[i], bounds);
	  	}

	  	// for each edge (left, bottom, right, top)
	  	for (k = 0; k < 4; k++) {
	  		edge = edges[k];
	  		clippedPoints = [];

	  		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
	  			a = points[i];
	  			b = points[j];

	  			// if a is inside the clip window
	  			if (!(a._code & edge)) {
	  				// if b is outside the clip window (a->b goes out of screen)
	  				if (b._code & edge) {
	  					p = _getEdgeIntersection(b, a, edge, bounds, round);
	  					p._code = _getBitCode(p, bounds);
	  					clippedPoints.push(p);
	  				}
	  				clippedPoints.push(a);

	  			// else if b is inside the clip window (a->b enters the screen)
	  			} else if (!(b._code & edge)) {
	  				p = _getEdgeIntersection(b, a, edge, bounds, round);
	  				p._code = _getBitCode(p, bounds);
	  				clippedPoints.push(p);
	  			}
	  		}
	  		points = clippedPoints;
	  	}

	  	return points;
	  }

	  var PolyUtil = ({
	    clipPolygon: clipPolygon
	  });

	  /*
	   * @namespace Projection
	   * @section
	   * Leaflet comes with a set of already defined Projections out of the box:
	   *
	   * @projection L.Projection.LonLat
	   *
	   * Equirectangular, or Plate Carree projection — the most simple projection,
	   * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
	   * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
	   * `EPSG:4326` and `Simple` CRS.
	   */

	  var LonLat = {
	  	project: function (latlng) {
	  		return new Point(latlng.lng, latlng.lat);
	  	},

	  	unproject: function (point) {
	  		return new LatLng(point.y, point.x);
	  	},

	  	bounds: new Bounds([-180, -90], [180, 90])
	  };

	  /*
	   * @namespace Projection
	   * @projection L.Projection.Mercator
	   *
	   * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
	   */

	  var Mercator = {
	  	R: 6378137,
	  	R_MINOR: 6356752.314245179,

	  	bounds: new Bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

	  	project: function (latlng) {
	  		var d = Math.PI / 180,
	  		    r = this.R,
	  		    y = latlng.lat * d,
	  		    tmp = this.R_MINOR / r,
	  		    e = Math.sqrt(1 - tmp * tmp),
	  		    con = e * Math.sin(y);

	  		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
	  		y = -r * Math.log(Math.max(ts, 1E-10));

	  		return new Point(latlng.lng * d * r, y);
	  	},

	  	unproject: function (point) {
	  		var d = 180 / Math.PI,
	  		    r = this.R,
	  		    tmp = this.R_MINOR / r,
	  		    e = Math.sqrt(1 - tmp * tmp),
	  		    ts = Math.exp(-point.y / r),
	  		    phi = Math.PI / 2 - 2 * Math.atan(ts);

	  		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
	  			con = e * Math.sin(phi);
	  			con = Math.pow((1 - con) / (1 + con), e / 2);
	  			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
	  			phi += dphi;
	  		}

	  		return new LatLng(phi * d, point.x * d / r);
	  	}
	  };

	  /*
	   * @class Projection

	   * An object with methods for projecting geographical coordinates of the world onto
	   * a flat surface (and back). See [Map projection](http://en.wikipedia.org/wiki/Map_projection).

	   * @property bounds: Bounds
	   * The bounds (specified in CRS units) where the projection is valid

	   * @method project(latlng: LatLng): Point
	   * Projects geographical coordinates into a 2D point.
	   * Only accepts actual `L.LatLng` instances, not arrays.

	   * @method unproject(point: Point): LatLng
	   * The inverse of `project`. Projects a 2D point into a geographical location.
	   * Only accepts actual `L.Point` instances, not arrays.

	   * Note that the projection instances do not inherit from Leaflet's `Class` object,
	   * and can't be instantiated. Also, new classes can't inherit from them,
	   * and methods can't be added to them with the `include` function.

	   */

	  var index = ({
	    LonLat: LonLat,
	    Mercator: Mercator,
	    SphericalMercator: SphericalMercator
	  });

	  /*
	   * @namespace CRS
	   * @crs L.CRS.EPSG3395
	   *
	   * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
	   */
	  var EPSG3395 = extend({}, Earth, {
	  	code: 'EPSG:3395',
	  	projection: Mercator,

	  	transformation: (function () {
	  		var scale = 0.5 / (Math.PI * Mercator.R);
	  		return toTransformation(scale, 0.5, -scale, 0.5);
	  	}())
	  });

	  /*
	   * @namespace CRS
	   * @crs L.CRS.EPSG4326
	   *
	   * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
	   *
	   * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
	   * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
	   * with this CRS, ensure that there are two 256x256 pixel tiles covering the
	   * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
	   * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
	   */

	  var EPSG4326 = extend({}, Earth, {
	  	code: 'EPSG:4326',
	  	projection: LonLat,
	  	transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
	  });

	  /*
	   * @namespace CRS
	   * @crs L.CRS.Simple
	   *
	   * A simple CRS that maps longitude and latitude into `x` and `y` directly.
	   * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
	   * axis should still be inverted (going from bottom to top). `distance()` returns
	   * simple euclidean distance.
	   */

	  var Simple = extend({}, CRS, {
	  	projection: LonLat,
	  	transformation: toTransformation(1, 0, -1, 0),

	  	scale: function (zoom) {
	  		return Math.pow(2, zoom);
	  	},

	  	zoom: function (scale) {
	  		return Math.log(scale) / Math.LN2;
	  	},

	  	distance: function (latlng1, latlng2) {
	  		var dx = latlng2.lng - latlng1.lng,
	  		    dy = latlng2.lat - latlng1.lat;

	  		return Math.sqrt(dx * dx + dy * dy);
	  	},

	  	infinite: true
	  });

	  CRS.Earth = Earth;
	  CRS.EPSG3395 = EPSG3395;
	  CRS.EPSG3857 = EPSG3857;
	  CRS.EPSG900913 = EPSG900913;
	  CRS.EPSG4326 = EPSG4326;
	  CRS.Simple = Simple;

	  /*
	   * @class Layer
	   * @inherits Evented
	   * @aka L.Layer
	   * @aka ILayer
	   *
	   * A set of methods from the Layer base class that all Leaflet layers use.
	   * Inherits all methods, options and events from `L.Evented`.
	   *
	   * @example
	   *
	   * ```js
	   * var layer = L.marker(latlng).addTo(map);
	   * layer.addTo(map);
	   * layer.remove();
	   * ```
	   *
	   * @event add: Event
	   * Fired after the layer is added to a map
	   *
	   * @event remove: Event
	   * Fired after the layer is removed from a map
	   */


	  var Layer = Evented.extend({

	  	// Classes extending `L.Layer` will inherit the following options:
	  	options: {
	  		// @option pane: String = 'overlayPane'
	  		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
	  		pane: 'overlayPane',

	  		// @option attribution: String = null
	  		// String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
	  		attribution: null,

	  		bubblingMouseEvents: true
	  	},

	  	/* @section
	  	 * Classes extending `L.Layer` will inherit the following methods:
	  	 *
	  	 * @method addTo(map: Map|LayerGroup): this
	  	 * Adds the layer to the given map or layer group.
	  	 */
	  	addTo: function (map) {
	  		map.addLayer(this);
	  		return this;
	  	},

	  	// @method remove: this
	  	// Removes the layer from the map it is currently active on.
	  	remove: function () {
	  		return this.removeFrom(this._map || this._mapToAdd);
	  	},

	  	// @method removeFrom(map: Map): this
	  	// Removes the layer from the given map
	  	//
	  	// @alternative
	  	// @method removeFrom(group: LayerGroup): this
	  	// Removes the layer from the given `LayerGroup`
	  	removeFrom: function (obj) {
	  		if (obj) {
	  			obj.removeLayer(this);
	  		}
	  		return this;
	  	},

	  	// @method getPane(name? : String): HTMLElement
	  	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
	  	getPane: function (name) {
	  		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	  	},

	  	addInteractiveTarget: function (targetEl) {
	  		this._map._targets[stamp(targetEl)] = this;
	  		return this;
	  	},

	  	removeInteractiveTarget: function (targetEl) {
	  		delete this._map._targets[stamp(targetEl)];
	  		return this;
	  	},

	  	// @method getAttribution: String
	  	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
	  	getAttribution: function () {
	  		return this.options.attribution;
	  	},

	  	_layerAdd: function (e) {
	  		var map = e.target;

	  		// check in case layer gets added and then removed before the map is ready
	  		if (!map.hasLayer(this)) { return; }

	  		this._map = map;
	  		this._zoomAnimated = map._zoomAnimated;

	  		if (this.getEvents) {
	  			var events = this.getEvents();
	  			map.on(events, this);
	  			this.once('remove', function () {
	  				map.off(events, this);
	  			}, this);
	  		}

	  		this.onAdd(map);

	  		if (this.getAttribution && map.attributionControl) {
	  			map.attributionControl.addAttribution(this.getAttribution());
	  		}

	  		this.fire('add');
	  		map.fire('layeradd', {layer: this});
	  	}
	  });

	  /* @section Extension methods
	   * @uninheritable
	   *
	   * Every layer should extend from `L.Layer` and (re-)implement the following methods.
	   *
	   * @method onAdd(map: Map): this
	   * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
	   *
	   * @method onRemove(map: Map): this
	   * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
	   *
	   * @method getEvents(): Object
	   * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
	   *
	   * @method getAttribution(): String
	   * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
	   *
	   * @method beforeAdd(map: Map): this
	   * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
	   */


	  /* @namespace Map
	   * @section Layer events
	   *
	   * @event layeradd: LayerEvent
	   * Fired when a new layer is added to the map.
	   *
	   * @event layerremove: LayerEvent
	   * Fired when some layer is removed from the map
	   *
	   * @section Methods for Layers and Controls
	   */
	  Map.include({
	  	// @method addLayer(layer: Layer): this
	  	// Adds the given layer to the map
	  	addLayer: function (layer) {
	  		if (!layer._layerAdd) {
	  			throw new Error('The provided object is not a Layer.');
	  		}

	  		var id = stamp(layer);
	  		if (this._layers[id]) { return this; }
	  		this._layers[id] = layer;

	  		layer._mapToAdd = this;

	  		if (layer.beforeAdd) {
	  			layer.beforeAdd(this);
	  		}

	  		this.whenReady(layer._layerAdd, layer);

	  		return this;
	  	},

	  	// @method removeLayer(layer: Layer): this
	  	// Removes the given layer from the map.
	  	removeLayer: function (layer) {
	  		var id = stamp(layer);

	  		if (!this._layers[id]) { return this; }

	  		if (this._loaded) {
	  			layer.onRemove(this);
	  		}

	  		if (layer.getAttribution && this.attributionControl) {
	  			this.attributionControl.removeAttribution(layer.getAttribution());
	  		}

	  		delete this._layers[id];

	  		if (this._loaded) {
	  			this.fire('layerremove', {layer: layer});
	  			layer.fire('remove');
	  		}

	  		layer._map = layer._mapToAdd = null;

	  		return this;
	  	},

	  	// @method hasLayer(layer: Layer): Boolean
	  	// Returns `true` if the given layer is currently added to the map
	  	hasLayer: function (layer) {
	  		return !!layer && (stamp(layer) in this._layers);
	  	},

	  	/* @method eachLayer(fn: Function, context?: Object): this
	  	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
	  	 * ```
	  	 * map.eachLayer(function(layer){
	  	 *     layer.bindPopup('Hello');
	  	 * });
	  	 * ```
	  	 */
	  	eachLayer: function (method, context) {
	  		for (var i in this._layers) {
	  			method.call(context, this._layers[i]);
	  		}
	  		return this;
	  	},

	  	_addLayers: function (layers) {
	  		layers = layers ? (isArray(layers) ? layers : [layers]) : [];

	  		for (var i = 0, len = layers.length; i < len; i++) {
	  			this.addLayer(layers[i]);
	  		}
	  	},

	  	_addZoomLimit: function (layer) {
	  		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
	  			this._zoomBoundLayers[stamp(layer)] = layer;
	  			this._updateZoomLevels();
	  		}
	  	},

	  	_removeZoomLimit: function (layer) {
	  		var id = stamp(layer);

	  		if (this._zoomBoundLayers[id]) {
	  			delete this._zoomBoundLayers[id];
	  			this._updateZoomLevels();
	  		}
	  	},

	  	_updateZoomLevels: function () {
	  		var minZoom = Infinity,
	  		    maxZoom = -Infinity,
	  		    oldZoomSpan = this._getZoomSpan();

	  		for (var i in this._zoomBoundLayers) {
	  			var options = this._zoomBoundLayers[i].options;

	  			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
	  			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
	  		}

	  		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
	  		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

	  		// @section Map state change events
	  		// @event zoomlevelschange: Event
	  		// Fired when the number of zoomlevels on the map is changed due
	  		// to adding or removing a layer.
	  		if (oldZoomSpan !== this._getZoomSpan()) {
	  			this.fire('zoomlevelschange');
	  		}

	  		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
	  			this.setZoom(this._layersMaxZoom);
	  		}
	  		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
	  			this.setZoom(this._layersMinZoom);
	  		}
	  	}
	  });

	  /*
	   * @class LayerGroup
	   * @aka L.LayerGroup
	   * @inherits Layer
	   *
	   * Used to group several layers and handle them as one. If you add it to the map,
	   * any layers added or removed from the group will be added/removed on the map as
	   * well. Extends `Layer`.
	   *
	   * @example
	   *
	   * ```js
	   * L.layerGroup([marker1, marker2])
	   * 	.addLayer(polyline)
	   * 	.addTo(map);
	   * ```
	   */

	  var LayerGroup = Layer.extend({

	  	initialize: function (layers, options) {
	  		setOptions(this, options);

	  		this._layers = {};

	  		var i, len;

	  		if (layers) {
	  			for (i = 0, len = layers.length; i < len; i++) {
	  				this.addLayer(layers[i]);
	  			}
	  		}
	  	},

	  	// @method addLayer(layer: Layer): this
	  	// Adds the given layer to the group.
	  	addLayer: function (layer) {
	  		var id = this.getLayerId(layer);

	  		this._layers[id] = layer;

	  		if (this._map) {
	  			this._map.addLayer(layer);
	  		}

	  		return this;
	  	},

	  	// @method removeLayer(layer: Layer): this
	  	// Removes the given layer from the group.
	  	// @alternative
	  	// @method removeLayer(id: Number): this
	  	// Removes the layer with the given internal ID from the group.
	  	removeLayer: function (layer) {
	  		var id = layer in this._layers ? layer : this.getLayerId(layer);

	  		if (this._map && this._layers[id]) {
	  			this._map.removeLayer(this._layers[id]);
	  		}

	  		delete this._layers[id];

	  		return this;
	  	},

	  	// @method hasLayer(layer: Layer): Boolean
	  	// Returns `true` if the given layer is currently added to the group.
	  	// @alternative
	  	// @method hasLayer(id: Number): Boolean
	  	// Returns `true` if the given internal ID is currently added to the group.
	  	hasLayer: function (layer) {
	  		if (!layer) { return false; }
	  		var layerId = typeof layer === 'number' ? layer : this.getLayerId(layer);
	  		return layerId in this._layers;
	  	},

	  	// @method clearLayers(): this
	  	// Removes all the layers from the group.
	  	clearLayers: function () {
	  		return this.eachLayer(this.removeLayer, this);
	  	},

	  	// @method invoke(methodName: String, …): this
	  	// Calls `methodName` on every layer contained in this group, passing any
	  	// additional parameters. Has no effect if the layers contained do not
	  	// implement `methodName`.
	  	invoke: function (methodName) {
	  		var args = Array.prototype.slice.call(arguments, 1),
	  		    i, layer;

	  		for (i in this._layers) {
	  			layer = this._layers[i];

	  			if (layer[methodName]) {
	  				layer[methodName].apply(layer, args);
	  			}
	  		}

	  		return this;
	  	},

	  	onAdd: function (map) {
	  		this.eachLayer(map.addLayer, map);
	  	},

	  	onRemove: function (map) {
	  		this.eachLayer(map.removeLayer, map);
	  	},

	  	// @method eachLayer(fn: Function, context?: Object): this
	  	// Iterates over the layers of the group, optionally specifying context of the iterator function.
	  	// ```js
	  	// group.eachLayer(function (layer) {
	  	// 	layer.bindPopup('Hello');
	  	// });
	  	// ```
	  	eachLayer: function (method, context) {
	  		for (var i in this._layers) {
	  			method.call(context, this._layers[i]);
	  		}
	  		return this;
	  	},

	  	// @method getLayer(id: Number): Layer
	  	// Returns the layer with the given internal ID.
	  	getLayer: function (id) {
	  		return this._layers[id];
	  	},

	  	// @method getLayers(): Layer[]
	  	// Returns an array of all the layers added to the group.
	  	getLayers: function () {
	  		var layers = [];
	  		this.eachLayer(layers.push, layers);
	  		return layers;
	  	},

	  	// @method setZIndex(zIndex: Number): this
	  	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
	  	setZIndex: function (zIndex) {
	  		return this.invoke('setZIndex', zIndex);
	  	},

	  	// @method getLayerId(layer: Layer): Number
	  	// Returns the internal ID for a layer
	  	getLayerId: function (layer) {
	  		return stamp(layer);
	  	}
	  });


	  // @factory L.layerGroup(layers?: Layer[], options?: Object)
	  // Create a layer group, optionally given an initial set of layers and an `options` object.
	  var layerGroup = function (layers, options) {
	  	return new LayerGroup(layers, options);
	  };

	  /*
	   * @class FeatureGroup
	   * @aka L.FeatureGroup
	   * @inherits LayerGroup
	   *
	   * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
	   *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
	   *  * Events are propagated to the `FeatureGroup`, so if the group has an event
	   * handler, it will handle events from any of the layers. This includes mouse events
	   * and custom events.
	   *  * Has `layeradd` and `layerremove` events
	   *
	   * @example
	   *
	   * ```js
	   * L.featureGroup([marker1, marker2, polyline])
	   * 	.bindPopup('Hello world!')
	   * 	.on('click', function() { alert('Clicked on a member of the group!'); })
	   * 	.addTo(map);
	   * ```
	   */

	  var FeatureGroup = LayerGroup.extend({

	  	addLayer: function (layer) {
	  		if (this.hasLayer(layer)) {
	  			return this;
	  		}

	  		layer.addEventParent(this);

	  		LayerGroup.prototype.addLayer.call(this, layer);

	  		// @event layeradd: LayerEvent
	  		// Fired when a layer is added to this `FeatureGroup`
	  		return this.fire('layeradd', {layer: layer});
	  	},

	  	removeLayer: function (layer) {
	  		if (!this.hasLayer(layer)) {
	  			return this;
	  		}
	  		if (layer in this._layers) {
	  			layer = this._layers[layer];
	  		}

	  		layer.removeEventParent(this);

	  		LayerGroup.prototype.removeLayer.call(this, layer);

	  		// @event layerremove: LayerEvent
	  		// Fired when a layer is removed from this `FeatureGroup`
	  		return this.fire('layerremove', {layer: layer});
	  	},

	  	// @method setStyle(style: Path options): this
	  	// Sets the given path options to each layer of the group that has a `setStyle` method.
	  	setStyle: function (style) {
	  		return this.invoke('setStyle', style);
	  	},

	  	// @method bringToFront(): this
	  	// Brings the layer group to the top of all other layers
	  	bringToFront: function () {
	  		return this.invoke('bringToFront');
	  	},

	  	// @method bringToBack(): this
	  	// Brings the layer group to the back of all other layers
	  	bringToBack: function () {
	  		return this.invoke('bringToBack');
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
	  	getBounds: function () {
	  		var bounds = new LatLngBounds();

	  		for (var id in this._layers) {
	  			var layer = this._layers[id];
	  			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
	  		}
	  		return bounds;
	  	}
	  });

	  // @factory L.featureGroup(layers?: Layer[], options?: Object)
	  // Create a feature group, optionally given an initial set of layers and an `options` object.
	  var featureGroup = function (layers, options) {
	  	return new FeatureGroup(layers, options);
	  };

	  /*
	   * @class Icon
	   * @aka L.Icon
	   *
	   * Represents an icon to provide when creating a marker.
	   *
	   * @example
	   *
	   * ```js
	   * var myIcon = L.icon({
	   *     iconUrl: 'my-icon.png',
	   *     iconRetinaUrl: 'my-icon@2x.png',
	   *     iconSize: [38, 95],
	   *     iconAnchor: [22, 94],
	   *     popupAnchor: [-3, -76],
	   *     shadowUrl: 'my-icon-shadow.png',
	   *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
	   *     shadowSize: [68, 95],
	   *     shadowAnchor: [22, 94]
	   * });
	   *
	   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
	   * ```
	   *
	   * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
	   *
	   */

	  var Icon = Class.extend({

	  	/* @section
	  	 * @aka Icon options
	  	 *
	  	 * @option iconUrl: String = null
	  	 * **(required)** The URL to the icon image (absolute or relative to your script path).
	  	 *
	  	 * @option iconRetinaUrl: String = null
	  	 * The URL to a retina sized version of the icon image (absolute or relative to your
	  	 * script path). Used for Retina screen devices.
	  	 *
	  	 * @option iconSize: Point = null
	  	 * Size of the icon image in pixels.
	  	 *
	  	 * @option iconAnchor: Point = null
	  	 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
	  	 * will be aligned so that this point is at the marker's geographical location. Centered
	  	 * by default if size is specified, also can be set in CSS with negative margins.
	  	 *
	  	 * @option popupAnchor: Point = [0, 0]
	  	 * The coordinates of the point from which popups will "open", relative to the icon anchor.
	  	 *
	  	 * @option tooltipAnchor: Point = [0, 0]
	  	 * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
	  	 *
	  	 * @option shadowUrl: String = null
	  	 * The URL to the icon shadow image. If not specified, no shadow image will be created.
	  	 *
	  	 * @option shadowRetinaUrl: String = null
	  	 *
	  	 * @option shadowSize: Point = null
	  	 * Size of the shadow image in pixels.
	  	 *
	  	 * @option shadowAnchor: Point = null
	  	 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
	  	 * as iconAnchor if not specified).
	  	 *
	  	 * @option className: String = ''
	  	 * A custom class name to assign to both icon and shadow images. Empty by default.
	  	 */

	  	options: {
	  		popupAnchor: [0, 0],
	  		tooltipAnchor: [0, 0]
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  	},

	  	// @method createIcon(oldIcon?: HTMLElement): HTMLElement
	  	// Called internally when the icon has to be shown, returns a `<img>` HTML element
	  	// styled according to the options.
	  	createIcon: function (oldIcon) {
	  		return this._createIcon('icon', oldIcon);
	  	},

	  	// @method createShadow(oldIcon?: HTMLElement): HTMLElement
	  	// As `createIcon`, but for the shadow beneath it.
	  	createShadow: function (oldIcon) {
	  		return this._createIcon('shadow', oldIcon);
	  	},

	  	_createIcon: function (name, oldIcon) {
	  		var src = this._getIconUrl(name);

	  		if (!src) {
	  			if (name === 'icon') {
	  				throw new Error('iconUrl not set in Icon options (see the docs).');
	  			}
	  			return null;
	  		}

	  		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
	  		this._setIconStyles(img, name);

	  		return img;
	  	},

	  	_setIconStyles: function (img, name) {
	  		var options = this.options;
	  		var sizeOption = options[name + 'Size'];

	  		if (typeof sizeOption === 'number') {
	  			sizeOption = [sizeOption, sizeOption];
	  		}

	  		var size = toPoint(sizeOption),
	  		    anchor = toPoint(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
	  		            size && size.divideBy(2, true));

	  		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

	  		if (anchor) {
	  			img.style.marginLeft = (-anchor.x) + 'px';
	  			img.style.marginTop  = (-anchor.y) + 'px';
	  		}

	  		if (size) {
	  			img.style.width  = size.x + 'px';
	  			img.style.height = size.y + 'px';
	  		}
	  	},

	  	_createImg: function (src, el) {
	  		el = el || document.createElement('img');
	  		el.src = src;
	  		return el;
	  	},

	  	_getIconUrl: function (name) {
	  		return retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
	  	}
	  });


	  // @factory L.icon(options: Icon options)
	  // Creates an icon instance with the given options.
	  function icon(options) {
	  	return new Icon(options);
	  }

	  /*
	   * @miniclass Icon.Default (Icon)
	   * @aka L.Icon.Default
	   * @section
	   *
	   * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
	   * no icon is specified. Points to the blue marker image distributed with Leaflet
	   * releases.
	   *
	   * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
	   * (which is a set of `Icon options`).
	   *
	   * If you want to _completely_ replace the default icon, override the
	   * `L.Marker.prototype.options.icon` with your own icon instead.
	   */

	  var IconDefault = Icon.extend({

	  	options: {
	  		iconUrl:       'marker-icon.png',
	  		iconRetinaUrl: 'marker-icon-2x.png',
	  		shadowUrl:     'marker-shadow.png',
	  		iconSize:    [25, 41],
	  		iconAnchor:  [12, 41],
	  		popupAnchor: [1, -34],
	  		tooltipAnchor: [16, -28],
	  		shadowSize:  [41, 41]
	  	},

	  	_getIconUrl: function (name) {
	  		if (!IconDefault.imagePath) {	// Deprecated, backwards-compatibility only
	  			IconDefault.imagePath = this._detectIconPath();
	  		}

	  		// @option imagePath: String
	  		// `Icon.Default` will try to auto-detect the location of the
	  		// blue icon images. If you are placing these images in a non-standard
	  		// way, set this option to point to the right path.
	  		return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
	  	},

	  	_detectIconPath: function () {
	  		var el = create$1('div',  'leaflet-default-icon-path', document.body);
	  		var path = getStyle(el, 'background-image') ||
	  		           getStyle(el, 'backgroundImage');	// IE8

	  		document.body.removeChild(el);

	  		if (path === null || path.indexOf('url') !== 0) {
	  			path = '';
	  		} else {
	  			path = path.replace(/^url\(["']?/, '').replace(/marker-icon\.png["']?\)$/, '');
	  		}

	  		return path;
	  	}
	  });

	  /*
	   * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
	   */


	  /* @namespace Marker
	   * @section Interaction handlers
	   *
	   * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
	   *
	   * ```js
	   * marker.dragging.disable();
	   * ```
	   *
	   * @property dragging: Handler
	   * Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set [`marker.options.draggable`](#marker-draggable)).
	   */

	  var MarkerDrag = Handler.extend({
	  	initialize: function (marker) {
	  		this._marker = marker;
	  	},

	  	addHooks: function () {
	  		var icon = this._marker._icon;

	  		if (!this._draggable) {
	  			this._draggable = new Draggable(icon, icon, true);
	  		}

	  		this._draggable.on({
	  			dragstart: this._onDragStart,
	  			predrag: this._onPreDrag,
	  			drag: this._onDrag,
	  			dragend: this._onDragEnd
	  		}, this).enable();

	  		addClass(icon, 'leaflet-marker-draggable');
	  	},

	  	removeHooks: function () {
	  		this._draggable.off({
	  			dragstart: this._onDragStart,
	  			predrag: this._onPreDrag,
	  			drag: this._onDrag,
	  			dragend: this._onDragEnd
	  		}, this).disable();

	  		if (this._marker._icon) {
	  			removeClass(this._marker._icon, 'leaflet-marker-draggable');
	  		}
	  	},

	  	moved: function () {
	  		return this._draggable && this._draggable._moved;
	  	},

	  	_adjustPan: function (e) {
	  		var marker = this._marker,
	  		    map = marker._map,
	  		    speed = this._marker.options.autoPanSpeed,
	  		    padding = this._marker.options.autoPanPadding,
	  		    iconPos = getPosition(marker._icon),
	  		    bounds = map.getPixelBounds(),
	  		    origin = map.getPixelOrigin();

	  		var panBounds = toBounds(
	  			bounds.min._subtract(origin).add(padding),
	  			bounds.max._subtract(origin).subtract(padding)
	  		);

	  		if (!panBounds.contains(iconPos)) {
	  			// Compute incremental movement
	  			var movement = toPoint(
	  				(Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) -
	  				(Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),

	  				(Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) -
	  				(Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
	  			).multiplyBy(speed);

	  			map.panBy(movement, {animate: false});

	  			this._draggable._newPos._add(movement);
	  			this._draggable._startPos._add(movement);

	  			setPosition(marker._icon, this._draggable._newPos);
	  			this._onDrag(e);

	  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
	  		}
	  	},

	  	_onDragStart: function () {
	  		// @section Dragging events
	  		// @event dragstart: Event
	  		// Fired when the user starts dragging the marker.

	  		// @event movestart: Event
	  		// Fired when the marker starts moving (because of dragging).

	  		this._oldLatLng = this._marker.getLatLng();

	  		// When using ES6 imports it could not be set when `Popup` was not imported as well
	  		this._marker.closePopup && this._marker.closePopup();

	  		this._marker
	  			.fire('movestart')
	  			.fire('dragstart');
	  	},

	  	_onPreDrag: function (e) {
	  		if (this._marker.options.autoPan) {
	  			cancelAnimFrame(this._panRequest);
	  			this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
	  		}
	  	},

	  	_onDrag: function (e) {
	  		var marker = this._marker,
	  		    shadow = marker._shadow,
	  		    iconPos = getPosition(marker._icon),
	  		    latlng = marker._map.layerPointToLatLng(iconPos);

	  		// update shadow position
	  		if (shadow) {
	  			setPosition(shadow, iconPos);
	  		}

	  		marker._latlng = latlng;
	  		e.latlng = latlng;
	  		e.oldLatLng = this._oldLatLng;

	  		// @event drag: Event
	  		// Fired repeatedly while the user drags the marker.
	  		marker
	  		    .fire('move', e)
	  		    .fire('drag', e);
	  	},

	  	_onDragEnd: function (e) {
	  		// @event dragend: DragEndEvent
	  		// Fired when the user stops dragging the marker.

	  		 cancelAnimFrame(this._panRequest);

	  		// @event moveend: Event
	  		// Fired when the marker stops moving (because of dragging).
	  		delete this._oldLatLng;
	  		this._marker
	  		    .fire('moveend')
	  		    .fire('dragend', e);
	  	}
	  });

	  /*
	   * @class Marker
	   * @inherits Interactive layer
	   * @aka L.Marker
	   * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
	   *
	   * @example
	   *
	   * ```js
	   * L.marker([50.5, 30.5]).addTo(map);
	   * ```
	   */

	  var Marker = Layer.extend({

	  	// @section
	  	// @aka Marker options
	  	options: {
	  		// @option icon: Icon = *
	  		// Icon instance to use for rendering the marker.
	  		// See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
	  		// If not specified, a common instance of `L.Icon.Default` is used.
	  		icon: new IconDefault(),

	  		// Option inherited from "Interactive layer" abstract class
	  		interactive: true,

	  		// @option keyboard: Boolean = true
	  		// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
	  		keyboard: true,

	  		// @option title: String = ''
	  		// Text for the browser tooltip that appear on marker hover (no tooltip by default).
	  		title: '',

	  		// @option alt: String = ''
	  		// Text for the `alt` attribute of the icon image (useful for accessibility).
	  		alt: '',

	  		// @option zIndexOffset: Number = 0
	  		// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
	  		zIndexOffset: 0,

	  		// @option opacity: Number = 1.0
	  		// The opacity of the marker.
	  		opacity: 1,

	  		// @option riseOnHover: Boolean = false
	  		// If `true`, the marker will get on top of others when you hover the mouse over it.
	  		riseOnHover: false,

	  		// @option riseOffset: Number = 250
	  		// The z-index offset used for the `riseOnHover` feature.
	  		riseOffset: 250,

	  		// @option pane: String = 'markerPane'
	  		// `Map pane` where the markers icon will be added.
	  		pane: 'markerPane',

	  		// @option shadowPane: String = 'shadowPane'
	  		// `Map pane` where the markers shadow will be added.
	  		shadowPane: 'shadowPane',

	  		// @option bubblingMouseEvents: Boolean = false
	  		// When `true`, a mouse event on this marker will trigger the same event on the map
	  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
	  		bubblingMouseEvents: false,

	  		// @section Draggable marker options
	  		// @option draggable: Boolean = false
	  		// Whether the marker is draggable with mouse/touch or not.
	  		draggable: false,

	  		// @option autoPan: Boolean = false
	  		// Whether to pan the map when dragging this marker near its edge or not.
	  		autoPan: false,

	  		// @option autoPanPadding: Point = Point(50, 50)
	  		// Distance (in pixels to the left/right and to the top/bottom) of the
	  		// map edge to start panning the map.
	  		autoPanPadding: [50, 50],

	  		// @option autoPanSpeed: Number = 10
	  		// Number of pixels the map should pan by.
	  		autoPanSpeed: 10
	  	},

	  	/* @section
	  	 *
	  	 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
	  	 */

	  	initialize: function (latlng, options) {
	  		setOptions(this, options);
	  		this._latlng = toLatLng(latlng);
	  	},

	  	onAdd: function (map) {
	  		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

	  		if (this._zoomAnimated) {
	  			map.on('zoomanim', this._animateZoom, this);
	  		}

	  		this._initIcon();
	  		this.update();
	  	},

	  	onRemove: function (map) {
	  		if (this.dragging && this.dragging.enabled()) {
	  			this.options.draggable = true;
	  			this.dragging.removeHooks();
	  		}
	  		delete this.dragging;

	  		if (this._zoomAnimated) {
	  			map.off('zoomanim', this._animateZoom, this);
	  		}

	  		this._removeIcon();
	  		this._removeShadow();
	  	},

	  	getEvents: function () {
	  		return {
	  			zoom: this.update,
	  			viewreset: this.update
	  		};
	  	},

	  	// @method getLatLng: LatLng
	  	// Returns the current geographical position of the marker.
	  	getLatLng: function () {
	  		return this._latlng;
	  	},

	  	// @method setLatLng(latlng: LatLng): this
	  	// Changes the marker position to the given point.
	  	setLatLng: function (latlng) {
	  		var oldLatLng = this._latlng;
	  		this._latlng = toLatLng(latlng);
	  		this.update();

	  		// @event move: Event
	  		// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
	  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
	  	},

	  	// @method setZIndexOffset(offset: Number): this
	  	// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
	  	setZIndexOffset: function (offset) {
	  		this.options.zIndexOffset = offset;
	  		return this.update();
	  	},

	  	// @method getIcon: Icon
	  	// Returns the current icon used by the marker
	  	getIcon: function () {
	  		return this.options.icon;
	  	},

	  	// @method setIcon(icon: Icon): this
	  	// Changes the marker icon.
	  	setIcon: function (icon) {

	  		this.options.icon = icon;

	  		if (this._map) {
	  			this._initIcon();
	  			this.update();
	  		}

	  		if (this._popup) {
	  			this.bindPopup(this._popup, this._popup.options);
	  		}

	  		return this;
	  	},

	  	getElement: function () {
	  		return this._icon;
	  	},

	  	update: function () {

	  		if (this._icon && this._map) {
	  			var pos = this._map.latLngToLayerPoint(this._latlng).round();
	  			this._setPos(pos);
	  		}

	  		return this;
	  	},

	  	_initIcon: function () {
	  		var options = this.options,
	  		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

	  		var icon = options.icon.createIcon(this._icon),
	  		    addIcon = false;

	  		// if we're not reusing the icon, remove the old one and init new one
	  		if (icon !== this._icon) {
	  			if (this._icon) {
	  				this._removeIcon();
	  			}
	  			addIcon = true;

	  			if (options.title) {
	  				icon.title = options.title;
	  			}

	  			if (icon.tagName === 'IMG') {
	  				icon.alt = options.alt || '';
	  			}
	  		}

	  		addClass(icon, classToAdd);

	  		if (options.keyboard) {
	  			icon.tabIndex = '0';
	  		}

	  		this._icon = icon;

	  		if (options.riseOnHover) {
	  			this.on({
	  				mouseover: this._bringToFront,
	  				mouseout: this._resetZIndex
	  			});
	  		}

	  		var newShadow = options.icon.createShadow(this._shadow),
	  		    addShadow = false;

	  		if (newShadow !== this._shadow) {
	  			this._removeShadow();
	  			addShadow = true;
	  		}

	  		if (newShadow) {
	  			addClass(newShadow, classToAdd);
	  			newShadow.alt = '';
	  		}
	  		this._shadow = newShadow;


	  		if (options.opacity < 1) {
	  			this._updateOpacity();
	  		}


	  		if (addIcon) {
	  			this.getPane().appendChild(this._icon);
	  		}
	  		this._initInteraction();
	  		if (newShadow && addShadow) {
	  			this.getPane(options.shadowPane).appendChild(this._shadow);
	  		}
	  	},

	  	_removeIcon: function () {
	  		if (this.options.riseOnHover) {
	  			this.off({
	  				mouseover: this._bringToFront,
	  				mouseout: this._resetZIndex
	  			});
	  		}

	  		remove(this._icon);
	  		this.removeInteractiveTarget(this._icon);

	  		this._icon = null;
	  	},

	  	_removeShadow: function () {
	  		if (this._shadow) {
	  			remove(this._shadow);
	  		}
	  		this._shadow = null;
	  	},

	  	_setPos: function (pos) {

	  		if (this._icon) {
	  			setPosition(this._icon, pos);
	  		}

	  		if (this._shadow) {
	  			setPosition(this._shadow, pos);
	  		}

	  		this._zIndex = pos.y + this.options.zIndexOffset;

	  		this._resetZIndex();
	  	},

	  	_updateZIndex: function (offset) {
	  		if (this._icon) {
	  			this._icon.style.zIndex = this._zIndex + offset;
	  		}
	  	},

	  	_animateZoom: function (opt) {
	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

	  		this._setPos(pos);
	  	},

	  	_initInteraction: function () {

	  		if (!this.options.interactive) { return; }

	  		addClass(this._icon, 'leaflet-interactive');

	  		this.addInteractiveTarget(this._icon);

	  		if (MarkerDrag) {
	  			var draggable = this.options.draggable;
	  			if (this.dragging) {
	  				draggable = this.dragging.enabled();
	  				this.dragging.disable();
	  			}

	  			this.dragging = new MarkerDrag(this);

	  			if (draggable) {
	  				this.dragging.enable();
	  			}
	  		}
	  	},

	  	// @method setOpacity(opacity: Number): this
	  	// Changes the opacity of the marker.
	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;
	  		if (this._map) {
	  			this._updateOpacity();
	  		}

	  		return this;
	  	},

	  	_updateOpacity: function () {
	  		var opacity = this.options.opacity;

	  		if (this._icon) {
	  			setOpacity(this._icon, opacity);
	  		}

	  		if (this._shadow) {
	  			setOpacity(this._shadow, opacity);
	  		}
	  	},

	  	_bringToFront: function () {
	  		this._updateZIndex(this.options.riseOffset);
	  	},

	  	_resetZIndex: function () {
	  		this._updateZIndex(0);
	  	},

	  	_getPopupAnchor: function () {
	  		return this.options.icon.options.popupAnchor;
	  	},

	  	_getTooltipAnchor: function () {
	  		return this.options.icon.options.tooltipAnchor;
	  	}
	  });


	  // factory L.marker(latlng: LatLng, options? : Marker options)

	  // @factory L.marker(latlng: LatLng, options? : Marker options)
	  // Instantiates a Marker object given a geographical point and optionally an options object.
	  function marker(latlng, options) {
	  	return new Marker(latlng, options);
	  }

	  /*
	   * @class Path
	   * @aka L.Path
	   * @inherits Interactive layer
	   *
	   * An abstract class that contains options and constants shared between vector
	   * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
	   */

	  var Path = Layer.extend({

	  	// @section
	  	// @aka Path options
	  	options: {
	  		// @option stroke: Boolean = true
	  		// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
	  		stroke: true,

	  		// @option color: String = '#3388ff'
	  		// Stroke color
	  		color: '#3388ff',

	  		// @option weight: Number = 3
	  		// Stroke width in pixels
	  		weight: 3,

	  		// @option opacity: Number = 1.0
	  		// Stroke opacity
	  		opacity: 1,

	  		// @option lineCap: String= 'round'
	  		// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
	  		lineCap: 'round',

	  		// @option lineJoin: String = 'round'
	  		// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
	  		lineJoin: 'round',

	  		// @option dashArray: String = null
	  		// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
	  		dashArray: null,

	  		// @option dashOffset: String = null
	  		// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
	  		dashOffset: null,

	  		// @option fill: Boolean = depends
	  		// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
	  		fill: false,

	  		// @option fillColor: String = *
	  		// Fill color. Defaults to the value of the [`color`](#path-color) option
	  		fillColor: null,

	  		// @option fillOpacity: Number = 0.2
	  		// Fill opacity.
	  		fillOpacity: 0.2,

	  		// @option fillRule: String = 'evenodd'
	  		// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
	  		fillRule: 'evenodd',

	  		// className: '',

	  		// Option inherited from "Interactive layer" abstract class
	  		interactive: true,

	  		// @option bubblingMouseEvents: Boolean = true
	  		// When `true`, a mouse event on this path will trigger the same event on the map
	  		// (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
	  		bubblingMouseEvents: true
	  	},

	  	beforeAdd: function (map) {
	  		// Renderer is set here because we need to call renderer.getEvents
	  		// before this.getEvents.
	  		this._renderer = map.getRenderer(this);
	  	},

	  	onAdd: function () {
	  		this._renderer._initPath(this);
	  		this._reset();
	  		this._renderer._addPath(this);
	  	},

	  	onRemove: function () {
	  		this._renderer._removePath(this);
	  	},

	  	// @method redraw(): this
	  	// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
	  	redraw: function () {
	  		if (this._map) {
	  			this._renderer._updatePath(this);
	  		}
	  		return this;
	  	},

	  	// @method setStyle(style: Path options): this
	  	// Changes the appearance of a Path based on the options in the `Path options` object.
	  	setStyle: function (style) {
	  		setOptions(this, style);
	  		if (this._renderer) {
	  			this._renderer._updateStyle(this);
	  			if (this.options.stroke && style && Object.prototype.hasOwnProperty.call(style, 'weight')) {
	  				this._updateBounds();
	  			}
	  		}
	  		return this;
	  	},

	  	// @method bringToFront(): this
	  	// Brings the layer to the top of all path layers.
	  	bringToFront: function () {
	  		if (this._renderer) {
	  			this._renderer._bringToFront(this);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack(): this
	  	// Brings the layer to the bottom of all path layers.
	  	bringToBack: function () {
	  		if (this._renderer) {
	  			this._renderer._bringToBack(this);
	  		}
	  		return this;
	  	},

	  	getElement: function () {
	  		return this._path;
	  	},

	  	_reset: function () {
	  		// defined in child classes
	  		this._project();
	  		this._update();
	  	},

	  	_clickTolerance: function () {
	  		// used when doing hit detection for Canvas layers
	  		return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance;
	  	}
	  });

	  /*
	   * @class CircleMarker
	   * @aka L.CircleMarker
	   * @inherits Path
	   *
	   * A circle of a fixed size with radius specified in pixels. Extends `Path`.
	   */

	  var CircleMarker = Path.extend({

	  	// @section
	  	// @aka CircleMarker options
	  	options: {
	  		fill: true,

	  		// @option radius: Number = 10
	  		// Radius of the circle marker, in pixels
	  		radius: 10
	  	},

	  	initialize: function (latlng, options) {
	  		setOptions(this, options);
	  		this._latlng = toLatLng(latlng);
	  		this._radius = this.options.radius;
	  	},

	  	// @method setLatLng(latLng: LatLng): this
	  	// Sets the position of a circle marker to a new location.
	  	setLatLng: function (latlng) {
	  		var oldLatLng = this._latlng;
	  		this._latlng = toLatLng(latlng);
	  		this.redraw();

	  		// @event move: Event
	  		// Fired when the marker is moved via [`setLatLng`](#circlemarker-setlatlng). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
	  		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
	  	},

	  	// @method getLatLng(): LatLng
	  	// Returns the current geographical position of the circle marker
	  	getLatLng: function () {
	  		return this._latlng;
	  	},

	  	// @method setRadius(radius: Number): this
	  	// Sets the radius of a circle marker. Units are in pixels.
	  	setRadius: function (radius) {
	  		this.options.radius = this._radius = radius;
	  		return this.redraw();
	  	},

	  	// @method getRadius(): Number
	  	// Returns the current radius of the circle
	  	getRadius: function () {
	  		return this._radius;
	  	},

	  	setStyle : function (options) {
	  		var radius = options && options.radius || this._radius;
	  		Path.prototype.setStyle.call(this, options);
	  		this.setRadius(radius);
	  		return this;
	  	},

	  	_project: function () {
	  		this._point = this._map.latLngToLayerPoint(this._latlng);
	  		this._updateBounds();
	  	},

	  	_updateBounds: function () {
	  		var r = this._radius,
	  		    r2 = this._radiusY || r,
	  		    w = this._clickTolerance(),
	  		    p = [r + w, r2 + w];
	  		this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
	  	},

	  	_update: function () {
	  		if (this._map) {
	  			this._updatePath();
	  		}
	  	},

	  	_updatePath: function () {
	  		this._renderer._updateCircle(this);
	  	},

	  	_empty: function () {
	  		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	  	},

	  	// Needed by the `Canvas` renderer for interactivity
	  	_containsPoint: function (p) {
	  		return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
	  	}
	  });


	  // @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
	  // Instantiates a circle marker object given a geographical point, and an optional options object.
	  function circleMarker(latlng, options) {
	  	return new CircleMarker(latlng, options);
	  }

	  /*
	   * @class Circle
	   * @aka L.Circle
	   * @inherits CircleMarker
	   *
	   * A class for drawing circle overlays on a map. Extends `CircleMarker`.
	   *
	   * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
	   *
	   * @example
	   *
	   * ```js
	   * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
	   * ```
	   */

	  var Circle = CircleMarker.extend({

	  	initialize: function (latlng, options, legacyOptions) {
	  		if (typeof options === 'number') {
	  			// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
	  			options = extend({}, legacyOptions, {radius: options});
	  		}
	  		setOptions(this, options);
	  		this._latlng = toLatLng(latlng);

	  		if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }

	  		// @section
	  		// @aka Circle options
	  		// @option radius: Number; Radius of the circle, in meters.
	  		this._mRadius = this.options.radius;
	  	},

	  	// @method setRadius(radius: Number): this
	  	// Sets the radius of a circle. Units are in meters.
	  	setRadius: function (radius) {
	  		this._mRadius = radius;
	  		return this.redraw();
	  	},

	  	// @method getRadius(): Number
	  	// Returns the current radius of a circle. Units are in meters.
	  	getRadius: function () {
	  		return this._mRadius;
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the `LatLngBounds` of the path.
	  	getBounds: function () {
	  		var half = [this._radius, this._radiusY || this._radius];

	  		return new LatLngBounds(
	  			this._map.layerPointToLatLng(this._point.subtract(half)),
	  			this._map.layerPointToLatLng(this._point.add(half)));
	  	},

	  	setStyle: Path.prototype.setStyle,

	  	_project: function () {

	  		var lng = this._latlng.lng,
	  		    lat = this._latlng.lat,
	  		    map = this._map,
	  		    crs = map.options.crs;

	  		if (crs.distance === Earth.distance) {
	  			var d = Math.PI / 180,
	  			    latR = (this._mRadius / Earth.R) / d,
	  			    top = map.project([lat + latR, lng]),
	  			    bottom = map.project([lat - latR, lng]),
	  			    p = top.add(bottom).divideBy(2),
	  			    lat2 = map.unproject(p).lat,
	  			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
	  			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

	  			if (isNaN(lngR) || lngR === 0) {
	  				lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
	  			}

	  			this._point = p.subtract(map.getPixelOrigin());
	  			this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
	  			this._radiusY = p.y - top.y;

	  		} else {
	  			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

	  			this._point = map.latLngToLayerPoint(this._latlng);
	  			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
	  		}

	  		this._updateBounds();
	  	}
	  });

	  // @factory L.circle(latlng: LatLng, options?: Circle options)
	  // Instantiates a circle object given a geographical point, and an options object
	  // which contains the circle radius.
	  // @alternative
	  // @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
	  // Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
	  // Do not use in new applications or plugins.
	  function circle(latlng, options, legacyOptions) {
	  	return new Circle(latlng, options, legacyOptions);
	  }

	  /*
	   * @class Polyline
	   * @aka L.Polyline
	   * @inherits Path
	   *
	   * A class for drawing polyline overlays on a map. Extends `Path`.
	   *
	   * @example
	   *
	   * ```js
	   * // create a red polyline from an array of LatLng points
	   * var latlngs = [
	   * 	[45.51, -122.68],
	   * 	[37.77, -122.43],
	   * 	[34.04, -118.2]
	   * ];
	   *
	   * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
	   *
	   * // zoom the map to the polyline
	   * map.fitBounds(polyline.getBounds());
	   * ```
	   *
	   * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
	   *
	   * ```js
	   * // create a red polyline from an array of arrays of LatLng points
	   * var latlngs = [
	   * 	[[45.51, -122.68],
	   * 	 [37.77, -122.43],
	   * 	 [34.04, -118.2]],
	   * 	[[40.78, -73.91],
	   * 	 [41.83, -87.62],
	   * 	 [32.76, -96.72]]
	   * ];
	   * ```
	   */


	  var Polyline = Path.extend({

	  	// @section
	  	// @aka Polyline options
	  	options: {
	  		// @option smoothFactor: Number = 1.0
	  		// How much to simplify the polyline on each zoom level. More means
	  		// better performance and smoother look, and less means more accurate representation.
	  		smoothFactor: 1.0,

	  		// @option noClip: Boolean = false
	  		// Disable polyline clipping.
	  		noClip: false
	  	},

	  	initialize: function (latlngs, options) {
	  		setOptions(this, options);
	  		this._setLatLngs(latlngs);
	  	},

	  	// @method getLatLngs(): LatLng[]
	  	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
	  	getLatLngs: function () {
	  		return this._latlngs;
	  	},

	  	// @method setLatLngs(latlngs: LatLng[]): this
	  	// Replaces all the points in the polyline with the given array of geographical points.
	  	setLatLngs: function (latlngs) {
	  		this._setLatLngs(latlngs);
	  		return this.redraw();
	  	},

	  	// @method isEmpty(): Boolean
	  	// Returns `true` if the Polyline has no LatLngs.
	  	isEmpty: function () {
	  		return !this._latlngs.length;
	  	},

	  	// @method closestLayerPoint(p: Point): Point
	  	// Returns the point closest to `p` on the Polyline.
	  	closestLayerPoint: function (p) {
	  		var minDistance = Infinity,
	  		    minPoint = null,
	  		    closest = _sqClosestPointOnSegment,
	  		    p1, p2;

	  		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
	  			var points = this._parts[j];

	  			for (var i = 1, len = points.length; i < len; i++) {
	  				p1 = points[i - 1];
	  				p2 = points[i];

	  				var sqDist = closest(p, p1, p2, true);

	  				if (sqDist < minDistance) {
	  					minDistance = sqDist;
	  					minPoint = closest(p, p1, p2);
	  				}
	  			}
	  		}
	  		if (minPoint) {
	  			minPoint.distance = Math.sqrt(minDistance);
	  		}
	  		return minPoint;
	  	},

	  	// @method getCenter(): LatLng
	  	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
	  	getCenter: function () {
	  		// throws error when not yet added to map as this center calculation requires projected coordinates
	  		if (!this._map) {
	  			throw new Error('Must add layer to map before using getCenter()');
	  		}

	  		var i, halfDist, segDist, dist, p1, p2, ratio,
	  		    points = this._rings[0],
	  		    len = points.length;

	  		if (!len) { return null; }

	  		// polyline centroid algorithm; only uses the first ring if there are multiple

	  		for (i = 0, halfDist = 0; i < len - 1; i++) {
	  			halfDist += points[i].distanceTo(points[i + 1]) / 2;
	  		}

	  		// The line is so small in the current view that all points are on the same pixel.
	  		if (halfDist === 0) {
	  			return this._map.layerPointToLatLng(points[0]);
	  		}

	  		for (i = 0, dist = 0; i < len - 1; i++) {
	  			p1 = points[i];
	  			p2 = points[i + 1];
	  			segDist = p1.distanceTo(p2);
	  			dist += segDist;

	  			if (dist > halfDist) {
	  				ratio = (dist - halfDist) / segDist;
	  				return this._map.layerPointToLatLng([
	  					p2.x - ratio * (p2.x - p1.x),
	  					p2.y - ratio * (p2.y - p1.y)
	  				]);
	  			}
	  		}
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Returns the `LatLngBounds` of the path.
	  	getBounds: function () {
	  		return this._bounds;
	  	},

	  	// @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
	  	// Adds a given point to the polyline. By default, adds to the first ring of
	  	// the polyline in case of a multi-polyline, but can be overridden by passing
	  	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
	  	addLatLng: function (latlng, latlngs) {
	  		latlngs = latlngs || this._defaultShape();
	  		latlng = toLatLng(latlng);
	  		latlngs.push(latlng);
	  		this._bounds.extend(latlng);
	  		return this.redraw();
	  	},

	  	_setLatLngs: function (latlngs) {
	  		this._bounds = new LatLngBounds();
	  		this._latlngs = this._convertLatLngs(latlngs);
	  	},

	  	_defaultShape: function () {
	  		return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
	  	},

	  	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
	  	_convertLatLngs: function (latlngs) {
	  		var result = [],
	  		    flat = isFlat(latlngs);

	  		for (var i = 0, len = latlngs.length; i < len; i++) {
	  			if (flat) {
	  				result[i] = toLatLng(latlngs[i]);
	  				this._bounds.extend(result[i]);
	  			} else {
	  				result[i] = this._convertLatLngs(latlngs[i]);
	  			}
	  		}

	  		return result;
	  	},

	  	_project: function () {
	  		var pxBounds = new Bounds();
	  		this._rings = [];
	  		this._projectLatlngs(this._latlngs, this._rings, pxBounds);

	  		if (this._bounds.isValid() && pxBounds.isValid()) {
	  			this._rawPxBounds = pxBounds;
	  			this._updateBounds();
	  		}
	  	},

	  	_updateBounds: function () {
	  		var w = this._clickTolerance(),
	  		    p = new Point(w, w);
	  		this._pxBounds = new Bounds([
	  			this._rawPxBounds.min.subtract(p),
	  			this._rawPxBounds.max.add(p)
	  		]);
	  	},

	  	// recursively turns latlngs into a set of rings with projected coordinates
	  	_projectLatlngs: function (latlngs, result, projectedBounds) {
	  		var flat = latlngs[0] instanceof LatLng,
	  		    len = latlngs.length,
	  		    i, ring;

	  		if (flat) {
	  			ring = [];
	  			for (i = 0; i < len; i++) {
	  				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
	  				projectedBounds.extend(ring[i]);
	  			}
	  			result.push(ring);
	  		} else {
	  			for (i = 0; i < len; i++) {
	  				this._projectLatlngs(latlngs[i], result, projectedBounds);
	  			}
	  		}
	  	},

	  	// clip polyline by renderer bounds so that we have less to render for performance
	  	_clipPoints: function () {
	  		var bounds = this._renderer._bounds;

	  		this._parts = [];
	  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
	  			return;
	  		}

	  		if (this.options.noClip) {
	  			this._parts = this._rings;
	  			return;
	  		}

	  		var parts = this._parts,
	  		    i, j, k, len, len2, segment, points;

	  		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
	  			points = this._rings[i];

	  			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
	  				segment = clipSegment(points[j], points[j + 1], bounds, j, true);

	  				if (!segment) { continue; }

	  				parts[k] = parts[k] || [];
	  				parts[k].push(segment[0]);

	  				// if segment goes out of screen, or it's the last one, it's the end of the line part
	  				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
	  					parts[k].push(segment[1]);
	  					k++;
	  				}
	  			}
	  		}
	  	},

	  	// simplify each clipped part of the polyline for performance
	  	_simplifyPoints: function () {
	  		var parts = this._parts,
	  		    tolerance = this.options.smoothFactor;

	  		for (var i = 0, len = parts.length; i < len; i++) {
	  			parts[i] = simplify(parts[i], tolerance);
	  		}
	  	},

	  	_update: function () {
	  		if (!this._map) { return; }

	  		this._clipPoints();
	  		this._simplifyPoints();
	  		this._updatePath();
	  	},

	  	_updatePath: function () {
	  		this._renderer._updatePoly(this);
	  	},

	  	// Needed by the `Canvas` renderer for interactivity
	  	_containsPoint: function (p, closed) {
	  		var i, j, k, len, len2, part,
	  		    w = this._clickTolerance();

	  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

	  		// hit detection for polylines
	  		for (i = 0, len = this._parts.length; i < len; i++) {
	  			part = this._parts[i];

	  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
	  				if (!closed && (j === 0)) { continue; }

	  				if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
	  					return true;
	  				}
	  			}
	  		}
	  		return false;
	  	}
	  });

	  // @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
	  // Instantiates a polyline object given an array of geographical points and
	  // optionally an options object. You can create a `Polyline` object with
	  // multiple separate lines (`MultiPolyline`) by passing an array of arrays
	  // of geographic points.
	  function polyline(latlngs, options) {
	  	return new Polyline(latlngs, options);
	  }

	  // Retrocompat. Allow plugins to support Leaflet versions before and after 1.1.
	  Polyline._flat = _flat;

	  /*
	   * @class Polygon
	   * @aka L.Polygon
	   * @inherits Polyline
	   *
	   * A class for drawing polygon overlays on a map. Extends `Polyline`.
	   *
	   * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
	   *
	   *
	   * @example
	   *
	   * ```js
	   * // create a red polygon from an array of LatLng points
	   * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
	   *
	   * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
	   *
	   * // zoom the map to the polygon
	   * map.fitBounds(polygon.getBounds());
	   * ```
	   *
	   * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
	   *
	   * ```js
	   * var latlngs = [
	   *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
	   *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
	   * ];
	   * ```
	   *
	   * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
	   *
	   * ```js
	   * var latlngs = [
	   *   [ // first polygon
	   *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
	   *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
	   *   ],
	   *   [ // second polygon
	   *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
	   *   ]
	   * ];
	   * ```
	   */

	  var Polygon = Polyline.extend({

	  	options: {
	  		fill: true
	  	},

	  	isEmpty: function () {
	  		return !this._latlngs.length || !this._latlngs[0].length;
	  	},

	  	getCenter: function () {
	  		// throws error when not yet added to map as this center calculation requires projected coordinates
	  		if (!this._map) {
	  			throw new Error('Must add layer to map before using getCenter()');
	  		}

	  		var i, j, p1, p2, f, area, x, y, center,
	  		    points = this._rings[0],
	  		    len = points.length;

	  		if (!len) { return null; }

	  		// polygon centroid algorithm; only uses the first ring if there are multiple

	  		area = x = y = 0;

	  		for (i = 0, j = len - 1; i < len; j = i++) {
	  			p1 = points[i];
	  			p2 = points[j];

	  			f = p1.y * p2.x - p2.y * p1.x;
	  			x += (p1.x + p2.x) * f;
	  			y += (p1.y + p2.y) * f;
	  			area += f * 3;
	  		}

	  		if (area === 0) {
	  			// Polygon is so small that all points are on same pixel.
	  			center = points[0];
	  		} else {
	  			center = [x / area, y / area];
	  		}
	  		return this._map.layerPointToLatLng(center);
	  	},

	  	_convertLatLngs: function (latlngs) {
	  		var result = Polyline.prototype._convertLatLngs.call(this, latlngs),
	  		    len = result.length;

	  		// remove last point if it equals first one
	  		if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
	  			result.pop();
	  		}
	  		return result;
	  	},

	  	_setLatLngs: function (latlngs) {
	  		Polyline.prototype._setLatLngs.call(this, latlngs);
	  		if (isFlat(this._latlngs)) {
	  			this._latlngs = [this._latlngs];
	  		}
	  	},

	  	_defaultShape: function () {
	  		return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
	  	},

	  	_clipPoints: function () {
	  		// polygons need a different clipping algorithm so we redefine that

	  		var bounds = this._renderer._bounds,
	  		    w = this.options.weight,
	  		    p = new Point(w, w);

	  		// increase clip padding by stroke width to avoid stroke on clip edges
	  		bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));

	  		this._parts = [];
	  		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
	  			return;
	  		}

	  		if (this.options.noClip) {
	  			this._parts = this._rings;
	  			return;
	  		}

	  		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
	  			clipped = clipPolygon(this._rings[i], bounds, true);
	  			if (clipped.length) {
	  				this._parts.push(clipped);
	  			}
	  		}
	  	},

	  	_updatePath: function () {
	  		this._renderer._updatePoly(this, true);
	  	},

	  	// Needed by the `Canvas` renderer for interactivity
	  	_containsPoint: function (p) {
	  		var inside = false,
	  		    part, p1, p2, i, j, k, len, len2;

	  		if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

	  		// ray casting algorithm for detecting if point is in polygon
	  		for (i = 0, len = this._parts.length; i < len; i++) {
	  			part = this._parts[i];

	  			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
	  				p1 = part[j];
	  				p2 = part[k];

	  				if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
	  					inside = !inside;
	  				}
	  			}
	  		}

	  		// also check if it's on polygon stroke
	  		return inside || Polyline.prototype._containsPoint.call(this, p, true);
	  	}

	  });


	  // @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
	  function polygon(latlngs, options) {
	  	return new Polygon(latlngs, options);
	  }

	  /*
	   * @class GeoJSON
	   * @aka L.GeoJSON
	   * @inherits FeatureGroup
	   *
	   * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
	   * GeoJSON data and display it on the map. Extends `FeatureGroup`.
	   *
	   * @example
	   *
	   * ```js
	   * L.geoJSON(data, {
	   * 	style: function (feature) {
	   * 		return {color: feature.properties.color};
	   * 	}
	   * }).bindPopup(function (layer) {
	   * 	return layer.feature.properties.description;
	   * }).addTo(map);
	   * ```
	   */

	  var GeoJSON = FeatureGroup.extend({

	  	/* @section
	  	 * @aka GeoJSON options
	  	 *
	  	 * @option pointToLayer: Function = *
	  	 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
	  	 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
	  	 * The default is to spawn a default `Marker`:
	  	 * ```js
	  	 * function(geoJsonPoint, latlng) {
	  	 * 	return L.marker(latlng);
	  	 * }
	  	 * ```
	  	 *
	  	 * @option style: Function = *
	  	 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
	  	 * called internally when data is added.
	  	 * The default value is to not override any defaults:
	  	 * ```js
	  	 * function (geoJsonFeature) {
	  	 * 	return {}
	  	 * }
	  	 * ```
	  	 *
	  	 * @option onEachFeature: Function = *
	  	 * A `Function` that will be called once for each created `Feature`, after it has
	  	 * been created and styled. Useful for attaching events and popups to features.
	  	 * The default is to do nothing with the newly created layers:
	  	 * ```js
	  	 * function (feature, layer) {}
	  	 * ```
	  	 *
	  	 * @option filter: Function = *
	  	 * A `Function` that will be used to decide whether to include a feature or not.
	  	 * The default is to include all features:
	  	 * ```js
	  	 * function (geoJsonFeature) {
	  	 * 	return true;
	  	 * }
	  	 * ```
	  	 * Note: dynamically changing the `filter` option will have effect only on newly
	  	 * added data. It will _not_ re-evaluate already included features.
	  	 *
	  	 * @option coordsToLatLng: Function = *
	  	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
	  	 * The default is the `coordsToLatLng` static method.
	  	 *
	  	 * @option markersInheritOptions: Boolean = false
	  	 * Whether default Markers for "Point" type Features inherit from group options.
	  	 */

	  	initialize: function (geojson, options) {
	  		setOptions(this, options);

	  		this._layers = {};

	  		if (geojson) {
	  			this.addData(geojson);
	  		}
	  	},

	  	// @method addData( <GeoJSON> data ): this
	  	// Adds a GeoJSON object to the layer.
	  	addData: function (geojson) {
	  		var features = isArray(geojson) ? geojson : geojson.features,
	  		    i, len, feature;

	  		if (features) {
	  			for (i = 0, len = features.length; i < len; i++) {
	  				// only add this if geometry or geometries are set and not null
	  				feature = features[i];
	  				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
	  					this.addData(feature);
	  				}
	  			}
	  			return this;
	  		}

	  		var options = this.options;

	  		if (options.filter && !options.filter(geojson)) { return this; }

	  		var layer = geometryToLayer(geojson, options);
	  		if (!layer) {
	  			return this;
	  		}
	  		layer.feature = asFeature(geojson);

	  		layer.defaultOptions = layer.options;
	  		this.resetStyle(layer);

	  		if (options.onEachFeature) {
	  			options.onEachFeature(geojson, layer);
	  		}

	  		return this.addLayer(layer);
	  	},

	  	// @method resetStyle( <Path> layer? ): this
	  	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
	  	// If `layer` is omitted, the style of all features in the current layer is reset.
	  	resetStyle: function (layer) {
	  		if (layer === undefined) {
	  			return this.eachLayer(this.resetStyle, this);
	  		}
	  		// reset any custom styles
	  		layer.options = extend({}, layer.defaultOptions);
	  		this._setLayerStyle(layer, this.options.style);
	  		return this;
	  	},

	  	// @method setStyle( <Function> style ): this
	  	// Changes styles of GeoJSON vector layers with the given style function.
	  	setStyle: function (style) {
	  		return this.eachLayer(function (layer) {
	  			this._setLayerStyle(layer, style);
	  		}, this);
	  	},

	  	_setLayerStyle: function (layer, style) {
	  		if (layer.setStyle) {
	  			if (typeof style === 'function') {
	  				style = style(layer.feature);
	  			}
	  			layer.setStyle(style);
	  		}
	  	}
	  });

	  // @section
	  // There are several static functions which can be called without instantiating L.GeoJSON:

	  // @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
	  // Creates a `Layer` from a given GeoJSON feature. Can use a custom
	  // [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
	  // functions if provided as options.
	  function geometryToLayer(geojson, options) {

	  	var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
	  	    coords = geometry ? geometry.coordinates : null,
	  	    layers = [],
	  	    pointToLayer = options && options.pointToLayer,
	  	    _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng,
	  	    latlng, latlngs, i, len;

	  	if (!coords && !geometry) {
	  		return null;
	  	}

	  	switch (geometry.type) {
	  	case 'Point':
	  		latlng = _coordsToLatLng(coords);
	  		return _pointToLayer(pointToLayer, geojson, latlng, options);

	  	case 'MultiPoint':
	  		for (i = 0, len = coords.length; i < len; i++) {
	  			latlng = _coordsToLatLng(coords[i]);
	  			layers.push(_pointToLayer(pointToLayer, geojson, latlng, options));
	  		}
	  		return new FeatureGroup(layers);

	  	case 'LineString':
	  	case 'MultiLineString':
	  		latlngs = coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, _coordsToLatLng);
	  		return new Polyline(latlngs, options);

	  	case 'Polygon':
	  	case 'MultiPolygon':
	  		latlngs = coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, _coordsToLatLng);
	  		return new Polygon(latlngs, options);

	  	case 'GeometryCollection':
	  		for (i = 0, len = geometry.geometries.length; i < len; i++) {
	  			var layer = geometryToLayer({
	  				geometry: geometry.geometries[i],
	  				type: 'Feature',
	  				properties: geojson.properties
	  			}, options);

	  			if (layer) {
	  				layers.push(layer);
	  			}
	  		}
	  		return new FeatureGroup(layers);

	  	default:
	  		throw new Error('Invalid GeoJSON object.');
	  	}
	  }

	  function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
	  	return pointToLayerFn ?
	  		pointToLayerFn(geojson, latlng) :
	  		new Marker(latlng, options && options.markersInheritOptions && options);
	  }

	  // @function coordsToLatLng(coords: Array): LatLng
	  // Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
	  // or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
	  function coordsToLatLng(coords) {
	  	return new LatLng(coords[1], coords[0], coords[2]);
	  }

	  // @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
	  // Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
	  // `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
	  // Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
	  function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
	  	var latlngs = [];

	  	for (var i = 0, len = coords.length, latlng; i < len; i++) {
	  		latlng = levelsDeep ?
	  			coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) :
	  			(_coordsToLatLng || coordsToLatLng)(coords[i]);

	  		latlngs.push(latlng);
	  	}

	  	return latlngs;
	  }

	  // @function latLngToCoords(latlng: LatLng, precision?: Number): Array
	  // Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
	  function latLngToCoords(latlng, precision) {
	  	precision = typeof precision === 'number' ? precision : 6;
	  	return latlng.alt !== undefined ?
	  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] :
	  		[formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
	  }

	  // @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean): Array
	  // Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
	  // `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
	  function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
	  	var coords = [];

	  	for (var i = 0, len = latlngs.length; i < len; i++) {
	  		coords.push(levelsDeep ?
	  			latLngsToCoords(latlngs[i], levelsDeep - 1, closed, precision) :
	  			latLngToCoords(latlngs[i], precision));
	  	}

	  	if (!levelsDeep && closed) {
	  		coords.push(coords[0]);
	  	}

	  	return coords;
	  }

	  function getFeature(layer, newGeometry) {
	  	return layer.feature ?
	  		extend({}, layer.feature, {geometry: newGeometry}) :
	  		asFeature(newGeometry);
	  }

	  // @function asFeature(geojson: Object): Object
	  // Normalize GeoJSON geometries/features into GeoJSON features.
	  function asFeature(geojson) {
	  	if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
	  		return geojson;
	  	}

	  	return {
	  		type: 'Feature',
	  		properties: {},
	  		geometry: geojson
	  	};
	  }

	  var PointToGeoJSON = {
	  	toGeoJSON: function (precision) {
	  		return getFeature(this, {
	  			type: 'Point',
	  			coordinates: latLngToCoords(this.getLatLng(), precision)
	  		});
	  	}
	  };

	  // @namespace Marker
	  // @section Other methods
	  // @method toGeoJSON(precision?: Number): Object
	  // `precision` is the number of decimal places for coordinates.
	  // The default value is 6 places.
	  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
	  Marker.include(PointToGeoJSON);

	  // @namespace CircleMarker
	  // @method toGeoJSON(precision?: Number): Object
	  // `precision` is the number of decimal places for coordinates.
	  // The default value is 6 places.
	  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
	  Circle.include(PointToGeoJSON);
	  CircleMarker.include(PointToGeoJSON);


	  // @namespace Polyline
	  // @method toGeoJSON(precision?: Number): Object
	  // `precision` is the number of decimal places for coordinates.
	  // The default value is 6 places.
	  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
	  Polyline.include({
	  	toGeoJSON: function (precision) {
	  		var multi = !isFlat(this._latlngs);

	  		var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);

	  		return getFeature(this, {
	  			type: (multi ? 'Multi' : '') + 'LineString',
	  			coordinates: coords
	  		});
	  	}
	  });

	  // @namespace Polygon
	  // @method toGeoJSON(precision?: Number): Object
	  // `precision` is the number of decimal places for coordinates.
	  // The default value is 6 places.
	  // Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
	  Polygon.include({
	  	toGeoJSON: function (precision) {
	  		var holes = !isFlat(this._latlngs),
	  		    multi = holes && !isFlat(this._latlngs[0]);

	  		var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);

	  		if (!holes) {
	  			coords = [coords];
	  		}

	  		return getFeature(this, {
	  			type: (multi ? 'Multi' : '') + 'Polygon',
	  			coordinates: coords
	  		});
	  	}
	  });


	  // @namespace LayerGroup
	  LayerGroup.include({
	  	toMultiPoint: function (precision) {
	  		var coords = [];

	  		this.eachLayer(function (layer) {
	  			coords.push(layer.toGeoJSON(precision).geometry.coordinates);
	  		});

	  		return getFeature(this, {
	  			type: 'MultiPoint',
	  			coordinates: coords
	  		});
	  	},

	  	// @method toGeoJSON(precision?: Number): Object
	  	// `precision` is the number of decimal places for coordinates.
	  	// The default value is 6 places.
	  	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
	  	toGeoJSON: function (precision) {

	  		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

	  		if (type === 'MultiPoint') {
	  			return this.toMultiPoint(precision);
	  		}

	  		var isGeometryCollection = type === 'GeometryCollection',
	  		    jsons = [];

	  		this.eachLayer(function (layer) {
	  			if (layer.toGeoJSON) {
	  				var json = layer.toGeoJSON(precision);
	  				if (isGeometryCollection) {
	  					jsons.push(json.geometry);
	  				} else {
	  					var feature = asFeature(json);
	  					// Squash nested feature collections
	  					if (feature.type === 'FeatureCollection') {
	  						jsons.push.apply(jsons, feature.features);
	  					} else {
	  						jsons.push(feature);
	  					}
	  				}
	  			}
	  		});

	  		if (isGeometryCollection) {
	  			return getFeature(this, {
	  				geometries: jsons,
	  				type: 'GeometryCollection'
	  			});
	  		}

	  		return {
	  			type: 'FeatureCollection',
	  			features: jsons
	  		};
	  	}
	  });

	  // @namespace GeoJSON
	  // @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
	  // Creates a GeoJSON layer. Optionally accepts an object in
	  // [GeoJSON format](https://tools.ietf.org/html/rfc7946) to display on the map
	  // (you can alternatively add it later with `addData` method) and an `options` object.
	  function geoJSON(geojson, options) {
	  	return new GeoJSON(geojson, options);
	  }

	  // Backward compatibility.
	  var geoJson = geoJSON;

	  /*
	   * @class ImageOverlay
	   * @aka L.ImageOverlay
	   * @inherits Interactive layer
	   *
	   * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
	   *
	   * @example
	   *
	   * ```js
	   * var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
	   * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
	   * L.imageOverlay(imageUrl, imageBounds).addTo(map);
	   * ```
	   */

	  var ImageOverlay = Layer.extend({

	  	// @section
	  	// @aka ImageOverlay options
	  	options: {
	  		// @option opacity: Number = 1.0
	  		// The opacity of the image overlay.
	  		opacity: 1,

	  		// @option alt: String = ''
	  		// Text for the `alt` attribute of the image (useful for accessibility).
	  		alt: '',

	  		// @option interactive: Boolean = false
	  		// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
	  		interactive: false,

	  		// @option crossOrigin: Boolean|String = false
	  		// Whether the crossOrigin attribute will be added to the image.
	  		// If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
	  		crossOrigin: false,

	  		// @option errorOverlayUrl: String = ''
	  		// URL to the overlay image to show in place of the overlay that failed to load.
	  		errorOverlayUrl: '',

	  		// @option zIndex: Number = 1
	  		// The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
	  		zIndex: 1,

	  		// @option className: String = ''
	  		// A custom class name to assign to the image. Empty by default.
	  		className: ''
	  	},

	  	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
	  		this._url = url;
	  		this._bounds = toLatLngBounds(bounds);

	  		setOptions(this, options);
	  	},

	  	onAdd: function () {
	  		if (!this._image) {
	  			this._initImage();

	  			if (this.options.opacity < 1) {
	  				this._updateOpacity();
	  			}
	  		}

	  		if (this.options.interactive) {
	  			addClass(this._image, 'leaflet-interactive');
	  			this.addInteractiveTarget(this._image);
	  		}

	  		this.getPane().appendChild(this._image);
	  		this._reset();
	  	},

	  	onRemove: function () {
	  		remove(this._image);
	  		if (this.options.interactive) {
	  			this.removeInteractiveTarget(this._image);
	  		}
	  	},

	  	// @method setOpacity(opacity: Number): this
	  	// Sets the opacity of the overlay.
	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;

	  		if (this._image) {
	  			this._updateOpacity();
	  		}
	  		return this;
	  	},

	  	setStyle: function (styleOpts) {
	  		if (styleOpts.opacity) {
	  			this.setOpacity(styleOpts.opacity);
	  		}
	  		return this;
	  	},

	  	// @method bringToFront(): this
	  	// Brings the layer to the top of all overlays.
	  	bringToFront: function () {
	  		if (this._map) {
	  			toFront(this._image);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack(): this
	  	// Brings the layer to the bottom of all overlays.
	  	bringToBack: function () {
	  		if (this._map) {
	  			toBack(this._image);
	  		}
	  		return this;
	  	},

	  	// @method setUrl(url: String): this
	  	// Changes the URL of the image.
	  	setUrl: function (url) {
	  		this._url = url;

	  		if (this._image) {
	  			this._image.src = url;
	  		}
	  		return this;
	  	},

	  	// @method setBounds(bounds: LatLngBounds): this
	  	// Update the bounds that this ImageOverlay covers
	  	setBounds: function (bounds) {
	  		this._bounds = toLatLngBounds(bounds);

	  		if (this._map) {
	  			this._reset();
	  		}
	  		return this;
	  	},

	  	getEvents: function () {
	  		var events = {
	  			zoom: this._reset,
	  			viewreset: this._reset
	  		};

	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._animateZoom;
	  		}

	  		return events;
	  	},

	  	// @method setZIndex(value: Number): this
	  	// Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
	  	setZIndex: function (value) {
	  		this.options.zIndex = value;
	  		this._updateZIndex();
	  		return this;
	  	},

	  	// @method getBounds(): LatLngBounds
	  	// Get the bounds that this ImageOverlay covers
	  	getBounds: function () {
	  		return this._bounds;
	  	},

	  	// @method getElement(): HTMLElement
	  	// Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
	  	// used by this overlay.
	  	getElement: function () {
	  		return this._image;
	  	},

	  	_initImage: function () {
	  		var wasElementSupplied = this._url.tagName === 'IMG';
	  		var img = this._image = wasElementSupplied ? this._url : create$1('img');

	  		addClass(img, 'leaflet-image-layer');
	  		if (this._zoomAnimated) { addClass(img, 'leaflet-zoom-animated'); }
	  		if (this.options.className) { addClass(img, this.options.className); }

	  		img.onselectstart = falseFn;
	  		img.onmousemove = falseFn;

	  		// @event load: Event
	  		// Fired when the ImageOverlay layer has loaded its image
	  		img.onload = bind(this.fire, this, 'load');
	  		img.onerror = bind(this._overlayOnError, this, 'error');

	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
	  			img.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
	  		}

	  		if (this.options.zIndex) {
	  			this._updateZIndex();
	  		}

	  		if (wasElementSupplied) {
	  			this._url = img.src;
	  			return;
	  		}

	  		img.src = this._url;
	  		img.alt = this.options.alt;
	  	},

	  	_animateZoom: function (e) {
	  		var scale = this._map.getZoomScale(e.zoom),
	  		    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

	  		setTransform(this._image, offset, scale);
	  	},

	  	_reset: function () {
	  		var image = this._image,
	  		    bounds = new Bounds(
	  		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
	  		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
	  		    size = bounds.getSize();

	  		setPosition(image, bounds.min);

	  		image.style.width  = size.x + 'px';
	  		image.style.height = size.y + 'px';
	  	},

	  	_updateOpacity: function () {
	  		setOpacity(this._image, this.options.opacity);
	  	},

	  	_updateZIndex: function () {
	  		if (this._image && this.options.zIndex !== undefined && this.options.zIndex !== null) {
	  			this._image.style.zIndex = this.options.zIndex;
	  		}
	  	},

	  	_overlayOnError: function () {
	  		// @event error: Event
	  		// Fired when the ImageOverlay layer fails to load its image
	  		this.fire('error');

	  		var errorUrl = this.options.errorOverlayUrl;
	  		if (errorUrl && this._url !== errorUrl) {
	  			this._url = errorUrl;
	  			this._image.src = errorUrl;
	  		}
	  	}
	  });

	  // @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
	  // Instantiates an image overlay object given the URL of the image and the
	  // geographical bounds it is tied to.
	  var imageOverlay = function (url, bounds, options) {
	  	return new ImageOverlay(url, bounds, options);
	  };

	  /*
	   * @class VideoOverlay
	   * @aka L.VideoOverlay
	   * @inherits ImageOverlay
	   *
	   * Used to load and display a video player over specific bounds of the map. Extends `ImageOverlay`.
	   *
	   * A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video)
	   * HTML5 element.
	   *
	   * @example
	   *
	   * ```js
	   * var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
	   * 	videoBounds = [[ 32, -130], [ 13, -100]];
	   * L.videoOverlay(videoUrl, videoBounds ).addTo(map);
	   * ```
	   */

	  var VideoOverlay = ImageOverlay.extend({

	  	// @section
	  	// @aka VideoOverlay options
	  	options: {
	  		// @option autoplay: Boolean = true
	  		// Whether the video starts playing automatically when loaded.
	  		autoplay: true,

	  		// @option loop: Boolean = true
	  		// Whether the video will loop back to the beginning when played.
	  		loop: true,

	  		// @option keepAspectRatio: Boolean = true
	  		// Whether the video will save aspect ratio after the projection.
	  		// Relevant for supported browsers. Browser compatibility- https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
	  		keepAspectRatio: true,

	  		// @option muted: Boolean = false
	  		// Whether the video starts on mute when loaded.
	  		muted: false
	  	},

	  	_initImage: function () {
	  		var wasElementSupplied = this._url.tagName === 'VIDEO';
	  		var vid = this._image = wasElementSupplied ? this._url : create$1('video');

	  		addClass(vid, 'leaflet-image-layer');
	  		if (this._zoomAnimated) { addClass(vid, 'leaflet-zoom-animated'); }
	  		if (this.options.className) { addClass(vid, this.options.className); }

	  		vid.onselectstart = falseFn;
	  		vid.onmousemove = falseFn;

	  		// @event load: Event
	  		// Fired when the video has finished loading the first frame
	  		vid.onloadeddata = bind(this.fire, this, 'load');

	  		if (wasElementSupplied) {
	  			var sourceElements = vid.getElementsByTagName('source');
	  			var sources = [];
	  			for (var j = 0; j < sourceElements.length; j++) {
	  				sources.push(sourceElements[j].src);
	  			}

	  			this._url = (sourceElements.length > 0) ? sources : [vid.src];
	  			return;
	  		}

	  		if (!isArray(this._url)) { this._url = [this._url]; }

	  		if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, 'objectFit')) {
	  			vid.style['objectFit'] = 'fill';
	  		}
	  		vid.autoplay = !!this.options.autoplay;
	  		vid.loop = !!this.options.loop;
	  		vid.muted = !!this.options.muted;
	  		for (var i = 0; i < this._url.length; i++) {
	  			var source = create$1('source');
	  			source.src = this._url[i];
	  			vid.appendChild(source);
	  		}
	  	}

	  	// @method getElement(): HTMLVideoElement
	  	// Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
	  	// used by this overlay.
	  });


	  // @factory L.videoOverlay(video: String|Array|HTMLVideoElement, bounds: LatLngBounds, options?: VideoOverlay options)
	  // Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the
	  // geographical bounds it is tied to.

	  function videoOverlay(video, bounds, options) {
	  	return new VideoOverlay(video, bounds, options);
	  }

	  /*
	   * @class SVGOverlay
	   * @aka L.SVGOverlay
	   * @inherits ImageOverlay
	   *
	   * Used to load, display and provide DOM access to an SVG file over specific bounds of the map. Extends `ImageOverlay`.
	   *
	   * An SVG overlay uses the [`<svg>`](https://developer.mozilla.org/docs/Web/SVG/Element/svg) element.
	   *
	   * @example
	   *
	   * ```js
	   * var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	   * svgElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
	   * svgElement.setAttribute('viewBox', "0 0 200 200");
	   * svgElement.innerHTML = '<rect width="200" height="200"/><rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
	   * var svgElementBounds = [ [ 32, -130 ], [ 13, -100 ] ];
	   * L.svgOverlay(svgElement, svgElementBounds).addTo(map);
	   * ```
	   */

	  var SVGOverlay = ImageOverlay.extend({
	  	_initImage: function () {
	  		var el = this._image = this._url;

	  		addClass(el, 'leaflet-image-layer');
	  		if (this._zoomAnimated) { addClass(el, 'leaflet-zoom-animated'); }
	  		if (this.options.className) { addClass(el, this.options.className); }

	  		el.onselectstart = falseFn;
	  		el.onmousemove = falseFn;
	  	}

	  	// @method getElement(): SVGElement
	  	// Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
	  	// used by this overlay.
	  });


	  // @factory L.svgOverlay(svg: String|SVGElement, bounds: LatLngBounds, options?: SVGOverlay options)
	  // Instantiates an image overlay object given an SVG element and the geographical bounds it is tied to.
	  // A viewBox attribute is required on the SVG element to zoom in and out properly.

	  function svgOverlay(el, bounds, options) {
	  	return new SVGOverlay(el, bounds, options);
	  }

	  /*
	   * @class DivOverlay
	   * @inherits Layer
	   * @aka L.DivOverlay
	   * Base model for L.Popup and L.Tooltip. Inherit from it for custom popup like plugins.
	   */

	  // @namespace DivOverlay
	  var DivOverlay = Layer.extend({

	  	// @section
	  	// @aka DivOverlay options
	  	options: {
	  		// @option offset: Point = Point(0, 7)
	  		// The offset of the popup position. Useful to control the anchor
	  		// of the popup when opening it on some overlays.
	  		offset: [0, 7],

	  		// @option className: String = ''
	  		// A custom CSS class name to assign to the popup.
	  		className: '',

	  		// @option pane: String = 'popupPane'
	  		// `Map pane` where the popup will be added.
	  		pane: 'popupPane'
	  	},

	  	initialize: function (options, source) {
	  		setOptions(this, options);

	  		this._source = source;
	  	},

	  	onAdd: function (map) {
	  		this._zoomAnimated = map._zoomAnimated;

	  		if (!this._container) {
	  			this._initLayout();
	  		}

	  		if (map._fadeAnimated) {
	  			setOpacity(this._container, 0);
	  		}

	  		clearTimeout(this._removeTimeout);
	  		this.getPane().appendChild(this._container);
	  		this.update();

	  		if (map._fadeAnimated) {
	  			setOpacity(this._container, 1);
	  		}

	  		this.bringToFront();
	  	},

	  	onRemove: function (map) {
	  		if (map._fadeAnimated) {
	  			setOpacity(this._container, 0);
	  			this._removeTimeout = setTimeout(bind(remove, undefined, this._container), 200);
	  		} else {
	  			remove(this._container);
	  		}
	  	},

	  	// @namespace Popup
	  	// @method getLatLng: LatLng
	  	// Returns the geographical point of popup.
	  	getLatLng: function () {
	  		return this._latlng;
	  	},

	  	// @method setLatLng(latlng: LatLng): this
	  	// Sets the geographical point where the popup will open.
	  	setLatLng: function (latlng) {
	  		this._latlng = toLatLng(latlng);
	  		if (this._map) {
	  			this._updatePosition();
	  			this._adjustPan();
	  		}
	  		return this;
	  	},

	  	// @method getContent: String|HTMLElement
	  	// Returns the content of the popup.
	  	getContent: function () {
	  		return this._content;
	  	},

	  	// @method setContent(htmlContent: String|HTMLElement|Function): this
	  	// Sets the HTML content of the popup. If a function is passed the source layer will be passed to the function. The function should return a `String` or `HTMLElement` to be used in the popup.
	  	setContent: function (content) {
	  		this._content = content;
	  		this.update();
	  		return this;
	  	},

	  	// @method getElement: String|HTMLElement
	  	// Returns the HTML container of the popup.
	  	getElement: function () {
	  		return this._container;
	  	},

	  	// @method update: null
	  	// Updates the popup content, layout and position. Useful for updating the popup after something inside changed, e.g. image loaded.
	  	update: function () {
	  		if (!this._map) { return; }

	  		this._container.style.visibility = 'hidden';

	  		this._updateContent();
	  		this._updateLayout();
	  		this._updatePosition();

	  		this._container.style.visibility = '';

	  		this._adjustPan();
	  	},

	  	getEvents: function () {
	  		var events = {
	  			zoom: this._updatePosition,
	  			viewreset: this._updatePosition
	  		};

	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._animateZoom;
	  		}
	  		return events;
	  	},

	  	// @method isOpen: Boolean
	  	// Returns `true` when the popup is visible on the map.
	  	isOpen: function () {
	  		return !!this._map && this._map.hasLayer(this);
	  	},

	  	// @method bringToFront: this
	  	// Brings this popup in front of other popups (in the same map pane).
	  	bringToFront: function () {
	  		if (this._map) {
	  			toFront(this._container);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack: this
	  	// Brings this popup to the back of other popups (in the same map pane).
	  	bringToBack: function () {
	  		if (this._map) {
	  			toBack(this._container);
	  		}
	  		return this;
	  	},

	  	_prepareOpen: function (parent, layer, latlng) {
	  		if (!(layer instanceof Layer)) {
	  			latlng = layer;
	  			layer = parent;
	  		}

	  		if (layer instanceof FeatureGroup) {
	  			for (var id in parent._layers) {
	  				layer = parent._layers[id];
	  				break;
	  			}
	  		}

	  		if (!latlng) {
	  			if (layer.getCenter) {
	  				latlng = layer.getCenter();
	  			} else if (layer.getLatLng) {
	  				latlng = layer.getLatLng();
	  			} else {
	  				throw new Error('Unable to get source layer LatLng.');
	  			}
	  		}

	  		// set overlay source to this layer
	  		this._source = layer;

	  		// update the overlay (content, layout, ect...)
	  		this.update();

	  		return latlng;
	  	},

	  	_updateContent: function () {
	  		if (!this._content) { return; }

	  		var node = this._contentNode;
	  		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

	  		if (typeof content === 'string') {
	  			node.innerHTML = content;
	  		} else {
	  			while (node.hasChildNodes()) {
	  				node.removeChild(node.firstChild);
	  			}
	  			node.appendChild(content);
	  		}
	  		this.fire('contentupdate');
	  	},

	  	_updatePosition: function () {
	  		if (!this._map) { return; }

	  		var pos = this._map.latLngToLayerPoint(this._latlng),
	  		    offset = toPoint(this.options.offset),
	  		    anchor = this._getAnchor();

	  		if (this._zoomAnimated) {
	  			setPosition(this._container, pos.add(anchor));
	  		} else {
	  			offset = offset.add(pos).add(anchor);
	  		}

	  		var bottom = this._containerBottom = -offset.y,
	  		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

	  		// bottom position the popup in case the height of the popup changes (images loading etc)
	  		this._container.style.bottom = bottom + 'px';
	  		this._container.style.left = left + 'px';
	  	},

	  	_getAnchor: function () {
	  		return [0, 0];
	  	}

	  });

	  /*
	   * @class Popup
	   * @inherits DivOverlay
	   * @aka L.Popup
	   * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
	   * open popups while making sure that only one popup is open at one time
	   * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
	   *
	   * @example
	   *
	   * If you want to just bind a popup to marker click and then open it, it's really easy:
	   *
	   * ```js
	   * marker.bindPopup(popupContent).openPopup();
	   * ```
	   * Path overlays like polylines also have a `bindPopup` method.
	   * Here's a more complicated way to open a popup on a map:
	   *
	   * ```js
	   * var popup = L.popup()
	   * 	.setLatLng(latlng)
	   * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
	   * 	.openOn(map);
	   * ```
	   */


	  // @namespace Popup
	  var Popup = DivOverlay.extend({

	  	// @section
	  	// @aka Popup options
	  	options: {
	  		// @option maxWidth: Number = 300
	  		// Max width of the popup, in pixels.
	  		maxWidth: 300,

	  		// @option minWidth: Number = 50
	  		// Min width of the popup, in pixels.
	  		minWidth: 50,

	  		// @option maxHeight: Number = null
	  		// If set, creates a scrollable container of the given height
	  		// inside a popup if its content exceeds it.
	  		maxHeight: null,

	  		// @option autoPan: Boolean = true
	  		// Set it to `false` if you don't want the map to do panning animation
	  		// to fit the opened popup.
	  		autoPan: true,

	  		// @option autoPanPaddingTopLeft: Point = null
	  		// The margin between the popup and the top left corner of the map
	  		// view after autopanning was performed.
	  		autoPanPaddingTopLeft: null,

	  		// @option autoPanPaddingBottomRight: Point = null
	  		// The margin between the popup and the bottom right corner of the map
	  		// view after autopanning was performed.
	  		autoPanPaddingBottomRight: null,

	  		// @option autoPanPadding: Point = Point(5, 5)
	  		// Equivalent of setting both top left and bottom right autopan padding to the same value.
	  		autoPanPadding: [5, 5],

	  		// @option keepInView: Boolean = false
	  		// Set it to `true` if you want to prevent users from panning the popup
	  		// off of the screen while it is open.
	  		keepInView: false,

	  		// @option closeButton: Boolean = true
	  		// Controls the presence of a close button in the popup.
	  		closeButton: true,

	  		// @option autoClose: Boolean = true
	  		// Set it to `false` if you want to override the default behavior of
	  		// the popup closing when another popup is opened.
	  		autoClose: true,

	  		// @option closeOnEscapeKey: Boolean = true
	  		// Set it to `false` if you want to override the default behavior of
	  		// the ESC key for closing of the popup.
	  		closeOnEscapeKey: true,

	  		// @option closeOnClick: Boolean = *
	  		// Set it if you want to override the default behavior of the popup closing when user clicks
	  		// on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.

	  		// @option className: String = ''
	  		// A custom CSS class name to assign to the popup.
	  		className: ''
	  	},

	  	// @namespace Popup
	  	// @method openOn(map: Map): this
	  	// Adds the popup to the map and closes the previous one. The same as `map.openPopup(popup)`.
	  	openOn: function (map) {
	  		map.openPopup(this);
	  		return this;
	  	},

	  	onAdd: function (map) {
	  		DivOverlay.prototype.onAdd.call(this, map);

	  		// @namespace Map
	  		// @section Popup events
	  		// @event popupopen: PopupEvent
	  		// Fired when a popup is opened in the map
	  		map.fire('popupopen', {popup: this});

	  		if (this._source) {
	  			// @namespace Layer
	  			// @section Popup events
	  			// @event popupopen: PopupEvent
	  			// Fired when a popup bound to this layer is opened
	  			this._source.fire('popupopen', {popup: this}, true);
	  			// For non-path layers, we toggle the popup when clicking
	  			// again the layer, so prevent the map to reopen it.
	  			if (!(this._source instanceof Path)) {
	  				this._source.on('preclick', stopPropagation);
	  			}
	  		}
	  	},

	  	onRemove: function (map) {
	  		DivOverlay.prototype.onRemove.call(this, map);

	  		// @namespace Map
	  		// @section Popup events
	  		// @event popupclose: PopupEvent
	  		// Fired when a popup in the map is closed
	  		map.fire('popupclose', {popup: this});

	  		if (this._source) {
	  			// @namespace Layer
	  			// @section Popup events
	  			// @event popupclose: PopupEvent
	  			// Fired when a popup bound to this layer is closed
	  			this._source.fire('popupclose', {popup: this}, true);
	  			if (!(this._source instanceof Path)) {
	  				this._source.off('preclick', stopPropagation);
	  			}
	  		}
	  	},

	  	getEvents: function () {
	  		var events = DivOverlay.prototype.getEvents.call(this);

	  		if (this.options.closeOnClick !== undefined ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
	  			events.preclick = this._close;
	  		}

	  		if (this.options.keepInView) {
	  			events.moveend = this._adjustPan;
	  		}

	  		return events;
	  	},

	  	_close: function () {
	  		if (this._map) {
	  			this._map.closePopup(this);
	  		}
	  	},

	  	_initLayout: function () {
	  		var prefix = 'leaflet-popup',
	  		    container = this._container = create$1('div',
	  			prefix + ' ' + (this.options.className || '') +
	  			' leaflet-zoom-animated');

	  		var wrapper = this._wrapper = create$1('div', prefix + '-content-wrapper', container);
	  		this._contentNode = create$1('div', prefix + '-content', wrapper);

	  		disableClickPropagation(container);
	  		disableScrollPropagation(this._contentNode);
	  		on(container, 'contextmenu', stopPropagation);

	  		this._tipContainer = create$1('div', prefix + '-tip-container', container);
	  		this._tip = create$1('div', prefix + '-tip', this._tipContainer);

	  		if (this.options.closeButton) {
	  			var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container);
	  			closeButton.href = '#close';
	  			closeButton.innerHTML = '&#215;';

	  			on(closeButton, 'click', this._onCloseButtonClick, this);
	  		}
	  	},

	  	_updateLayout: function () {
	  		var container = this._contentNode,
	  		    style = container.style;

	  		style.width = '';
	  		style.whiteSpace = 'nowrap';

	  		var width = container.offsetWidth;
	  		width = Math.min(width, this.options.maxWidth);
	  		width = Math.max(width, this.options.minWidth);

	  		style.width = (width + 1) + 'px';
	  		style.whiteSpace = '';

	  		style.height = '';

	  		var height = container.offsetHeight,
	  		    maxHeight = this.options.maxHeight,
	  		    scrolledClass = 'leaflet-popup-scrolled';

	  		if (maxHeight && height > maxHeight) {
	  			style.height = maxHeight + 'px';
	  			addClass(container, scrolledClass);
	  		} else {
	  			removeClass(container, scrolledClass);
	  		}

	  		this._containerWidth = this._container.offsetWidth;
	  	},

	  	_animateZoom: function (e) {
	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
	  		    anchor = this._getAnchor();
	  		setPosition(this._container, pos.add(anchor));
	  	},

	  	_adjustPan: function () {
	  		if (!this.options.autoPan) { return; }
	  		if (this._map._panAnim) { this._map._panAnim.stop(); }

	  		var map = this._map,
	  		    marginBottom = parseInt(getStyle(this._container, 'marginBottom'), 10) || 0,
	  		    containerHeight = this._container.offsetHeight + marginBottom,
	  		    containerWidth = this._containerWidth,
	  		    layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

	  		layerPos._add(getPosition(this._container));

	  		var containerPos = map.layerPointToContainerPoint(layerPos),
	  		    padding = toPoint(this.options.autoPanPadding),
	  		    paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
	  		    paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
	  		    size = map.getSize(),
	  		    dx = 0,
	  		    dy = 0;

	  		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
	  			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
	  		}
	  		if (containerPos.x - dx - paddingTL.x < 0) { // left
	  			dx = containerPos.x - paddingTL.x;
	  		}
	  		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
	  			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
	  		}
	  		if (containerPos.y - dy - paddingTL.y < 0) { // top
	  			dy = containerPos.y - paddingTL.y;
	  		}

	  		// @namespace Map
	  		// @section Popup events
	  		// @event autopanstart: Event
	  		// Fired when the map starts autopanning when opening a popup.
	  		if (dx || dy) {
	  			map
	  			    .fire('autopanstart')
	  			    .panBy([dx, dy]);
	  		}
	  	},

	  	_onCloseButtonClick: function (e) {
	  		this._close();
	  		stop(e);
	  	},

	  	_getAnchor: function () {
	  		// Where should we anchor the popup on the source layer?
	  		return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
	  	}

	  });

	  // @namespace Popup
	  // @factory L.popup(options?: Popup options, source?: Layer)
	  // Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
	  var popup = function (options, source) {
	  	return new Popup(options, source);
	  };


	  /* @namespace Map
	   * @section Interaction Options
	   * @option closePopupOnClick: Boolean = true
	   * Set it to `false` if you don't want popups to close when user clicks the map.
	   */
	  Map.mergeOptions({
	  	closePopupOnClick: true
	  });


	  // @namespace Map
	  // @section Methods for Layers and Controls
	  Map.include({
	  	// @method openPopup(popup: Popup): this
	  	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
	  	// @alternative
	  	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
	  	// Creates a popup with the specified content and options and opens it in the given point on a map.
	  	openPopup: function (popup, latlng, options) {
	  		if (!(popup instanceof Popup)) {
	  			popup = new Popup(options).setContent(popup);
	  		}

	  		if (latlng) {
	  			popup.setLatLng(latlng);
	  		}

	  		if (this.hasLayer(popup)) {
	  			return this;
	  		}

	  		if (this._popup && this._popup.options.autoClose) {
	  			this.closePopup();
	  		}

	  		this._popup = popup;
	  		return this.addLayer(popup);
	  	},

	  	// @method closePopup(popup?: Popup): this
	  	// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
	  	closePopup: function (popup) {
	  		if (!popup || popup === this._popup) {
	  			popup = this._popup;
	  			this._popup = null;
	  		}
	  		if (popup) {
	  			this.removeLayer(popup);
	  		}
	  		return this;
	  	}
	  });

	  /*
	   * @namespace Layer
	   * @section Popup methods example
	   *
	   * All layers share a set of methods convenient for binding popups to it.
	   *
	   * ```js
	   * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
	   * layer.openPopup();
	   * layer.closePopup();
	   * ```
	   *
	   * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
	   */

	  // @section Popup methods
	  Layer.include({

	  	// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
	  	// Binds a popup to the layer with the passed `content` and sets up the
	  	// necessary event listeners. If a `Function` is passed it will receive
	  	// the layer as the first argument and should return a `String` or `HTMLElement`.
	  	bindPopup: function (content, options) {

	  		if (content instanceof Popup) {
	  			setOptions(content, options);
	  			this._popup = content;
	  			content._source = this;
	  		} else {
	  			if (!this._popup || options) {
	  				this._popup = new Popup(options, this);
	  			}
	  			this._popup.setContent(content);
	  		}

	  		if (!this._popupHandlersAdded) {
	  			this.on({
	  				click: this._openPopup,
	  				keypress: this._onKeyPress,
	  				remove: this.closePopup,
	  				move: this._movePopup
	  			});
	  			this._popupHandlersAdded = true;
	  		}

	  		return this;
	  	},

	  	// @method unbindPopup(): this
	  	// Removes the popup previously bound with `bindPopup`.
	  	unbindPopup: function () {
	  		if (this._popup) {
	  			this.off({
	  				click: this._openPopup,
	  				keypress: this._onKeyPress,
	  				remove: this.closePopup,
	  				move: this._movePopup
	  			});
	  			this._popupHandlersAdded = false;
	  			this._popup = null;
	  		}
	  		return this;
	  	},

	  	// @method openPopup(latlng?: LatLng): this
	  	// Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
	  	openPopup: function (layer, latlng) {
	  		if (this._popup && this._map) {
	  			latlng = this._popup._prepareOpen(this, layer, latlng);

	  			// open the popup on the map
	  			this._map.openPopup(this._popup, latlng);
	  		}

	  		return this;
	  	},

	  	// @method closePopup(): this
	  	// Closes the popup bound to this layer if it is open.
	  	closePopup: function () {
	  		if (this._popup) {
	  			this._popup._close();
	  		}
	  		return this;
	  	},

	  	// @method togglePopup(): this
	  	// Opens or closes the popup bound to this layer depending on its current state.
	  	togglePopup: function (target) {
	  		if (this._popup) {
	  			if (this._popup._map) {
	  				this.closePopup();
	  			} else {
	  				this.openPopup(target);
	  			}
	  		}
	  		return this;
	  	},

	  	// @method isPopupOpen(): boolean
	  	// Returns `true` if the popup bound to this layer is currently open.
	  	isPopupOpen: function () {
	  		return (this._popup ? this._popup.isOpen() : false);
	  	},

	  	// @method setPopupContent(content: String|HTMLElement|Popup): this
	  	// Sets the content of the popup bound to this layer.
	  	setPopupContent: function (content) {
	  		if (this._popup) {
	  			this._popup.setContent(content);
	  		}
	  		return this;
	  	},

	  	// @method getPopup(): Popup
	  	// Returns the popup bound to this layer.
	  	getPopup: function () {
	  		return this._popup;
	  	},

	  	_openPopup: function (e) {
	  		var layer = e.layer || e.target;

	  		if (!this._popup) {
	  			return;
	  		}

	  		if (!this._map) {
	  			return;
	  		}

	  		// prevent map click
	  		stop(e);

	  		// if this inherits from Path its a vector and we can just
	  		// open the popup at the new location
	  		if (layer instanceof Path) {
	  			this.openPopup(e.layer || e.target, e.latlng);
	  			return;
	  		}

	  		// otherwise treat it like a marker and figure out
	  		// if we should toggle it open/closed
	  		if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
	  			this.closePopup();
	  		} else {
	  			this.openPopup(layer, e.latlng);
	  		}
	  	},

	  	_movePopup: function (e) {
	  		this._popup.setLatLng(e.latlng);
	  	},

	  	_onKeyPress: function (e) {
	  		if (e.originalEvent.keyCode === 13) {
	  			this._openPopup(e);
	  		}
	  	}
	  });

	  /*
	   * @class Tooltip
	   * @inherits DivOverlay
	   * @aka L.Tooltip
	   * Used to display small texts on top of map layers.
	   *
	   * @example
	   *
	   * ```js
	   * marker.bindTooltip("my tooltip text").openTooltip();
	   * ```
	   * Note about tooltip offset. Leaflet takes two options in consideration
	   * for computing tooltip offsetting:
	   * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
	   *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
	   *   move it to the bottom. Negatives will move to the left and top.
	   * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
	   *   should adapt this value if you use a custom icon.
	   */


	  // @namespace Tooltip
	  var Tooltip = DivOverlay.extend({

	  	// @section
	  	// @aka Tooltip options
	  	options: {
	  		// @option pane: String = 'tooltipPane'
	  		// `Map pane` where the tooltip will be added.
	  		pane: 'tooltipPane',

	  		// @option offset: Point = Point(0, 0)
	  		// Optional offset of the tooltip position.
	  		offset: [0, 0],

	  		// @option direction: String = 'auto'
	  		// Direction where to open the tooltip. Possible values are: `right`, `left`,
	  		// `top`, `bottom`, `center`, `auto`.
	  		// `auto` will dynamically switch between `right` and `left` according to the tooltip
	  		// position on the map.
	  		direction: 'auto',

	  		// @option permanent: Boolean = false
	  		// Whether to open the tooltip permanently or only on mouseover.
	  		permanent: false,

	  		// @option sticky: Boolean = false
	  		// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
	  		sticky: false,

	  		// @option interactive: Boolean = false
	  		// If true, the tooltip will listen to the feature events.
	  		interactive: false,

	  		// @option opacity: Number = 0.9
	  		// Tooltip container opacity.
	  		opacity: 0.9
	  	},

	  	onAdd: function (map) {
	  		DivOverlay.prototype.onAdd.call(this, map);
	  		this.setOpacity(this.options.opacity);

	  		// @namespace Map
	  		// @section Tooltip events
	  		// @event tooltipopen: TooltipEvent
	  		// Fired when a tooltip is opened in the map.
	  		map.fire('tooltipopen', {tooltip: this});

	  		if (this._source) {
	  			// @namespace Layer
	  			// @section Tooltip events
	  			// @event tooltipopen: TooltipEvent
	  			// Fired when a tooltip bound to this layer is opened.
	  			this._source.fire('tooltipopen', {tooltip: this}, true);
	  		}
	  	},

	  	onRemove: function (map) {
	  		DivOverlay.prototype.onRemove.call(this, map);

	  		// @namespace Map
	  		// @section Tooltip events
	  		// @event tooltipclose: TooltipEvent
	  		// Fired when a tooltip in the map is closed.
	  		map.fire('tooltipclose', {tooltip: this});

	  		if (this._source) {
	  			// @namespace Layer
	  			// @section Tooltip events
	  			// @event tooltipclose: TooltipEvent
	  			// Fired when a tooltip bound to this layer is closed.
	  			this._source.fire('tooltipclose', {tooltip: this}, true);
	  		}
	  	},

	  	getEvents: function () {
	  		var events = DivOverlay.prototype.getEvents.call(this);

	  		if (touch && !this.options.permanent) {
	  			events.preclick = this._close;
	  		}

	  		return events;
	  	},

	  	_close: function () {
	  		if (this._map) {
	  			this._map.closeTooltip(this);
	  		}
	  	},

	  	_initLayout: function () {
	  		var prefix = 'leaflet-tooltip',
	  		    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

	  		this._contentNode = this._container = create$1('div', className);
	  	},

	  	_updateLayout: function () {},

	  	_adjustPan: function () {},

	  	_setPosition: function (pos) {
	  		var subX, subY,
	  		    map = this._map,
	  		    container = this._container,
	  		    centerPoint = map.latLngToContainerPoint(map.getCenter()),
	  		    tooltipPoint = map.layerPointToContainerPoint(pos),
	  		    direction = this.options.direction,
	  		    tooltipWidth = container.offsetWidth,
	  		    tooltipHeight = container.offsetHeight,
	  		    offset = toPoint(this.options.offset),
	  		    anchor = this._getAnchor();

	  		if (direction === 'top') {
	  			subX = tooltipWidth / 2;
	  			subY = tooltipHeight;
	  		} else if (direction === 'bottom') {
	  			subX = tooltipWidth / 2;
	  			subY = 0;
	  		} else if (direction === 'center') {
	  			subX = tooltipWidth / 2;
	  			subY = tooltipHeight / 2;
	  		} else if (direction === 'right') {
	  			subX = 0;
	  			subY = tooltipHeight / 2;
	  		} else if (direction === 'left') {
	  			subX = tooltipWidth;
	  			subY = tooltipHeight / 2;
	  		} else if (tooltipPoint.x < centerPoint.x) {
	  			direction = 'right';
	  			subX = 0;
	  			subY = tooltipHeight / 2;
	  		} else {
	  			direction = 'left';
	  			subX = tooltipWidth + (offset.x + anchor.x) * 2;
	  			subY = tooltipHeight / 2;
	  		}

	  		pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);

	  		removeClass(container, 'leaflet-tooltip-right');
	  		removeClass(container, 'leaflet-tooltip-left');
	  		removeClass(container, 'leaflet-tooltip-top');
	  		removeClass(container, 'leaflet-tooltip-bottom');
	  		addClass(container, 'leaflet-tooltip-' + direction);
	  		setPosition(container, pos);
	  	},

	  	_updatePosition: function () {
	  		var pos = this._map.latLngToLayerPoint(this._latlng);
	  		this._setPosition(pos);
	  	},

	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;

	  		if (this._container) {
	  			setOpacity(this._container, opacity);
	  		}
	  	},

	  	_animateZoom: function (e) {
	  		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
	  		this._setPosition(pos);
	  	},

	  	_getAnchor: function () {
	  		// Where should we anchor the tooltip on the source layer?
	  		return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
	  	}

	  });

	  // @namespace Tooltip
	  // @factory L.tooltip(options?: Tooltip options, source?: Layer)
	  // Instantiates a Tooltip object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
	  var tooltip = function (options, source) {
	  	return new Tooltip(options, source);
	  };

	  // @namespace Map
	  // @section Methods for Layers and Controls
	  Map.include({

	  	// @method openTooltip(tooltip: Tooltip): this
	  	// Opens the specified tooltip.
	  	// @alternative
	  	// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
	  	// Creates a tooltip with the specified content and options and open it.
	  	openTooltip: function (tooltip, latlng, options) {
	  		if (!(tooltip instanceof Tooltip)) {
	  			tooltip = new Tooltip(options).setContent(tooltip);
	  		}

	  		if (latlng) {
	  			tooltip.setLatLng(latlng);
	  		}

	  		if (this.hasLayer(tooltip)) {
	  			return this;
	  		}

	  		return this.addLayer(tooltip);
	  	},

	  	// @method closeTooltip(tooltip?: Tooltip): this
	  	// Closes the tooltip given as parameter.
	  	closeTooltip: function (tooltip) {
	  		if (tooltip) {
	  			this.removeLayer(tooltip);
	  		}
	  		return this;
	  	}

	  });

	  /*
	   * @namespace Layer
	   * @section Tooltip methods example
	   *
	   * All layers share a set of methods convenient for binding tooltips to it.
	   *
	   * ```js
	   * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
	   * layer.openTooltip();
	   * layer.closeTooltip();
	   * ```
	   */

	  // @section Tooltip methods
	  Layer.include({

	  	// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
	  	// Binds a tooltip to the layer with the passed `content` and sets up the
	  	// necessary event listeners. If a `Function` is passed it will receive
	  	// the layer as the first argument and should return a `String` or `HTMLElement`.
	  	bindTooltip: function (content, options) {

	  		if (content instanceof Tooltip) {
	  			setOptions(content, options);
	  			this._tooltip = content;
	  			content._source = this;
	  		} else {
	  			if (!this._tooltip || options) {
	  				this._tooltip = new Tooltip(options, this);
	  			}
	  			this._tooltip.setContent(content);

	  		}

	  		this._initTooltipInteractions();

	  		if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
	  			this.openTooltip();
	  		}

	  		return this;
	  	},

	  	// @method unbindTooltip(): this
	  	// Removes the tooltip previously bound with `bindTooltip`.
	  	unbindTooltip: function () {
	  		if (this._tooltip) {
	  			this._initTooltipInteractions(true);
	  			this.closeTooltip();
	  			this._tooltip = null;
	  		}
	  		return this;
	  	},

	  	_initTooltipInteractions: function (remove$$1) {
	  		if (!remove$$1 && this._tooltipHandlersAdded) { return; }
	  		var onOff = remove$$1 ? 'off' : 'on',
	  		    events = {
	  			remove: this.closeTooltip,
	  			move: this._moveTooltip
	  		    };
	  		if (!this._tooltip.options.permanent) {
	  			events.mouseover = this._openTooltip;
	  			events.mouseout = this.closeTooltip;
	  			if (this._tooltip.options.sticky) {
	  				events.mousemove = this._moveTooltip;
	  			}
	  			if (touch) {
	  				events.click = this._openTooltip;
	  			}
	  		} else {
	  			events.add = this._openTooltip;
	  		}
	  		this[onOff](events);
	  		this._tooltipHandlersAdded = !remove$$1;
	  	},

	  	// @method openTooltip(latlng?: LatLng): this
	  	// Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
	  	openTooltip: function (layer, latlng) {
	  		if (this._tooltip && this._map) {
	  			latlng = this._tooltip._prepareOpen(this, layer, latlng);

	  			// open the tooltip on the map
	  			this._map.openTooltip(this._tooltip, latlng);

	  			// Tooltip container may not be defined if not permanent and never
	  			// opened.
	  			if (this._tooltip.options.interactive && this._tooltip._container) {
	  				addClass(this._tooltip._container, 'leaflet-clickable');
	  				this.addInteractiveTarget(this._tooltip._container);
	  			}
	  		}

	  		return this;
	  	},

	  	// @method closeTooltip(): this
	  	// Closes the tooltip bound to this layer if it is open.
	  	closeTooltip: function () {
	  		if (this._tooltip) {
	  			this._tooltip._close();
	  			if (this._tooltip.options.interactive && this._tooltip._container) {
	  				removeClass(this._tooltip._container, 'leaflet-clickable');
	  				this.removeInteractiveTarget(this._tooltip._container);
	  			}
	  		}
	  		return this;
	  	},

	  	// @method toggleTooltip(): this
	  	// Opens or closes the tooltip bound to this layer depending on its current state.
	  	toggleTooltip: function (target) {
	  		if (this._tooltip) {
	  			if (this._tooltip._map) {
	  				this.closeTooltip();
	  			} else {
	  				this.openTooltip(target);
	  			}
	  		}
	  		return this;
	  	},

	  	// @method isTooltipOpen(): boolean
	  	// Returns `true` if the tooltip bound to this layer is currently open.
	  	isTooltipOpen: function () {
	  		return this._tooltip.isOpen();
	  	},

	  	// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
	  	// Sets the content of the tooltip bound to this layer.
	  	setTooltipContent: function (content) {
	  		if (this._tooltip) {
	  			this._tooltip.setContent(content);
	  		}
	  		return this;
	  	},

	  	// @method getTooltip(): Tooltip
	  	// Returns the tooltip bound to this layer.
	  	getTooltip: function () {
	  		return this._tooltip;
	  	},

	  	_openTooltip: function (e) {
	  		var layer = e.layer || e.target;

	  		if (!this._tooltip || !this._map) {
	  			return;
	  		}
	  		this.openTooltip(layer, this._tooltip.options.sticky ? e.latlng : undefined);
	  	},

	  	_moveTooltip: function (e) {
	  		var latlng = e.latlng, containerPoint, layerPoint;
	  		if (this._tooltip.options.sticky && e.originalEvent) {
	  			containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
	  			layerPoint = this._map.containerPointToLayerPoint(containerPoint);
	  			latlng = this._map.layerPointToLatLng(layerPoint);
	  		}
	  		this._tooltip.setLatLng(latlng);
	  	}
	  });

	  /*
	   * @class DivIcon
	   * @aka L.DivIcon
	   * @inherits Icon
	   *
	   * Represents a lightweight icon for markers that uses a simple `<div>`
	   * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
	   *
	   * @example
	   * ```js
	   * var myIcon = L.divIcon({className: 'my-div-icon'});
	   * // you can set .my-div-icon styles in CSS
	   *
	   * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
	   * ```
	   *
	   * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
	   */

	  var DivIcon = Icon.extend({
	  	options: {
	  		// @section
	  		// @aka DivIcon options
	  		iconSize: [12, 12], // also can be set through CSS

	  		// iconAnchor: (Point),
	  		// popupAnchor: (Point),

	  		// @option html: String|HTMLElement = ''
	  		// Custom HTML code to put inside the div element, empty by default. Alternatively,
	  		// an instance of `HTMLElement`.
	  		html: false,

	  		// @option bgPos: Point = [0, 0]
	  		// Optional relative position of the background, in pixels
	  		bgPos: null,

	  		className: 'leaflet-div-icon'
	  	},

	  	createIcon: function (oldIcon) {
	  		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
	  		    options = this.options;

	  		if (options.html instanceof Element) {
	  			empty(div);
	  			div.appendChild(options.html);
	  		} else {
	  			div.innerHTML = options.html !== false ? options.html : '';
	  		}

	  		if (options.bgPos) {
	  			var bgPos = toPoint(options.bgPos);
	  			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
	  		}
	  		this._setIconStyles(div, 'icon');

	  		return div;
	  	},

	  	createShadow: function () {
	  		return null;
	  	}
	  });

	  // @factory L.divIcon(options: DivIcon options)
	  // Creates a `DivIcon` instance with the given options.
	  function divIcon(options) {
	  	return new DivIcon(options);
	  }

	  Icon.Default = IconDefault;

	  /*
	   * @class GridLayer
	   * @inherits Layer
	   * @aka L.GridLayer
	   *
	   * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
	   * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
	   *
	   *
	   * @section Synchronous usage
	   * @example
	   *
	   * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
	   *
	   * ```js
	   * var CanvasLayer = L.GridLayer.extend({
	   *     createTile: function(coords){
	   *         // create a <canvas> element for drawing
	   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
	   *
	   *         // setup tile width and height according to the options
	   *         var size = this.getTileSize();
	   *         tile.width = size.x;
	   *         tile.height = size.y;
	   *
	   *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
	   *         var ctx = tile.getContext('2d');
	   *
	   *         // return the tile so it can be rendered on screen
	   *         return tile;
	   *     }
	   * });
	   * ```
	   *
	   * @section Asynchronous usage
	   * @example
	   *
	   * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
	   *
	   * ```js
	   * var CanvasLayer = L.GridLayer.extend({
	   *     createTile: function(coords, done){
	   *         var error;
	   *
	   *         // create a <canvas> element for drawing
	   *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
	   *
	   *         // setup tile width and height according to the options
	   *         var size = this.getTileSize();
	   *         tile.width = size.x;
	   *         tile.height = size.y;
	   *
	   *         // draw something asynchronously and pass the tile to the done() callback
	   *         setTimeout(function() {
	   *             done(error, tile);
	   *         }, 1000);
	   *
	   *         return tile;
	   *     }
	   * });
	   * ```
	   *
	   * @section
	   */


	  var GridLayer = Layer.extend({

	  	// @section
	  	// @aka GridLayer options
	  	options: {
	  		// @option tileSize: Number|Point = 256
	  		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
	  		tileSize: 256,

	  		// @option opacity: Number = 1.0
	  		// Opacity of the tiles. Can be used in the `createTile()` function.
	  		opacity: 1,

	  		// @option updateWhenIdle: Boolean = (depends)
	  		// Load new tiles only when panning ends.
	  		// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
	  		// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
	  		// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
	  		updateWhenIdle: mobile,

	  		// @option updateWhenZooming: Boolean = true
	  		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
	  		updateWhenZooming: true,

	  		// @option updateInterval: Number = 200
	  		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
	  		updateInterval: 200,

	  		// @option zIndex: Number = 1
	  		// The explicit zIndex of the tile layer.
	  		zIndex: 1,

	  		// @option bounds: LatLngBounds = undefined
	  		// If set, tiles will only be loaded inside the set `LatLngBounds`.
	  		bounds: null,

	  		// @option minZoom: Number = 0
	  		// The minimum zoom level down to which this layer will be displayed (inclusive).
	  		minZoom: 0,

	  		// @option maxZoom: Number = undefined
	  		// The maximum zoom level up to which this layer will be displayed (inclusive).
	  		maxZoom: undefined,

	  		// @option maxNativeZoom: Number = undefined
	  		// Maximum zoom number the tile source has available. If it is specified,
	  		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
	  		// from `maxNativeZoom` level and auto-scaled.
	  		maxNativeZoom: undefined,

	  		// @option minNativeZoom: Number = undefined
	  		// Minimum zoom number the tile source has available. If it is specified,
	  		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
	  		// from `minNativeZoom` level and auto-scaled.
	  		minNativeZoom: undefined,

	  		// @option noWrap: Boolean = false
	  		// Whether the layer is wrapped around the antimeridian. If `true`, the
	  		// GridLayer will only be displayed once at low zoom levels. Has no
	  		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
	  		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
	  		// tiles outside the CRS limits.
	  		noWrap: false,

	  		// @option pane: String = 'tilePane'
	  		// `Map pane` where the grid layer will be added.
	  		pane: 'tilePane',

	  		// @option className: String = ''
	  		// A custom class name to assign to the tile layer. Empty by default.
	  		className: '',

	  		// @option keepBuffer: Number = 2
	  		// When panning the map, keep this many rows and columns of tiles before unloading them.
	  		keepBuffer: 2
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  	},

	  	onAdd: function () {
	  		this._initContainer();

	  		this._levels = {};
	  		this._tiles = {};

	  		this._resetView();
	  		this._update();
	  	},

	  	beforeAdd: function (map) {
	  		map._addZoomLimit(this);
	  	},

	  	onRemove: function (map) {
	  		this._removeAllTiles();
	  		remove(this._container);
	  		map._removeZoomLimit(this);
	  		this._container = null;
	  		this._tileZoom = undefined;
	  	},

	  	// @method bringToFront: this
	  	// Brings the tile layer to the top of all tile layers.
	  	bringToFront: function () {
	  		if (this._map) {
	  			toFront(this._container);
	  			this._setAutoZIndex(Math.max);
	  		}
	  		return this;
	  	},

	  	// @method bringToBack: this
	  	// Brings the tile layer to the bottom of all tile layers.
	  	bringToBack: function () {
	  		if (this._map) {
	  			toBack(this._container);
	  			this._setAutoZIndex(Math.min);
	  		}
	  		return this;
	  	},

	  	// @method getContainer: HTMLElement
	  	// Returns the HTML element that contains the tiles for this layer.
	  	getContainer: function () {
	  		return this._container;
	  	},

	  	// @method setOpacity(opacity: Number): this
	  	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
	  	setOpacity: function (opacity) {
	  		this.options.opacity = opacity;
	  		this._updateOpacity();
	  		return this;
	  	},

	  	// @method setZIndex(zIndex: Number): this
	  	// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
	  	setZIndex: function (zIndex) {
	  		this.options.zIndex = zIndex;
	  		this._updateZIndex();

	  		return this;
	  	},

	  	// @method isLoading: Boolean
	  	// Returns `true` if any tile in the grid layer has not finished loading.
	  	isLoading: function () {
	  		return this._loading;
	  	},

	  	// @method redraw: this
	  	// Causes the layer to clear all the tiles and request them again.
	  	redraw: function () {
	  		if (this._map) {
	  			this._removeAllTiles();
	  			this._update();
	  		}
	  		return this;
	  	},

	  	getEvents: function () {
	  		var events = {
	  			viewprereset: this._invalidateAll,
	  			viewreset: this._resetView,
	  			zoom: this._resetView,
	  			moveend: this._onMoveEnd
	  		};

	  		if (!this.options.updateWhenIdle) {
	  			// update tiles on move, but not more often than once per given interval
	  			if (!this._onMove) {
	  				this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
	  			}

	  			events.move = this._onMove;
	  		}

	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._animateZoom;
	  		}

	  		return events;
	  	},

	  	// @section Extension methods
	  	// Layers extending `GridLayer` shall reimplement the following method.
	  	// @method createTile(coords: Object, done?: Function): HTMLElement
	  	// Called only internally, must be overridden by classes extending `GridLayer`.
	  	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
	  	// is specified, it must be called when the tile has finished loading and drawing.
	  	createTile: function () {
	  		return document.createElement('div');
	  	},

	  	// @section
	  	// @method getTileSize: Point
	  	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
	  	getTileSize: function () {
	  		var s = this.options.tileSize;
	  		return s instanceof Point ? s : new Point(s, s);
	  	},

	  	_updateZIndex: function () {
	  		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
	  			this._container.style.zIndex = this.options.zIndex;
	  		}
	  	},

	  	_setAutoZIndex: function (compare) {
	  		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

	  		var layers = this.getPane().children,
	  		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

	  		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

	  			zIndex = layers[i].style.zIndex;

	  			if (layers[i] !== this._container && zIndex) {
	  				edgeZIndex = compare(edgeZIndex, +zIndex);
	  			}
	  		}

	  		if (isFinite(edgeZIndex)) {
	  			this.options.zIndex = edgeZIndex + compare(-1, 1);
	  			this._updateZIndex();
	  		}
	  	},

	  	_updateOpacity: function () {
	  		if (!this._map) { return; }

	  		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
	  		if (ielt9) { return; }

	  		setOpacity(this._container, this.options.opacity);

	  		var now = +new Date(),
	  		    nextFrame = false,
	  		    willPrune = false;

	  		for (var key in this._tiles) {
	  			var tile = this._tiles[key];
	  			if (!tile.current || !tile.loaded) { continue; }

	  			var fade = Math.min(1, (now - tile.loaded) / 200);

	  			setOpacity(tile.el, fade);
	  			if (fade < 1) {
	  				nextFrame = true;
	  			} else {
	  				if (tile.active) {
	  					willPrune = true;
	  				} else {
	  					this._onOpaqueTile(tile);
	  				}
	  				tile.active = true;
	  			}
	  		}

	  		if (willPrune && !this._noPrune) { this._pruneTiles(); }

	  		if (nextFrame) {
	  			cancelAnimFrame(this._fadeFrame);
	  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
	  		}
	  	},

	  	_onOpaqueTile: falseFn,

	  	_initContainer: function () {
	  		if (this._container) { return; }

	  		this._container = create$1('div', 'leaflet-layer ' + (this.options.className || ''));
	  		this._updateZIndex();

	  		if (this.options.opacity < 1) {
	  			this._updateOpacity();
	  		}

	  		this.getPane().appendChild(this._container);
	  	},

	  	_updateLevels: function () {

	  		var zoom = this._tileZoom,
	  		    maxZoom = this.options.maxZoom;

	  		if (zoom === undefined) { return undefined; }

	  		for (var z in this._levels) {
	  			z = Number(z);
	  			if (this._levels[z].el.children.length || z === zoom) {
	  				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
	  				this._onUpdateLevel(z);
	  			} else {
	  				remove(this._levels[z].el);
	  				this._removeTilesAtZoom(z);
	  				this._onRemoveLevel(z);
	  				delete this._levels[z];
	  			}
	  		}

	  		var level = this._levels[zoom],
	  		    map = this._map;

	  		if (!level) {
	  			level = this._levels[zoom] = {};

	  			level.el = create$1('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
	  			level.el.style.zIndex = maxZoom;

	  			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
	  			level.zoom = zoom;

	  			this._setZoomTransform(level, map.getCenter(), map.getZoom());

	  			// force the browser to consider the newly added element for transition
	  			falseFn(level.el.offsetWidth);

	  			this._onCreateLevel(level);
	  		}

	  		this._level = level;

	  		return level;
	  	},

	  	_onUpdateLevel: falseFn,

	  	_onRemoveLevel: falseFn,

	  	_onCreateLevel: falseFn,

	  	_pruneTiles: function () {
	  		if (!this._map) {
	  			return;
	  		}

	  		var key, tile;

	  		var zoom = this._map.getZoom();
	  		if (zoom > this.options.maxZoom ||
	  			zoom < this.options.minZoom) {
	  			this._removeAllTiles();
	  			return;
	  		}

	  		for (key in this._tiles) {
	  			tile = this._tiles[key];
	  			tile.retain = tile.current;
	  		}

	  		for (key in this._tiles) {
	  			tile = this._tiles[key];
	  			if (tile.current && !tile.active) {
	  				var coords = tile.coords;
	  				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
	  					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
	  				}
	  			}
	  		}

	  		for (key in this._tiles) {
	  			if (!this._tiles[key].retain) {
	  				this._removeTile(key);
	  			}
	  		}
	  	},

	  	_removeTilesAtZoom: function (zoom) {
	  		for (var key in this._tiles) {
	  			if (this._tiles[key].coords.z !== zoom) {
	  				continue;
	  			}
	  			this._removeTile(key);
	  		}
	  	},

	  	_removeAllTiles: function () {
	  		for (var key in this._tiles) {
	  			this._removeTile(key);
	  		}
	  	},

	  	_invalidateAll: function () {
	  		for (var z in this._levels) {
	  			remove(this._levels[z].el);
	  			this._onRemoveLevel(Number(z));
	  			delete this._levels[z];
	  		}
	  		this._removeAllTiles();

	  		this._tileZoom = undefined;
	  	},

	  	_retainParent: function (x, y, z, minZoom) {
	  		var x2 = Math.floor(x / 2),
	  		    y2 = Math.floor(y / 2),
	  		    z2 = z - 1,
	  		    coords2 = new Point(+x2, +y2);
	  		coords2.z = +z2;

	  		var key = this._tileCoordsToKey(coords2),
	  		    tile = this._tiles[key];

	  		if (tile && tile.active) {
	  			tile.retain = true;
	  			return true;

	  		} else if (tile && tile.loaded) {
	  			tile.retain = true;
	  		}

	  		if (z2 > minZoom) {
	  			return this._retainParent(x2, y2, z2, minZoom);
	  		}

	  		return false;
	  	},

	  	_retainChildren: function (x, y, z, maxZoom) {

	  		for (var i = 2 * x; i < 2 * x + 2; i++) {
	  			for (var j = 2 * y; j < 2 * y + 2; j++) {

	  				var coords = new Point(i, j);
	  				coords.z = z + 1;

	  				var key = this._tileCoordsToKey(coords),
	  				    tile = this._tiles[key];

	  				if (tile && tile.active) {
	  					tile.retain = true;
	  					continue;

	  				} else if (tile && tile.loaded) {
	  					tile.retain = true;
	  				}

	  				if (z + 1 < maxZoom) {
	  					this._retainChildren(i, j, z + 1, maxZoom);
	  				}
	  			}
	  		}
	  	},

	  	_resetView: function (e) {
	  		var animating = e && (e.pinch || e.flyTo);
	  		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
	  	},

	  	_animateZoom: function (e) {
	  		this._setView(e.center, e.zoom, true, e.noUpdate);
	  	},

	  	_clampZoom: function (zoom) {
	  		var options = this.options;

	  		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
	  			return options.minNativeZoom;
	  		}

	  		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
	  			return options.maxNativeZoom;
	  		}

	  		return zoom;
	  	},

	  	_setView: function (center, zoom, noPrune, noUpdate) {
	  		var tileZoom = Math.round(zoom);
	  		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
	  		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
	  			tileZoom = undefined;
	  		} else {
	  			tileZoom = this._clampZoom(tileZoom);
	  		}

	  		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

	  		if (!noUpdate || tileZoomChanged) {

	  			this._tileZoom = tileZoom;

	  			if (this._abortLoading) {
	  				this._abortLoading();
	  			}

	  			this._updateLevels();
	  			this._resetGrid();

	  			if (tileZoom !== undefined) {
	  				this._update(center);
	  			}

	  			if (!noPrune) {
	  				this._pruneTiles();
	  			}

	  			// Flag to prevent _updateOpacity from pruning tiles during
	  			// a zoom anim or a pinch gesture
	  			this._noPrune = !!noPrune;
	  		}

	  		this._setZoomTransforms(center, zoom);
	  	},

	  	_setZoomTransforms: function (center, zoom) {
	  		for (var i in this._levels) {
	  			this._setZoomTransform(this._levels[i], center, zoom);
	  		}
	  	},

	  	_setZoomTransform: function (level, center, zoom) {
	  		var scale = this._map.getZoomScale(zoom, level.zoom),
	  		    translate = level.origin.multiplyBy(scale)
	  		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

	  		if (any3d) {
	  			setTransform(level.el, translate, scale);
	  		} else {
	  			setPosition(level.el, translate);
	  		}
	  	},

	  	_resetGrid: function () {
	  		var map = this._map,
	  		    crs = map.options.crs,
	  		    tileSize = this._tileSize = this.getTileSize(),
	  		    tileZoom = this._tileZoom;

	  		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
	  		if (bounds) {
	  			this._globalTileRange = this._pxBoundsToTileRange(bounds);
	  		}

	  		this._wrapX = crs.wrapLng && !this.options.noWrap && [
	  			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
	  			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
	  		];
	  		this._wrapY = crs.wrapLat && !this.options.noWrap && [
	  			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
	  			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
	  		];
	  	},

	  	_onMoveEnd: function () {
	  		if (!this._map || this._map._animatingZoom) { return; }

	  		this._update();
	  	},

	  	_getTiledPixelBounds: function (center) {
	  		var map = this._map,
	  		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
	  		    scale = map.getZoomScale(mapZoom, this._tileZoom),
	  		    pixelCenter = map.project(center, this._tileZoom).floor(),
	  		    halfSize = map.getSize().divideBy(scale * 2);

	  		return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
	  	},

	  	// Private method to load tiles in the grid's active zoom level according to map bounds
	  	_update: function (center) {
	  		var map = this._map;
	  		if (!map) { return; }
	  		var zoom = this._clampZoom(map.getZoom());

	  		if (center === undefined) { center = map.getCenter(); }
	  		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

	  		var pixelBounds = this._getTiledPixelBounds(center),
	  		    tileRange = this._pxBoundsToTileRange(pixelBounds),
	  		    tileCenter = tileRange.getCenter(),
	  		    queue = [],
	  		    margin = this.options.keepBuffer,
	  		    noPruneRange = new Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
	  		                              tileRange.getTopRight().add([margin, -margin]));

	  		// Sanity check: panic if the tile range contains Infinity somewhere.
	  		if (!(isFinite(tileRange.min.x) &&
	  		      isFinite(tileRange.min.y) &&
	  		      isFinite(tileRange.max.x) &&
	  		      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }

	  		for (var key in this._tiles) {
	  			var c = this._tiles[key].coords;
	  			if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
	  				this._tiles[key].current = false;
	  			}
	  		}

	  		// _update just loads more tiles. If the tile zoom level differs too much
	  		// from the map's, let _setView reset levels and prune old tiles.
	  		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

	  		// create a queue of coordinates to load tiles from
	  		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
	  			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
	  				var coords = new Point(i, j);
	  				coords.z = this._tileZoom;

	  				if (!this._isValidTile(coords)) { continue; }

	  				var tile = this._tiles[this._tileCoordsToKey(coords)];
	  				if (tile) {
	  					tile.current = true;
	  				} else {
	  					queue.push(coords);
	  				}
	  			}
	  		}

	  		// sort tile queue to load tiles in order of their distance to center
	  		queue.sort(function (a, b) {
	  			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
	  		});

	  		if (queue.length !== 0) {
	  			// if it's the first batch of tiles to load
	  			if (!this._loading) {
	  				this._loading = true;
	  				// @event loading: Event
	  				// Fired when the grid layer starts loading tiles.
	  				this.fire('loading');
	  			}

	  			// create DOM fragment to append tiles in one batch
	  			var fragment = document.createDocumentFragment();

	  			for (i = 0; i < queue.length; i++) {
	  				this._addTile(queue[i], fragment);
	  			}

	  			this._level.el.appendChild(fragment);
	  		}
	  	},

	  	_isValidTile: function (coords) {
	  		var crs = this._map.options.crs;

	  		if (!crs.infinite) {
	  			// don't load tile if it's out of bounds and not wrapped
	  			var bounds = this._globalTileRange;
	  			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
	  			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
	  		}

	  		if (!this.options.bounds) { return true; }

	  		// don't load tile if it doesn't intersect the bounds in options
	  		var tileBounds = this._tileCoordsToBounds(coords);
	  		return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
	  	},

	  	_keyToBounds: function (key) {
	  		return this._tileCoordsToBounds(this._keyToTileCoords(key));
	  	},

	  	_tileCoordsToNwSe: function (coords) {
	  		var map = this._map,
	  		    tileSize = this.getTileSize(),
	  		    nwPoint = coords.scaleBy(tileSize),
	  		    sePoint = nwPoint.add(tileSize),
	  		    nw = map.unproject(nwPoint, coords.z),
	  		    se = map.unproject(sePoint, coords.z);
	  		return [nw, se];
	  	},

	  	// converts tile coordinates to its geographical bounds
	  	_tileCoordsToBounds: function (coords) {
	  		var bp = this._tileCoordsToNwSe(coords),
	  		    bounds = new LatLngBounds(bp[0], bp[1]);

	  		if (!this.options.noWrap) {
	  			bounds = this._map.wrapLatLngBounds(bounds);
	  		}
	  		return bounds;
	  	},
	  	// converts tile coordinates to key for the tile cache
	  	_tileCoordsToKey: function (coords) {
	  		return coords.x + ':' + coords.y + ':' + coords.z;
	  	},

	  	// converts tile cache key to coordinates
	  	_keyToTileCoords: function (key) {
	  		var k = key.split(':'),
	  		    coords = new Point(+k[0], +k[1]);
	  		coords.z = +k[2];
	  		return coords;
	  	},

	  	_removeTile: function (key) {
	  		var tile = this._tiles[key];
	  		if (!tile) { return; }

	  		remove(tile.el);

	  		delete this._tiles[key];

	  		// @event tileunload: TileEvent
	  		// Fired when a tile is removed (e.g. when a tile goes off the screen).
	  		this.fire('tileunload', {
	  			tile: tile.el,
	  			coords: this._keyToTileCoords(key)
	  		});
	  	},

	  	_initTile: function (tile) {
	  		addClass(tile, 'leaflet-tile');

	  		var tileSize = this.getTileSize();
	  		tile.style.width = tileSize.x + 'px';
	  		tile.style.height = tileSize.y + 'px';

	  		tile.onselectstart = falseFn;
	  		tile.onmousemove = falseFn;

	  		// update opacity on tiles in IE7-8 because of filter inheritance problems
	  		if (ielt9 && this.options.opacity < 1) {
	  			setOpacity(tile, this.options.opacity);
	  		}

	  		// without this hack, tiles disappear after zoom on Chrome for Android
	  		// https://github.com/Leaflet/Leaflet/issues/2078
	  		if (android && !android23) {
	  			tile.style.WebkitBackfaceVisibility = 'hidden';
	  		}
	  	},

	  	_addTile: function (coords, container) {
	  		var tilePos = this._getTilePos(coords),
	  		    key = this._tileCoordsToKey(coords);

	  		var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));

	  		this._initTile(tile);

	  		// if createTile is defined with a second argument ("done" callback),
	  		// we know that tile is async and will be ready later; otherwise
	  		if (this.createTile.length < 2) {
	  			// mark tile as ready, but delay one frame for opacity animation to happen
	  			requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
	  		}

	  		setPosition(tile, tilePos);

	  		// save tile in cache
	  		this._tiles[key] = {
	  			el: tile,
	  			coords: coords,
	  			current: true
	  		};

	  		container.appendChild(tile);
	  		// @event tileloadstart: TileEvent
	  		// Fired when a tile is requested and starts loading.
	  		this.fire('tileloadstart', {
	  			tile: tile,
	  			coords: coords
	  		});
	  	},

	  	_tileReady: function (coords, err, tile) {
	  		if (err) {
	  			// @event tileerror: TileErrorEvent
	  			// Fired when there is an error loading a tile.
	  			this.fire('tileerror', {
	  				error: err,
	  				tile: tile,
	  				coords: coords
	  			});
	  		}

	  		var key = this._tileCoordsToKey(coords);

	  		tile = this._tiles[key];
	  		if (!tile) { return; }

	  		tile.loaded = +new Date();
	  		if (this._map._fadeAnimated) {
	  			setOpacity(tile.el, 0);
	  			cancelAnimFrame(this._fadeFrame);
	  			this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
	  		} else {
	  			tile.active = true;
	  			this._pruneTiles();
	  		}

	  		if (!err) {
	  			addClass(tile.el, 'leaflet-tile-loaded');

	  			// @event tileload: TileEvent
	  			// Fired when a tile loads.
	  			this.fire('tileload', {
	  				tile: tile.el,
	  				coords: coords
	  			});
	  		}

	  		if (this._noTilesToLoad()) {
	  			this._loading = false;
	  			// @event load: Event
	  			// Fired when the grid layer loaded all visible tiles.
	  			this.fire('load');

	  			if (ielt9 || !this._map._fadeAnimated) {
	  				requestAnimFrame(this._pruneTiles, this);
	  			} else {
	  				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
	  				// to trigger a pruning.
	  				setTimeout(bind(this._pruneTiles, this), 250);
	  			}
	  		}
	  	},

	  	_getTilePos: function (coords) {
	  		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
	  	},

	  	_wrapCoords: function (coords) {
	  		var newCoords = new Point(
	  			this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
	  			this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y);
	  		newCoords.z = coords.z;
	  		return newCoords;
	  	},

	  	_pxBoundsToTileRange: function (bounds) {
	  		var tileSize = this.getTileSize();
	  		return new Bounds(
	  			bounds.min.unscaleBy(tileSize).floor(),
	  			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
	  	},

	  	_noTilesToLoad: function () {
	  		for (var key in this._tiles) {
	  			if (!this._tiles[key].loaded) { return false; }
	  		}
	  		return true;
	  	}
	  });

	  // @factory L.gridLayer(options?: GridLayer options)
	  // Creates a new instance of GridLayer with the supplied options.
	  function gridLayer(options) {
	  	return new GridLayer(options);
	  }

	  /*
	   * @class TileLayer
	   * @inherits GridLayer
	   * @aka L.TileLayer
	   * Used to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under `Layer`. Extends `GridLayer`.
	   *
	   * @example
	   *
	   * ```js
	   * L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);
	   * ```
	   *
	   * @section URL template
	   * @example
	   *
	   * A string of the following form:
	   *
	   * ```
	   * 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
	   * ```
	   *
	   * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add "&commat;2x" to the URL to load retina tiles.
	   *
	   * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
	   *
	   * ```
	   * L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
	   * ```
	   */


	  var TileLayer = GridLayer.extend({

	  	// @section
	  	// @aka TileLayer options
	  	options: {
	  		// @option minZoom: Number = 0
	  		// The minimum zoom level down to which this layer will be displayed (inclusive).
	  		minZoom: 0,

	  		// @option maxZoom: Number = 18
	  		// The maximum zoom level up to which this layer will be displayed (inclusive).
	  		maxZoom: 18,

	  		// @option subdomains: String|String[] = 'abc'
	  		// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
	  		subdomains: 'abc',

	  		// @option errorTileUrl: String = ''
	  		// URL to the tile image to show in place of the tile that failed to load.
	  		errorTileUrl: '',

	  		// @option zoomOffset: Number = 0
	  		// The zoom number used in tile URLs will be offset with this value.
	  		zoomOffset: 0,

	  		// @option tms: Boolean = false
	  		// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
	  		tms: false,

	  		// @option zoomReverse: Boolean = false
	  		// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
	  		zoomReverse: false,

	  		// @option detectRetina: Boolean = false
	  		// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
	  		detectRetina: false,

	  		// @option crossOrigin: Boolean|String = false
	  		// Whether the crossOrigin attribute will be added to the tiles.
	  		// If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
	  		// Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
	  		crossOrigin: false
	  	},

	  	initialize: function (url, options) {

	  		this._url = url;

	  		options = setOptions(this, options);

	  		// detecting retina displays, adjusting tileSize and zoom levels
	  		if (options.detectRetina && retina && options.maxZoom > 0) {

	  			options.tileSize = Math.floor(options.tileSize / 2);

	  			if (!options.zoomReverse) {
	  				options.zoomOffset++;
	  				options.maxZoom--;
	  			} else {
	  				options.zoomOffset--;
	  				options.minZoom++;
	  			}

	  			options.minZoom = Math.max(0, options.minZoom);
	  		}

	  		if (typeof options.subdomains === 'string') {
	  			options.subdomains = options.subdomains.split('');
	  		}

	  		// for https://github.com/Leaflet/Leaflet/issues/137
	  		if (!android) {
	  			this.on('tileunload', this._onTileRemove);
	  		}
	  	},

	  	// @method setUrl(url: String, noRedraw?: Boolean): this
	  	// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
	  	// If the URL does not change, the layer will not be redrawn unless
	  	// the noRedraw parameter is set to false.
	  	setUrl: function (url, noRedraw) {
	  		if (this._url === url && noRedraw === undefined) {
	  			noRedraw = true;
	  		}

	  		this._url = url;

	  		if (!noRedraw) {
	  			this.redraw();
	  		}
	  		return this;
	  	},

	  	// @method createTile(coords: Object, done?: Function): HTMLElement
	  	// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
	  	// to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
	  	// callback is called when the tile has been loaded.
	  	createTile: function (coords, done) {
	  		var tile = document.createElement('img');

	  		on(tile, 'load', bind(this._tileOnLoad, this, done, tile));
	  		on(tile, 'error', bind(this._tileOnError, this, done, tile));

	  		if (this.options.crossOrigin || this.options.crossOrigin === '') {
	  			tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
	  		}

	  		/*
	  		 Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
	  		 http://www.w3.org/TR/WCAG20-TECHS/H67
	  		*/
	  		tile.alt = '';

	  		/*
	  		 Set role="presentation" to force screen readers to ignore this
	  		 https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
	  		*/
	  		tile.setAttribute('role', 'presentation');

	  		tile.src = this.getTileUrl(coords);

	  		return tile;
	  	},

	  	// @section Extension methods
	  	// @uninheritable
	  	// Layers extending `TileLayer` might reimplement the following method.
	  	// @method getTileUrl(coords: Object): String
	  	// Called only internally, returns the URL for a tile given its coordinates.
	  	// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
	  	getTileUrl: function (coords) {
	  		var data = {
	  			r: retina ? '@2x' : '',
	  			s: this._getSubdomain(coords),
	  			x: coords.x,
	  			y: coords.y,
	  			z: this._getZoomForUrl()
	  		};
	  		if (this._map && !this._map.options.crs.infinite) {
	  			var invertedY = this._globalTileRange.max.y - coords.y;
	  			if (this.options.tms) {
	  				data['y'] = invertedY;
	  			}
	  			data['-y'] = invertedY;
	  		}

	  		return template(this._url, extend(data, this.options));
	  	},

	  	_tileOnLoad: function (done, tile) {
	  		// For https://github.com/Leaflet/Leaflet/issues/3332
	  		if (ielt9) {
	  			setTimeout(bind(done, this, null, tile), 0);
	  		} else {
	  			done(null, tile);
	  		}
	  	},

	  	_tileOnError: function (done, tile, e) {
	  		var errorUrl = this.options.errorTileUrl;
	  		if (errorUrl && tile.getAttribute('src') !== errorUrl) {
	  			tile.src = errorUrl;
	  		}
	  		done(e, tile);
	  	},

	  	_onTileRemove: function (e) {
	  		e.tile.onload = null;
	  	},

	  	_getZoomForUrl: function () {
	  		var zoom = this._tileZoom,
	  		maxZoom = this.options.maxZoom,
	  		zoomReverse = this.options.zoomReverse,
	  		zoomOffset = this.options.zoomOffset;

	  		if (zoomReverse) {
	  			zoom = maxZoom - zoom;
	  		}

	  		return zoom + zoomOffset;
	  	},

	  	_getSubdomain: function (tilePoint) {
	  		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
	  		return this.options.subdomains[index];
	  	},

	  	// stops loading all tiles in the background layer
	  	_abortLoading: function () {
	  		var i, tile;
	  		for (i in this._tiles) {
	  			if (this._tiles[i].coords.z !== this._tileZoom) {
	  				tile = this._tiles[i].el;

	  				tile.onload = falseFn;
	  				tile.onerror = falseFn;

	  				if (!tile.complete) {
	  					tile.src = emptyImageUrl;
	  					remove(tile);
	  					delete this._tiles[i];
	  				}
	  			}
	  		}
	  	},

	  	_removeTile: function (key) {
	  		var tile = this._tiles[key];
	  		if (!tile) { return; }

	  		// Cancels any pending http requests associated with the tile
	  		// unless we're on Android's stock browser,
	  		// see https://github.com/Leaflet/Leaflet/issues/137
	  		if (!androidStock) {
	  			tile.el.setAttribute('src', emptyImageUrl);
	  		}

	  		return GridLayer.prototype._removeTile.call(this, key);
	  	},

	  	_tileReady: function (coords, err, tile) {
	  		if (!this._map || (tile && tile.getAttribute('src') === emptyImageUrl)) {
	  			return;
	  		}

	  		return GridLayer.prototype._tileReady.call(this, coords, err, tile);
	  	}
	  });


	  // @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
	  // Instantiates a tile layer object given a `URL template` and optionally an options object.

	  function tileLayer(url, options) {
	  	return new TileLayer(url, options);
	  }

	  /*
	   * @class TileLayer.WMS
	   * @inherits TileLayer
	   * @aka L.TileLayer.WMS
	   * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
	   *
	   * @example
	   *
	   * ```js
	   * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
	   * 	layers: 'nexrad-n0r-900913',
	   * 	format: 'image/png',
	   * 	transparent: true,
	   * 	attribution: "Weather data © 2012 IEM Nexrad"
	   * });
	   * ```
	   */

	  var TileLayerWMS = TileLayer.extend({

	  	// @section
	  	// @aka TileLayer.WMS options
	  	// If any custom options not documented here are used, they will be sent to the
	  	// WMS server as extra parameters in each request URL. This can be useful for
	  	// [non-standard vendor WMS parameters](http://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
	  	defaultWmsParams: {
	  		service: 'WMS',
	  		request: 'GetMap',

	  		// @option layers: String = ''
	  		// **(required)** Comma-separated list of WMS layers to show.
	  		layers: '',

	  		// @option styles: String = ''
	  		// Comma-separated list of WMS styles.
	  		styles: '',

	  		// @option format: String = 'image/jpeg'
	  		// WMS image format (use `'image/png'` for layers with transparency).
	  		format: 'image/jpeg',

	  		// @option transparent: Boolean = false
	  		// If `true`, the WMS service will return images with transparency.
	  		transparent: false,

	  		// @option version: String = '1.1.1'
	  		// Version of the WMS service to use
	  		version: '1.1.1'
	  	},

	  	options: {
	  		// @option crs: CRS = null
	  		// Coordinate Reference System to use for the WMS requests, defaults to
	  		// map CRS. Don't change this if you're not sure what it means.
	  		crs: null,

	  		// @option uppercase: Boolean = false
	  		// If `true`, WMS request parameter keys will be uppercase.
	  		uppercase: false
	  	},

	  	initialize: function (url, options) {

	  		this._url = url;

	  		var wmsParams = extend({}, this.defaultWmsParams);

	  		// all keys that are not TileLayer options go to WMS params
	  		for (var i in options) {
	  			if (!(i in this.options)) {
	  				wmsParams[i] = options[i];
	  			}
	  		}

	  		options = setOptions(this, options);

	  		var realRetina = options.detectRetina && retina ? 2 : 1;
	  		var tileSize = this.getTileSize();
	  		wmsParams.width = tileSize.x * realRetina;
	  		wmsParams.height = tileSize.y * realRetina;

	  		this.wmsParams = wmsParams;
	  	},

	  	onAdd: function (map) {

	  		this._crs = this.options.crs || map.options.crs;
	  		this._wmsVersion = parseFloat(this.wmsParams.version);

	  		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
	  		this.wmsParams[projectionKey] = this._crs.code;

	  		TileLayer.prototype.onAdd.call(this, map);
	  	},

	  	getTileUrl: function (coords) {

	  		var tileBounds = this._tileCoordsToNwSe(coords),
	  		    crs = this._crs,
	  		    bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])),
	  		    min = bounds.min,
	  		    max = bounds.max,
	  		    bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ?
	  		    [min.y, min.x, max.y, max.x] :
	  		    [min.x, min.y, max.x, max.y]).join(','),
	  		    url = TileLayer.prototype.getTileUrl.call(this, coords);
	  		return url +
	  			getParamString(this.wmsParams, url, this.options.uppercase) +
	  			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
	  	},

	  	// @method setParams(params: Object, noRedraw?: Boolean): this
	  	// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
	  	setParams: function (params, noRedraw) {

	  		extend(this.wmsParams, params);

	  		if (!noRedraw) {
	  			this.redraw();
	  		}

	  		return this;
	  	}
	  });


	  // @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
	  // Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
	  function tileLayerWMS(url, options) {
	  	return new TileLayerWMS(url, options);
	  }

	  TileLayer.WMS = TileLayerWMS;
	  tileLayer.wms = tileLayerWMS;

	  /*
	   * @class Renderer
	   * @inherits Layer
	   * @aka L.Renderer
	   *
	   * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
	   * DOM container of the renderer, its bounds, and its zoom animation.
	   *
	   * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
	   * itself can be added or removed to the map. All paths use a renderer, which can
	   * be implicit (the map will decide the type of renderer and use it automatically)
	   * or explicit (using the [`renderer`](#path-renderer) option of the path).
	   *
	   * Do not use this class directly, use `SVG` and `Canvas` instead.
	   *
	   * @event update: Event
	   * Fired when the renderer updates its bounds, center and zoom, for example when
	   * its map has moved
	   */

	  var Renderer = Layer.extend({

	  	// @section
	  	// @aka Renderer options
	  	options: {
	  		// @option padding: Number = 0.1
	  		// How much to extend the clip area around the map view (relative to its size)
	  		// e.g. 0.1 would be 10% of map view in each direction
	  		padding: 0.1,

	  		// @option tolerance: Number = 0
	  		// How much to extend click tolerance round a path/object on the map
	  		tolerance : 0
	  	},

	  	initialize: function (options) {
	  		setOptions(this, options);
	  		stamp(this);
	  		this._layers = this._layers || {};
	  	},

	  	onAdd: function () {
	  		if (!this._container) {
	  			this._initContainer(); // defined by renderer implementations

	  			if (this._zoomAnimated) {
	  				addClass(this._container, 'leaflet-zoom-animated');
	  			}
	  		}

	  		this.getPane().appendChild(this._container);
	  		this._update();
	  		this.on('update', this._updatePaths, this);
	  	},

	  	onRemove: function () {
	  		this.off('update', this._updatePaths, this);
	  		this._destroyContainer();
	  	},

	  	getEvents: function () {
	  		var events = {
	  			viewreset: this._reset,
	  			zoom: this._onZoom,
	  			moveend: this._update,
	  			zoomend: this._onZoomEnd
	  		};
	  		if (this._zoomAnimated) {
	  			events.zoomanim = this._onAnimZoom;
	  		}
	  		return events;
	  	},

	  	_onAnimZoom: function (ev) {
	  		this._updateTransform(ev.center, ev.zoom);
	  	},

	  	_onZoom: function () {
	  		this._updateTransform(this._map.getCenter(), this._map.getZoom());
	  	},

	  	_updateTransform: function (center, zoom) {
	  		var scale = this._map.getZoomScale(zoom, this._zoom),
	  		    position = getPosition(this._container),
	  		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
	  		    currentCenterPoint = this._map.project(this._center, zoom),
	  		    destCenterPoint = this._map.project(center, zoom),
	  		    centerOffset = destCenterPoint.subtract(currentCenterPoint),

	  		    topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

	  		if (any3d) {
	  			setTransform(this._container, topLeftOffset, scale);
	  		} else {
	  			setPosition(this._container, topLeftOffset);
	  		}
	  	},

	  	_reset: function () {
	  		this._update();
	  		this._updateTransform(this._center, this._zoom);

	  		for (var id in this._layers) {
	  			this._layers[id]._reset();
	  		}
	  	},

	  	_onZoomEnd: function () {
	  		for (var id in this._layers) {
	  			this._layers[id]._project();
	  		}
	  	},

	  	_updatePaths: function () {
	  		for (var id in this._layers) {
	  			this._layers[id]._update();
	  		}
	  	},

	  	_update: function () {
	  		// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
	  		// Subclasses are responsible of firing the 'update' event.
	  		var p = this.options.padding,
	  		    size = this._map.getSize(),
	  		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

	  		this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

	  		this._center = this._map.getCenter();
	  		this._zoom = this._map.getZoom();
	  	}
	  });

	  /*
	   * @class Canvas
	   * @inherits Renderer
	   * @aka L.Canvas
	   *
	   * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
	   * Inherits `Renderer`.
	   *
	   * Due to [technical limitations](http://caniuse.com/#search=canvas), Canvas is not
	   * available in all web browsers, notably IE8, and overlapping geometries might
	   * not display properly in some edge cases.
	   *
	   * @example
	   *
	   * Use Canvas by default for all paths in the map:
	   *
	   * ```js
	   * var map = L.map('map', {
	   * 	renderer: L.canvas()
	   * });
	   * ```
	   *
	   * Use a Canvas renderer with extra padding for specific vector geometries:
	   *
	   * ```js
	   * var map = L.map('map');
	   * var myRenderer = L.canvas({ padding: 0.5 });
	   * var line = L.polyline( coordinates, { renderer: myRenderer } );
	   * var circle = L.circle( center, { renderer: myRenderer } );
	   * ```
	   */

	  var Canvas = Renderer.extend({
	  	getEvents: function () {
	  		var events = Renderer.prototype.getEvents.call(this);
	  		events.viewprereset = this._onViewPreReset;
	  		return events;
	  	},

	  	_onViewPreReset: function () {
	  		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
	  		this._postponeUpdatePaths = true;
	  	},

	  	onAdd: function () {
	  		Renderer.prototype.onAdd.call(this);

	  		// Redraw vectors since canvas is cleared upon removal,
	  		// in case of removing the renderer itself from the map.
	  		this._draw();
	  	},

	  	_initContainer: function () {
	  		var container = this._container = document.createElement('canvas');

	  		on(container, 'mousemove', this._onMouseMove, this);
	  		on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
	  		on(container, 'mouseout', this._handleMouseOut, this);

	  		this._ctx = container.getContext('2d');
	  	},

	  	_destroyContainer: function () {
	  		cancelAnimFrame(this._redrawRequest);
	  		delete this._ctx;
	  		remove(this._container);
	  		off(this._container);
	  		delete this._container;
	  	},

	  	_updatePaths: function () {
	  		if (this._postponeUpdatePaths) { return; }

	  		var layer;
	  		this._redrawBounds = null;
	  		for (var id in this._layers) {
	  			layer = this._layers[id];
	  			layer._update();
	  		}
	  		this._redraw();
	  	},

	  	_update: function () {
	  		if (this._map._animatingZoom && this._bounds) { return; }

	  		Renderer.prototype._update.call(this);

	  		var b = this._bounds,
	  		    container = this._container,
	  		    size = b.getSize(),
	  		    m = retina ? 2 : 1;

	  		setPosition(container, b.min);

	  		// set canvas size (also clearing it); use double size on retina
	  		container.width = m * size.x;
	  		container.height = m * size.y;
	  		container.style.width = size.x + 'px';
	  		container.style.height = size.y + 'px';

	  		if (retina) {
	  			this._ctx.scale(2, 2);
	  		}

	  		// translate so we use the same path coordinates after canvas element moves
	  		this._ctx.translate(-b.min.x, -b.min.y);

	  		// Tell paths to redraw themselves
	  		this.fire('update');
	  	},

	  	_reset: function () {
	  		Renderer.prototype._reset.call(this);

	  		if (this._postponeUpdatePaths) {
	  			this._postponeUpdatePaths = false;
	  			this._updatePaths();
	  		}
	  	},

	  	_initPath: function (layer) {
	  		this._updateDashArray(layer);
	  		this._layers[stamp(layer)] = layer;

	  		var order = layer._order = {
	  			layer: layer,
	  			prev: this._drawLast,
	  			next: null
	  		};
	  		if (this._drawLast) { this._drawLast.next = order; }
	  		this._drawLast = order;
	  		this._drawFirst = this._drawFirst || this._drawLast;
	  	},

	  	_addPath: function (layer) {
	  		this._requestRedraw(layer);
	  	},

	  	_removePath: function (layer) {
	  		var order = layer._order;
	  		var next = order.next;
	  		var prev = order.prev;

	  		if (next) {
	  			next.prev = prev;
	  		} else {
	  			this._drawLast = prev;
	  		}
	  		if (prev) {
	  			prev.next = next;
	  		} else {
	  			this._drawFirst = next;
	  		}

	  		delete layer._order;

	  		delete this._layers[stamp(layer)];

	  		this._requestRedraw(layer);
	  	},

	  	_updatePath: function (layer) {
	  		// Redraw the union of the layer's old pixel
	  		// bounds and the new pixel bounds.
	  		this._extendRedrawBounds(layer);
	  		layer._project();
	  		layer._update();
	  		// The redraw will extend the redraw bounds
	  		// with the new pixel bounds.
	  		this._requestRedraw(layer);
	  	},

	  	_updateStyle: function (layer) {
	  		this._updateDashArray(layer);
	  		this._requestRedraw(layer);
	  	},

	  	_updateDashArray: function (layer) {
	  		if (typeof layer.options.dashArray === 'string') {
	  			var parts = layer.options.dashArray.split(/[, ]+/),
	  			    dashArray = [],
	  			    dashValue,
	  			    i;
	  			for (i = 0; i < parts.length; i++) {
	  				dashValue = Number(parts[i]);
	  				// Ignore dash array containing invalid lengths
	  				if (isNaN(dashValue)) { return; }
	  				dashArray.push(dashValue);
	  			}
	  			layer.options._dashArray = dashArray;
	  		} else {
	  			layer.options._dashArray = layer.options.dashArray;
	  		}
	  	},

	  	_requestRedraw: function (layer) {
	  		if (!this._map) { return; }

	  		this._extendRedrawBounds(layer);
	  		this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
	  	},

	  	_extendRedrawBounds: function (layer) {
	  		if (layer._pxBounds) {
	  			var padding = (layer.options.weight || 0) + 1;
	  			this._redrawBounds = this._redrawBounds || new Bounds();
	  			this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
	  			this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
	  		}
	  	},

	  	_redraw: function () {
	  		this._redrawRequest = null;

	  		if (this._redrawBounds) {
	  			this._redrawBounds.min._floor();
	  			this._redrawBounds.max._ceil();
	  		}

	  		this._clear(); // clear layers in redraw bounds
	  		this._draw(); // draw layers

	  		this._redrawBounds = null;
	  	},

	  	_clear: function () {
	  		var bounds = this._redrawBounds;
	  		if (bounds) {
	  			var size = bounds.getSize();
	  			this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
	  		} else {
	  			this._ctx.save();
	  			this._ctx.setTransform(1, 0, 0, 1, 0, 0);
	  			this._ctx.clearRect(0, 0, this._container.width, this._container.height);
	  			this._ctx.restore();
	  		}
	  	},

	  	_draw: function () {
	  		var layer, bounds = this._redrawBounds;
	  		this._ctx.save();
	  		if (bounds) {
	  			var size = bounds.getSize();
	  			this._ctx.beginPath();
	  			this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
	  			this._ctx.clip();
	  		}

	  		this._drawing = true;

	  		for (var order = this._drawFirst; order; order = order.next) {
	  			layer = order.layer;
	  			if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
	  				layer._updatePath();
	  			}
	  		}

	  		this._drawing = false;

	  		this._ctx.restore();  // Restore state before clipping.
	  	},

	  	_updatePoly: function (layer, closed) {
	  		if (!this._drawing) { return; }

	  		var i, j, len2, p,
	  		    parts = layer._parts,
	  		    len = parts.length,
	  		    ctx = this._ctx;

	  		if (!len) { return; }

	  		ctx.beginPath();

	  		for (i = 0; i < len; i++) {
	  			for (j = 0, len2 = parts[i].length; j < len2; j++) {
	  				p = parts[i][j];
	  				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
	  			}
	  			if (closed) {
	  				ctx.closePath();
	  			}
	  		}

	  		this._fillStroke(ctx, layer);

	  		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	  	},

	  	_updateCircle: function (layer) {

	  		if (!this._drawing || layer._empty()) { return; }

	  		var p = layer._point,
	  		    ctx = this._ctx,
	  		    r = Math.max(Math.round(layer._radius), 1),
	  		    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;

	  		if (s !== 1) {
	  			ctx.save();
	  			ctx.scale(1, s);
	  		}

	  		ctx.beginPath();
	  		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

	  		if (s !== 1) {
	  			ctx.restore();
	  		}

	  		this._fillStroke(ctx, layer);
	  	},

	  	_fillStroke: function (ctx, layer) {
	  		var options = layer.options;

	  		if (options.fill) {
	  			ctx.globalAlpha = options.fillOpacity;
	  			ctx.fillStyle = options.fillColor || options.color;
	  			ctx.fill(options.fillRule || 'evenodd');
	  		}

	  		if (options.stroke && options.weight !== 0) {
	  			if (ctx.setLineDash) {
	  				ctx.setLineDash(layer.options && layer.options._dashArray || []);
	  			}
	  			ctx.globalAlpha = options.opacity;
	  			ctx.lineWidth = options.weight;
	  			ctx.strokeStyle = options.color;
	  			ctx.lineCap = options.lineCap;
	  			ctx.lineJoin = options.lineJoin;
	  			ctx.stroke();
	  		}
	  	},

	  	// Canvas obviously doesn't have mouse events for individual drawn objects,
	  	// so we emulate that by calculating what's under the mouse on mousemove/click manually

	  	_onClick: function (e) {
	  		var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;

	  		for (var order = this._drawFirst; order; order = order.next) {
	  			layer = order.layer;
	  			if (layer.options.interactive && layer._containsPoint(point)) {
	  				if (!(e.type === 'click' || e.type !== 'preclick') || !this._map._draggableMoved(layer)) {
	  					clickedLayer = layer;
	  				}
	  			}
	  		}
	  		if (clickedLayer)  {
	  			fakeStop(e);
	  			this._fireEvent([clickedLayer], e);
	  		}
	  	},

	  	_onMouseMove: function (e) {
	  		if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }

	  		var point = this._map.mouseEventToLayerPoint(e);
	  		this._handleMouseHover(e, point);
	  	},


	  	_handleMouseOut: function (e) {
	  		var layer = this._hoveredLayer;
	  		if (layer) {
	  			// if we're leaving the layer, fire mouseout
	  			removeClass(this._container, 'leaflet-interactive');
	  			this._fireEvent([layer], e, 'mouseout');
	  			this._hoveredLayer = null;
	  			this._mouseHoverThrottled = false;
	  		}
	  	},

	  	_handleMouseHover: function (e, point) {
	  		if (this._mouseHoverThrottled) {
	  			return;
	  		}

	  		var layer, candidateHoveredLayer;

	  		for (var order = this._drawFirst; order; order = order.next) {
	  			layer = order.layer;
	  			if (layer.options.interactive && layer._containsPoint(point)) {
	  				candidateHoveredLayer = layer;
	  			}
	  		}

	  		if (candidateHoveredLayer !== this._hoveredLayer) {
	  			this._handleMouseOut(e);

	  			if (candidateHoveredLayer) {
	  				addClass(this._container, 'leaflet-interactive'); // change cursor
	  				this._fireEvent([candidateHoveredLayer], e, 'mouseover');
	  				this._hoveredLayer = candidateHoveredLayer;
	  			}
	  		}

	  		if (this._hoveredLayer) {
	  			this._fireEvent([this._hoveredLayer], e);
	  		}

	  		this._mouseHoverThrottled = true;
	  		setTimeout(bind(function () {
	  			this._mouseHoverThrottled = false;
	  		}, this), 32);
	  	},

	  	_fireEvent: function (layers, e, type) {
	  		this._map._fireDOMEvent(e, type || e.type, layers);
	  	},

	  	_bringToFront: function (layer) {
	  		var order = layer._order;

	  		if (!order) { return; }

	  		var next = order.next;
	  		var prev = order.prev;

	  		if (next) {
	  			next.prev = prev;
	  		} else {
	  			// Already last
	  			return;
	  		}
	  		if (prev) {
	  			prev.next = next;
	  		} else if (next) {
	  			// Update first entry unless this is the
	  			// single entry
	  			this._drawFirst = next;
	  		}

	  		order.prev = this._drawLast;
	  		this._drawLast.next = order;

	  		order.next = null;
	  		this._drawLast = order;

	  		this._requestRedraw(layer);
	  	},

	  	_bringToBack: function (layer) {
	  		var order = layer._order;

	  		if (!order) { return; }

	  		var next = order.next;
	  		var prev = order.prev;

	  		if (prev) {
	  			prev.next = next;
	  		} else {
	  			// Already first
	  			return;
	  		}
	  		if (next) {
	  			next.prev = prev;
	  		} else if (prev) {
	  			// Update last entry unless this is the
	  			// single entry
	  			this._drawLast = prev;
	  		}

	  		order.prev = null;

	  		order.next = this._drawFirst;
	  		this._drawFirst.prev = order;
	  		this._drawFirst = order;

	  		this._requestRedraw(layer);
	  	}
	  });

	  // @factory L.canvas(options?: Renderer options)
	  // Creates a Canvas renderer with the given options.
	  function canvas$1(options) {
	  	return canvas ? new Canvas(options) : null;
	  }

	  /*
	   * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
	   */


	  var vmlCreate = (function () {
	  	try {
	  		document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
	  		return function (name) {
	  			return document.createElement('<lvml:' + name + ' class="lvml">');
	  		};
	  	} catch (e) {
	  		return function (name) {
	  			return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
	  		};
	  	}
	  })();


	  /*
	   * @class SVG
	   *
	   *
	   * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
	   * with old versions of Internet Explorer.
	   */

	  // mixin to redefine some SVG methods to handle VML syntax which is similar but with some differences
	  var vmlMixin = {

	  	_initContainer: function () {
	  		this._container = create$1('div', 'leaflet-vml-container');
	  	},

	  	_update: function () {
	  		if (this._map._animatingZoom) { return; }
	  		Renderer.prototype._update.call(this);
	  		this.fire('update');
	  	},

	  	_initPath: function (layer) {
	  		var container = layer._container = vmlCreate('shape');

	  		addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

	  		container.coordsize = '1 1';

	  		layer._path = vmlCreate('path');
	  		container.appendChild(layer._path);

	  		this._updateStyle(layer);
	  		this._layers[stamp(layer)] = layer;
	  	},

	  	_addPath: function (layer) {
	  		var container = layer._container;
	  		this._container.appendChild(container);

	  		if (layer.options.interactive) {
	  			layer.addInteractiveTarget(container);
	  		}
	  	},

	  	_removePath: function (layer) {
	  		var container = layer._container;
	  		remove(container);
	  		layer.removeInteractiveTarget(container);
	  		delete this._layers[stamp(layer)];
	  	},

	  	_updateStyle: function (layer) {
	  		var stroke = layer._stroke,
	  		    fill = layer._fill,
	  		    options = layer.options,
	  		    container = layer._container;

	  		container.stroked = !!options.stroke;
	  		container.filled = !!options.fill;

	  		if (options.stroke) {
	  			if (!stroke) {
	  				stroke = layer._stroke = vmlCreate('stroke');
	  			}
	  			container.appendChild(stroke);
	  			stroke.weight = options.weight + 'px';
	  			stroke.color = options.color;
	  			stroke.opacity = options.opacity;

	  			if (options.dashArray) {
	  				stroke.dashStyle = isArray(options.dashArray) ?
	  				    options.dashArray.join(' ') :
	  				    options.dashArray.replace(/( *, *)/g, ' ');
	  			} else {
	  				stroke.dashStyle = '';
	  			}
	  			stroke.endcap = options.lineCap.replace('butt', 'flat');
	  			stroke.joinstyle = options.lineJoin;

	  		} else if (stroke) {
	  			container.removeChild(stroke);
	  			layer._stroke = null;
	  		}

	  		if (options.fill) {
	  			if (!fill) {
	  				fill = layer._fill = vmlCreate('fill');
	  			}
	  			container.appendChild(fill);
	  			fill.color = options.fillColor || options.color;
	  			fill.opacity = options.fillOpacity;

	  		} else if (fill) {
	  			container.removeChild(fill);
	  			layer._fill = null;
	  		}
	  	},

	  	_updateCircle: function (layer) {
	  		var p = layer._point.round(),
	  		    r = Math.round(layer._radius),
	  		    r2 = Math.round(layer._radiusY || r);

	  		this._setPath(layer, layer._empty() ? 'M0 0' :
	  			'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
	  	},

	  	_setPath: function (layer, path) {
	  		layer._path.v = path;
	  	},

	  	_bringToFront: function (layer) {
	  		toFront(layer._container);
	  	},

	  	_bringToBack: function (layer) {
	  		toBack(layer._container);
	  	}
	  };

	  var create$2 = vml ? vmlCreate : svgCreate;

	  /*
	   * @class SVG
	   * @inherits Renderer
	   * @aka L.SVG
	   *
	   * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
	   * Inherits `Renderer`.
	   *
	   * Due to [technical limitations](http://caniuse.com/#search=svg), SVG is not
	   * available in all web browsers, notably Android 2.x and 3.x.
	   *
	   * Although SVG is not available on IE7 and IE8, these browsers support
	   * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
	   * (a now deprecated technology), and the SVG renderer will fall back to VML in
	   * this case.
	   *
	   * @example
	   *
	   * Use SVG by default for all paths in the map:
	   *
	   * ```js
	   * var map = L.map('map', {
	   * 	renderer: L.svg()
	   * });
	   * ```
	   *
	   * Use a SVG renderer with extra padding for specific vector geometries:
	   *
	   * ```js
	   * var map = L.map('map');
	   * var myRenderer = L.svg({ padding: 0.5 });
	   * var line = L.polyline( coordinates, { renderer: myRenderer } );
	   * var circle = L.circle( center, { renderer: myRenderer } );
	   * ```
	   */

	  var SVG = Renderer.extend({

	  	getEvents: function () {
	  		var events = Renderer.prototype.getEvents.call(this);
	  		events.zoomstart = this._onZoomStart;
	  		return events;
	  	},

	  	_initContainer: function () {
	  		this._container = create$2('svg');

	  		// makes it possible to click through svg root; we'll reset it back in individual paths
	  		this._container.setAttribute('pointer-events', 'none');

	  		this._rootGroup = create$2('g');
	  		this._container.appendChild(this._rootGroup);
	  	},

	  	_destroyContainer: function () {
	  		remove(this._container);
	  		off(this._container);
	  		delete this._container;
	  		delete this._rootGroup;
	  		delete this._svgSize;
	  	},

	  	_onZoomStart: function () {
	  		// Drag-then-pinch interactions might mess up the center and zoom.
	  		// In this case, the easiest way to prevent this is re-do the renderer
	  		//   bounds and padding when the zooming starts.
	  		this._update();
	  	},

	  	_update: function () {
	  		if (this._map._animatingZoom && this._bounds) { return; }

	  		Renderer.prototype._update.call(this);

	  		var b = this._bounds,
	  		    size = b.getSize(),
	  		    container = this._container;

	  		// set size of svg-container if changed
	  		if (!this._svgSize || !this._svgSize.equals(size)) {
	  			this._svgSize = size;
	  			container.setAttribute('width', size.x);
	  			container.setAttribute('height', size.y);
	  		}

	  		// movement: update container viewBox so that we don't have to change coordinates of individual layers
	  		setPosition(container, b.min);
	  		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

	  		this.fire('update');
	  	},

	  	// methods below are called by vector layers implementations

	  	_initPath: function (layer) {
	  		var path = layer._path = create$2('path');

	  		// @namespace Path
	  		// @option className: String = null
	  		// Custom class name set on an element. Only for SVG renderer.
	  		if (layer.options.className) {
	  			addClass(path, layer.options.className);
	  		}

	  		if (layer.options.interactive) {
	  			addClass(path, 'leaflet-interactive');
	  		}

	  		this._updateStyle(layer);
	  		this._layers[stamp(layer)] = layer;
	  	},

	  	_addPath: function (layer) {
	  		if (!this._rootGroup) { this._initContainer(); }
	  		this._rootGroup.appendChild(layer._path);
	  		layer.addInteractiveTarget(layer._path);
	  	},

	  	_removePath: function (layer) {
	  		remove(layer._path);
	  		layer.removeInteractiveTarget(layer._path);
	  		delete this._layers[stamp(layer)];
	  	},

	  	_updatePath: function (layer) {
	  		layer._project();
	  		layer._update();
	  	},

	  	_updateStyle: function (layer) {
	  		var path = layer._path,
	  		    options = layer.options;

	  		if (!path) { return; }

	  		if (options.stroke) {
	  			path.setAttribute('stroke', options.color);
	  			path.setAttribute('stroke-opacity', options.opacity);
	  			path.setAttribute('stroke-width', options.weight);
	  			path.setAttribute('stroke-linecap', options.lineCap);
	  			path.setAttribute('stroke-linejoin', options.lineJoin);

	  			if (options.dashArray) {
	  				path.setAttribute('stroke-dasharray', options.dashArray);
	  			} else {
	  				path.removeAttribute('stroke-dasharray');
	  			}

	  			if (options.dashOffset) {
	  				path.setAttribute('stroke-dashoffset', options.dashOffset);
	  			} else {
	  				path.removeAttribute('stroke-dashoffset');
	  			}
	  		} else {
	  			path.setAttribute('stroke', 'none');
	  		}

	  		if (options.fill) {
	  			path.setAttribute('fill', options.fillColor || options.color);
	  			path.setAttribute('fill-opacity', options.fillOpacity);
	  			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
	  		} else {
	  			path.setAttribute('fill', 'none');
	  		}
	  	},

	  	_updatePoly: function (layer, closed) {
	  		this._setPath(layer, pointsToPath(layer._parts, closed));
	  	},

	  	_updateCircle: function (layer) {
	  		var p = layer._point,
	  		    r = Math.max(Math.round(layer._radius), 1),
	  		    r2 = Math.max(Math.round(layer._radiusY), 1) || r,
	  		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

	  		// drawing a circle with two half-arcs
	  		var d = layer._empty() ? 'M0 0' :
	  			'M' + (p.x - r) + ',' + p.y +
	  			arc + (r * 2) + ',0 ' +
	  			arc + (-r * 2) + ',0 ';

	  		this._setPath(layer, d);
	  	},

	  	_setPath: function (layer, path) {
	  		layer._path.setAttribute('d', path);
	  	},

	  	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
	  	_bringToFront: function (layer) {
	  		toFront(layer._path);
	  	},

	  	_bringToBack: function (layer) {
	  		toBack(layer._path);
	  	}
	  });

	  if (vml) {
	  	SVG.include(vmlMixin);
	  }

	  // @namespace SVG
	  // @factory L.svg(options?: Renderer options)
	  // Creates a SVG renderer with the given options.
	  function svg$1(options) {
	  	return svg || vml ? new SVG(options) : null;
	  }

	  Map.include({
	  	// @namespace Map; @method getRenderer(layer: Path): Renderer
	  	// Returns the instance of `Renderer` that should be used to render the given
	  	// `Path`. It will ensure that the `renderer` options of the map and paths
	  	// are respected, and that the renderers do exist on the map.
	  	getRenderer: function (layer) {
	  		// @namespace Path; @option renderer: Renderer
	  		// Use this specific instance of `Renderer` for this path. Takes
	  		// precedence over the map's [default renderer](#map-renderer).
	  		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

	  		if (!renderer) {
	  			renderer = this._renderer = this._createRenderer();
	  		}

	  		if (!this.hasLayer(renderer)) {
	  			this.addLayer(renderer);
	  		}
	  		return renderer;
	  	},

	  	_getPaneRenderer: function (name) {
	  		if (name === 'overlayPane' || name === undefined) {
	  			return false;
	  		}

	  		var renderer = this._paneRenderers[name];
	  		if (renderer === undefined) {
	  			renderer = this._createRenderer({pane: name});
	  			this._paneRenderers[name] = renderer;
	  		}
	  		return renderer;
	  	},

	  	_createRenderer: function (options) {
	  		// @namespace Map; @option preferCanvas: Boolean = false
	  		// Whether `Path`s should be rendered on a `Canvas` renderer.
	  		// By default, all `Path`s are rendered in a `SVG` renderer.
	  		return (this.options.preferCanvas && canvas$1(options)) || svg$1(options);
	  	}
	  });

	  /*
	   * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
	   */

	  /*
	   * @class Rectangle
	   * @aka L.Rectangle
	   * @inherits Polygon
	   *
	   * A class for drawing rectangle overlays on a map. Extends `Polygon`.
	   *
	   * @example
	   *
	   * ```js
	   * // define rectangle geographical bounds
	   * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
	   *
	   * // create an orange rectangle
	   * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
	   *
	   * // zoom the map to the rectangle bounds
	   * map.fitBounds(bounds);
	   * ```
	   *
	   */


	  var Rectangle = Polygon.extend({
	  	initialize: function (latLngBounds, options) {
	  		Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	  	},

	  	// @method setBounds(latLngBounds: LatLngBounds): this
	  	// Redraws the rectangle with the passed bounds.
	  	setBounds: function (latLngBounds) {
	  		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	  	},

	  	_boundsToLatLngs: function (latLngBounds) {
	  		latLngBounds = toLatLngBounds(latLngBounds);
	  		return [
	  			latLngBounds.getSouthWest(),
	  			latLngBounds.getNorthWest(),
	  			latLngBounds.getNorthEast(),
	  			latLngBounds.getSouthEast()
	  		];
	  	}
	  });


	  // @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
	  function rectangle(latLngBounds, options) {
	  	return new Rectangle(latLngBounds, options);
	  }

	  SVG.create = create$2;
	  SVG.pointsToPath = pointsToPath;

	  GeoJSON.geometryToLayer = geometryToLayer;
	  GeoJSON.coordsToLatLng = coordsToLatLng;
	  GeoJSON.coordsToLatLngs = coordsToLatLngs;
	  GeoJSON.latLngToCoords = latLngToCoords;
	  GeoJSON.latLngsToCoords = latLngsToCoords;
	  GeoJSON.getFeature = getFeature;
	  GeoJSON.asFeature = asFeature;

	  /*
	   * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
	   * (zoom to a selected bounding box), enabled by default.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @option boxZoom: Boolean = true
	  	// Whether the map can be zoomed to a rectangular area specified by
	  	// dragging the mouse while pressing the shift key.
	  	boxZoom: true
	  });

	  var BoxZoom = Handler.extend({
	  	initialize: function (map) {
	  		this._map = map;
	  		this._container = map._container;
	  		this._pane = map._panes.overlayPane;
	  		this._resetStateTimeout = 0;
	  		map.on('unload', this._destroy, this);
	  	},

	  	addHooks: function () {
	  		on(this._container, 'mousedown', this._onMouseDown, this);
	  	},

	  	removeHooks: function () {
	  		off(this._container, 'mousedown', this._onMouseDown, this);
	  	},

	  	moved: function () {
	  		return this._moved;
	  	},

	  	_destroy: function () {
	  		remove(this._pane);
	  		delete this._pane;
	  	},

	  	_resetState: function () {
	  		this._resetStateTimeout = 0;
	  		this._moved = false;
	  	},

	  	_clearDeferredResetState: function () {
	  		if (this._resetStateTimeout !== 0) {
	  			clearTimeout(this._resetStateTimeout);
	  			this._resetStateTimeout = 0;
	  		}
	  	},

	  	_onMouseDown: function (e) {
	  		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

	  		// Clear the deferred resetState if it hasn't executed yet, otherwise it
	  		// will interrupt the interaction and orphan a box element in the container.
	  		this._clearDeferredResetState();
	  		this._resetState();

	  		disableTextSelection();
	  		disableImageDrag();

	  		this._startPoint = this._map.mouseEventToContainerPoint(e);

	  		on(document, {
	  			contextmenu: stop,
	  			mousemove: this._onMouseMove,
	  			mouseup: this._onMouseUp,
	  			keydown: this._onKeyDown
	  		}, this);
	  	},

	  	_onMouseMove: function (e) {
	  		if (!this._moved) {
	  			this._moved = true;

	  			this._box = create$1('div', 'leaflet-zoom-box', this._container);
	  			addClass(this._container, 'leaflet-crosshair');

	  			this._map.fire('boxzoomstart');
	  		}

	  		this._point = this._map.mouseEventToContainerPoint(e);

	  		var bounds = new Bounds(this._point, this._startPoint),
	  		    size = bounds.getSize();

	  		setPosition(this._box, bounds.min);

	  		this._box.style.width  = size.x + 'px';
	  		this._box.style.height = size.y + 'px';
	  	},

	  	_finish: function () {
	  		if (this._moved) {
	  			remove(this._box);
	  			removeClass(this._container, 'leaflet-crosshair');
	  		}

	  		enableTextSelection();
	  		enableImageDrag();

	  		off(document, {
	  			contextmenu: stop,
	  			mousemove: this._onMouseMove,
	  			mouseup: this._onMouseUp,
	  			keydown: this._onKeyDown
	  		}, this);
	  	},

	  	_onMouseUp: function (e) {
	  		if ((e.which !== 1) && (e.button !== 1)) { return; }

	  		this._finish();

	  		if (!this._moved) { return; }
	  		// Postpone to next JS tick so internal click event handling
	  		// still see it as "moved".
	  		this._clearDeferredResetState();
	  		this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);

	  		var bounds = new LatLngBounds(
	  		        this._map.containerPointToLatLng(this._startPoint),
	  		        this._map.containerPointToLatLng(this._point));

	  		this._map
	  			.fitBounds(bounds)
	  			.fire('boxzoomend', {boxZoomBounds: bounds});
	  	},

	  	_onKeyDown: function (e) {
	  		if (e.keyCode === 27) {
	  			this._finish();
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property boxZoom: Handler
	  // Box (shift-drag with mouse) zoom handler.
	  Map.addInitHook('addHandler', 'boxZoom', BoxZoom);

	  /*
	   * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
	   */

	  // @namespace Map
	  // @section Interaction Options

	  Map.mergeOptions({
	  	// @option doubleClickZoom: Boolean|String = true
	  	// Whether the map can be zoomed in by double clicking on it and
	  	// zoomed out by double clicking while holding shift. If passed
	  	// `'center'`, double-click zoom will zoom to the center of the
	  	//  view regardless of where the mouse was.
	  	doubleClickZoom: true
	  });

	  var DoubleClickZoom = Handler.extend({
	  	addHooks: function () {
	  		this._map.on('dblclick', this._onDoubleClick, this);
	  	},

	  	removeHooks: function () {
	  		this._map.off('dblclick', this._onDoubleClick, this);
	  	},

	  	_onDoubleClick: function (e) {
	  		var map = this._map,
	  		    oldZoom = map.getZoom(),
	  		    delta = map.options.zoomDelta,
	  		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

	  		if (map.options.doubleClickZoom === 'center') {
	  			map.setZoom(zoom);
	  		} else {
	  			map.setZoomAround(e.containerPoint, zoom);
	  		}
	  	}
	  });

	  // @section Handlers
	  //
	  // Map properties include interaction handlers that allow you to control
	  // interaction behavior in runtime, enabling or disabling certain features such
	  // as dragging or touch zoom (see `Handler` methods). For example:
	  //
	  // ```js
	  // map.doubleClickZoom.disable();
	  // ```
	  //
	  // @property doubleClickZoom: Handler
	  // Double click zoom handler.
	  Map.addInitHook('addHandler', 'doubleClickZoom', DoubleClickZoom);

	  /*
	   * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @option dragging: Boolean = true
	  	// Whether the map be draggable with mouse/touch or not.
	  	dragging: true,

	  	// @section Panning Inertia Options
	  	// @option inertia: Boolean = *
	  	// If enabled, panning of the map will have an inertia effect where
	  	// the map builds momentum while dragging and continues moving in
	  	// the same direction for some time. Feels especially nice on touch
	  	// devices. Enabled by default unless running on old Android devices.
	  	inertia: !android23,

	  	// @option inertiaDeceleration: Number = 3000
	  	// The rate with which the inertial movement slows down, in pixels/second².
	  	inertiaDeceleration: 3400, // px/s^2

	  	// @option inertiaMaxSpeed: Number = Infinity
	  	// Max speed of the inertial movement, in pixels/second.
	  	inertiaMaxSpeed: Infinity, // px/s

	  	// @option easeLinearity: Number = 0.2
	  	easeLinearity: 0.2,

	  	// TODO refactor, move to CRS
	  	// @option worldCopyJump: Boolean = false
	  	// With this option enabled, the map tracks when you pan to another "copy"
	  	// of the world and seamlessly jumps to the original one so that all overlays
	  	// like markers and vector layers are still visible.
	  	worldCopyJump: false,

	  	// @option maxBoundsViscosity: Number = 0.0
	  	// If `maxBounds` is set, this option will control how solid the bounds
	  	// are when dragging the map around. The default value of `0.0` allows the
	  	// user to drag outside the bounds at normal speed, higher values will
	  	// slow down map dragging outside bounds, and `1.0` makes the bounds fully
	  	// solid, preventing the user from dragging outside the bounds.
	  	maxBoundsViscosity: 0.0
	  });

	  var Drag = Handler.extend({
	  	addHooks: function () {
	  		if (!this._draggable) {
	  			var map = this._map;

	  			this._draggable = new Draggable(map._mapPane, map._container);

	  			this._draggable.on({
	  				dragstart: this._onDragStart,
	  				drag: this._onDrag,
	  				dragend: this._onDragEnd
	  			}, this);

	  			this._draggable.on('predrag', this._onPreDragLimit, this);
	  			if (map.options.worldCopyJump) {
	  				this._draggable.on('predrag', this._onPreDragWrap, this);
	  				map.on('zoomend', this._onZoomEnd, this);

	  				map.whenReady(this._onZoomEnd, this);
	  			}
	  		}
	  		addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
	  		this._draggable.enable();
	  		this._positions = [];
	  		this._times = [];
	  	},

	  	removeHooks: function () {
	  		removeClass(this._map._container, 'leaflet-grab');
	  		removeClass(this._map._container, 'leaflet-touch-drag');
	  		this._draggable.disable();
	  	},

	  	moved: function () {
	  		return this._draggable && this._draggable._moved;
	  	},

	  	moving: function () {
	  		return this._draggable && this._draggable._moving;
	  	},

	  	_onDragStart: function () {
	  		var map = this._map;

	  		map._stop();
	  		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
	  			var bounds = toLatLngBounds(this._map.options.maxBounds);

	  			this._offsetLimit = toBounds(
	  				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
	  				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
	  					.add(this._map.getSize()));

	  			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
	  		} else {
	  			this._offsetLimit = null;
	  		}

	  		map
	  		    .fire('movestart')
	  		    .fire('dragstart');

	  		if (map.options.inertia) {
	  			this._positions = [];
	  			this._times = [];
	  		}
	  	},

	  	_onDrag: function (e) {
	  		if (this._map.options.inertia) {
	  			var time = this._lastTime = +new Date(),
	  			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

	  			this._positions.push(pos);
	  			this._times.push(time);

	  			this._prunePositions(time);
	  		}

	  		this._map
	  		    .fire('move', e)
	  		    .fire('drag', e);
	  	},

	  	_prunePositions: function (time) {
	  		while (this._positions.length > 1 && time - this._times[0] > 50) {
	  			this._positions.shift();
	  			this._times.shift();
	  		}
	  	},

	  	_onZoomEnd: function () {
	  		var pxCenter = this._map.getSize().divideBy(2),
	  		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

	  		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
	  		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
	  	},

	  	_viscousLimit: function (value, threshold) {
	  		return value - (value - threshold) * this._viscosity;
	  	},

	  	_onPreDragLimit: function () {
	  		if (!this._viscosity || !this._offsetLimit) { return; }

	  		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

	  		var limit = this._offsetLimit;
	  		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
	  		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
	  		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
	  		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

	  		this._draggable._newPos = this._draggable._startPos.add(offset);
	  	},

	  	_onPreDragWrap: function () {
	  		// TODO refactor to be able to adjust map pane position after zoom
	  		var worldWidth = this._worldWidth,
	  		    halfWidth = Math.round(worldWidth / 2),
	  		    dx = this._initialWorldOffset,
	  		    x = this._draggable._newPos.x,
	  		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
	  		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
	  		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

	  		this._draggable._absPos = this._draggable._newPos.clone();
	  		this._draggable._newPos.x = newX;
	  	},

	  	_onDragEnd: function (e) {
	  		var map = this._map,
	  		    options = map.options,

	  		    noInertia = !options.inertia || this._times.length < 2;

	  		map.fire('dragend', e);

	  		if (noInertia) {
	  			map.fire('moveend');

	  		} else {
	  			this._prunePositions(+new Date());

	  			var direction = this._lastPos.subtract(this._positions[0]),
	  			    duration = (this._lastTime - this._times[0]) / 1000,
	  			    ease = options.easeLinearity,

	  			    speedVector = direction.multiplyBy(ease / duration),
	  			    speed = speedVector.distanceTo([0, 0]),

	  			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
	  			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

	  			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
	  			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

	  			if (!offset.x && !offset.y) {
	  				map.fire('moveend');

	  			} else {
	  				offset = map._limitOffset(offset, map.options.maxBounds);

	  				requestAnimFrame(function () {
	  					map.panBy(offset, {
	  						duration: decelerationDuration,
	  						easeLinearity: ease,
	  						noMoveStart: true,
	  						animate: true
	  					});
	  				});
	  			}
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property dragging: Handler
	  // Map dragging handler (by both mouse and touch).
	  Map.addInitHook('addHandler', 'dragging', Drag);

	  /*
	   * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
	   */

	  // @namespace Map
	  // @section Keyboard Navigation Options
	  Map.mergeOptions({
	  	// @option keyboard: Boolean = true
	  	// Makes the map focusable and allows users to navigate the map with keyboard
	  	// arrows and `+`/`-` keys.
	  	keyboard: true,

	  	// @option keyboardPanDelta: Number = 80
	  	// Amount of pixels to pan when pressing an arrow key.
	  	keyboardPanDelta: 80
	  });

	  var Keyboard = Handler.extend({

	  	keyCodes: {
	  		left:    [37],
	  		right:   [39],
	  		down:    [40],
	  		up:      [38],
	  		zoomIn:  [187, 107, 61, 171],
	  		zoomOut: [189, 109, 54, 173]
	  	},

	  	initialize: function (map) {
	  		this._map = map;

	  		this._setPanDelta(map.options.keyboardPanDelta);
	  		this._setZoomDelta(map.options.zoomDelta);
	  	},

	  	addHooks: function () {
	  		var container = this._map._container;

	  		// make the container focusable by tabbing
	  		if (container.tabIndex <= 0) {
	  			container.tabIndex = '0';
	  		}

	  		on(container, {
	  			focus: this._onFocus,
	  			blur: this._onBlur,
	  			mousedown: this._onMouseDown
	  		}, this);

	  		this._map.on({
	  			focus: this._addHooks,
	  			blur: this._removeHooks
	  		}, this);
	  	},

	  	removeHooks: function () {
	  		this._removeHooks();

	  		off(this._map._container, {
	  			focus: this._onFocus,
	  			blur: this._onBlur,
	  			mousedown: this._onMouseDown
	  		}, this);

	  		this._map.off({
	  			focus: this._addHooks,
	  			blur: this._removeHooks
	  		}, this);
	  	},

	  	_onMouseDown: function () {
	  		if (this._focused) { return; }

	  		var body = document.body,
	  		    docEl = document.documentElement,
	  		    top = body.scrollTop || docEl.scrollTop,
	  		    left = body.scrollLeft || docEl.scrollLeft;

	  		this._map._container.focus();

	  		window.scrollTo(left, top);
	  	},

	  	_onFocus: function () {
	  		this._focused = true;
	  		this._map.fire('focus');
	  	},

	  	_onBlur: function () {
	  		this._focused = false;
	  		this._map.fire('blur');
	  	},

	  	_setPanDelta: function (panDelta) {
	  		var keys = this._panKeys = {},
	  		    codes = this.keyCodes,
	  		    i, len;

	  		for (i = 0, len = codes.left.length; i < len; i++) {
	  			keys[codes.left[i]] = [-1 * panDelta, 0];
	  		}
	  		for (i = 0, len = codes.right.length; i < len; i++) {
	  			keys[codes.right[i]] = [panDelta, 0];
	  		}
	  		for (i = 0, len = codes.down.length; i < len; i++) {
	  			keys[codes.down[i]] = [0, panDelta];
	  		}
	  		for (i = 0, len = codes.up.length; i < len; i++) {
	  			keys[codes.up[i]] = [0, -1 * panDelta];
	  		}
	  	},

	  	_setZoomDelta: function (zoomDelta) {
	  		var keys = this._zoomKeys = {},
	  		    codes = this.keyCodes,
	  		    i, len;

	  		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
	  			keys[codes.zoomIn[i]] = zoomDelta;
	  		}
	  		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
	  			keys[codes.zoomOut[i]] = -zoomDelta;
	  		}
	  	},

	  	_addHooks: function () {
	  		on(document, 'keydown', this._onKeyDown, this);
	  	},

	  	_removeHooks: function () {
	  		off(document, 'keydown', this._onKeyDown, this);
	  	},

	  	_onKeyDown: function (e) {
	  		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

	  		var key = e.keyCode,
	  		    map = this._map,
	  		    offset;

	  		if (key in this._panKeys) {
	  			if (!map._panAnim || !map._panAnim._inProgress) {
	  				offset = this._panKeys[key];
	  				if (e.shiftKey) {
	  					offset = toPoint(offset).multiplyBy(3);
	  				}

	  				map.panBy(offset);

	  				if (map.options.maxBounds) {
	  					map.panInsideBounds(map.options.maxBounds);
	  				}
	  			}
	  		} else if (key in this._zoomKeys) {
	  			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

	  		} else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
	  			map.closePopup();

	  		} else {
	  			return;
	  		}

	  		stop(e);
	  	}
	  });

	  // @section Handlers
	  // @section Handlers
	  // @property keyboard: Handler
	  // Keyboard navigation handler.
	  Map.addInitHook('addHandler', 'keyboard', Keyboard);

	  /*
	   * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @section Mouse wheel options
	  	// @option scrollWheelZoom: Boolean|String = true
	  	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
	  	// it will zoom to the center of the view regardless of where the mouse was.
	  	scrollWheelZoom: true,

	  	// @option wheelDebounceTime: Number = 40
	  	// Limits the rate at which a wheel can fire (in milliseconds). By default
	  	// user can't zoom via wheel more often than once per 40 ms.
	  	wheelDebounceTime: 40,

	  	// @option wheelPxPerZoomLevel: Number = 60
	  	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
	  	// mean a change of one full zoom level. Smaller values will make wheel-zooming
	  	// faster (and vice versa).
	  	wheelPxPerZoomLevel: 60
	  });

	  var ScrollWheelZoom = Handler.extend({
	  	addHooks: function () {
	  		on(this._map._container, 'wheel', this._onWheelScroll, this);

	  		this._delta = 0;
	  	},

	  	removeHooks: function () {
	  		off(this._map._container, 'wheel', this._onWheelScroll, this);
	  	},

	  	_onWheelScroll: function (e) {
	  		var delta = getWheelDelta(e);

	  		var debounce = this._map.options.wheelDebounceTime;

	  		this._delta += delta;
	  		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

	  		if (!this._startTime) {
	  			this._startTime = +new Date();
	  		}

	  		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

	  		clearTimeout(this._timer);
	  		this._timer = setTimeout(bind(this._performZoom, this), left);

	  		stop(e);
	  	},

	  	_performZoom: function () {
	  		var map = this._map,
	  		    zoom = map.getZoom(),
	  		    snap = this._map.options.zoomSnap || 0;

	  		map._stop(); // stop panning and fly animations if any

	  		// map the delta with a sigmoid function to -4..4 range leaning on -1..1
	  		var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
	  		    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
	  		    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
	  		    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;

	  		this._delta = 0;
	  		this._startTime = null;

	  		if (!delta) { return; }

	  		if (map.options.scrollWheelZoom === 'center') {
	  			map.setZoom(zoom + delta);
	  		} else {
	  			map.setZoomAround(this._lastMousePos, zoom + delta);
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property scrollWheelZoom: Handler
	  // Scroll wheel zoom handler.
	  Map.addInitHook('addHandler', 'scrollWheelZoom', ScrollWheelZoom);

	  /*
	   * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @section Touch interaction options
	  	// @option tap: Boolean = true
	  	// Enables mobile hacks for supporting instant taps (fixing 200ms click
	  	// delay on iOS/Android) and touch holds (fired as `contextmenu` events).
	  	tap: true,

	  	// @option tapTolerance: Number = 15
	  	// The max number of pixels a user can shift his finger during touch
	  	// for it to be considered a valid tap.
	  	tapTolerance: 15
	  });

	  var Tap = Handler.extend({
	  	addHooks: function () {
	  		on(this._map._container, 'touchstart', this._onDown, this);
	  	},

	  	removeHooks: function () {
	  		off(this._map._container, 'touchstart', this._onDown, this);
	  	},

	  	_onDown: function (e) {
	  		if (!e.touches) { return; }

	  		preventDefault(e);

	  		this._fireClick = true;

	  		// don't simulate click or track longpress if more than 1 touch
	  		if (e.touches.length > 1) {
	  			this._fireClick = false;
	  			clearTimeout(this._holdTimeout);
	  			return;
	  		}

	  		var first = e.touches[0],
	  		    el = first.target;

	  		this._startPos = this._newPos = new Point(first.clientX, first.clientY);

	  		// if touching a link, highlight it
	  		if (el.tagName && el.tagName.toLowerCase() === 'a') {
	  			addClass(el, 'leaflet-active');
	  		}

	  		// simulate long hold but setting a timeout
	  		this._holdTimeout = setTimeout(bind(function () {
	  			if (this._isTapValid()) {
	  				this._fireClick = false;
	  				this._onUp();
	  				this._simulateEvent('contextmenu', first);
	  			}
	  		}, this), 1000);

	  		this._simulateEvent('mousedown', first);

	  		on(document, {
	  			touchmove: this._onMove,
	  			touchend: this._onUp
	  		}, this);
	  	},

	  	_onUp: function (e) {
	  		clearTimeout(this._holdTimeout);

	  		off(document, {
	  			touchmove: this._onMove,
	  			touchend: this._onUp
	  		}, this);

	  		if (this._fireClick && e && e.changedTouches) {

	  			var first = e.changedTouches[0],
	  			    el = first.target;

	  			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
	  				removeClass(el, 'leaflet-active');
	  			}

	  			this._simulateEvent('mouseup', first);

	  			// simulate click if the touch didn't move too much
	  			if (this._isTapValid()) {
	  				this._simulateEvent('click', first);
	  			}
	  		}
	  	},

	  	_isTapValid: function () {
	  		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	  	},

	  	_onMove: function (e) {
	  		var first = e.touches[0];
	  		this._newPos = new Point(first.clientX, first.clientY);
	  		this._simulateEvent('mousemove', first);
	  	},

	  	_simulateEvent: function (type, e) {
	  		var simulatedEvent = document.createEvent('MouseEvents');

	  		simulatedEvent._simulated = true;
	  		e.target._simulatedClick = true;

	  		simulatedEvent.initMouseEvent(
	  		        type, true, true, window, 1,
	  		        e.screenX, e.screenY,
	  		        e.clientX, e.clientY,
	  		        false, false, false, false, 0, null);

	  		e.target.dispatchEvent(simulatedEvent);
	  	}
	  });

	  // @section Handlers
	  // @property tap: Handler
	  // Mobile touch hacks (quick tap and touch hold) handler.
	  if (touch && (!pointer || safari)) {
	  	Map.addInitHook('addHandler', 'tap', Tap);
	  }

	  /*
	   * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
	   */

	  // @namespace Map
	  // @section Interaction Options
	  Map.mergeOptions({
	  	// @section Touch interaction options
	  	// @option touchZoom: Boolean|String = *
	  	// Whether the map can be zoomed by touch-dragging with two fingers. If
	  	// passed `'center'`, it will zoom to the center of the view regardless of
	  	// where the touch events (fingers) were. Enabled for touch-capable web
	  	// browsers except for old Androids.
	  	touchZoom: touch && !android23,

	  	// @option bounceAtZoomLimits: Boolean = true
	  	// Set it to false if you don't want the map to zoom beyond min/max zoom
	  	// and then bounce back when pinch-zooming.
	  	bounceAtZoomLimits: true
	  });

	  var TouchZoom = Handler.extend({
	  	addHooks: function () {
	  		addClass(this._map._container, 'leaflet-touch-zoom');
	  		on(this._map._container, 'touchstart', this._onTouchStart, this);
	  	},

	  	removeHooks: function () {
	  		removeClass(this._map._container, 'leaflet-touch-zoom');
	  		off(this._map._container, 'touchstart', this._onTouchStart, this);
	  	},

	  	_onTouchStart: function (e) {
	  		var map = this._map;
	  		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

	  		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
	  		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

	  		this._centerPoint = map.getSize()._divideBy(2);
	  		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
	  		if (map.options.touchZoom !== 'center') {
	  			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
	  		}

	  		this._startDist = p1.distanceTo(p2);
	  		this._startZoom = map.getZoom();

	  		this._moved = false;
	  		this._zooming = true;

	  		map._stop();

	  		on(document, 'touchmove', this._onTouchMove, this);
	  		on(document, 'touchend', this._onTouchEnd, this);

	  		preventDefault(e);
	  	},

	  	_onTouchMove: function (e) {
	  		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

	  		var map = this._map,
	  		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
	  		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
	  		    scale = p1.distanceTo(p2) / this._startDist;

	  		this._zoom = map.getScaleZoom(scale, this._startZoom);

	  		if (!map.options.bounceAtZoomLimits && (
	  			(this._zoom < map.getMinZoom() && scale < 1) ||
	  			(this._zoom > map.getMaxZoom() && scale > 1))) {
	  			this._zoom = map._limitZoom(this._zoom);
	  		}

	  		if (map.options.touchZoom === 'center') {
	  			this._center = this._startLatLng;
	  			if (scale === 1) { return; }
	  		} else {
	  			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
	  			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
	  			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
	  			this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
	  		}

	  		if (!this._moved) {
	  			map._moveStart(true, false);
	  			this._moved = true;
	  		}

	  		cancelAnimFrame(this._animRequest);

	  		var moveFn = bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
	  		this._animRequest = requestAnimFrame(moveFn, this, true);

	  		preventDefault(e);
	  	},

	  	_onTouchEnd: function () {
	  		if (!this._moved || !this._zooming) {
	  			this._zooming = false;
	  			return;
	  		}

	  		this._zooming = false;
	  		cancelAnimFrame(this._animRequest);

	  		off(document, 'touchmove', this._onTouchMove, this);
	  		off(document, 'touchend', this._onTouchEnd, this);

	  		// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
	  		if (this._map.options.zoomAnimation) {
	  			this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
	  		} else {
	  			this._map._resetView(this._center, this._map._limitZoom(this._zoom));
	  		}
	  	}
	  });

	  // @section Handlers
	  // @property touchZoom: Handler
	  // Touch zoom handler.
	  Map.addInitHook('addHandler', 'touchZoom', TouchZoom);

	  Map.BoxZoom = BoxZoom;
	  Map.DoubleClickZoom = DoubleClickZoom;
	  Map.Drag = Drag;
	  Map.Keyboard = Keyboard;
	  Map.ScrollWheelZoom = ScrollWheelZoom;
	  Map.Tap = Tap;
	  Map.TouchZoom = TouchZoom;

	  exports.version = version;
	  exports.Control = Control;
	  exports.control = control;
	  exports.Browser = Browser;
	  exports.Evented = Evented;
	  exports.Mixin = Mixin;
	  exports.Util = Util;
	  exports.Class = Class;
	  exports.Handler = Handler;
	  exports.extend = extend;
	  exports.bind = bind;
	  exports.stamp = stamp;
	  exports.setOptions = setOptions;
	  exports.DomEvent = DomEvent;
	  exports.DomUtil = DomUtil;
	  exports.PosAnimation = PosAnimation;
	  exports.Draggable = Draggable;
	  exports.LineUtil = LineUtil;
	  exports.PolyUtil = PolyUtil;
	  exports.Point = Point;
	  exports.point = toPoint;
	  exports.Bounds = Bounds;
	  exports.bounds = toBounds;
	  exports.Transformation = Transformation;
	  exports.transformation = toTransformation;
	  exports.Projection = index;
	  exports.LatLng = LatLng;
	  exports.latLng = toLatLng;
	  exports.LatLngBounds = LatLngBounds;
	  exports.latLngBounds = toLatLngBounds;
	  exports.CRS = CRS;
	  exports.GeoJSON = GeoJSON;
	  exports.geoJSON = geoJSON;
	  exports.geoJson = geoJson;
	  exports.Layer = Layer;
	  exports.LayerGroup = LayerGroup;
	  exports.layerGroup = layerGroup;
	  exports.FeatureGroup = FeatureGroup;
	  exports.featureGroup = featureGroup;
	  exports.ImageOverlay = ImageOverlay;
	  exports.imageOverlay = imageOverlay;
	  exports.VideoOverlay = VideoOverlay;
	  exports.videoOverlay = videoOverlay;
	  exports.SVGOverlay = SVGOverlay;
	  exports.svgOverlay = svgOverlay;
	  exports.DivOverlay = DivOverlay;
	  exports.Popup = Popup;
	  exports.popup = popup;
	  exports.Tooltip = Tooltip;
	  exports.tooltip = tooltip;
	  exports.Icon = Icon;
	  exports.icon = icon;
	  exports.DivIcon = DivIcon;
	  exports.divIcon = divIcon;
	  exports.Marker = Marker;
	  exports.marker = marker;
	  exports.TileLayer = TileLayer;
	  exports.tileLayer = tileLayer;
	  exports.GridLayer = GridLayer;
	  exports.gridLayer = gridLayer;
	  exports.SVG = SVG;
	  exports.svg = svg$1;
	  exports.Renderer = Renderer;
	  exports.Canvas = Canvas;
	  exports.canvas = canvas$1;
	  exports.Path = Path;
	  exports.CircleMarker = CircleMarker;
	  exports.circleMarker = circleMarker;
	  exports.Circle = Circle;
	  exports.circle = circle;
	  exports.Polyline = Polyline;
	  exports.polyline = polyline;
	  exports.Polygon = Polygon;
	  exports.polygon = polygon;
	  exports.Rectangle = Rectangle;
	  exports.rectangle = rectangle;
	  exports.Map = Map;
	  exports.map = createMap;

	  var oldL = window.L;
	  exports.noConflict = function() {
	  	window.L = oldL;
	  	return this;
	  };

	  // Always export us to window global (see #2364)
	  window.L = exports;

	})));
	//# sourceMappingURL=leaflet-src.js.map
	});

	var type = "FeatureCollection";
	var name = "f1-circuits";
	var bbox = [
		-99.09685,
		-37.853914,
		144.978558,
		52.391811
	];
	var features = [
		{
			type: "Feature",
			properties: {
				id: "au-1953",
				Location: "Melbourne",
				Name: "Albert Park Circuit",
				opened: 1953,
				firstgp: 1996,
				length: 5027,
				altitude: 10
			},
			bbox: [
				144.962151,
				-37.853914,
				144.978558,
				-37.838006
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						144.968644,
						-37.849757
					],
					[
						144.966075,
						-37.847735
					],
					[
						144.966016,
						-37.847655
					],
					[
						144.965998,
						-37.847593
					],
					[
						144.966028,
						-37.847504
					],
					[
						144.966099,
						-37.84741
					],
					[
						144.966164,
						-37.847287
					],
					[
						144.966229,
						-37.847141
					],
					[
						144.966253,
						-37.846962
					],
					[
						144.966253,
						-37.846811
					],
					[
						144.966217,
						-37.84657
					],
					[
						144.96614,
						-37.846438
					],
					[
						144.966034,
						-37.846292
					],
					[
						144.965898,
						-37.846151
					],
					[
						144.964897,
						-37.845401
					],
					[
						144.964264,
						-37.844874
					],
					[
						144.963714,
						-37.844331
					],
					[
						144.963222,
						-37.843799
					],
					[
						144.962796,
						-37.843266
					],
					[
						144.962186,
						-37.842399
					],
					[
						144.962151,
						-37.842305
					],
					[
						144.962157,
						-37.84221
					],
					[
						144.962216,
						-37.842144
					],
					[
						144.962334,
						-37.842097
					],
					[
						144.963495,
						-37.841923
					],
					[
						144.963619,
						-37.84188
					],
					[
						144.96369,
						-37.841819
					],
					[
						144.963743,
						-37.841744
					],
					[
						144.963761,
						-37.841668
					],
					[
						144.963743,
						-37.841531
					],
					[
						144.963696,
						-37.840033
					],
					[
						144.963714,
						-37.839915
					],
					[
						144.963785,
						-37.839811
					],
					[
						144.963873,
						-37.839717
					],
					[
						144.963998,
						-37.839637
					],
					[
						144.96514,
						-37.838986
					],
					[
						144.965501,
						-37.838831
					],
					[
						144.966655,
						-37.838486
					],
					[
						144.967075,
						-37.838345
					],
					[
						144.967431,
						-37.838194
					],
					[
						144.967756,
						-37.838029
					],
					[
						144.967863,
						-37.838006
					],
					[
						144.967957,
						-37.838024
					],
					[
						144.96804,
						-37.838076
					],
					[
						144.968165,
						-37.83818
					],
					[
						144.968378,
						-37.838307
					],
					[
						144.968638,
						-37.83842
					],
					[
						144.968922,
						-37.838496
					],
					[
						144.96923,
						-37.838529
					],
					[
						144.969502,
						-37.838543
					],
					[
						144.96978,
						-37.838581
					],
					[
						144.9701,
						-37.838656
					],
					[
						144.970449,
						-37.838788
					],
					[
						144.970722,
						-37.838939
					],
					[
						144.970958,
						-37.839132
					],
					[
						144.97113,
						-37.839302
					],
					[
						144.971319,
						-37.839552
					],
					[
						144.97142,
						-37.839736
					],
					[
						144.971491,
						-37.839957
					],
					[
						144.971532,
						-37.84016
					],
					[
						144.971976,
						-37.842064
					],
					[
						144.971988,
						-37.842149
					],
					[
						144.971959,
						-37.842206
					],
					[
						144.971911,
						-37.842248
					],
					[
						144.971834,
						-37.842272
					],
					[
						144.971669,
						-37.842305
					],
					[
						144.971461,
						-37.84238
					],
					[
						144.971272,
						-37.842479
					],
					[
						144.971159,
						-37.842583
					],
					[
						144.971065,
						-37.84271
					],
					[
						144.970982,
						-37.84288
					],
					[
						144.970627,
						-37.844412
					],
					[
						144.970609,
						-37.84461
					],
					[
						144.970609,
						-37.844784
					],
					[
						144.970674,
						-37.845345
					],
					[
						144.970757,
						-37.84559
					],
					[
						144.970858,
						-37.845849
					],
					[
						144.971,
						-37.846132
					],
					[
						144.971142,
						-37.846349
					],
					[
						144.971378,
						-37.846641
					],
					[
						144.971615,
						-37.846882
					],
					[
						144.971893,
						-37.847117
					],
					[
						144.972935,
						-37.847838
					],
					[
						144.973095,
						-37.847933
					],
					[
						144.973249,
						-37.848003
					],
					[
						144.973409,
						-37.848051
					],
					[
						144.973586,
						-37.848084
					],
					[
						144.973764,
						-37.848102
					],
					[
						144.973989,
						-37.848102
					],
					[
						144.974255,
						-37.848093
					],
					[
						144.974462,
						-37.848098
					],
					[
						144.974652,
						-37.848117
					],
					[
						144.974829,
						-37.848154
					],
					[
						144.974977,
						-37.848201
					],
					[
						144.975131,
						-37.848263
					],
					[
						144.975279,
						-37.848343
					],
					[
						144.976492,
						-37.849182
					],
					[
						144.976919,
						-37.849498
					],
					[
						144.977114,
						-37.849658
					],
					[
						144.977286,
						-37.849823
					],
					[
						144.977439,
						-37.850016
					],
					[
						144.977605,
						-37.850308
					],
					[
						144.977777,
						-37.850704
					],
					[
						144.978162,
						-37.85176
					],
					[
						144.978529,
						-37.852788
					],
					[
						144.978558,
						-37.852962
					],
					[
						144.97854,
						-37.853075
					],
					[
						144.978463,
						-37.85316
					],
					[
						144.978304,
						-37.853236
					],
					[
						144.976256,
						-37.853872
					],
					[
						144.976037,
						-37.853914
					],
					[
						144.975865,
						-37.853905
					],
					[
						144.975676,
						-37.853863
					],
					[
						144.975516,
						-37.853787
					],
					[
						144.975409,
						-37.853684
					],
					[
						144.975303,
						-37.853556
					],
					[
						144.974551,
						-37.852467
					],
					[
						144.974338,
						-37.852194
					],
					[
						144.974255,
						-37.852119
					],
					[
						144.974202,
						-37.852081
					],
					[
						144.974113,
						-37.852067
					],
					[
						144.974042,
						-37.852086
					],
					[
						144.973953,
						-37.852137
					],
					[
						144.973344,
						-37.852703
					],
					[
						144.973202,
						-37.852793
					],
					[
						144.973024,
						-37.852844
					],
					[
						144.97284,
						-37.852863
					],
					[
						144.972651,
						-37.852849
					],
					[
						144.972462,
						-37.852783
					],
					[
						144.972296,
						-37.852675
					],
					[
						144.968644,
						-37.849757
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "bh-2002",
				Location: "Sakhir",
				Name: "Bahrain International Circuit",
				opened: 2002,
				firstgp: 2004,
				length: 5412,
				altitude: -16
			},
			bbox: [
				50.510278,
				26.026086,
				50.518387,
				26.036885
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						50.510539,
						26.031766
					],
					[
						50.510633,
						26.034797
					],
					[
						50.510722,
						26.036782
					],
					[
						50.510764,
						26.036871
					],
					[
						50.510852,
						26.036885
					],
					[
						50.510947,
						26.036862
					],
					[
						50.511018,
						26.036815
					],
					[
						50.511474,
						26.0364
					],
					[
						50.511598,
						26.036358
					],
					[
						50.511734,
						26.036367
					],
					[
						50.512527,
						26.036598
					],
					[
						50.512717,
						26.036617
					],
					[
						50.512889,
						26.036607
					],
					[
						50.518091,
						26.035702
					],
					[
						50.518269,
						26.035655
					],
					[
						50.518364,
						26.035566
					],
					[
						50.518387,
						26.035452
					],
					[
						50.518369,
						26.035344
					],
					[
						50.51831,
						26.035222
					],
					[
						50.518198,
						26.035099
					],
					[
						50.518068,
						26.035
					],
					[
						50.51789,
						26.034877
					],
					[
						50.517263,
						26.034458
					],
					[
						50.516759,
						26.033987
					],
					[
						50.516635,
						26.033878
					],
					[
						50.516535,
						26.033723
					],
					[
						50.51631,
						26.033265
					],
					[
						50.516233,
						26.033166
					],
					[
						50.516114,
						26.033096
					],
					[
						50.515996,
						26.033039
					],
					[
						50.515807,
						26.03302
					],
					[
						50.515238,
						26.033105
					],
					[
						50.515084,
						26.0331
					],
					[
						50.514925,
						26.033072
					],
					[
						50.514794,
						26.033011
					],
					[
						50.514635,
						26.032879
					],
					[
						50.51348,
						26.031564
					],
					[
						50.513368,
						26.031474
					],
					[
						50.513208,
						26.031451
					],
					[
						50.513108,
						26.031521
					],
					[
						50.513072,
						26.031663
					],
					[
						50.513078,
						26.031879
					],
					[
						50.513356,
						26.033369
					],
					[
						50.513516,
						26.034302
					],
					[
						50.51354,
						26.034486
					],
					[
						50.51351,
						26.034656
					],
					[
						50.513469,
						26.034783
					],
					[
						50.513386,
						26.03491
					],
					[
						50.512912,
						26.035278
					],
					[
						50.512847,
						26.035306
					],
					[
						50.512776,
						26.035288
					],
					[
						50.512735,
						26.035222
					],
					[
						50.512563,
						26.034071
					],
					[
						50.512516,
						26.033303
					],
					[
						50.512433,
						26.031922
					],
					[
						50.512374,
						26.030479
					],
					[
						50.512314,
						26.029164
					],
					[
						50.512338,
						26.028948
					],
					[
						50.512433,
						26.02882
					],
					[
						50.512581,
						26.02875
					],
					[
						50.512788,
						26.028712
					],
					[
						50.513001,
						26.028726
					],
					[
						50.513267,
						26.028773
					],
					[
						50.51354,
						26.028891
					],
					[
						50.51377,
						26.029037
					],
					[
						50.513995,
						26.029244
					],
					[
						50.514132,
						26.029447
					],
					[
						50.514386,
						26.030041
					],
					[
						50.514528,
						26.030291
					],
					[
						50.514664,
						26.030437
					],
					[
						50.514842,
						26.030569
					],
					[
						50.515055,
						26.030687
					],
					[
						50.515351,
						26.030753
					],
					[
						50.515676,
						26.030758
					],
					[
						50.515907,
						26.03071
					],
					[
						50.516215,
						26.030578
					],
					[
						50.517026,
						26.030216
					],
					[
						50.517192,
						26.030107
					],
					[
						50.517334,
						26.02998
					],
					[
						50.517405,
						26.029862
					],
					[
						50.517493,
						26.02973
					],
					[
						50.517493,
						26.029612
					],
					[
						50.517422,
						26.02949
					],
					[
						50.51728,
						26.029367
					],
					[
						50.517085,
						26.029235
					],
					[
						50.510941,
						26.026143
					],
					[
						50.510829,
						26.026091
					],
					[
						50.510651,
						26.026086
					],
					[
						50.510574,
						26.026152
					],
					[
						50.510302,
						26.026671
					],
					[
						50.510278,
						26.026878
					],
					[
						50.510284,
						26.027269
					],
					[
						50.510361,
						26.029414
					],
					[
						50.510539,
						26.031766
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "cn-2004",
				Location: "Shanghai",
				Name: "Shanghai International Circuit",
				opened: 2004,
				firstgp: 2004,
				length: 5451,
				altitude: 14
			},
			bbox: [
				121.214959,
				31.335826,
				121.227856,
				31.345484
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						121.21838,
						31.336835
					],
					[
						121.217409,
						31.336627
					],
					[
						121.217232,
						31.336613
					],
					[
						121.217019,
						31.336613
					],
					[
						121.216829,
						31.336665
					],
					[
						121.216699,
						31.336712
					],
					[
						121.216527,
						31.336806
					],
					[
						121.216403,
						31.336901
					],
					[
						121.216308,
						31.337009
					],
					[
						121.216237,
						31.337136
					],
					[
						121.216178,
						31.337264
					],
					[
						121.216172,
						31.3374
					],
					[
						121.216178,
						31.337556
					],
					[
						121.216202,
						31.337674
					],
					[
						121.216243,
						31.337787
					],
					[
						121.21632,
						31.337886
					],
					[
						121.216427,
						31.337971
					],
					[
						121.216664,
						31.33806
					],
					[
						121.216883,
						31.33806
					],
					[
						121.217054,
						31.338004
					],
					[
						121.217125,
						31.337938
					],
					[
						121.217173,
						31.337867
					],
					[
						121.217178,
						31.337768
					],
					[
						121.217143,
						31.337627
					],
					[
						121.217072,
						31.337415
					],
					[
						121.217054,
						31.337325
					],
					[
						121.217096,
						31.337235
					],
					[
						121.217196,
						31.337141
					],
					[
						121.217368,
						31.337085
					],
					[
						121.217557,
						31.337118
					],
					[
						121.217658,
						31.337174
					],
					[
						121.217723,
						31.337268
					],
					[
						121.217782,
						31.337363
					],
					[
						121.217841,
						31.33749
					],
					[
						121.217877,
						31.337631
					],
					[
						121.217889,
						31.337792
					],
					[
						121.217859,
						31.337928
					],
					[
						121.217764,
						31.338079
					],
					[
						121.217699,
						31.338173
					],
					[
						121.217504,
						31.338376
					],
					[
						121.216983,
						31.338852
					],
					[
						121.216581,
						31.3393
					],
					[
						121.216249,
						31.339606
					],
					[
						121.215835,
						31.340007
					],
					[
						121.215705,
						31.340196
					],
					[
						121.215645,
						31.340332
					],
					[
						121.215219,
						31.341402
					],
					[
						121.215083,
						31.341723
					],
					[
						121.214965,
						31.342039
					],
					[
						121.214959,
						31.342119
					],
					[
						121.215012,
						31.342185
					],
					[
						121.215119,
						31.342223
					],
					[
						121.215302,
						31.342194
					],
					[
						121.215492,
						31.342086
					],
					[
						121.215651,
						31.341973
					],
					[
						121.215811,
						31.341827
					],
					[
						121.216036,
						31.341629
					],
					[
						121.216231,
						31.341384
					],
					[
						121.216575,
						31.34087
					],
					[
						121.217036,
						31.340177
					],
					[
						121.217184,
						31.339984
					],
					[
						121.217332,
						31.339833
					],
					[
						121.217498,
						31.339696
					],
					[
						121.217693,
						31.339606
					],
					[
						121.217901,
						31.33954
					],
					[
						121.218114,
						31.339503
					],
					[
						121.218362,
						31.339503
					],
					[
						121.218581,
						31.33954
					],
					[
						121.218794,
						31.339606
					],
					[
						121.219007,
						31.33972
					],
					[
						121.219209,
						31.339861
					],
					[
						121.219368,
						31.340021
					],
					[
						121.21954,
						31.340337
					],
					[
						121.219806,
						31.340818
					],
					[
						121.219919,
						31.340964
					],
					[
						121.220037,
						31.341063
					],
					[
						121.220185,
						31.341138
					],
					[
						121.220404,
						31.341219
					],
					[
						121.220611,
						31.341233
					],
					[
						121.220789,
						31.341219
					],
					[
						121.220949,
						31.341167
					],
					[
						121.221091,
						31.341087
					],
					[
						121.221191,
						31.341016
					],
					[
						121.22128,
						31.340931
					],
					[
						121.221718,
						31.340205
					],
					[
						121.221825,
						31.340106
					],
					[
						121.221955,
						31.340073
					],
					[
						121.222079,
						31.340092
					],
					[
						121.222192,
						31.34013
					],
					[
						121.22263,
						31.340625
					],
					[
						121.222689,
						31.340724
					],
					[
						121.222689,
						31.340813
					],
					[
						121.222653,
						31.340903
					],
					[
						121.221582,
						31.342458
					],
					[
						121.220913,
						31.343382
					],
					[
						121.220179,
						31.344419
					],
					[
						121.220079,
						31.344447
					],
					[
						121.219978,
						31.344424
					],
					[
						121.219883,
						31.344353
					],
					[
						121.219771,
						31.344245
					],
					[
						121.219664,
						31.344132
					],
					[
						121.219564,
						31.344075
					],
					[
						121.219439,
						31.344042
					],
					[
						121.219309,
						31.344061
					],
					[
						121.219179,
						31.34416
					],
					[
						121.219025,
						31.344306
					],
					[
						121.218948,
						31.344424
					],
					[
						121.218901,
						31.344532
					],
					[
						121.218877,
						31.344693
					],
					[
						121.218889,
						31.344839
					],
					[
						121.218919,
						31.34498
					],
					[
						121.218972,
						31.345112
					],
					[
						121.219114,
						31.345272
					],
					[
						121.21925,
						31.345362
					],
					[
						121.219439,
						31.345433
					],
					[
						121.219641,
						31.34547
					],
					[
						121.219801,
						31.345484
					],
					[
						121.219996,
						31.345475
					],
					[
						121.22025,
						31.345423
					],
					[
						121.220416,
						31.345362
					],
					[
						121.220588,
						31.345282
					],
					[
						121.220824,
						31.345093
					],
					[
						121.221032,
						31.344843
					],
					[
						121.223281,
						31.341902
					],
					[
						121.224684,
						31.340092
					],
					[
						121.225412,
						31.339149
					],
					[
						121.226051,
						31.338296
					],
					[
						121.226897,
						31.337217
					],
					[
						121.227803,
						31.336085
					],
					[
						121.227856,
						31.335986
					],
					[
						121.22785,
						31.335892
					],
					[
						121.227773,
						31.335826
					],
					[
						121.227649,
						31.335835
					],
					[
						121.227394,
						31.335939
					],
					[
						121.227246,
						31.336029
					],
					[
						121.227081,
						31.336132
					],
					[
						121.225347,
						31.338155
					],
					[
						121.22527,
						31.338192
					],
					[
						121.225128,
						31.338202
					],
					[
						121.222955,
						31.337763
					],
					[
						121.21838,
						31.336835
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "az-2016",
				Location: "Baku",
				Name: "Baku City Circuit",
				opened: 2016,
				firstgp: 2016,
				length: 6003,
				altitude: -25
			},
			bbox: [
				49.830927,
				40.362639,
				49.855189,
				40.376148
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						49.853247,
						40.372688
					],
					[
						49.851442,
						40.372113
					],
					[
						49.848684,
						40.371218
					],
					[
						49.847606,
						40.370845
					],
					[
						49.844949,
						40.369978
					],
					[
						49.84386,
						40.369591
					],
					[
						49.842635,
						40.3692
					],
					[
						49.84225,
						40.369059
					],
					[
						49.841836,
						40.368889
					],
					[
						49.841469,
						40.368705
					],
					[
						49.838752,
						40.367098
					],
					[
						49.838586,
						40.366985
					],
					[
						49.838444,
						40.366824
					],
					[
						49.838373,
						40.366655
					],
					[
						49.838207,
						40.365792
					],
					[
						49.83813,
						40.365632
					],
					[
						49.837976,
						40.365467
					],
					[
						49.836088,
						40.364156
					],
					[
						49.835911,
						40.363982
					],
					[
						49.835757,
						40.363765
					],
					[
						49.835094,
						40.362832
					],
					[
						49.834993,
						40.362747
					],
					[
						49.834839,
						40.362667
					],
					[
						49.83462,
						40.362639
					],
					[
						49.834431,
						40.362662
					],
					[
						49.834094,
						40.362756
					],
					[
						49.833478,
						40.362964
					],
					[
						49.831282,
						40.363841
					],
					[
						49.831152,
						40.363958
					],
					[
						49.831099,
						40.364076
					],
					[
						49.830927,
						40.365957
					],
					[
						49.830963,
						40.366141
					],
					[
						49.831489,
						40.367503
					],
					[
						49.831643,
						40.367744
					],
					[
						49.831809,
						40.367913
					],
					[
						49.832022,
						40.368045
					],
					[
						49.833093,
						40.368535
					],
					[
						49.834715,
						40.369139
					],
					[
						49.835733,
						40.369408
					],
					[
						49.835875,
						40.369403
					],
					[
						49.83597,
						40.369356
					],
					[
						49.836035,
						40.369294
					],
					[
						49.836171,
						40.368955
					],
					[
						49.836248,
						40.368865
					],
					[
						49.836402,
						40.368818
					],
					[
						49.836544,
						40.368828
					],
					[
						49.836692,
						40.368832
					],
					[
						49.836834,
						40.368804
					],
					[
						49.837065,
						40.368696
					],
					[
						49.837219,
						40.368696
					],
					[
						49.837337,
						40.368677
					],
					[
						49.837414,
						40.368616
					],
					[
						49.838053,
						40.367183
					],
					[
						49.838195,
						40.367065
					],
					[
						49.838367,
						40.36706
					],
					[
						49.838539,
						40.36715
					],
					[
						49.838947,
						40.367432
					],
					[
						49.841362,
						40.368856
					],
					[
						49.841764,
						40.369125
					],
					[
						49.841853,
						40.369191
					],
					[
						49.841859,
						40.369276
					],
					[
						49.841682,
						40.369572
					],
					[
						49.841658,
						40.369667
					],
					[
						49.841723,
						40.369733
					],
					[
						49.842783,
						40.370251
					],
					[
						49.84357,
						40.370581
					],
					[
						49.844961,
						40.371081
					],
					[
						49.845085,
						40.371189
					],
					[
						49.845079,
						40.371312
					],
					[
						49.84428,
						40.372891
					],
					[
						49.84428,
						40.373065
					],
					[
						49.84444,
						40.373193
					],
					[
						49.846884,
						40.374046
					],
					[
						49.849719,
						40.375017
					],
					[
						49.851797,
						40.37563
					],
					[
						49.853496,
						40.376148
					],
					[
						49.853602,
						40.376134
					],
					[
						49.853685,
						40.376092
					],
					[
						49.854188,
						40.37522
					],
					[
						49.854798,
						40.374319
					],
					[
						49.855159,
						40.373607
					],
					[
						49.855189,
						40.37349
					],
					[
						49.855177,
						40.373409
					],
					[
						49.855117,
						40.373325
					],
					[
						49.855023,
						40.373268
					],
					[
						49.853247,
						40.372688
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "es-1991",
				Location: "Barcelona",
				Name: "Circuit de Barcelona-Catalunya",
				opened: 1991,
				firstgp: 1991,
				length: 4655,
				altitude: 165
			},
			bbox: [
				2.252175,
				41.564187,
				2.263729,
				41.574661
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						2.261284,
						41.570051
					],
					[
						2.25981,
						41.568288
					],
					[
						2.25894,
						41.56726
					],
					[
						2.258064,
						41.566219
					],
					[
						2.257106,
						41.565087
					],
					[
						2.256875,
						41.5648
					],
					[
						2.25678,
						41.56471
					],
					[
						2.25665,
						41.564663
					],
					[
						2.256508,
						41.564635
					],
					[
						2.256378,
						41.56463
					],
					[
						2.256283,
						41.564644
					],
					[
						2.2562,
						41.564668
					],
					[
						2.256034,
						41.564753
					],
					[
						2.255851,
						41.564837
					],
					[
						2.255703,
						41.56488
					],
					[
						2.255549,
						41.564894
					],
					[
						2.255407,
						41.564894
					],
					[
						2.255265,
						41.564866
					],
					[
						2.255111,
						41.564795
					],
					[
						2.254448,
						41.564437
					],
					[
						2.254217,
						41.564314
					],
					[
						2.254028,
						41.564248
					],
					[
						2.25385,
						41.564215
					],
					[
						2.253696,
						41.564196
					],
					[
						2.253525,
						41.564187
					],
					[
						2.253377,
						41.564201
					],
					[
						2.253164,
						41.564229
					],
					[
						2.252986,
						41.564281
					],
					[
						2.25285,
						41.564343
					],
					[
						2.252732,
						41.564409
					],
					[
						2.252625,
						41.564484
					],
					[
						2.252518,
						41.564574
					],
					[
						2.25243,
						41.564687
					],
					[
						2.252341,
						41.564795
					],
					[
						2.252258,
						41.564955
					],
					[
						2.252199,
						41.565144
					],
					[
						2.252175,
						41.565328
					],
					[
						2.252193,
						41.565535
					],
					[
						2.25224,
						41.565771
					],
					[
						2.252305,
						41.565978
					],
					[
						2.252406,
						41.566204
					],
					[
						2.252542,
						41.566393
					],
					[
						2.252761,
						41.566681
					],
					[
						2.254046,
						41.568198
					],
					[
						2.254134,
						41.568279
					],
					[
						2.254247,
						41.568349
					],
					[
						2.254401,
						41.56841
					],
					[
						2.254572,
						41.568434
					],
					[
						2.254768,
						41.56842
					],
					[
						2.254975,
						41.568354
					],
					[
						2.255146,
						41.56825
					],
					[
						2.255271,
						41.568128
					],
					[
						2.255359,
						41.568
					],
					[
						2.255407,
						41.567859
					],
					[
						2.255431,
						41.567685
					],
					[
						2.255413,
						41.567524
					],
					[
						2.255365,
						41.567369
					],
					[
						2.255294,
						41.567223
					],
					[
						2.255206,
						41.567109
					],
					[
						2.254152,
						41.56587
					],
					[
						2.254057,
						41.565747
					],
					[
						2.254016,
						41.565639
					],
					[
						2.254051,
						41.565521
					],
					[
						2.254111,
						41.565431
					],
					[
						2.254253,
						41.565342
					],
					[
						2.254383,
						41.565299
					],
					[
						2.254537,
						41.565299
					],
					[
						2.254679,
						41.565342
					],
					[
						2.25623,
						41.565879
					],
					[
						2.256437,
						41.565969
					],
					[
						2.256608,
						41.566068
					],
					[
						2.256851,
						41.566228
					],
					[
						2.257117,
						41.56645
					],
					[
						2.257721,
						41.567157
					],
					[
						2.257816,
						41.567284
					],
					[
						2.257851,
						41.567392
					],
					[
						2.257822,
						41.567515
					],
					[
						2.257733,
						41.567619
					],
					[
						2.257603,
						41.567708
					],
					[
						2.257425,
						41.567793
					],
					[
						2.257248,
						41.567878
					],
					[
						2.257117,
						41.567977
					],
					[
						2.256993,
						41.568099
					],
					[
						2.256916,
						41.568227
					],
					[
						2.256502,
						41.568938
					],
					[
						2.256076,
						41.569693
					],
					[
						2.25604,
						41.56982
					],
					[
						2.256022,
						41.56999
					],
					[
						2.25604,
						41.570122
					],
					[
						2.256088,
						41.570249
					],
					[
						2.25617,
						41.570362
					],
					[
						2.256271,
						41.57047
					],
					[
						2.256407,
						41.570574
					],
					[
						2.256591,
						41.570678
					],
					[
						2.261906,
						41.572705
					],
					[
						2.261959,
						41.572742
					],
					[
						2.262,
						41.572804
					],
					[
						2.262006,
						41.572874
					],
					[
						2.261971,
						41.572945
					],
					[
						2.261924,
						41.572983
					],
					[
						2.261805,
						41.573025
					],
					[
						2.260675,
						41.573204
					],
					[
						2.260544,
						41.573223
					],
					[
						2.260432,
						41.573204
					],
					[
						2.260089,
						41.573002
					],
					[
						2.259911,
						41.572912
					],
					[
						2.259722,
						41.57287
					],
					[
						2.259532,
						41.57287
					],
					[
						2.259331,
						41.572912
					],
					[
						2.259177,
						41.572978
					],
					[
						2.259047,
						41.573082
					],
					[
						2.25897,
						41.573209
					],
					[
						2.258923,
						41.573346
					],
					[
						2.258934,
						41.573487
					],
					[
						2.258994,
						41.573619
					],
					[
						2.259088,
						41.573718
					],
					[
						2.25923,
						41.573812
					],
					[
						2.260432,
						41.574567
					],
					[
						2.26055,
						41.574633
					],
					[
						2.260675,
						41.574661
					],
					[
						2.260811,
						41.574637
					],
					[
						2.260935,
						41.574581
					],
					[
						2.261805,
						41.574076
					],
					[
						2.261906,
						41.57402
					],
					[
						2.262024,
						41.57402
					],
					[
						2.262131,
						41.574058
					],
					[
						2.262296,
						41.574194
					],
					[
						2.262385,
						41.574237
					],
					[
						2.262521,
						41.574208
					],
					[
						2.263232,
						41.573869
					],
					[
						2.263433,
						41.573742
					],
					[
						2.263575,
						41.57361
					],
					[
						2.263658,
						41.573487
					],
					[
						2.263723,
						41.573341
					],
					[
						2.263729,
						41.573181
					],
					[
						2.263711,
						41.573006
					],
					[
						2.263616,
						41.572813
					],
					[
						2.261284,
						41.570051
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "mc-1929",
				Location: "Monte Carlo",
				Name: "Circuit de Monaco",
				opened: 1929,
				firstgp: 1929,
				length: 3337,
				altitude: 47
			},
			bbox: [
				7.421216,
				43.732365,
				7.430355,
				43.741099
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						7.427135,
						43.73944
					],
					[
						7.427135,
						43.739511
					],
					[
						7.427159,
						43.739582
					],
					[
						7.427206,
						43.739652
					],
					[
						7.427259,
						43.739728
					],
					[
						7.42736,
						43.739836
					],
					[
						7.428662,
						43.741052
					],
					[
						7.428745,
						43.74109
					],
					[
						7.428857,
						43.741095
					],
					[
						7.42897,
						43.741062
					],
					[
						7.429053,
						43.741
					],
					[
						7.429082,
						43.740944
					],
					[
						7.4291,
						43.740864
					],
					[
						7.429106,
						43.740765
					],
					[
						7.429135,
						43.740694
					],
					[
						7.429195,
						43.740614
					],
					[
						7.42926,
						43.740553
					],
					[
						7.429372,
						43.740425
					],
					[
						7.429449,
						43.740289
					],
					[
						7.429496,
						43.740241
					],
					[
						7.429585,
						43.740204
					],
					[
						7.429668,
						43.740218
					],
					[
						7.429721,
						43.740251
					],
					[
						7.429739,
						43.740317
					],
					[
						7.429727,
						43.740359
					],
					[
						7.429692,
						43.740397
					],
					[
						7.429508,
						43.74051
					],
					[
						7.429343,
						43.74068
					],
					[
						7.429307,
						43.740741
					],
					[
						7.429295,
						43.740802
					],
					[
						7.429319,
						43.740845
					],
					[
						7.429384,
						43.740897
					],
					[
						7.429437,
						43.74093
					],
					[
						7.429704,
						43.741
					],
					[
						7.430023,
						43.74109
					],
					[
						7.430153,
						43.741099
					],
					[
						7.430236,
						43.74108
					],
					[
						7.430296,
						43.741052
					],
					[
						7.430331,
						43.74101
					],
					[
						7.430355,
						43.740958
					],
					[
						7.430331,
						43.740359
					],
					[
						7.430088,
						43.739737
					],
					[
						7.429952,
						43.739421
					],
					[
						7.429739,
						43.739115
					],
					[
						7.429508,
						43.738813
					],
					[
						7.429206,
						43.738516
					],
					[
						7.42878,
						43.7382
					],
					[
						7.428313,
						43.737922
					],
					[
						7.42791,
						43.737743
					],
					[
						7.427472,
						43.737588
					],
					[
						7.427052,
						43.737474
					],
					[
						7.426182,
						43.737314
					],
					[
						7.425714,
						43.737262
					],
					[
						7.425596,
						43.737234
					],
					[
						7.425531,
						43.737201
					],
					[
						7.425489,
						43.737149
					],
					[
						7.425442,
						43.737083
					],
					[
						7.425389,
						43.737055
					],
					[
						7.425217,
						43.737036
					],
					[
						7.42514,
						43.737036
					],
					[
						7.424998,
						43.737074
					],
					[
						7.424898,
						43.737079
					],
					[
						7.42369,
						43.736937
					],
					[
						7.42256,
						43.736824
					],
					[
						7.422406,
						43.73681
					],
					[
						7.422293,
						43.736791
					],
					[
						7.422193,
						43.736749
					],
					[
						7.422104,
						43.736673
					],
					[
						7.422021,
						43.736536
					],
					[
						7.421926,
						43.736376
					],
					[
						7.421843,
						43.736202
					],
					[
						7.421784,
						43.735994
					],
					[
						7.421766,
						43.735806
					],
					[
						7.421778,
						43.735547
					],
					[
						7.421832,
						43.735339
					],
					[
						7.421891,
						43.735254
					],
					[
						7.422157,
						43.73508
					],
					[
						7.422228,
						43.735
					],
					[
						7.422412,
						43.734312
					],
					[
						7.422406,
						43.734246
					],
					[
						7.422358,
						43.734194
					],
					[
						7.422299,
						43.734151
					],
					[
						7.422228,
						43.734085
					],
					[
						7.422199,
						43.734024
					],
					[
						7.422199,
						43.733944
					],
					[
						7.422423,
						43.733435
					],
					[
						7.422607,
						43.73318
					],
					[
						7.422909,
						43.732916
					],
					[
						7.423057,
						43.732841
					],
					[
						7.423193,
						43.732789
					],
					[
						7.423341,
						43.732742
					],
					[
						7.423447,
						43.732652
					],
					[
						7.423471,
						43.732563
					],
					[
						7.423465,
						43.732516
					],
					[
						7.423412,
						43.732473
					],
					[
						7.423234,
						43.732435
					],
					[
						7.423021,
						43.732398
					],
					[
						7.422784,
						43.732365
					],
					[
						7.422631,
						43.732369
					],
					[
						7.422512,
						43.732402
					],
					[
						7.422459,
						43.732445
					],
					[
						7.422429,
						43.732478
					],
					[
						7.422418,
						43.732534
					],
					[
						7.4224,
						43.7326
					],
					[
						7.422364,
						43.732681
					],
					[
						7.422074,
						43.732982
					],
					[
						7.421873,
						43.733298
					],
					[
						7.421725,
						43.733595
					],
					[
						7.421465,
						43.73434
					],
					[
						7.421376,
						43.734703
					],
					[
						7.421293,
						43.73507
					],
					[
						7.421216,
						43.735735
					],
					[
						7.421234,
						43.735966
					],
					[
						7.421305,
						43.736211
					],
					[
						7.421382,
						43.736452
					],
					[
						7.421417,
						43.73656
					],
					[
						7.421441,
						43.736683
					],
					[
						7.421417,
						43.736824
					],
					[
						7.421441,
						43.736895
					],
					[
						7.4215,
						43.736956
					],
					[
						7.421613,
						43.736994
					],
					[
						7.421737,
						43.737008
					],
					[
						7.422222,
						43.737036
					],
					[
						7.422654,
						43.737088
					],
					[
						7.422974,
						43.73714
					],
					[
						7.423767,
						43.737314
					],
					[
						7.424098,
						43.737375
					],
					[
						7.424406,
						43.737418
					],
					[
						7.424785,
						43.737456
					],
					[
						7.42504,
						43.737517
					],
					[
						7.425714,
						43.737767
					],
					[
						7.425957,
						43.737819
					],
					[
						7.426354,
						43.737885
					],
					[
						7.426726,
						43.737927
					],
					[
						7.42704,
						43.737969
					],
					[
						7.427259,
						43.73804
					],
					[
						7.427472,
						43.738163
					],
					[
						7.427614,
						43.738271
					],
					[
						7.427727,
						43.738384
					],
					[
						7.427786,
						43.738493
					],
					[
						7.427786,
						43.738625
					],
					[
						7.42775,
						43.738738
					],
					[
						7.427703,
						43.738841
					],
					[
						7.42762,
						43.738964
					],
					[
						7.427526,
						43.739082
					],
					[
						7.427419,
						43.739171
					],
					[
						7.427301,
						43.739256
					],
					[
						7.427182,
						43.739346
					],
					[
						7.427135,
						43.73944
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "ca-1978",
				Location: "Montreal",
				Name: "Circuit Gilles-Villeneuve",
				opened: 1978,
				firstgp: 1978,
				length: 4361,
				altitude: 13
			},
			bbox: [
				-73.52994,
				45.49706,
				-73.521949,
				45.514298
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-73.523246,
						45.501816
					],
					[
						-73.522944,
						45.500831
					],
					[
						-73.522719,
						45.500105
					],
					[
						-73.522594,
						45.499568
					],
					[
						-73.522577,
						45.499125
					],
					[
						-73.522772,
						45.497937
					],
					[
						-73.522736,
						45.497795
					],
					[
						-73.5226,
						45.497706
					],
					[
						-73.522097,
						45.49755
					],
					[
						-73.521997,
						45.497498
					],
					[
						-73.521949,
						45.497395
					],
					[
						-73.521967,
						45.497291
					],
					[
						-73.522038,
						45.497187
					],
					[
						-73.522174,
						45.497107
					],
					[
						-73.522346,
						45.49706
					],
					[
						-73.522571,
						45.49706
					],
					[
						-73.522819,
						45.497098
					],
					[
						-73.523411,
						45.497215
					],
					[
						-73.523814,
						45.49731
					],
					[
						-73.524198,
						45.497456
					],
					[
						-73.524565,
						45.497626
					],
					[
						-73.525412,
						45.498135
					],
					[
						-73.525915,
						45.498465
					],
					[
						-73.52601,
						45.498568
					],
					[
						-73.526033,
						45.498653
					],
					[
						-73.526027,
						45.498738
					],
					[
						-73.525939,
						45.498927
					],
					[
						-73.525909,
						45.499044
					],
					[
						-73.525927,
						45.499139
					],
					[
						-73.525986,
						45.499219
					],
					[
						-73.526951,
						45.500044
					],
					[
						-73.527122,
						45.500147
					],
					[
						-73.527448,
						45.500308
					],
					[
						-73.527643,
						45.500421
					],
					[
						-73.527856,
						45.500619
					],
					[
						-73.527975,
						45.500831
					],
					[
						-73.528058,
						45.501048
					],
					[
						-73.528087,
						45.501222
					],
					[
						-73.528081,
						45.502509
					],
					[
						-73.528081,
						45.502617
					],
					[
						-73.528146,
						45.502702
					],
					[
						-73.528265,
						45.502768
					],
					[
						-73.528472,
						45.502801
					],
					[
						-73.52875,
						45.502754
					],
					[
						-73.52891,
						45.50274
					],
					[
						-73.529105,
						45.502778
					],
					[
						-73.529271,
						45.502853
					],
					[
						-73.529389,
						45.502933
					],
					[
						-73.529496,
						45.503032
					],
					[
						-73.529561,
						45.503122
					],
					[
						-73.52965,
						45.503301
					],
					[
						-73.529727,
						45.503522
					],
					[
						-73.529815,
						45.503796
					],
					[
						-73.529827,
						45.504027
					],
					[
						-73.52994,
						45.505012
					],
					[
						-73.529928,
						45.505545
					],
					[
						-73.52991,
						45.505974
					],
					[
						-73.529857,
						45.506445
					],
					[
						-73.529786,
						45.506817
					],
					[
						-73.529715,
						45.50711
					],
					[
						-73.529218,
						45.508514
					],
					[
						-73.529135,
						45.508642
					],
					[
						-73.529016,
						45.508693
					],
					[
						-73.528892,
						45.508712
					],
					[
						-73.528709,
						45.508722
					],
					[
						-73.528567,
						45.508755
					],
					[
						-73.52843,
						45.508811
					],
					[
						-73.528282,
						45.50892
					],
					[
						-73.52817,
						45.509047
					],
					[
						-73.528069,
						45.509221
					],
					[
						-73.527578,
						45.510621
					],
					[
						-73.527383,
						45.51138
					],
					[
						-73.527318,
						45.511913
					],
					[
						-73.527288,
						45.51246
					],
					[
						-73.527294,
						45.512639
					],
					[
						-73.527324,
						45.512827
					],
					[
						-73.527685,
						45.514072
					],
					[
						-73.527697,
						45.514147
					],
					[
						-73.527685,
						45.514213
					],
					[
						-73.527602,
						45.514279
					],
					[
						-73.527442,
						45.514298
					],
					[
						-73.527341,
						45.514274
					],
					[
						-73.52727,
						45.514218
					],
					[
						-73.527247,
						45.514171
					],
					[
						-73.527205,
						45.513893
					],
					[
						-73.527146,
						45.513468
					],
					[
						-73.527122,
						45.513327
					],
					[
						-73.527045,
						45.513171
					],
					[
						-73.526785,
						45.512799
					],
					[
						-73.526554,
						45.512469
					],
					[
						-73.525388,
						45.510357
					],
					[
						-73.525252,
						45.510084
					],
					[
						-73.523524,
						45.504286
					],
					[
						-73.523453,
						45.504046
					],
					[
						-73.52347,
						45.503966
					],
					[
						-73.523547,
						45.503904
					],
					[
						-73.523684,
						45.503867
					],
					[
						-73.523772,
						45.503805
					],
					[
						-73.523808,
						45.503735
					],
					[
						-73.523802,
						45.503645
					],
					[
						-73.523488,
						45.502641
					],
					[
						-73.523246,
						45.501816
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "fr-1969",
				Location: "Le Castellet",
				Name: "Circuit Paul Ricard",
				opened: 1969,
				firstgp: 1971,
				length: 5842,
				altitude: 408
			},
			bbox: [
				5.778164,
				43.247028,
				5.803728,
				43.258652
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						5.791571,
						43.25202
					],
					[
						5.794542,
						43.25037
					],
					[
						5.796057,
						43.249517
					],
					[
						5.796152,
						43.249493
					],
					[
						5.796241,
						43.249498
					],
					[
						5.796312,
						43.249526
					],
					[
						5.796353,
						43.249569
					],
					[
						5.796371,
						43.249625
					],
					[
						5.796395,
						43.250205
					],
					[
						5.796418,
						43.250327
					],
					[
						5.796454,
						43.250393
					],
					[
						5.796519,
						43.250464
					],
					[
						5.79662,
						43.250554
					],
					[
						5.796762,
						43.250643
					],
					[
						5.796927,
						43.250709
					],
					[
						5.797105,
						43.250747
					],
					[
						5.797288,
						43.250756
					],
					[
						5.797496,
						43.250747
					],
					[
						5.797685,
						43.2507
					],
					[
						5.797833,
						43.250634
					],
					[
						5.797957,
						43.250549
					],
					[
						5.798194,
						43.25036
					],
					[
						5.798425,
						43.250205
					],
					[
						5.798691,
						43.250059
					],
					[
						5.798975,
						43.249941
					],
					[
						5.799253,
						43.249851
					],
					[
						5.799549,
						43.24979
					],
					[
						5.799839,
						43.249743
					],
					[
						5.800171,
						43.249724
					],
					[
						5.80052,
						43.249724
					],
					[
						5.800798,
						43.249752
					],
					[
						5.801071,
						43.2498
					],
					[
						5.801343,
						43.249866
					],
					[
						5.801615,
						43.249946
					],
					[
						5.801846,
						43.25004
					],
					[
						5.801994,
						43.250106
					],
					[
						5.802124,
						43.250153
					],
					[
						5.802248,
						43.250181
					],
					[
						5.802373,
						43.250186
					],
					[
						5.802503,
						43.250167
					],
					[
						5.802627,
						43.250115
					],
					[
						5.802734,
						43.250045
					],
					[
						5.802805,
						43.249974
					],
					[
						5.802846,
						43.249903
					],
					[
						5.802882,
						43.249818
					],
					[
						5.802905,
						43.249701
					],
					[
						5.802905,
						43.249554
					],
					[
						5.80287,
						43.249446
					],
					[
						5.802817,
						43.249342
					],
					[
						5.80274,
						43.249234
					],
					[
						5.802669,
						43.249158
					],
					[
						5.8021,
						43.248616
					],
					[
						5.801911,
						43.248423
					],
					[
						5.801728,
						43.248211
					],
					[
						5.801544,
						43.247961
					],
					[
						5.801461,
						43.247815
					],
					[
						5.801426,
						43.247726
					],
					[
						5.801408,
						43.247641
					],
					[
						5.801426,
						43.247556
					],
					[
						5.801467,
						43.24748
					],
					[
						5.801526,
						43.247405
					],
					[
						5.801627,
						43.247315
					],
					[
						5.801757,
						43.247235
					],
					[
						5.801935,
						43.247146
					],
					[
						5.802118,
						43.24708
					],
					[
						5.802302,
						43.247042
					],
					[
						5.802467,
						43.247028
					],
					[
						5.802633,
						43.247033
					],
					[
						5.802805,
						43.247061
					],
					[
						5.802965,
						43.247103
					],
					[
						5.803124,
						43.247155
					],
					[
						5.803243,
						43.247212
					],
					[
						5.803349,
						43.247273
					],
					[
						5.803438,
						43.247348
					],
					[
						5.803533,
						43.247433
					],
					[
						5.80361,
						43.247542
					],
					[
						5.803669,
						43.247631
					],
					[
						5.803704,
						43.24773
					],
					[
						5.803722,
						43.247829
					],
					[
						5.803728,
						43.247919
					],
					[
						5.803716,
						43.249894
					],
					[
						5.803716,
						43.250031
					],
					[
						5.803704,
						43.250134
					],
					[
						5.803681,
						43.250229
					],
					[
						5.803622,
						43.25036
					],
					[
						5.803556,
						43.250497
					],
					[
						5.80348,
						43.250601
					],
					[
						5.803379,
						43.250709
					],
					[
						5.803249,
						43.250818
					],
					[
						5.803101,
						43.250931
					],
					[
						5.802941,
						43.251025
					],
					[
						5.802799,
						43.251096
					],
					[
						5.802663,
						43.251148
					],
					[
						5.802532,
						43.25119
					],
					[
						5.801467,
						43.251492
					],
					[
						5.8002,
						43.251841
					],
					[
						5.798981,
						43.252171
					],
					[
						5.797531,
						43.252562
					],
					[
						5.796241,
						43.25292
					],
					[
						5.796081,
						43.252972
					],
					[
						5.795933,
						43.253033
					],
					[
						5.79485,
						43.253575
					],
					[
						5.794654,
						43.253674
					],
					[
						5.79456,
						43.25375
					],
					[
						5.794252,
						43.254094
					],
					[
						5.794169,
						43.25415
					],
					[
						5.794051,
						43.254202
					],
					[
						5.793932,
						43.254216
					],
					[
						5.793844,
						43.254216
					],
					[
						5.793749,
						43.254183
					],
					[
						5.793672,
						43.254141
					],
					[
						5.793258,
						43.253858
					],
					[
						5.793169,
						43.253811
					],
					[
						5.793068,
						43.253797
					],
					[
						5.792962,
						43.253811
					],
					[
						5.791784,
						43.254131
					],
					[
						5.788061,
						43.255145
					],
					[
						5.786557,
						43.25556
					],
					[
						5.782065,
						43.256781
					],
					[
						5.781017,
						43.257068
					],
					[
						5.780911,
						43.257106
					],
					[
						5.780822,
						43.257158
					],
					[
						5.780775,
						43.257205
					],
					[
						5.780721,
						43.257261
					],
					[
						5.780662,
						43.257332
					],
					[
						5.780621,
						43.257403
					],
					[
						5.780384,
						43.257813
					],
					[
						5.780319,
						43.257893
					],
					[
						5.780254,
						43.257983
					],
					[
						5.780153,
						43.258077
					],
					[
						5.780059,
						43.258181
					],
					[
						5.779964,
						43.258256
					],
					[
						5.77978,
						43.258379
					],
					[
						5.779603,
						43.258482
					],
					[
						5.779443,
						43.258553
					],
					[
						5.779259,
						43.25861
					],
					[
						5.779094,
						43.258643
					],
					[
						5.778987,
						43.258652
					],
					[
						5.778869,
						43.258638
					],
					[
						5.77875,
						43.25861
					],
					[
						5.778656,
						43.258567
					],
					[
						5.778561,
						43.258506
					],
					[
						5.778508,
						43.258459
					],
					[
						5.778472,
						43.258397
					],
					[
						5.778194,
						43.257799
					],
					[
						5.778164,
						43.257719
					],
					[
						5.778164,
						43.257681
					],
					[
						5.778188,
						43.257629
					],
					[
						5.778241,
						43.257591
					],
					[
						5.778324,
						43.257573
					],
					[
						5.778484,
						43.257577
					],
					[
						5.77904,
						43.257643
					],
					[
						5.7792,
						43.257643
					],
					[
						5.77936,
						43.257629
					],
					[
						5.779496,
						43.257587
					],
					[
						5.779591,
						43.25753
					],
					[
						5.779674,
						43.257464
					],
					[
						5.779721,
						43.257403
					],
					[
						5.779768,
						43.257323
					],
					[
						5.779786,
						43.257257
					],
					[
						5.779792,
						43.2572
					],
					[
						5.77978,
						43.257125
					],
					[
						5.779727,
						43.256894
					],
					[
						5.779727,
						43.256837
					],
					[
						5.779745,
						43.256776
					],
					[
						5.77978,
						43.256719
					],
					[
						5.779851,
						43.256672
					],
					[
						5.779958,
						43.256606
					],
					[
						5.780597,
						43.256328
					],
					[
						5.781118,
						43.256116
					],
					[
						5.781591,
						43.25597
					],
					[
						5.782006,
						43.255843
					],
					[
						5.782219,
						43.255762
					],
					[
						5.78245,
						43.255673
					],
					[
						5.782698,
						43.25555
					],
					[
						5.783024,
						43.25539
					],
					[
						5.783456,
						43.255136
					],
					[
						5.783799,
						43.254952
					],
					[
						5.784012,
						43.254796
					],
					[
						5.784302,
						43.254575
					],
					[
						5.784427,
						43.254509
					],
					[
						5.784598,
						43.254438
					],
					[
						5.785238,
						43.254179
					],
					[
						5.785433,
						43.254122
					],
					[
						5.785587,
						43.254113
					],
					[
						5.785729,
						43.254127
					],
					[
						5.785871,
						43.254164
					],
					[
						5.786001,
						43.254226
					],
					[
						5.78609,
						43.254292
					],
					[
						5.786185,
						43.254386
					],
					[
						5.786267,
						43.254461
					],
					[
						5.786374,
						43.254523
					],
					[
						5.78648,
						43.254551
					],
					[
						5.786599,
						43.254565
					],
					[
						5.786753,
						43.254565
					],
					[
						5.786913,
						43.254556
					],
					[
						5.787055,
						43.254523
					],
					[
						5.787143,
						43.25448
					],
					[
						5.787783,
						43.254122
					],
					[
						5.788629,
						43.253646
					],
					[
						5.789588,
						43.253132
					],
					[
						5.790511,
						43.252609
					],
					[
						5.791571,
						43.25202
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "at-1969",
				Location: "Spielberg",
				Name: "Red Bull Ring",
				opened: 1969,
				firstgp: 1970,
				length: 4318,
				altitude: 721
			},
			bbox: [
				14.754069,
				47.219284,
				14.770648,
				47.226388
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						14.765119,
						47.220023
					],
					[
						14.763977,
						47.219817
					],
					[
						14.761148,
						47.219294
					],
					[
						14.760953,
						47.219284
					],
					[
						14.760823,
						47.219364
					],
					[
						14.760604,
						47.219652
					],
					[
						14.759911,
						47.220288
					],
					[
						14.759159,
						47.221014
					],
					[
						14.758568,
						47.221655
					],
					[
						14.758029,
						47.222287
					],
					[
						14.757147,
						47.223593
					],
					[
						14.756904,
						47.223941
					],
					[
						14.756531,
						47.224351
					],
					[
						14.755957,
						47.224828
					],
					[
						14.755004,
						47.225478
					],
					[
						14.754122,
						47.226077
					],
					[
						14.754069,
						47.226157
					],
					[
						14.754075,
						47.226242
					],
					[
						14.754176,
						47.226284
					],
					[
						14.754407,
						47.226312
					],
					[
						14.755129,
						47.226369
					],
					[
						14.755851,
						47.226388
					],
					[
						14.756597,
						47.226383
					],
					[
						14.757307,
						47.226336
					],
					[
						14.75813,
						47.226246
					],
					[
						14.760645,
						47.225916
					],
					[
						14.761793,
						47.225813
					],
					[
						14.764273,
						47.225742
					],
					[
						14.764475,
						47.225695
					],
					[
						14.764599,
						47.225601
					],
					[
						14.764646,
						47.225497
					],
					[
						14.764634,
						47.225388
					],
					[
						14.764569,
						47.225285
					],
					[
						14.764321,
						47.225044
					],
					[
						14.764125,
						47.224884
					],
					[
						14.763764,
						47.224667
					],
					[
						14.763368,
						47.224521
					],
					[
						14.762888,
						47.224413
					],
					[
						14.762367,
						47.224356
					],
					[
						14.761823,
						47.22438
					],
					[
						14.75971,
						47.224611
					],
					[
						14.759426,
						47.224587
					],
					[
						14.759195,
						47.224531
					],
					[
						14.758994,
						47.224436
					],
					[
						14.758816,
						47.224309
					],
					[
						14.758704,
						47.224158
					],
					[
						14.758644,
						47.223993
					],
					[
						14.758633,
						47.223842
					],
					[
						14.758668,
						47.223677
					],
					[
						14.758733,
						47.223555
					],
					[
						14.759757,
						47.222339
					],
					[
						14.759929,
						47.222211
					],
					[
						14.760201,
						47.222094
					],
					[
						14.760515,
						47.222046
					],
					[
						14.760817,
						47.222065
					],
					[
						14.761136,
						47.222155
					],
					[
						14.761332,
						47.222263
					],
					[
						14.761533,
						47.222433
					],
					[
						14.761722,
						47.222598
					],
					[
						14.761924,
						47.222739
					],
					[
						14.762166,
						47.222852
					],
					[
						14.76245,
						47.222966
					],
					[
						14.762847,
						47.223065
					],
					[
						14.763261,
						47.223126
					],
					[
						14.76654,
						47.223173
					],
					[
						14.769062,
						47.223215
					],
					[
						14.769328,
						47.223211
					],
					[
						14.769588,
						47.223149
					],
					[
						14.769802,
						47.223041
					],
					[
						14.769973,
						47.222895
					],
					[
						14.770103,
						47.222702
					],
					[
						14.770618,
						47.221523
					],
					[
						14.770648,
						47.221415
					],
					[
						14.770618,
						47.221335
					],
					[
						14.770559,
						47.221273
					],
					[
						14.770358,
						47.221165
					],
					[
						14.770092,
						47.221057
					],
					[
						14.769748,
						47.220939
					],
					[
						14.769358,
						47.220826
					],
					[
						14.768896,
						47.220722
					],
					[
						14.765119,
						47.220023
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "gb-1948",
				Location: "Silverstone",
				Name: "Silverstone Circuit",
				opened: 1948,
				firstgp: 1950,
				length: 5891,
				altitude: 196
			},
			bbox: [
				-1.024286,
				52.063513,
				-1.009264,
				52.078936
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-1.015349,
						52.07879
					],
					[
						-1.01262,
						52.078936
					],
					[
						-1.012135,
						52.078918
					],
					[
						-1.011762,
						52.078842
					],
					[
						-1.011519,
						52.078743
					],
					[
						-1.011229,
						52.078536
					],
					[
						-1.011046,
						52.0783
					],
					[
						-1.010898,
						52.078003
					],
					[
						-1.01069,
						52.077499
					],
					[
						-1.010477,
						52.077004
					],
					[
						-1.010353,
						52.076457
					],
					[
						-1.0103,
						52.076113
					],
					[
						-1.010229,
						52.075279
					],
					[
						-1.010199,
						52.074567
					],
					[
						-1.010152,
						52.074289
					],
					[
						-1.00998,
						52.074029
					],
					[
						-1.009655,
						52.073666
					],
					[
						-1.009518,
						52.073459
					],
					[
						-1.009524,
						52.073303
					],
					[
						-1.009584,
						52.07312
					],
					[
						-1.010045,
						52.07237
					],
					[
						-1.010075,
						52.072068
					],
					[
						-1.010004,
						52.071852
					],
					[
						-1.009838,
						52.071668
					],
					[
						-1.009382,
						52.071277
					],
					[
						-1.009276,
						52.071097
					],
					[
						-1.009264,
						52.070885
					],
					[
						-1.009341,
						52.070692
					],
					[
						-1.009619,
						52.07048
					],
					[
						-1.009974,
						52.070324
					],
					[
						-1.01046,
						52.07015
					],
					[
						-1.010838,
						52.070013
					],
					[
						-1.011105,
						52.069853
					],
					[
						-1.011412,
						52.069537
					],
					[
						-1.012016,
						52.06884
					],
					[
						-1.015337,
						52.065083
					],
					[
						-1.016426,
						52.064041
					],
					[
						-1.016734,
						52.063786
					],
					[
						-1.016982,
						52.06365
					],
					[
						-1.017272,
						52.06356
					],
					[
						-1.017574,
						52.063513
					],
					[
						-1.017852,
						52.063527
					],
					[
						-1.01816,
						52.06357
					],
					[
						-1.01842,
						52.06364
					],
					[
						-1.018651,
						52.063753
					],
					[
						-1.018847,
						52.063933
					],
					[
						-1.018906,
						52.064003
					],
					[
						-1.019202,
						52.064399
					],
					[
						-1.019533,
						52.064753
					],
					[
						-1.019888,
						52.065045
					],
					[
						-1.020131,
						52.065224
					],
					[
						-1.020403,
						52.065408
					],
					[
						-1.020883,
						52.06571
					],
					[
						-1.021954,
						52.066497
					],
					[
						-1.022061,
						52.066539
					],
					[
						-1.022209,
						52.066549
					],
					[
						-1.022356,
						52.066506
					],
					[
						-1.022806,
						52.066256
					],
					[
						-1.02296,
						52.066223
					],
					[
						-1.023114,
						52.066233
					],
					[
						-1.023244,
						52.066266
					],
					[
						-1.023428,
						52.066374
					],
					[
						-1.023623,
						52.066497
					],
					[
						-1.023866,
						52.066695
					],
					[
						-1.024043,
						52.066907
					],
					[
						-1.024168,
						52.067124
					],
					[
						-1.024274,
						52.067369
					],
					[
						-1.024286,
						52.067468
					],
					[
						-1.024256,
						52.067567
					],
					[
						-1.024168,
						52.067661
					],
					[
						-1.023955,
						52.067869
					],
					[
						-1.020687,
						52.070489
					],
					[
						-1.019953,
						52.071069
					],
					[
						-1.0198,
						52.071178
					],
					[
						-1.019533,
						52.071286
					],
					[
						-1.019214,
						52.071333
					],
					[
						-1.018953,
						52.071338
					],
					[
						-1.018592,
						52.071319
					],
					[
						-1.017586,
						52.071225
					],
					[
						-1.017254,
						52.071201
					],
					[
						-1.016911,
						52.071192
					],
					[
						-1.01652,
						52.071225
					],
					[
						-1.016165,
						52.071281
					],
					[
						-1.015846,
						52.07139
					],
					[
						-1.013762,
						52.072408
					],
					[
						-1.013626,
						52.072464
					],
					[
						-1.01346,
						52.072516
					],
					[
						-1.013289,
						52.072526
					],
					[
						-1.013159,
						52.072497
					],
					[
						-1.01304,
						52.072431
					],
					[
						-1.012969,
						52.072356
					],
					[
						-1.012614,
						52.071592
					],
					[
						-1.012507,
						52.071484
					],
					[
						-1.01236,
						52.071418
					],
					[
						-1.012188,
						52.071413
					],
					[
						-1.011998,
						52.071465
					],
					[
						-1.01188,
						52.071559
					],
					[
						-1.011803,
						52.071658
					],
					[
						-1.011655,
						52.071908
					],
					[
						-1.011537,
						52.07212
					],
					[
						-1.011448,
						52.072328
					],
					[
						-1.011401,
						52.07253
					],
					[
						-1.011371,
						52.072743
					],
					[
						-1.011395,
						52.072964
					],
					[
						-1.011466,
						52.073063
					],
					[
						-1.011649,
						52.07319
					],
					[
						-1.018403,
						52.07698
					],
					[
						-1.018586,
						52.077051
					],
					[
						-1.018841,
						52.077131
					],
					[
						-1.019154,
						52.077159
					],
					[
						-1.01948,
						52.077136
					],
					[
						-1.019811,
						52.077037
					],
					[
						-1.01993,
						52.076947
					],
					[
						-1.020013,
						52.076815
					],
					[
						-1.020149,
						52.076127
					],
					[
						-1.020226,
						52.075986
					],
					[
						-1.020391,
						52.075872
					],
					[
						-1.02064,
						52.075797
					],
					[
						-1.020912,
						52.075773
					],
					[
						-1.021214,
						52.075821
					],
					[
						-1.021427,
						52.07591
					],
					[
						-1.021557,
						52.076014
					],
					[
						-1.021658,
						52.076136
					],
					[
						-1.021676,
						52.076268
					],
					[
						-1.021634,
						52.07641
					],
					[
						-1.021469,
						52.076641
					],
					[
						-1.020599,
						52.077701
					],
					[
						-1.02032,
						52.077904
					],
					[
						-1.020048,
						52.078074
					],
					[
						-1.019657,
						52.078281
					],
					[
						-1.019338,
						52.078418
					],
					[
						-1.018935,
						52.078522
					],
					[
						-1.018586,
						52.078592
					],
					[
						-1.017846,
						52.078649
					],
					[
						-1.015349,
						52.07879
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "de-1932",
				Location: "Hockenheim",
				Name: "Hockenheimring",
				opened: 1932,
				firstgp: 1970,
				length: 4574,
				altitude: 148
			},
			bbox: [
				8.564229,
				49.325608,
				8.584294,
				49.333824
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						8.565865,
						49.327768
					],
					[
						8.565045,
						49.328856
					],
					[
						8.564246,
						49.329827
					],
					[
						8.564229,
						49.329902
					],
					[
						8.564264,
						49.329978
					],
					[
						8.564625,
						49.330515
					],
					[
						8.564797,
						49.330756
					],
					[
						8.56498,
						49.330977
					],
					[
						8.565176,
						49.33117
					],
					[
						8.565371,
						49.331335
					],
					[
						8.565732,
						49.331609
					],
					[
						8.566513,
						49.332132
					],
					[
						8.568922,
						49.333777
					],
					[
						8.569023,
						49.33381
					],
					[
						8.569159,
						49.333824
					],
					[
						8.569272,
						49.333791
					],
					[
						8.56939,
						49.33372
					],
					[
						8.56952,
						49.333584
					],
					[
						8.569615,
						49.333414
					],
					[
						8.569633,
						49.333268
					],
					[
						8.569627,
						49.333065
					],
					[
						8.56965,
						49.332957
					],
					[
						8.569686,
						49.332863
					],
					[
						8.569787,
						49.332731
					],
					[
						8.569899,
						49.332636
					],
					[
						8.570094,
						49.332542
					],
					[
						8.570662,
						49.332316
					],
					[
						8.571266,
						49.332094
					],
					[
						8.5719,
						49.331887
					],
					[
						8.572497,
						49.331703
					],
					[
						8.572947,
						49.33158
					],
					[
						8.573509,
						49.331453
					],
					[
						8.574066,
						49.331354
					],
					[
						8.574551,
						49.331279
					],
					[
						8.575202,
						49.331203
					],
					[
						8.575652,
						49.331166
					],
					[
						8.576173,
						49.331137
					],
					[
						8.576611,
						49.331133
					],
					[
						8.577179,
						49.331151
					],
					[
						8.577736,
						49.331189
					],
					[
						8.578298,
						49.33126
					],
					[
						8.578931,
						49.331368
					],
					[
						8.580109,
						49.331628
					],
					[
						8.58398,
						49.332584
					],
					[
						8.584104,
						49.332599
					],
					[
						8.584211,
						49.33258
					],
					[
						8.584276,
						49.332523
					],
					[
						8.584294,
						49.332462
					],
					[
						8.584264,
						49.332405
					],
					[
						8.584193,
						49.332358
					],
					[
						8.582707,
						49.331722
					],
					[
						8.579606,
						49.330388
					],
					[
						8.579387,
						49.330331
					],
					[
						8.579144,
						49.330317
					],
					[
						8.575729,
						49.330595
					],
					[
						8.575581,
						49.330595
					],
					[
						8.57548,
						49.330539
					],
					[
						8.575421,
						49.330416
					],
					[
						8.575404,
						49.330218
					],
					[
						8.575433,
						49.329968
					],
					[
						8.575528,
						49.329766
					],
					[
						8.575688,
						49.329577
					],
					[
						8.575889,
						49.329403
					],
					[
						8.575966,
						49.329304
					],
					[
						8.575995,
						49.3292
					],
					[
						8.575995,
						49.329106
					],
					[
						8.575954,
						49.329007
					],
					[
						8.575853,
						49.32887
					],
					[
						8.575729,
						49.328757
					],
					[
						8.575575,
						49.328658
					],
					[
						8.575273,
						49.328502
					],
					[
						8.573628,
						49.327786
					],
					[
						8.571675,
						49.326956
					],
					[
						8.571497,
						49.326895
					],
					[
						8.571302,
						49.326853
					],
					[
						8.571124,
						49.326843
					],
					[
						8.570923,
						49.326857
					],
					[
						8.570751,
						49.326881
					],
					[
						8.57058,
						49.326928
					],
					[
						8.570414,
						49.326999
					],
					[
						8.570236,
						49.327102
					],
					[
						8.570017,
						49.327277
					],
					[
						8.568265,
						49.328625
					],
					[
						8.568135,
						49.328696
					],
					[
						8.567987,
						49.328743
					],
					[
						8.567827,
						49.328752
					],
					[
						8.567668,
						49.328743
					],
					[
						8.567531,
						49.3287
					],
					[
						8.567425,
						49.32863
					],
					[
						8.567336,
						49.328545
					],
					[
						8.567289,
						49.328446
					],
					[
						8.567283,
						49.328342
					],
					[
						8.567312,
						49.328224
					],
					[
						8.567597,
						49.327649
					],
					[
						8.567668,
						49.327555
					],
					[
						8.567774,
						49.327456
					],
					[
						8.567928,
						49.327371
					],
					[
						8.568094,
						49.327319
					],
					[
						8.568449,
						49.32723
					],
					[
						8.56862,
						49.327168
					],
					[
						8.568751,
						49.327088
					],
					[
						8.568893,
						49.326975
					],
					[
						8.569337,
						49.326565
					],
					[
						8.569414,
						49.326452
					],
					[
						8.569443,
						49.326372
					],
					[
						8.569431,
						49.326287
					],
					[
						8.569396,
						49.326197
					],
					[
						8.569289,
						49.326108
					],
					[
						8.569112,
						49.326014
					],
					[
						8.568455,
						49.325707
					],
					[
						8.56823,
						49.325627
					],
					[
						8.568076,
						49.325608
					],
					[
						8.567904,
						49.325608
					],
					[
						8.567703,
						49.325636
					],
					[
						8.56752,
						49.325712
					],
					[
						8.567354,
						49.32582
					],
					[
						8.567206,
						49.325957
					],
					[
						8.567076,
						49.326108
					],
					[
						8.565865,
						49.327768
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "hu-1986",
				Location: "Budapest",
				Name: "Hungaroring",
				opened: 1986,
				firstgp: 1986,
				length: 4381,
				altitude: 239
			},
			bbox: [
				19.242326,
				47.577571,
				19.256609,
				47.588474
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						19.245888,
						47.58026
					],
					[
						19.243226,
						47.581696
					],
					[
						19.242439,
						47.582111
					],
					[
						19.242368,
						47.582191
					],
					[
						19.242326,
						47.582271
					],
					[
						19.242338,
						47.582361
					],
					[
						19.242391,
						47.582431
					],
					[
						19.242468,
						47.582478
					],
					[
						19.242569,
						47.582511
					],
					[
						19.242717,
						47.582526
					],
					[
						19.242936,
						47.582526
					],
					[
						19.243546,
						47.582516
					],
					[
						19.243954,
						47.582469
					],
					[
						19.244327,
						47.582394
					],
					[
						19.244718,
						47.58229
					],
					[
						19.245014,
						47.582177
					],
					[
						19.245238,
						47.582073
					],
					[
						19.247411,
						47.580913
					],
					[
						19.24757,
						47.580857
					],
					[
						19.247724,
						47.580833
					],
					[
						19.247878,
						47.580833
					],
					[
						19.248003,
						47.580862
					],
					[
						19.248139,
						47.580895
					],
					[
						19.248245,
						47.580951
					],
					[
						19.248334,
						47.581017
					],
					[
						19.248393,
						47.581078
					],
					[
						19.248446,
						47.581163
					],
					[
						19.248464,
						47.581281
					],
					[
						19.248458,
						47.581347
					],
					[
						19.248411,
						47.581437
					],
					[
						19.24837,
						47.581526
					],
					[
						19.247748,
						47.582238
					],
					[
						19.247683,
						47.58237
					],
					[
						19.247671,
						47.582474
					],
					[
						19.247707,
						47.582563
					],
					[
						19.247754,
						47.582676
					],
					[
						19.247813,
						47.58278
					],
					[
						19.2485,
						47.583704
					],
					[
						19.249719,
						47.585368
					],
					[
						19.249938,
						47.585632
					],
					[
						19.250193,
						47.585863
					],
					[
						19.250512,
						47.586113
					],
					[
						19.250577,
						47.586183
					],
					[
						19.250625,
						47.586254
					],
					[
						19.250636,
						47.586334
					],
					[
						19.250601,
						47.586424
					],
					[
						19.250045,
						47.587838
					],
					[
						19.250033,
						47.587946
					],
					[
						19.25005,
						47.58805
					],
					[
						19.250092,
						47.588154
					],
					[
						19.250157,
						47.588253
					],
					[
						19.250275,
						47.588333
					],
					[
						19.250417,
						47.588404
					],
					[
						19.250565,
						47.588455
					],
					[
						19.250713,
						47.588474
					],
					[
						19.250897,
						47.58847
					],
					[
						19.251074,
						47.588441
					],
					[
						19.251288,
						47.58838
					],
					[
						19.25153,
						47.588276
					],
					[
						19.251702,
						47.588196
					],
					[
						19.251903,
						47.588097
					],
					[
						19.252116,
						47.587984
					],
					[
						19.252383,
						47.587796
					],
					[
						19.253519,
						47.586966
					],
					[
						19.253572,
						47.586886
					],
					[
						19.25359,
						47.586824
					],
					[
						19.253584,
						47.586758
					],
					[
						19.253525,
						47.586702
					],
					[
						19.25343,
						47.586641
					],
					[
						19.253353,
						47.586589
					],
					[
						19.253324,
						47.586542
					],
					[
						19.25333,
						47.586457
					],
					[
						19.253359,
						47.586363
					],
					[
						19.253773,
						47.585311
					],
					[
						19.253862,
						47.58517
					],
					[
						19.253927,
						47.585113
					],
					[
						19.253992,
						47.585062
					],
					[
						19.254081,
						47.585014
					],
					[
						19.254188,
						47.584991
					],
					[
						19.254389,
						47.584963
					],
					[
						19.255247,
						47.584878
					],
					[
						19.255425,
						47.584831
					],
					[
						19.255537,
						47.584779
					],
					[
						19.255632,
						47.584727
					],
					[
						19.255715,
						47.584637
					],
					[
						19.255744,
						47.584557
					],
					[
						19.25578,
						47.584463
					],
					[
						19.25578,
						47.584359
					],
					[
						19.25575,
						47.584246
					],
					[
						19.255537,
						47.583233
					],
					[
						19.255531,
						47.583053
					],
					[
						19.255549,
						47.58294
					],
					[
						19.255596,
						47.582823
					],
					[
						19.255662,
						47.582709
					],
					[
						19.256502,
						47.581804
					],
					[
						19.256585,
						47.581668
					],
					[
						19.256603,
						47.581573
					],
					[
						19.256609,
						47.581484
					],
					[
						19.256591,
						47.58139
					],
					[
						19.256561,
						47.581295
					],
					[
						19.256502,
						47.58121
					],
					[
						19.256407,
						47.581126
					],
					[
						19.254963,
						47.580032
					],
					[
						19.253679,
						47.579028
					],
					[
						19.253241,
						47.578698
					],
					[
						19.253134,
						47.578656
					],
					[
						19.253034,
						47.578646
					],
					[
						19.252939,
						47.578656
					],
					[
						19.252856,
						47.578689
					],
					[
						19.252773,
						47.57874
					],
					[
						19.251897,
						47.57941
					],
					[
						19.251755,
						47.579504
					],
					[
						19.251086,
						47.579872
					],
					[
						19.250968,
						47.579914
					],
					[
						19.25085,
						47.579947
					],
					[
						19.250707,
						47.579961
					],
					[
						19.250583,
						47.579952
					],
					[
						19.250417,
						47.5799
					],
					[
						19.250317,
						47.579825
					],
					[
						19.250246,
						47.579744
					],
					[
						19.250204,
						47.579674
					],
					[
						19.250193,
						47.579579
					],
					[
						19.25021,
						47.579485
					],
					[
						19.250269,
						47.579396
					],
					[
						19.250346,
						47.579325
					],
					[
						19.251666,
						47.578608
					],
					[
						19.251909,
						47.578458
					],
					[
						19.25198,
						47.578377
					],
					[
						19.252033,
						47.578264
					],
					[
						19.252057,
						47.578132
					],
					[
						19.252039,
						47.57801
					],
					[
						19.25198,
						47.577906
					],
					[
						19.251909,
						47.577807
					],
					[
						19.251797,
						47.577722
					],
					[
						19.251613,
						47.577642
					],
					[
						19.251424,
						47.57759
					],
					[
						19.251217,
						47.577571
					],
					[
						19.250998,
						47.57759
					],
					[
						19.250802,
						47.577642
					],
					[
						19.250619,
						47.577727
					],
					[
						19.245888,
						47.58026
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "be-1925",
				Location: "Spa Francorchamps",
				Name: "Circuit de Spa-Francorchamps",
				opened: 1925,
				firstgp: 1950,
				length: 7004,
				altitude: 413
			},
			bbox: [
				5.959602,
				50.427678,
				5.97756,
				50.446217
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						5.96502,
						50.444251
					],
					[
						5.963419,
						50.446033
					],
					[
						5.963402,
						50.446113
					],
					[
						5.963473,
						50.446184
					],
					[
						5.963621,
						50.446217
					],
					[
						5.963786,
						50.446188
					],
					[
						5.964313,
						50.446019
					],
					[
						5.965592,
						50.445628
					],
					[
						5.966207,
						50.445387
					],
					[
						5.966847,
						50.445085
					],
					[
						5.967421,
						50.444779
					],
					[
						5.967876,
						50.444463
					],
					[
						5.970321,
						50.442606
					],
					[
						5.970493,
						50.442502
					],
					[
						5.970788,
						50.442385
					],
					[
						5.971315,
						50.442168
					],
					[
						5.971546,
						50.442022
					],
					[
						5.971741,
						50.441824
					],
					[
						5.971866,
						50.441644
					],
					[
						5.971949,
						50.441442
					],
					[
						5.97202,
						50.441069
					],
					[
						5.972061,
						50.440937
					],
					[
						5.972132,
						50.440815
					],
					[
						5.972268,
						50.440655
					],
					[
						5.973476,
						50.439424
					],
					[
						5.974245,
						50.438642
					],
					[
						5.974458,
						50.43835
					],
					[
						5.974594,
						50.438133
					],
					[
						5.974754,
						50.437784
					],
					[
						5.975719,
						50.435639
					],
					[
						5.977199,
						50.432382
					],
					[
						5.977542,
						50.431599
					],
					[
						5.97756,
						50.431472
					],
					[
						5.977524,
						50.431331
					],
					[
						5.977406,
						50.431218
					],
					[
						5.977234,
						50.431123
					],
					[
						5.977015,
						50.431048
					],
					[
						5.976885,
						50.430968
					],
					[
						5.976796,
						50.430874
					],
					[
						5.976725,
						50.430732
					],
					[
						5.976737,
						50.430591
					],
					[
						5.977033,
						50.429747
					],
					[
						5.977027,
						50.429601
					],
					[
						5.97698,
						50.429469
					],
					[
						5.97682,
						50.429323
					],
					[
						5.97663,
						50.429224
					],
					[
						5.973257,
						50.427739
					],
					[
						5.973044,
						50.427682
					],
					[
						5.972831,
						50.427678
					],
					[
						5.972606,
						50.42772
					],
					[
						5.972422,
						50.427805
					],
					[
						5.972292,
						50.427927
					],
					[
						5.972239,
						50.42805
					],
					[
						5.972227,
						50.428182
					],
					[
						5.972292,
						50.428305
					],
					[
						5.97241,
						50.428432
					],
					[
						5.972582,
						50.428521
					],
					[
						5.974056,
						50.429101
					],
					[
						5.974216,
						50.429205
					],
					[
						5.974304,
						50.429309
					],
					[
						5.97434,
						50.429431
					],
					[
						5.974322,
						50.429582
					],
					[
						5.973712,
						50.430723
					],
					[
						5.973523,
						50.431189
					],
					[
						5.973091,
						50.432627
					],
					[
						5.972878,
						50.433452
					],
					[
						5.972831,
						50.433593
					],
					[
						5.972724,
						50.433744
					],
					[
						5.972582,
						50.433867
					],
					[
						5.972369,
						50.433999
					],
					[
						5.972132,
						50.434098
					],
					[
						5.971872,
						50.434164
					],
					[
						5.971599,
						50.434192
					],
					[
						5.970717,
						50.43423
					],
					[
						5.97038,
						50.434206
					],
					[
						5.970072,
						50.43415
					],
					[
						5.969759,
						50.434065
					],
					[
						5.969504,
						50.433956
					],
					[
						5.969208,
						50.433782
					],
					[
						5.969019,
						50.433608
					],
					[
						5.968812,
						50.433358
					],
					[
						5.967977,
						50.432028
					],
					[
						5.967231,
						50.430845
					],
					[
						5.967071,
						50.430661
					],
					[
						5.966882,
						50.430534
					],
					[
						5.966622,
						50.43044
					],
					[
						5.966361,
						50.430393
					],
					[
						5.966119,
						50.430388
					],
					[
						5.965876,
						50.430421
					],
					[
						5.965669,
						50.430482
					],
					[
						5.965325,
						50.430624
					],
					[
						5.9651,
						50.430685
					],
					[
						5.964828,
						50.430713
					],
					[
						5.964556,
						50.430694
					],
					[
						5.964307,
						50.430643
					],
					[
						5.964094,
						50.430548
					],
					[
						5.963958,
						50.43044
					],
					[
						5.963792,
						50.430294
					],
					[
						5.962425,
						50.428927
					],
					[
						5.962289,
						50.428847
					],
					[
						5.962123,
						50.42879
					],
					[
						5.961922,
						50.428762
					],
					[
						5.961697,
						50.428771
					],
					[
						5.961502,
						50.428828
					],
					[
						5.960578,
						50.429257
					],
					[
						5.960034,
						50.429511
					],
					[
						5.959898,
						50.429624
					],
					[
						5.959756,
						50.429761
					],
					[
						5.959673,
						50.429893
					],
					[
						5.959614,
						50.430049
					],
					[
						5.959602,
						50.430209
					],
					[
						5.959643,
						50.430402
					],
					[
						5.959738,
						50.430567
					],
					[
						5.959862,
						50.430779
					],
					[
						5.960046,
						50.4311
					],
					[
						5.960365,
						50.431463
					],
					[
						5.960715,
						50.431779
					],
					[
						5.961247,
						50.43216
					],
					[
						5.962135,
						50.432712
					],
					[
						5.962656,
						50.432971
					],
					[
						5.9631,
						50.433136
					],
					[
						5.965385,
						50.433895
					],
					[
						5.965716,
						50.434027
					],
					[
						5.96603,
						50.434183
					],
					[
						5.96632,
						50.434357
					],
					[
						5.966568,
						50.434546
					],
					[
						5.966799,
						50.434744
					],
					[
						5.967107,
						50.435106
					],
					[
						5.967356,
						50.435455
					],
					[
						5.967924,
						50.436261
					],
					[
						5.968024,
						50.436436
					],
					[
						5.968084,
						50.436624
					],
					[
						5.968095,
						50.43686
					],
					[
						5.968036,
						50.437072
					],
					[
						5.967699,
						50.437624
					],
					[
						5.967332,
						50.438232
					],
					[
						5.966888,
						50.438991
					],
					[
						5.966775,
						50.439273
					],
					[
						5.966669,
						50.439608
					],
					[
						5.966604,
						50.439919
					],
					[
						5.966562,
						50.440183
					],
					[
						5.966432,
						50.441404
					],
					[
						5.966456,
						50.441484
					],
					[
						5.966533,
						50.441541
					],
					[
						5.966651,
						50.44156
					],
					[
						5.966852,
						50.441541
					],
					[
						5.96706,
						50.441541
					],
					[
						5.967202,
						50.44156
					],
					[
						5.967296,
						50.441626
					],
					[
						5.96732,
						50.441701
					],
					[
						5.967261,
						50.4418
					],
					[
						5.966533,
						50.442559
					],
					[
						5.96502,
						50.444251
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "it-1922",
				Location: "Monza",
				Name: "Autodromo Nazionale Monza",
				opened: 1922,
				firstgp: 1950,
				length: 5793,
				altitude: 142
			},
			bbox: [
				9.280697,
				45.611858,
				9.296856,
				45.631364
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						9.281223,
						45.618975
					],
					[
						9.281692,
						45.622832
					],
					[
						9.281905,
						45.624449
					],
					[
						9.281928,
						45.624515
					],
					[
						9.281994,
						45.624553
					],
					[
						9.282076,
						45.624562
					],
					[
						9.282177,
						45.624553
					],
					[
						9.282272,
						45.624548
					],
					[
						9.28236,
						45.624553
					],
					[
						9.28242,
						45.624586
					],
					[
						9.282467,
						45.624633
					],
					[
						9.282479,
						45.624675
					],
					[
						9.282479,
						45.624722
					],
					[
						9.282147,
						45.625604
					],
					[
						9.2821,
						45.625844
					],
					[
						9.282082,
						45.626061
					],
					[
						9.282106,
						45.626297
					],
					[
						9.28223,
						45.627447
					],
					[
						9.282278,
						45.627635
					],
					[
						9.282337,
						45.62781
					],
					[
						9.282426,
						45.627998
					],
					[
						9.282544,
						45.628201
					],
					[
						9.28268,
						45.628399
					],
					[
						9.282881,
						45.628621
					],
					[
						9.283088,
						45.628804
					],
					[
						9.283367,
						45.629012
					],
					[
						9.283669,
						45.629196
					],
					[
						9.284006,
						45.629365
					],
					[
						9.284367,
						45.629511
					],
					[
						9.284775,
						45.629653
					],
					[
						9.285184,
						45.629752
					],
					[
						9.285634,
						45.629841
					],
					[
						9.286143,
						45.629903
					],
					[
						9.286664,
						45.629936
					],
					[
						9.288694,
						45.630058
					],
					[
						9.29118,
						45.630162
					],
					[
						9.291328,
						45.630171
					],
					[
						9.291405,
						45.6302
					],
					[
						9.29147,
						45.630247
					],
					[
						9.291552,
						45.63045
					],
					[
						9.291588,
						45.630506
					],
					[
						9.291647,
						45.630544
					],
					[
						9.291748,
						45.630567
					],
					[
						9.292085,
						45.63061
					],
					[
						9.292452,
						45.630666
					],
					[
						9.292973,
						45.630784
					],
					[
						9.295299,
						45.631331
					],
					[
						9.2955,
						45.631364
					],
					[
						9.29569,
						45.631364
					],
					[
						9.295873,
						45.63134
					],
					[
						9.296003,
						45.631303
					],
					[
						9.296128,
						45.631251
					],
					[
						9.296246,
						45.631194
					],
					[
						9.296394,
						45.631081
					],
					[
						9.296477,
						45.630992
					],
					[
						9.296536,
						45.630883
					],
					[
						9.296566,
						45.630761
					],
					[
						9.296666,
						45.629988
					],
					[
						9.296856,
						45.628668
					],
					[
						9.29685,
						45.62855
					],
					[
						9.29682,
						45.628474
					],
					[
						9.296773,
						45.628408
					],
					[
						9.296696,
						45.628361
					],
					[
						9.296554,
						45.628295
					],
					[
						9.295033,
						45.62772
					],
					[
						9.293796,
						45.627235
					],
					[
						9.293026,
						45.626938
					],
					[
						9.292653,
						45.626787
					],
					[
						9.292233,
						45.62658
					],
					[
						9.291931,
						45.626419
					],
					[
						9.291671,
						45.626259
					],
					[
						9.290321,
						45.625448
					],
					[
						9.289363,
						45.62484
					],
					[
						9.287338,
						45.623596
					],
					[
						9.286119,
						45.622846
					],
					[
						9.285953,
						45.622728
					],
					[
						9.285888,
						45.622653
					],
					[
						9.285876,
						45.622578
					],
					[
						9.285876,
						45.622488
					],
					[
						9.285918,
						45.62229
					],
					[
						9.28593,
						45.622182
					],
					[
						9.28593,
						45.622026
					],
					[
						9.285912,
						45.621941
					],
					[
						9.285864,
						45.621833
					],
					[
						9.285793,
						45.621706
					],
					[
						9.285675,
						45.621578
					],
					[
						9.285515,
						45.621446
					],
					[
						9.285332,
						45.621338
					],
					[
						9.285184,
						45.621258
					],
					[
						9.285107,
						45.621196
					],
					[
						9.285048,
						45.621112
					],
					[
						9.284994,
						45.620956
					],
					[
						9.28487,
						45.620244
					],
					[
						9.28474,
						45.619485
					],
					[
						9.283734,
						45.612679
					],
					[
						9.283692,
						45.612434
					],
					[
						9.283651,
						45.61232
					],
					[
						9.283568,
						45.612203
					],
					[
						9.283455,
						45.612108
					],
					[
						9.283325,
						45.612023
					],
					[
						9.283142,
						45.611939
					],
					[
						9.282941,
						45.611887
					],
					[
						9.28271,
						45.611858
					],
					[
						9.282514,
						45.611868
					],
					[
						9.282331,
						45.611896
					],
					[
						9.282118,
						45.611953
					],
					[
						9.281911,
						45.612019
					],
					[
						9.281757,
						45.612094
					],
					[
						9.281573,
						45.612193
					],
					[
						9.281366,
						45.612349
					],
					[
						9.281224,
						45.61249
					],
					[
						9.2811,
						45.612641
					],
					[
						9.280993,
						45.61282
					],
					[
						9.280893,
						45.613018
					],
					[
						9.280816,
						45.613221
					],
					[
						9.28078,
						45.613395
					],
					[
						9.280739,
						45.613659
					],
					[
						9.280733,
						45.613923
					],
					[
						9.280727,
						45.614173
					],
					[
						9.280709,
						45.614668
					],
					[
						9.280697,
						45.615102
					],
					[
						9.280709,
						45.615573
					],
					[
						9.280786,
						45.61619
					],
					[
						9.281076,
						45.618142
					],
					[
						9.281223,
						45.618975
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "sg-2008",
				Location: "Singapore",
				Name: "Marina Bay Street Circuit",
				opened: 2008,
				firstgp: 2008,
				length: 5063,
				altitude: 18
			},
			bbox: [
				103.851545,
				1.286293,
				103.864454,
				1.294834
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						103.863969,
						1.293246
					],
					[
						103.864224,
						1.291318
					],
					[
						103.864454,
						1.289673
					],
					[
						103.864443,
						1.28947
					],
					[
						103.864395,
						1.2893
					],
					[
						103.864087,
						1.288777
					],
					[
						103.863981,
						1.288673
					],
					[
						103.863797,
						1.288631
					],
					[
						103.863129,
						1.288664
					],
					[
						103.861732,
						1.288725
					],
					[
						103.861483,
						1.288772
					],
					[
						103.86127,
						1.28889
					],
					[
						103.861199,
						1.289018
					],
					[
						103.861187,
						1.289296
					],
					[
						103.86114,
						1.289423
					],
					[
						103.860992,
						1.289503
					],
					[
						103.860832,
						1.289527
					],
					[
						103.860175,
						1.289574
					],
					[
						103.860009,
						1.289555
					],
					[
						103.859938,
						1.289479
					],
					[
						103.859814,
						1.288928
					],
					[
						103.859743,
						1.288796
					],
					[
						103.859583,
						1.288735
					],
					[
						103.858098,
						1.288829
					],
					[
						103.857873,
						1.288895
					],
					[
						103.857772,
						1.28897
					],
					[
						103.857707,
						1.289098
					],
					[
						103.8576,
						1.289508
					],
					[
						103.857565,
						1.289588
					],
					[
						103.85747,
						1.289668
					],
					[
						103.857222,
						1.289715
					],
					[
						103.856926,
						1.289781
					],
					[
						103.856665,
						1.289913
					],
					[
						103.855665,
						1.290729
					],
					[
						103.85528,
						1.291092
					],
					[
						103.855103,
						1.291219
					],
					[
						103.854984,
						1.291228
					],
					[
						103.854901,
						1.291153
					],
					[
						103.854848,
						1.291049
					],
					[
						103.85473,
						1.290672
					],
					[
						103.854629,
						1.290271
					],
					[
						103.854392,
						1.289008
					],
					[
						103.85396,
						1.286576
					],
					[
						103.853919,
						1.286397
					],
					[
						103.853877,
						1.286312
					],
					[
						103.853818,
						1.286293
					],
					[
						103.853765,
						1.286307
					],
					[
						103.853658,
						1.286439
					],
					[
						103.853481,
						1.286712
					],
					[
						103.85338,
						1.286859
					],
					[
						103.853256,
						1.287
					],
					[
						103.852984,
						1.287231
					],
					[
						103.852652,
						1.287523
					],
					[
						103.852552,
						1.287632
					],
					[
						103.852469,
						1.287745
					],
					[
						103.852433,
						1.287844
					],
					[
						103.852368,
						1.288268
					],
					[
						103.852362,
						1.288414
					],
					[
						103.852344,
						1.288457
					],
					[
						103.852315,
						1.288475
					],
					[
						103.852262,
						1.288485
					],
					[
						103.852202,
						1.288499
					],
					[
						103.852143,
						1.288518
					],
					[
						103.85177,
						1.288763
					],
					[
						103.851681,
						1.288838
					],
					[
						103.85161,
						1.288933
					],
					[
						103.851551,
						1.289051
					],
					[
						103.851545,
						1.289145
					],
					[
						103.851545,
						1.289272
					],
					[
						103.851563,
						1.289366
					],
					[
						103.851628,
						1.289498
					],
					[
						103.852445,
						1.290917
					],
					[
						103.853126,
						1.292199
					],
					[
						103.853244,
						1.292345
					],
					[
						103.853386,
						1.292444
					],
					[
						103.85354,
						1.292501
					],
					[
						103.85367,
						1.292515
					],
					[
						103.853783,
						1.292468
					],
					[
						103.853889,
						1.292397
					],
					[
						103.853984,
						1.292308
					],
					[
						103.854848,
						1.291483
					],
					[
						103.854966,
						1.291436
					],
					[
						103.855061,
						1.291488
					],
					[
						103.855428,
						1.292195
					],
					[
						103.855866,
						1.292986
					],
					[
						103.855984,
						1.293057
					],
					[
						103.856127,
						1.293024
					],
					[
						103.858299,
						1.291676
					],
					[
						103.858713,
						1.291483
					],
					[
						103.859104,
						1.291389
					],
					[
						103.862412,
						1.291209
					],
					[
						103.862625,
						1.291252
					],
					[
						103.862791,
						1.291346
					],
					[
						103.862921,
						1.291497
					],
					[
						103.862975,
						1.291671
					],
					[
						103.862963,
						1.291888
					],
					[
						103.862844,
						1.292572
					],
					[
						103.862477,
						1.293741
					],
					[
						103.86246,
						1.294009
					],
					[
						103.862489,
						1.294533
					],
					[
						103.862549,
						1.29474
					],
					[
						103.862667,
						1.294825
					],
					[
						103.862809,
						1.294834
					],
					[
						103.862904,
						1.294749
					],
					[
						103.863028,
						1.29457
					],
					[
						103.863188,
						1.294429
					],
					[
						103.863383,
						1.29433
					],
					[
						103.863561,
						1.294306
					],
					[
						103.863715,
						1.294325
					],
					[
						103.863851,
						1.294245
					],
					[
						103.863892,
						1.294104
					],
					[
						103.863969,
						1.293246
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "ru-2014",
				Location: "Sochi",
				Name: "Sochi Autodrom",
				opened: 2014,
				firstgp: 2014,
				length: 5848,
				altitude: 23
			},
			bbox: [
				39.947309,
				43.402181,
				39.97015,
				43.41273
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						39.968066,
						43.409699
					],
					[
						39.966723,
						43.408191
					],
					[
						39.966421,
						43.407965
					],
					[
						39.966007,
						43.407734
					],
					[
						39.965551,
						43.407555
					],
					[
						39.9649,
						43.407408
					],
					[
						39.963177,
						43.407074
					],
					[
						39.96062,
						43.406574
					],
					[
						39.957886,
						43.406046
					],
					[
						39.957708,
						43.40606
					],
					[
						39.957643,
						43.406098
					],
					[
						39.957602,
						43.406221
					],
					[
						39.957531,
						43.406395
					],
					[
						39.957418,
						43.406522
					],
					[
						39.956181,
						43.407399
					],
					[
						39.955737,
						43.407635
					],
					[
						39.955187,
						43.407795
					],
					[
						39.954524,
						43.407837
					],
					[
						39.953879,
						43.407743
					],
					[
						39.953334,
						43.407536
					],
					[
						39.952908,
						43.407248
					],
					[
						39.952648,
						43.406965
					],
					[
						39.95244,
						43.406621
					],
					[
						39.952363,
						43.406249
					],
					[
						39.952399,
						43.405834
					],
					[
						39.952547,
						43.405481
					],
					[
						39.953316,
						43.404321
					],
					[
						39.953334,
						43.404189
					],
					[
						39.953263,
						43.404085
					],
					[
						39.953086,
						43.403991
					],
					[
						39.948996,
						43.402223
					],
					[
						39.948871,
						43.402186
					],
					[
						39.948676,
						43.402181
					],
					[
						39.948534,
						43.402242
					],
					[
						39.948439,
						43.402332
					],
					[
						39.947427,
						43.403977
					],
					[
						39.947332,
						43.404255
					],
					[
						39.947309,
						43.404481
					],
					[
						39.947338,
						43.404731
					],
					[
						39.947599,
						43.405688
					],
					[
						39.947646,
						43.405768
					],
					[
						39.947747,
						43.405806
					],
					[
						39.947877,
						43.405834
					],
					[
						39.951209,
						43.406197
					],
					[
						39.951292,
						43.406221
					],
					[
						39.951369,
						43.406268
					],
					[
						39.951428,
						43.406329
					],
					[
						39.951635,
						43.406928
					],
					[
						39.951653,
						43.407017
					],
					[
						39.951665,
						43.40713
					],
					[
						39.951647,
						43.407229
					],
					[
						39.950612,
						43.409346
					],
					[
						39.950612,
						43.409431
					],
					[
						39.950653,
						43.409506
					],
					[
						39.95073,
						43.409581
					],
					[
						39.950842,
						43.409638
					],
					[
						39.951884,
						43.409944
					],
					[
						39.952363,
						43.410025
					],
					[
						39.952813,
						43.410086
					],
					[
						39.953429,
						43.410119
					],
					[
						39.953973,
						43.410114
					],
					[
						39.954595,
						43.410067
					],
					[
						39.955181,
						43.409987
					],
					[
						39.956211,
						43.409864
					],
					[
						39.956761,
						43.409761
					],
					[
						39.957324,
						43.409614
					],
					[
						39.957933,
						43.409435
					],
					[
						39.960028,
						43.408742
					],
					[
						39.960603,
						43.408596
					],
					[
						39.961123,
						43.408516
					],
					[
						39.961703,
						43.408478
					],
					[
						39.962301,
						43.408497
					],
					[
						39.962858,
						43.408573
					],
					[
						39.96371,
						43.408752
					],
					[
						39.96387,
						43.408724
					],
					[
						39.963935,
						43.408648
					],
					[
						39.964201,
						43.407988
					],
					[
						39.964326,
						43.407894
					],
					[
						39.964539,
						43.407837
					],
					[
						39.964769,
						43.407847
					],
					[
						39.965101,
						43.407903
					],
					[
						39.965474,
						43.40804
					],
					[
						39.965805,
						43.408257
					],
					[
						39.966078,
						43.408535
					],
					[
						39.966681,
						43.409167
					],
					[
						39.966711,
						43.409242
					],
					[
						39.966699,
						43.409303
					],
					[
						39.966587,
						43.409369
					],
					[
						39.966036,
						43.409666
					],
					[
						39.965935,
						43.40977
					],
					[
						39.9659,
						43.409916
					],
					[
						39.965965,
						43.410048
					],
					[
						39.966841,
						43.411033
					],
					[
						39.967622,
						43.411962
					],
					[
						39.96825,
						43.412664
					],
					[
						39.968392,
						43.41273
					],
					[
						39.968569,
						43.412693
					],
					[
						39.969972,
						43.41224
					],
					[
						39.970102,
						43.412183
					],
					[
						39.97015,
						43.412099
					],
					[
						39.970114,
						43.412004
					],
					[
						39.968066,
						43.409699
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "jp-1962",
				Location: "Suzuka",
				Name: "Suzuka International Racing Course",
				opened: 1962,
				firstgp: 1987,
				length: 5807,
				altitude: 60
			},
			bbox: [
				136.521946,
				34.838956,
				136.543438,
				34.848374
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						136.540283,
						34.843344
					],
					[
						136.541609,
						34.842034
					],
					[
						136.54316,
						34.840474
					],
					[
						136.543302,
						34.840309
					],
					[
						136.543396,
						34.840163
					],
					[
						136.543432,
						34.840026
					],
					[
						136.543438,
						34.839899
					],
					[
						136.543426,
						34.839771
					],
					[
						136.543248,
						34.839258
					],
					[
						136.543166,
						34.839149
					],
					[
						136.543059,
						34.83906
					],
					[
						136.542899,
						34.838994
					],
					[
						136.54271,
						34.838956
					],
					[
						136.542538,
						34.838961
					],
					[
						136.542349,
						34.839013
					],
					[
						136.542195,
						34.839097
					],
					[
						136.542071,
						34.839211
					],
					[
						136.5411,
						34.840455
					],
					[
						136.540946,
						34.840577
					],
					[
						136.540757,
						34.840662
					],
					[
						136.540567,
						34.8407
					],
					[
						136.540153,
						34.8407
					],
					[
						136.539922,
						34.840738
					],
					[
						136.539733,
						34.840832
					],
					[
						136.539585,
						34.840945
					],
					[
						136.539466,
						34.841101
					],
					[
						136.539253,
						34.841765
					],
					[
						136.539164,
						34.841935
					],
					[
						136.539022,
						34.842081
					],
					[
						136.538857,
						34.84218
					],
					[
						136.538649,
						34.84226
					],
					[
						136.538436,
						34.842293
					],
					[
						136.537921,
						34.842307
					],
					[
						136.537714,
						34.842331
					],
					[
						136.537537,
						34.842397
					],
					[
						136.537359,
						34.842501
					],
					[
						136.537205,
						34.842642
					],
					[
						136.537093,
						34.842812
					],
					[
						136.537045,
						34.842972
					],
					[
						136.537039,
						34.843109
					],
					[
						136.537075,
						34.843231
					],
					[
						136.537341,
						34.843839
					],
					[
						136.537371,
						34.843934
					],
					[
						136.537389,
						34.844089
					],
					[
						136.537353,
						34.844264
					],
					[
						136.537282,
						34.844419
					],
					[
						136.537176,
						34.844551
					],
					[
						136.537034,
						34.84466
					],
					[
						136.53685,
						34.844749
					],
					[
						136.536501,
						34.844895
					],
					[
						136.536175,
						34.844985
					],
					[
						136.53585,
						34.845046
					],
					[
						136.535506,
						34.84506
					],
					[
						136.535211,
						34.845051
					],
					[
						136.535021,
						34.845018
					],
					[
						136.534802,
						34.844961
					],
					[
						136.534548,
						34.844872
					],
					[
						136.534281,
						34.844749
					],
					[
						136.533997,
						34.844579
					],
					[
						136.53376,
						34.844377
					],
					[
						136.532725,
						34.84333
					],
					[
						136.53263,
						34.843264
					],
					[
						136.532512,
						34.843241
					],
					[
						136.531038,
						34.843132
					],
					[
						136.530943,
						34.843142
					],
					[
						136.530842,
						34.843198
					],
					[
						136.530801,
						34.843293
					],
					[
						136.530783,
						34.843373
					],
					[
						136.530227,
						34.845621
					],
					[
						136.530203,
						34.845748
					],
					[
						136.530191,
						34.84588
					],
					[
						136.530203,
						34.846017
					],
					[
						136.530239,
						34.846159
					],
					[
						136.530304,
						34.846305
					],
					[
						136.530381,
						34.846446
					],
					[
						136.530635,
						34.846922
					],
					[
						136.530665,
						34.846983
					],
					[
						136.530665,
						34.847045
					],
					[
						136.530647,
						34.847111
					],
					[
						136.530546,
						34.847196
					],
					[
						136.530416,
						34.847214
					],
					[
						136.530304,
						34.847186
					],
					[
						136.530209,
						34.847111
					],
					[
						136.529522,
						34.846196
					],
					[
						136.529369,
						34.846022
					],
					[
						136.529209,
						34.845866
					],
					[
						136.529055,
						34.845739
					],
					[
						136.52883,
						34.845593
					],
					[
						136.528593,
						34.845489
					],
					[
						136.528345,
						34.845428
					],
					[
						136.527913,
						34.845376
					],
					[
						136.527504,
						34.845362
					],
					[
						136.527196,
						34.845381
					],
					[
						136.526829,
						34.845447
					],
					[
						136.526522,
						34.845513
					],
					[
						136.525977,
						34.845678
					],
					[
						136.525693,
						34.845786
					],
					[
						136.525444,
						34.845909
					],
					[
						136.525214,
						34.84605
					],
					[
						136.524971,
						34.846229
					],
					[
						136.524781,
						34.846408
					],
					[
						136.524616,
						34.846611
					],
					[
						136.524456,
						34.846851
					],
					[
						136.52384,
						34.84803
					],
					[
						136.52374,
						34.848171
					],
					[
						136.523604,
						34.848275
					],
					[
						136.523426,
						34.848341
					],
					[
						136.523213,
						34.848374
					],
					[
						136.522958,
						34.848369
					],
					[
						136.522722,
						34.848341
					],
					[
						136.522491,
						34.848299
					],
					[
						136.522266,
						34.848223
					],
					[
						136.522124,
						34.848129
					],
					[
						136.522023,
						34.848006
					],
					[
						136.521958,
						34.847874
					],
					[
						136.521946,
						34.847738
					],
					[
						136.521976,
						34.847577
					],
					[
						136.522053,
						34.847422
					],
					[
						136.522189,
						34.847257
					],
					[
						136.522331,
						34.847125
					],
					[
						136.522609,
						34.846922
					],
					[
						136.523047,
						34.846639
					],
					[
						136.523385,
						34.846437
					],
					[
						136.523704,
						34.846258
					],
					[
						136.524237,
						34.845994
					],
					[
						136.524817,
						34.84573
					],
					[
						136.525314,
						34.845536
					],
					[
						136.525817,
						34.845367
					],
					[
						136.530138,
						34.844118
					],
					[
						136.530842,
						34.84391
					],
					[
						136.531044,
						34.843868
					],
					[
						136.531245,
						34.843863
					],
					[
						136.531458,
						34.843896
					],
					[
						136.531665,
						34.843943
					],
					[
						136.532038,
						34.844061
					],
					[
						136.532381,
						34.844202
					],
					[
						136.532695,
						34.844372
					],
					[
						136.532985,
						34.844561
					],
					[
						136.533524,
						34.844966
					],
					[
						136.534287,
						34.84555
					],
					[
						136.53453,
						34.845725
					],
					[
						136.534684,
						34.845814
					],
					[
						136.534802,
						34.845871
					],
					[
						136.534915,
						34.845904
					],
					[
						136.535009,
						34.845876
					],
					[
						136.535181,
						34.845758
					],
					[
						136.535305,
						34.845673
					],
					[
						136.535406,
						34.845649
					],
					[
						136.535501,
						34.845664
					],
					[
						136.535613,
						34.845725
					],
					[
						136.535797,
						34.845862
					],
					[
						136.536004,
						34.845984
					],
					[
						136.536235,
						34.846064
					],
					[
						136.536442,
						34.846093
					],
					[
						136.536744,
						34.846088
					],
					[
						136.537028,
						34.84605
					],
					[
						136.5373,
						34.84597
					],
					[
						136.537572,
						34.845843
					],
					[
						136.537868,
						34.845678
					],
					[
						136.538134,
						34.845475
					],
					[
						136.538407,
						34.845225
					],
					[
						136.540283,
						34.843344
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "us-2012",
				Location: "Austin",
				Name: "Circuit of the Americas",
				opened: 2012,
				firstgp: 2012,
				length: 5513,
				altitude: 130
			},
			bbox: [
				-97.643463,
				30.130031,
				-97.624458,
				30.139453
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-97.639651,
						30.13176
					],
					[
						-97.637935,
						30.130577
					],
					[
						-97.637461,
						30.13029
					],
					[
						-97.637094,
						30.130101
					],
					[
						-97.636958,
						30.130045
					],
					[
						-97.636905,
						30.130031
					],
					[
						-97.636846,
						30.13004
					],
					[
						-97.636793,
						30.130068
					],
					[
						-97.636757,
						30.130115
					],
					[
						-97.636739,
						30.130158
					],
					[
						-97.636745,
						30.13021
					],
					[
						-97.637118,
						30.131138
					],
					[
						-97.637284,
						30.131567
					],
					[
						-97.637313,
						30.131699
					],
					[
						-97.637319,
						30.131812
					],
					[
						-97.637313,
						30.131944
					],
					[
						-97.637284,
						30.132067
					],
					[
						-97.637231,
						30.132222
					],
					[
						-97.637148,
						30.132354
					],
					[
						-97.637059,
						30.132472
					],
					[
						-97.636935,
						30.132595
					],
					[
						-97.636799,
						30.13268
					],
					[
						-97.636615,
						30.132779
					],
					[
						-97.635615,
						30.133316
					],
					[
						-97.635206,
						30.133538
					],
					[
						-97.635118,
						30.133613
					],
					[
						-97.635041,
						30.133703
					],
					[
						-97.634976,
						30.133778
					],
					[
						-97.634922,
						30.133882
					],
					[
						-97.634881,
						30.133971
					],
					[
						-97.634774,
						30.13423
					],
					[
						-97.634703,
						30.134315
					],
					[
						-97.634614,
						30.134414
					],
					[
						-97.634496,
						30.13448
					],
					[
						-97.634401,
						30.134523
					],
					[
						-97.634165,
						30.134603
					],
					[
						-97.633981,
						30.134683
					],
					[
						-97.633875,
						30.134754
					],
					[
						-97.633809,
						30.134824
					],
					[
						-97.63375,
						30.134919
					],
					[
						-97.633727,
						30.135032
					],
					[
						-97.633691,
						30.135225
					],
					[
						-97.633673,
						30.135348
					],
					[
						-97.633638,
						30.135484
					],
					[
						-97.63359,
						30.135583
					],
					[
						-97.633531,
						30.135678
					],
					[
						-97.633454,
						30.135772
					],
					[
						-97.633371,
						30.135857
					],
					[
						-97.633247,
						30.135951
					],
					[
						-97.633105,
						30.136041
					],
					[
						-97.632951,
						30.136116
					],
					[
						-97.632786,
						30.136177
					],
					[
						-97.632643,
						30.136206
					],
					[
						-97.632525,
						30.13621
					],
					[
						-97.63243,
						30.136206
					],
					[
						-97.632276,
						30.136168
					],
					[
						-97.631294,
						30.135777
					],
					[
						-97.631199,
						30.135744
					],
					[
						-97.631099,
						30.135744
					],
					[
						-97.631022,
						30.135772
					],
					[
						-97.630826,
						30.135876
					],
					[
						-97.630596,
						30.136036
					],
					[
						-97.63043,
						30.136182
					],
					[
						-97.630264,
						30.136375
					],
					[
						-97.63014,
						30.136502
					],
					[
						-97.630027,
						30.136578
					],
					[
						-97.629903,
						30.136625
					],
					[
						-97.629808,
						30.136644
					],
					[
						-97.629672,
						30.136644
					],
					[
						-97.629518,
						30.136606
					],
					[
						-97.6294,
						30.13655
					],
					[
						-97.629305,
						30.136469
					],
					[
						-97.629252,
						30.136413
					],
					[
						-97.629199,
						30.136342
					],
					[
						-97.629151,
						30.136262
					],
					[
						-97.62908,
						30.136196
					],
					[
						-97.628997,
						30.136168
					],
					[
						-97.628915,
						30.136168
					],
					[
						-97.627145,
						30.136507
					],
					[
						-97.627032,
						30.13654
					],
					[
						-97.626961,
						30.136573
					],
					[
						-97.626908,
						30.136616
					],
					[
						-97.625872,
						30.137704
					],
					[
						-97.624961,
						30.138657
					],
					[
						-97.624612,
						30.139043
					],
					[
						-97.624469,
						30.139269
					],
					[
						-97.624458,
						30.139326
					],
					[
						-97.624475,
						30.139378
					],
					[
						-97.624517,
						30.139406
					],
					[
						-97.62457,
						30.139439
					],
					[
						-97.624629,
						30.139453
					],
					[
						-97.624694,
						30.139449
					],
					[
						-97.624783,
						30.13943
					],
					[
						-97.626677,
						30.138906
					],
					[
						-97.627997,
						30.138586
					],
					[
						-97.629453,
						30.13828
					],
					[
						-97.631193,
						30.137978
					],
					[
						-97.632282,
						30.137822
					],
					[
						-97.633289,
						30.137695
					],
					[
						-97.636254,
						30.137412
					],
					[
						-97.636585,
						30.13736
					],
					[
						-97.636627,
						30.137337
					],
					[
						-97.636645,
						30.13729
					],
					[
						-97.636639,
						30.137252
					],
					[
						-97.636597,
						30.1372
					],
					[
						-97.636402,
						30.137012
					],
					[
						-97.635727,
						30.13621
					],
					[
						-97.635431,
						30.135795
					],
					[
						-97.635413,
						30.135734
					],
					[
						-97.635431,
						30.135645
					],
					[
						-97.635473,
						30.135583
					],
					[
						-97.63555,
						30.135536
					],
					[
						-97.635615,
						30.135522
					],
					[
						-97.635739,
						30.135508
					],
					[
						-97.636289,
						30.135546
					],
					[
						-97.636343,
						30.135569
					],
					[
						-97.63639,
						30.135607
					],
					[
						-97.636437,
						30.135654
					],
					[
						-97.636479,
						30.13572
					],
					[
						-97.636591,
						30.135984
					],
					[
						-97.636639,
						30.136088
					],
					[
						-97.636716,
						30.136182
					],
					[
						-97.637077,
						30.136502
					],
					[
						-97.63713,
						30.13654
					],
					[
						-97.637195,
						30.136564
					],
					[
						-97.63726,
						30.136573
					],
					[
						-97.637615,
						30.136601
					],
					[
						-97.637686,
						30.136597
					],
					[
						-97.637728,
						30.136573
					],
					[
						-97.637769,
						30.136531
					],
					[
						-97.637787,
						30.136474
					],
					[
						-97.637763,
						30.136408
					],
					[
						-97.637077,
						30.135385
					],
					[
						-97.636799,
						30.134933
					],
					[
						-97.636775,
						30.13481
					],
					[
						-97.636781,
						30.134688
					],
					[
						-97.636804,
						30.134589
					],
					[
						-97.636834,
						30.13449
					],
					[
						-97.636911,
						30.134306
					],
					[
						-97.637018,
						30.134103
					],
					[
						-97.637089,
						30.134023
					],
					[
						-97.637207,
						30.133948
					],
					[
						-97.637343,
						30.133891
					],
					[
						-97.637905,
						30.13367
					],
					[
						-97.638018,
						30.133646
					],
					[
						-97.63813,
						30.133641
					],
					[
						-97.638337,
						30.133655
					],
					[
						-97.638533,
						30.133679
					],
					[
						-97.638722,
						30.133731
					],
					[
						-97.638929,
						30.133802
					],
					[
						-97.639113,
						30.133896
					],
					[
						-97.639237,
						30.133976
					],
					[
						-97.63932,
						30.134098
					],
					[
						-97.639965,
						30.134881
					],
					[
						-97.640468,
						30.135428
					],
					[
						-97.640533,
						30.135484
					],
					[
						-97.64061,
						30.135513
					],
					[
						-97.640711,
						30.135531
					],
					[
						-97.6408,
						30.135527
					],
					[
						-97.640924,
						30.135498
					],
					[
						-97.641072,
						30.135456
					],
					[
						-97.641196,
						30.135414
					],
					[
						-97.643274,
						30.134626
					],
					[
						-97.643392,
						30.134556
					],
					[
						-97.643439,
						30.13449
					],
					[
						-97.643463,
						30.134419
					],
					[
						-97.643439,
						30.134367
					],
					[
						-97.643392,
						30.13432
					],
					[
						-97.643333,
						30.134273
					],
					[
						-97.642244,
						30.133514
					],
					[
						-97.639651,
						30.13176
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "mx-1962",
				Location: "Mexico City",
				Name: "Autódromo Hermanos Rodríguez",
				opened: 1962,
				firstgp: 1963,
				length: 4304,
				altitude: 2232
			},
			bbox: [
				-99.09685,
				19.397044,
				-99.083095,
				19.40641
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-99.094338,
						19.406226
					],
					[
						-99.090925,
						19.405779
					],
					[
						-99.089818,
						19.405642
					],
					[
						-99.088652,
						19.405543
					],
					[
						-99.08809,
						19.405477
					],
					[
						-99.08664,
						19.405284
					],
					[
						-99.084113,
						19.40493
					],
					[
						-99.083592,
						19.404831
					],
					[
						-99.083503,
						19.404798
					],
					[
						-99.083456,
						19.40476
					],
					[
						-99.083432,
						19.404699
					],
					[
						-99.083426,
						19.404643
					],
					[
						-99.083521,
						19.404053
					],
					[
						-99.083509,
						19.404001
					],
					[
						-99.083479,
						19.403954
					],
					[
						-99.083213,
						19.403818
					],
					[
						-99.083136,
						19.40378
					],
					[
						-99.083095,
						19.403719
					],
					[
						-99.083095,
						19.403662
					],
					[
						-99.083148,
						19.403294
					],
					[
						-99.083231,
						19.402964
					],
					[
						-99.083361,
						19.402644
					],
					[
						-99.083509,
						19.402356
					],
					[
						-99.084669,
						19.400499
					],
					[
						-99.08606,
						19.398439
					],
					[
						-99.086149,
						19.398298
					],
					[
						-99.086161,
						19.398213
					],
					[
						-99.086143,
						19.398142
					],
					[
						-99.086101,
						19.39809
					],
					[
						-99.085687,
						19.39785
					],
					[
						-99.085646,
						19.397812
					],
					[
						-99.08564,
						19.397751
					],
					[
						-99.085669,
						19.397699
					],
					[
						-99.08574,
						19.397638
					],
					[
						-99.086516,
						19.397086
					],
					[
						-99.086593,
						19.397053
					],
					[
						-99.086658,
						19.397044
					],
					[
						-99.086717,
						19.397063
					],
					[
						-99.086859,
						19.397148
					],
					[
						-99.086883,
						19.397204
					],
					[
						-99.086883,
						19.397317
					],
					[
						-99.086528,
						19.399929
					],
					[
						-99.086533,
						19.400009
					],
					[
						-99.086569,
						19.400084
					],
					[
						-99.086622,
						19.400146
					],
					[
						-99.086705,
						19.400202
					],
					[
						-99.087119,
						19.400443
					],
					[
						-99.087267,
						19.40057
					],
					[
						-99.087356,
						19.400655
					],
					[
						-99.087445,
						19.400815
					],
					[
						-99.08754,
						19.401051
					],
					[
						-99.087634,
						19.401192
					],
					[
						-99.087741,
						19.401291
					],
					[
						-99.087859,
						19.401362
					],
					[
						-99.088019,
						19.401428
					],
					[
						-99.089298,
						19.401612
					],
					[
						-99.08944,
						19.401654
					],
					[
						-99.089528,
						19.401725
					],
					[
						-99.08957,
						19.401772
					],
					[
						-99.089605,
						19.401838
					],
					[
						-99.089771,
						19.402323
					],
					[
						-99.089824,
						19.402418
					],
					[
						-99.089907,
						19.402507
					],
					[
						-99.090114,
						19.402625
					],
					[
						-99.091061,
						19.403106
					],
					[
						-99.091334,
						19.403214
					],
					[
						-99.09173,
						19.403304
					],
					[
						-99.094903,
						19.403738
					],
					[
						-99.094968,
						19.403761
					],
					[
						-99.095003,
						19.403799
					],
					[
						-99.095033,
						19.40386
					],
					[
						-99.095039,
						19.40394
					],
					[
						-99.095092,
						19.404709
					],
					[
						-99.095157,
						19.405241
					],
					[
						-99.095181,
						19.405302
					],
					[
						-99.095228,
						19.405345
					],
					[
						-99.095293,
						19.405373
					],
					[
						-99.095376,
						19.405364
					],
					[
						-99.095465,
						19.405288
					],
					[
						-99.095578,
						19.405128
					],
					[
						-99.095643,
						19.405081
					],
					[
						-99.09572,
						19.405053
					],
					[
						-99.095808,
						19.405057
					],
					[
						-99.095909,
						19.4051
					],
					[
						-99.096027,
						19.405152
					],
					[
						-99.09614,
						19.405185
					],
					[
						-99.096678,
						19.405241
					],
					[
						-99.096767,
						19.405269
					],
					[
						-99.096809,
						19.405302
					],
					[
						-99.096844,
						19.405364
					],
					[
						-99.09685,
						19.405425
					],
					[
						-99.096815,
						19.405571
					],
					[
						-99.096738,
						19.405764
					],
					[
						-99.096637,
						19.405925
					],
					[
						-99.096489,
						19.406118
					],
					[
						-99.096317,
						19.40625
					],
					[
						-99.096098,
						19.406354
					],
					[
						-99.095897,
						19.406405
					],
					[
						-99.095702,
						19.40641
					],
					[
						-99.095418,
						19.406377
					],
					[
						-99.094338,
						19.406226
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "br-1940",
				Location: "Sao Paulo",
				Name: "Autódromo José Carlos Pace",
				opened: 1940,
				firstgp: 1972,
				length: 4309,
				altitude: 765
			},
			bbox: [
				-46.700609,
				-23.70644,
				-46.694051,
				-23.696984
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-46.69997,
						-23.703753
					],
					[
						-46.699384,
						-23.705804
					],
					[
						-46.699325,
						-23.705988
					],
					[
						-46.699242,
						-23.706153
					],
					[
						-46.699118,
						-23.706317
					],
					[
						-46.699005,
						-23.706402
					],
					[
						-46.698899,
						-23.70644
					],
					[
						-46.698798,
						-23.706431
					],
					[
						-46.698697,
						-23.706402
					],
					[
						-46.698626,
						-23.706355
					],
					[
						-46.698271,
						-23.706025
					],
					[
						-46.698188,
						-23.705997
					],
					[
						-46.698123,
						-23.705988
					],
					[
						-46.698035,
						-23.706006
					],
					[
						-46.697934,
						-23.706063
					],
					[
						-46.697632,
						-23.706237
					],
					[
						-46.697443,
						-23.706303
					],
					[
						-46.697265,
						-23.706332
					],
					[
						-46.697082,
						-23.706336
					],
					[
						-46.696892,
						-23.706327
					],
					[
						-46.696709,
						-23.706299
					],
					[
						-46.696543,
						-23.706256
					],
					[
						-46.696371,
						-23.70619
					],
					[
						-46.696164,
						-23.706063
					],
					[
						-46.696028,
						-23.70595
					],
					[
						-46.69591,
						-23.705813
					],
					[
						-46.695797,
						-23.705658
					],
					[
						-46.695714,
						-23.705526
					],
					[
						-46.695661,
						-23.705389
					],
					[
						-46.69485,
						-23.702594
					],
					[
						-46.694116,
						-23.700142
					],
					[
						-46.694069,
						-23.699982
					],
					[
						-46.694051,
						-23.699864
					],
					[
						-46.694063,
						-23.69977
					],
					[
						-46.694116,
						-23.699685
					],
					[
						-46.694181,
						-23.69961
					],
					[
						-46.694246,
						-23.699572
					],
					[
						-46.694323,
						-23.699534
					],
					[
						-46.694531,
						-23.699473
					],
					[
						-46.695128,
						-23.699379
					],
					[
						-46.695306,
						-23.699369
					],
					[
						-46.695495,
						-23.69936
					],
					[
						-46.695626,
						-23.699379
					],
					[
						-46.695768,
						-23.699412
					],
					[
						-46.695916,
						-23.699464
					],
					[
						-46.696046,
						-23.699534
					],
					[
						-46.696194,
						-23.699633
					],
					[
						-46.69633,
						-23.699761
					],
					[
						-46.69649,
						-23.699945
					],
					[
						-46.698165,
						-23.702066
					],
					[
						-46.698319,
						-23.702221
					],
					[
						-46.698461,
						-23.702339
					],
					[
						-46.698591,
						-23.7024
					],
					[
						-46.698733,
						-23.702429
					],
					[
						-46.698911,
						-23.702433
					],
					[
						-46.699088,
						-23.7024
					],
					[
						-46.699218,
						-23.702377
					],
					[
						-46.699354,
						-23.702339
					],
					[
						-46.69952,
						-23.702245
					],
					[
						-46.699639,
						-23.70216
					],
					[
						-46.699715,
						-23.702066
					],
					[
						-46.699763,
						-23.701962
					],
					[
						-46.69981,
						-23.701863
					],
					[
						-46.699852,
						-23.701726
					],
					[
						-46.699994,
						-23.700996
					],
					[
						-46.700006,
						-23.700746
					],
					[
						-46.699982,
						-23.700656
					],
					[
						-46.699946,
						-23.700586
					],
					[
						-46.699893,
						-23.700529
					],
					[
						-46.699834,
						-23.70051
					],
					[
						-46.699781,
						-23.700496
					],
					[
						-46.699704,
						-23.700496
					],
					[
						-46.699621,
						-23.700515
					],
					[
						-46.699538,
						-23.700548
					],
					[
						-46.69936,
						-23.700666
					],
					[
						-46.69923,
						-23.700746
					],
					[
						-46.699147,
						-23.700774
					],
					[
						-46.699041,
						-23.700788
					],
					[
						-46.698946,
						-23.700784
					],
					[
						-46.698869,
						-23.700765
					],
					[
						-46.698763,
						-23.700718
					],
					[
						-46.698692,
						-23.700656
					],
					[
						-46.698632,
						-23.700571
					],
					[
						-46.698597,
						-23.700477
					],
					[
						-46.698585,
						-23.700369
					],
					[
						-46.698597,
						-23.700284
					],
					[
						-46.698644,
						-23.700204
					],
					[
						-46.698709,
						-23.700138
					],
					[
						-46.698816,
						-23.700034
					],
					[
						-46.699278,
						-23.699615
					],
					[
						-46.699402,
						-23.699454
					],
					[
						-46.699467,
						-23.699308
					],
					[
						-46.699526,
						-23.699171
					],
					[
						-46.699585,
						-23.698964
					],
					[
						-46.69965,
						-23.698677
					],
					[
						-46.69965,
						-23.698587
					],
					[
						-46.699633,
						-23.698516
					],
					[
						-46.699591,
						-23.69846
					],
					[
						-46.699538,
						-23.698417
					],
					[
						-46.699479,
						-23.698398
					],
					[
						-46.699402,
						-23.698389
					],
					[
						-46.699343,
						-23.698403
					],
					[
						-46.699289,
						-23.698431
					],
					[
						-46.699224,
						-23.698479
					],
					[
						-46.698644,
						-23.699068
					],
					[
						-46.698508,
						-23.699181
					],
					[
						-46.69839,
						-23.699256
					],
					[
						-46.698265,
						-23.699322
					],
					[
						-46.698153,
						-23.69936
					],
					[
						-46.698005,
						-23.699384
					],
					[
						-46.697839,
						-23.699388
					],
					[
						-46.697662,
						-23.699365
					],
					[
						-46.697502,
						-23.699308
					],
					[
						-46.697372,
						-23.699237
					],
					[
						-46.697241,
						-23.699153
					],
					[
						-46.697111,
						-23.699021
					],
					[
						-46.697016,
						-23.698898
					],
					[
						-46.696194,
						-23.697691
					],
					[
						-46.696146,
						-23.697616
					],
					[
						-46.696129,
						-23.697545
					],
					[
						-46.69614,
						-23.697479
					],
					[
						-46.696176,
						-23.697423
					],
					[
						-46.696241,
						-23.697361
					],
					[
						-46.696318,
						-23.69731
					],
					[
						-46.696401,
						-23.697267
					],
					[
						-46.696502,
						-23.697225
					],
					[
						-46.697093,
						-23.697036
					],
					[
						-46.697212,
						-23.697008
					],
					[
						-46.69733,
						-23.696989
					],
					[
						-46.697454,
						-23.696984
					],
					[
						-46.697573,
						-23.696998
					],
					[
						-46.698088,
						-23.697088
					],
					[
						-46.698289,
						-23.69713
					],
					[
						-46.698484,
						-23.697196
					],
					[
						-46.698774,
						-23.697305
					],
					[
						-46.699147,
						-23.697474
					],
					[
						-46.699301,
						-23.697555
					],
					[
						-46.699461,
						-23.697658
					],
					[
						-46.699597,
						-23.697781
					],
					[
						-46.699721,
						-23.697913
					],
					[
						-46.699828,
						-23.698073
					],
					[
						-46.699905,
						-23.698219
					],
					[
						-46.699988,
						-23.698422
					],
					[
						-46.700071,
						-23.69871
					],
					[
						-46.700515,
						-23.700397
					],
					[
						-46.700556,
						-23.700595
					],
					[
						-46.700591,
						-23.700845
					],
					[
						-46.700609,
						-23.70109
					],
					[
						-46.700603,
						-23.701326
					],
					[
						-46.700574,
						-23.701538
					],
					[
						-46.70052,
						-23.701731
					],
					[
						-46.700118,
						-23.703192
					],
					[
						-46.69997,
						-23.703753
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "ae-2009",
				Location: "Abu Dhabi",
				Name: "Yas Marina Circuit",
				opened: 2009,
				firstgp: 2009,
				length: 5554,
				altitude: 9
			},
			bbox: [
				54.601568,
				24.463041,
				54.609783,
				24.479015
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						54.605463,
						24.46997
					],
					[
						54.60783,
						24.470262
					],
					[
						54.607955,
						24.4703
					],
					[
						54.608049,
						24.470389
					],
					[
						54.608114,
						24.470512
					],
					[
						54.608126,
						24.470634
					],
					[
						54.608091,
						24.470762
					],
					[
						54.607712,
						24.472228
					],
					[
						54.607647,
						24.472388
					],
					[
						54.607558,
						24.472506
					],
					[
						54.60741,
						24.472619
					],
					[
						54.607286,
						24.472675
					],
					[
						54.606593,
						24.472892
					],
					[
						54.606392,
						24.472968
					],
					[
						54.606226,
						24.473071
					],
					[
						54.605989,
						24.473265
					],
					[
						54.605871,
						24.473392
					],
					[
						54.60577,
						24.473585
					],
					[
						54.605717,
						24.473797
					],
					[
						54.605717,
						24.474038
					],
					[
						54.605747,
						24.474198
					],
					[
						54.605806,
						24.474396
					],
					[
						54.606001,
						24.475098
					],
					[
						54.606043,
						24.475376
					],
					[
						54.606049,
						24.475697
					],
					[
						54.606025,
						24.476013
					],
					[
						54.605841,
						24.477535
					],
					[
						54.605824,
						24.477611
					],
					[
						54.605753,
						24.477639
					],
					[
						54.605427,
						24.477696
					],
					[
						54.605338,
						24.477752
					],
					[
						54.605303,
						24.477846
					],
					[
						54.605315,
						24.477912
					],
					[
						54.605327,
						24.477969
					],
					[
						54.605652,
						24.478756
					],
					[
						54.605682,
						24.478841
					],
					[
						54.605658,
						24.478916
					],
					[
						54.605622,
						24.478949
					],
					[
						54.605563,
						24.478997
					],
					[
						54.605451,
						24.479015
					],
					[
						54.60535,
						24.478982
					],
					[
						54.605285,
						24.478907
					],
					[
						54.603563,
						24.474212
					],
					[
						54.602764,
						24.472082
					],
					[
						54.602379,
						24.470837
					],
					[
						54.60203,
						24.469838
					],
					[
						54.601627,
						24.46873
					],
					[
						54.60158,
						24.468622
					],
					[
						54.601568,
						24.468541
					],
					[
						54.60158,
						24.468494
					],
					[
						54.601615,
						24.468452
					],
					[
						54.601746,
						24.468443
					],
					[
						54.602148,
						24.46849
					],
					[
						54.602207,
						24.468471
					],
					[
						54.602249,
						24.468433
					],
					[
						54.602438,
						24.467726
					],
					[
						54.602598,
						24.467311
					],
					[
						54.602693,
						24.467137
					],
					[
						54.602805,
						24.466948
					],
					[
						54.603036,
						24.466665
					],
					[
						54.60335,
						24.466321
					],
					[
						54.603651,
						24.46609
					],
					[
						54.605403,
						24.464822
					],
					[
						54.605806,
						24.46454
					],
					[
						54.606279,
						24.464247
					],
					[
						54.606806,
						24.46396
					],
					[
						54.607807,
						24.463535
					],
					[
						54.608973,
						24.463055
					],
					[
						54.609061,
						24.463041
					],
					[
						54.60915,
						24.463088
					],
					[
						54.609192,
						24.463187
					],
					[
						54.609274,
						24.463493
					],
					[
						54.609316,
						24.463568
					],
					[
						54.609369,
						24.463611
					],
					[
						54.609434,
						24.463634
					],
					[
						54.609665,
						24.463649
					],
					[
						54.609736,
						24.463696
					],
					[
						54.609778,
						24.463757
					],
					[
						54.609783,
						24.464257
					],
					[
						54.60976,
						24.464869
					],
					[
						54.609724,
						24.46494
					],
					[
						54.609624,
						24.464997
					],
					[
						54.609547,
						24.465001
					],
					[
						54.607055,
						24.464672
					],
					[
						54.606907,
						24.464672
					],
					[
						54.6068,
						24.46469
					],
					[
						54.606688,
						24.464737
					],
					[
						54.605717,
						24.465308
					],
					[
						54.605599,
						24.465435
					],
					[
						54.60554,
						24.465562
					],
					[
						54.605498,
						24.465685
					],
					[
						54.605327,
						24.466477
					],
					[
						54.605344,
						24.466557
					],
					[
						54.605427,
						24.466599
					],
					[
						54.605492,
						24.466623
					],
					[
						54.606303,
						24.466713
					],
					[
						54.606422,
						24.466746
					],
					[
						54.606469,
						24.466793
					],
					[
						54.606504,
						24.466878
					],
					[
						54.606469,
						24.467783
					],
					[
						54.60641,
						24.467839
					],
					[
						54.606333,
						24.467877
					],
					[
						54.605889,
						24.467919
					],
					[
						54.605717,
						24.467929
					],
					[
						54.603723,
						24.46766
					],
					[
						54.603598,
						24.467665
					],
					[
						54.603474,
						24.467726
					],
					[
						54.603385,
						24.46783
					],
					[
						54.602693,
						24.468999
					],
					[
						54.602639,
						24.46915
					],
					[
						54.602616,
						24.469272
					],
					[
						54.602604,
						24.469423
					],
					[
						54.602628,
						24.469513
					],
					[
						54.602693,
						24.469569
					],
					[
						54.602758,
						24.469602
					],
					[
						54.602876,
						24.469621
					],
					[
						54.605463,
						24.46997
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "it-1953",
				Location: "Imola",
				Name: "Autodromo Enzo e Dino Ferrari",
				opened: 1953,
				firstgp: 1980,
				length: 4909,
				altitude: 47
			},
			bbox: [
				11.702032,
				44.336508,
				11.725155,
				44.345054
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						11.716701,
						44.344056
					],
					[
						11.716291,
						44.34406
					],
					[
						11.713733,
						44.344453
					],
					[
						11.71282,
						44.344522
					],
					[
						11.712288,
						44.344526
					],
					[
						11.709619,
						44.344355
					],
					[
						11.708308,
						44.344133
					],
					[
						11.708145,
						44.344056
					],
					[
						11.708067,
						44.343987
					],
					[
						11.708044,
						44.343923
					],
					[
						11.707948,
						44.343624
					],
					[
						11.707877,
						44.343529
					],
					[
						11.707714,
						44.343448
					],
					[
						11.706508,
						44.343009
					],
					[
						11.706328,
						44.342865
					],
					[
						11.704382,
						44.339415
					],
					[
						11.704359,
						44.339323
					],
					[
						11.704362,
						44.339211
					],
					[
						11.704568,
						44.338675
					],
					[
						11.704568,
						44.33859
					],
					[
						11.704501,
						44.338486
					],
					[
						11.704426,
						44.338415
					],
					[
						11.702122,
						44.337005
					],
					[
						11.702056,
						44.336924
					],
					[
						11.702032,
						44.336828
					],
					[
						11.702061,
						44.336725
					],
					[
						11.702146,
						44.336602
					],
					[
						11.702256,
						44.336535
					],
					[
						11.702381,
						44.336508
					],
					[
						11.702573,
						44.33651
					],
					[
						11.706288,
						44.336855
					],
					[
						11.706711,
						44.336876
					],
					[
						11.707336,
						44.336851
					],
					[
						11.707789,
						44.336804
					],
					[
						11.708406,
						44.33672
					],
					[
						11.709039,
						44.336637
					],
					[
						11.709367,
						44.336591
					],
					[
						11.709574,
						44.336621
					],
					[
						11.709731,
						44.336677
					],
					[
						11.709934,
						44.336818
					],
					[
						11.710138,
						44.337082
					],
					[
						11.710451,
						44.337641
					],
					[
						11.710524,
						44.337886
					],
					[
						11.710547,
						44.338164
					],
					[
						11.710486,
						44.338447
					],
					[
						11.710033,
						44.339981
					],
					[
						11.710039,
						44.340077
					],
					[
						11.710103,
						44.340187
					],
					[
						11.710367,
						44.340484
					],
					[
						11.710712,
						44.340868
					],
					[
						11.710813,
						44.340905
					],
					[
						11.710947,
						44.340915
					],
					[
						11.71104,
						44.340886
					],
					[
						11.711551,
						44.340739
					],
					[
						11.711708,
						44.340724
					],
					[
						11.717065,
						44.340749
					],
					[
						11.717134,
						44.340728
					],
					[
						11.717201,
						44.340614
					],
					[
						11.717251,
						44.340514
					],
					[
						11.717309,
						44.340489
					],
					[
						11.717422,
						44.340487
					],
					[
						11.719561,
						44.341117
					],
					[
						11.719831,
						44.341225
					],
					[
						11.720722,
						44.341665
					],
					[
						11.721232,
						44.341997
					],
					[
						11.721726,
						44.342352
					],
					[
						11.722932,
						44.343198
					],
					[
						11.723176,
						44.343322
					],
					[
						11.723441,
						44.343415
					],
					[
						11.725019,
						44.343916
					],
					[
						11.725138,
						44.343999
					],
					[
						11.725155,
						44.34413
					],
					[
						11.725123,
						44.344234
					],
					[
						11.724647,
						44.344954
					],
					[
						11.724536,
						44.345022
					],
					[
						11.724414,
						44.345049
					],
					[
						11.724243,
						44.345054
					],
					[
						11.724106,
						44.345029
					],
					[
						11.721985,
						44.344453
					],
					[
						11.721232,
						44.344245
					],
					[
						11.720822,
						44.344139
					],
					[
						11.720465,
						44.344081
					],
					[
						11.720224,
						44.34405
					],
					[
						11.716701,
						44.344056
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "de-1927",
				Location: "Nürburg",
				Name: "Nürburgring",
				opened: 1927,
				firstgp: 1984,
				length: 5148,
				altitude: 627
			},
			bbox: [
				6.934135,
				50.323947,
				6.949985,
				50.337712
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						6.947632,
						50.335537
					],
					[
						6.943719,
						50.332988
					],
					[
						6.942907,
						50.332478
					],
					[
						6.942516,
						50.332285
					],
					[
						6.942135,
						50.332104
					],
					[
						6.941286,
						50.331732
					],
					[
						6.941108,
						50.331717
					],
					[
						6.940995,
						50.331756
					],
					[
						6.940938,
						50.331846
					],
					[
						6.940976,
						50.331975
					],
					[
						6.941093,
						50.33226
					],
					[
						6.941281,
						50.332509
					],
					[
						6.941654,
						50.332942
					],
					[
						6.941684,
						50.333045
					],
					[
						6.941675,
						50.333175
					],
					[
						6.941605,
						50.333317
					],
					[
						6.941453,
						50.333449
					],
					[
						6.941298,
						50.333536
					],
					[
						6.941111,
						50.333597
					],
					[
						6.940896,
						50.333625
					],
					[
						6.940748,
						50.333621
					],
					[
						6.939849,
						50.333536
					],
					[
						6.93944,
						50.333465
					],
					[
						6.939077,
						50.333391
					],
					[
						6.93881,
						50.333286
					],
					[
						6.938663,
						50.3332
					],
					[
						6.9386,
						50.333111
					],
					[
						6.938597,
						50.332978
					],
					[
						6.93864,
						50.332849
					],
					[
						6.93882,
						50.33274
					],
					[
						6.939061,
						50.332695
					],
					[
						6.939491,
						50.332709
					],
					[
						6.939728,
						50.332703
					],
					[
						6.939866,
						50.332661
					],
					[
						6.939997,
						50.332565
					],
					[
						6.940023,
						50.332453
					],
					[
						6.939988,
						50.332176
					],
					[
						6.939913,
						50.331765
					],
					[
						6.939732,
						50.331097
					],
					[
						6.939634,
						50.330758
					],
					[
						6.939545,
						50.330467
					],
					[
						6.939461,
						50.330271
					],
					[
						6.939108,
						50.32959
					],
					[
						6.938795,
						50.328934
					],
					[
						6.93869,
						50.328731
					],
					[
						6.938671,
						50.328629
					],
					[
						6.938659,
						50.328532
					],
					[
						6.938704,
						50.328405
					],
					[
						6.938776,
						50.328297
					],
					[
						6.938884,
						50.328187
					],
					[
						6.939042,
						50.32809
					],
					[
						6.939154,
						50.328044
					],
					[
						6.939627,
						50.3279
					],
					[
						6.940192,
						50.327734
					],
					[
						6.940356,
						50.327656
					],
					[
						6.940445,
						50.327566
					],
					[
						6.940487,
						50.327486
					],
					[
						6.940494,
						50.327389
					],
					[
						6.94048,
						50.327335
					],
					[
						6.940426,
						50.327215
					],
					[
						6.940248,
						50.327105
					],
					[
						6.939541,
						50.326866
					],
					[
						6.938607,
						50.326529
					],
					[
						6.938162,
						50.326343
					],
					[
						6.937717,
						50.326141
					],
					[
						6.937029,
						50.325742
					],
					[
						6.936664,
						50.325513
					],
					[
						6.936325,
						50.325246
					],
					[
						6.935997,
						50.324974
					],
					[
						6.935699,
						50.324692
					],
					[
						6.935158,
						50.324106
					],
					[
						6.934986,
						50.323994
					],
					[
						6.934792,
						50.323949
					],
					[
						6.934624,
						50.323947
					],
					[
						6.934439,
						50.323983
					],
					[
						6.934282,
						50.324058
					],
					[
						6.934174,
						50.324159
					],
					[
						6.934135,
						50.324278
					],
					[
						6.934139,
						50.324393
					],
					[
						6.934209,
						50.324508
					],
					[
						6.934495,
						50.324693
					],
					[
						6.936805,
						50.326167
					],
					[
						6.937077,
						50.326341
					],
					[
						6.93718,
						50.326443
					],
					[
						6.937276,
						50.326582
					],
					[
						6.937344,
						50.326745
					],
					[
						6.937358,
						50.326964
					],
					[
						6.937304,
						50.327159
					],
					[
						6.937145,
						50.327463
					],
					[
						6.937105,
						50.327619
					],
					[
						6.937105,
						50.327877
					],
					[
						6.937176,
						50.328086
					],
					[
						6.938193,
						50.330114
					],
					[
						6.938635,
						50.330998
					],
					[
						6.938785,
						50.331344
					],
					[
						6.938757,
						50.331459
					],
					[
						6.938647,
						50.331593
					],
					[
						6.938567,
						50.33165
					],
					[
						6.938462,
						50.331687
					],
					[
						6.936717,
						50.33218
					],
					[
						6.936517,
						50.33229
					],
					[
						6.936409,
						50.332399
					],
					[
						6.936348,
						50.332529
					],
					[
						6.936334,
						50.332709
					],
					[
						6.936377,
						50.332827
					],
					[
						6.936479,
						50.332958
					],
					[
						6.936718,
						50.333154
					],
					[
						6.938202,
						50.3343
					],
					[
						6.939672,
						50.335443
					],
					[
						6.939831,
						50.335524
					],
					[
						6.940034,
						50.335618
					],
					[
						6.940308,
						50.335701
					],
					[
						6.941366,
						50.335895
					],
					[
						6.946036,
						50.336678
					],
					[
						6.946094,
						50.336714
					],
					[
						6.946101,
						50.336772
					],
					[
						6.946059,
						50.336868
					],
					[
						6.94602,
						50.336984
					],
					[
						6.946052,
						50.337066
					],
					[
						6.946251,
						50.337141
					],
					[
						6.947042,
						50.337371
					],
					[
						6.947536,
						50.33746
					],
					[
						6.94923,
						50.337712
					],
					[
						6.949476,
						50.337712
					],
					[
						6.949701,
						50.337641
					],
					[
						6.949868,
						50.337524
					],
					[
						6.949952,
						50.337417
					],
					[
						6.949985,
						50.337315
					],
					[
						6.949983,
						50.337164
					],
					[
						6.949908,
						50.337021
					],
					[
						6.947668,
						50.33556
					],
					[
						6.947668,
						50.33556
					],
					[
						6.947632,
						50.335537
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "pt-2008",
				Location: "Portimão",
				Name: "Autódromo Internacional do Algarve",
				opened: 2008,
				firstgp: 2020,
				length: 4653,
				altitude: 44
			},
			bbox: [
				-8.632049,
				37.226074,
				-8.624377,
				37.236482
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-8.63081,
						37.232113
					],
					[
						-8.631815,
						37.234859
					],
					[
						-8.632041,
						37.235513
					],
					[
						-8.632049,
						37.235595
					],
					[
						-8.631996,
						37.235671
					],
					[
						-8.631891,
						37.235755
					],
					[
						-8.631758,
						37.235822
					],
					[
						-8.631123,
						37.236199
					],
					[
						-8.630678,
						37.236447
					],
					[
						-8.630527,
						37.236482
					],
					[
						-8.630409,
						37.236476
					],
					[
						-8.628977,
						37.236198
					],
					[
						-8.628899,
						37.236141
					],
					[
						-8.628867,
						37.236078
					],
					[
						-8.628858,
						37.236019
					],
					[
						-8.628882,
						37.235947
					],
					[
						-8.628967,
						37.235878
					],
					[
						-8.629783,
						37.235495
					],
					[
						-8.629907,
						37.235413
					],
					[
						-8.63001,
						37.235294
					],
					[
						-8.630043,
						37.235222
					],
					[
						-8.630083,
						37.235102
					],
					[
						-8.630067,
						37.23491
					],
					[
						-8.628503,
						37.230556
					],
					[
						-8.628422,
						37.230361
					],
					[
						-8.62832,
						37.230292
					],
					[
						-8.628209,
						37.23029
					],
					[
						-8.628101,
						37.230338
					],
					[
						-8.628037,
						37.230421
					],
					[
						-8.62802,
						37.230589
					],
					[
						-8.62785,
						37.231867
					],
					[
						-8.627827,
						37.232122
					],
					[
						-8.627869,
						37.232417
					],
					[
						-8.627945,
						37.232622
					],
					[
						-8.628048,
						37.232807
					],
					[
						-8.628841,
						37.234007
					],
					[
						-8.628882,
						37.23414
					],
					[
						-8.628863,
						37.234285
					],
					[
						-8.628806,
						37.234412
					],
					[
						-8.628668,
						37.234564
					],
					[
						-8.628059,
						37.23514
					],
					[
						-8.627969,
						37.235169
					],
					[
						-8.627867,
						37.235182
					],
					[
						-8.627713,
						37.235158
					],
					[
						-8.627589,
						37.23509
					],
					[
						-8.627528,
						37.235006
					],
					[
						-8.627048,
						37.232373
					],
					[
						-8.627018,
						37.232255
					],
					[
						-8.626941,
						37.232108
					],
					[
						-8.626867,
						37.231992
					],
					[
						-8.626697,
						37.231844
					],
					[
						-8.626455,
						37.23171
					],
					[
						-8.624838,
						37.231048
					],
					[
						-8.624702,
						37.230945
					],
					[
						-8.624545,
						37.230766
					],
					[
						-8.624399,
						37.230464
					],
					[
						-8.624377,
						37.23034
					],
					[
						-8.624403,
						37.23024
					],
					[
						-8.624457,
						37.230172
					],
					[
						-8.624558,
						37.230099
					],
					[
						-8.626289,
						37.229678
					],
					[
						-8.626401,
						37.22963
					],
					[
						-8.626561,
						37.229525
					],
					[
						-8.626732,
						37.229375
					],
					[
						-8.626857,
						37.22919
					],
					[
						-8.626917,
						37.228977
					],
					[
						-8.627125,
						37.227874
					],
					[
						-8.627108,
						37.227771
					],
					[
						-8.627039,
						37.227694
					],
					[
						-8.626926,
						37.227606
					],
					[
						-8.626759,
						37.227589
					],
					[
						-8.626623,
						37.227611
					],
					[
						-8.626562,
						37.227649
					],
					[
						-8.625486,
						37.228686
					],
					[
						-8.625331,
						37.228749
					],
					[
						-8.625166,
						37.228777
					],
					[
						-8.624956,
						37.228737
					],
					[
						-8.624784,
						37.228615
					],
					[
						-8.62466,
						37.228478
					],
					[
						-8.62461,
						37.22838
					],
					[
						-8.624559,
						37.228179
					],
					[
						-8.624564,
						37.228064
					],
					[
						-8.624596,
						37.227931
					],
					[
						-8.624674,
						37.227798
					],
					[
						-8.62489,
						37.22756
					],
					[
						-8.625977,
						37.226518
					],
					[
						-8.626212,
						37.22636
					],
					[
						-8.626421,
						37.226249
					],
					[
						-8.626588,
						37.226185
					],
					[
						-8.626848,
						37.226112
					],
					[
						-8.627093,
						37.226075
					],
					[
						-8.627402,
						37.226074
					],
					[
						-8.627644,
						37.226104
					],
					[
						-8.627888,
						37.226156
					],
					[
						-8.628129,
						37.226246
					],
					[
						-8.62837,
						37.226357
					],
					[
						-8.628568,
						37.226509
					],
					[
						-8.628733,
						37.226661
					],
					[
						-8.628909,
						37.226867
					],
					[
						-8.630778,
						37.232024
					],
					[
						-8.63081,
						37.232113
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "it-1914",
				Location: "Scarperia e San Piero",
				Name: "Autodromo Internazionale del Mugello",
				opened: 1914,
				firstgp: 2020,
				length: 5245,
				altitude: 292
			},
			bbox: [
				11.365772,
				43.991538,
				11.377272,
				44.003271
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						11.371465,
						43.997589
					],
					[
						11.371893,
						43.998272
					],
					[
						11.372286,
						43.998858
					],
					[
						11.373086,
						43.999838
					],
					[
						11.37373,
						44.000646
					],
					[
						11.374286,
						44.001551
					],
					[
						11.375048,
						44.002955
					],
					[
						11.375166,
						44.003094
					],
					[
						11.375286,
						44.003174
					],
					[
						11.375419,
						44.003241
					],
					[
						11.375679,
						44.003271
					],
					[
						11.375899,
						44.003243
					],
					[
						11.376077,
						44.003165
					],
					[
						11.376209,
						44.00305
					],
					[
						11.376303,
						44.002916
					],
					[
						11.376312,
						44.002647
					],
					[
						11.376255,
						44.002362
					],
					[
						11.376053,
						44.001572
					],
					[
						11.376045,
						44.001471
					],
					[
						11.376076,
						44.001383
					],
					[
						11.376149,
						44.00128
					],
					[
						11.376263,
						44.001197
					],
					[
						11.376569,
						44.001065
					],
					[
						11.377074,
						44.000827
					],
					[
						11.377188,
						44.000714
					],
					[
						11.37725,
						44.000573
					],
					[
						11.377272,
						44.000453
					],
					[
						11.377264,
						44.000329
					],
					[
						11.3772,
						44.000189
					],
					[
						11.377079,
						44.000038
					],
					[
						11.374858,
						43.997607
					],
					[
						11.374812,
						43.997513
					],
					[
						11.374796,
						43.997426
					],
					[
						11.374802,
						43.99735
					],
					[
						11.374825,
						43.997272
					],
					[
						11.374893,
						43.997142
					],
					[
						11.375125,
						43.996789
					],
					[
						11.37517,
						43.996671
					],
					[
						11.37517,
						43.996569
					],
					[
						11.375146,
						43.996463
					],
					[
						11.375096,
						43.996365
					],
					[
						11.375035,
						43.996286
					],
					[
						11.374865,
						43.996119
					],
					[
						11.372755,
						43.994265
					],
					[
						11.372659,
						43.994204
					],
					[
						11.372537,
						43.994143
					],
					[
						11.372412,
						43.994105
					],
					[
						11.372308,
						43.994083
					],
					[
						11.372188,
						43.994079
					],
					[
						11.371064,
						43.994085
					],
					[
						11.370919,
						43.994067
					],
					[
						11.37067,
						43.994
					],
					[
						11.370483,
						43.993913
					],
					[
						11.370339,
						43.993822
					],
					[
						11.370219,
						43.993704
					],
					[
						11.370105,
						43.993561
					],
					[
						11.370026,
						43.99342
					],
					[
						11.369518,
						43.992379
					],
					[
						11.369443,
						43.992225
					],
					[
						11.36935,
						43.992074
					],
					[
						11.369206,
						43.991916
					],
					[
						11.369076,
						43.991804
					],
					[
						11.368887,
						43.991695
					],
					[
						11.36871,
						43.991615
					],
					[
						11.368467,
						43.991561
					],
					[
						11.368234,
						43.991538
					],
					[
						11.367996,
						43.991546
					],
					[
						11.367676,
						43.991597
					],
					[
						11.367526,
						43.991623
					],
					[
						11.36736,
						43.991669
					],
					[
						11.366373,
						43.992042
					],
					[
						11.366203,
						43.992119
					],
					[
						11.366027,
						43.992252
					],
					[
						11.365916,
						43.992375
					],
					[
						11.365817,
						43.992527
					],
					[
						11.365772,
						43.992713
					],
					[
						11.365772,
						43.992849
					],
					[
						11.365809,
						43.993109
					],
					[
						11.366415,
						43.995373
					],
					[
						11.366454,
						43.995458
					],
					[
						11.366544,
						43.995572
					],
					[
						11.366677,
						43.995645
					],
					[
						11.36681,
						43.995696
					],
					[
						11.367028,
						43.99572
					],
					[
						11.367771,
						43.995725
					],
					[
						11.367917,
						43.995745
					],
					[
						11.36805,
						43.995787
					],
					[
						11.36818,
						43.995858
					],
					[
						11.36834,
						43.995994
					],
					[
						11.368428,
						43.996163
					],
					[
						11.369484,
						43.998825
					],
					[
						11.369548,
						43.998952
					],
					[
						11.369675,
						43.999092
					],
					[
						11.369824,
						43.999197
					],
					[
						11.369976,
						43.999261
					],
					[
						11.370159,
						43.999295
					],
					[
						11.370341,
						43.999294
					],
					[
						11.37056,
						43.999256
					],
					[
						11.370771,
						43.999159
					],
					[
						11.370917,
						43.999035
					],
					[
						11.370987,
						43.998908
					],
					[
						11.371027,
						43.998732
					],
					[
						11.370996,
						43.998574
					],
					[
						11.370891,
						43.998379
					],
					[
						11.37059,
						43.998047
					],
					[
						11.369926,
						43.997458
					],
					[
						11.369872,
						43.997371
					],
					[
						11.369831,
						43.997272
					],
					[
						11.369816,
						43.997148
					],
					[
						11.369815,
						43.996577
					],
					[
						11.369782,
						43.996485
					],
					[
						11.369643,
						43.996316
					],
					[
						11.366746,
						43.99351
					],
					[
						11.366688,
						43.993408
					],
					[
						11.366609,
						43.993274
					],
					[
						11.366584,
						43.993166
					],
					[
						11.366588,
						43.992953
					],
					[
						11.366638,
						43.992831
					],
					[
						11.366767,
						43.992669
					],
					[
						11.366933,
						43.992556
					],
					[
						11.367197,
						43.992457
					],
					[
						11.367394,
						43.992439
					],
					[
						11.367687,
						43.992459
					],
					[
						11.367947,
						43.992529
					],
					[
						11.368181,
						43.992646
					],
					[
						11.368422,
						43.99282
					],
					[
						11.368667,
						43.993091
					],
					[
						11.369534,
						43.994472
					],
					[
						11.371465,
						43.997589
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "my-1999",
				Location: "Sepang",
				Name: "Sepang International Circuit",
				opened: 1999,
				firstgp: 1999,
				length: 5543,
				altitude: 39
			},
			bbox: [
				101.732582,
				2.756603,
				101.74303,
				2.765153
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						101.735641,
						2.760529
					],
					[
						101.732942,
						2.760307
					],
					[
						101.732818,
						2.760317
					],
					[
						101.732706,
						2.760373
					],
					[
						101.732629,
						2.760454
					],
					[
						101.732587,
						2.760564
					],
					[
						101.732582,
						2.760688
					],
					[
						101.732627,
						2.760818
					],
					[
						101.732732,
						2.760916
					],
					[
						101.732874,
						2.760961
					],
					[
						101.73304,
						2.760928
					],
					[
						101.733348,
						2.760818
					],
					[
						101.733451,
						2.760835
					],
					[
						101.733538,
						2.760921
					],
					[
						101.733566,
						2.761026
					],
					[
						101.733538,
						2.761164
					],
					[
						101.733446,
						2.761304
					],
					[
						101.733236,
						2.761561
					],
					[
						101.733147,
						2.761718
					],
					[
						101.733089,
						2.761904
					],
					[
						101.733061,
						2.762091
					],
					[
						101.733061,
						2.762303
					],
					[
						101.733112,
						2.762825
					],
					[
						101.733194,
						2.76307
					],
					[
						101.733323,
						2.76332
					],
					[
						101.733453,
						2.763481
					],
					[
						101.733653,
						2.763662
					],
					[
						101.733863,
						2.7638
					],
					[
						101.734083,
						2.763881
					],
					[
						101.735319,
						2.764284
					],
					[
						101.736244,
						2.764648
					],
					[
						101.736863,
						2.764916
					],
					[
						101.737262,
						2.765097
					],
					[
						101.7374,
						2.765153
					],
					[
						101.737503,
						2.765149
					],
					[
						101.737592,
						2.765093
					],
					[
						101.737624,
						2.764981
					],
					[
						101.737796,
						2.764022
					],
					[
						101.737901,
						2.763528
					],
					[
						101.738049,
						2.762929
					],
					[
						101.738157,
						2.762698
					],
					[
						101.738278,
						2.762533
					],
					[
						101.738486,
						2.762367
					],
					[
						101.738692,
						2.762257
					],
					[
						101.738897,
						2.762206
					],
					[
						101.739098,
						2.762197
					],
					[
						101.739327,
						2.762232
					],
					[
						101.739561,
						2.762323
					],
					[
						101.739727,
						2.762442
					],
					[
						101.740051,
						2.762789
					],
					[
						101.74021,
						2.762885
					],
					[
						101.74046,
						2.762971
					],
					[
						101.740673,
						2.762978
					],
					[
						101.740883,
						2.76295
					],
					[
						101.741053,
						2.76288
					],
					[
						101.741205,
						2.762759
					],
					[
						101.74302,
						2.760691
					],
					[
						101.74303,
						2.76059
					],
					[
						101.742988,
						2.760475
					],
					[
						101.742679,
						2.759782
					],
					[
						101.742586,
						2.759717
					],
					[
						101.742476,
						2.759691
					],
					[
						101.740819,
						2.759595
					],
					[
						101.739263,
						2.759413
					],
					[
						101.73841,
						2.759273
					],
					[
						101.738329,
						2.759207
					],
					[
						101.738303,
						2.759098
					],
					[
						101.738375,
						2.758976
					],
					[
						101.738983,
						2.75864
					],
					[
						101.739116,
						2.758506
					],
					[
						101.739209,
						2.758308
					],
					[
						101.739256,
						2.758102
					],
					[
						101.739249,
						2.757808
					],
					[
						101.739209,
						2.757561
					],
					[
						101.739154,
						2.75732
					],
					[
						101.739009,
						2.757012
					],
					[
						101.738792,
						2.756697
					],
					[
						101.738673,
						2.756622
					],
					[
						101.738559,
						2.756603
					],
					[
						101.73843,
						2.756627
					],
					[
						101.738327,
						2.756694
					],
					[
						101.736426,
						2.758259
					],
					[
						101.736293,
						2.758308
					],
					[
						101.736122,
						2.758318
					],
					[
						101.735935,
						2.758271
					],
					[
						101.735242,
						2.757916
					],
					[
						101.735057,
						2.757858
					],
					[
						101.734837,
						2.757828
					],
					[
						101.734644,
						2.75783
					],
					[
						101.734284,
						2.757895
					],
					[
						101.734039,
						2.757996
					],
					[
						101.73388,
						2.758122
					],
					[
						101.733667,
						2.758402
					],
					[
						101.733592,
						2.758612
					],
					[
						101.733581,
						2.75874
					],
					[
						101.73367,
						2.758884
					],
					[
						101.733861,
						2.758963
					],
					[
						101.7414,
						2.760348
					],
					[
						101.741508,
						2.760443
					],
					[
						101.741587,
						2.760625
					],
					[
						101.741547,
						2.760777
					],
					[
						101.74141,
						2.760919
					],
					[
						101.741185,
						2.760954
					],
					[
						101.735641,
						2.760529
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "tr-2005",
				Location: "Istanbul",
				Name: "Intercity Istanbul Park",
				opened: 2005,
				firstgp: 2005,
				length: 5338,
				altitude: 150
			},
			bbox: [
				29.400023,
				40.951405,
				29.417419,
				40.962944
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						29.406152,
						40.952131
					],
					[
						29.40884,
						40.952581
					],
					[
						29.409051,
						40.952654
					],
					[
						29.409149,
						40.952798
					],
					[
						29.409122,
						40.952916
					],
					[
						29.408948,
						40.95346
					],
					[
						29.408845,
						40.953746
					],
					[
						29.408845,
						40.953959
					],
					[
						29.408916,
						40.954264
					],
					[
						29.40916,
						40.954591
					],
					[
						29.409561,
						40.954882
					],
					[
						29.410371,
						40.955244
					],
					[
						29.410839,
						40.955391
					],
					[
						29.411422,
						40.955538
					],
					[
						29.412489,
						40.955691
					],
					[
						29.413171,
						40.955715
					],
					[
						29.413552,
						40.955718
					],
					[
						29.414094,
						40.955659
					],
					[
						29.41433,
						40.955684
					],
					[
						29.414586,
						40.955771
					],
					[
						29.41483,
						40.955955
					],
					[
						29.414954,
						40.956171
					],
					[
						29.415008,
						40.956382
					],
					[
						29.414892,
						40.95705
					],
					[
						29.414921,
						40.957185
					],
					[
						29.415045,
						40.957272
					],
					[
						29.415235,
						40.957272
					],
					[
						29.41581,
						40.957219
					],
					[
						29.416319,
						40.957219
					],
					[
						29.416592,
						40.957272
					],
					[
						29.416712,
						40.957378
					],
					[
						29.416739,
						40.957505
					],
					[
						29.416598,
						40.958093
					],
					[
						29.416507,
						40.958224
					],
					[
						29.416329,
						40.958327
					],
					[
						29.411953,
						40.960008
					],
					[
						29.411676,
						40.960167
					],
					[
						29.411577,
						40.960317
					],
					[
						29.411585,
						40.960464
					],
					[
						29.411639,
						40.960591
					],
					[
						29.411763,
						40.960691
					],
					[
						29.412131,
						40.96086
					],
					[
						29.412446,
						40.960916
					],
					[
						29.412714,
						40.960929
					],
					[
						29.41405,
						40.960744
					],
					[
						29.415155,
						40.960548
					],
					[
						29.415713,
						40.960426
					],
					[
						29.415986,
						40.960382
					],
					[
						29.41616,
						40.960416
					],
					[
						29.417032,
						40.960779
					],
					[
						29.41714,
						40.960891
					],
					[
						29.417419,
						40.961528
					],
					[
						29.417415,
						40.961687
					],
					[
						29.417336,
						40.961831
					],
					[
						29.417001,
						40.962261
					],
					[
						29.416704,
						40.96252
					],
					[
						29.416249,
						40.962853
					],
					[
						29.416038,
						40.962925
					],
					[
						29.415723,
						40.962944
					],
					[
						29.415293,
						40.962903
					],
					[
						29.409749,
						40.961658
					],
					[
						29.409426,
						40.961524
					],
					[
						29.409315,
						40.961414
					],
					[
						29.409331,
						40.961268
					],
					[
						29.409534,
						40.961021
					],
					[
						29.40967,
						40.960812
					],
					[
						29.40967,
						40.960577
					],
					[
						29.407904,
						40.956441
					],
					[
						29.407685,
						40.956229
					],
					[
						29.40734,
						40.955986
					],
					[
						29.400185,
						40.953056
					],
					[
						29.400052,
						40.95295
					],
					[
						29.400023,
						40.952806
					],
					[
						29.400056,
						40.952672
					],
					[
						29.400205,
						40.952531
					],
					[
						29.400362,
						40.952487
					],
					[
						29.400838,
						40.952516
					],
					[
						29.40097,
						40.952472
					],
					[
						29.401037,
						40.952397
					],
					[
						29.40102,
						40.952228
					],
					[
						29.400884,
						40.951605
					],
					[
						29.400904,
						40.951486
					],
					[
						29.401016,
						40.951405
					],
					[
						29.401177,
						40.951405
					],
					[
						29.406152,
						40.952131
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "nl-1948",
				Location: "Zandvoort",
				Name: "Circuit Zandvoort",
				opened: 1948,
				firstgp: 1952,
				length: 4259,
				altitude: 3
			},
			bbox: [
				4.538742,
				52.384363,
				4.553061,
				52.391811
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						4.540491,
						52.388408
					],
					[
						4.542096,
						52.390776
					],
					[
						4.542706,
						52.391645
					],
					[
						4.542844,
						52.391741
					],
					[
						4.543031,
						52.391795
					],
					[
						4.543235,
						52.391811
					],
					[
						4.543424,
						52.391787
					],
					[
						4.543602,
						52.391713
					],
					[
						4.543726,
						52.39162
					],
					[
						4.543792,
						52.391504
					],
					[
						4.543797,
						52.391375
					],
					[
						4.543703,
						52.391196
					],
					[
						4.54322,
						52.390485
					],
					[
						4.543082,
						52.390244
					],
					[
						4.542999,
						52.390097
					],
					[
						4.542945,
						52.389901
					],
					[
						4.542933,
						52.38977
					],
					[
						4.542916,
						52.389305
					],
					[
						4.542884,
						52.389206
					],
					[
						4.542812,
						52.389101
					],
					[
						4.542686,
						52.389017
					],
					[
						4.542545,
						52.388945
					],
					[
						4.542333,
						52.388894
					],
					[
						4.541332,
						52.388679
					],
					[
						4.541163,
						52.38862
					],
					[
						4.541065,
						52.38856
					],
					[
						4.540985,
						52.388465
					],
					[
						4.540962,
						52.388371
					],
					[
						4.540979,
						52.38826
					],
					[
						4.541057,
						52.388166
					],
					[
						4.541189,
						52.388099
					],
					[
						4.541372,
						52.388054
					],
					[
						4.54166,
						52.388048
					],
					[
						4.543319,
						52.388362
					],
					[
						4.543889,
						52.388429
					],
					[
						4.544461,
						52.38844
					],
					[
						4.544886,
						52.388431
					],
					[
						4.545313,
						52.388396
					],
					[
						4.545704,
						52.388343
					],
					[
						4.546236,
						52.388274
					],
					[
						4.546727,
						52.388248
					],
					[
						4.54703,
						52.388261
					],
					[
						4.547345,
						52.388306
					],
					[
						4.547868,
						52.388435
					],
					[
						4.548539,
						52.388702
					],
					[
						4.548912,
						52.388814
					],
					[
						4.549267,
						52.388879
					],
					[
						4.549705,
						52.388922
					],
					[
						4.550112,
						52.388928
					],
					[
						4.551709,
						52.388868
					],
					[
						4.55204,
						52.388831
					],
					[
						4.552355,
						52.388752
					],
					[
						4.552606,
						52.388633
					],
					[
						4.552811,
						52.388493
					],
					[
						4.552958,
						52.388343
					],
					[
						4.553036,
						52.38817
					],
					[
						4.553061,
						52.387987
					],
					[
						4.553033,
						52.387808
					],
					[
						4.552947,
						52.387626
					],
					[
						4.552761,
						52.387428
					],
					[
						4.551997,
						52.386746
					],
					[
						4.551778,
						52.386498
					],
					[
						4.551194,
						52.38579
					],
					[
						4.550967,
						52.385721
					],
					[
						4.550557,
						52.385704
					],
					[
						4.55022,
						52.385714
					],
					[
						4.549823,
						52.385755
					],
					[
						4.549411,
						52.385841
					],
					[
						4.54897,
						52.38597
					],
					[
						4.548533,
						52.38616
					],
					[
						4.548263,
						52.386343
					],
					[
						4.548214,
						52.386455
					],
					[
						4.548257,
						52.386573
					],
					[
						4.548419,
						52.386687
					],
					[
						4.548741,
						52.386812
					],
					[
						4.548952,
						52.386859
					],
					[
						4.549582,
						52.386926
					],
					[
						4.550139,
						52.387016
					],
					[
						4.550808,
						52.387175
					],
					[
						4.551025,
						52.387291
					],
					[
						4.551136,
						52.387442
					],
					[
						4.551151,
						52.387607
					],
					[
						4.551056,
						52.387771
					],
					[
						4.550811,
						52.38792
					],
					[
						4.550591,
						52.387967
					],
					[
						4.549376,
						52.388042
					],
					[
						4.548249,
						52.388019
					],
					[
						4.547096,
						52.387935
					],
					[
						4.546101,
						52.387788
					],
					[
						4.54551,
						52.387674
					],
					[
						4.544815,
						52.387525
					],
					[
						4.544102,
						52.387336
					],
					[
						4.543469,
						52.387144
					],
					[
						4.543267,
						52.387091
					],
					[
						4.543123,
						52.387108
					],
					[
						4.542988,
						52.387222
					],
					[
						4.542844,
						52.387388
					],
					[
						4.542646,
						52.387463
					],
					[
						4.542392,
						52.387469
					],
					[
						4.542144,
						52.387398
					],
					[
						4.542012,
						52.387289
					],
					[
						4.541951,
						52.387172
					],
					[
						4.542012,
						52.386934
					],
					[
						4.542566,
						52.38496
					],
					[
						4.542578,
						52.384828
					],
					[
						4.542517,
						52.384693
					],
					[
						4.542419,
						52.384579
					],
					[
						4.542324,
						52.384506
					],
					[
						4.542089,
						52.384409
					],
					[
						4.541838,
						52.384374
					],
					[
						4.540774,
						52.384363
					],
					[
						4.540557,
						52.38437
					],
					[
						4.540241,
						52.3844
					],
					[
						4.539914,
						52.384465
					],
					[
						4.539645,
						52.38454
					],
					[
						4.539287,
						52.384712
					],
					[
						4.539054,
						52.384902
					],
					[
						4.538895,
						52.385065
					],
					[
						4.538779,
						52.385285
					],
					[
						4.538742,
						52.385478
					],
					[
						4.538775,
						52.385793
					],
					[
						4.538873,
						52.386017
					],
					[
						4.540408,
						52.38829
					],
					[
						4.540491,
						52.388408
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "fr-1960",
				Location: "Magny-Cours",
				Name: "Circuit de Nevers Magny-Cours",
				opened: 1960,
				firstgp: 1991,
				length: 4412,
				altitude: 230
			},
			bbox: [
				3.160075,
				46.859125,
				3.169239,
				46.868387
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						3.16371,
						46.864076
					],
					[
						3.165739,
						46.865204
					],
					[
						3.165897,
						46.86539
					],
					[
						3.165972,
						46.865539
					],
					[
						3.165991,
						46.866053
					],
					[
						3.165983,
						46.866711
					],
					[
						3.165916,
						46.866828
					],
					[
						3.165724,
						46.867081
					],
					[
						3.165631,
						46.867377
					],
					[
						3.165646,
						46.867582
					],
					[
						3.165682,
						46.86768
					],
					[
						3.165802,
						46.867898
					],
					[
						3.165989,
						46.868066
					],
					[
						3.166202,
						46.868195
					],
					[
						3.166392,
						46.868283
					],
					[
						3.166687,
						46.868361
					],
					[
						3.167003,
						46.868387
					],
					[
						3.167277,
						46.868381
					],
					[
						3.167598,
						46.868312
					],
					[
						3.16783,
						46.86821
					],
					[
						3.167998,
						46.868097
					],
					[
						3.168192,
						46.867901
					],
					[
						3.168645,
						46.867246
					],
					[
						3.168865,
						46.866859
					],
					[
						3.168976,
						46.86656
					],
					[
						3.169031,
						46.86633
					],
					[
						3.169239,
						46.864033
					],
					[
						3.169239,
						46.863793
					],
					[
						3.169188,
						46.863342
					],
					[
						3.169097,
						46.862975
					],
					[
						3.167903,
						46.859974
					],
					[
						3.167834,
						46.859889
					],
					[
						3.167705,
						46.859873
					],
					[
						3.167615,
						46.859912
					],
					[
						3.167562,
						46.859997
					],
					[
						3.167373,
						46.860863
					],
					[
						3.167624,
						46.862048
					],
					[
						3.167666,
						46.862205
					],
					[
						3.167584,
						46.864608
					],
					[
						3.167605,
						46.864684
					],
					[
						3.167694,
						46.864763
					],
					[
						3.167953,
						46.86493
					],
					[
						3.168075,
						46.865051
					],
					[
						3.168172,
						46.865245
					],
					[
						3.168204,
						46.865428
					],
					[
						3.168191,
						46.865796
					],
					[
						3.168077,
						46.866289
					],
					[
						3.167879,
						46.866767
					],
					[
						3.167715,
						46.866952
					],
					[
						3.167502,
						46.867086
					],
					[
						3.167256,
						46.867147
					],
					[
						3.166963,
						46.867107
					],
					[
						3.16682,
						46.867007
					],
					[
						3.16674,
						46.866912
					],
					[
						3.166742,
						46.866777
					],
					[
						3.166795,
						46.86666
					],
					[
						3.167068,
						46.866376
					],
					[
						3.167139,
						46.866262
					],
					[
						3.167207,
						46.866063
					],
					[
						3.167221,
						46.865821
					],
					[
						3.16715,
						46.865592
					],
					[
						3.166847,
						46.864933
					],
					[
						3.166786,
						46.864741
					],
					[
						3.166744,
						46.864557
					],
					[
						3.166788,
						46.861659
					],
					[
						3.166725,
						46.861561
					],
					[
						3.166198,
						46.86116
					],
					[
						3.166146,
						46.861066
					],
					[
						3.166125,
						46.860788
					],
					[
						3.16613,
						46.860617
					],
					[
						3.166182,
						46.860276
					],
					[
						3.166252,
						46.860077
					],
					[
						3.166619,
						46.859239
					],
					[
						3.166576,
						46.859181
					],
					[
						3.166323,
						46.859125
					],
					[
						3.166068,
						46.859148
					],
					[
						3.165818,
						46.859217
					],
					[
						3.165459,
						46.859393
					],
					[
						3.16513,
						46.859592
					],
					[
						3.164774,
						46.859887
					],
					[
						3.163459,
						46.860921
					],
					[
						3.163145,
						46.861131
					],
					[
						3.162629,
						46.861395
					],
					[
						3.162142,
						46.861555
					],
					[
						3.160138,
						46.862008
					],
					[
						3.160081,
						46.862058
					],
					[
						3.160075,
						46.862139
					],
					[
						3.160296,
						46.862418
					],
					[
						3.160748,
						46.862775
					],
					[
						3.1609,
						46.862841
					],
					[
						3.161014,
						46.862791
					],
					[
						3.161115,
						46.862732
					],
					[
						3.161218,
						46.86272
					],
					[
						3.16153,
						46.862877
					],
					[
						3.16371,
						46.864076
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "pt-1972",
				Location: "Estoril",
				Name: "Autódromo do Estoril",
				opened: 1972,
				firstgp: 1984,
				length: 4349,
				altitude: 80
			},
			bbox: [
				-9.397381,
				38.745536,
				-9.390192,
				38.755309
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-9.393073,
						38.749017
					],
					[
						-9.395047,
						38.745624
					],
					[
						-9.395129,
						38.745561
					],
					[
						-9.39527,
						38.745536
					],
					[
						-9.395393,
						38.745558
					],
					[
						-9.395509,
						38.745629
					],
					[
						-9.395908,
						38.746138
					],
					[
						-9.396634,
						38.746638
					],
					[
						-9.397219,
						38.747004
					],
					[
						-9.397339,
						38.74712
					],
					[
						-9.397381,
						38.747227
					],
					[
						-9.397363,
						38.747378
					],
					[
						-9.397071,
						38.748146
					],
					[
						-9.396694,
						38.748987
					],
					[
						-9.396598,
						38.749083
					],
					[
						-9.396447,
						38.749135
					],
					[
						-9.39626,
						38.749119
					],
					[
						-9.396098,
						38.749045
					],
					[
						-9.395985,
						38.748918
					],
					[
						-9.39595,
						38.748762
					],
					[
						-9.395989,
						38.748478
					],
					[
						-9.396281,
						38.74753
					],
					[
						-9.396267,
						38.747409
					],
					[
						-9.396242,
						38.747307
					],
					[
						-9.396137,
						38.747192
					],
					[
						-9.395983,
						38.747128
					],
					[
						-9.395853,
						38.747107
					],
					[
						-9.395659,
						38.747126
					],
					[
						-9.395507,
						38.747205
					],
					[
						-9.395398,
						38.747324
					],
					[
						-9.395349,
						38.747442
					],
					[
						-9.394809,
						38.749505
					],
					[
						-9.39476,
						38.749596
					],
					[
						-9.394665,
						38.749692
					],
					[
						-9.39139,
						38.752927
					],
					[
						-9.391323,
						38.753051
					],
					[
						-9.391323,
						38.75315
					],
					[
						-9.391358,
						38.753257
					],
					[
						-9.391464,
						38.753378
					],
					[
						-9.39157,
						38.753444
					],
					[
						-9.391757,
						38.753502
					],
					[
						-9.391951,
						38.753529
					],
					[
						-9.392148,
						38.753529
					],
					[
						-9.39231,
						38.753502
					],
					[
						-9.392494,
						38.753439
					],
					[
						-9.392638,
						38.753356
					],
					[
						-9.395054,
						38.751007
					],
					[
						-9.395174,
						38.750952
					],
					[
						-9.395344,
						38.750922
					],
					[
						-9.395474,
						38.75093
					],
					[
						-9.395619,
						38.750963
					],
					[
						-9.395724,
						38.751023
					],
					[
						-9.395841,
						38.75112
					],
					[
						-9.395922,
						38.751254
					],
					[
						-9.395978,
						38.751403
					],
					[
						-9.396264,
						38.753281
					],
					[
						-9.39626,
						38.753399
					],
					[
						-9.396232,
						38.753515
					],
					[
						-9.396172,
						38.753638
					],
					[
						-9.39602,
						38.753762
					],
					[
						-9.395795,
						38.753878
					],
					[
						-9.395139,
						38.754073
					],
					[
						-9.394325,
						38.754249
					],
					[
						-9.393958,
						38.754241
					],
					[
						-9.393278,
						38.754081
					],
					[
						-9.393082,
						38.754077
					],
					[
						-9.39292,
						38.754135
					],
					[
						-9.392786,
						38.754289
					],
					[
						-9.392529,
						38.754847
					],
					[
						-9.392374,
						38.755012
					],
					[
						-9.39213,
						38.755166
					],
					[
						-9.391891,
						38.755265
					],
					[
						-9.391535,
						38.755309
					],
					[
						-9.391242,
						38.755273
					],
					[
						-9.390911,
						38.755174
					],
					[
						-9.390646,
						38.755023
					],
					[
						-9.390435,
						38.754833
					],
					[
						-9.390297,
						38.754652
					],
					[
						-9.390213,
						38.754399
					],
					[
						-9.390192,
						38.754195
					],
					[
						-9.39023,
						38.753953
					],
					[
						-9.39034,
						38.753722
					],
					[
						-9.393073,
						38.749017
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "br-1977",
				Location: "Jacarepaguá",
				Name: "Autódromo Internacional Nelson Piquet",
				opened: 1977,
				firstgp: 1978,
				length: 5031,
				altitude: 3
			},
			bbox: [
				-43.399859,
				-22.980204,
				-43.3893,
				-22.974123
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						-43.395225,
						-22.97485
					],
					[
						-43.392908,
						-22.974865
					],
					[
						-43.39259,
						-22.9749
					],
					[
						-43.392348,
						-22.975006
					],
					[
						-43.392132,
						-22.975221
					],
					[
						-43.392005,
						-22.975424
					],
					[
						-43.391941,
						-22.975658
					],
					[
						-43.391941,
						-22.97592
					],
					[
						-43.391996,
						-22.976174
					],
					[
						-43.39217,
						-22.976377
					],
					[
						-43.392344,
						-22.976545
					],
					[
						-43.392582,
						-22.976627
					],
					[
						-43.392709,
						-22.976639
					],
					[
						-43.393986,
						-22.976607
					],
					[
						-43.394207,
						-22.976683
					],
					[
						-43.394338,
						-22.976801
					],
					[
						-43.394436,
						-22.976933
					],
					[
						-43.394478,
						-22.977101
					],
					[
						-43.394482,
						-22.978515
					],
					[
						-43.394423,
						-22.978685
					],
					[
						-43.39433,
						-22.97881
					],
					[
						-43.394211,
						-22.978919
					],
					[
						-43.394003,
						-22.979021
					],
					[
						-43.393816,
						-22.97906
					],
					[
						-43.393596,
						-22.979072
					],
					[
						-43.393434,
						-22.97906
					],
					[
						-43.393171,
						-22.978927
					],
					[
						-43.391708,
						-22.977986
					],
					[
						-43.391112,
						-22.977425
					],
					[
						-43.39098,
						-22.9773
					],
					[
						-43.390959,
						-22.977198
					],
					[
						-43.390963,
						-22.975653
					],
					[
						-43.390887,
						-22.975493
					],
					[
						-43.390671,
						-22.975392
					],
					[
						-43.390391,
						-22.975364
					],
					[
						-43.39006,
						-22.97549
					],
					[
						-43.389843,
						-22.975561
					],
					[
						-43.389614,
						-22.975576
					],
					[
						-43.389432,
						-22.975443
					],
					[
						-43.3893,
						-22.975201
					],
					[
						-43.389309,
						-22.974955
					],
					[
						-43.389453,
						-22.974744
					],
					[
						-43.389657,
						-22.974592
					],
					[
						-43.389835,
						-22.974525
					],
					[
						-43.391515,
						-22.974201
					],
					[
						-43.396126,
						-22.974123
					],
					[
						-43.399036,
						-22.974201
					],
					[
						-43.399312,
						-22.974291
					],
					[
						-43.399541,
						-22.974432
					],
					[
						-43.399702,
						-22.974623
					],
					[
						-43.399796,
						-22.974842
					],
					[
						-43.399859,
						-22.975064
					],
					[
						-43.399855,
						-22.975252
					],
					[
						-43.399834,
						-22.975471
					],
					[
						-43.399796,
						-22.975666
					],
					[
						-43.399694,
						-22.975846
					],
					[
						-43.399554,
						-22.976029
					],
					[
						-43.399376,
						-22.976185
					],
					[
						-43.399168,
						-22.976314
					],
					[
						-43.398858,
						-22.976404
					],
					[
						-43.398459,
						-22.97649
					],
					[
						-43.39815,
						-22.976572
					],
					[
						-43.398048,
						-22.976668
					],
					[
						-43.397929,
						-22.97684
					],
					[
						-43.39791,
						-22.976991
					],
					[
						-43.397936,
						-22.977182
					],
					[
						-43.398199,
						-22.978499
					],
					[
						-43.398211,
						-22.978635
					],
					[
						-43.398207,
						-22.978807
					],
					[
						-43.398169,
						-22.978936
					],
					[
						-43.398097,
						-22.979084
					],
					[
						-43.398008,
						-22.979209
					],
					[
						-43.397897,
						-22.979291
					],
					[
						-43.396682,
						-22.98015
					],
					[
						-43.396538,
						-22.9802
					],
					[
						-43.396381,
						-22.980204
					],
					[
						-43.396194,
						-22.980161
					],
					[
						-43.396037,
						-22.980068
					],
					[
						-43.395884,
						-22.979892
					],
					[
						-43.395838,
						-22.97974
					],
					[
						-43.395787,
						-22.976738
					],
					[
						-43.39585,
						-22.976594
					],
					[
						-43.395961,
						-22.976496
					],
					[
						-43.39613,
						-22.97641
					],
					[
						-43.398809,
						-22.975821
					],
					[
						-43.398962,
						-22.9757
					],
					[
						-43.399055,
						-22.975536
					],
					[
						-43.399094,
						-22.975364
					],
					[
						-43.39903,
						-22.975173
					],
					[
						-43.398941,
						-22.975024
					],
					[
						-43.398784,
						-22.974907
					],
					[
						-43.398551,
						-22.974841
					],
					[
						-43.395225,
						-22.97485
					]
				]
			}
		},
		{
			type: "Feature",
			properties: {
				id: "sa-2021",
				Location: "Jeddah",
				Name: "Jeddah Street Circuit",
				opened: 2021,
				firstgp: 2021,
				length: 6175,
				altitude: 12
			},
			bbox: [
				39.100896,
				21.625405,
				39.10643,
				21.650217
			],
			geometry: {
				type: "LineString",
				coordinates: [
					[
						39.105135,
						21.631065
					],
					[
						39.103841,
						21.634908
					],
					[
						39.103768,
						21.634993
					],
					[
						39.103686,
						21.635029
					],
					[
						39.10355,
						21.634971
					],
					[
						39.10341,
						21.634921
					],
					[
						39.103299,
						21.634944
					],
					[
						39.103207,
						21.63502
					],
					[
						39.103163,
						21.63511
					],
					[
						39.103182,
						21.635317
					],
					[
						39.103386,
						21.635955
					],
					[
						39.103429,
						21.636162
					],
					[
						39.103439,
						21.636396
					],
					[
						39.1034,
						21.636607
					],
					[
						39.103042,
						21.638533
					],
					[
						39.103032,
						21.63873
					],
					[
						39.103018,
						21.638901
					],
					[
						39.102965,
						21.638991
					],
					[
						39.102732,
						21.639072
					],
					[
						39.102548,
						21.639158
					],
					[
						39.102345,
						21.639311
					],
					[
						39.10221,
						21.639504
					],
					[
						39.102127,
						21.63977
					],
					[
						39.102113,
						21.640058
					],
					[
						39.10219,
						21.640323
					],
					[
						39.102452,
						21.6407
					],
					[
						39.102544,
						21.640934
					],
					[
						39.102548,
						21.641176
					],
					[
						39.102476,
						21.641532
					],
					[
						39.102314,
						21.6419
					],
					[
						39.102173,
						21.642035
					],
					[
						39.101936,
						21.642156
					],
					[
						39.101762,
						21.642304
					],
					[
						39.101704,
						21.642538
					],
					[
						39.101733,
						21.64341
					],
					[
						39.101791,
						21.643585
					],
					[
						39.101936,
						21.643769
					],
					[
						39.102149,
						21.643886
					],
					[
						39.10243,
						21.644007
					],
					[
						39.102556,
						21.644115
					],
					[
						39.102638,
						21.64425
					],
					[
						39.102681,
						21.644511
					],
					[
						39.102696,
						21.644753
					],
					[
						39.102769,
						21.645126
					],
					[
						39.102904,
						21.645585
					],
					[
						39.102952,
						21.646014
					],
					[
						39.102957,
						21.646568
					],
					[
						39.102909,
						21.647134
					],
					[
						39.102662,
						21.649789
					],
					[
						39.102599,
						21.649965
					],
					[
						39.102435,
						21.650145
					],
					[
						39.102299,
						21.650217
					],
					[
						39.102086,
						21.650212
					],
					[
						39.101951,
						21.650158
					],
					[
						39.101835,
						21.650023
					],
					[
						39.101747,
						21.649825
					],
					[
						39.101718,
						21.649565
					],
					[
						39.101733,
						21.649344
					],
					[
						39.101781,
						21.649151
					],
					[
						39.101902,
						21.648899
					],
					[
						39.102183,
						21.648445
					],
					[
						39.102333,
						21.648104
					],
					[
						39.102425,
						21.647676
					],
					[
						39.102454,
						21.647456
					],
					[
						39.102464,
						21.647083
					],
					[
						39.10242,
						21.646799
					],
					[
						39.102304,
						21.646417
					],
					[
						39.102123,
						21.646001
					],
					[
						39.10204,
						21.645789
					],
					[
						39.102002,
						21.645497
					],
					[
						39.101992,
						21.645056
					],
					[
						39.101934,
						21.644926
					],
					[
						39.101842,
						21.644804
					],
					[
						39.101672,
						21.644728
					],
					[
						39.101452,
						21.644662
					],
					[
						39.101244,
						21.644527
					],
					[
						39.101075,
						21.644333
					],
					[
						39.100959,
						21.644054
					],
					[
						39.100901,
						21.643721
					],
					[
						39.100896,
						21.643339
					],
					[
						39.100937,
						21.642936
					],
					[
						39.101038,
						21.642626
					],
					[
						39.101237,
						21.642185
					],
					[
						39.101464,
						21.641803
					],
					[
						39.101648,
						21.641409
					],
					[
						39.10174,
						21.641054
					],
					[
						39.101789,
						21.640708
					],
					[
						39.101784,
						21.640325
					],
					[
						39.101769,
						21.639747
					],
					[
						39.101803,
						21.639446
					],
					[
						39.101934,
						21.639072
					],
					[
						39.102127,
						21.638708
					],
					[
						39.102427,
						21.638308
					],
					[
						39.102597,
						21.638056
					],
					[
						39.102756,
						21.637718
					],
					[
						39.102865,
						21.637419
					],
					[
						39.102957,
						21.637046
					],
					[
						39.102982,
						21.636672
					],
					[
						39.102972,
						21.636317
					],
					[
						39.102938,
						21.635818
					],
					[
						39.102856,
						21.635458
					],
					[
						39.102773,
						21.635161
					],
					[
						39.102776,
						21.63497
					],
					[
						39.102839,
						21.634817
					],
					[
						39.102921,
						21.63474
					],
					[
						39.103032,
						21.634641
					],
					[
						39.103226,
						21.63452
					],
					[
						39.103352,
						21.634398
					],
					[
						39.103449,
						21.634272
					],
					[
						39.10355,
						21.633998
					],
					[
						39.103661,
						21.633463
					],
					[
						39.103676,
						21.633218
					],
					[
						39.103628,
						21.633006
					],
					[
						39.103516,
						21.63279
					],
					[
						39.102713,
						21.631486
					],
					[
						39.102585,
						21.631123
					],
					[
						39.102493,
						21.630849
					],
					[
						39.102444,
						21.630633
					],
					[
						39.102454,
						21.630408
					],
					[
						39.102536,
						21.629895
					],
					[
						39.102677,
						21.629385
					],
					[
						39.102861,
						21.628827
					],
					[
						39.103103,
						21.628336
					],
					[
						39.103461,
						21.627797
					],
					[
						39.103879,
						21.627295
					],
					[
						39.104218,
						21.626967
					],
					[
						39.1046,
						21.626593
					],
					[
						39.105138,
						21.626179
					],
					[
						39.105442,
						21.625927
					],
					[
						39.105936,
						21.6255
					],
					[
						39.106067,
						21.625423
					],
					[
						39.106178,
						21.625405
					],
					[
						39.106289,
						21.625432
					],
					[
						39.106367,
						21.625495
					],
					[
						39.106415,
						21.625567
					],
					[
						39.10643,
						21.625707
					],
					[
						39.10641,
						21.625864
					],
					[
						39.105757,
						21.628885
					],
					[
						39.10566,
						21.629389
					],
					[
						39.105457,
						21.630046
					],
					[
						39.105135,
						21.631065
					]
				]
			}
		}
	];
	var circuit_trace = {
		type: type,
		name: name,
		bbox: bbox,
		features: features
	};

	function ascending$1(a, b) {
	  return a == null || b == null ? NaN
	    : a < b ? -1
	    : a > b ? 1
	    : a >= b ? 0
	    : NaN;
	}

	function bisector(f) {
	  let delta = f;
	  let compare = f;

	  if (f.length === 1) {
	    delta = (d, x) => f(d) - x;
	    compare = ascendingComparator(f);
	  }

	  function left(a, x, lo, hi) {
	    if (lo == null) lo = 0;
	    if (hi == null) hi = a.length;
	    while (lo < hi) {
	      const mid = (lo + hi) >>> 1;
	      if (compare(a[mid], x) < 0) lo = mid + 1;
	      else hi = mid;
	    }
	    return lo;
	  }

	  function right(a, x, lo, hi) {
	    if (lo == null) lo = 0;
	    if (hi == null) hi = a.length;
	    while (lo < hi) {
	      const mid = (lo + hi) >>> 1;
	      if (compare(a[mid], x) > 0) hi = mid;
	      else lo = mid + 1;
	    }
	    return lo;
	  }

	  function center(a, x, lo, hi) {
	    if (lo == null) lo = 0;
	    if (hi == null) hi = a.length;
	    const i = left(a, x, lo, hi - 1);
	    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
	  }

	  return {left, center, right};
	}

	function ascendingComparator(f) {
	  return (d, x) => ascending$1(f(d), x);
	}

	function number$2(x) {
	  return x === null ? NaN : +x;
	}

	const ascendingBisect = bisector(ascending$1);
	const bisectRight = ascendingBisect.right;
	bisector(number$2).center;

	class InternMap extends Map {
	  constructor(entries, key = keyof) {
	    super();
	    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
	    if (entries != null) for (const [key, value] of entries) this.set(key, value);
	  }
	  get(key) {
	    return super.get(intern_get(this, key));
	  }
	  has(key) {
	    return super.has(intern_get(this, key));
	  }
	  set(key, value) {
	    return super.set(intern_set(this, key), value);
	  }
	  delete(key) {
	    return super.delete(intern_delete(this, key));
	  }
	}

	function intern_get({_intern, _key}, value) {
	  const key = _key(value);
	  return _intern.has(key) ? _intern.get(key) : value;
	}

	function intern_set({_intern, _key}, value) {
	  const key = _key(value);
	  if (_intern.has(key)) return _intern.get(key);
	  _intern.set(key, value);
	  return value;
	}

	function intern_delete({_intern, _key}, value) {
	  const key = _key(value);
	  if (_intern.has(key)) {
	    value = _intern.get(value);
	    _intern.delete(key);
	  }
	  return value;
	}

	function keyof(value) {
	  return value !== null && typeof value === "object" ? value.valueOf() : value;
	}

	var e10 = Math.sqrt(50),
	    e5 = Math.sqrt(10),
	    e2 = Math.sqrt(2);

	function ticks(start, stop, count) {
	  var reverse,
	      i = -1,
	      n,
	      ticks,
	      step;

	  stop = +stop, start = +start, count = +count;
	  if (start === stop && count > 0) return [start];
	  if (reverse = stop < start) n = start, start = stop, stop = n;
	  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

	  if (step > 0) {
	    let r0 = Math.round(start / step), r1 = Math.round(stop / step);
	    if (r0 * step < start) ++r0;
	    if (r1 * step > stop) --r1;
	    ticks = new Array(n = r1 - r0 + 1);
	    while (++i < n) ticks[i] = (r0 + i) * step;
	  } else {
	    step = -step;
	    let r0 = Math.round(start * step), r1 = Math.round(stop * step);
	    if (r0 / step < start) ++r0;
	    if (r1 / step > stop) --r1;
	    ticks = new Array(n = r1 - r0 + 1);
	    while (++i < n) ticks[i] = (r0 + i) / step;
	  }

	  if (reverse) ticks.reverse();

	  return ticks;
	}

	function tickIncrement(start, stop, count) {
	  var step = (stop - start) / Math.max(0, count),
	      power = Math.floor(Math.log(step) / Math.LN10),
	      error = step / Math.pow(10, power);
	  return power >= 0
	      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
	      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
	}

	function tickStep(start, stop, count) {
	  var step0 = Math.abs(stop - start) / Math.max(0, count),
	      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
	      error = step0 / step1;
	  if (error >= e10) step1 *= 10;
	  else if (error >= e5) step1 *= 5;
	  else if (error >= e2) step1 *= 2;
	  return stop < start ? -step1 : step1;
	}

	function max$1(values, valueof) {
	  let max;
	  if (valueof === undefined) {
	    for (const value of values) {
	      if (value != null
	          && (max < value || (max === undefined && value >= value))) {
	        max = value;
	      }
	    }
	  } else {
	    let index = -1;
	    for (let value of values) {
	      if ((value = valueof(value, ++index, values)) != null
	          && (max < value || (max === undefined && value >= value))) {
	        max = value;
	      }
	    }
	  }
	  return max;
	}

	function sequence(start, stop, step) {
	  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

	  var i = -1,
	      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
	      range = new Array(n);

	  while (++i < n) {
	    range[i] = start + i * step;
	  }

	  return range;
	}

	function identity$4(x) {
	  return x;
	}

	var top = 1,
	    right = 2,
	    bottom = 3,
	    left = 4,
	    epsilon$2 = 1e-6;

	function translateX(x) {
	  return "translate(" + x + ",0)";
	}

	function translateY(y) {
	  return "translate(0," + y + ")";
	}

	function number$1(scale) {
	  return d => +scale(d);
	}

	function center(scale, offset) {
	  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
	  if (scale.round()) offset = Math.round(offset);
	  return d => +scale(d) + offset;
	}

	function entering() {
	  return !this.__axis;
	}

	function axis(orient, scale) {
	  var tickArguments = [],
	      tickValues = null,
	      tickFormat = null,
	      tickSizeInner = 6,
	      tickSizeOuter = 6,
	      tickPadding = 3,
	      offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
	      k = orient === top || orient === left ? -1 : 1,
	      x = orient === left || orient === right ? "x" : "y",
	      transform = orient === top || orient === bottom ? translateX : translateY;

	  function axis(context) {
	    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
	        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$4) : tickFormat,
	        spacing = Math.max(tickSizeInner, 0) + tickPadding,
	        range = scale.range(),
	        range0 = +range[0] + offset,
	        range1 = +range[range.length - 1] + offset,
	        position = (scale.bandwidth ? center : number$1)(scale.copy(), offset),
	        selection = context.selection ? context.selection() : context,
	        path = selection.selectAll(".domain").data([null]),
	        tick = selection.selectAll(".tick").data(values, scale).order(),
	        tickExit = tick.exit(),
	        tickEnter = tick.enter().append("g").attr("class", "tick"),
	        line = tick.select("line"),
	        text = tick.select("text");

	    path = path.merge(path.enter().insert("path", ".tick")
	        .attr("class", "domain")
	        .attr("stroke", "currentColor"));

	    tick = tick.merge(tickEnter);

	    line = line.merge(tickEnter.append("line")
	        .attr("stroke", "currentColor")
	        .attr(x + "2", k * tickSizeInner));

	    text = text.merge(tickEnter.append("text")
	        .attr("fill", "currentColor")
	        .attr(x, k * spacing)
	        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

	    if (context !== selection) {
	      path = path.transition(context);
	      tick = tick.transition(context);
	      line = line.transition(context);
	      text = text.transition(context);

	      tickExit = tickExit.transition(context)
	          .attr("opacity", epsilon$2)
	          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

	      tickEnter
	          .attr("opacity", epsilon$2)
	          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
	    }

	    tickExit.remove();

	    path
	        .attr("d", orient === left || orient === right
	            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
	            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

	    tick
	        .attr("opacity", 1)
	        .attr("transform", function(d) { return transform(position(d) + offset); });

	    line
	        .attr(x + "2", k * tickSizeInner);

	    text
	        .attr(x, k * spacing)
	        .text(format);

	    selection.filter(entering)
	        .attr("fill", "none")
	        .attr("font-size", 10)
	        .attr("font-family", "sans-serif")
	        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

	    selection
	        .each(function() { this.__axis = position; });
	  }

	  axis.scale = function(_) {
	    return arguments.length ? (scale = _, axis) : scale;
	  };

	  axis.ticks = function() {
	    return tickArguments = Array.from(arguments), axis;
	  };

	  axis.tickArguments = function(_) {
	    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
	  };

	  axis.tickValues = function(_) {
	    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
	  };

	  axis.tickFormat = function(_) {
	    return arguments.length ? (tickFormat = _, axis) : tickFormat;
	  };

	  axis.tickSize = function(_) {
	    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
	  };

	  axis.tickSizeInner = function(_) {
	    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
	  };

	  axis.tickSizeOuter = function(_) {
	    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
	  };

	  axis.tickPadding = function(_) {
	    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
	  };

	  axis.offset = function(_) {
	    return arguments.length ? (offset = +_, axis) : offset;
	  };

	  return axis;
	}

	function axisLeft(scale) {
	  return axis(left, scale);
	}

	var noop = {value: () => {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames$1(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames$1(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get$1(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set$1(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
	}

	var xhtml = "http://www.w3.org/1999/xhtml";

	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	function namespace(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
	}

	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	function creator(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	}

	function none() {}

	function selector(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	}

	function selection_select(select) {
	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection$1(subgroups, this._parents);
	}

	// Given something array like (or null), returns something that is strictly an
	// array. This is used to ensure that array-like objects passed to d3.selectAll
	// or selection.selectAll are converted into proper arrays when creating a
	// selection; we don’t ever want to create a selection backed by a live
	// HTMLCollection or NodeList. However, note that selection.selectAll will use a
	// static NodeList as a group, since it safely derived from querySelectorAll.
	function array$1(x) {
	  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
	}

	function empty() {
	  return [];
	}

	function selectorAll(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	}

	function arrayAll(select) {
	  return function() {
	    return array$1(select.apply(this, arguments));
	  };
	}

	function selection_selectAll(select) {
	  if (typeof select === "function") select = arrayAll(select);
	  else select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection$1(subgroups, parents);
	}

	function matcher(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	}

	function childMatcher(selector) {
	  return function(node) {
	    return node.matches(selector);
	  };
	}

	var find = Array.prototype.find;

	function childFind(match) {
	  return function() {
	    return find.call(this.children, match);
	  };
	}

	function childFirst() {
	  return this.firstElementChild;
	}

	function selection_selectChild(match) {
	  return this.select(match == null ? childFirst
	      : childFind(typeof match === "function" ? match : childMatcher(match)));
	}

	var filter = Array.prototype.filter;

	function children() {
	  return Array.from(this.children);
	}

	function childrenFilter(match) {
	  return function() {
	    return filter.call(this.children, match);
	  };
	}

	function selection_selectChildren(match) {
	  return this.selectAll(match == null ? children
	      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
	}

	function selection_filter(match) {
	  if (typeof match !== "function") match = matcher(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Selection$1(subgroups, this._parents);
	}

	function sparse(update) {
	  return new Array(update.length);
	}

	function selection_enter() {
	  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
	}

	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	function constant$2(x) {
	  return function() {
	    return x;
	  };
	}

	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;

	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = new Map,
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
	      if (nodeByKeyValue.has(keyValue)) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue.set(keyValue, node);
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = key.call(parent, data[i], i, data) + "";
	    if (node = nodeByKeyValue.get(keyValue)) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue.delete(keyValue);
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
	      exit[i] = node;
	    }
	  }
	}

	function datum(node) {
	  return node.__data__;
	}

	function selection_data(value, key) {
	  if (!arguments.length) return Array.from(this, datum);

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant$2(value);

	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);

	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection$1(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	}

	// Given some data, this returns an array-like view of it: an object that
	// exposes a length property and allows numeric indexing. Note that unlike
	// selectAll, this isn’t worried about “live” collections because the resulting
	// array will only be used briefly while data is being bound. (It is possible to
	// cause the data to change while iterating by using a key function, but please
	// don’t; we’d rather avoid a gratuitous copy.)
	function arraylike(data) {
	  return typeof data === "object" && "length" in data
	    ? data // Array, TypedArray, NodeList, array-like
	    : Array.from(data); // Map, Set, iterable, string, or anything else
	}

	function selection_exit() {
	  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
	}

	function selection_join(onenter, onupdate, onexit) {
	  var enter = this.enter(), update = this, exit = this.exit();
	  if (typeof onenter === "function") {
	    enter = onenter(enter);
	    if (enter) enter = enter.selection();
	  } else {
	    enter = enter.append(onenter + "");
	  }
	  if (onupdate != null) {
	    update = onupdate(update);
	    if (update) update = update.selection();
	  }
	  if (onexit == null) exit.remove(); else onexit(exit);
	  return enter && update ? enter.merge(update).order() : update;
	}

	function selection_merge(context) {
	  var selection = context.selection ? context.selection() : context;

	  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Selection$1(merges, this._parents);
	}

	function selection_order() {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort(compare) {
	  if (!compare) compare = ascending;

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }

	  return new Selection$1(sortgroups, this._parents).order();
	}

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function selection_call() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes() {
	  return Array.from(this);
	}

	function selection_node() {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	}

	function selection_size() {
	  let size = 0;
	  for (const node of this) ++size; // eslint-disable-line no-unused-vars
	  return size;
	}

	function selection_empty() {
	  return !this.node();
	}

	function selection_each(callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	}

	function attrRemove$1(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS$1(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant$1(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS$1(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction$1(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS$1(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	function selection_attr(name, value) {
	  var fullname = namespace(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }

	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
	      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
	}

	function defaultView(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	}

	function styleRemove$1(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant$1(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction$1(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}

	function selection_style(name, value, priority) {
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove$1 : typeof value === "function"
	            ? styleFunction$1
	            : styleConstant$1)(name, value, priority == null ? "" : priority))
	      : styleValue(this.node(), name);
	}

	function styleValue(node, name) {
	  return node.style.getPropertyValue(name)
	      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	}

	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}

	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}

	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}

	function selection_property(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	}

	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList(node) {
	  return node.classList || new ClassList(node);
	}

	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}

	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};

	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}

	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}

	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}

	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}

	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}

	function selection_classed(name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	}

	function textRemove() {
	  this.textContent = "";
	}

	function textConstant$1(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction$1(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	function selection_text(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction$1
	          : textConstant$1)(value))
	      : this.node().textContent;
	}

	function htmlRemove() {
	  this.innerHTML = "";
	}

	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	function selection_html(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	}

	function raise() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}

	function selection_raise() {
	  return this.each(raise);
	}

	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	function selection_lower() {
	  return this.each(lower);
	}

	function selection_append(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	}

	function constantNull() {
	  return null;
	}

	function selection_insert(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	}

	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	function selection_remove() {
	  return this.each(remove);
	}

	function selection_cloneShallow() {
	  var clone = this.cloneNode(false), parent = this.parentNode;
	  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
	}

	function selection_cloneDeep() {
	  var clone = this.cloneNode(true), parent = this.parentNode;
	  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
	}

	function selection_clone(deep) {
	  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
	}

	function selection_datum(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	}

	function contextListener(listener) {
	  return function(event) {
	    listener.call(this, event, this.__data__);
	  };
	}

	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}

	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.options);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}

	function onAdd(typename, value, options) {
	  return function() {
	    var on = this.__on, o, listener = contextListener(value);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.options);
	        this.addEventListener(o.type, o.listener = listener, o.options = options);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, options);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}

	function selection_on(typename, value, options) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    }
	    return;
	  }

	  on = value ? onAdd : onRemove;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
	  return this;
	}

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (typeof event === "function") {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}

	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}

	function selection_dispatch(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	}

	function* selection_iterator() {
	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) yield node;
	    }
	  }
	}

	var root = [null];

	function Selection$1(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection() {
	  return new Selection$1([[document.documentElement]], root);
	}

	function selection_selection() {
	  return this;
	}

	Selection$1.prototype = selection.prototype = {
	  constructor: Selection$1,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  selectChild: selection_selectChild,
	  selectChildren: selection_selectChildren,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  join: selection_join,
	  merge: selection_merge,
	  selection: selection_selection,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  clone: selection_clone,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch,
	  [Symbol.iterator]: selection_iterator
	};

	function select(selector) {
	  return typeof selector === "string"
	      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection$1([[selector]], root);
	}

	function selectAll(selector) {
	  return typeof selector === "string"
	      ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection$1([array$1(selector)], root);
	}

	function define(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	}

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}

	function Color() {}

	var darker = 0.7;
	var brighter = 1 / darker;

	var reI = "\\s*([+-]?\\d+)\\s*",
	    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
	    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
	    reHex = /^#([0-9a-f]{3,8})$/,
	    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
	    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
	    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
	    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
	    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
	    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};

	define(Color, color, {
	  copy: function(channels) {
	    return Object.assign(new this.constructor, this, channels);
	  },
	  displayable: function() {
	    return this.rgb().displayable();
	  },
	  hex: color_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: color_formatHex,
	  formatHsl: color_formatHsl,
	  formatRgb: color_formatRgb,
	  toString: color_formatRgb
	});

	function color_formatHex() {
	  return this.rgb().formatHex();
	}

	function color_formatHsl() {
	  return hslConvert(this).formatHsl();
	}

	function color_formatRgb() {
	  return this.rgb().formatRgb();
	}

	function color(format) {
	  var m, l;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
	      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
	      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
	      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
	      : null) // invalid hex
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}

	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}

	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}

	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}

	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Rgb, rgb, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb: function() {
	    return this;
	  },
	  displayable: function() {
	    return (-0.5 <= this.r && this.r < 255.5)
	        && (-0.5 <= this.g && this.g < 255.5)
	        && (-0.5 <= this.b && this.b < 255.5)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: rgb_formatHex,
	  formatRgb: rgb_formatRgb,
	  toString: rgb_formatRgb
	}));

	function rgb_formatHex() {
	  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
	}

	function rgb_formatRgb() {
	  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	  return (a === 1 ? "rgb(" : "rgba(")
	      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
	      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
	      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
	      + (a === 1 ? ")" : ", " + a + ")");
	}

	function hex(value) {
	  value = Math.max(0, Math.min(255, Math.round(value) || 0));
	  return (value < 16 ? "0" : "") + value.toString(16);
	}

	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}

	function hsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}

	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hsl, hsl, extend(Color, {
	  brighter: function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker: function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb: function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  displayable: function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  formatHsl: function() {
	    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
	    return (a === 1 ? "hsl(" : "hsla(")
	        + (this.h || 0) + ", "
	        + (this.s || 0) * 100 + "%, "
	        + (this.l || 0) * 100 + "%"
	        + (a === 1 ? ")" : ", " + a + ")");
	  }
	}));

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}

	var constant$1 = x => () => x;

	function linear$1(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}

	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
	}

	var interpolateRgb = (function rgbGamma(y) {
	  var color = gamma(y);

	  function rgb$1(start, end) {
	    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
	        g = color(start.g, end.g),
	        b = color(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  rgb$1.gamma = rgbGamma;

	  return rgb$1;
	})(1);

	function numberArray(a, b) {
	  if (!b) b = [];
	  var n = a ? Math.min(b.length, a.length) : 0,
	      c = b.slice(),
	      i;
	  return function(t) {
	    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
	    return c;
	  };
	}

	function isNumberArray(x) {
	  return ArrayBuffer.isView(x) && !(x instanceof DataView);
	}

	function genericArray(a, b) {
	  var nb = b ? b.length : 0,
	      na = a ? Math.min(nb, a.length) : 0,
	      x = new Array(na),
	      c = new Array(nb),
	      i;

	  for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
	  for (; i < nb; ++i) c[i] = b[i];

	  return function(t) {
	    for (i = 0; i < na; ++i) c[i] = x[i](t);
	    return c;
	  };
	}

	function date(a, b) {
	  var d = new Date;
	  return a = +a, b = +b, function(t) {
	    return d.setTime(a * (1 - t) + b * t), d;
	  };
	}

	function interpolateNumber(a, b) {
	  return a = +a, b = +b, function(t) {
	    return a * (1 - t) + b * t;
	  };
	}

	function object(a, b) {
	  var i = {},
	      c = {},
	      k;

	  if (a === null || typeof a !== "object") a = {};
	  if (b === null || typeof b !== "object") b = {};

	  for (k in b) {
	    if (k in a) {
	      i[k] = interpolate$1(a[k], b[k]);
	    } else {
	      c[k] = b[k];
	    }
	  }

	  return function(t) {
	    for (k in i) c[k] = i[k](t);
	    return c;
	  };
	}

	var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	    reB = new RegExp(reA.source, "g");

	function zero(b) {
	  return function() {
	    return b;
	  };
	}

	function one(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}

	function interpolateString(a, b) {
	  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators

	  // Coerce inputs to strings.
	  a = a + "", b = b + "";

	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA.exec(a))
	      && (bm = reB.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: interpolateNumber(am, bm)});
	    }
	    bi = reB.lastIndex;
	  }

	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }

	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one(q[0].x)
	      : zero(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	}

	function interpolate$1(a, b) {
	  var t = typeof b, c;
	  return b == null || t === "boolean" ? constant$1(b)
	      : (t === "number" ? interpolateNumber
	      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
	      : b instanceof color ? interpolateRgb
	      : b instanceof Date ? date
	      : isNumberArray(b) ? numberArray
	      : Array.isArray(b) ? genericArray
	      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
	      : interpolateNumber)(a, b);
	}

	function interpolateRound(a, b) {
	  return a = +a, b = +b, function(t) {
	    return Math.round(a * (1 - t) + b * t);
	  };
	}

	var degrees = 180 / Math.PI;

	var identity$3 = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};

	function decompose(a, b, c, d, e, f) {
	  var scaleX, scaleY, skewX;
	  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
	  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
	  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * degrees,
	    skewX: Math.atan(skewX) * degrees,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	}

	var svgNode;

	/* eslint-disable no-undef */
	function parseCss(value) {
	  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
	  return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
	}

	function parseSvg(value) {
	  if (value == null) return identity$3;
	  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode.setAttribute("transform", value);
	  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
	  value = value.matrix;
	  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
	}

	function interpolateTransform(parse, pxComma, pxParen, degParen) {

	  function pop(s) {
	    return s.length ? s.pop() + " " : "";
	  }

	  function translate(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push("translate(", null, pxComma, null, pxParen);
	      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
	    } else if (xb || yb) {
	      s.push("translate(" + xb + pxComma + yb + pxParen);
	    }
	  }

	  function rotate(a, b, s, q) {
	    if (a !== b) {
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
	      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "rotate(" + b + degParen);
	    }
	  }

	  function skewX(a, b, s, q) {
	    if (a !== b) {
	      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
	    } else if (b) {
	      s.push(pop(s) + "skewX(" + b + degParen);
	    }
	  }

	  function scale(xa, ya, xb, yb, s, q) {
	    if (xa !== xb || ya !== yb) {
	      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
	      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
	    } else if (xb !== 1 || yb !== 1) {
	      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
	    }
	  }

	  return function(a, b) {
	    var s = [], // string constants and placeholders
	        q = []; // number interpolators
	    a = parse(a), b = parse(b);
	    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
	    rotate(a.rotate, b.rotate, s, q);
	    skewX(a.skewX, b.skewX, s, q);
	    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
	    a = b = null; // gc
	    return function(t) {
	      var i = -1, n = q.length, o;
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}

	var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
	var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

	var frame = 0, // is an animation frame pending?
	    timeout$1 = 0, // is a timeout pending?
	    interval = 0, // are any timers active?
	    pokeDelay = 1000, // how frequently we check for clock skew
	    taskHead,
	    taskTail,
	    clockLast = 0,
	    clockNow = 0,
	    clockSkew = 0,
	    clock = typeof performance === "object" && performance.now ? performance : Date,
	    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

	function now() {
	  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
	}

	function clearNow() {
	  clockNow = 0;
	}

	function Timer() {
	  this._call =
	  this._time =
	  this._next = null;
	}

	Timer.prototype = timer.prototype = {
	  constructor: Timer,
	  restart: function(callback, delay, time) {
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
	      taskTail = this;
	    }
	    this._call = callback;
	    this._time = time;
	    sleep();
	  },
	  stop: function() {
	    if (this._call) {
	      this._call = null;
	      this._time = Infinity;
	      sleep();
	    }
	  }
	};

	function timer(callback, delay, time) {
	  var t = new Timer;
	  t.restart(callback, delay, time);
	  return t;
	}

	function timerFlush() {
	  now(); // Get the current time, if not already set.
	  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
	  var t = taskHead, e;
	  while (t) {
	    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
	    t = t._next;
	  }
	  --frame;
	}

	function wake() {
	  clockNow = (clockLast = clock.now()) + clockSkew;
	  frame = timeout$1 = 0;
	  try {
	    timerFlush();
	  } finally {
	    frame = 0;
	    nap();
	    clockNow = 0;
	  }
	}

	function poke() {
	  var now = clock.now(), delay = now - clockLast;
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}

	function nap() {
	  var t0, t1 = taskHead, t2, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t0 = t1, t1 = t1._next;
	    } else {
	      t2 = t1._next, t1._next = null;
	      t1 = t0 ? t0._next = t2 : taskHead = t2;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}

	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
	  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
	  if (delay > 24) {
	    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}

	function timeout(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(elapsed => {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	}

	var emptyOn = dispatch("start", "end", "cancel", "interrupt");
	var emptyTween = [];

	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var RUNNING = 4;
	var ENDING = 5;
	var ENDED = 6;

	function schedule(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
	  create(node, id, {
	    name: name,
	    index: index, // For context during callback.
	    group: group, // For context during callback.
	    on: emptyOn,
	    tween: emptyTween,
	    time: timing.time,
	    delay: timing.delay,
	    duration: timing.duration,
	    ease: timing.ease,
	    timer: null,
	    state: CREATED
	  });
	}

	function init(node, id) {
	  var schedule = get(node, id);
	  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
	  return schedule;
	}

	function set(node, id) {
	  var schedule = get(node, id);
	  if (schedule.state > STARTED) throw new Error("too late; already running");
	  return schedule;
	}

	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
	  return schedule;
	}

	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;

	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = timer(schedule, 0, self.time);

	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    self.timer.restart(start, self.delay, self.time);

	    // If the elapsed delay is less than our first sleep, start immediately.
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	  }

	  function start(elapsed) {
	    var i, j, n, o;

	    // If the state is not SCHEDULED, then we previously errored on start.
	    if (self.state !== SCHEDULED) return stop();

	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;

	      // While this element already has a starting transition during this frame,
	      // defer starting an interrupting transition until that transition has a
	      // chance to tick (and possibly end); see d3/d3-transition#54!
	      if (o.state === STARTED) return timeout(start);

	      // Interrupt the active transition, if any.
	      if (o.state === RUNNING) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("interrupt", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }

	      // Cancel any pre-empted transitions.
	      else if (+i < id) {
	        o.state = ENDED;
	        o.timer.stop();
	        o.on.call("cancel", node, node.__data__, o.index, o.group);
	        delete schedules[i];
	      }
	    }

	    // Defer the first tick to end of the current frame; see d3/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    timeout(function() {
	      if (self.state === STARTED) {
	        self.state = RUNNING;
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });

	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
	    self.state = STARTED;

	    // Initialize the tween, deleting null tween.
	    tween = new Array(n = self.tween.length);
	    for (i = 0, j = -1; i < n; ++i) {
	      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
	        tween[++j] = o;
	      }
	    }
	    tween.length = j + 1;
	  }

	  function tick(elapsed) {
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;

	    while (++i < n) {
	      tween[i].call(node, t);
	    }

	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      stop();
	    }
	  }

	  function stop() {
	    self.state = ENDED;
	    self.timer.stop();
	    delete schedules[id];
	    for (var i in schedules) return; // eslint-disable-line no-unused-vars
	    delete node.__transition;
	  }
	}

	function interrupt(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;

	  if (!schedules) return;

	  name = name == null ? null : name + "";

	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state > STARTING && schedule.state < ENDING;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }

	  if (empty) delete node.__transition;
	}

	function selection_interrupt(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	}

	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = tween0 = tween;
	      for (var i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1 = tween1.slice();
	          tween1.splice(i, 1);
	          break;
	        }
	      }
	    }

	    schedule.tween = tween1;
	  };
	}

	function tweenFunction(id, name, value) {
	  var tween0, tween1;
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set(this, id),
	        tween = schedule.tween;

	    // If this node shared tween with the previous node,
	    // just assign the updated shared tween and we’re done!
	    // Otherwise, copy-on-write.
	    if (tween !== tween0) {
	      tween1 = (tween0 = tween).slice();
	      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
	        if (tween1[i].name === name) {
	          tween1[i] = t;
	          break;
	        }
	      }
	      if (i === n) tween1.push(t);
	    }

	    schedule.tween = tween1;
	  };
	}

	function transition_tween(name, value) {
	  var id = this._id;

	  name += "";

	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
	    for (var i = 0, n = tween.length, t; i < n; ++i) {
	      if ((t = tween[i]).name === name) {
	        return t.value;
	      }
	    }
	    return null;
	  }

	  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
	}

	function tweenValue(transition, name, value) {
	  var id = transition._id;

	  transition.each(function() {
	    var schedule = set(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });

	  return function(node) {
	    return get(node, id).value[name];
	  };
	}

	function interpolate(a, b) {
	  var c;
	  return (typeof b === "number" ? interpolateNumber
	      : b instanceof color ? interpolateRgb
	      : (c = color(b)) ? (b = c, interpolateRgb)
	      : interpolateString)(a, b);
	}

	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, interpolate, value1) {
	  var string00,
	      string1 = value1 + "",
	      interpolate0;
	  return function() {
	    var string0 = this.getAttribute(name);
	    return string0 === string1 ? null
	        : string0 === string00 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, value1);
	  };
	}

	function attrConstantNS(fullname, interpolate, value1) {
	  var string00,
	      string1 = value1 + "",
	      interpolate0;
	  return function() {
	    var string0 = this.getAttributeNS(fullname.space, fullname.local);
	    return string0 === string1 ? null
	        : string0 === string00 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, value1);
	  };
	}

	function attrFunction(name, interpolate, value) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0, value1 = value(this), string1;
	    if (value1 == null) return void this.removeAttribute(name);
	    string0 = this.getAttribute(name);
	    string1 = value1 + "";
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	  };
	}

	function attrFunctionNS(fullname, interpolate, value) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0, value1 = value(this), string1;
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    string0 = this.getAttributeNS(fullname.space, fullname.local);
	    string1 = value1 + "";
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	  };
	}

	function transition_attr(name, value) {
	  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
	      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
	}

	function attrInterpolate(name, i) {
	  return function(t) {
	    this.setAttribute(name, i.call(this, t));
	  };
	}

	function attrInterpolateNS(fullname, i) {
	  return function(t) {
	    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
	  };
	}

	function attrTweenNS(fullname, value) {
	  var t0, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
	    return t0;
	  }
	  tween._value = value;
	  return tween;
	}

	function attrTween(name, value) {
	  var t0, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
	    return t0;
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_attrTween(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = namespace(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	}

	function delayFunction(id, value) {
	  return function() {
	    init(this, id).delay = +value.apply(this, arguments);
	  };
	}

	function delayConstant(id, value) {
	  return value = +value, function() {
	    init(this, id).delay = value;
	  };
	}

	function transition_delay(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	}

	function durationFunction(id, value) {
	  return function() {
	    set(this, id).duration = +value.apply(this, arguments);
	  };
	}

	function durationConstant(id, value) {
	  return value = +value, function() {
	    set(this, id).duration = value;
	  };
	}

	function transition_duration(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	}

	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set(this, id).ease = value;
	  };
	}

	function transition_ease(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	}

	function easeVarying(id, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (typeof v !== "function") throw new Error;
	    set(this, id).ease = v;
	  };
	}

	function transition_easeVarying(value) {
	  if (typeof value !== "function") throw new Error;
	  return this.each(easeVarying(this._id, value));
	}

	function transition_filter(match) {
	  if (typeof match !== "function") match = matcher(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, this._name, this._id);
	}

	function transition_merge(transition) {
	  if (transition._id !== this._id) throw new Error;

	  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Transition(merges, this._parents, this._name, this._id);
	}

	function start(name) {
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}

	function onFunction(id, name, listener) {
	  var on0, on1, sit = start(name) ? init : set;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

	    schedule.on = on1;
	  };
	}

	function transition_on(name, listener) {
	  var id = this._id;

	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	}

	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}

	function transition_remove() {
	  return this.on("end.remove", removeFunction(this._id));
	}

	function transition_select(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, name, id);
	}

	function transition_selectAll(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
	          if (child = children[k]) {
	            schedule(child, name, id, k, children, inherit);
	          }
	        }
	        subgroups.push(children);
	        parents.push(node);
	      }
	    }
	  }

	  return new Transition(subgroups, parents, name, id);
	}

	var Selection = selection.prototype.constructor;

	function transition_selection() {
	  return new Selection(this._groups, this._parents);
	}

	function styleNull(name, interpolate) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0 = styleValue(this, name),
	        string1 = (this.style.removeProperty(name), styleValue(this, name));
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, string10 = string1);
	  };
	}

	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant(name, interpolate, value1) {
	  var string00,
	      string1 = value1 + "",
	      interpolate0;
	  return function() {
	    var string0 = styleValue(this, name);
	    return string0 === string1 ? null
	        : string0 === string00 ? interpolate0
	        : interpolate0 = interpolate(string00 = string0, value1);
	  };
	}

	function styleFunction(name, interpolate, value) {
	  var string00,
	      string10,
	      interpolate0;
	  return function() {
	    var string0 = styleValue(this, name),
	        value1 = value(this),
	        string1 = value1 + "";
	    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
	    return string0 === string1 ? null
	        : string0 === string00 && string1 === string10 ? interpolate0
	        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
	  };
	}

	function styleMaybeRemove(id, name) {
	  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
	  return function() {
	    var schedule = set(this, id),
	        on = schedule.on,
	        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

	    schedule.on = on1;
	  };
	}

	function transition_style(name, value, priority) {
	  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
	  return value == null ? this
	      .styleTween(name, styleNull(name, i))
	      .on("end.style." + name, styleRemove(name))
	    : typeof value === "function" ? this
	      .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
	      .each(styleMaybeRemove(this._id, name))
	    : this
	      .styleTween(name, styleConstant(name, i, value), priority)
	      .on("end.style." + name, null);
	}

	function styleInterpolate(name, i, priority) {
	  return function(t) {
	    this.style.setProperty(name, i.call(this, t), priority);
	  };
	}

	function styleTween(name, value, priority) {
	  var t, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
	    return t;
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_styleTween(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	}

	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}

	function transition_text(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction(tweenValue(this, "text", value))
	      : textConstant(value == null ? "" : value + ""));
	}

	function textInterpolate(i) {
	  return function(t) {
	    this.textContent = i.call(this, t);
	  };
	}

	function textTween(value) {
	  var t0, i0;
	  function tween() {
	    var i = value.apply(this, arguments);
	    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
	    return t0;
	  }
	  tween._value = value;
	  return tween;
	}

	function transition_textTween(value) {
	  var key = "text";
	  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, textTween(value));
	}

	function transition_transition() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
	        schedule(node, name, id1, i, group, {
	          time: inherit.time + inherit.delay + inherit.duration,
	          delay: 0,
	          duration: inherit.duration,
	          ease: inherit.ease
	        });
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id1);
	}

	function transition_end() {
	  var on0, on1, that = this, id = that._id, size = that.size();
	  return new Promise(function(resolve, reject) {
	    var cancel = {value: reject},
	        end = {value: function() { if (--size === 0) resolve(); }};

	    that.each(function() {
	      var schedule = set(this, id),
	          on = schedule.on;

	      // If this node shared a dispatch with the previous node,
	      // just assign the updated shared dispatch and we’re done!
	      // Otherwise, copy-on-write.
	      if (on !== on0) {
	        on1 = (on0 = on).copy();
	        on1._.cancel.push(cancel);
	        on1._.interrupt.push(cancel);
	        on1._.end.push(end);
	      }

	      schedule.on = on1;
	    });

	    // The selection was empty, resolve end immediately
	    if (size === 0) resolve();
	  });
	}

	var id = 0;

	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}

	function newId() {
	  return ++id;
	}

	var selection_prototype = selection.prototype;

	Transition.prototype = {
	  constructor: Transition,
	  select: transition_select,
	  selectAll: transition_selectAll,
	  selectChild: selection_prototype.selectChild,
	  selectChildren: selection_prototype.selectChildren,
	  filter: transition_filter,
	  merge: transition_merge,
	  selection: transition_selection,
	  transition: transition_transition,
	  call: selection_prototype.call,
	  nodes: selection_prototype.nodes,
	  node: selection_prototype.node,
	  size: selection_prototype.size,
	  empty: selection_prototype.empty,
	  each: selection_prototype.each,
	  on: transition_on,
	  attr: transition_attr,
	  attrTween: transition_attrTween,
	  style: transition_style,
	  styleTween: transition_styleTween,
	  text: transition_text,
	  textTween: transition_textTween,
	  remove: transition_remove,
	  tween: transition_tween,
	  delay: transition_delay,
	  duration: transition_duration,
	  ease: transition_ease,
	  easeVarying: transition_easeVarying,
	  end: transition_end,
	  [Symbol.iterator]: selection_prototype[Symbol.iterator]
	};

	function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	}

	var defaultTiming = {
	  time: null, // Set on use.
	  delay: 0,
	  duration: 250,
	  ease: cubicInOut
	};

	function inherit(node, id) {
	  var timing;
	  while (!(timing = node.__transition) || !(timing = timing[id])) {
	    if (!(node = node.parentNode)) {
	      throw new Error(`transition ${id} not found`);
	    }
	  }
	  return timing;
	}

	function selection_transition(name) {
	  var id,
	      timing;

	  if (name instanceof Transition) {
	    id = name._id, name = name._name;
	  } else {
	    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
	  }

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        schedule(node, name, id, i, group, timing || inherit(node, id));
	      }
	    }
	  }

	  return new Transition(groups, this._parents, name, id);
	}

	selection.prototype.interrupt = selection_interrupt;
	selection.prototype.transition = selection_transition;

	const pi$1 = Math.PI,
	    tau$1 = 2 * pi$1,
	    epsilon$1 = 1e-6,
	    tauEpsilon = tau$1 - epsilon$1;

	function Path() {
	  this._x0 = this._y0 = // start of current subpath
	  this._x1 = this._y1 = null; // end of current subpath
	  this._ = "";
	}

	function path() {
	  return new Path;
	}

	Path.prototype = path.prototype = {
	  constructor: Path,
	  moveTo: function(x, y) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
	  },
	  closePath: function() {
	    if (this._x1 !== null) {
	      this._x1 = this._x0, this._y1 = this._y0;
	      this._ += "Z";
	    }
	  },
	  lineTo: function(x, y) {
	    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  quadraticCurveTo: function(x1, y1, x, y) {
	    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
	    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
	  },
	  arcTo: function(x1, y1, x2, y2, r) {
	    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
	    var x0 = this._x1,
	        y0 = this._y1,
	        x21 = x2 - x1,
	        y21 = y2 - y1,
	        x01 = x0 - x1,
	        y01 = y0 - y1,
	        l01_2 = x01 * x01 + y01 * y01;

	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);

	    // Is this path empty? Move to (x1,y1).
	    if (this._x1 === null) {
	      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }

	    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
	    else if (!(l01_2 > epsilon$1));

	    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
	    // Equivalently, is (x1,y1) coincident with (x2,y2)?
	    // Or, is the radius zero? Line to (x1,y1).
	    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
	      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
	    }

	    // Otherwise, draw an arc!
	    else {
	      var x20 = x2 - x0,
	          y20 = y2 - y0,
	          l21_2 = x21 * x21 + y21 * y21,
	          l20_2 = x20 * x20 + y20 * y20,
	          l21 = Math.sqrt(l21_2),
	          l01 = Math.sqrt(l01_2),
	          l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
	          t01 = l / l01,
	          t21 = l / l21;

	      // If the start tangent is not coincident with (x0,y0), line to.
	      if (Math.abs(t01 - 1) > epsilon$1) {
	        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
	      }

	      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
	    }
	  },
	  arc: function(x, y, r, a0, a1, ccw) {
	    x = +x, y = +y, r = +r, ccw = !!ccw;
	    var dx = r * Math.cos(a0),
	        dy = r * Math.sin(a0),
	        x0 = x + dx,
	        y0 = y + dy,
	        cw = 1 ^ ccw,
	        da = ccw ? a0 - a1 : a1 - a0;

	    // Is the radius negative? Error.
	    if (r < 0) throw new Error("negative radius: " + r);

	    // Is this path empty? Move to (x0,y0).
	    if (this._x1 === null) {
	      this._ += "M" + x0 + "," + y0;
	    }

	    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
	    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
	      this._ += "L" + x0 + "," + y0;
	    }

	    // Is this arc empty? We’re done.
	    if (!r) return;

	    // Does the angle go the wrong way? Flip the direction.
	    if (da < 0) da = da % tau$1 + tau$1;

	    // Is this a complete circle? Draw two arcs to complete the circle.
	    if (da > tauEpsilon) {
	      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
	    }

	    // Is this arc non-empty? Draw an arc!
	    else if (da > epsilon$1) {
	      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$1)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
	    }
	  },
	  rect: function(x, y, w, h) {
	    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
	  },
	  toString: function() {
	    return this._;
	  }
	};

	function formatDecimal(x) {
	  return Math.abs(x = Math.round(x)) >= 1e21
	      ? x.toLocaleString("en").replace(/,/g, "")
	      : x.toString(10);
	}

	// Computes the decimal coefficient and exponent of the specified number x with
	// significant digits p, where x is positive and p is in [1, 21] or undefined.
	// For example, formatDecimalParts(1.23) returns ["123", 0].
	function formatDecimalParts(x, p) {
	  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
	  var i, coefficient = x.slice(0, i);

	  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
	  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
	  return [
	    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
	    +x.slice(i + 1)
	  ];
	}

	function exponent(x) {
	  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
	}

	function formatGroup(grouping, thousands) {
	  return function(value, width) {
	    var i = value.length,
	        t = [],
	        j = 0,
	        g = grouping[0],
	        length = 0;

	    while (i > 0 && g > 0) {
	      if (length + g + 1 > width) g = Math.max(1, width - length);
	      t.push(value.substring(i -= g, i + g));
	      if ((length += g + 1) > width) break;
	      g = grouping[j = (j + 1) % grouping.length];
	    }

	    return t.reverse().join(thousands);
	  };
	}

	function formatNumerals(numerals) {
	  return function(value) {
	    return value.replace(/[0-9]/g, function(i) {
	      return numerals[+i];
	    });
	  };
	}

	// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
	var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

	function formatSpecifier(specifier) {
	  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
	  var match;
	  return new FormatSpecifier({
	    fill: match[1],
	    align: match[2],
	    sign: match[3],
	    symbol: match[4],
	    zero: match[5],
	    width: match[6],
	    comma: match[7],
	    precision: match[8] && match[8].slice(1),
	    trim: match[9],
	    type: match[10]
	  });
	}

	formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

	function FormatSpecifier(specifier) {
	  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
	  this.align = specifier.align === undefined ? ">" : specifier.align + "";
	  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
	  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
	  this.zero = !!specifier.zero;
	  this.width = specifier.width === undefined ? undefined : +specifier.width;
	  this.comma = !!specifier.comma;
	  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
	  this.trim = !!specifier.trim;
	  this.type = specifier.type === undefined ? "" : specifier.type + "";
	}

	FormatSpecifier.prototype.toString = function() {
	  return this.fill
	      + this.align
	      + this.sign
	      + this.symbol
	      + (this.zero ? "0" : "")
	      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
	      + (this.comma ? "," : "")
	      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
	      + (this.trim ? "~" : "")
	      + this.type;
	};

	// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
	function formatTrim(s) {
	  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
	    switch (s[i]) {
	      case ".": i0 = i1 = i; break;
	      case "0": if (i0 === 0) i0 = i; i1 = i; break;
	      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
	    }
	  }
	  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
	}

	var prefixExponent;

	function formatPrefixAuto(x, p) {
	  var d = formatDecimalParts(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1],
	      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
	      n = coefficient.length;
	  return i === n ? coefficient
	      : i > n ? coefficient + new Array(i - n + 1).join("0")
	      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
	      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
	}

	function formatRounded(x, p) {
	  var d = formatDecimalParts(x, p);
	  if (!d) return x + "";
	  var coefficient = d[0],
	      exponent = d[1];
	  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
	      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
	      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
	}

	var formatTypes = {
	  "%": (x, p) => (x * 100).toFixed(p),
	  "b": (x) => Math.round(x).toString(2),
	  "c": (x) => x + "",
	  "d": formatDecimal,
	  "e": (x, p) => x.toExponential(p),
	  "f": (x, p) => x.toFixed(p),
	  "g": (x, p) => x.toPrecision(p),
	  "o": (x) => Math.round(x).toString(8),
	  "p": (x, p) => formatRounded(x * 100, p),
	  "r": formatRounded,
	  "s": formatPrefixAuto,
	  "X": (x) => Math.round(x).toString(16).toUpperCase(),
	  "x": (x) => Math.round(x).toString(16)
	};

	function identity$2(x) {
	  return x;
	}

	var map$1 = Array.prototype.map,
	    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

	function formatLocale(locale) {
	  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$2 : formatGroup(map$1.call(locale.grouping, Number), locale.thousands + ""),
	      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
	      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
	      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
	      numerals = locale.numerals === undefined ? identity$2 : formatNumerals(map$1.call(locale.numerals, String)),
	      percent = locale.percent === undefined ? "%" : locale.percent + "",
	      minus = locale.minus === undefined ? "−" : locale.minus + "",
	      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

	  function newFormat(specifier) {
	    specifier = formatSpecifier(specifier);

	    var fill = specifier.fill,
	        align = specifier.align,
	        sign = specifier.sign,
	        symbol = specifier.symbol,
	        zero = specifier.zero,
	        width = specifier.width,
	        comma = specifier.comma,
	        precision = specifier.precision,
	        trim = specifier.trim,
	        type = specifier.type;

	    // The "n" type is an alias for ",g".
	    if (type === "n") comma = true, type = "g";

	    // The "" type, and any invalid type, is an alias for ".12~g".
	    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

	    // If zero fill is specified, padding goes after sign and before digits.
	    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

	    // Compute the prefix and suffix.
	    // For SI-prefix, the suffix is lazily computed.
	    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
	        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

	    // What format function should we use?
	    // Is this an integer type?
	    // Can this type generate exponential notation?
	    var formatType = formatTypes[type],
	        maybeSuffix = /[defgprs%]/.test(type);

	    // Set the default precision if not specified,
	    // or clamp the specified precision to the supported range.
	    // For significant precision, it must be in [1, 21].
	    // For fixed precision, it must be in [0, 20].
	    precision = precision === undefined ? 6
	        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
	        : Math.max(0, Math.min(20, precision));

	    function format(value) {
	      var valuePrefix = prefix,
	          valueSuffix = suffix,
	          i, n, c;

	      if (type === "c") {
	        valueSuffix = formatType(value) + valueSuffix;
	        value = "";
	      } else {
	        value = +value;

	        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
	        var valueNegative = value < 0 || 1 / value < 0;

	        // Perform the initial formatting.
	        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

	        // Trim insignificant zeros.
	        if (trim) value = formatTrim(value);

	        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
	        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

	        // Compute the prefix and suffix.
	        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
	        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

	        // Break the formatted value into the integer “value” part that can be
	        // grouped, and fractional or exponential “suffix” part that is not.
	        if (maybeSuffix) {
	          i = -1, n = value.length;
	          while (++i < n) {
	            if (c = value.charCodeAt(i), 48 > c || c > 57) {
	              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
	              value = value.slice(0, i);
	              break;
	            }
	          }
	        }
	      }

	      // If the fill character is not "0", grouping is applied before padding.
	      if (comma && !zero) value = group(value, Infinity);

	      // Compute the padding.
	      var length = valuePrefix.length + value.length + valueSuffix.length,
	          padding = length < width ? new Array(width - length + 1).join(fill) : "";

	      // If the fill character is "0", grouping is applied after padding.
	      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

	      // Reconstruct the final output based on the desired alignment.
	      switch (align) {
	        case "<": value = valuePrefix + value + valueSuffix + padding; break;
	        case "=": value = valuePrefix + padding + value + valueSuffix; break;
	        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
	        default: value = padding + valuePrefix + value + valueSuffix; break;
	      }

	      return numerals(value);
	    }

	    format.toString = function() {
	      return specifier + "";
	    };

	    return format;
	  }

	  function formatPrefix(specifier, value) {
	    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
	        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
	        k = Math.pow(10, -e),
	        prefix = prefixes[8 + e / 3];
	    return function(value) {
	      return f(k * value) + prefix;
	    };
	  }

	  return {
	    format: newFormat,
	    formatPrefix: formatPrefix
	  };
	}

	var locale;
	var format;
	var formatPrefix;

	defaultLocale({
	  thousands: ",",
	  grouping: [3],
	  currency: ["$", ""]
	});

	function defaultLocale(definition) {
	  locale = formatLocale(definition);
	  format = locale.format;
	  formatPrefix = locale.formatPrefix;
	  return locale;
	}

	function precisionFixed(step) {
	  return Math.max(0, -exponent(Math.abs(step)));
	}

	function precisionPrefix(step, value) {
	  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
	}

	function precisionRound(step, max) {
	  step = Math.abs(step), max = Math.abs(max) - step;
	  return Math.max(0, exponent(max) - exponent(step)) + 1;
	}

	function initRange(domain, range) {
	  switch (arguments.length) {
	    case 0: break;
	    case 1: this.range(domain); break;
	    default: this.range(range).domain(domain); break;
	  }
	  return this;
	}

	const implicit = Symbol("implicit");

	function ordinal() {
	  var index = new InternMap(),
	      domain = [],
	      range = [],
	      unknown = implicit;

	  function scale(d) {
	    let i = index.get(d);
	    if (i === undefined) {
	      if (unknown !== implicit) return unknown;
	      index.set(d, i = domain.push(d) - 1);
	    }
	    return range[i % range.length];
	  }

	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [], index = new InternMap();
	    for (const value of _) {
	      if (index.has(value)) continue;
	      index.set(value, domain.push(value) - 1);
	    }
	    return scale;
	  };

	  scale.range = function(_) {
	    return arguments.length ? (range = Array.from(_), scale) : range.slice();
	  };

	  scale.unknown = function(_) {
	    return arguments.length ? (unknown = _, scale) : unknown;
	  };

	  scale.copy = function() {
	    return ordinal(domain, range).unknown(unknown);
	  };

	  initRange.apply(scale, arguments);

	  return scale;
	}

	function band() {
	  var scale = ordinal().unknown(undefined),
	      domain = scale.domain,
	      ordinalRange = scale.range,
	      r0 = 0,
	      r1 = 1,
	      step,
	      bandwidth,
	      round = false,
	      paddingInner = 0,
	      paddingOuter = 0,
	      align = 0.5;

	  delete scale.unknown;

	  function rescale() {
	    var n = domain().length,
	        reverse = r1 < r0,
	        start = reverse ? r1 : r0,
	        stop = reverse ? r0 : r1;
	    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
	    if (round) step = Math.floor(step);
	    start += (stop - start - step * (n - paddingInner)) * align;
	    bandwidth = step * (1 - paddingInner);
	    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
	    var values = sequence(n).map(function(i) { return start + step * i; });
	    return ordinalRange(reverse ? values.reverse() : values);
	  }

	  scale.domain = function(_) {
	    return arguments.length ? (domain(_), rescale()) : domain();
	  };

	  scale.range = function(_) {
	    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
	  };

	  scale.rangeRound = function(_) {
	    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
	  };

	  scale.bandwidth = function() {
	    return bandwidth;
	  };

	  scale.step = function() {
	    return step;
	  };

	  scale.round = function(_) {
	    return arguments.length ? (round = !!_, rescale()) : round;
	  };

	  scale.padding = function(_) {
	    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
	  };

	  scale.paddingInner = function(_) {
	    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
	  };

	  scale.paddingOuter = function(_) {
	    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
	  };

	  scale.align = function(_) {
	    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
	  };

	  scale.copy = function() {
	    return band(domain(), [r0, r1])
	        .round(round)
	        .paddingInner(paddingInner)
	        .paddingOuter(paddingOuter)
	        .align(align);
	  };

	  return initRange.apply(rescale(), arguments);
	}

	function constants(x) {
	  return function() {
	    return x;
	  };
	}

	function number(x) {
	  return +x;
	}

	var unit = [0, 1];

	function identity$1(x) {
	  return x;
	}

	function normalize(a, b) {
	  return (b -= (a = +a))
	      ? function(x) { return (x - a) / b; }
	      : constants(isNaN(b) ? NaN : 0.5);
	}

	function clamper(a, b) {
	  var t;
	  if (a > b) t = a, a = b, b = t;
	  return function(x) { return Math.max(a, Math.min(b, x)); };
	}

	// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
	// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
	function bimap(domain, range, interpolate) {
	  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
	  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
	  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
	  return function(x) { return r0(d0(x)); };
	}

	function polymap(domain, range, interpolate) {
	  var j = Math.min(domain.length, range.length) - 1,
	      d = new Array(j),
	      r = new Array(j),
	      i = -1;

	  // Reverse descending domains.
	  if (domain[j] < domain[0]) {
	    domain = domain.slice().reverse();
	    range = range.slice().reverse();
	  }

	  while (++i < j) {
	    d[i] = normalize(domain[i], domain[i + 1]);
	    r[i] = interpolate(range[i], range[i + 1]);
	  }

	  return function(x) {
	    var i = bisectRight(domain, x, 1, j) - 1;
	    return r[i](d[i](x));
	  };
	}

	function copy(source, target) {
	  return target
	      .domain(source.domain())
	      .range(source.range())
	      .interpolate(source.interpolate())
	      .clamp(source.clamp())
	      .unknown(source.unknown());
	}

	function transformer() {
	  var domain = unit,
	      range = unit,
	      interpolate = interpolate$1,
	      transform,
	      untransform,
	      unknown,
	      clamp = identity$1,
	      piecewise,
	      output,
	      input;

	  function rescale() {
	    var n = Math.min(domain.length, range.length);
	    if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
	    piecewise = n > 2 ? polymap : bimap;
	    output = input = null;
	    return scale;
	  }

	  function scale(x) {
	    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
	  }

	  scale.invert = function(y) {
	    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
	  };

	  scale.domain = function(_) {
	    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
	  };

	  scale.range = function(_) {
	    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
	  };

	  scale.rangeRound = function(_) {
	    return range = Array.from(_), interpolate = interpolateRound, rescale();
	  };

	  scale.clamp = function(_) {
	    return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
	  };

	  scale.interpolate = function(_) {
	    return arguments.length ? (interpolate = _, rescale()) : interpolate;
	  };

	  scale.unknown = function(_) {
	    return arguments.length ? (unknown = _, scale) : unknown;
	  };

	  return function(t, u) {
	    transform = t, untransform = u;
	    return rescale();
	  };
	}

	function continuous() {
	  return transformer()(identity$1, identity$1);
	}

	function tickFormat(start, stop, count, specifier) {
	  var step = tickStep(start, stop, count),
	      precision;
	  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
	  switch (specifier.type) {
	    case "s": {
	      var value = Math.max(Math.abs(start), Math.abs(stop));
	      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
	      return formatPrefix(specifier, value);
	    }
	    case "":
	    case "e":
	    case "g":
	    case "p":
	    case "r": {
	      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
	      break;
	    }
	    case "f":
	    case "%": {
	      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
	      break;
	    }
	  }
	  return format(specifier);
	}

	function linearish(scale) {
	  var domain = scale.domain;

	  scale.ticks = function(count) {
	    var d = domain();
	    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
	  };

	  scale.tickFormat = function(count, specifier) {
	    var d = domain();
	    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
	  };

	  scale.nice = function(count) {
	    if (count == null) count = 10;

	    var d = domain();
	    var i0 = 0;
	    var i1 = d.length - 1;
	    var start = d[i0];
	    var stop = d[i1];
	    var prestep;
	    var step;
	    var maxIter = 10;

	    if (stop < start) {
	      step = start, start = stop, stop = step;
	      step = i0, i0 = i1, i1 = step;
	    }
	    
	    while (maxIter-- > 0) {
	      step = tickIncrement(start, stop, count);
	      if (step === prestep) {
	        d[i0] = start;
	        d[i1] = stop;
	        return domain(d);
	      } else if (step > 0) {
	        start = Math.floor(start / step) * step;
	        stop = Math.ceil(stop / step) * step;
	      } else if (step < 0) {
	        start = Math.ceil(start * step) / step;
	        stop = Math.floor(stop * step) / step;
	      } else {
	        break;
	      }
	      prestep = step;
	    }

	    return scale;
	  };

	  return scale;
	}

	function linear() {
	  var scale = continuous();

	  scale.copy = function() {
	    return copy(scale, linear());
	  };

	  initRange.apply(scale, arguments);

	  return linearish(scale);
	}

	function constant(x) {
	  return function constant() {
	    return x;
	  };
	}

	var abs = Math.abs;
	var atan2 = Math.atan2;
	var cos = Math.cos;
	var max = Math.max;
	var min = Math.min;
	var sin = Math.sin;
	var sqrt = Math.sqrt;

	var epsilon = 1e-12;
	var pi = Math.PI;
	var halfPi = pi / 2;
	var tau = 2 * pi;

	function acos(x) {
	  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
	}

	function asin(x) {
	  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
	}

	function arcInnerRadius(d) {
	  return d.innerRadius;
	}

	function arcOuterRadius(d) {
	  return d.outerRadius;
	}

	function arcStartAngle(d) {
	  return d.startAngle;
	}

	function arcEndAngle(d) {
	  return d.endAngle;
	}

	function arcPadAngle(d) {
	  return d && d.padAngle; // Note: optional!
	}

	function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var x10 = x1 - x0, y10 = y1 - y0,
	      x32 = x3 - x2, y32 = y3 - y2,
	      t = y32 * x10 - x32 * y10;
	  if (t * t < epsilon) return;
	  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
	  return [x0 + t * x10, y0 + t * y10];
	}

	// Compute perpendicular offset line of length rc.
	// http://mathworld.wolfram.com/Circle-LineIntersection.html
	function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
	  var x01 = x0 - x1,
	      y01 = y0 - y1,
	      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
	      ox = lo * y01,
	      oy = -lo * x01,
	      x11 = x0 + ox,
	      y11 = y0 + oy,
	      x10 = x1 + ox,
	      y10 = y1 + oy,
	      x00 = (x11 + x10) / 2,
	      y00 = (y11 + y10) / 2,
	      dx = x10 - x11,
	      dy = y10 - y11,
	      d2 = dx * dx + dy * dy,
	      r = r1 - rc,
	      D = x11 * y10 - x10 * y11,
	      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
	      cx0 = (D * dy - dx * d) / d2,
	      cy0 = (-D * dx - dy * d) / d2,
	      cx1 = (D * dy + dx * d) / d2,
	      cy1 = (-D * dx + dy * d) / d2,
	      dx0 = cx0 - x00,
	      dy0 = cy0 - y00,
	      dx1 = cx1 - x00,
	      dy1 = cy1 - y00;

	  // Pick the closer of the two intersection points.
	  // TODO Is there a faster way to determine which intersection to use?
	  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

	  return {
	    cx: cx0,
	    cy: cy0,
	    x01: -ox,
	    y01: -oy,
	    x11: cx0 * (r1 / r - 1),
	    y11: cy0 * (r1 / r - 1)
	  };
	}

	function arc() {
	  var innerRadius = arcInnerRadius,
	      outerRadius = arcOuterRadius,
	      cornerRadius = constant(0),
	      padRadius = null,
	      startAngle = arcStartAngle,
	      endAngle = arcEndAngle,
	      padAngle = arcPadAngle,
	      context = null;

	  function arc() {
	    var buffer,
	        r,
	        r0 = +innerRadius.apply(this, arguments),
	        r1 = +outerRadius.apply(this, arguments),
	        a0 = startAngle.apply(this, arguments) - halfPi,
	        a1 = endAngle.apply(this, arguments) - halfPi,
	        da = abs(a1 - a0),
	        cw = a1 > a0;

	    if (!context) context = buffer = path();

	    // Ensure that the outer radius is always larger than the inner radius.
	    if (r1 < r0) r = r1, r1 = r0, r0 = r;

	    // Is it a point?
	    if (!(r1 > epsilon)) context.moveTo(0, 0);

	    // Or is it a circle or annulus?
	    else if (da > tau - epsilon) {
	      context.moveTo(r1 * cos(a0), r1 * sin(a0));
	      context.arc(0, 0, r1, a0, a1, !cw);
	      if (r0 > epsilon) {
	        context.moveTo(r0 * cos(a1), r0 * sin(a1));
	        context.arc(0, 0, r0, a1, a0, cw);
	      }
	    }

	    // Or is it a circular or annular sector?
	    else {
	      var a01 = a0,
	          a11 = a1,
	          a00 = a0,
	          a10 = a1,
	          da0 = da,
	          da1 = da,
	          ap = padAngle.apply(this, arguments) / 2,
	          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
	          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
	          rc0 = rc,
	          rc1 = rc,
	          t0,
	          t1;

	      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
	      if (rp > epsilon) {
	        var p0 = asin(rp / r0 * sin(ap)),
	            p1 = asin(rp / r1 * sin(ap));
	        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
	        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
	        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
	        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
	      }

	      var x01 = r1 * cos(a01),
	          y01 = r1 * sin(a01),
	          x10 = r0 * cos(a10),
	          y10 = r0 * sin(a10);

	      // Apply rounded corners?
	      if (rc > epsilon) {
	        var x11 = r1 * cos(a11),
	            y11 = r1 * sin(a11),
	            x00 = r0 * cos(a00),
	            y00 = r0 * sin(a00),
	            oc;

	        // Restrict the corner radius according to the sector angle.
	        if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
	          var ax = x01 - oc[0],
	              ay = y01 - oc[1],
	              bx = x11 - oc[0],
	              by = y11 - oc[1],
	              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
	              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
	          rc0 = min(rc, (r0 - lc) / (kc - 1));
	          rc1 = min(rc, (r1 - lc) / (kc + 1));
	        }
	      }

	      // Is the sector collapsed to a line?
	      if (!(da1 > epsilon)) context.moveTo(x01, y01);

	      // Does the sector’s outer ring have rounded corners?
	      else if (rc1 > epsilon) {
	        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
	        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

	        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

	        // Have the corners merged?
	        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
	          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
	        }
	      }

	      // Or is the outer ring just a circular arc?
	      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

	      // Is there no inner ring, and it’s a circular sector?
	      // Or perhaps it’s an annular sector collapsed due to padding?
	      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

	      // Does the sector’s inner ring (or point) have rounded corners?
	      else if (rc0 > epsilon) {
	        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
	        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

	        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

	        // Have the corners merged?
	        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

	        // Otherwise, draw the two corners and the ring.
	        else {
	          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
	          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
	          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
	        }
	      }

	      // Or is the inner ring just a circular arc?
	      else context.arc(0, 0, r0, a10, a00, cw);
	    }

	    context.closePath();

	    if (buffer) return context = null, buffer + "" || null;
	  }

	  arc.centroid = function() {
	    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
	        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
	    return [cos(a) * r, sin(a) * r];
	  };

	  arc.innerRadius = function(_) {
	    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
	  };

	  arc.outerRadius = function(_) {
	    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
	  };

	  arc.cornerRadius = function(_) {
	    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
	  };

	  arc.padRadius = function(_) {
	    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
	  };

	  arc.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
	  };

	  arc.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
	  };

	  arc.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
	  };

	  arc.context = function(_) {
	    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
	  };

	  return arc;
	}

	function array(x) {
	  return typeof x === "object" && "length" in x
	    ? x // Array, TypedArray, NodeList, array-like
	    : Array.from(x); // Map, Set, iterable, string, or anything else
	}

	function descending(a, b) {
	  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
	}

	function identity(d) {
	  return d;
	}

	function pie() {
	  var value = identity,
	      sortValues = descending,
	      sort = null,
	      startAngle = constant(0),
	      endAngle = constant(tau),
	      padAngle = constant(0);

	  function pie(data) {
	    var i,
	        n = (data = array(data)).length,
	        j,
	        k,
	        sum = 0,
	        index = new Array(n),
	        arcs = new Array(n),
	        a0 = +startAngle.apply(this, arguments),
	        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
	        a1,
	        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
	        pa = p * (da < 0 ? -1 : 1),
	        v;

	    for (i = 0; i < n; ++i) {
	      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
	        sum += v;
	      }
	    }

	    // Optionally sort the arcs by previously-computed values or by data.
	    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
	    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

	    // Compute the arcs! They are stored in the original data's order.
	    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
	      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
	        data: data[j],
	        index: i,
	        value: v,
	        startAngle: a0,
	        endAngle: a1,
	        padAngle: p
	      };
	    }

	    return arcs;
	  }

	  pie.value = function(_) {
	    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
	  };

	  pie.sortValues = function(_) {
	    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
	  };

	  pie.sort = function(_) {
	    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
	  };

	  pie.startAngle = function(_) {
	    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
	  };

	  pie.endAngle = function(_) {
	    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
	  };

	  pie.padAngle = function(_) {
	    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
	  };

	  return pie;
	}

	//const map = L.map('map').setView([45.62218251898255, 9.284766257898681], 14)

	const map = leafletSrc.map('map').setView([15, 0], 3);
	var f1DataLive;
	var result;
	var multipolygon;
	var circuitID;
	var loc;

	var layerGroup;
	var myStyle = {
	  "color": "red",
	  "weight": 8,
	  "opacity": 0.65
	};
	var slider = document.getElementById("myRange");
	//output.innerHTML = slider.value; // Display the default slider value
	var year = 2021;
	document.getElementById("year").textContent = year;
	// Update the current slider value (each time you drag the slider handle)
	slider.onchange = function () {

	  //map.removeLayer();
	  //const map = L.map('map')


	  map.removeLayer(layerGroup);
	  map.eachLayer(function (layer) {
	    if (layer instanceof leafletSrc.GeoJSON) {
	      map.removeLayer(layer);

	    }
	    //console.log(layer);


	  });
	  year = this.value;
	  console.log("Changed !");


	  fetchData();
	  fetchDataResults();
	  addMarker();


	};
	slider.oninput = function () {

	  //map.removeLayer();
	  //const map = L.map('map')


	  year = this.value;
	  console.log(year);
	  document.getElementById("year").textContent = year;

	  //fetchData();
	  //fetchDataResults()



	};

	function fetchData() {

	  fetch("https://ergast.com/api/f1/" + year + "/circuits.json?limit=100")
	    .then(r => r.json())
	    .then(data => f1DataLive = data)
	    .then(data => console.log("Circuit: " + data));


	}


	function fetchDataResults() {

	  fetch("https://ergast.com/api/f1/" + year + "/results.json?limit=1000")
	    .then(r => r.json())
	    .then(data => result = data)
	    .then(data => console.log("Result: " + data));


	}

	/*let isCacheSupported = 'caches' in window;
	 
	 
	let cacheName = 'f1DataCache';
	//let url = "http://ergast.com/api/f1/" + year + "/circuits.json?limit=100";
	caches.open(cacheName).then(cache => {
	  cache.add(url).then(() => {
	    console.log("Data cached ")
	  });
	});
	 
	 
	function getData(){
	 
	 
	}
	 
	 
	 
	 
	console.log(year);
	 
	 
	 
	 
	caches.open(cacheName).then(cache => {
	  cache.match(url).then(settings => {
	    console.log(settings);
	 
	    
	 
	 
	 
	  })
	});
	 
	 

	 
	 
	 
	$.ajax({
	  url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=Algarve_International_Circuit&exsentences=4&exintro=1&explaintext=1&exsectionformat=plain",
	  dataType: "json",
	  success: function (data) {
	    console.log(data.query);
	    
	  },
	  error: function (xhr) {
	    alert(xhr.statusText)
	  }
	})
	*/
	leafletSrc.tileLayer(
	  // 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
	  //'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
	  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.{ext}',
	  {
	    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href= "https://carto.com/about-carto/">CARTO</a>',
	    subdomains: 'abcd',
	    minZoom: 3,
	    maxZoom: 20,
	    ext: 'png',
	  })
	  .addTo(map);

	const icon = leafletSrc.icon({
	  iconUrl: 'images/location.png',
	  iconSize: [30, 30],
	  iconAnchor: [15, 30],
	});


	map.on('moveend', function () {
	  console.log(map.getZoom());
	  if (map.getZoom() <= 12) {
	    console.log("nope");
	    document.getElementById("info").style.visibility = "hidden";
	    map.eachLayer(function (layer) {
	      if (layer instanceof leafletSrc.GeoJSON) {
	        map.removeLayer(layer);

	      }
	    });
	  }
	  if (map.getZoom() > 12) {

	    console.log("yup");






	    //document.getElementById("info").style.visibility = "visible";
	    multipolygon = leafletSrc.geoJSON(
	      circuit_trace, {
	      style: myStyle
	    });
	    multipolygon.addTo(map);
	  }
	});



	/*
	arbres.map(d => {
	  const [lon, lat] = d
	  L.marker([lat, lon], { icon }).addTo(map).bindPopup(test.MRData.CircuitTable.Circuits[i].circuitName)
	})*/



	/*
	Ajout tracé circuit
	L.geoJSON(
	  circuit_trace, {
	  style: myStyle
	}
	).addTo(map).on('click', function (e) {

	  document.getElementById("info").style.visibility = "visible";
	  //console.log(L.Marker)


	  
	  // flyTo([test.MRData.CircuitTable.Circuits[2].Location.lat, test.MRData.CircuitTable.Circuits[2].Location.long], 12);
	});*/


	function clean_map() {
	  map.eachLayer(function (layer) {
	    if (layer instanceof leafletSrc.GeoJSON) {
	      map.removeLayer(layer);

	    }
	    //console.log(layer);


	  });

	  selectAll("#podium svg").remove();
	  selectAll("#BestAverageSpeed svg").remove();

	}





	/*
	$.ajax({
	  url: "http://ergast.com/api/f1/" + year + "/circuits.json?limit=100",
	  dataType: "json",
	  async: false,
	  success: function (data) {
	    console.log("success");
	    console.log(data);
	    // f1DataLive = data; 
	    // !!!STORE!!!
	    console.log(f1DataLive);
	    //getDataF1(data);


	    for (var i = 0; i < data.MRData.CircuitTable.Circuits.length; i++) {
	      L.marker([data.MRData.CircuitTable.Circuits[i].Location.lat, data.MRData.CircuitTable.Circuits[i].Location.long], { icon }).addTo(map).bindPopup(data.MRData.CircuitTable.Circuits[i].circuitName);
	    }
	  },
	  error: function (xhr) {
	    alert(xhr.statusText)
	  }
	})
	*/








	//console.log(testLive);


	// Cacher le pop up d'information
	function onMapClick(e) {

	  document.getElementById("info").style.visibility = "hidden";
	  map.flyTo([15, 0], 3, { 'duration': 1.2 });


	  clean_map();


	  console.log("clean");
	}





	// Afficher la popup d'information
	map.on('click', onMapClick);

	fetchData();
	fetchDataResults();
	addMarker();
	//fetchDataResults();

	function addMarker() {

	  layerGroup = leafletSrc.layerGroup().addTo(map);

	  setTimeout(() => {

	    console.log("CircuitTime: " + f1DataLive.MRData.CircuitTable.Circuits.length);

	    for (var i = 0; i < f1DataLive.MRData.CircuitTable.Circuits.length; i++) {

	      loc = leafletSrc.marker([f1DataLive.MRData.CircuitTable.Circuits[i].Location.lat, f1DataLive.MRData.CircuitTable.Circuits[i].Location.long], { icon });
	      layerGroup.addLayer(loc);


	      loc.bindPopup(leafletSrc.popup().setContent(f1DataLive.MRData.CircuitTable.Circuits[i].circuitName));
	      loc.on("mouseover", function (evt) { this.openPopup(); });
	      loc.on("mouseout", function (evt) { this.closePopup(); });

	      loc.on('click', function (e) { showInfo(e); });

	    }

	  }, 1000);

	  var overlay = { 'markers': layerGroup };
	  leafletSrc.control.layers(null, overlay).addTo(map);
	}


	function showInfo(e) {



	  //layerGroup.addLayer(loc);
	  clean_map();
	  for (var i = 0; i < f1DataLive.MRData.CircuitTable.Circuits.length; i++) {



	    if (e.latlng.lng == f1DataLive.MRData.CircuitTable.Circuits[i].Location.long) {
	      var ret = f1DataLive.MRData.CircuitTable.Circuits[i].url.replace("http:\/\/en.wikipedia.org\/wiki\/", "");

	      circuitID = f1DataLive.MRData.CircuitTable.Circuits[i].circuitId;
	      console.log(circuitID);
	      $.ajax({
	        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + ret + "&exsentences=3&exintro=1&explaintext=1&exsectionformat=plain&origin=*&redirects",
	        dataType: "json",
	        success: function (data) {

	          var pageid = [];
	          for (var id in data.query.pages) {
	            pageid.push(id);
	          }


	          //var a = document.createElement('a');
	          //var linkText = document.createTextNode("my title text");
	          document.getElementById("intro").textContent = data.query.pages[pageid[0]].extract;
	          //a.appendChild(document.getElementById("intro"));
	          //a.title = "Lire plus";
	          // a.href = f1DataLive.MRData.CircuitTable.Circuits[i].url;
	          // var intro =  + "<a href=" + f1DataLive.MRData.CircuitTable.Circuits[i].url + "> lire plus</a>";
	          //console.log(data.query.pages[pageid[0]].extract);

	          // document.body.appendChild(a);

	          multipolygon = leafletSrc.geoJSON(
	            circuit_trace, {
	            style: myStyle
	          });
	          setTimeout(() => {
	            multipolygon.addTo(map);
	          }, 1000);
	          /**/


	        },
	        error: function (xhr) {
	          alert(xhr.statusText);
	        }
	      });

	      // console.log(ret);
	      document.getElementById("titre").textContent = f1DataLive.MRData.CircuitTable.Circuits[i].circuitName;

	      document.getElementById("country").textContent = f1DataLive.MRData.CircuitTable.Circuits[i].Location.country;

	      document.getElementById("city").textContent = " | " + f1DataLive.MRData.CircuitTable.Circuits[i].Location.locality;




	      setTimeout(() => {

	        // console.log("test "+ result.MRData);

	        for (var i = 0; i < result.MRData.RaceTable.Races.length; i++) {
	          //console.log(result.MRData.RaceTable.Races[i].Circuit.circuitId)
	          if (circuitID == result.MRData.RaceTable.Races[i].Circuit.circuitId) {

	            /*console.log("avant")
	            console.log(result.MRData.RaceTable.Races[i].Circuit.circuitName);
	            console.log("Hey")
	            console.log("1er " + result.MRData.RaceTable.Races[i].Results[0].Driver.code);
	            console.log("2eme " + result.MRData.RaceTable.Races[i].Results[1].Driver.code);
	            console.log("3eme " + result.MRData.RaceTable.Races[i].Results[2].Driver.code)


	            */

	            // var resultTab = resultat.MRData.RaceTable.Races[i].Results;



	            var resultTab = result.MRData.RaceTable.Races[i].Results;

	            const resultPodium = resultTab.filter(resultTab => resultTab.position < 4);

	            console.log(resultPodium);

	            //console.log(result);

	            //set up svg using margin conventions - we'll need plenty of room on the left for labels
	            var margin = {
	              top: 15,
	              right: 25,
	              bottom: 15,
	              left: 110
	            };
	            /*
	                        var tooltip = d3
	                          .select('body')
	                          .append('div')
	                          .attr('class', 'd3-tooltip')
	                          .style('position', 'absolute')
	                          .style('z-index', '10')
	                          .style('visibility', 'hidden')
	                          .style('padding', '10px')
	                          .style('background', 'rgba(0,0,0,0.6)')
	                          .style('border-radius', '4px')
	                          .style('color', '#fff')
	                          .text('a simple tooltip');
	            */
	            //var colors = ['#FFD700', '#CECECE','#614E1A'];
	            // var colors = ['#884DA7', '#CECECE','#614E1A'];

	            var width = 230 - margin.left - margin.right,
	              height = 250 - margin.top - margin.bottom;

	            var svg = select("#podium").append("svg")
	              .attr("width", width + margin.left + margin.right)
	              .attr("height", height + margin.top + margin.bottom)
	              // .attr("width", 400)
	              // .attr("height", 200)
	              .append("g")

	              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	/*

	            // create a tooltip
	            var tooltip = d3.select("#podium")
	              .append("div")
	              .style("position", "absolute")
	              .style("visibility", "hidden")
	              .text("I'm a circle!");

	            //
	            d3.select(".bar")
	              .on("mouseover", function (d) { return tooltip.style("visibility", "visible"); })
	              .on("mousemove", function (d) { return tooltip.style("top", (d) + "px").style("left", (d) + "px"); })
	              .on("mouseout", function (d) { return tooltip.style("visibility", "hidden"); });
	*/
	            var x = linear()
	              .range([0, width])
	              .domain([0, max$1(resultPodium, function (d) {
	                return d.position;
	              })]);

	            var y = band()
	              .rangeRound([0, height])
	              .padding(0.1)
	              .domain(resultPodium.map(function (d) {
	                return d.Driver.givenName + " " + d.Driver.familyName;
	              }));

	            //make y axis to show bar names
	            var yAxis = axisLeft(y);
	            


	            svg.append("g")
	              .attr("class", "y axis")
	              
	              .call(yAxis);
	              
	              

	            var bars = svg.selectAll(".bar")
	              .data(resultPodium)
	              .enter()
	              



	              .append("g");
	              



	            //append rects <p id="PasDispoP">Données pas disponibles</p>
	            bars.append("rect")
	              .attr("class", "bar")
	              .attr("y", function (d) {
	                return y(d.Driver.givenName + " " + d.Driver.familyName);
	              })
	              .attr("height", y.bandwidth())
	              .attr("x", 0)
	              .attr("width", function (d) {
	                if (d.position == 1) {
	                  return x(0);
	                } else if (d.position == 2) {
	                  return x(0);
	                } else {
	                  return x(0);
	                }

	              })
	              .attr("fill", function (d) {


	                if (d.position == 1) {
	                  return '#FFD700';
	                } else if (d.position == 2) {
	                  return '#CECECE';
	                } else {
	                  return '#614E1A';
	                }


	              });

	            //add a value label to the right of each bar
	            bars.append("text")
	              .attr("class", "label")
	              //y position of the label is halfway down the bar
	              .attr("y", function (d) {
	                return y(d.Driver.givenName + " " + d.Driver.familyName) + y.bandwidth() / 2 + 4;
	              })
	              //x position is 3 pixels to the right of the bar
	              .attr("x", function (d) {


	                if (d.position == 1) {

	                  return x(3) + 3;
	                } else if (d.position == 2) {
	                  return x(d.position) + 3;
	                } else {
	                  return x(1) + 3;
	                }
	              })
	              .text(function (d) {
	                if (d.position == 1) {

	                  return "1er";
	                } else if (d.position == 2) {
	                  return "2e";
	                } else {
	                  return "3e";
	                }
	              });

	             
	            


	            svg.selectAll("rect")
	              .transition()
	              .duration(800)
	              .attr("height", y.bandwidth())
	              .attr("x", 0)
	              .attr("width", function (d) {
	                if (d.position == 1) {

	                  return x(3);
	                } else if (d.position == 2) {
	                  return x(d.position);
	                } else {
	                  return x(1);
	                }

	              })
	              



	              .delay(function (d, i) { console.log(i); return (i * 100) });




	              




	            console.log("add");



	            //---------------------------------------------------------------------------
	            //Speedometer

	            var BestAverageSpeed = 0;
	            console.log(BestAverageSpeed);
	            console.log(resultTab);
	            for (var i = 0; i < resultTab.length; i++) {

	              if (BestAverageSpeed < resultTab[i].FastestLap.AverageSpeed.speed) {


	                BestAverageSpeed = resultTab[i].FastestLap.AverageSpeed.speed;
	              }


	            }

	            console.log(BestAverageSpeed);

	            //document.getElementById("BestAverageSpeed").textContent = BestAverageSpeed ;



	            // Data
	            var value = (BestAverageSpeed / 260);
	            var text = BestAverageSpeed + 'Km/h';
	            var data = [value, 1 - value];

	            // Settings
	            var width = 250;
	            var height = 150;
	            var anglesRange = 0.5 * Math.PI;
	            var radis = Math.min(width, 2 * height) / 2;
	            var thickness = 50;
	            //var percent = 45;
	            // Utility 
	            //     var colors = d3.scale.category10();
	            var colors = ["#cc0000", "#F5F5F5"];

	            var pies = pie()
	              .value(d => d)
	              .sort(null)
	              .startAngle(anglesRange * -1)
	              .endAngle(anglesRange);

	            var arc$1 = arc()
	              .outerRadius(radis)
	              .innerRadius(radis - thickness);

	            var translation = (x, y) => `translate(${x}, ${y})`;

	            // Feel free to change or delete any of the code you see in this editor!
	            var svg = select("#BestAverageSpeed").append("svg")
	              .attr("width", width)
	              .attr("height", height)
	              .attr("class", "half-donut")
	              .append("g")
	              .attr("transform", translation(width / 2, height));


	            svg.selectAll("path")
	              .data(pies(data))
	              .enter()
	              .append("path")
	              .attr("fill", (d, i) => colors[i])
	              .attr("d", arc$1);


	            svg.append("text")
	              .text(d => text)
	              .attr("dy", "-3rem")
	              .attr("class", "label")
	              .attr("text-anchor", "middle");



	            /*
	                            var progress = 0;
	            
	                            var timeout = setTimeout(function () {
	                              clearTimeout(timeout);
	                              path = path.data(pie(dataset.upper));
	                              path.transition().duration(duration).attrTween("d", function (a) {
	                                var i = d3.interpolate(this._current, a);
	                                var i2 = d3.interpolate(progress, value)
	                                this._current = i(0);
	                                return function (t) {
	                                  text.text(format(i2(t) / 100));
	                                  return arc(i(t));
	                                };
	                              });
	                            }, 200);*/



	            //Speedometer
	            //---------------------------------------------------------------------------


	          }


	        }
	      }, 700);

	    }

	  }

	  document.getElementById("info").style.visibility = "visible";
	  console.log(e.latlng.lng);


	  // var info = document.getElementById("info")
	  //info.textContent += 'hello world !';

	  //console.log("buind");
	  //console.log(multipolygon.getBounds());

	  map.flyTo(e.latlng, 15, { 'duration': 1.2 });
	  //map.flyToBounds(e.latlng,e.latlng, 15, {'duration':1.2});
	  // flyTo([test.MRData.CircuitTable.Circuits[2].Location.lat, test.MRData.CircuitTable.Circuits[2].Location.long], 12);

	}


	//---------------------------------------------------------------------------

}());
