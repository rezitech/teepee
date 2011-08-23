/*! Teepee v1.2.2 MIT/GPL2 @rezitech */
(function (doc) {
	// Returns whether value is defined
	function isDefined (val) {
		return val !== undefined && val !== null;
	}
	// Returns whether value is an object
	function isObject (val) {
		return isDefined(val) && val.constructor === Object.prototype.constructor;
	}
	// Returns whether value is a string
	function isString (val) {
		return isDefined(val) && val.constructor === String.prototype.constructor;
	}
	// Returns an regexp escaped string
	function escapeRegExp (str) {
		return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
	// Returns an extended objects
	function extendObject () {
		var extObj = {}, arg = arguments, argLen = arg.length, i = -1, e;
		while (++i < argLen)
			if (isObject(arg[i]))
				for (e in arg[i])
					extObj[e] = isObject(extObj[e]) && isObject(arg[i][e])
						? arg.callee(extObj[e], arg[i][e])
						: arg[i][e];
		return extObj;
	}
	// TP function
	function TP () {
		// Turns a string into a template array
		function tpArray (str) {
			var
			callee = arguments.callee,
			tpl = str.match(
				(new RegExp('^([\\W\\w]*?)'+
				escapeRegExp(storage.opener)+
				'([\\W\\w]*?)'+
				escapeRegExp(storage.closer)+
				'([\\W\\w]*?)$'))
			),
			arr = [];
			//
			if (isDefined(tpl)) arr = arr.concat([tpl[1]], [[tpl[2].substr(0, 1), tpl[2].substr(1)]], callee(tpl[3]));
			else arr.push(str);
			//
			return arr;
		}
		// Turns a template array into a template object
		function tpObject (arr) {
			var
			callee = arguments.callee,
			during = [],
			after = [],
			i = -1,
			e;
			//
			while (isDefined(e = arr[++i])) {
				if (e.constructor === Array.prototype.constructor) {
					if (
						(new RegExp('^('+
						escapeRegExp(storage.iffer)+'|'+
						escapeRegExp(storage.notter)+'|'+
						escapeRegExp(storage.looper)+
						')$')).test(e[0])
					) {
						var
						obj = {},
						after = callee(arr.splice(++i, arr.length - i));
						obj.condition = e;
						obj.children = after[0];
						during.push(obj);
						arr = arr.concat(after[1]);
						--i;
					}
					else if (
						(new RegExp('^'+escapeRegExp(storage.ender)+'$')).test(e[0])
					) {
						after = arr.splice(++i, arr.length - 1);
						--i;
					}
					else during.push({condition: e});
				}
				else during.push(e);
			}
			//
			return [during, after];
		}
		// Renders a template object
		function tpRender (arr, obj) {
			var
			callee = arguments.callee,
			html = '',
			i = -1,
			e;
			while (isDefined(e = arr[++i])) {
				if (isObject(e)) {
					var
					chr = e.condition[0],
					varName = e.condition[1],
					varValue = (new Function('return this.'+(
						varName
						.split('||([^\'\"\[\{])').join('||this.$1')
						.split('&&').join('&&this.')
					))).apply(obj),
					ei, eo;
					// write
					if (chr === storage.printer) { html += String(varValue || ''); }
					// if
					else if (chr === storage.iffer && isDefined(varValue) && varValue != false) html += callee(e.children, obj);
					// if not
					else if (chr === storage.notter && (!isDefined(varValue) || varValue == false)) html += callee(e.children, obj);
					// loop
					else if (chr === storage.looper && isDefined(varValue)) {
						ei = -1;
						eo = {};
						while (isDefined(eo[varName] = varValue[++ei])) html += callee(e.children, eo);
					}
				}
				else html += e;
			}
			return html;
		}
		// Interface
		var
		instance = this,
		storage = {
			closer: '}}',
			ender: '/',
			iffer: '?',
			looper: '#',
			notter: '!',
			opener: '{{',
			printer: '=',
			tpl: '',
			use: {}
		};
		// Gets or sets the closing character(s)
		instance.closer = function (str) {
			if (!isString(str)) return storage.closer;
			storage.closer = str;
			return instance;
		};
		// Gets or sets the closing character(s)
		instance.ender = function (str) {
			if (!isString(str)) return storage.ender;
			storage.ender = str;
			return instance;
		};
		// Gets or sets the if character(s)
		instance.iffer = function (str) {
			if (!isString(str)) return storage.iffer;
			storage.iffer = str;
			return instance;
		};
		// Gets or sets the loop character(s)
		instance.looper = function (str) {
			if (!isString(str)) return storage.looper;
			storage.looper = str;
			return instance;
		};
		// Gets or sets the if not character(s)
		instance.notter = function (str) {
			if (!isString(str)) return storage.notter;
			storage.notter = str;
			return instance;
		};
		// Gets or sets the opening character(s)
		instance.opener = function (str) {
			if (!isString(str)) return storage.opener;
			storage.opener = str;
			return instance;
		};
		// Gets or sets the printer character(s)
		instance.printer = function (str) {
			if (!isString(str)) return storage.printer;
			storage.printer = str;
			return instance;
		};
		// Gets or sets the template string
		instance.tpl = function (str) {
			if (!isString(str)) return storage.tpl;
			storage.tpl = str;
			return instance;
		};
		//
		// Sets the template string by document id
		instance.tplById = function (id, bool) {
			id = doc.getElementById(id);
			if (id.src) instance.tplByUrl(id.src, bool);
			else storage.tpl = id.innerHTML;
			return instance;
		};
		//
		// Sets the template string by url
		instance.tplByUrl = function (url, bool) {
			bool = !isDefined(bool) ? true : bool;
			var r = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			r.open('GET', url, bool);
			r.send(null);
			if (bool) r.onreadystatechange = function () {
				if (r.readyState === 4) storage.tpl = r.responseText;
			}; else storage.tpl = r.responseText;
			return instance;
		};
		//
		// Gets or sets the scope object
		instance.use = function (val) {
			if (!isObject(val)) return storage.use;
			storage.use = val;
			return instance;
		};
		// Extends the scope object
		instance.andUse = function (obj) {
			if (isObject(obj)) storage.use = extendObject(storage.use, obj);
			return instance;
		};
		// Renders a template with a scope object
		instance.render = function (tpl, use) {
			return tpRender(tpObject(tpArray(tpl || storage.tpl))[0], use || storage.use);
		};
		// Writes a rendered template to the document
		instance.write = function (tpl, use) {
			doc.write(instance.render(tpl, use));
			return instance;
		};
		// Appends a rendered template to the document as a style
		instance.css = function (tpl, use) {
			var div = doc.createElement('div');
			div.innerHTML = '<style>'+instance.render(tpl, use)+'</style>';
			doc.documentElement.firstChild.appendChild(div.firstChild);
			return instance;
		};
		// Return instance
		return instance;
	};
	// Creates new instance
	window.teepee = function () { return new TP(); };
})(document);