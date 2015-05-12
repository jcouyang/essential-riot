/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/javascripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(22);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(20)
	  , setTag   = __webpack_require__(23).set
	  , uid      = __webpack_require__(25)
	  , $def     = __webpack_require__(31)
	  , keyOf    = __webpack_require__(38)
	  , enumKeys = __webpack_require__(39)
	  , assertObject = __webpack_require__(32).obj
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , getNames = $.getNames
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , SymbolRegistry = {}
	  , AllSymbols = {}
	  , useNative = $.isFunction($Symbol);
	
	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  $.DESC && setter && setDesc(Object.prototype, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}
	
	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D.enumerable = false;
	    }
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(description){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(description));
	  };
	  $.hide($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });
	
	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(21)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);
	
	setter = true;
	
	$def($def.G + $def.W, {Symbol: $Symbol});
	
	$def($def.S, 'Symbol', symbolStatics);
	
	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {var _regeneratorRuntime = __webpack_require__(6)['default'];
	
	riot.tag('todo', '<h3>{ opts.title }</h3> <ul> <li each="{ items.filter(filter) }"> <label class="{ completed: done }"> <input type="checkbox" __checked="{ done }" onclick="{ parent.toggle }"> { title } </label> </li> </ul> <form onsubmit="{ add }"> <input name="input" onkeyup="{ edit }"> <button __disabled="{ !text }">Add #{ items.filter(filter).length + 1 }</button> </form>', function (opts) {
	  var db = __webpack_require__(5);
	  this.items = opts.items;
	
	  this.edit = (function (e) {
	    this.text = e.target.value;
	  }).bind(this);
	
	  this.add = (function (e) {
	    if (this.text) {
	      this.items.push({ title: this.text });
	      this.text = this.input.value = '';
	    }
	  }).bind(this);
	
	  this.filter = (function (item) {
	    return !item.hidden;
	  }).bind(this);
	
	  this.toggle = (function (e) {
	    var item = e.item;
	    item.done = !item.done;
	    return true;
	  }).bind(this);
	  this.items.push({ title: 'asdfjklasdf', done: true });
	
	  this.on('mount', function callee$1$0() {
	    var name;
	    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          console.log('mount');
	          context$2$0.next = 3;
	          return db.getItems();
	
	        case 3:
	          name = context$2$0.sent;
	
	          this.items.push({ title: name, done: true });
	          this.update();
	
	        case 6:
	        case 'end':
	          return context$2$0.stop();
	      }
	    }, null, this);
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {var _regeneratorRuntime = __webpack_require__(6)['default'];
	
	riot.tag('login', '<form onsubmit="{ login }"> <span class="error"> {error_msg} </span> <input name="username" type="text" placeholder="username"> <input name="password" type="password" placeholder="password"> <button type="submit">login</button> </form>', function (opts) {
	  var db = __webpack_require__(5);
	  this.login = function callee$1$0() {
	    var _ref, success;
	
	    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          context$2$0.next = 2;
	          return db.login({
	            username: this.username.value,
	            password: this.password.value
	          });
	
	        case 2:
	          _ref = context$2$0.sent;
	          success = _ref.success;
	
	          if (success) riot.route('items');else this.error_msg = 'hehe';
	
	        case 5:
	        case 'end':
	          return context$2$0.stop();
	      }
	    }, null, this);
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var riot$1702 = __webpack_require__(22);
	function routePatterns$1706(a0$1707) {
	    if (a0$1707 === 'login') {
	        return riot$1702.mount('#page', 'login');
	    }
	    if (a0$1707 === 'items') {
	        return riot$1702.mount('#page', 'todo');
	    }
	    throw new TypeError('No match');
	}
	riot$1702.route(routePatterns$1706);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _Promise = __webpack_require__(7)['default'];
	
	function DB() {}
	
	DB.prototype.getItems = function () {
	  return new _Promise(function (resolve, reject) {
	    setTimeout(function () {
	      return resolve({
	        title: 'I want to behave item!',
	        items: [{ title: 'Avoid excessive coffeine', done: true }, { title: 'Hidden item', hidden: true }, { title: 'Be less provocative' }, { title: 'Be nice to people' }]
	      });
	    }, 3000);
	  });
	};
	
	DB.prototype.login = function (prop) {
	  return new _Promise(function (resolve, reject) {
	    var res = false;
	    if (prop.username === 'oyang' && prop.password === 'lulu') res = true;
	    setTimeout(function () {
	      return resolve({ success: res, error: null });
	    }, 3000);
	  });
	};
	module.exports = new DB();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	delete g.regeneratorRuntime;
	
	module.exports = __webpack_require__(8);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  delete g.regeneratorRuntime;
	}
	
	module.exports = { "default": module.exports, __esModule: true };
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(12), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	"use strict";
	
	var _Symbol = __webpack_require__(9)["default"];
	
	var _Symbol$iterator = __webpack_require__(10)["default"];
	
	var _Object$create = __webpack_require__(11)["default"];
	
	var _Promise = __webpack_require__(7)["default"];
	
	!(function (global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = _Object$create((outerFn || Generator).prototype);
	
	    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };
	
	  runtime.mark = function (genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = _Object$create(Gp);
	    return genFun;
	  };
	
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    return new _Promise(function (resolve, reject) {
	      var generator = wrap(innerFn, outerFn, self, tryLocsList);
	      var callNext = step.bind(generator, "next");
	      var callThrow = step.bind(generator, "throw");
	
	      function step(method, arg) {
	        var record = tryCatch(generator[method], generator, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	          return;
	        }
	
	        var info = record.arg;
	        if (info.done) {
	          resolve(info.value);
	        } else {
	          _Promise.resolve(info.value).then(callNext, callThrow);
	        }
	      }
	
	      callNext();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  function defineGeneratorMethod(method) {
	    Gp[method] = function (arg) {
	      return this._invoke(method, arg);
	    };
	  }
	  defineGeneratorMethod("next");
	  defineGeneratorMethod("throw");
	  defineGeneratorMethod("return");
	
	  Gp[iteratorSymbol] = function () {
	    return this;
	  };
	
	  Gp.toString = function () {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset();
	  }
	
	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function reset() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
	        this[tempName] = null;
	      }
	    },
	
	    stop: function stop() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	
	      return ContinueSentinel;
	    },
	
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          return this.complete(entry.completion, entry.afterLoc);
	        }
	      }
	    },
	
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	module.exports = __webpack_require__(20).core.Promise;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	__webpack_require__(18);
	module.exports = __webpack_require__(21)('iterator');

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(20);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(20).core.Symbol;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var $   = __webpack_require__(20)
	  , cof = __webpack_require__(23)
	  , tmp = {};
	tmp[__webpack_require__(21)('toStringTag')] = 'z';
	if($.FW && cof(tmp) != 'z')$.hide(Object.prototype, 'toString', function toString(){
	  return '[object ' + cof.classof(this) + ']';
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(20).set
	  , $at   = __webpack_require__(24)(true)
	  , ITER  = __webpack_require__(25).safe('iter')
	  , $iter = __webpack_require__(26)
	  , step  = $iter.step;
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(27)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	var $           = __webpack_require__(20)
	  , Iterators   = __webpack_require__(26).Iterators
	  , ITERATOR    = __webpack_require__(21)('iterator')
	  , ArrayValues = Iterators.Array
	  , NodeList    = $.g.NodeList;
	if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
	  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = ArrayValues;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(20)
	  , ctx      = __webpack_require__(30)
	  , cof      = __webpack_require__(23)
	  , $def     = __webpack_require__(31)
	  , assert   = __webpack_require__(32)
	  , forOf    = __webpack_require__(33)
	  , setProto = __webpack_require__(29).set
	  , species  = __webpack_require__(34)
	  , SPECIES  = __webpack_require__(21)('species')
	  , RECORD   = __webpack_require__(25).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , asap     = process && process.nextTick || __webpack_require__(35).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj;
	
	var useNative = function(){
	  var test, works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  if(chain.length)asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    asap(function(){
	      if(isUnhandled(promise = record.p)){
	        if(cof(process) == 'process'){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && isFunction(console.error)){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then, wrapper;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      wrapper = {r: record, d: false}; // wrap
	      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(err){
	    $reject.call(wrapper || {r: record, d: false}, err); // wrap
	  }
	}
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  $.mix(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      record.s && notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species($.core[PROMISE]); // for wrapper
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){
	      rej(r);
	    });
	  },
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
	      ? x : new (getConstructor(this))(function(res){
	        res(x);
	      });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(36)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(37)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  it: function(it){
	    return it;
	  },
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  mix: function(target, src){
	    for(var key in src)hide(target, key, src[key]);
	    return target;
	  },
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(20).g
	  , store  = {};
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(25).safe('Symbol.' + name));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* Riot v2.0.15, @license MIT, (c) 2015 Muut Inc. + contributors */
	
	;(function(window) {
	  // 'use strict' does not allow us to override the events properties https://github.com/muut/riotjs/blob/dev/lib/tag/update.js#L7-L10
	  // it leads to the following error on firefox "setting a property that has only a getter"
	  //'use strict'
	
	  var riot = { version: 'v2.0.15', settings: {} },
	      ieVersion = checkIE()
	
	riot.observable = function(el) {
	
	  el = el || {}
	
	  var callbacks = {},
	      _id = 0
	
	  el.on = function(events, fn) {
	    if (typeof fn == 'function') {
	      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id
	
	      events.replace(/\S+/g, function(name, pos) {
	        (callbacks[name] = callbacks[name] || []).push(fn)
	        fn.typed = pos > 0
	      })
	    }
	    return el
	  }
	
	  el.off = function(events, fn) {
	    if (events == '*') callbacks = {}
	    else {
	      events.replace(/\S+/g, function(name) {
	        if (fn) {
	          var arr = callbacks[name]
	          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
	            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
	          }
	        } else {
	          callbacks[name] = []
	        }
	      })
	    }
	    return el
	  }
	
	  // only single event supported
	  el.one = function(name, fn) {
	    function on() {
	      el.off(name, on)
	      fn.apply(el, arguments)
	    }
	    return el.on(name, on)
	  }
	
	  el.trigger = function(name) {
	    var args = [].slice.call(arguments, 1),
	        fns = callbacks[name] || []
	
	    for (var i = 0, fn; (fn = fns[i]); ++i) {
	      if (!fn.busy) {
	        fn.busy = 1
	        fn.apply(el, fn.typed ? [name].concat(args) : args)
	        if (fns[i] !== fn) { i-- }
	        fn.busy = 0
	      }
	    }
	
	    if (callbacks.all && name != 'all') {
	      el.trigger.apply(el, ['all', name].concat(args))
	    }
	
	    return el
	  }
	
	  return el
	
	}
	;(function(riot, evt, window) {
	
	  // browsers only
	  if (!window) return
	
	  var loc = window.location,
	      fns = riot.observable(),
	      win = window,
	      started = false,
	      current
	
	  function hash() {
	    return loc.href.split('#')[1] || ''
	  }
	
	  function parser(path) {
	    return path.split('/')
	  }
	
	  function emit(path) {
	    if (path.type) path = hash()
	
	    if (path != current) {
	      fns.trigger.apply(null, ['H'].concat(parser(path)))
	      current = path
	    }
	  }
	
	  var r = riot.route = function(arg) {
	    // string
	    if (arg[0]) {
	      loc.hash = arg
	      emit(arg)
	
	    // function
	    } else {
	      fns.on('H', arg)
	    }
	  }
	
	  r.exec = function(fn) {
	    fn.apply(null, parser(hash()))
	  }
	
	  r.parser = function(fn) {
	    parser = fn
	  }
	
	  r.stop = function () {
	    if (!started) return
	    win.removeEventListener ? win.removeEventListener(evt, emit, false) : win.detachEvent('on' + evt, emit)
	    fns.off('*')
	    started = false
	  }
	
	  r.start = function () {
	    if (started) return
	    win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)
	    started = true
	  }
	
	  // autostart the router
	  r.start()
	
	})(riot, 'hashchange', window)
	/*
	
	//// How it works?
	
	
	Three ways:
	
	1. Expressions: tmpl('{ value }', data).
	   Returns the result of evaluated expression as a raw object.
	
	2. Templates: tmpl('Hi { name } { surname }', data).
	   Returns a string with evaluated expressions.
	
	3. Filters: tmpl('{ show: !done, highlight: active }', data).
	   Returns a space separated list of trueish keys (mainly
	   used for setting html classes), e.g. "show highlight".
	
	
	// Template examples
	
	tmpl('{ title || "Untitled" }', data)
	tmpl('Results are { results ? "ready" : "loading" }', data)
	tmpl('Today is { new Date() }', data)
	tmpl('{ message.length > 140 && "Message is too long" }', data)
	tmpl('This item got { Math.round(rating) } stars', data)
	tmpl('<h1>{ title }</h1>{ body }', data)
	
	
	// Falsy expressions in templates
	
	In templates (as opposed to single expressions) all falsy values
	except zero (undefined/null/false) will default to empty string:
	
	tmpl('{ undefined } - { false } - { null } - { 0 }', {})
	// will return: " - - - 0"
	
	*/
	
	
	var brackets = (function(orig, s, b) {
	  return function(x) {
	
	    // make sure we use the current setting
	    s = riot.settings.brackets || orig
	    if (b != s) b = s.split(' ')
	
	    // if regexp given, rewrite it with current brackets (only if differ from default)
	    return x && x.test
	      ? s == orig
	        ? x : RegExp(x.source
	                      .replace(/\{/g, b[0].replace(/(?=.)/g, '\\'))
	                      .replace(/\}/g, b[1].replace(/(?=.)/g, '\\')),
	                    x.global ? 'g' : '')
	
	      // else, get specific bracket
	      : b[x]
	
	  }
	})('{ }')
	
	
	var tmpl = (function() {
	
	  var cache = {},
	      reVars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
	              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
	              // find variable names:
	              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
	              // 2. skip object properties: .name
	              // 3. skip object literals: name:
	              // 4. skip javascript keywords
	              // 5. match var name
	
	  // build a template (or get it from cache), render with data
	  return function(str, data) {
	    return str && (cache[str] = cache[str] || tmpl(str))(data)
	  }
	
	
	  // create a template instance
	
	  function tmpl(s, p) {
	
	    // default template string to {}
	    s = (s || (brackets(0) + brackets(1)))
	
	      // temporarily convert \{ and \} to a non-character
	      .replace(brackets(/\\{/g), '\uFFF0')
	      .replace(brackets(/\\}/g), '\uFFF1')
	
	    // split string to expression and non-expresion parts
	    p = split(s, extract(s, brackets(/{/), brackets(/}/)))
	
	    return new Function('d', 'return ' + (
	
	      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
	      !p[0] && !p[2] && !p[3]
	
	        // if expression, evaluate it
	        ? expr(p[1])
	
	        // if template, evaluate all expressions in it
	        : '[' + p.map(function(s, i) {
	
	            // is it an expression or a string (every second part is an expression)
	          return i % 2
	
	              // evaluate the expressions
	              ? expr(s, true)
	
	              // process string parts of the template:
	              : '"' + s
	
	                  // preserve new lines
	                  .replace(/\n/g, '\\n')
	
	                  // escape quotes
	                  .replace(/"/g, '\\"')
	
	                + '"'
	
	        }).join(',') + '].join("")'
	      )
	
	      // bring escaped { and } back
	      .replace(/\uFFF0/g, brackets(0))
	      .replace(/\uFFF1/g, brackets(1))
	
	    + ';')
	
	  }
	
	
	  // parse { ... } expression
	
	  function expr(s, n) {
	    s = s
	
	      // convert new lines to spaces
	      .replace(/\n/g, ' ')
	
	      // trim whitespace, brackets, strip comments
	      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')
	
	    // is it an object literal? i.e. { key : value }
	    return /^\s*[\w- "']+ *:/.test(s)
	
	      // if object literal, return trueish keys
	      // e.g.: { show: isOpen(), done: item.done } -> "show done"
	      ? '[' +
	
	          // extract key:val pairs, ignoring any nested objects
	          extract(s,
	
	              // name part: name:, "name":, 'name':, name :
	              /["' ]*[\w- ]+["' ]*:/,
	
	              // expression part: everything upto a comma followed by a name (see above) or end of line
	              /,(?=["' ]*[\w- ]+["' ]*:)|}|$/
	              ).map(function(pair) {
	
	                // get key, val parts
	                return pair.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function(_, k, v) {
	
	                  // wrap all conditional parts to ignore errors
	                  return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k + '":"",'
	
	                })
	
	              }).join('')
	
	        + '].join(" ").trim()'
	
	      // if js expression, evaluate as javascript
	      : wrap(s, n)
	
	  }
	
	
	  // execute js w/o breaking on errors or undefined vars
	
	  function wrap(s, nonull) {
	    s = s.trim()
	    return !s ? '' : '(function(v){try{v='
	
	        // prefix vars (name => data.name)
	        + (s.replace(reVars, function(s, _, v) { return v ? '(d.'+v+'===undefined?'+(typeof window == 'undefined' ? 'global.' : 'window.')+v+':d.'+v+')' : s })
	
	          // break the expression if its empty (resulting in undefined value)
	          || 'x')
	
	      + '}finally{return '
	
	        // default to empty string for falsy values except zero
	        + (nonull === true ? '!v&&v!==0?"":v' : 'v')
	
	      + '}}).call(d)'
	  }
	
	
	  // split string by an array of substrings
	
	  function split(str, substrings) {
	    var parts = []
	    substrings.map(function(sub, i) {
	
	      // push matched expression and part before it
	      i = str.indexOf(sub)
	      parts.push(str.slice(0, i), sub)
	      str = str.slice(i + sub.length)
	    })
	
	    // push the remaining part
	    return parts.concat(str)
	  }
	
	
	  // match strings between opening and closing regexp, skipping any inner/nested matches
	
	  function extract(str, open, close) {
	
	    var start,
	        level = 0,
	        matches = [],
	        re = new RegExp('('+open.source+')|('+close.source+')', 'g')
	
	    str.replace(re, function(_, open, close, pos) {
	
	      // if outer inner bracket, mark position
	      if(!level && open) start = pos
	
	      // in(de)crease bracket level
	      level += open ? 1 : -1
	
	      // if outer closing bracket, grab the match
	      if(!level && close != null) matches.push(str.slice(start, pos+close.length))
	
	    })
	
	    return matches
	  }
	
	})()
	
	// { key, i in items} -> { key, i, items }
	function loopKeys(expr) {
	  var ret = { val: expr },
	      els = expr.split(/\s+in\s+/)
	
	  if (els[1]) {
	    ret.val = brackets(0) + els[1]
	    els = els[0].slice(brackets(0).length).trim().split(/,\s*/)
	    ret.key = els[0]
	    ret.pos = els[1]
	  }
	
	  return ret
	}
	
	function mkitem(expr, key, val) {
	  var item = {}
	  item[expr.key] = key
	  if (expr.pos) item[expr.pos] = val
	  return item
	}
	
	
	/* Beware: heavy stuff */
	function _each(dom, parent, expr) {
	
	  remAttr(dom, 'each')
	
	  var template = dom.outerHTML,
	      prev = dom.previousSibling,
	      root = dom.parentNode,
	      rendered = [],
	      tags = [],
	      checksum
	
	  expr = loopKeys(expr)
	
	  function add(pos, item, tag) {
	    rendered.splice(pos, 0, item)
	    tags.splice(pos, 0, tag)
	  }
	
	  // clean template code
	  parent.one('update', function() {
	    root.removeChild(dom)
	
	  }).one('premount', function() {
	    if (root.stub) root = parent.root
	
	  }).on('update', function() {
	
	    var items = tmpl(expr.val, parent)
	    if (!items) return
	
	    // object loop. any changes cause full redraw
	    if (!Array.isArray(items)) {
	      var testsum = JSON.stringify(items)
	      if (testsum == checksum) return
	      checksum = testsum
	
	      // clear old items
	      each(tags, function(tag) { tag.unmount() })
	      rendered = []
	      tags = []
	
	      items = Object.keys(items).map(function(key) {
	        return mkitem(expr, key, items[key])
	      })
	
	    }
	
	    // unmount redundant
	    each(rendered, function(item) {
	      if (item instanceof Object) {
	        // skip existing items
	        if (items.indexOf(item) > -1) {
	          return
	        }
	      } else {
	        // find all non-objects
	        var newItems = arrFindEquals(items, item),
	            oldItems = arrFindEquals(rendered, item)
	
	        // if more or equal amount, no need to remove
	        if (newItems.length >= oldItems.length) {
	          return
	        }
	      }
	      var pos = rendered.indexOf(item),
	          tag = tags[pos]
	
	      if (tag) {
	        tag.unmount()
	        rendered.splice(pos, 1)
	        tags.splice(pos, 1)
	        // to let "each" know that this item is removed
	        return false
	      }
	
	    })
	
	    // mount new / reorder
	    var prevBase = [].indexOf.call(root.childNodes, prev) + 1
	    each(items, function(item, i) {
	
	      // start index search from position based on the current i
	      var pos = items.indexOf(item, i),
	          oldPos = rendered.indexOf(item, i)
	
	      // if not found, search backwards from current i position
	      pos < 0 && (pos = items.lastIndexOf(item, i))
	      oldPos < 0 && (oldPos = rendered.lastIndexOf(item, i))
	
	      if (!(item instanceof Object)) {
	        // find all non-objects
	        var newItems = arrFindEquals(items, item),
	            oldItems = arrFindEquals(rendered, item)
	
	        // if more, should mount one new
	        if (newItems.length > oldItems.length) {
	          oldPos = -1
	        }
	      }
	
	      // mount new
	      var nodes = root.childNodes
	      if (oldPos < 0) {
	        if (!checksum && expr.key) var _item = mkitem(expr, item, pos)
	
	        var tag = new Tag({ tmpl: template }, {
	          before: nodes[prevBase + pos],
	          parent: parent,
	          root: root,
	          item: _item || item
	        })
	
	        tag.mount()
	
	        add(pos, item, tag)
	        return true
	      }
	
	      // change pos value
	      if (expr.pos && tags[oldPos][expr.pos] != pos) {
	        tags[oldPos].one('update', function(item) {
	          item[expr.pos] = pos
	        })
	        tags[oldPos].update()
	      }
	
	      // reorder
	      if (pos != oldPos) {
	        root.insertBefore(nodes[prevBase + oldPos], nodes[prevBase + (pos > oldPos ? pos + 1 : pos)])
	        return add(pos, rendered.splice(oldPos, 1)[0], tags.splice(oldPos, 1)[0])
	      }
	
	    })
	
	    rendered = items.slice()
	
	  })
	
	}
	
	
	function parseNamedElements(root, parent, childTags) {
	
	  walk(root, function(dom) {
	    if (dom.nodeType == 1) {
	      if(dom.parentNode && dom.parentNode.isLoop) dom.isLoop = 1
	      if(dom.getAttribute('each')) dom.isLoop = 1
	      // custom child tag
	      var child = getTag(dom)
	
	      if (child && !dom.isLoop) {
	        var tag = new Tag(child, { root: dom, parent: parent }, dom.innerHTML),
	          tagName = child.name,
	          ptag = parent,
	          cachedTag
	
	        while(!getTag(ptag.root)) {
	          if(!ptag.parent) break
	          ptag = ptag.parent
	        }
	        // fix for the parent attribute in the looped elements
	        tag.parent = ptag
	
	        cachedTag = ptag.tags[tagName]
	
	        // if there are multiple children tags having the same name
	        if (cachedTag) {
	          // if the parent tags property is not yet an array
	          // create it adding the first cached tag
	          if (!Array.isArray(cachedTag))
	            ptag.tags[tagName] = [cachedTag]
	          // add the new nested tag to the array
	          ptag.tags[tagName].push(tag)
	        } else {
	          ptag.tags[tagName] = tag
	        }
	
	        // empty the child node once we got its template
	        // to avoid that its children get compiled multiple times
	        dom.innerHTML = ''
	        childTags.push(tag)
	      }
	
	      each(dom.attributes, function(attr) {
	        if (/^(name|id)$/.test(attr.name)) parent[attr.value] = dom
	      })
	    }
	
	  })
	
	}
	
	function parseExpressions(root, tag, expressions) {
	
	  function addExpr(dom, val, extra) {
	    if (val.indexOf(brackets(0)) >= 0) {
	      var expr = { dom: dom, expr: val }
	      expressions.push(extend(expr, extra))
	    }
	  }
	
	  walk(root, function(dom) {
	    var type = dom.nodeType
	
	    // text node
	    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
	    if (type != 1) return
	
	    /* element */
	
	    // loop
	    var attr = dom.getAttribute('each')
	    if (attr) { _each(dom, tag, attr); return false }
	
	    // attribute expressions
	    each(dom.attributes, function(attr) {
	      var name = attr.name,
	        bool = name.split('__')[1]
	
	      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
	      if (bool) { remAttr(dom, name); return false }
	
	    })
	
	    // skip custom tags
	    if (getTag(dom)) return false
	
	  })
	
	}
	function Tag(impl, conf, innerHTML) {
	
	  var self = riot.observable(this),
	      opts = inherit(conf.opts) || {},
	      dom = mkdom(impl.tmpl),
	      parent = conf.parent,
	      expressions = [],
	      childTags = [],
	      root = conf.root,
	      item = conf.item,
	      fn = impl.fn,
	      tagName = root.tagName.toLowerCase(),
	      attr = {},
	      loopDom
	
	  if (fn && root._tag) {
	    root._tag.unmount(true)
	  }
	  // keep a reference to the tag just created
	  // so we will be able to mount this tag multiple times
	  root._tag = this
	
	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  this._id = ~~(new Date().getTime() * Math.random())
	
	  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)
	
	  // grab attributes
	  each(root.attributes, function(el) {
	    attr[el.name] = el.value
	  })
	
	
	  if (dom.innerHTML && !/select/.test(tagName))
	    // replace all the yield tags with the tag inner html
	    dom.innerHTML = replaceYield(dom.innerHTML, innerHTML)
	
	
	  // options
	  function updateOpts() {
	    each(Object.keys(attr), function(name) {
	      opts[name] = tmpl(attr[name], parent || self)
	    })
	  }
	
	  this.update = function(data, init) {
	    extend(self, data, item)
	    updateOpts()
	    self.trigger('update', item)
	    update(expressions, self, item)
	    self.trigger('updated')
	  }
	
	  this.mount = function() {
	
	    updateOpts()
	
	    // initialiation
	    fn && fn.call(self, opts)
	
	    toggle(true)
	
	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions(dom, self, expressions)
	
	    if (!self.parent) self.update()
	
	    // internal use only, fixes #403
	    self.trigger('premount')
	
	    if (fn) {
	      while (dom.firstChild) root.appendChild(dom.firstChild)
	
	    } else {
	      loopDom = dom.firstChild
	      root.insertBefore(loopDom, conf.before || null) // null needed for IE8
	    }
	
	    if (root.stub) self.root = root = parent.root
	    self.trigger('mount')
	
	  }
	
	
	  this.unmount = function(keepRootTag) {
	    var el = fn ? root : loopDom,
	        p = el.parentNode
	
	    if (p) {
	
	      if (parent) {
	        // remove this tag from the parent tags object
	        // if there are multiple nested tags with same name..
	        // remove this element form the array
	        if (Array.isArray(parent.tags[tagName])) {
	          each(parent.tags[tagName], function(tag, i) {
	            if (tag._id == self._id)
	              parent.tags[tagName].splice(i, 1)
	          })
	        } else
	          // otherwise just delete the tag instance
	          delete parent.tags[tagName]
	      } else {
	        while (el.firstChild) el.removeChild(el.firstChild)
	      }
	
	      if (!keepRootTag)
	        p.removeChild(el)
	
	    }
	
	
	    self.trigger('unmount')
	    toggle()
	    self.off('*')
	    // somehow ie8 does not like `delete root._tag`
	    root._tag = null
	
	  }
	
	  function toggle(isMount) {
	
	    // mount/unmount children
	    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })
	
	    // listen/unlisten parent (events flow one way from parent to children)
	    if (parent) {
	      var evt = isMount ? 'on' : 'off'
	      parent[evt]('update', self.update)[evt]('unmount', self.unmount)
	    }
	  }
	
	  // named elements available for fn
	  parseNamedElements(dom, this, childTags)
	
	
	}
	
	function setEventHandler(name, handler, dom, tag, item) {
	
	  dom[name] = function(e) {
	
	    // cross browser event fix
	    e = e || window.event
	    e.which = e.which || e.charCode || e.keyCode
	    e.target = e.target || e.srcElement
	    e.currentTarget = dom
	    e.item = item
	
	    // prevent default behaviour (by default)
	    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	      e.preventDefault && e.preventDefault()
	      e.returnValue = false
	    }
	
	    var el = item ? tag.parent : tag
	    el.update()
	
	  }
	
	}
	
	// used by if- attribute
	function insertTo(root, node, before) {
	  if (root) {
	    root.insertBefore(before, node)
	    root.removeChild(node)
	  }
	}
	
	// item = currently looped item
	function update(expressions, tag, item) {
	
	  each(expressions, function(expr, i) {
	
	    var dom = expr.dom,
	        attrName = expr.attr,
	        value = tmpl(expr.expr, tag),
	        parent = expr.dom.parentNode
	
	    if (value == null) value = ''
	
	    // leave out riot- prefixes from strings inside textarea
	    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')
	
	    // no change
	    if (expr.value === value) return
	    expr.value = value
	
	    // text node
	    if (!attrName) return dom.nodeValue = value
	
	    // remove original attribute
	    remAttr(dom, attrName)
	
	    // event handler
	    if (typeof value == 'function') {
	      setEventHandler(attrName, value, dom, tag, item)
	
	    // if- conditional
	    } else if (attrName == 'if') {
	      var stub = expr.stub
	
	      // add to DOM
	      if (value) {
	        stub && insertTo(stub.parentNode, stub, dom)
	
	      // remove from DOM
	      } else {
	        stub = expr.stub = stub || document.createTextNode('')
	        insertTo(dom.parentNode, dom, stub)
	      }
	
	    // show / hide
	    } else if (/^(show|hide)$/.test(attrName)) {
	      if (attrName == 'hide') value = !value
	      dom.style.display = value ? '' : 'none'
	
	    // field value
	    } else if (attrName == 'value') {
	      dom.value = value
	
	    // <img src="{ expr }">
	    } else if (attrName.slice(0, 5) == 'riot-') {
	      attrName = attrName.slice(5)
	      value ? dom.setAttribute(attrName, value) : remAttr(dom, attrName)
	
	    } else {
	      if (expr.bool) {
	        dom[attrName] = value
	        if (!value) return
	        value = attrName
	      }
	
	      if (typeof value != 'object') dom.setAttribute(attrName, value)
	
	    }
	
	  })
	
	}
	function each(els, fn) {
	  for (var i = 0, len = (els || []).length, el; i < len; i++) {
	    el = els[i]
	    // return false -> remove current item during loop
	    if (el != null && fn(el, i) === false) i--
	  }
	  return els
	}
	
	function remAttr(dom, name) {
	  dom.removeAttribute(name)
	}
	
	// max 2 from objects allowed
	function extend(obj, from, from2) {
	  from && each(Object.keys(from), function(key) {
	    obj[key] = from[key]
	  })
	  return from2 ? extend(obj, from2) : obj
	}
	
	function checkIE() {
	  if (window) {
	    var ua = navigator.userAgent
	    var msie = ua.indexOf('MSIE ')
	    if (msie > 0) {
	      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
	    }
	    else {
	      return 0
	    }
	  }
	}
	
	function optionInnerHTML(el, html) {
	  var opt = document.createElement('option'),
	      valRegx = /value=[\"'](.+?)[\"']/,
	      selRegx = /selected=[\"'](.+?)[\"']/,
	      valuesMatch = html.match(valRegx),
	      selectedMatch = html.match(selRegx)
	
	  opt.innerHTML = html
	
	  if (valuesMatch) {
	    opt.value = valuesMatch[1]
	  }
	
	  if (selectedMatch) {
	    opt.setAttribute('riot-selected', selectedMatch[1])
	  }
	
	  el.appendChild(opt)
	}
	
	function mkdom(template) {
	  var tagName = template.trim().slice(1, 3).toLowerCase(),
	      rootTag = /td|th/.test(tagName) ? 'tr' : tagName == 'tr' ? 'tbody' : 'div',
	      el = document.createElement(rootTag)
	
	  el.stub = true
	
	  if (tagName === 'op' && ieVersion && ieVersion < 10) {
	    optionInnerHTML(el, template)
	  } else {
	    el.innerHTML = template
	  }
	  return el
	}
	
	function walk(dom, fn) {
	  if (dom) {
	    if (fn(dom) === false) walk(dom.nextSibling, fn)
	    else {
	      dom = dom.firstChild
	
	      while (dom) {
	        walk(dom, fn)
	        dom = dom.nextSibling
	      }
	    }
	  }
	}
	
	function replaceYield (tmpl, innerHTML) {
	  return tmpl.replace(/<(yield)\/?>(<\/\1>)?/gim, innerHTML || '')
	}
	
	function $$(selector, ctx) {
	  ctx = ctx || document
	  return ctx.querySelectorAll(selector)
	}
	
	function arrDiff(arr1, arr2) {
	  return arr1.filter(function(el) {
	    return arr2.indexOf(el) < 0
	  })
	}
	
	function arrFindEquals(arr, el) {
	  return arr.filter(function (_el) {
	    return _el === el
	  })
	}
	
	function inherit(parent) {
	  function Child() {}
	  Child.prototype = parent
	  return new Child()
	}
	
	/*
	 Virtual dom is an array of custom tags on the document.
	 Updates and unmounts propagate downwards from parent to children.
	*/
	
	var virtualDom = [],
	    tagImpl = {}
	
	
	function getTag(dom) {
	  return tagImpl[dom.getAttribute('riot-tag') || dom.tagName.toLowerCase()]
	}
	
	function injectStyle(css) {
	  var node = document.createElement('style')
	  node.innerHTML = css
	  document.head.appendChild(node)
	}
	
	function mountTo(root, tagName, opts) {
	  var tag = tagImpl[tagName],
	      innerHTML = root.innerHTML
	
	  // clear the inner html
	  root.innerHTML = ''
	
	  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)
	
	  if (tag && tag.mount) {
	    tag.mount()
	    virtualDom.push(tag)
	    return tag.on('unmount', function() {
	      virtualDom.splice(virtualDom.indexOf(tag), 1)
	    })
	  }
	
	}
	
	riot.tag = function(name, html, css, fn) {
	  if (typeof css == 'function') fn = css
	  else if (css) injectStyle(css)
	  tagImpl[name] = { name: name, tmpl: html, fn: fn }
	  return name
	}
	
	riot.mount = function(selector, tagName, opts) {
	
	  var el,
	      selctAllTags = function(sel) {
	        sel = Object.keys(tagImpl).join(', ')
	        sel.split(',').map(function(t) {
	          sel += ', *[riot-tag="'+ t.trim() + '"]'
	        })
	        return sel
	      },
	      tags = []
	
	  if (typeof tagName == 'object') { opts = tagName; tagName = 0 }
	
	  // crawl the DOM to find the tag
	  if(typeof selector == 'string') {
	    if (selector == '*') {
	      // select all the tags registered
	      // and also the tags found with the riot-tag attribute set
	      selector = selctAllTags(selector)
	    }
	    // or just the ones named like the selector
	    el = $$(selector)
	  }
	  // probably you have passed already a tag or a NodeList
	  else
	    el = selector
	
	  // select all the registered and mount them inside their root elements
	  if (tagName == '*') {
	    // get all custom tags
	    tagName = selctAllTags(selector)
	    // if the root el it's just a single tag
	    if (el.tagName) {
	      el = $$(tagName, el)
	    } else {
	      var nodeList = []
	      // select all the children for all the different root elements
	      each(el, function(tag) {
	        nodeList = $$(tagName, tag)
	      })
	      el = nodeList
	    }
	    // get rid of the tagName
	    tagName = 0
	  }
	
	  function push(root) {
	    var name = tagName || root.getAttribute('riot-tag') || root.tagName.toLowerCase(),
	        tag = mountTo(root, name, opts)
	
	    if (tag) tags.push(tag)
	  }
	
	  // DOM node
	  if (el.tagName)
	    push(selector)
	  // selector or NodeList
	  else
	    each(el, push)
	
	  return tags
	
	}
	
	// update everything
	riot.update = function() {
	  return each(virtualDom, function(tag) {
	    tag.update()
	  })
	}
	
	// @deprecated
	riot.mountTo = riot.mount
	
	
	
	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl }
	
	  // support CommonJS, AMD & browser
	  if (true)
	    module.exports = riot
	  else if (typeof define === 'function' && define.amd)
	    define(function() { return riot })
	  else
	    window.riot = riot
	
	})(typeof window != 'undefined' ? window : undefined);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(20)
	  , TAG      = __webpack_require__(21)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(20);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
	}
	uid.safe = __webpack_require__(20).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(20)
	  , cof               = __webpack_require__(23)
	  , assertObject      = __webpack_require__(32).obj
	  , SYMBOL_ITERATOR   = __webpack_require__(21)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = {}
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}
	
	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol
	      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
	    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
	  },
	  get: function(it){
	    var Symbol  = $.g.Symbol
	      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
	      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(31)
	  , $               = __webpack_require__(20)
	  , cof             = __webpack_require__(23)
	  , $iter           = __webpack_require__(26)
	  , SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$.hide(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(20)
	  , setUnscope = __webpack_require__(40)
	  , ITER       = __webpack_require__(25).safe('iter')
	  , $iter      = __webpack_require__(26)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(27)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(20)
	  , assert = __webpack_require__(32);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(30)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(32).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(20)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    $.hide(exports, key, exp);
	  }
	}
	module.exports = $def;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(20);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(30)
	  , get  = __webpack_require__(26).get
	  , call = __webpack_require__(41);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(20)
	  , SPECIES = __webpack_require__(21)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(20)
	  , ctx    = __webpack_require__(30)
	  , cof    = __webpack_require__(23)
	  , invoke = __webpack_require__(42)
	  , cel    = __webpack_require__(43)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , postMessage        = global.postMessage
	  , addEventListener   = global.addEventListener
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    };
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(20);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(20);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var $           = __webpack_require__(20)
	  , UNSCOPABLES = __webpack_require__(21)('unscopables');
	if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  if($.FW)[][UNSCOPABLES][key] = true;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(32).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(20)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map