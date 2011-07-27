# Teepee

Teepee is a templating system for JavaScript, ideal for creating websites, webapps, or anything else - quickly. Teepee is stable, fast, easy, and even lets you control the syntax (and all of this in 1KB).


## Using Teepee

To use Teepee, include this script anywhere in your page. You can even hotlink to the latest Teepee (well, you can't in IE9). Woot ('cept for IE9)!

```html
<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
```

### Example: Hello World

Teepee syntax is both easy to use, and completely customizable. By default, Teepee's syntax is like that of [Mustache][mustache], an absolutely fantastic markup language (which is itself based on [CTemplate][ctemplate]). Awesome!

```html
<body>
	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
	<script>
	var tp = new Teepee();
	tp.write(
		'Hello, {{=who}}!',
		{ who: 'World' }
	); // prints "Hello, World!"
	</script>
</body>
```

### Examples: If and If Not

Use simplified IF and IF NOT statements in your templates for even more dynamic control. Oh yea!

```html
<body>
	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
	<script>
	var tp = new Teepee();
	tp.write(
		'Hello{{?isEarth}}, Earth{{/isEarth}}{{?isMars}}, Mars{{/isMars}}!',
		{ isMars: false, isEarth: true }
	); // prints "Hello, Earth!"
	tp.write(
		'Hello{{?person === "Dolly"}}, {{=person}}{{/person}}!',
		{ person: "Dolly" }
	); // prints "Hello, Dolly!"
	</script>
</body>
```


### Example: Looping

Use a simplified loop statement in your templates to loop through an array. Uhuh uhuh uhuh!

```html
<body>
	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
	<script>
	var tp = new Teepee();
	tp.write(
		'Ask these questions:{{#q}} {{=q}}{{/q}}.',
		{ q: ['Who', 'What', 'Where', 'When', 'Why'] }
	); // prints "Ask these questions: Who What Where When Why."
	</script>
</body>
```


### Example: Syntax modification

You can change Teepee's syntax to your heart's content. Yay!

```html
<body>
	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
	<script>
	var t = new Teepee();
	t.opener('@').closer('@').printer('$');
	t.write(
		'The quick @$jumper@ jumps over the @$jumpee@.',
		{ jumper: 'brown fox', jumpee: 'lazy dog' }
	); // prints "The quick brown fox jumps over the lazy dog."
	</script>
</body>
```

That's right, you may have noticed that most functions in Teepee are chainable (like [jQuery][jquery]). Nice!


### Examples: Script tags

You can even use templates in &lt;script&gt; tags to make your entire page. Sweet!

```html
<body>
	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
	<script id="demo-template" type="text/html">
	<h1>
		{{=pageTitle}}
	</h1>
	<p>
		{{=pageDescription}}
	</p>
	</script>
	<script>
	demoObject = {
		pageTitle: 'My 1997 Website',
		pageDescription: 'Hello and welcome to my awesome website.'
	};
	tp = new Teepee();
	tp.tplById('demo-template').use(demoObject).write();
	</script>
</body>
```


You can even use external templates in &lt;script&gt; tags to make your page as well as style it [Sass][sass]-style. Nifty!

```html
<body>
	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
	<script src="demo-advanced.tpl.html" id="demo-html" type="text/html">
		<-- Contents of "demo-advanced.tpl.html" -->
		<h1>
			{{=pageTitle}}
		</h1>
		<nav>
			<ul>
				{{#pageNavigation}}
				<li>
					<a href="{{=pageNavigation.href}}">{{=pageNavigation.title}}</a>
				</li>
				{{/pageNavigation}}
			</ul>
		</nav>
	</script>
	<script src="demo-advanced.tpl.css" id="demo-css" type="text/css">
		/* Contents of "demo-advanced.tpl.css" */
		body {
			background: {{=pageBackgroundColor}};
			color: {{=pageTextColor}};
		}
		a {
			color: {{=pageTextColor}};
			text-decoration: none;
		}
	</script>
	<script>
	demoObject = {
		pageTitle: 'My HTML5 1997 Website',
		pageNavigation: [
			{ href: '#uno', title: 'One' },
			{ href: '#dos', title: 'Two' },
			{ href: '#tres', title: 'Three' },
			{ href: '#cuatro', title: 'Four' },
			{ href: '#cinco', title: 'Five' },
		],
		pageBackgroundColor: '#444',
		pageTextColor: '#FFF'
	};
	</script>
	<script>
	var tp = new Teepee();
	tp.use(demoObject);
	tp.tplById('demo-css', false).writeCSS().tplById('demo-html', false).write();
	</script>
</body>
```

## Features

Teepee's filled with functionality that will allow you to start developing immediately.

----

### Creating a new instance

#### Syntax

```javascript
_tp_ = new Teepee()
```

----

### opener

#### Syntax

```javascript
_tp_.opener
_tp_.opener ( _chars_ )
```

#### Summary

Sets the opening character(s) of Teepee code and returns the instance of Teepee. If nothing is passed, the current opening character(s) are returned.

#### Parameters

<dl>
	<dt>chars</dt>
	<dd>The character(s) to be used.</dd>
</dl>

----

### closer

#### Syntax

```javascript
_tp_.closer
_tp_.closer ( _chars_ )
```

#### Summary

Sets the closing character(s) of Teepee code and returns the instance of Teepee. If nothing is passed, the current closing character(s) are returned.

#### Parameters

<dl>
	<dt>chars</dt>
	<dd>The character(s) to be used.</dd>
</dl>

----

### iffer

#### Syntax

```javascript
_tp_.iffer
_tp_.iffer ( _chars_ )
```

#### Summary

Sets the character(s) used to begin an IF statement and returns the instance of Teepee. If nothing is passed, the current IF character(s) are returned.

#### Parameters

<dl>
	<dt>chars</dt>
	<dd>The character(s) to be used.</dd>
</dl>

----

### closer

#### Syntax

```javascript
_tp_.notter
_tp_.notter ( _chars_ )
```

#### Summary

Sets the character(s) used to begin an IF NOT statement and returns the instance of Teepee. If nothing is passed, the current IF NOT character(s) are returned.

#### Parameters

<dl>
	<dt>chars</dt>
	<dd>The character(s) to be used.</dd>
</dl>

----

### looper

#### Syntax

```javascript
_tp_.looper
_tp_.looper ( _chars_ )
```

#### Summary

Sets the character(s) used to begin a FOR statement and returns the instance of Teepee. If nothing is passed, the current FOR character(s) are returned.

#### Parameters

<dl>
	<dt>chars</dt>
	<dd>The character(s) to be used.</dd>
</dl>

----

### printer

#### Syntax

```javascript
_tp_.printer
_tp_.printer ( _chars_ )
```

#### Summary

Sets the character(s) used to print a variable and returns the instance of Teepee. If nothing is passed, the current printing character(s) are returned.

#### Parameters

<dl>
	<dt>chars</dt>
	<dd>The character(s) to be used.</dd>
</dl>

----

### tpl

#### Syntax

```javascript
_tp_.tpl ( _tpl_ )
```

#### Summary

Assigns the template string and returns the instance of Teepee. If nothing is passed, the current template string is returned.

#### Parameters

<dl>
	<dt>tpl</dt>
	<dd>The string to be used.</dd>
</dl>

----

### tplById

#### Syntax

```javascript
_tp_.tplById ( _id_, _async_ )
```

#### Summary

Sets the template string, based on an element's content and returns the instance of Teepee. If the element is a script tag with a src attribute, the local source will be used.

#### Parameters

<dl>
	<dt>id</dt>
	<dd>The id of the element.</dd>
	<dt>async</dt>
	<dd>The optional boolean of whether to load the template asynchronously.  Defaults true.</dd>
</dl>

----

### use

#### Syntax

```javascript
_tp_.use ( _use_ )
```

#### Summary

Sets the object to be used by the template and returns the instance of Teepee. If nothing is passed, the current object is returned.

#### Parameters

<dl>
	<dt>use</dt>
	<dd>The object to be used.</dd>
</dl>

----

### render

#### Syntax

```javascript
_tp_.render
_tp_.render ( _tpl_ , _use_ )
```

#### Summary

Returns the rendered template.

#### Parameters

<dl>
	<dt>tpl</dt>
	<dd>The optional string of the template. Defaults to the stored string.</dd>
	<dt>use</dt>
	<dd>The optional object to be used by the template. Defaults to the stored object.</dd>
</dl>

----

### write

#### Syntax

```javascript
_tp_.write ( _tpl_ , _use_ )
```

#### Summary

Writes the rendered template to the document and returns the instance of Teepee.

#### Parameters

<dl>
	<dt>tpl</dt>
	<dd>The optional string of the template. Defaults to the stored string.</dd>
	<dt>use</dt>
	<dd>The optional object to be used by the template. Defaults to the stored object.</dd>
</dl>

----

### writeCSS

#### Syntax

```javascript
_tp_.writeCSS ( _tpl_ , _use_ )
```

#### Summary

Writes the rendered template to a style element in the document and returns the instance of Teepee.

#### Parameters

<dl>
	<dt>tpl</dt>
	<dd>The optional string of the template. Defaults to the stored string.</dd>
	<dt>use</dt>
	<dd>The optional object to be used by the template. Defaults to the stored object.</dd>
</dl>


## Contributing

1. Fork it.
2. Create a branch (`git checkout -b my_teepee`)
3. Commit your changes (`git commit -am "Added Awesomeness"`)
4. Push to the branch (`git push origin my_teepee`)
5. Create an [Issue][1] with a link to your branch
6. Enjoy a refreshing Coca Cola Classic (you earned it!) and wait

[1]: //github.com/rezitech/teepee/issues
[mustache]: http://mustache.github.com/
[ctemplate]: //code.google.com/p/google-ctemplate/
[jquery]: http://jquery.com
[sass]: http://sass-lang.com/