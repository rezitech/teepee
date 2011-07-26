Teepee
======

Teepee is a templating language for JavaScript, ideal for creating websites, webapps, or anything else - quickly. Teepee is stable, fast, easy, and even lets you control the syntax (and all of this in less than 1KB).


Using Teepee
------------

To use Teepee, include this script anywhere in your page. You can even hotlink to the latest Teepee.

	<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>


### Hello World Example

Teepee syntax is both easy to use, and completely customizable. By default, Teepee's syntax is like that of [Mustache][mustache], another absolutely fantastic markup language (which is itself based on [CTemplate][ctemplate]). Awesome!

	<body>
		<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
		<script>var tp = new Teepee(); tp.write('Hello, {{=who}}!', { who: 'World' });</script>
	</body>


### Syntax Mod Example

You can change Teepee's syntax to your heart's content. Yay!

	<body>
		<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
		<script>
		var t = new Teepee();
		t.opener('@').closer('@').printer('$');
		t.write('The quick @$animal@ jumps over the lazy dog.', { animal: 'brown fox' });
		</script>
	</body>

That's right, you may have noticed that most functions in Teepee are chainable (like [jQuery][jquery]). Nice!


### Script Tag Examples

You can even use templates in &lt;script&gt; tags to make your entire page. Sweet!

	<body>
		<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
		<script id="demo-template" type="text/x-tpl">
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


You can even use external templates in &lt;script&gt; tags to make your page as well as style it [Sass][sass]-style. Nifty!

	<body>
		<script src="//raw.github.com/rezitech/teepee/master/teepee.js"></script>
		<script src="demo-advanced.tpl.html" id="demo-html" type="text/x-tpl">
			<-- Contents of the external file -->
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
				</Ul>
			</nav>
		</script>
		<script src="demo-advanced.tpl.css" id="demo-css" type="text/x-tpl">
			/* Contents of the external file */
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
			pageTitle: 'Home',
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


Contributing
------------

1. Fork it.
2. Create a branch (`git checkout -b my_teepee`)
3. Commit your changes (`git commit -am "Added Awesomeness"`)
4. Push to the branch (`git push origin my_teepee`)
5. Create an [Issue][1] with a link to your branch
6. Enjoy a refreshing Diet Coke and wait

[1]: //github.com/rezitech/teepee/issues
[mustache]: http://mustache.github.com/
[ctemplate]: //code.google.com/p/google-ctemplate/
[jquery]: http://jquery.com
[sass]: http://sass-lang.com/