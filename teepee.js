(function (doc) {
	// return whether a value is worth displaying IMHO
	function isPositive (val) {
		return val !== undefined && val !== null && val !== false
	}
	// return escaped characters before adding them to a regexp
	function escapeRegExp (str) {
		return String(str).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
	// the tpl function
	window.Teepee = function () {
		// turn a string into a template array
		function tplArray (str) {
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
			if (tpl !== null) arr = arr.concat([tpl[1]], [[tpl[2].substr(0, 1), tpl[2].substr(1)]], callee(tpl[3]));
			else arr.push(str);
			//
			return arr;
		}
		// turn a template array into a template object
		function tplObject (arr) {
			var
			callee = arguments.callee,
			during = [],
			after = [],
			i = -1,
			e;
			//
			while ((e = arr[++i]) !== undefined) {
				if (e.constructor === [].constructor) {
					if (
						(new RegExp('^('+
						escapeRegExp(storage.iffer)+'|'+
						escapeRegExp(storage.notter)+'|'+
						escapeRegExp(storage.looper)+
						')$')
					).test(e[0])) {
						var
						obj = {},
						after = callee(arr.splice(++i, arr.length - i));
						obj.condition = e;
						obj.children = after[0];
						during.push(obj);
						arr = arr.concat(after[1]);
						--i;
					}
					else if ((new RegExp('^'+escapeRegExp(storage.printer)+'$')).test(e[0])) {
						during.push({condition: e});
					}
					else {
						after = arr.splice(++i, arr.length - 1);
						--i;
					}
				}
				else during.push(e);
			}
			//
			return [during, after];
		}
		// render a template object
		function tplRender (arr, obj) {
			var
			callee = arguments.callee,
			html = '',
			i = -1,
			e;
			while ((e = arr[++i]) !== undefined) {
				if (e.constructor === {}.constructor) {
					var
					chr = e.condition[0],
					varName = e.condition[1],
					varValue = (new Function('return arguments[0].'+varName))(obj),
					ei, eo;
					// print
					if (chr === storage.printer && isPositive(varValue)) html += varValue;
					// if
					else if (chr === storage.iffer && isPositive(varValue)) html += callee(e.children, obj);
					// if not
					else if (chr === storage.notter && !isPositive(varValue)) html += callee(e.children, obj);
					// loop
					else if (chr === storage.looper && isPositive(varValue)) {
						ei = -1;
						eo = {};
						while ((eo[varName] = varValue[++ei]) !== undefined) html += callee(e.children, eo);
					}
				}
				else html += e;
			}
			return html;
		}
		// the interface stuff
		var
		callee = arguments.callee,
		instance = this || callee,
		storage = {
			closer: '}}',
			iffer: '?',
			looper: '#',
			notter: '!',
			opener: '{{',
			printer: '=',
			tpl: '',
			use: {}
		};
		//
		// get/set the closing character(s)
		instance.closer = function (str) {
			if (str === undefined) return storage.closer;
			storage.closer = String(str);
			return instance;
		};
		instance.closer.toString = instance.closer;
		//
		// get/set the if character(s)
		instance.iffer = function (str) {
			if (str === undefined) return storage.iffer;
			storage.iffer = String(str);
			return instance;
		};
		instance.iffer.toString = instance.iffer;
		//
		// get/set the loop character(s)
		instance.looper = function (str) {
			if (str === undefined) return storage.looper;
			storage.looper = String(str);
			return instance;
		};
		instance.iffer.toString = instance.iffer;
		//
		// get/set the if not character(s)
		instance.notter = function (str) {
			if (str === undefined) return storage.notter;
			storage.notter = String(str);
			return instance;
		};
		instance.notter.toString = instance.notter;
		//
		// get/set the opening character(s)
		instance.opener = function (str) {
			if (str === undefined) return storage.opener;
			storage.opener = String(str);
			return instance;
		};
		instance.opener.toString = instance.opener;
		//
		// get/set the printing character(s)
		instance.printer = function (str) {
			if (str === undefined) return storage.printer;
			storage.printer = String(str);
			return instance;
		};
		instance.printer.toString = instance.printer;
		//
		// get/set the template string
		instance.tpl = function (str) {
			if (str === undefined) return storage.tpl;
			storage.tpl = String(str);
			return instance;
		};
		//
		// set the template string by document id
		instance.tplById = function (id, bool) {
			id = doc.getElementById(id);
			bool = bool === undefined ? true : bool;
			if (id.src) {
				var r = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
				r.open('GET', id.src, bool);
				r.send(null);
				if (bool) r.onreadystatechange = function () {
					if (r.readyState == 4) storage.tpl = r.responseText;
				}; else storage.tpl = r.responseText;
			}
			else storage.tpl = id.innerHTML;
			return instance;
		};
		//
		// get/set the scope object
		instance.use = function (obj) {
			if (obj === undefined) return storage.use;
			storage.use = Object(obj);
			return instance;
		};
		//
		// render a template with a scope object
		instance.render = function (tpl, use) {
			return tplRender(tplObject(tplArray(tpl || storage.tpl))[0], use || storage.use);
		};
		instance.render.toString = instance.render;
		//
		// write a rendered template to the document
		instance.write = function (tpl, use) {
			doc.write(instance.render(tpl, use));
			return instance;
		};
		//
		// append a rendered template to the document as a style
		instance.writeCSS = function (tpl, use) {
			var div = doc.createElement('div');
			div.innerHTML = '<style>'+instance.render(tpl, use)+'</style>';
			doc.documentElement.firstChild.appendChild(div.firstChild);
			return instance;
		};
		//
		// we're done here
		return instance;
	};
})(document);