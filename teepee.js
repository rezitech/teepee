(function () {
	// return whether a value is worth displaying IMHO
	function isPositive (val) {
		return val !== undefined && val !== null && val !== false
	}
	// return escaped characters before adding them to a regexp
	function escapeRegExp (str) {
		return String(str).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
	// the tpl function
	window.Tpl = function () {
		// turn a string into a template array
		function tplArray (str) {
			var
			callee = arguments.callee,
			tpl = str.match(
				(new RegExp('([\\W\\w]*?)'+
				escapeRegExp(storage.openBracket)+
				'([\\W\\w]*?)'+
				escapeRegExp(storage.closeBracket)+
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
						escapeRegExp(storage.ifChar)+'|'+
						escapeRegExp(storage.notChar)+'|'+
						escapeRegExp(storage.loopChar)+
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
					else if ((new RegExp('^'+escapeRegExp(storage.printChar)+'$')).test(e[0])) {
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
					if (chr === storage.printChar && isPositive(varValue)) html += varValue;
					// if
					else if (chr === storage.ifChar && isPositive(varValue)) html += callee(e.children, obj);
					// if not
					else if (chr === storage.notChar && !isPositive(varValue)) html += callee(e.children, obj);
					// loop
					else if (chr === storage.loopChar && isPositive(varValue)) {
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
			closeBracket: '}}',
			ifChar: '?',
			loopChar: '#',
			notChar: '!',
			openBracket: '{{',
			printChar: '$'
		};
		// set the closing bracket character(s)
		instance.closeBracket = function (str) {
			storage.closeBracket = String(str);
		};
		// set the if statement character(s)
		instance.ifChar = function (str) {
			storage.ifChar = String(str);
		};
		// set the if not statement character(s)
		instance.notChar = function (str) {
			storage.notChar = String(str);
		};
		// set the opening bracket character(s)
		instance.openBracket = function (str) {
			storage.openBracket = String(str);
		};
		// set the print character(s)
		instance.printChar = function (str) {
			storage.printChar = String(str);
		};
		// render a template with a scope object
		instance.render = function (tpl, obj) {
			return tplRender(tplObject(tplArray(tpl))[0], obj);
		};
		// we're done here
		return instance;
	};
})();