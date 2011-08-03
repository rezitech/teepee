# Teepee

Teepee is a templating system for JavaScript, ideal for creating websites, webapps, or anything else. Teepee is fast, stable, easy to use, and even lets you control the syntax (and all of this in 1KB).


## Download

[Download teepee.js][teepee.js] or [get the latest release at GitHub][github].


## Examples

To use Teepee, include this script anywhere in your page.

```html
<script src="//rezitech.github.com/teepee/teepee.js"></script>
```

### Hello World

Teepee syntax is easy to use and completely customizable.

```html
<script>
teepee().write(
	'Hello, {{=who}}!',
	{ who: 'World' }
); // writes "Hello, World!"
</script>
```

### If and If Not

Use simplified IF and IF NOT statements to control output.

```html
<script>
teepee().write(
	'Hello{{?isEarth}}, Earth{{/isEarth}}{{?isMars}}, Mars{{/isMars}}!',
	{ isMars: false, isEarth: true }
); // writes "Hello, Earth!"

teepee().write(
	'Hello{{?person === "Dolly"}}, {{=person}}{{/person}}!',
	{ person: 'Dolly' }
); // writes "Hello, Dolly!"
</script>
```


### Looping

Use a simplified loop statement to parse an array.

```html
<script>
teepee().write(
	'Ask these questions:{{#q}} {{=q}}{{/q}}.',
	{ q: ['Who', 'What', 'Where', 'When', 'Why'] }
); // writes "Ask these questions: Who What Where When Why."
</script>
```


### Syntax modification

Customize the syntax to your heart's content.

```html
<script>
teepee()
	.opener('@')
	.closer('@')
	.writer('$')
	.write(
		'The quick @$jumper@ jumps over the @$jumpee@.',
		{ jumper: 'brown fox', jumpee: 'lazy dog' }
	); // writes "The quick brown fox jumps over the lazy dog."
<script>
```

### Script tags

Load templates from &lt;script&gt; elements.

```html
<script id="demo-template" type="text/html">
<h1>
	{{=pageTitle}}
</h1>
<p>
	{{=pageDescription}}
</p>
</script>

<script>
tplObject = {
	pageTitle: 'My Website',
	pageDescription: 'Hello and welcome to my awesome website.'
};

teepee()
	.tplById('demo-template') // sets the template string by the element where id="demo-template"
	.use(tplObject) // sets the use object as tplObject
	.write(); // writes the rendered template
</script>
```

Load external templates from &lt;script&gt; elements using the src attribute. Create templates for HTML, CSS, or anything else.

```html
<script src="example-external_script_tags.tpl.html" id="demo-html" type="text/html">
<!-- Contents of "example-external_script_tags.tpl.html" -->
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

<script src="example-external_script_tags.tpl.css" id="demo-css" type="text/css">
/* Contents of "example-external_script_tags.tpl.css" */
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
tplObject = {
	pageTitle: 'My HTML5 Website',
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

teepee()
	.use(tplObject) // sets the use object as tplObject
	.tplById('demo-css', false) // synchronously sets the template string by the element where id="demo-css"
	.css() // appends the rendered template as a style element to the document
	.tplById('demo-html', false) // synchronously sets the template string by the element where id="demo-html"
	.write(); // writes the rendered template
</script>
```

## Features

Teepee is pumped up with features to allow you to start developing immediately.

### Creating a new instance

A new instance of teepee is created by calling the Teepee function.

```javscript
var tpA = teepee(); // an independent instance of teepee
var tpB = teepee(); // another independent instance of teepee
```

### opener

Sets the opening character(s) of Teepee code and returns the instance of Teepee. If nothing is passed, the current opening character(s) are returned.

```javscript
tp.opener(); // returns the current opening character(s)
tp.opener( '@' ); // sets the opening character as "@"
tp.render( 'Hello, @=who}}!', { who: 'World' } ); // renders "Hello, World!"
```

### closer

Sets the closing character(s) of Teepee code and returns the instance of Teepee. If nothing is passed, the current closing character(s) are returned.

```javscript
tp.closer(); // returns the current closing character(s)
tp.closer( '@' ); // sets the closing character as "~"
tp.render( 'Hello, {{=who@!', { who: 'World' } ); // renders "Hello, World!"
```

### printer

Sets the character(s) used to print and returns the instance of Teepee. If nothing is passed, the current printing character(s) are returned.

```javscript
tp.printer(); // returns the current printing character(s)
tp.printer( '~' ); // sets the printing character as "~"
tp.render( 'Hello, {{~who}}!', { who: 'World' } ); // renders "Hello, World!"
```

### iffer

Sets the character(s) used to begin an IF statement and returns the instance of Teepee. If nothing is passed, the current IF character(s) are returned.

```javscript
tp.iffer(); // returns the current IF character(s)
tp.iffer( '^' ); // sets the IF character as "^"
tp.render( 'Hello, {{^isWorld}}World{{/isWorld}}!', { isWorld: true } ); // renders "Hello, World!"
```

### notter

Sets the character(s) used to begin an IF NOT statement and returns the instance of Teepee. If nothing is passed, the current IF NOT character(s) are returned.

```javscript
tp.notter(); // returns the current IF NOT character(s)
tp.notter( '^' ); // sets the IF NOT character as "^"
tp.render( 'Hello, {{^isWorld}}World{{/isWorld}}!', { isWorld: true } ); // renders "Hello!"
```

### looper

Sets the character(s) used to begin a FOR statement and returns the instance of Teepee. If nothing is passed, the current FOR character(s) are returned.

```javscript
tp.looper(); // returns the current FOR character(s)
tp.looper( '@' ); // sets the FOR character as "@"
tp.render( 'Hello,{{@planets}} {{=planets}}{{/planets}}!', { planets: ['Venus', 'Earth', 'Mars'] } ); // renders "Hello, Venus Earth Mars!"
```

### ender

Sets the character(s) used to end an IF/IF NOT/LOOP statement and returns the instance of Teepee. If nothing is passed, the current IF/IF NOT/LOOP ending character(s) are returned.

```javscript
tp.ender(); // returns the current IF/IF NOT/LOOP ending character(s)
tp.ender( '$' ); // sets the IF/IF NOT/LOOP ending character as "$"
tp.render( 'Hello, {{?isWorld}}World{{$isWorld}}!', { isWorld: true } ); // renders "Hello, World!"
```

### tpl

Sets the template string and returns the instance of Teepee. If nothing is passed, the current template string is returned.

```javscript
tp.tpl(); // returns the current template string
tp.tpl( 'Hello {{=who}}' ); // sets the template string as "Hello {{=who}}"
```

### tplById

Sets the template string based on an element's content and returns the instance of Teepee. If the element has a src attribute, the src file (which must reside on the same domain) will be used and may also be loaded asynchronously or synchronously.

```javscript
tp.tplById('tpl-html-foo'); // asynchronously sets the template string by the element where id="tpl-html-foo"
tp.tplById('tpl-html-bar', false); // synchronously sets the template string by the element where id="tpl-html-foo"
```

### use

Sets the object to be used by the template and returns the instance of Teepee. If nothing is passed, the current use object is returned.

```javscript
tp.use(); // returns the current use object
tp.use({ foo: 'bar' }); // sets the use object as { foo: 'bar' }
```

### andUse

Extends the object to be used by the template and returns the instance of Teepee.

```javscript
tp.use({ foo: 'bar' }).andUse({ baz: 'qux' }); // sets the use object as { foo: 'bar', baz: 'qux' }
```

### render

Returns the rendered template.

```javscript
tp.render(); // returns the rendered template
tp.render('Hello, {{=who}}!', { who: 'World' }); // returns "Hello, World!"
```

### write

Writes the rendered template and returns the instance of Teepee.

```javscript
tp.write(); // writes the rendered template
tp.write('Hello, {{=who}}!', { who: 'World' }); // writes "Hello, World!"
```

### css

Appends the rendered template as a style element to the document and returns the instance of Teepee.

```javscript
tp.css(); // appends the rendered template as a style element to the document
tp.css('body { background: {{=color}}; }', { color: '#000' }); // appends a style element containing "body { background: #000; }"
```


## Licensing

Teepee uses a dual [MIT][mit]/[GPL-2.0][gpl] License. The [MIT License][mit] is recommended for most projects, because it is simple, easy to understand, and it places almost no restrictions on what you can do with Teepee. If the [GPL-2.0][gpl] License suits your project better, then you are also free to use Teepee under that license.

You don't have to do anything special to choose one license or the other, and you don't have to notify anyone which license you are using. You are free to use Teepee in commercial projects as long as the copyright header is left intact.


## Contributing

1. Fork it.
2. Create a branch. (`git checkout -b my_teepee`)
3. Commit your changes. (`git commit -am "Added Awesomeness"`)
4. Push to the branch. (`git push origin my_teepee`)
5. Create an [Issue][issue] with a link to your branch.
6. Enjoy a refreshing Coca Cola Classic (you earned it!) and wait.

[teepee.js]: http://rezitech.github.com/teepee/teepee.js
[github]: //github.com/rezitech/teepee
[mit]: http://www.opensource.org/licenses/MIT
[gpl]: http://www.opensource.org/licenses/GPL-2.0
[issue]: //github.com/rezitech/teepee/issues